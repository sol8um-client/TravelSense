# -*- coding: utf-8 -*-
"""
Convert the net-new generated images (Downloads) to their target webp paths,
per docs/IMAGE_PROMPTS.md. Each target maps to a regex that must match EXACTLY
one Downloads file (safety check) - so the two Sri Lanka itineraries (same
'Day N Kandy' names, different timestamps) can't be cross-assigned.
"""
import os, re, io, sys, subprocess
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

DL = r"C:/Users/vsfag/Downloads"
DEST = r"E:/TravelSense/travelsense/public/images/destinations"
GEN = r"E:/TravelSense/travelsense/public/images/generated"
files = os.listdir(DL)

# (target_relpath, width, regex) - regex matched against Downloads filenames
HEROES = [
    ("bhutan",       r"Paro_Taktsang"),
    ("gujarat",      r"white_salt_desert"),
    ("jordan",       r"rose-?red_sandstone"),
    ("uzbekistan",   r"Registan_Square_in_Samarkand"),
    ("chhattisgarh", r"Chitrakote_Falls"),
    ("telangana",    r"Charminar_monument"),
    ("bihar",        r"towering_pyramidal_spire"),
    ("azerbaijan",   r"Baku_waterfront"),
    ("philippines",  r"El_Nido_in_Palawan"),
]

# package -> list of (dayN, regex)
DAYS = {
    "rajasthan-lakes-and-hills": [
        (1, r"Rajasthan_Lakes"),
        (2, r"Day_2.*Mount_Abu"),
        (3, r"Day_3.*Drive_Mount"),
        (4, r"Day_4.*Udaipur"),
        (5, r"Day_5.*Drive_Udaipur"),
        (6, r"Day_6.*Drive_Jawai"),
        (7, r"Day_7.*Drive_Kumbhalgarh"),
    ],
    "brij-bhoomi-yatra": [
        (1, r"Brij_Bhoomi_Yatra"),
        (2, r"Day_2.*Agra_Fort"),
        (3, r"Day_3.*Vrindavan"),
        (4, r"Day_4.*Drive_Vrindavan"),
    ],
    "ujjain-omkareshwar": [
        (1, r"Ujjain,_Omkareshwar"),
        (2, r"Day_2.*Ujjain"),
        (3, r"Day_3.*Omkareshwar"),
        (4, r"Day_4.*Maheshwar"),
        (5, r"Day_5.*Indore"),
    ],
    "scintillating-tropical-tour-to-sri-lanka": [
        (1, r"Scintillating_Sri_Lanka"),
        (2, r"Day_2.*Sigiriya_Excursion"),
        (3, r"Day_3.*Kandy.*1509"),
        (4, r"Day_4.*Nuwara_Eliya"),
        (5, r"Day_5.*Mirissa"),
        (6, r"Day_6.*Bentota"),
        (7, r"Day_7.*ure_from"),
    ],
    "scenic-sri-lanka": [
        (3, r"Day_3.*Kandy.*1503"),
        (4, r"Day_4.*Kandy.*1503"),
        (5, r"Day_5.*Ella"),
        (6, r"Day_6.*Galle"),
        (7, r"Day_7.*ure.*(1506|→)"),
    ],
}

def find_one(rx):
    pat = re.compile(rx, re.I)
    hits = [f for f in files if pat.search(f)]
    return hits

def convert(src, dst, width):
    r = subprocess.run(
        ["ffmpeg","-hide_banner","-loglevel","error","-y","-i", os.path.join(DL,src),
         "-vf", f"scale='min({width},iw)':-2","-c:v","libwebp","-quality","82",
         "-compression_level","6", dst],
        capture_output=True, text=True)
    return r.returncode == 0, r.stderr

problems = []
done = []

print("=== HEROES -> public/images/destinations ===")
for slug, rx in HEROES:
    hits = find_one(rx)
    if len(hits) != 1:
        problems.append((f"hero {slug}", rx, hits)); print(f"  !! {slug}: {len(hits)} matches {hits[:4]}"); continue
    ok, err = convert(hits[0], os.path.join(DEST, slug + ".webp"), 1600)
    if ok: done.append(f"destinations/{slug}.webp"); print(f"  ok {slug}.webp  <= {hits[0]}")
    else: problems.append((slug, "ffmpeg", err)); print(f"  FFMPEG FAIL {slug}: {err[:120]}")

print("\n=== DAY IMAGES -> public/images/generated ===")
wired = {}
for pkg, days in DAYS.items():
    for n, rx in days:
        hits = find_one(rx)
        if len(hits) != 1:
            problems.append((f"{pkg} day{n}", rx, hits)); print(f"  !! {pkg} day{n}: {len(hits)} matches {hits[:4]}"); continue
        target = f"{pkg}-day{n}.webp"
        ok, err = convert(hits[0], os.path.join(GEN, target), 1400)
        if ok:
            done.append(f"generated/{target}"); wired.setdefault(pkg, []).append(n)
            print(f"  ok {target}  <= {hits[0]}")
        else: problems.append((target, "ffmpeg", err)); print(f"  FFMPEG FAIL {target}: {err[:120]}")

print(f"\n=== SUMMARY: {len(done)} converted, {len(problems)} problems ===")
for p in problems: print("  PROBLEM:", p[0], "| regex", p[1], "| matches", p[2] if len(p)>2 else "")
print("\nWIRE_MAP =", wired)
