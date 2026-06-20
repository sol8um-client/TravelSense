# -*- coding: utf-8 -*-
"""Wire the new per-day images into packages.ts itinerary day objects."""
import re, io

P = "src/data/packages.ts"
s = io.open(P, encoding="utf-8").read()

WIRE = {
    "rajasthan-lakes-and-hills": [1,2,3,4,5,6,7],
    "brij-bhoomi-yatra": [1,2,3,4],
    "ujjain-omkareshwar": [1,2,3,4,5],
    "scintillating-tropical-tour-to-sri-lanka": [1,2,3,4,5,6,7],
    "scenic-sri-lanka": [3,4,5,6,7],
}

total = 0
for pkg, days in WIRE.items():
    i = s.find(f'slug: "{pkg}"')
    if i == -1:
        print("NOT FOUND:", pkg); continue
    nxt = s.find('slug: "', i + 10)
    seg = s[i: nxt if nxt != -1 else len(s)]
    before = seg
    for n in days:
        new = f"/images/generated/{pkg}-day{n}.webp"
        # within day n's object (up to the next `day: X,`), replace its image
        pat = re.compile(r'(day: %d,(?:(?!day: \d+,).)*?image: ")[^"]*(")' % n, re.S)
        seg2, c = pat.subn(lambda m: m.group(1) + new + m.group(2), seg, count=1)
        if c == 1:
            seg = seg2; total += 1
        else:
            print(f"  !! {pkg} day{n}: no image field matched")
    s = s[:i] + seg + (s[nxt:] if nxt != -1 else "")

io.open(P, "w", encoding="utf-8").write(s)
print(f"wired {total} day images")
