"""Point Bhutan's dead Unsplash images at the local Tiger's Nest webp.

- destinations.ts : replace every unsplash URL inside the Bhutan object.
- packages.ts     : the two Bhutan-ONLY dead IDs replaced everywhere; the
                    shared ID (1571…, also used by student packages) replaced
                    ONLY inside bhutan-* package blocks.
"""
import re

LOCAL = "/images/destinations/bhutan.webp"
UNSPLASH = re.compile(r"https://images\.unsplash\.com/photo-[^\"\s]*")
BHUTAN_ONLY = ["1602001011404-ec9c5e5c5e6f", "1531219432768-9f540ce91934"]
SHARED = "1571536802807-30451a456b58"

# ---------------- destinations.ts : whole Bhutan object ----------------------
p = "src/data/destinations.ts"
dt = open(p, encoding="utf-8").read()
m = re.search(r'slug:\s*"bhutan"', dt)
st = dt.rfind("{", 0, m.start())
nm = re.search(r"\n  \{", dt[m.end():])
en = m.end() + nm.start() if nm else len(dt)
before = dt[st:en].count("unsplash.com")
dt = dt[:st] + UNSPLASH.sub(LOCAL, dt[st:en]) + dt[en:]
open(p, "w", encoding="utf-8").write(dt)
print("destinations.ts: replaced %d unsplash URLs in the Bhutan object" % before)

# ---------------- packages.ts ------------------------------------------------
p = "src/data/packages.ts"
pk = open(p, encoding="utf-8").read()

# 1) Bhutan-only IDs -> local, everywhere
n1 = 0
for id_ in BHUTAN_ONLY:
    pk, c = re.subn(r"https://images\.unsplash\.com/photo-" + re.escape(id_) + r"[^\"]*", LOCAL, pk)
    n1 += c

# 2) shared ID -> local, but only inside bhutan-* package blocks
slugs = [(mm.start(), mm.group(1)) for mm in re.finditer(r'slug:\s*"([^"]+)"', pk)]
shared_re = re.compile(r"https://images\.unsplash\.com/photo-" + re.escape(SHARED) + r"[^\"]*")
n2 = 0
for i in range(len(slugs) - 1, -1, -1):
    pos, name = slugs[i]
    if name.startswith("bhutan"):
        blk_start = pk.rfind("{", 0, pos)
        blk_end = slugs[i + 1][0] if i + 1 < len(slugs) else len(pk)
        seg = pk[blk_start:blk_end]
        seg2, c = shared_re.subn(LOCAL, seg)
        n2 += c
        pk = pk[:blk_start] + seg2 + pk[blk_end:]

open(p, "w", encoding="utf-8").write(pk)
print("packages.ts: replaced %d Bhutan-only + %d scoped-shared URLs" % (n1, n2))
