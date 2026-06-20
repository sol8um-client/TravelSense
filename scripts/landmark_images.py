# -*- coding: utf-8 -*-
"""
Content-match every itinerary day image AND every package hero to its actual
landmark, fetched from Wikipedia (generator=search with country context for
disambiguation), self-hosted as webp. Falls back to the destination hero when a
day/package is generic - so an image is NEVER the wrong destination.

Day image  = landmark of (first specific activity | highlight | title place)
Package hero = landmark of (highlights[0] | title place)  -> distinct per package
"""
import json,os,re,io,sys,subprocess,urllib.request,urllib.parse,hashlib
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding="utf-8")

GEN="public/images/generated"
LM=os.path.join(GEN,"lm"); os.makedirs(LM,exist_ok=True)
UA="TravelSenseImageBot/1.0 (https://travelsense.co.in; contact@travelsense.co.in)"

# ---- destination hero + country ----
ds=io.open("src/data/destinations.ts",encoding="utf-8").read()
desthero={}; country={}
for m in re.finditer(r'slug: "([^"]+)",',ds):
    slug=m.group(1); seg=ds[m.start():m.start()+3000]
    hm=re.search(r'heroImage:\s*"([^"]+)"',seg);
    if hm: desthero[slug]=hm.group(1)
    cm=re.search(r'country:\s*"([^"]+)"',seg)
    country[slug]=cm.group(1) if cm else "India"

GENERIC=re.compile(r'\b(arriv|depart|airport|transfer|drive|leisure|check|hotel|welcome|breakfast|free day|shopping|return|onward|rest|optional|day at|relax|overnight|pickup|drop|en route|farewell|briefing|session|meeting|wrap|acclimat|pre-dawn|team|safety|kit check|weather|contingency|move into|hydrate)\b',re.I)
TRAIL=re.compile(r'\s+(walk|tour|visit|darshan|sunrise|sunset|hike|trek|ride|cruise|safari|climb|ascent|descent|start|day|excursion|viewpoint|photography|stop|show|experience|exploration|circuit|crossing|trail)$',re.I)

def make_query(activities, highlight, title):
    cand=None
    for a in activities:
        if a and not GENERIC.search(a): cand=a; break
    if not cand and highlight and not GENERIC.search(highlight): cand=highlight
    if not cand:
        t=re.split(r'[—\-,&]| to | via | in ',title)[0]
        if t and not GENERIC.search(t): cand=t
    if not cand: return None
    cand=re.sub(r'\(.*?\)','',cand).strip(' .-–—')
    for _ in range(2): cand=TRAIL.sub('',cand).strip()
    cand=cand.strip()
    if len(cand)<3 or GENERIC.search(cand): return None
    return cand

def wiki_image(query, ctry):
    """generator=search + pageimages -> best on-subject image url."""
    q=f"{query} {ctry}"
    api=("https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1"
         "&generator=search&gsrlimit=1&gsrsearch="+urllib.parse.quote(q)+
         "&prop=pageimages&piprop=original|thumbnail&pithumbsize=1200")
    r=urllib.request.Request(api,headers={"User-Agent":UA})
    j=json.load(urllib.request.urlopen(r,timeout=30))
    pages=(j.get("query") or {}).get("pages") or {}
    for _,p in pages.items():
        for k in ("original","thumbnail"):
            src=(p.get(k) or {}).get("source")
            if src and re.search(r"\.(jpg|jpeg|png)$",src,re.I): return src
    return None

cache={}  # query -> webp path or None
def lm_for(query, ctry):
    if not query: return None
    key=query.lower()+"|"+ctry.lower()
    if key in cache: return cache[key]
    slug=re.sub(r'[^a-z0-9]+','-',query.lower()).strip('-')[:50]
    out=os.path.join(LM,slug+".webp"); rel=f"/images/generated/lm/{slug}.webp"
    if os.path.exists(out): cache[key]=rel; return rel
    try:
        src=wiki_image(query,ctry)
        if not src: cache[key]=None; return None
        ext=".png" if src.lower().endswith(".png") else ".jpg"
        tmp=os.path.join(LM,"_t_"+slug+ext)
        rq=urllib.request.Request(src,headers={"User-Agent":UA})
        open(tmp,"wb").write(urllib.request.urlopen(rq,timeout=60).read())
        r=subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",tmp,
            "-vf","scale='min(1200,iw)':-2","-c:v","libwebp","-quality","80",out],
            capture_output=True,text=True)
        os.remove(tmp)
        cache[key]= rel if r.returncode==0 else None
    except Exception:
        cache[key]=None
    return cache[key]

# ---- walk packages: wire day images + heroes ----
ps=io.open("src/data/packages.ts",encoding="utf-8").read()
idxs=[m.start() for m in re.finditer(r'\n    slug: "',ps)]+[len(ps)]
parts=[ps[:idxs[0]]]
day_set=day_fb=hero_set=hero_fb=0
for i in range(len(idxs)-1):
    b=ps[idxs[i]:idxs[i+1]]
    dm=re.search(r'destinationSlug: "([^"]+)"',b)
    dest=dm.group(1) if dm else None
    ctry=country.get(dest,"India"); dh=desthero.get(dest,"")
    # hero from highlights[0]
    hl=re.search(r'\n    highlights: \[\s*"([^"]+)"',b)
    title0=re.search(r'\n    title: "([^"]+)"',b)
    hq=make_query([], hl.group(1) if hl else "", title0.group(1) if title0 else "")
    himg=lm_for(hq,ctry) if hq else None
    hm=re.search(r'(\n    heroImage: ")([^"]+)(")',b)
    if hm:
        newh=himg or dh or hm.group(2)
        if himg: hero_set+=1
        else: hero_fb+=1
        b=b[:hm.start()]+hm.group(1)+newh+hm.group(3)+b[hm.end():]
    # day objects
    def day_repl(mo):
        global day_set,day_fb
        block=mo.group(0)
        t=re.search(r'title: "([^"]+)"',block); t=t.group(1) if t else ""
        am=re.search(r'activities: \[([^\]]*)\]',block)
        acts=re.findall(r'"([^"]+)"',am.group(1)) if am else []
        hg=re.search(r'highlight: "([^"]*)"',block); hg=hg.group(1) if hg else ""
        q=make_query(acts,hg,t)
        img=lm_for(q,ctry) if q else None
        final=img or dh
        if not final: return block
        if img: day_set+=1
        else: day_fb+=1
        return re.sub(r'(image: ")[^"]*(")', lambda m:m.group(1)+final+m.group(2), block, count=1)
    b=re.sub(r'\{\s*\n\s*day: \d+,[\s\S]*?\n      \}', day_repl, b)
    parts.append(b)

io.open("src/data/packages.ts","w",encoding="utf-8").write("".join(parts))
print(f"DAY images: matched={day_set} fallback-to-destHero={day_fb}")
print(f"HERO images: matched={hero_set} fallback-to-destHero={hero_fb}")
print(f"unique landmark images cached: {sum(1 for v in cache.values() if v)} / queries {len(cache)}")
