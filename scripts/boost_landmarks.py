# -*- coding: utf-8 -*-
"""Rate-limited re-fetch of the landmark queries that throttled the first time.
Only fetches real-landmark queries (not junk) that don't already have an lm
webp. Adds a delay between calls to avoid Wikipedia throttling, so the exact
per-day match rate goes way up. Re-run reconcile_images.py afterwards."""
import json,os,re,io,sys,subprocess,time,urllib.request,urllib.parse
from collections import OrderedDict
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding="utf-8")
GEN="public/images/generated"; LMDIR=GEN+"/lm"
UA="TravelSenseImageBot/1.0 (https://travelsense.co.in; contact@travelsense.co.in)"

ds=io.open("src/data/destinations.ts",encoding="utf-8").read()
country={}
for m in re.finditer(r'slug: "([^"]+)",',ds):
    seg=ds[m.start():m.start()+3000]; cm=re.search(r'country:\s*"([^"]+)"',seg)
    country[m.group(1)]=cm.group(1) if cm else "India"

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

# collect (query -> country) for all good-landmark day queries
ps=io.open("src/data/packages.ts",encoding="utf-8").read()
idxs=[m.start() for m in re.finditer(r'\n    slug: "',ps)]+[len(ps)]
want=OrderedDict()
for i in range(len(idxs)-1):
    b=ps[idxs[i]:idxs[i+1]]
    dm=re.search(r'destinationSlug: "([^"]+)"',b); dest=dm.group(1) if dm else None
    if not dest: continue
    ctry=country.get(dest,"India")
    # day queries
    for dmo in re.finditer(r'\{\s*\n\s*day: \d+,[\s\S]*?\n      \}',b):
        blk=dmo.group(0)
        t=re.search(r'title: "([^"]+)"',blk); t=t.group(1) if t else ""
        am=re.search(r'activities: \[([^\]]*)\]',blk); acts=re.findall(r'"([^"]+)"',am.group(1)) if am else []
        hg=re.search(r'highlight: "([^"]*)"',blk); hg=hg.group(1) if hg else ""
        q=make_query(acts,hg,t)
        if q and not JUNK.search(q): want.setdefault(q,ctry)
    # hero highlight query
    hl=re.search(r'\n    highlights: \[\s*"([^"]+)"',b)
    t0=re.search(r'\n    title: "([^"]+)"',b)
    hq=make_query([],hl.group(1) if hl else "",t0.group(1) if t0 else "")
    if hq and not JUNK.search(hq): want.setdefault(hq,ctry)

def slugify(q): return re.sub(r'[^a-z0-9]+','-',q.lower()).strip('-')[:50]
todo=[(q,c) for q,c in want.items() if not os.path.exists(os.path.join(LMDIR,slugify(q)+".webp"))]
print(f"unique good queries: {len(want)} | already cached: {len(want)-len(todo)} | to fetch: {len(todo)}")

def wiki(q,ctry):
    api=("https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1"
         "&generator=search&gsrlimit=1&gsrsearch="+urllib.parse.quote(f"{q} {ctry}")+
         "&prop=pageimages&piprop=original|thumbnail&pithumbsize=1200")
    j=json.load(urllib.request.urlopen(urllib.request.Request(api,headers={"User-Agent":UA}),timeout=25))
    for _,p in ((j.get("query") or {}).get("pages") or {}).items():
        for k in ("original","thumbnail"):
            s=(p.get(k) or {}).get("source")
            if s and re.search(r"\.(jpg|jpeg|png)$",s,re.I): return s
    return None

ok=fail=0
for n,(q,ctry) in enumerate(todo,1):
    try:
        s=wiki(q,ctry)
        if s:
            ext=".png" if s.lower().endswith(".png") else ".jpg"
            tmp=os.path.join(LMDIR,"_b_"+slugify(q)+ext)
            open(tmp,"wb").write(urllib.request.urlopen(urllib.request.Request(s,headers={"User-Agent":UA}),timeout=50).read())
            out=os.path.join(LMDIR,slugify(q)+".webp")
            r=subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",tmp,
                "-vf","scale='min(1200,iw)':-2","-c:v","libwebp","-quality","80",out],capture_output=True,text=True)
            os.remove(tmp)
            if r.returncode==0: ok+=1
            else: fail+=1
        else: fail+=1
    except Exception:
        fail+=1
    time.sleep(0.4)
    if n%100==0: print(f"  {n}/{len(todo)} ... ok={ok}",flush=True)
print(f"DONE boost: newly fetched={ok}, failed/no-image={fail}")
