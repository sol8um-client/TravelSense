# -*- coding: utf-8 -*-
"""
Fetch real, correctly-subject landmark photos for the 8 single-image intl
destinations from the Wikipedia REST summary API (lead image = guaranteed
on-subject), self-host as webp in public/images/generated/<dest>-wN.webp.
Prints dest -> [paths] so we can add them to galleryImages, then re-vary.
"""
import json, os, re, subprocess, sys, io, urllib.request, urllib.parse
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

GEN = r"E:/TravelSense/travelsense/public/images/generated"
UA = "TravelSenseImageBot/1.0 (https://travelsense.co.in; contact@travelsense.co.in)"

LANDMARKS = {
    "hong-kong": ["Victoria_Peak", "Tian_Tan_Buddha", "Star_Ferry", "Temple_Street,_Hong_Kong"],
    "philippines": ["Chocolate_Hills", "Boracay", "Banaue_Rice_Terraces", "Puerto_Princesa_Subterranean_River_National_Park"],
    "bhutan": ["Punakha_Dzong", "Buddha_Dordenma", "Dochula", "Rinpung_Dzong"],
    "russia": ["Saint_Basil's_Cathedral", "Hermitage_Museum", "Peterhof_Palace", "Church_of_the_Savior_on_Blood"],
    "cambodia-laos": ["Angkor_Wat", "Bayon", "Kuang_Si_Falls", "Luang_Prabang"],
    "oman": ["Sultan_Qaboos_Grand_Mosque", "Wahiba_Sands", "Nizwa_Fort", "Wadi_Shab"],
    "saudi-arabia": ["Hegra", "Jabal_al-Fil", "Historic_Jeddah", "Diriyah"],
    "ireland": ["Cliffs_of_Moher", "Ring_of_Kerry", "Temple_Bar,_Dublin", "Giant's_Causeway"],
}

def summary_image(title):
    url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(title, safe="")
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        j = json.load(r)
    for key in ("originalimage", "thumbnail"):
        src = (j.get(key) or {}).get("source")
        if src and re.search(r"\.(jpg|jpeg|png)$", src, re.I):
            return src
    return None

def download(src, dst_tmp):
    req = urllib.request.Request(src, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r, open(dst_tmp, "wb") as f:
        f.write(r.read())

result = {}
for dest, titles in LANDMARKS.items():
    paths = []
    n = 1
    for t in titles:
        try:
            src = summary_image(t)
            if not src:
                print(f"  !! {dest}: no image for {t}"); continue
            ext = ".png" if src.lower().endswith(".png") else ".jpg"
            tmp = os.path.join(GEN, f"_tmp_{dest}{ext}")
            download(src, tmp)
            out = os.path.join(GEN, f"{dest}-w{n}.webp")
            r = subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",tmp,
                                "-vf","scale='min(1400,iw)':-2","-c:v","libwebp","-quality","82",
                                "-compression_level","6", out], capture_output=True, text=True)
            os.remove(tmp)
            if r.returncode == 0:
                paths.append(f"/images/generated/{dest}-w{n}.webp"); n += 1
                print(f"  ok {dest}-w{n-1}.webp  <= {t}")
            else:
                print(f"  FFMPEG FAIL {dest} {t}: {r.stderr[:120]}")
        except Exception as e:
            print(f"  ERR {dest} {t}: {repr(e)[:140]}")
    result[dest] = paths

print("\nRESULT =", json.dumps(result, indent=0))
