# -*- coding: utf-8 -*-
"""Repoint every package heroImage that is still remote/Unsplash to a CURATED
image from its destination's pool (the dest's new hero + self-hosted
/images/generated/<dest>-*.webp + any local gallery entries). Cycles for
variety so packages of the same destination don't all share one image.
Only verified/self-hosted images are used."""
import re,io,os,glob,sys
from collections import defaultdict
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding="utf-8")

GEN="public/images/generated"
ds=io.open("src/data/destinations.ts",encoding="utf-8").read()

hero={}; localgal=defaultdict(list)
for m in re.finditer(r'slug: "([^"]+)",',ds):
    slug=m.group(1); seg=ds[m.start():m.start()+3000]
    hm=re.search(r'heroImage:\s*"([^"]+)"',seg)
    if hm and hm.group(1).startswith("/images/"): hero[slug]=hm.group(1)
    gm=re.search(r'galleryImages: \[(.*?)\]',seg,re.S)
    if gm:
        for u in re.findall(r'"([^"]+)"',gm.group(1)):
            if u.startswith("/images/"): localgal[slug].append(u)

def curated_pool(dest):
    pool=[]
    if hero.get(dest): pool.append(hero[dest])
    # self-hosted landmark/gallery images for this dest, prefer hero/w/landmark over dayN
    files=sorted(glob.glob(f"{GEN}/{dest}-*.webp"))
    rank=lambda f: (0 if ("-hero" in f or "-w" in f) else (2 if "-day" in f else 1))
    for f in sorted(files,key=rank):
        p="/images/generated/"+os.path.basename(f)
        if p not in pool: pool.append(p)
    for u in localgal.get(dest,[]):
        if u not in pool: pool.append(u)
    return pool

ps=io.open("src/data/packages.ts",encoding="utf-8").read()
idxs=[m.start() for m in re.finditer(r'\n    slug: "',ps)]+[len(ps)]
cnt=defaultdict(int); changed=0; nopool=set()
parts=[ps[:idxs[0]]]
for i in range(len(idxs)-1):
    b=ps[idxs[i]:idxs[i+1]]
    dest_m=re.search(r'destinationSlug: "([^"]+)"',b)
    hm=re.search(r'(\n    heroImage: ")([^"]+)(")',b)
    if not dest_m or not hm:
        parts.append(b); continue
    dest=dest_m.group(1); cur=hm.group(2)
    if cur.startswith("/images/"):  # already local
        parts.append(b); continue
    pool=curated_pool(dest)
    if not pool:
        nopool.add(dest); parts.append(b); continue
    newimg=pool[cnt[dest]%len(pool)]; cnt[dest]+=1
    b=b[:hm.start()]+hm.group(1)+newimg+hm.group(3)+b[hm.end():]
    changed+=1
    parts.append(b)
io.open("src/data/packages.ts","w",encoding="utf-8").write("".join(parts))
print(f"repointed {changed} package heroes to curated images")
if nopool: print("no curated pool for:",sorted(nopool))
