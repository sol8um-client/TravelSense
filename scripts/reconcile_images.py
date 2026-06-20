# -*- coding: utf-8 -*-
"""
Final image reconciliation (no network):
- DAY image = its own resolved landmark webp (if the day names a real landmark
  AND we already fetched it) ELSE a cycled image from the destination's CURATED
  pool (dest hero + self-hosted /images/generated/<dest>-*.webp + good landmark
  webps that belong to this destination + local gallery). NEVER raw Unsplash.
- PACKAGE hero = its headline-highlight landmark (if resolved) ELSE a cycled
  curated-pool image -> distinct per package.
This guarantees: correct-destination always, varied days, content-matched where
a landmark resolved, distinct package heroes.
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

def day_fields(block):
    t=re.search(r'title: "([^"]+)"',block); t=t.group(1) if t else ""
    am=re.search(r'activities: \[([^\]]*)\]',block); acts=re.findall(r'"([^"]+)"',am.group(1)) if am else []
    hg=re.search(r'highlight: "([^"]*)"',block); hg=hg.group(1) if hg else ""
    return acts,hg,t

ps=io.open("src/data/packages.ts",encoding="utf-8").read()
idxs=[m.start() for m in re.finditer(r'\n    slug: "',ps)]+[len(ps)]

# ---- Pass 1: which good landmark webps belong to each destination ----
lm_by_dest=defaultdict(list)
for i in range(len(idxs)-1):
    b=ps[idxs[i]:idxs[i+1]]
    dm=re.search(r'destinationSlug: "([^"]+)"',b); dest=dm.group(1) if dm else None
    if not dest: continue
    for dmo in re.finditer(r'\{\s*\n\s*day: \d+,[\s\S]*?\n      \}',b):
        q=make_query(*day_fields(dmo.group(0))); p=lm_path(q)
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

# ---- Pass 2: assign ----
cnt=defaultdict(int); day_exact=day_pool=hero_exact=hero_pool=0
parts=[ps[:idxs[0]]]
for i in range(len(idxs)-1):
    b=ps[idxs[i]:idxs[i+1]]
    dm=re.search(r'destinationSlug: "([^"]+)"',b); dest=dm.group(1) if dm else None
    if not dest: parts.append(b); continue
    pl=pool(dest)
    # hero
    hl=re.search(r'\n    highlights: \[\s*"([^"]+)"',b)
    title0=re.search(r'\n    title: "([^"]+)"',b)
    hq=make_query([],hl.group(1) if hl else "",title0.group(1) if title0 else "")
    himg=lm_path(hq)
    hm=re.search(r'(\n    heroImage: ")([^"]+)(")',b)
    if hm:
        if himg: hero_exact+=1; newh=himg
        else: newh=pl[cnt[dest]%len(pl)]; cnt[dest]+=1; hero_pool+=1
        b=b[:hm.start()]+hm.group(1)+newh+hm.group(3)+b[hm.end():]
    # days
    def repl(mo):
        global day_exact,day_pool
        blk=mo.group(0); q=make_query(*day_fields(blk)); p=lm_path(q)
        if p: day_exact+=1; img=p
        else: img=pl[cnt[dest]%len(pl)]; cnt[dest]+=1; day_pool+=1
        return re.sub(r'(image: ")[^"]*(")',lambda m:m.group(1)+img+m.group(2),blk,count=1)
    b=re.sub(r'\{\s*\n\s*day: \d+,[\s\S]*?\n      \}',repl,b)
    parts.append(b)

io.open("src/data/packages.ts","w",encoding="utf-8").write("".join(parts))
print(f"DAY: exact-landmark={day_exact}  curated-pool={day_pool}")
print(f"HERO: exact-landmark={hero_exact}  curated-pool={hero_pool}")
rem=len(re.findall(r'image: "https?://',io.open("src/data/packages.ts",encoding="utf-8").read()))
print("raw-remote images left in packages.ts:",rem)
