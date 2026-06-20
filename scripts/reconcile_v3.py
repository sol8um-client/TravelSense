# -*- coding: utf-8 -*-
"""
Reconcile v3 - run AFTER coord_filter.py:
- DAY image priority: (1) user-generated <pkg>-day<N>.webp  (2) place-verified
  landmark for that day  (3) cycled curated pool (dest hero + <dest>-* + good
  lm + local gallery). Never a raw remote, never a non-place image.
- PACKAGE hero priority: (1) user-generated <pkg>-day1.webp (cover)  (2) the
  package's headline-highlight place-verified landmark  (3) cycled curated pool.
  -> distinct per package, prefers the client's own generated images.
"""
import re,io,os,glob,sys
from collections import defaultdict
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding="utf-8")
GEN="public/images/generated"; LMDIR=GEN+"/lm"

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
JUNK=re.compile(r'\b(arriv|depart|closing|opening|final|prep|descend|ascend|wrap|brief|session|meeting|team|safety|acclimat|leisure|transfer|drive|pickup|drop|weather|conting|hydrate|move|day at|welcome|return|onward)\b',re.I)
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
    return f"/images/generated/lm/{slug}.webp" if os.path.exists(os.path.join(LMDIR,slug+".webp")) else None
def exists_rel(rel): return os.path.exists(rel.lstrip("/").replace("/", os.sep)) if rel.startswith("/images/") else False
def pkgfile(pkg,n):
    rel=f"/images/generated/{pkg}-day{n}.webp"
    return rel if os.path.exists(os.path.join(GEN,f"{pkg}-day{n}.webp")) else None
def day_fields(block):
    t=re.search(r'title: "([^"]+)"',block); t=t.group(1) if t else ""
    am=re.search(r'activities: \[([^\]]*)\]',block); acts=re.findall(r'"([^"]+)"',am.group(1)) if am else []
    hg=re.search(r'highlight: "([^"]*)"',block); hg=hg.group(1) if hg else ""
    return acts,hg,t

ps=io.open("src/data/packages.ts",encoding="utf-8").read()
idxs=[m.start() for m in re.finditer(r'\n    slug: "',ps)]+[len(ps)]
# pass1 good lm per dest
lm_by_dest=defaultdict(list)
for i in range(len(idxs)-1):
    b=ps[idxs[i]:idxs[i+1]]
    dm=re.search(r'destinationSlug: "([^"]+)"',b); dest=dm.group(1) if dm else None
    if not dest: continue
    for dmo in re.finditer(r'\{\s*\n\s*day: \d+,[\s\S]*?\n      \}',b):
        p=lm_path(make_query(*day_fields(dmo.group(0))))
        if p and p not in lm_by_dest[dest]: lm_by_dest[dest].append(p)
def pool(dest):
    p=[]
    if hero.get(dest): p.append(hero[dest])
    files=sorted(glob.glob(f"{GEN}/{dest}-*.webp"))
    rank=lambda f:(0 if("-hero" in f or "-w" in f)else(2 if"-day" in f else 1))
    for f in sorted(files,key=rank): p.append("/images/generated/"+os.path.basename(f))
    for u in lm_by_dest.get(dest,[]): p.append(u)
    for u in localgal.get(dest,[]): p.append(u)
    return list(dict.fromkeys(p)) or [hero.get(dest,"")]

cnt=defaultdict(int); d_user=d_lm=d_pool=h_user=h_lm=h_pool=0
parts=[ps[:idxs[0]]]
for i in range(len(idxs)-1):
    b=ps[idxs[i]:idxs[i+1]]
    slug=re.search(r'slug: "([^"]+)"',b).group(1)
    dm=re.search(r'destinationSlug: "([^"]+)"',b); dest=dm.group(1) if dm else None
    if not dest: parts.append(b); continue
    pl=pool(dest)
    # hero
    cover=pkgfile(slug,1)
    hl=re.search(r'\n    highlights: \[\s*"([^"]+)"',b); t0=re.search(r'\n    title: "([^"]+)"',b)
    hlm=lm_path(make_query([],hl.group(1) if hl else "",t0.group(1) if t0 else ""))
    hm=re.search(r'(\n    heroImage: ")([^"]+)(")',b)
    if hm:
        if cover: newh=cover; h_user+=1
        elif hlm: newh=hlm; h_lm+=1
        else: newh=pl[cnt[dest]%len(pl)]; cnt[dest]+=1; h_pool+=1
        b=b[:hm.start()]+hm.group(1)+newh+hm.group(3)+b[hm.end():]
    # days
    def repl(mo):
        global d_user,d_lm,d_pool
        blk=mo.group(0); dn=re.search(r'day: (\d+),',blk); n=int(dn.group(1)) if dn else 0
        uf=pkgfile(slug,n)
        if uf: img=uf; d_user+=1
        else:
            p=lm_path(make_query(*day_fields(blk)))
            if p: img=p; d_lm+=1
            else: img=pl[cnt[dest]%len(pl)]; cnt[dest]+=1; d_pool+=1
        return re.sub(r'(image: ")[^"]*(")',lambda m:m.group(1)+img+m.group(2),blk,count=1)
    b=re.sub(r'\{\s*\n\s*day: \d+,[\s\S]*?\n      \}',repl,b)
    parts.append(b)
io.open("src/data/packages.ts","w",encoding="utf-8").write("".join(parts))
print(f"DAY  user-generated={d_user}  exact-landmark={d_lm}  curated-pool={d_pool}")
print(f"HERO user-cover={h_user}  highlight-landmark={h_lm}  curated-pool={h_pool}")
print("raw-remote left:",len(re.findall(r'image: "https?://',io.open("src/data/packages.ts",encoding="utf-8").read())))
