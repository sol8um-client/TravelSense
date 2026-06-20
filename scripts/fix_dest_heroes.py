# -*- coding: utf-8 -*-
"""Replace the 28 destination heroes still on Unsplash/remote with verified
Wikipedia landmark photos (self-hosted webp). 6 intl already have w1 images
fetched earlier - reuse those. Then update heroImage in destinations.ts."""
import json,os,re,subprocess,sys,io,urllib.request,urllib.parse
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding="utf-8")
GEN=r"E:/TravelSense/travelsense/public/images/generated"
UA="TravelSenseImageBot/1.0 (https://travelsense.co.in; contact@travelsense.co.in)"

# slug -> Wikipedia page title (most iconic landmark) to FETCH a new hero
FETCH={
 "maharashtra":"Gateway of India","madhya-pradesh":"Khajuraho Group of Monuments",
 "singapore":"Marina Bay Sands","sri-lanka":"Sigiriya","west-bengal":"Victoria Memorial, Kolkata",
 "odisha":"Konark Sun Temple","tamil-nadu":"Meenakshi Temple","lakshadweep":"Lakshadweep",
 "malaysia":"Petronas Towers","south-africa":"Table Mountain","kenya":"Maasai Mara",
 "japan":"Mount Fuji","iceland":"Kirkjufell","kazakhstan":"Charyn Canyon",
 "finland":"Lapland (Finland)","europe":"Eiffel Tower","australia":"Sydney Opera House",
 "new-zealand":"Milford Sound","mauritius":"Le Morne Brabant","seychelles":"La Digue",
 "fiji":"Mamanuca Islands","reunion-island":"Piton de la Fournaise",
}
# slug -> existing already-fetched gallery image to REUSE as hero
REUSE={
 "hong-kong":"hong-kong-w1.webp","oman":"oman-w1.webp","saudi-arabia":"saudi-arabia-w1.webp",
 "cambodia-laos":"cambodia-laos-w1.webp","russia":"russia-w1.webp","ireland":"ireland-w1.webp",
}

def wiki_img(title):
    u="https://en.wikipedia.org/api/rest_v1/page/summary/"+urllib.parse.quote(title,safe="")
    r=urllib.request.Request(u,headers={"User-Agent":UA,"Accept":"application/json"})
    j=json.load(urllib.request.urlopen(r,timeout=30))
    for k in("originalimage","thumbnail"):
        s=(j.get(k) or {}).get("source")
        if s and re.search(r"\.(jpg|jpeg|png)$",s,re.I): return s
    return None

heroref={}  # slug -> /images/... path
for slug,title in FETCH.items():
    try:
        s=wiki_img(title)
        if not s: print("  !!",slug,"no image for",title); continue
        ext=".png" if s.lower().endswith(".png") else ".jpg"
        tmp=os.path.join(GEN,f"_h_{slug}{ext}")
        urllib.request.urlretrieve.__self__ if False else None
        rq=urllib.request.Request(s,headers={"User-Agent":UA})
        open(tmp,"wb").write(urllib.request.urlopen(rq,timeout=60).read())
        out=os.path.join(GEN,f"{slug}-hero.webp")
        r=subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",tmp,
            "-vf","scale='min(1600,iw)':-2","-c:v","libwebp","-quality","82",out],capture_output=True,text=True)
        os.remove(tmp)
        if r.returncode==0:
            heroref[slug]=f"/images/generated/{slug}-hero.webp"; print(f"  ok {slug}-hero.webp <= {title}")
        else: print("  FFMPEG FAIL",slug,r.stderr[:100])
    except Exception as e: print("  ERR",slug,title,repr(e)[:120])

for slug,fn in REUSE.items():
    if os.path.exists(os.path.join(GEN,fn)):
        heroref[slug]=f"/images/generated/{fn}"; print(f"  reuse {slug} <= {fn}")

# ---- update destinations.ts heroImage for these slugs ----
DEST="src/data/destinations.ts"
ds=io.open(DEST,encoding="utf-8").read()
n=0
for slug,path in heroref.items():
    i=ds.find(f'slug: "{slug}",'); nxt=ds.find('slug: "',i+10)
    seg=ds[i:nxt]
    seg2=re.sub(r'(heroImage:\s*")[^"]+(")', lambda m:m.group(1)+path+m.group(2), seg, count=1)
    if seg2!=seg: ds=ds[:i]+seg2+ds[nxt:]; n+=1
io.open(DEST,"w",encoding="utf-8").write(ds)
print(f"\nupdated {n} destination heroImages")
print("RESULT_SLUGS =", list(heroref.keys()))
