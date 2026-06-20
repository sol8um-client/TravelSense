# -*- coding: utf-8 -*-
"""
Sync user-regenerated images from Downloads into public/images/generated/.

The destination/package/blog data already references /images/generated/<slug>.webp
where <slug> = slugify(the descriptive image name). So for every image in
Downloads whose slugified name matches an EXISTING generated file, we convert it
to webp and OVERWRITE - swapping in the user's newer/better version with zero
data changes and zero broken-reference risk.

Net-new images (no existing counterpart) are reported as "unmatched" for the
next (prompts-doc-driven) batch.
"""
import os, re, subprocess, sys

DL = r"C:/Users/vsfag/Downloads"
GEN = r"E:/TravelSense/travelsense/public/images/generated"
EXTS = {".png", ".jpg", ".jpeg", ".webp"}

def slugify(stem: str) -> str:
    s = stem.lower().replace("&", " and ")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")

existing = {f[:-5] for f in os.listdir(GEN) if f.endswith(".webp")}  # slug (no .webp)

matched, unmatched_travel = [], []
TRAVEL_HINT = re.compile(r"hero|day-[0-9]|yatra|trek|safari|houseboat|guide|"
                         r"backpacking|island|excursion|kandy|ella|galle|sigiriya|"
                         r"udaipur|jaisalmer|kumbhalgarh|omkareshwar|maheshwar|ujjain|"
                         r"vrindavan|nuwara|bentota|mirissa|palawan|baku|charminar|"
                         r"registan|taktsang|samarkand|editorial-travel")

for f in os.listdir(DL):
    stem, ext = os.path.splitext(f)
    if ext.lower() not in EXTS:
        continue
    slug = slugify(stem)
    if slug in existing:
        src = os.path.join(DL, f)
        dst = os.path.join(GEN, slug + ".webp")
        r = subprocess.run(
            ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", src,
             "-vf", "scale='min(1600,iw)':-2", "-c:v", "libwebp",
             "-quality", "80", "-compression_level", "6", dst],
            capture_output=True, text=True,
        )
        if r.returncode == 0:
            matched.append((f, slug))
        else:
            print("FFMPEG FAIL", f, r.stderr[:160])
    elif TRAVEL_HINT.search(slug):
        unmatched_travel.append((f, slug))

print(f"\n=== MATCHED & OVERWRITTEN: {len(matched)} ===")
for f, slug in sorted(matched, key=lambda x: x[1]):
    print(f"  {slug}.webp   <=  {f}")

print(f"\n=== UNMATCHED travel-looking (net-new, for prompts-doc batch): {len(unmatched_travel)} ===")
for f, slug in sorted(unmatched_travel, key=lambda x: x[1])[:120]:
    print(f"  {f}")
