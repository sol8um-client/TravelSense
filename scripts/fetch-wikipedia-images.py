"""
Fetch real, verified images of each location from Wikipedia.

Strategy:
  • Each of the 45 image slugs maps to a Wikipedia article title.
  • Wikipedia REST API: /api/rest_v1/page/summary/<title> returns the article's
    lead image (thumbnail + originalimage URLs).
  • Download original or large thumbnail, convert to WebP at the right size,
    save as <slug>.webp — overwriting the placeholder.

Wikipedia content is freely licensed (CC-BY-SA / public domain mostly).
"""
import json
import time
import urllib.request
import urllib.parse
from pathlib import Path
from io import BytesIO
from PIL import Image

# Slug → Wikipedia article title (URL-encoded later)
WIKI_TITLES = {
    # ── Kashmir ──
    "kashmir-shikara-dal-lake":     "Dal_Lake",
    "kashmir-gulmarg-meadow":       "Gulmarg",
    "kashmir-pahalgam-lidder":      "Pahalgam",
    "kashmir-mughal-gardens":       "Shalimar_Bagh,_Srinagar",
    "kashmir-sonmarg-glacier":      "Sonamarg",
    "kashmir-betaab-valley":        "Betaab_Valley",
    "kashmir-gurez-valley":         "Gurez",
    "vaishno-devi-katra":           "Vaishno_Devi",

    # ── Himachal ──
    "shimla-mall-road":             "The_Mall,_Shimla",
    "shimla-ridge-himachal":        "Shimla",
    "manali-valley":                "Manali",
    "manali-old-town":              "Old_Manali",
    "solang-valley-snow":           "Solang_Valley",
    "mcleodganj-monastery":         "McLeod_Ganj",
    "khajjiar-meadow":              "Khajjiar",
    "amritsar-golden-temple":       "Golden_Temple",
    "bir-billing-paragliding":      "Bir,_Himachal_Pradesh",
    "spiti-kaza-village":           "Kaza,_Himachal_Pradesh",
    "key-monastery-spiti":          "Key_Monastery",
    "chandratal-lake":              "Chandra_Taal",
    "sangla-kinnaur-valley":        "Sangla_Valley",
    "kullu-valley-drive":           "Kullu",
    "chandigarh-rose-garden":       "Chandigarh",

    # ── UP ──
    "varanasi-ganga-aarti":         "Dashashwamedh_Ghat",
    "agra-fort":                    "Agra_Fort",
    "ayodhya-ram-mandir":           "Ram_Mandir",
    "prayagraj-sangam":             "Triveni_Sangam",
    "mathura-vrindavan":            "Banke_Bihari_Temple",
    "delhi-india-gate":             "India_Gate",
    "delhi-red-fort":               "Red_Fort",
    "jhansi-orchha":                "Orchha_Fort",

    # ── Rajasthan ──
    "jaipur-hawa-mahal":            "Hawa_Mahal",
    "jaipur-pink-city":             "Jaipur",
    "amber-fort-jaipur":            "Amer_Fort",
    "jodhpur-mehrangarh":           "Mehrangarh",
    "jaisalmer-fort-golden":        "Jaisalmer_Fort",
    "ranthambore-tiger-safari":     "Ranthambore_National_Park",
    "pushkar-lake-ghats":           "Pushkar",
    "mount-abu-nakki-lake":         "Nakki_Lake",
    "jawai-leopard-rajasthan":      "Jawai_Dam",
    "kumbhalgarh-fort":             "Kumbhalgarh",

    # ── Uttarakhand ──
    "haridwar-har-ki-pauri":        "Har_Ki_Pauri",
    "nainital-naini-lake":          "Naini_Lake",
    "mussoorie-mall-road":          "Mussoorie",
    "badrinath-temple":             "Badrinath_Temple",
    "jim-corbett-safari":           "Jim_Corbett_National_Park",
    "rishikesh-rafting":            "Rishikesh",
    "ranikhet-chaubatia-orchard":   "Ranikhet",
    "kainchi-dham-ashram":          "Kainchi_Dham",
    "dhanaulti-eco-park":           "Dhanaulti",
    "tehri-lake":                   "Tehri_Dam",
    "dehradun-doon-valley":         "Dehradun",
    "garhwal-pilgrim-town":         "Joshimath",
    "yamunotri-shrine":             "Yamunotri",
    "gangotri-source-ganges":       "Gangotri",
}

OUT_DIR = Path("public/images/generated")
USER_AGENT = "TravelSense/1.0 (https://travelsense.co.in; sol8um@gmail.com)"

def fetch_summary(title: str) -> dict | None:
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(title)}"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return json.loads(resp.read())
    except Exception as e:
        print(f"    ! summary fetch failed: {e}")
        return None


def fetch_image(image_url: str) -> bytes | None:
    req = urllib.request.Request(image_url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read()
    except Exception as e:
        print(f"    ! image fetch failed: {e}")
        return None


def upgrade_url(thumb_url: str, target_w: int = 1600) -> str:
    """Wikipedia thumbnails come at e.g. /450px-foo.jpg. Bump to target_w."""
    import re
    return re.sub(r"/\d+px-", f"/{target_w}px-", thumb_url)


def process(slug: str, title: str) -> bool:
    print(f"  {slug}  ->  {title}")
    summary = fetch_summary(title)
    if not summary:
        return False

    # Prefer originalimage (highest res), fall back to thumbnail
    img_url = None
    if "originalimage" in summary and "source" in summary["originalimage"]:
        img_url = summary["originalimage"]["source"]
    elif "thumbnail" in summary and "source" in summary["thumbnail"]:
        img_url = upgrade_url(summary["thumbnail"]["source"], 1600)

    if not img_url:
        print(f"    ! no image in summary")
        return False

    print(f"    fetching: {img_url[:80]}...")
    raw = fetch_image(img_url)
    if not raw:
        return False

    # Open + crop to landscape 1600x900, save as WebP
    try:
        img = Image.open(BytesIO(raw))
        if img.mode in ("RGBA", "LA", "P"):
            bg = Image.new("RGB", img.size, (255, 255, 255))
            if img.mode == "RGBA":
                bg.paste(img, mask=img.split()[3])
            else:
                bg.paste(img.convert("RGB"))
            img = bg
        elif img.mode != "RGB":
            img = img.convert("RGB")

        target_w, target_h = 1600, 900
        target_ratio = target_w / target_h
        ow, oh = img.size
        oratio = ow / oh

        if oratio > target_ratio:
            new_w = int(oh * target_ratio)
            left = (ow - new_w) // 2
            img = img.crop((left, 0, left + new_w, oh))
        else:
            new_h = int(ow / target_ratio)
            top = (oh - new_h) // 2
            img = img.crop((0, top, ow, top + new_h))

        img = img.resize((target_w, target_h), Image.LANCZOS)
        out_path = OUT_DIR / f"{slug}.webp"
        img.save(out_path, "WEBP", quality=82, method=6)
        print(f"    -> {out_path.name} ({out_path.stat().st_size // 1024} KB)")
        return True
    except Exception as e:
        print(f"    ! image processing failed: {e}")
        return False


def main():
    success = 0
    failed = []
    for i, (slug, title) in enumerate(WIKI_TITLES.items(), 1):
        print(f"[{i}/{len(WIKI_TITLES)}]", end=" ")
        if process(slug, title):
            success += 1
        else:
            failed.append((slug, title))
        # Polite delay between Wikipedia API calls
        time.sleep(0.4)

    print(f"\n=== Done: {success}/{len(WIKI_TITLES)} succeeded ===")
    if failed:
        print(f"\nFailed ({len(failed)}):")
        for slug, title in failed:
            print(f"  {slug}  ({title})")


if __name__ == "__main__":
    main()
