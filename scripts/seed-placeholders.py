"""
Create placeholder copies of destination hero images for the 45 image slugs
that need Nano Banana 2 generation. This keeps the site working until real
images arrive — when a real image is dropped in, it overwrites the placeholder.

Mapping:
  - Kashmir-related slugs    → copy of kashmir-hero.webp
  - Himachal-related slugs   → copy of himachal-pradesh-hero.webp
  - UP/Rajasthan/Uttarakhand → matching destination hero
"""
import shutil
import json
from pathlib import Path

GENERATED_DIR = Path("public/images/generated")
SHOT_LIST = Path("scripts/north-india-shot-list.json")

# Slug-prefix -> source hero filename
SOURCE_BY_PREFIX = {
    "kashmir": "kashmir-hero.webp",
    "vaishno": "kashmir-hero.webp",
    "jammu": "kashmir-hero.webp",

    "shimla": "himachal-pradesh-hero.webp",
    "manali": "himachal-pradesh-hero.webp",
    "solang": "himachal-pradesh-hero.webp",
    "mcleodganj": "himachal-pradesh-hero.webp",
    "khajjiar": "himachal-pradesh-hero.webp",
    "spiti": "himachal-pradesh-hero.webp",
    "amritsar": "himachal-pradesh-hero.webp",
    "bir-billing": "himachal-pradesh-hero.webp",
    "kullu": "himachal-pradesh-hero.webp",
    "chandigarh": "himachal-pradesh-hero.webp",
    "sangla": "himachal-pradesh-hero.webp",
    "key-monastery": "himachal-pradesh-hero.webp",
    "chandratal": "himachal-pradesh-hero.webp",

    "varanasi": "varanasi-hero.webp",
    "ayodhya": "varanasi-hero.webp",
    "prayagraj": "varanasi-hero.webp",
    "mathura": "varanasi-hero.webp",
    "vrindavan": "varanasi-hero.webp",
    "agra": "varanasi-hero.webp",
    "delhi": "varanasi-hero.webp",
    "jhansi": "varanasi-hero.webp",
    "orchha": "varanasi-hero.webp",

    "jaipur": "rajasthan-hero.webp",
    "amber": "rajasthan-hero.webp",
    "jodhpur": "rajasthan-hero.webp",
    "jaisalmer": "rajasthan-hero.webp",
    "ranthambore": "rajasthan-hero.webp",
    "pushkar": "rajasthan-hero.webp",
    "udaipur": "rajasthan-hero.webp",
    "mount-abu": "rajasthan-hero.webp",
    "jawai": "rajasthan-hero.webp",
    "kumbhalgarh": "rajasthan-hero.webp",

    "haridwar": "uttarakhand-hero.webp",
    "rishikesh": "uttarakhand-hero.webp",
    "kainchi": "uttarakhand-hero.webp",
    "nainital": "uttarakhand-hero.webp",
    "ranikhet": "uttarakhand-hero.webp",
    "jim-corbett": "uttarakhand-hero.webp",
    "mussoorie": "uttarakhand-hero.webp",
    "dhanaulti": "uttarakhand-hero.webp",
    "tehri": "uttarakhand-hero.webp",
    "dehradun": "uttarakhand-hero.webp",
    "garhwal": "uttarakhand-hero.webp",
    "yamunotri": "char-dham-hero.webp",
    "gangotri": "char-dham-hero.webp",
    "badrinath": "char-dham-hero.webp",
}


def find_source(slug: str) -> str | None:
    for prefix, src in SOURCE_BY_PREFIX.items():
        if slug.startswith(prefix):
            return src
    return None


def main():
    shots = json.loads(SHOT_LIST.read_text(encoding="utf-8"))
    created = 0
    skipped = 0
    missing = []

    for slug in shots:
        target = GENERATED_DIR / f"{slug}.webp"
        if target.exists():
            skipped += 1
            continue

        src_name = find_source(slug)
        if not src_name:
            missing.append(slug)
            continue

        src = GENERATED_DIR / src_name
        if not src.exists():
            print(f"  WARN: source missing: {src}")
            missing.append(slug)
            continue

        shutil.copy(src, target)
        created += 1

    print(f"Created {created} placeholders, skipped {skipped} existing")
    if missing:
        print(f"Could not find source for {len(missing)}:")
        for s in missing:
            print(f"  - {s}")


if __name__ == "__main__":
    main()
