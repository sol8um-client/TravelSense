"""Audit every distinct Unsplash photo ID used in the data files.

Checks each ID once (status depends on the ID, not the ?w=… params), concurrently,
and writes the dead ones (non-200) to scripts/_dead_unsplash.txt with the slug(s)
that reference each.
"""
import re
import json
import urllib.request
from concurrent.futures import ThreadPoolExecutor

FILES = ["src/data/destinations.ts", "src/data/packages.ts"]

# ---- collect ids -> where they're used ------------------------------------
ids = set()
for f in FILES:
    t = open(f, encoding="utf-8").read()
    for m in re.finditer(r"https://images\.unsplash\.com/photo-([A-Za-z0-9_-]+)", t):
        ids.add(m.group(1))
ids = sorted(ids)


def check(pid):
    url = "https://images.unsplash.com/photo-%s?w=200&q=60" % pid
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return pid, r.status
    except urllib.error.HTTPError as e:
        return pid, e.code
    except Exception as e:
        return pid, "ERR:" + type(e).__name__


results = {}
with ThreadPoolExecutor(max_workers=16) as ex:
    for pid, status in ex.map(check, ids):
        results[pid] = status

dead = {pid: s for pid, s in results.items() if s != 200}
alive = len(results) - len(dead)
print("checked %d ids:  alive=%d  dead=%d" % (len(results), alive, len(dead)))

# ---- map each dead id -> referencing slugs --------------------------------
def slug_map(text):
    slugs = [(m.start(), m.group(1)) for m in re.finditer(r'slug:\s*"([^"]+)"', text)]
    def slug_for(pos):
        s = "?"
        for p, n in slugs:
            if p <= pos:
                s = n
            else:
                break
        return s
    return slug_for

dead_detail = {}
for f in FILES:
    t = open(f, encoding="utf-8").read()
    sf = slug_map(t)
    for pid in dead:
        locs = []
        for m in re.finditer(r"https://images\.unsplash\.com/photo-" + re.escape(pid), t):
            locs.append(sf(m.start()))
        if locs:
            from collections import Counter
            dead_detail.setdefault(pid, {})[f.split("/")[-1]] = dict(Counter(locs))

open("scripts/_dead_unsplash.txt", "w", encoding="utf-8").write(
    json.dumps({"dead_status": dead, "usage": dead_detail}, indent=2)
)
print("\nDEAD IDs and where they're used:")
for pid, where in dead_detail.items():
    print(" ", pid, dead.get(pid), where)
