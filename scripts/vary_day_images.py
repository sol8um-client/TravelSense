# -*- coding: utf-8 -*-
"""
Fix packages whose itinerary days repeat one photo: give each day a distinct,
on-location image cycled from a VERIFIED pool = the destination's heroImage +
galleryImages + the package's own images[]. Only known-good images are used
(no web sourcing, no broken-image risk). Already-distinct per-day images are
preserved; only the repeated/hero "filler" days are replaced. Destinations
without a rich enough pool (<4 unique) are skipped and reported.
"""
import re, io, sys
from collections import Counter
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

# ---- destination hero + gallery ----
ds = io.open("src/data/destinations.ts", encoding="utf-8").read()
hero, gallery = {}, {}
for m in re.finditer(r'slug: "([^"]+)",', ds):
    slug = m.group(1)
    seg = ds[m.start(): m.start() + 3000]
    hm = re.search(r'heroImage:\s*"([^"]+)"', seg)
    if hm: hero[slug] = hm.group(1)
    gm = re.search(r'galleryImages: \[(.*?)\]', seg, re.S)
    gallery[slug] = re.findall(r'"([^"]+)"', gm.group(1)) if gm else []

ps = io.open("src/data/packages.ts", encoding="utf-8").read()
idxs = [m.start() for m in re.finditer(r'\n    slug: "', ps)]
idxs.append(len(ps))

out = ps
# process from the LAST block backwards so earlier offsets stay valid
blocks = []
for i in range(len(idxs) - 1):
    blocks.append((idxs[i], idxs[i + 1]))

changed_pkgs = 0
changed_days = 0
skipped = []

new_ps = []
prev_end = 0
for (a, b) in blocks:
    block = ps[a:b]
    slug = re.search(r'slug: "([^"]+)"', block).group(1)
    dm = re.search(r'destinationSlug: "([^"]+)"', block)
    dest = dm.group(1) if dm else None
    # package images[] (first images: [...] in block)
    pim = re.search(r'\n    images: \[(.*?)\]', block, re.S)
    pkg_imgs = re.findall(r'"([^"]+)"', pim.group(1)) if pim else []
    # itinerary day image lines (8-space indent)
    day_imgs = re.findall(r'\n        image: "([^"]*)"', block)

    if dest is None or len(day_imgs) < 2:
        new_ps.append(block); continue

    pool = []
    for u in ([hero.get(dest, "")] + gallery.get(dest, []) + pkg_imgs):
        if u and u not in pool:
            pool.append(u)
    h = hero.get(dest, "")

    freq = Counter(day_imgs)
    # which day images are "filler" = the hero, or any URL used on >1 day
    def is_filler(u): return (u == h) or (freq[u] > 1) or (u == "")
    n_filler = sum(1 for u in day_imgs if is_filler(u))

    # need a meaningful pool to improve
    if len(pool) < 4 or n_filler == 0:
        if n_filler > 0:
            skipped.append((slug, dest, f"pool {len(pool)}"))
        new_ps.append(block); continue

    # images already kept on distinct days (don't reuse those)
    kept = {u for u in day_imgs if not is_filler(u)}
    cycle = [u for u in pool if u not in kept] or pool

    # rebuild the block, replacing filler day-image lines in order
    matches = list(re.finditer(r'\n        image: "([^"]*)"', block))
    parts = []
    last = 0
    ci = 0
    for mo in matches:
        parts.append(block[last:mo.start()])
        cur = mo.group(1)
        if is_filler(cur):
            new = cycle[ci % len(cycle)]
            ci += 1
            changed_days += 1
            parts.append('\n        image: "' + new + '"')
        else:
            parts.append(mo.group(0))
        last = mo.end()
    parts.append(block[last:])
    block2 = "".join(parts)
    if block2 != block:
        changed_pkgs += 1
    new_ps.append(block2)

# reassemble: prefix before first block + blocks
out = ps[:idxs[0]] + "".join(new_ps)
io.open("src/data/packages.ts", "w", encoding="utf-8").write(out)

print(f"varied day images in {changed_pkgs} packages ({changed_days} day-images updated)")
print(f"\nSKIPPED (pool too small / needs real images): {len(skipped)}")
for s, d, why in skipped: print(f"  {s} | {d} | {why}")
