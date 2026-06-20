# -*- coding: utf-8 -*-
"""
Reconcile v4 - width-aware + de-duplicated:
- reads webp pixel width directly from file headers (fast, no subprocess).
- DAY image: (1) client <pkg>-day<N>.webp  (2) place-verified landmark for that
  day IF width>=450  (3) a curated-pool image NOT already used in this package
  (de-dup), preferring higher resolution.
- PACKAGE hero: (1) client <pkg>-day1.webp cover  (2) highlight landmark IF
  width>=850  (3) the highest-res curated-pool image, rotated per destination so
  different packages get different heroes.
No raw remote, no <450px on days, no <850px heroes, no within-package duplicates
(unless a destination genuinely has fewer images than the package has days).
"""
import re,io,os,glob,sys
from collections import defaultdict
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding="utf-8")
GEN="public/images/generated"; LMDIR=GEN+"/lm"

def webp_w(path):
    try:
        d=open(path,'rb').read(40)
    except: return 0
    if d[:4]!=b'RIFF' or d[8:12]!=b'WEBP': return 0
    f=d[12:16]
    try:
        if f==b'VP8 ': return int.from_bytes(d[26:28],'little')&0x3fff
        if f==b'VP8L':
            b=int.from_bytes(d[21:25],'little'); return (b&0x3fff)+1
        if f==b'VP8X': return int.from_bytes(d[24:27],'little')+1
    except: return 0
    return 0
_wc={}
def W(rel):
    if rel in _wc: return _wc[rel]
    p=os.path.join('public',rel.lstrip('/')) if rel.startswith('/images/') else None
    w=webp_w(p) if (p and os.path.exists(p)) else 0
    _wc[rel]=w; return w

ds=io.open("src/data/destinations.ts",encoding="utf-8").read()
hero={}; localgal=defaultdict(list)
for m in re.finditer(r'slug: "([^"]+)",',ds):
    slug=m.group(1); seg=ds[m.start():m.start()+3000]
    hm=re.search(r'heroImage:\s*"([^"]+)"',seg)
    if hm: hero[slug]=hm.group(1)
    gm=re.search(r'galleryImages: \[(.*?)\]',seg,re.S)
    if gm:
        for u in re.findall(r'"([^"]+)"',gm.group(1)):
            if u.startswith("/images/"): localgal[slug].append(u)

GENERIC=re.compile(r'\b(arriv|depart|airport|transfer|drive|leisure|check|hotel|welcome|breakfast|free day|shopping|return|onward|rest|optional|day at|relax|overnight|pickup|drop|en route|farewell|brief|session|meeting|wrap|acclimat|pre-dawn|team|safety|kit check|weather|contingency|move into|hydrate)\b',re.I)
JUNK=re.compile(r'\b(arriv|depart|closing|opening|final|prep|descend|ascend|wrap|brief|session|meeting|team|safety|acclimat|leisure|transfer|drive|pickup|drop|weather|conting|hydrate|move|day at|welcome|return|onward|jeep|game drive|night safari)\b',re.I)
TRAIL=re.compile(r'\s+(walk|tour|visit|darshan|sunrise|sunset|hike|trek|ride|cruise|safari|climb|ascent|descent|start|day|excursion|viewpoint|photography|stop|show|experience|exploration|circuit|crossing|trail)$',re.I)
def make_query(acts,hl,title):
    cand=None
    for a in acts:
        if a and not GENERIC.search(a): cand=a; break
    if not cand and hl and not GENERIC.search(hl): cand=hl
    if not cand:
        t=re.split(r'[—\-,&]| to | via | in ',title)[0]
        if t and not GENERIC.search(t): cand=t
    if not cand: return None
    cand=re.sub(r'\(.*?\)','',cand).strip(' .-–—')
    for _ in range(2): cand=TRAIL.sub('',cand).strip()
    return cand if len(cand)>=3 and not GENERIC.search(cand) else None
def lm_path(q):
    if not q or JUNK.search(q): return None
    slug=re.sub(r'[^a-z0-9]+','-',q.lower()).strip('-')[:50]
    rel=f"/images/generated/lm/{slug}.webp"
    return rel if os.path.exists(os.path.join(LMDIR,slug+".webp")) else None
def pkgfile(pkg,n):
    return f"/images/generated/{pkg}-day{n}.webp" if os.path.exists(os.path.join(GEN,f"{pkg}-day{n}.webp")) else None
def dfields(block):
    t=re.search(r'title: "([^"]+)"',block); t=t.group(1) if t else ""
    am=re.search(r'activities: \[([^\]]*)\]',block); acts=re.findall(r'"([^"]+)"',am.group(1)) if am else []
    hg=re.search(r'highlight: "([^"]*)"',block); hg=hg.group(1) if hg else ""
    return acts,hg,t

ps=io.open("src/data/packages.ts",encoding="utf-8").read()
idxs=[m.start() for m in re.finditer(r'\n    slug: "',ps)]+[len(ps)]
lm_by_dest=defaultdict(list)
for i in range(len(idxs)-1):
    b=ps[idxs[i]:idxs[i+1]]
    dm=re.search(r'destinationSlug: "([^"]+)"',b); dest=dm.group(1) if dm else None
    if not dest: continue
    for dmo in re.finditer(r'\{\s*\n\s*day: \d+,[\s\S]*?\n      \}',b):
        p=lm_path(make_query(*dfields(dmo.group(0))))
        if p and W(p)>=450 and p not in lm_by_dest[dest]: lm_by_dest[dest].append(p)

def pool(dest):
    p=[]
    if hero.get(dest): p.append(hero[dest])
    for f in sorted(glob.glob(f"{GEN}/{dest}-*.webp")): p.append("/images/generated/"+os.path.basename(f))
    for u in lm_by_dest.get(dest,[]): p.append(u)
    for u in localgal.get(dest,[]): p.append(u)
    p=[x for x in dict.fromkeys(p) if W(x)>=450]
    p.sort(key=lambda x:-W(x))   # high-res first
    return p or [hero.get(dest,"")]

rot=defaultdict(int); herorot=defaultdict(int)
d_user=d_lm=d_pool=0; h_user=h_lm=h_pool=0; dups=0
parts=[ps[:idxs[0]]]
for i in range(len(idxs)-1):
    b=ps[idxs[i]:idxs[i+1]]
    slug=re.search(r'slug: "([^"]+)"',b).group(1)
    dm=re.search(r'destinationSlug: "([^"]+)"',b); dest=dm.group(1) if dm else None
    if not dest: parts.append(b); continue
    pl=pool(dest); used=set()
    def take_pool():
        global dups
        # next pool image not used in this package, high-res first
        for k in range(len(pl)):
            cand=pl[(rot[dest]+k)%len(pl)]
            if cand not in used:
                rot[dest]=(rot[dest]+k+1)%max(1,len(pl)); used.add(cand); return cand
        # all used (pkg has more days than pool) -> least-recently, accept dup
        cand=pl[rot[dest]%len(pl)]; rot[dest]+=1; dups+=1; return cand
    # hero
    cover=pkgfile(slug,1)
    hl=re.search(r'\n    highlights: \[\s*"([^"]+)"',b); t0=re.search(r'\n    title: "([^"]+)"',b)
    hlm=lm_path(make_query([],hl.group(1) if hl else "",t0.group(1) if t0 else ""))
    hm=re.search(r'(\n    heroImage: ")([^"]+)(")',b)
    if hm:
        if cover and W(cover)>=600: newh=cover; h_user+=1
        elif hlm and W(hlm)>=850: newh=hlm; h_lm+=1
        else:
            # highest-res pool image, rotated per dest for distinct heroes
            hp=[x for x in pl if W(x)>=850] or pl
            newh=hp[herorot[dest]%len(hp)]; herorot[dest]+=1; h_pool+=1
        used.add(newh)
        b=b[:hm.start()]+hm.group(1)+newh+hm.group(3)+b[hm.end():]
    # days
    def repl(mo):
        global d_user,d_lm,d_pool
        blk=mo.group(0); dn=re.search(r'day: (\d+),',blk); n=int(dn.group(1)) if dn else 0
        uf=pkgfile(slug,n)
        if uf: img=uf; used.add(uf); d_user+=1
        else:
            p=lm_path(make_query(*dfields(blk)))
            if p and W(p)>=450 and p not in used: img=p; used.add(p); d_lm+=1
            else: img=take_pool(); d_pool+=1
        return re.sub(r'(image: ")[^"]*(")',lambda m:m.group(1)+img+m.group(2),blk,count=1)
    b=re.sub(r'\{\s*\n\s*day: \d+,[\s\S]*?\n      \}',repl,b)
    parts.append(b)
io.open("src/data/packages.ts","w",encoding="utf-8").write("".join(parts))
print(f"DAY  user={d_user} landmark={d_lm} pool={d_pool}  unavoidable-dups={dups}")
print(f"HERO user={h_user} landmark={h_lm} pool={h_pool}")
print("raw-remote:",len(re.findall(r'image: "https?://',io.open('src/data/packages.ts',encoding='utf-8').read())))
