# -*- coding: utf-8 -*-
"""
v2: fix repeated-day packages using a GLOBAL per-destination pool harvested from
EVERY package of that destination (all images[] + all distinct day images) plus
the destination hero/gallery. This surfaces all real, verified, on-location
photos already in the data - so even single-gallery destinations with several
packages (Leh-Ladakh, Maharashtra, Gujarat, MP) get rich variety with zero
web-sourcing / zero broken-image risk. Distinct per-day images are preserved.
"""
import re, io, sys
from collections import Counter, defaultdict
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

ds = io.open("src/data/destinations.ts", encoding="utf-8").read()
hero, gallery = {}, {}
for m in re.finditer(r'slug: "([^"]+)",', ds):
    slug = m.group(1); seg = ds[m.start(): m.start() + 3000]
    hm = re.search(r'heroImage:\s*"([^"]+)"', seg)
    if hm: hero[slug] = hm.group(1)
    gm = re.search(r'galleryImages: \[(.*?)\]', seg, re.S)
    gallery[slug] = re.findall(r'"([^"]+)"', gm.group(1)) if gm else []

ps = io.open("src/data/packages.ts", encoding="utf-8").read()
idxs = [m.start() for m in re.finditer(r'\n    slug: "', ps)] + [len(ps)]

def block_dest(b):
    m = re.search(r'destinationSlug: "([^"]+)"', b); return m.group(1) if m else None
def block_pkg_imgs(b):
    m = re.search(r'\n    images: \[(.*?)\]', b, re.S); return re.findall(r'"([^"]+)"', m.group(1)) if m else []
def block_day_imgs(b):
    return re.findall(r'\n        image: "([^"]*)"', b)

# ---- PASS 1: harvest a verified pool per destination from ALL its packages ----
pool = defaultdict(list)
def add(d, u):
    if u and u not in pool[d]: pool[d].append(u)
for i in range(len(idxs) - 1):
    b = ps[idxs[i]:idxs[i + 1]]; d = block_dest(b)
    if not d: continue
    for u in block_pkg_imgs(b): add(d, u)
    # only add day images that look genuinely distinct (appear once in this pkg)
    di = block_day_imgs(b); fr = Counter(di)
    for u in di:
        if fr[u] == 1: add(d, u)
for d in set(list(hero) + list(gallery)):
    for u in gallery.get(d, []): add(d, u)
    if hero.get(d): add(d, hero[d])

# ---- PASS 2: replace filler day images from the global pool ----
changed_pkgs = changed_days = 0
still_thin = []
new_parts = [ps[:idxs[0]]]
for i in range(len(idxs) - 1):
    b = ps[idxs[i]:idxs[i + 1]]; d = block_dest(b)
    di = block_day_imgs(b)
    if not d or len(di) < 2:
        new_parts.append(b); continue
    h = hero.get(d, "")
    fr = Counter(di)
    def filler(u): return (u == h) or (fr[u] > 1) or (u == "")
    if sum(1 for u in di if filler(u)) == 0:
        new_parts.append(b); continue
    kept = {u for u in di if not filler(u)}
    cycle = [u for u in pool[d] if u not in kept and u != h] or [u for u in pool[d] if u not in kept] or pool[d]
    if len(cycle) < 3:
        still_thin.append((re.search(r'slug: "([^"]+)"', b).group(1), d, len(pool[d])))
        new_parts.append(b); continue
    ms = list(re.finditer(r'\n        image: "([^"]*)"', b))
    parts = []; last = 0; ci = 0
    for mo in ms:
        parts.append(b[last:mo.start()]); cur = mo.group(1)
        if filler(cur):
            parts.append('\n        image: "' + cycle[ci % len(cycle)] + '"'); ci += 1; changed_days += 1
        else:
            parts.append(mo.group(0))
        last = mo.end()
    parts.append(b[last:]); nb = "".join(parts)
    if nb != b: changed_pkgs += 1
    new_parts.append(nb)

io.open("src/data/packages.ts", "w", encoding="utf-8").write("".join(new_parts))
print(f"varied {changed_pkgs} packages ({changed_days} day-images) using global dest pools")
print(f"\nstill thin (pool <3, need real new images): {len(still_thin)}")
for s, d, n in still_thin: print(f"  {s} | {d} | pool {n}")
