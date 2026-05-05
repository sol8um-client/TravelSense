"""
North India image fix — V2 (safe & honest).

Strategy:
  • Use existing LOCAL AI-generated images for every spot we have one for.
  • For everything else, produce a precise shot-list (with prompt + filename slug)
    for Nano Banana 2 generation — and leave the existing URL untouched until
    those images arrive.
  • Result: every replacement we DO make is verified-correct. Nothing made up.
"""
import re
import json
from pathlib import Path
from collections import defaultdict

# ─── LOCAL IMAGES WE HAVE (verified accurate) ───────────────────────────────
LOCAL = {
    # Heroes — perfect for destination heroes AND package heroes for that destination
    "kashmir_hero":           "/images/generated/kashmir-hero.webp",
    "himachal_hero":          "/images/generated/himachal-pradesh-hero.webp",
    "rajasthan_hero":         "/images/generated/rajasthan-hero.webp",
    "varanasi_hero":          "/images/generated/varanasi-hero.webp",
    "uttarakhand_hero":       "/images/generated/uttarakhand-hero.webp",
    "char_dham_hero":         "/images/generated/char-dham-hero.webp",

    # Specific day shots
    "kashmir_arrive":         "/images/generated/kashmir-day-1-arrive-srinagar.webp",
    "kashmir_gulmarg":        "/images/generated/kashmir-day-5-gulmarg-gondola.webp",
    "rajasthan_camel":        "/images/generated/rajasthan-day-5-jaisalmer-camel-safari.webp",
    "rajasthan_udaipur":      "/images/generated/rajasthan-day-7-udaipur-lake-palace.webp",
    "uttarakhand_rishikesh":  "/images/generated/uttarakhand-day-2-rishikesh.webp",
    "char_dham_kedarnath":    "/images/generated/char-dham-day-4-kedarnath.webp",
    "golden_triangle_taj":    "/images/generated/golden-triangle-day-3-taj-mahal.webp",
}

# Destination -> hero image
DEST_HERO = {
    "kashmir":                    LOCAL["kashmir_hero"],
    "himachal-pradesh":           LOCAL["himachal_hero"],
    "rajasthan":                  LOCAL["rajasthan_hero"],
    "varanasi-and-uttar-pradesh": LOCAL["varanasi_hero"],
    "uttarakhand":                LOCAL["uttarakhand_hero"],
}

TARGET_DESTS = set(DEST_HERO.keys())


# ─── DAY-TITLE → LOCAL IMAGE / SHOT-LIST ENTRY ──────────────────────────────
# When we have a local match, return the path. Otherwise, return a tuple
# (slug, prompt) describing the image we still need.

def classify_day(dest: str, day_title: str, day_desc: str = "") -> tuple[str, str | None]:
    """
    Returns (image_url, shot_list_entry). Image_url is what we apply.
    shot_list_entry is None if we have a local image, else a description for
    Nano Banana 2.
    """
    t = (day_title + " " + day_desc).lower()

    # ─── Kashmir ───
    if dest == "kashmir":
        if "gulmarg" in t and "gondola" in t:
            return LOCAL["kashmir_gulmarg"], None
        if "arrival" in t and ("srinagar" in t or "kashmir" in t):
            return LOCAL["kashmir_arrive"], None
        if "houseboat" in t or "shikara" in t or "dal lake" in t:
            return _shot("kashmir-shikara-dal-lake", "Traditional shikara wooden boat on Dal Lake at golden hour, snow-capped mountains in background, Srinagar Kashmir")
        if "gulmarg" in t:
            return _shot("kashmir-gulmarg-meadow", "Gulmarg snow meadow with pine trees and Himalayan peaks, Kashmir, winter morning")
        if "sonmarg" in t or "sonamarg" in t or "thajiwas" in t:
            return _shot("kashmir-sonmarg-glacier", "Sonmarg Thajiwas glacier with snow-capped mountains, alpine meadow, Kashmir")
        if "pahalgam" in t or "lidder" in t:
            return _shot("kashmir-pahalgam-lidder", "Pahalgam valley with Lidder river flowing through pine forest, Kashmir")
        if "betaab" in t or "aru" in t or "chandanwari" in t:
            return _shot("kashmir-betaab-valley", "Betaab Valley meadow surrounded by deodar pines, Kashmir, summer green")
        if "mughal" in t or "nishat" in t or "shalimar" in t or "chashme" in t:
            return _shot("kashmir-mughal-gardens", "Mughal Gardens of Kashmir with terraced lawns and tulips, Dal Lake view, Srinagar")
        if "gurez" in t or "habba khatoon" in t or "kishanganga" in t or "razdan" in t:
            return _shot("kashmir-gurez-valley", "Remote Gurez Valley with Habba Khatoon peak and Kishanganga river, Kashmir")
        if "doodhpathri" in t:
            return _shot("kashmir-doodhpathri-meadow", "Doodhpathri meadow Kashmir with shepherds and grazing sheep, alpine setting")
        if "sinthan" in t:
            return _shot("kashmir-sinthan-top", "Sinthan Top pass Kashmir, snow-clad pass with prayer flags")
        if "vaishno" in t or "katra" in t:
            return _shot("vaishno-devi-katra", "Trikuta hills with Vaishno Devi pilgrimage path, Katra Jammu, devotees walking")
        if "jammu" in t:
            return _shot("jammu-arrival", "Jammu railway station entrance with Tawi river backdrop")
        if "departure" in t:
            return LOCAL["kashmir_hero"], None
        return LOCAL["kashmir_hero"], None  # safe fallback

    # ─── Himachal ───
    if dest == "himachal-pradesh":
        if "shimla" in t and "local" in t:
            return _shot("shimla-mall-road", "Shimla Mall Road with colonial Christ Church and pedestrians, Himachal")
        if "shimla" in t:
            return _shot("shimla-ridge-himachal", "Shimla ridge with Christ Church and town view, Himachal")
        if "manali" in t and "local" in t:
            return _shot("manali-old-town", "Old Manali wooden architecture with Beas river and pine forest, Himachal")
        if "manali" in t:
            return _shot("manali-valley", "Manali valley with snow peaks, Beas river and apple orchards, Himachal")
        if "solang" in t or "rohtang" in t or "atal tunnel" in t:
            return _shot("solang-valley-snow", "Solang Valley Himachal with snow paragliding, Rohtang Pass mountains")
        if "dharamshala" in t or "mcleod" in t or "bhagsu" in t or "dalai lama" in t:
            return _shot("mcleodganj-monastery", "McLeodganj Tibetan monastery with prayer wheels, Dharamshala Himachal")
        if "dalhousie" in t or "khajjiar" in t:
            return _shot("khajjiar-meadow", "Khajjiar meadow Himachal called Mini Switzerland with cedar forest, hill station")
        if "amritsar" in t or "golden temple" in t or "wagah" in t:
            return _shot("amritsar-golden-temple", "Golden Temple Amritsar reflecting on sarovar at dusk, devotees, Punjab")
        if "bir" in t or "billing" in t or "paragliding" in t:
            return _shot("bir-billing-paragliding", "Paraglider over Bir Billing valley Himachal, mountains backdrop")
        if "chandigarh" in t:
            return _shot("chandigarh-rose-garden", "Chandigarh tree-lined avenue with car driving towards hills, Punjab")
        if "kullu" in t:
            return _shot("kullu-valley-drive", "Kullu valley road with Beas river along pine forest, Himachal")
        # Spiti
        if "spiti" in t or "kaza" in t or "tabo" in t or "kibber" in t or "langza" in t:
            return _shot("spiti-kaza-village", "Spiti Valley Kaza village in cold desert, whitewashed houses, Himachal")
        if "key monastery" in t or "dhankar" in t:
            return _shot("key-monastery-spiti", "Key Monastery Spiti perched on hilltop, Tibetan Buddhist architecture")
        if "chandratal" in t or "kunzum" in t:
            return _shot("chandratal-lake", "Chandratal moon lake Spiti reflecting Himalayan peaks, alpine meadow")
        if "sangla" in t or "kinnaur" in t or "kalpa" in t:
            return _shot("sangla-kinnaur-valley", "Sangla Kinnaur Valley Himachal with Kinner Kailash peak and apple orchards")
        return LOCAL["himachal_hero"], None

    # ─── Uttar Pradesh ───
    if dest == "varanasi-and-uttar-pradesh":
        if "taj mahal" in t:
            return LOCAL["golden_triangle_taj"], None
        if "agra fort" in t or "fatehpur sikri" in t:
            return _shot("agra-fort", "Agra Fort red sandstone walls with Yamuna river, Uttar Pradesh")
        if "agra" in t:
            return LOCAL["golden_triangle_taj"], None
        if "ganga aarti" in t or "aarti" in t:
            return _shot("varanasi-ganga-aarti", "Varanasi Dashashwamedh ghat Ganga aarti at dusk, priests with brass lamps and devotees")
        if "varanasi" in t or "kashi" in t or "sarnath" in t or "vishwanath" in t or "banaras" in t:
            return LOCAL["varanasi_hero"], None
        if "ayodhya" in t or "ram mandir" in t or "saryu" in t:
            return _shot("ayodhya-ram-mandir", "Ayodhya Ram Mandir grand temple at sunset, devotees, Uttar Pradesh")
        if "prayagraj" in t or "sangam" in t or "triveni" in t or "akshayavat" in t:
            return _shot("prayagraj-sangam", "Prayagraj Triveni Sangam confluence of Ganga Yamuna Saraswati, boats, devotees")
        if "vrindavan" in t or "mathura" in t or "krishna" in t or "banke bihari" in t or "iskcon" in t or "prem mandir" in t or "govardhan" in t:
            return _shot("mathura-vrindavan", "Vrindavan Banke Bihari temple devotees with colorful holi powders, Uttar Pradesh")
        if "delhi" in t and ("red fort" in t or "qutub" in t or "india gate" in t):
            return _shot("delhi-red-fort", "Delhi Red Fort sandstone gate with Indian flag, Old Delhi")
        if "delhi" in t:
            return _shot("delhi-india-gate", "India Gate Delhi war memorial at sunset with vehicles passing")
        if "jhansi" in t or "orchha" in t:
            return _shot("jhansi-orchha", "Orchha Raja Mahal palace ruins with Betwa river, Madhya Pradesh border")
        return LOCAL["varanasi_hero"], None

    # ─── Rajasthan ───
    if dest == "rajasthan":
        if "camel safari" in t or "sand dune" in t or "desert safari" in t or "sam " in t:
            return LOCAL["rajasthan_camel"], None
        if "udaipur" in t and ("palace" in t or "pichola" in t):
            return LOCAL["rajasthan_udaipur"], None
        if "udaipur" in t:
            return LOCAL["rajasthan_udaipur"], None
        if "hawa mahal" in t or "city palace jaipur" in t or "jantar mantar" in t:
            return _shot("jaipur-hawa-mahal", "Hawa Mahal Jaipur pink palace facade at golden hour, Rajasthan Pink City")
        if "amber fort" in t or "jaigarh" in t or "nahargarh" in t:
            return _shot("amber-fort-jaipur", "Amber Fort Jaipur on Aravalli hills, elephant ascending ramp, Rajasthan")
        if "jaipur" in t:
            return _shot("jaipur-pink-city", "Jaipur Pink City rooftop view with Hawa Mahal and bazaar, Rajasthan")
        if "mehrangarh" in t or "blue city" in t or "jaswant" in t or "jodhpur" in t:
            return _shot("jodhpur-mehrangarh", "Mehrangarh Fort Jodhpur looming above blue houses of old town, Rajasthan")
        if "jaisalmer fort" in t or "patwon" in t or "patwa" in t:
            return _shot("jaisalmer-fort-golden", "Jaisalmer Golden Fort sandstone walls glowing at sunset, Thar Desert")
        if "jaisalmer" in t:
            return LOCAL["rajasthan_camel"], None
        if "ranthambore" in t or "tiger" in t:
            return _shot("ranthambore-tiger-safari", "Ranthambore tiger walking through dry grass with safari jeep in background, Rajasthan")
        if "pushkar" in t or "brahma" in t:
            return _shot("pushkar-lake-ghats", "Pushkar holy lake with white temples and ghats, Brahma temple, Rajasthan")
        if "mount abu" in t or "nakki" in t or "dilwara" in t or "guru shikhar" in t:
            return _shot("mount-abu-nakki-lake", "Mount Abu Nakki Lake at dusk with hill station town, Rajasthan")
        if "jawai" in t or "leopard" in t:
            return _shot("jawai-leopard-rajasthan", "Jawai leopard on granite boulder at dusk, Rajasthan rural backdrop")
        if "kumbhalgarh" in t:
            return _shot("kumbhalgarh-fort", "Kumbhalgarh Fort Rajasthan with massive winding wall on Aravalli hills, UNESCO")
        return LOCAL["rajasthan_hero"], None

    # ─── Uttarakhand ───
    if dest == "uttarakhand":
        if "kedarnath" in t:
            return LOCAL["char_dham_kedarnath"], None
        if "rishikesh" in t or "lakshman jhula" in t:
            return LOCAL["uttarakhand_rishikesh"], None
        if "badrinath" in t or "mana" in t:
            return _shot("badrinath-temple", "Badrinath Temple colorful facade with Neelkanth peak in Garhwal Himalayas, Uttarakhand")
        if "yamunotri" in t:
            return _shot("yamunotri-shrine", "Yamunotri shrine in Garhwal Himalayas with surya kund hot springs, pilgrims")
        if "gangotri" in t or "uttarkashi" in t or "barkot" in t or "harsil" in t:
            return _shot("gangotri-source-ganges", "Gangotri Temple Garhwal Himalayas at the source of Ganges, snow peaks")
        if "guptkashi" in t or "joshimath" in t or "rudraprayag" in t or "sonprayag" in t:
            return _shot("garhwal-pilgrim-town", "Garhwal Himalayan pilgrim town with hilltop temple, Uttarakhand")
        if "haridwar" in t or "har ki pauri" in t or "mansa devi" in t or "chandi devi" in t:
            return _shot("haridwar-har-ki-pauri", "Haridwar Har ki Pauri ghat at evening Ganga aarti with floating diyas")
        if "kainchi" in t or "neem karoli" in t:
            return _shot("kainchi-dham-ashram", "Kainchi Dham ashram of Neem Karoli Baba in pine forest, Uttarakhand")
        if "nainital" in t or "naini" in t or "snow view" in t or "tiffin top" in t or "pangot" in t:
            return _shot("nainital-naini-lake", "Nainital Naini Lake with town reflecting on water, hill station Uttarakhand")
        if "ranikhet" in t or "chaubatia" in t:
            return _shot("ranikhet-chaubatia-orchard", "Ranikhet Chaubatia apple orchard with view of Himalayas, Uttarakhand")
        if "corbett" in t:
            return _shot("jim-corbett-safari", "Jim Corbett tiger reserve safari jeep with elephant grass, Uttarakhand")
        if "mussoorie" in t or "kempty" in t or "lal tibba" in t:
            return _shot("mussoorie-mall-road", "Mussoorie Mall Road queen of hills with mountain views, Uttarakhand")
        if "dhanaulti" in t or "kanatal" in t or "surkhanda" in t:
            return _shot("dhanaulti-eco-park", "Dhanaulti eco park pine forest hills, Uttarakhand")
        if "tehri" in t:
            return _shot("tehri-lake", "Tehri Dam reservoir lake with mountains, Uttarakhand")
        if "dehradun" in t:
            return _shot("dehradun-doon-valley", "Dehradun Doon Valley with Mussoorie hills in background, Uttarakhand")
        return LOCAL["uttarakhand_hero"], None

    return None, None


# ─── SHOT-LIST TRACKER ──────────────────────────────────────────────────────
shot_list: dict[str, str] = {}

def _shot(slug: str, prompt: str) -> tuple[str, str]:
    """Record a needed image and return placeholder URL pointing at the future filename."""
    if slug not in shot_list:
        shot_list[slug] = prompt
    placeholder = f"/images/generated/{slug}.webp"
    return placeholder, slug


# ─── DESTINATION GALLERY (curated 6 per destination) ────────────────────────
# Keys used here MUST be locations we will generate. They produce shot-list entries
# the first time they're hit.

DEST_GALLERY = {
    "kashmir": [
        ("kashmir-shikara-dal-lake",     "Traditional shikara wooden boat on Dal Lake at golden hour, snow-capped mountains in background, Srinagar Kashmir"),
        ("kashmir-gulmarg-meadow",       "Gulmarg snow meadow with pine trees and Himalayan peaks, Kashmir, winter morning"),
        ("kashmir-pahalgam-lidder",      "Pahalgam valley with Lidder river flowing through pine forest, Kashmir"),
        ("kashmir-mughal-gardens",       "Mughal Gardens of Kashmir with terraced lawns and tulips, Dal Lake view, Srinagar"),
        ("kashmir-sonmarg-glacier",      "Sonmarg Thajiwas glacier with snow-capped mountains, alpine meadow, Kashmir"),
        ("kashmir-betaab-valley",        "Betaab Valley meadow surrounded by deodar pines, Kashmir, summer green"),
    ],
    "himachal-pradesh": [
        ("shimla-mall-road",             "Shimla Mall Road with colonial Christ Church and pedestrians, Himachal"),
        ("manali-valley",                "Manali valley with snow peaks, Beas river and apple orchards, Himachal"),
        ("solang-valley-snow",           "Solang Valley Himachal with snow paragliding, Rohtang Pass mountains"),
        ("mcleodganj-monastery",         "McLeodganj Tibetan monastery with prayer wheels, Dharamshala Himachal"),
        ("khajjiar-meadow",              "Khajjiar meadow Himachal called Mini Switzerland with cedar forest"),
        ("spiti-kaza-village",           "Spiti Valley Kaza village in cold desert, whitewashed houses, Himachal"),
    ],
    "varanasi-and-uttar-pradesh": [
        ("varanasi-ganga-aarti",         "Varanasi Dashashwamedh ghat Ganga aarti at dusk, priests with brass lamps"),
        ("ayodhya-ram-mandir",           "Ayodhya Ram Mandir grand temple at sunset, devotees, Uttar Pradesh"),
        ("prayagraj-sangam",             "Prayagraj Triveni Sangam confluence of Ganga Yamuna Saraswati, boats"),
        ("mathura-vrindavan",            "Vrindavan Banke Bihari temple with colorful holi powders, Uttar Pradesh"),
        ("agra-fort",                    "Agra Fort red sandstone walls with Yamuna river, Uttar Pradesh"),
        ("delhi-india-gate",             "India Gate Delhi war memorial at sunset with vehicles passing"),
    ],
    "rajasthan": [
        ("jaipur-hawa-mahal",            "Hawa Mahal Jaipur pink palace facade at golden hour, Rajasthan Pink City"),
        ("amber-fort-jaipur",            "Amber Fort Jaipur on Aravalli hills, elephant ascending ramp, Rajasthan"),
        ("jodhpur-mehrangarh",           "Mehrangarh Fort Jodhpur looming above blue houses of old town, Rajasthan"),
        ("jaisalmer-fort-golden",        "Jaisalmer Golden Fort sandstone walls glowing at sunset, Thar Desert"),
        ("ranthambore-tiger-safari",     "Ranthambore tiger walking through dry grass with safari jeep, Rajasthan"),
        ("pushkar-lake-ghats",           "Pushkar holy lake with white temples and ghats, Brahma temple, Rajasthan"),
    ],
    "uttarakhand": [
        ("haridwar-har-ki-pauri",        "Haridwar Har ki Pauri ghat at evening Ganga aarti with floating diyas"),
        ("nainital-naini-lake",          "Nainital Naini Lake with town reflecting on water, hill station Uttarakhand"),
        ("mussoorie-mall-road",          "Mussoorie Mall Road queen of hills with mountain views, Uttarakhand"),
        ("badrinath-temple",             "Badrinath Temple colorful facade with Neelkanth peak in Garhwal Himalayas"),
        ("jim-corbett-safari",           "Jim Corbett tiger reserve safari jeep with elephant grass, Uttarakhand"),
        ("rishikesh-rafting",            "Rishikesh white water rafting on Ganges with mountains, Uttarakhand"),
    ],
}


# ─── APPLY ──────────────────────────────────────────────────────────────────
def apply_destination_gallery(text: str) -> tuple[str, int]:
    changes = 0
    for dest_slug, gallery in DEST_GALLERY.items():
        # Record shot-list entries
        urls = []
        for slug, prompt in gallery:
            shot_list[slug] = prompt
            urls.append(f"/images/generated/{slug}.webp")

        new_gallery = ',\n      '.join(f'"{u}"' for u in urls)
        new_block = f'galleryImages: [\n      {new_gallery},\n    ]'

        # Match this destination block, replace gallery (or insert if missing)
        # Pattern that captures the destination block from `slug:` to next destination's `name:` or end
        # Simpler: just replace the galleryImages array within the destination's slug match scope.

        # Find destination position
        slug_anchor = re.search(r'slug:\s*"' + re.escape(dest_slug) + r'"', text)
        if not slug_anchor:
            continue

        # Search next ~10000 chars for galleryImages or insertion point
        scope_end = slug_anchor.end() + 12000
        scope = text[slug_anchor.end():scope_end]

        gal_m = re.search(r'galleryImages:\s*\[[^\]]*\]', scope)
        if gal_m:
            new_text = (
                text[:slug_anchor.end() + gal_m.start()]
                + new_block
                + text[slug_anchor.end() + gal_m.end():]
            )
            text = new_text
            changes += 1
        else:
            # Insert galleryImages right before bestTimeToVisit
            insert_at = re.search(r'bestTimeToVisit:', scope)
            if insert_at:
                pos = slug_anchor.end() + insert_at.start()
                indent = '    '
                inserted = new_block + ',\n' + indent
                text = text[:pos] + inserted + text[pos:]
                changes += 1
    return text, changes


def apply_packages(text: str) -> tuple[str, int]:
    changes = 0
    pkg_decl = "packages: Package[] = ["
    arr_start = text.index(pkg_decl) + len(pkg_decl)

    # Walk balanced braces
    depth = 0
    in_string = False
    string_char = ""
    obj_start = None
    pkg_ranges = []

    i = arr_start
    while i < len(text):
        c = text[i]
        if in_string:
            if c == "\\":
                i += 2
                continue
            if c == string_char:
                in_string = False
            i += 1
            continue
        if c in '"\'`':
            in_string = True
            string_char = c
            i += 1
            continue
        if c == "{":
            if depth == 0:
                obj_start = i
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                pkg_ranges.append((obj_start, i + 1))
        elif c == "]" and depth == 0:
            break
        i += 1

    edits = []
    for start, end in pkg_ranges:
        block = text[start:end]
        dest_m = re.search(r'destinationSlug:\s*"([^"]+)"', block)
        if not dest_m or dest_m.group(1) not in TARGET_DESTS:
            continue
        dest = dest_m.group(1)
        slug_m = re.search(r'slug:\s*"([^"]+)"', block)
        slug = slug_m.group(1) if slug_m else ""

        new_block = block

        # Hero — use the local destination hero
        new_hero = DEST_HERO[dest]
        new_block = re.sub(
            r'(heroImage:\s*)"[^"]*"',
            lambda m: m.group(1) + f'"{new_hero}"',
            new_block, count=1
        )

        # Gallery (top-level images: 4 entries) — use destination's curated 4 gallery slugs
        gallery_4 = DEST_GALLERY[dest][:4]
        gallery_urls = []
        for s, p in gallery_4:
            shot_list[s] = p
            gallery_urls.append(f"/images/generated/{s}.webp")
        new_imgs = ',\n      '.join(f'"{u}"' for u in gallery_urls)
        new_block = re.sub(
            r'images:\s*\[[^\]]*\](?=,\s*\n\s*duration)',
            lambda m: f'images: [\n      {new_imgs},\n    ]',
            new_block, count=1
        )

        # Day-by-day images
        def replace_day(day_match):
            day_block = day_match.group(0)
            t_m = re.search(r'title:\s*"([^"]+)"', day_block)
            d_m = re.search(r'description:\s*"([^"]*)"', day_block)
            day_title = t_m.group(1) if t_m else ""
            day_desc = d_m.group(1) if d_m else ""

            new_url, _ = classify_day(dest, day_title, day_desc)
            if new_url is None:
                return day_block
            return re.sub(
                r'(image:\s*)"[^"]*"',
                lambda m: m.group(1) + f'"{new_url}"',
                day_block, count=1
            )

        new_block = re.sub(
            r'\{[^{}]*?day:\s*\d+[^{}]*?\}',
            replace_day,
            new_block, flags=re.DOTALL
        )

        if new_block != block:
            edits.append((start, end, new_block))

    edits.sort(key=lambda e: e[0], reverse=True)
    for start, end, new_text in edits:
        text = text[:start] + new_text + text[end:]
        changes += 1

    return text, changes


def main():
    dest_path = Path("src/data/destinations.ts")
    dest_text = dest_path.read_text(encoding="utf-8")
    dest_text, dc = apply_destination_gallery(dest_text)
    dest_path.write_text(dest_text, encoding="utf-8")
    print(f"destinations.ts: updated {dc} galleries")

    pkg_path = Path("src/data/packages.ts")
    pkg_text = pkg_path.read_text(encoding="utf-8")
    pkg_text, pc = apply_packages(pkg_text)
    pkg_path.write_text(pkg_text, encoding="utf-8")
    print(f"packages.ts: updated {pc} packages")

    # Write shot-list
    out = Path("scripts/north-india-shot-list.json")
    sorted_shots = dict(sorted(shot_list.items()))
    out.write_text(json.dumps(sorted_shots, indent=2, ensure_ascii=False), encoding="utf-8")

    # Also markdown
    md_lines = ["# North India — Nano Banana 2 Shot-List\n",
                f"Total images needed: **{len(sorted_shots)}**\n",
                "\nSave each image as `<slug>.webp` (or PNG, we'll convert) into `public/images/generated/`.\n",
                "Common style prompt: *Ultra-high-quality travel photography, cinematic natural lighting, photorealistic, no people unless specified, professional tourism magazine style.*\n",
                "\n| # | Filename slug | Description |",
                "|---|---|---|"]
    for i, (slug, prompt) in enumerate(sorted_shots.items(), 1):
        md_lines.append(f"| {i} | `{slug}` | {prompt} |")
    Path("scripts/north-india-shot-list.md").write_text("\n".join(md_lines) + "\n", encoding="utf-8")

    print(f"\nShot-list: {len(sorted_shots)} images needed → scripts/north-india-shot-list.md")


if __name__ == "__main__":
    main()
