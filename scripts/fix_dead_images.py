"""Replace every DEAD Unsplash image (404) with a working, region-correct image.

Strategy:
- The 3 destinations whose hero itself 404'd (gujarat, jordan, uzbekistan) get a
  real local webp (sourced separately).
- Every other dead URL -> the hero image of the destination it belongs to
  (destinations.ts via slug ranges; packages.ts via each package's
  destinationSlug). Region-correct, reuses existing working assets, never rots.
- Gallery arrays are de-duped so a destination gallery never repeats one image.
"""
import re
import json

DEAD = set(json.load(open("scripts/_dead_unsplash.txt", encoding="utf-8"))["dead_status"])
LOCAL = {
    "gujarat": "/images/destinations/gujarat.webp",
    "jordan": "/images/destinations/jordan.webp",
    "uzbekistan": "/images/destinations/uzbekistan.webp",
    "chhattisgarh": "/images/destinations/chhattisgarh.webp",
    "telangana": "/images/destinations/telangana.webp",
    "bihar": "/images/destinations/bihar.webp",
    "azerbaijan": "/images/destinations/azerbaijan.webp",
    "philippines": "/images/destinations/philippines.webp",
}
URL_RE = re.compile(r'"(https://images\.unsplash\.com/photo-[^"]*)"')


def is_dead(url):
    m = re.search(r"images\.unsplash\.com/photo-([A-Za-z0-9_-]+)", url)
    return bool(m) and m.group(1) in DEAD


def last_before(positions, pos):
    s = None
    for p, n in positions:
        if p <= pos:
            s = n
        else:
            break
    return s


# ---- hero map (dest slug -> hero), 3 dead ones overridden to local ----------
dt = open("src/data/destinations.ts", encoding="utf-8").read()
hero_map = {}
for m in re.finditer(r'slug:\s*"([^"]+)"', dt):
    h = re.search(r'heroImage:\s*"([^"]+)"', dt[m.end():m.end() + 2500])
    if h:
        hero_map[m.group(1)] = h.group(1)
hero_map.update(LOCAL)

# ---------------------------------------------------- destinations.ts --------
dslug_pos = [(m.start(), m.group(1)) for m in re.finditer(r'slug:\s*"([^"]+)"', dt)]
nd = [0]


def repl_dt(m):
    url = m.group(1)
    if is_dead(url):
        nd[0] += 1
        return '"' + hero_map.get(last_before(dslug_pos, m.start()), url) + '"'
    return m.group(0)


dt = URL_RE.sub(repl_dt, dt)


# de-dupe each galleryImages array (preserve order)
def dedupe_gallery(m):
    head, body = m.group(1), m.group(2)
    urls = re.findall(r'"([^"]+)"', body)
    seen, keep = set(), []
    for u in urls:
        if u not in seen:
            seen.add(u)
            keep.append(u)
    inner = ",\n      ".join('"%s"' % u for u in keep)
    return "%s[\n      %s,\n    ]" % (head, inner)


dt = re.sub(r"(galleryImages:\s*)\[(.*?)\]", dedupe_gallery, dt, flags=re.S)
open("src/data/destinations.ts", "w", encoding="utf-8").write(dt)
print("destinations.ts: replaced %d dead URLs (+ galleries de-duped)" % nd[0])

# ---------------------------------------------------- packages.ts ------------
pk = open("src/data/packages.ts", encoding="utf-8").read()
dsl_pos = [(m.start(), m.group(1)) for m in re.finditer(r'destinationSlug:\s*"([^"]+)"', pk)]
npk = [0]
missing = set()


def repl_pk(m):
    url = m.group(1)
    if is_dead(url):
        npk[0] += 1
        ds = last_before(dsl_pos, m.start())
        if ds not in hero_map:
            missing.add(ds)
        return '"' + hero_map.get(ds, url) + '"'
    return m.group(0)


pk = URL_RE.sub(repl_pk, pk)
open("src/data/packages.ts", "w", encoding="utf-8").write(pk)
print("packages.ts: replaced %d dead URLs" % npk[0])
if missing:
    print("  WARN unmapped destinationSlugs:", missing)
