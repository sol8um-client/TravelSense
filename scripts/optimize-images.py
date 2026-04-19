"""
Convert generated PNG images to web-optimized WebP.
- Hero images: resize to 1600x900 max, quality 82
- Blog covers: resize to 1200x600 max, quality 82
- Package day images: resize to 800x600 max, quality 80
- Output: /public/images/generated/<slug>.webp
"""
import os
import re
from pathlib import Path
from PIL import Image

SRC = Path(r"E:\TravelSense\travelsense\public\images\generated")
OUT = SRC  # overwrite with webp in same folder

def slugify(name: str) -> str:
    """Filename -> kebab-case slug."""
    # drop extension
    name = Path(name).stem
    # normalize em-dashes, spaces, special chars
    name = name.lower()
    name = name.replace("—", "-").replace("–", "-").replace("&", "and")
    name = re.sub(r"[^\w\s-]", "", name)
    name = re.sub(r"[\s_]+", "-", name)
    name = re.sub(r"-+", "-", name).strip("-")
    return name

# Category detection from filename
def category_for(name: str) -> str:
    n = name.lower()
    if "hero" in n:
        return "hero"
    if "day" in n and re.search(r"day\s*\d", n):
        return "day"
    return "blog"

SIZES = {
    "hero": (1600, 900),
    "blog": (1200, 600),
    "day": (900, 600),
}

QUALITY = {
    "hero": 82,
    "blog": 82,
    "day": 80,
}

processed = []
errors = []

for png_path in sorted(SRC.glob("*.png")):
    try:
        category = category_for(png_path.name)
        slug = slugify(png_path.name)
        out_path = OUT / f"{slug}.webp"

        target_w, target_h = SIZES[category]
        quality = QUALITY[category]

        with Image.open(png_path) as img:
            # Convert to RGB (drop alpha)
            if img.mode in ("RGBA", "LA", "P"):
                bg = Image.new("RGB", img.size, (255, 255, 255))
                if img.mode == "RGBA":
                    bg.paste(img, mask=img.split()[3])
                else:
                    bg.paste(img.convert("RGB"))
                img = bg
            elif img.mode != "RGB":
                img = img.convert("RGB")

            # Resize maintaining aspect, cropping to target
            orig_w, orig_h = img.size
            orig_ratio = orig_w / orig_h
            target_ratio = target_w / target_h

            if orig_ratio > target_ratio:
                # too wide, crop sides
                new_w = int(orig_h * target_ratio)
                left = (orig_w - new_w) // 2
                img = img.crop((left, 0, left + new_w, orig_h))
            else:
                # too tall, crop top/bottom
                new_h = int(orig_w / target_ratio)
                top = (orig_h - new_h) // 2
                img = img.crop((0, top, orig_w, top + new_h))

            img = img.resize((target_w, target_h), Image.LANCZOS)
            img.save(out_path, "WEBP", quality=quality, method=6)

        # record mapping and file sizes
        orig_size = png_path.stat().st_size / 1024
        new_size = out_path.stat().st_size / 1024
        processed.append({
            "original": png_path.name,
            "slug": slug,
            "category": category,
            "size_kb": f"{orig_size:.0f} -> {new_size:.0f}",
        })
    except Exception as e:
        errors.append(f"{png_path.name}: {e}")

# Report
print(f"\n{'='*70}")
print(f"Processed {len(processed)} images")
print(f"{'='*70}\n")
print(f"{'Slug':<50} {'Category':<8} {'Size (KB)':<15}")
print("-" * 75)
for p in processed:
    print(f"{p['slug']:<50} {p['category']:<8} {p['size_kb']:<15}")

if errors:
    print(f"\n⚠ {len(errors)} ERRORS:")
    for e in errors:
        print(f"  {e}")

# Save mapping file for the wire-up step
import json
mapping = {p["original"]: f"/images/generated/{p['slug']}.webp" for p in processed}
with open(r"E:\TravelSense\travelsense\scripts\image-mapping.json", "w", encoding="utf-8") as f:
    json.dump(mapping, f, indent=2, ensure_ascii=False)
print(f"\nMapping written to scripts/image-mapping.json")
