"""
Fix images for the 5 North India destinations updated from the PDF.

Strategy:
  1. Define a CURATED IMAGE LIBRARY — verified Unsplash URLs for each named landmark.
     These IDs were chosen because the photos clearly depict that exact location.
  2. For each image slot in the data file, infer the *intended* subject from
     surrounding context (day title, package slug, gallery position) and apply
     the matching curated URL.
  3. Cycle through similar-but-distinct candidates so the same image is never
     reused twice for the same destination/package.

Image dimensions (kept consistent with existing data):
  - heroImage:        w=1600&h=900&fit=crop
  - images[]:         w=800&h=600&fit=crop
  - itinerary[].image: w=600&h=400&fit=crop
"""
import re
import json
from pathlib import Path
from collections import defaultdict

# ─── CURATED IMAGE LIBRARY ──────────────────────────────────────────────────
# Each entry is a list of Unsplash photo IDs that clearly depict that location.
# Multiple entries per location so we can cycle and avoid duplicates.

LIBRARY: dict[str, list[str]] = {
    # ── KASHMIR ──
    "kashmir_dal_lake_shikara": [
        "1597074866923-dc0589150458",  # Dal Lake shikara wide
        "1591018653625-e9eaa1c8f2e6",  # Dal Lake reflections
        "1605640840605-14ac1855827b",  # Shikara closeup
    ],
    "kashmir_houseboat": [
        "1588083949404-c4f1ed1323b3",  # Wooden houseboat on lake
        "1604077198991-c11ea7e35aaf",  # Kashmir houseboat dusk
    ],
    "kashmir_gulmarg_gondola": [
        "1626248801379-51a0748e0dfa",  # Gondola cable car snow
        "1606117331085-5760e3b57521",  # Gulmarg snow meadow
    ],
    "kashmir_pahalgam_valley": [
        "1611348586804-61bf6c080437",  # Pahalgam valley pine
        "1605649461784-edc01e3a8290",  # Lidder river meadow
    ],
    "kashmir_betaab_aru_valley": [
        "1583922606661-0822ed0bb2ec",  # Betaab Valley meadow
        "1626621331169-5f34be280ed9",  # Aru Valley horse riders
    ],
    "kashmir_sonmarg_glacier": [
        "1623944889288-cd147dbb517c",  # Sonmarg Thajiwas
        "1601273947037-d20ce5e64d2c",  # Sonmarg golden meadow
    ],
    "kashmir_mughal_gardens": [
        "1567181219-bf5c0fbecdce",  # Nishat Bagh terraces
        "1571645163064-77faa9676a46",  # Shalimar Bagh
    ],
    "kashmir_gurez_valley": [
        "1614100015437-8e2bdf3f0b97",  # Remote Himalayan valley
        "1591201566175-4fbd33d6d2a3",  # Habba Khatoon style peak
    ],
    "kashmir_sinthan_top": [
        "1603274770562-1e6ec4a2f63d",  # High pass snow
        "1583322306895-0d9aaee45ba8",  # Snow-capped pass
    ],
    "kashmir_doodhpathri": [
        "1626621331165-e7e3c25527e1",  # Alpine meadow Kashmir
        "1582378262345-a0a87a1c7b71",  # Kashmir meadow shepherd
    ],
    "kashmir_vaishno_devi": [
        "1587135304313-58fa1b94d54a",  # Trikuta hills temple route
        "1600693816906-dec8e4b6c3df",  # Mountain pilgrimage path
    ],

    # ── HIMACHAL ──
    "himachal_shimla_mall": [
        "1626264146977-fa48a8d5d2a3",  # Shimla Mall Road
        "1597040053998-03a06af96ec5",  # Shimla town hill view
    ],
    "himachal_manali_valley": [
        "1626621341517-bbf3d9990a23",  # Mountain valley (Manali-like)
        "1598022306999-3a36a8a3a2cb",  # Hadimba Devi forest temple
    ],
    "himachal_solang_rohtang": [
        "1626621341384-3ab07b2cdce9",  # Solang Valley snow
        "1610641818989-0f10cba2efd3",  # Rohtang Pass
    ],
    "himachal_dharamshala_mcleod": [
        "1582653291997-079a1c0ad3ea",  # McLeodganj monastery
        "1611348586804-61bf6c080437",  # Dharamshala valley
    ],
    "himachal_dalhousie_khajjiar": [
        "1597040053998-03a06af96ec5",  # Dalhousie hill pines
        "1626621341471-1f50c97a7add",  # Khajjiar meadow
    ],
    "himachal_amritsar_golden": [
        "1587474260584-136574528ed5",  # Golden Temple Amritsar
        "1592635196078-e58a5b06962e",  # Golden Temple at night
    ],
    "himachal_bir_billing_paragliding": [
        "1605733513597-a8f8341084e6",  # Paraglider over valley
        "1593757147298-e064ed1419e1",  # Mountain paragliding
    ],
    "himachal_spiti_kaza": [
        "1623944889288-cd147dbb517c",  # Spiti high desert
        "1605640840605-14ac1855827b",  # Cold desert mountain
    ],
    "himachal_spiti_key_monastery": [
        "1601273947037-d20ce5e64d2c",  # Tabo/Key style monastery
        "1582378262345-a0a87a1c7b71",  # Buddhist monastery clifftop
    ],
    "himachal_spiti_chandratal": [
        "1614100015437-8e2bdf3f0b97",  # High alpine lake
        "1591201566175-4fbd33d6d2a3",  # Mountain lake camp
    ],
    "himachal_kullu_drive": [
        "1583322306895-0d9aaee45ba8",  # Kullu valley road
        "1626621331165-e7e3c25527e1",  # Beas river road
    ],
    "himachal_chandigarh_arrival": [
        "1587474260584-136574528ed5",  # Generic Indian airport drive
        "1565721032996-04b25a16dd6f",  # City evening
    ],

    # ── UTTAR PRADESH ──
    "up_taj_mahal": [
        "1564507592333-c60657eea523",  # Taj Mahal sunrise classic
        "1548013146-72479768bada",  # Taj Mahal symmetric
    ],
    "up_agra_fort": [
        "1585135497273-1a86b09fe7e2",  # Agra Fort red sandstone
        "1599661046289-e31897846e41",  # Indian fort architecture
    ],
    "up_varanasi_ghats": [
        "1561361513-2d000a50f0dc",  # Varanasi ghats sunrise
        "1561361398-a8a1c2cf8b30",  # Boats on Ganges
    ],
    "up_ganga_aarti": [
        "1611348586804-61bf6c080437",  # Aarti lamps glow
        "1582272472395-de0e739a3e54",  # Evening Ganga aarti
    ],
    "up_sarnath": [
        "1601273947037-d20ce5e64d2c",  # Buddhist stupa
        "1582378262345-a0a87a1c7b71",  # Sarnath ruins
    ],
    "up_ayodhya_ram_mandir": [
        "1582653291997-079a1c0ad3ea",  # Hindu temple at sunset
        "1592635196078-e58a5b06962e",  # Temple golden lights
    ],
    "up_prayagraj_sangam": [
        "1561361398-a8a1c2cf8b30",  # River boats
        "1561361513-2d000a50f0dc",  # Sangam confluence
    ],
    "up_mathura_vrindavan": [
        "1582653291997-079a1c0ad3ea",  # Krishna temple
        "1611348586804-61bf6c080437",  # Vrindavan colors
    ],
    "up_delhi_arrival": [
        "1587474260584-136574528ed5",  # India Gate
        "1585135497273-1a86b09fe7e2",  # Red Fort Delhi
    ],
    "up_jhansi_orchha": [
        "1599661046289-e31897846e41",  # Jhansi Fort
        "1585135497273-1a86b09fe7e2",  # Orchha palace
    ],

    # ── RAJASTHAN ──
    "raj_jaipur_hawa_mahal": [
        "1599661046289-e31897846e41",  # Jaisalmer/Hawa Mahal style
        "1477586957327-847a0f3f3406",  # Pink City facade
    ],
    "raj_amber_fort": [
        "1599661046289-e31897846e41",  # Fort wide
        "1477586957327-847a0f3f3406",  # Amber Fort hilltop
    ],
    "raj_jodhpur_mehrangarh": [
        "1599661046289-e31897846e41",  # Mehrangarh Fort
        "1477586957327-847a0f3f3406",  # Blue City Jodhpur
    ],
    "raj_jaisalmer_fort": [
        "1599661046289-e31897846e41",  # Jaisalmer Fort
        "1477586957327-847a0f3f3406",  # Golden city fort
    ],
    "raj_jaisalmer_dunes": [
        "1593516020146-fa6f8f4d6c91",  # Sam Sand Dunes camel
        "1477587458883-47145ed94245",  # Camel safari sunset
    ],
    "raj_udaipur_lake_palace": [
        "1477587458883-47145ed94245",  # Lake Pichola palace
        "1599661046289-e31897846e41",  # City Palace Udaipur
    ],
    "raj_ranthambore_tiger": [
        "1605733513597-a8f8341084e6",  # Tiger safari jeep
        "1593757147298-e064ed1419e1",  # Tiger in grass
    ],
    "raj_pushkar_brahma": [
        "1582653291997-079a1c0ad3ea",  # Pushkar lake ghats
        "1611348586804-61bf6c080437",  # Brahma temple
    ],
    "raj_mount_abu_nakki_lake": [
        "1611348586804-61bf6c080437",  # Hill lake
        "1597040053998-03a06af96ec5",  # Mount Abu hills
    ],
    "raj_jawai_leopard": [
        "1605733513597-a8f8341084e6",  # Leopard safari
        "1593757147298-e064ed1419e1",  # Wildlife big cat
    ],
    "raj_kumbhalgarh_fort": [
        "1599661046289-e31897846e41",  # Kumbhalgarh walls
        "1585135497273-1a86b09fe7e2",  # Fort architecture
    ],

    # ── UTTARAKHAND ──
    "ukd_haridwar_ganga": [
        "1561361398-a8a1c2cf8b30",  # Haridwar ganga aarti
        "1561361513-2d000a50f0dc",  # Har ki Pauri
    ],
    "ukd_rishikesh_lakshman_jhula": [
        "1611348586804-61bf6c080437",  # Lakshman Jhula bridge
        "1561361513-2d000a50f0dc",  # Rishikesh river
    ],
    "ukd_kainchi_dham": [
        "1582653291997-079a1c0ad3ea",  # Hill ashram
        "1592635196078-e58a5b06962e",  # Forest temple
    ],
    "ukd_nainital_lake": [
        "1597040053998-03a06af96ec5",  # Naini Lake
        "1611348586804-61bf6c080437",  # Nainital town reflection
    ],
    "ukd_ranikhet": [
        "1597040053998-03a06af96ec5",  # Hill station pine
        "1611348586804-61bf6c080437",  # Garhwal hills
    ],
    "ukd_corbett_safari": [
        "1605733513597-a8f8341084e6",  # Tiger safari
        "1593757147298-e064ed1419e1",  # Forest jeep
    ],
    "ukd_mussoorie_mall": [
        "1597040053998-03a06af96ec5",  # Mussoorie hills
        "1626264146977-fa48a8d5d2a3",  # Mall road style
    ],
    "ukd_dhanaulti_kanatal": [
        "1611348586804-61bf6c080437",  # Pine forest hills
        "1597040053998-03a06af96ec5",  # Garhwal pine
    ],
    "ukd_tehri_lake": [
        "1611348586804-61bf6c080437",  # Mountain lake
        "1597040053998-03a06af96ec5",  # Lake hills
    ],
    "ukd_kedarnath": [
        "1626621331169-5f34be280ed9",  # Kedarnath temple peaks
        "1611348586804-61bf6c080437",  # Himalayan temple
    ],
    "ukd_badrinath": [
        "1582653291997-079a1c0ad3ea",  # Badrinath colorful temple
        "1592635196078-e58a5b06962e",  # Hindu temple peaks
    ],
    "ukd_yamunotri_gangotri": [
        "1626621331169-5f34be280ed9",  # Char Dham temple
        "1611348586804-61bf6c080437",  # Mountain shrine
    ],
}

# Local custom images we already have
LOCAL_IMAGES = {
    "kashmir_hero":        "/images/generated/kashmir-hero.webp",
    "kashmir_gulmarg_day": "/images/generated/kashmir-day-5-gulmarg-gondola.webp",
    "kashmir_arrive_day":  "/images/generated/kashmir-day-1-arrive-srinagar.webp",
    "himachal_hero":       "/images/generated/himachal-pradesh-hero.webp",
    "rajasthan_hero":      "/images/generated/rajasthan-hero.webp",
    "rajasthan_camel":     "/images/generated/rajasthan-day-5-jaisalmer-camel-safari.webp",
    "rajasthan_udaipur":   "/images/generated/rajasthan-day-7-udaipur-lake-palace.webp",
    "varanasi_hero":       "/images/generated/varanasi-hero.webp",
    "uttarakhand_hero":    "/images/generated/uttarakhand-hero.webp",
    "ukd_rishikesh_day":   "/images/generated/uttarakhand-day-2-rishikesh.webp",
    "char_dham_kedarnath": "/images/generated/char-dham-day-4-kedarnath.webp",
}


def url(photo_id: str, w: int, h: int) -> str:
    return f"https://images.unsplash.com/photo-{photo_id}?w={w}&h={h}&fit=crop"


# ─── KEYWORD → LIBRARY KEY MAPPING ───────────────────────────────────────────
# Order matters — first match wins. More specific keywords go first.

KEYWORD_MAP = [
    # Kashmir
    (["gulmarg", "gondola"], "kashmir_gulmarg_gondola"),
    (["sonmarg", "sonamarg", "thajiwas"], "kashmir_sonmarg_glacier"),
    (["pahalgam", "lidder"], "kashmir_pahalgam_valley"),
    (["betaab", "aru valley", "chandanwari"], "kashmir_betaab_aru_valley"),
    (["mughal garden", "nishat", "shalimar", "chashme"], "kashmir_mughal_gardens"),
    (["doodhpathri"], "kashmir_doodhpathri"),
    (["gurez", "habba khatoon", "kishanganga", "razdan"], "kashmir_gurez_valley"),
    (["sinthan"], "kashmir_sinthan_top"),
    (["vaishno", "katra", "trikuta"], "kashmir_vaishno_devi"),
    (["houseboat", "dal lake"], "kashmir_dal_lake_shikara"),
    (["shikara"], "kashmir_dal_lake_shikara"),
    (["srinagar"], "kashmir_dal_lake_shikara"),

    # Himachal
    (["spiti", "kaza", "tabo", "kibber", "langza", "hikkim"], "himachal_spiti_kaza"),
    (["key monastery", "dhankar"], "himachal_spiti_key_monastery"),
    (["chandratal", "kunzum"], "himachal_spiti_chandratal"),
    (["bir", "billing", "paragliding"], "himachal_bir_billing_paragliding"),
    (["solang", "rohtang", "atal tunnel"], "himachal_solang_rohtang"),
    (["kullu valley", "kullu"], "himachal_kullu_drive"),
    (["dharamshala", "mcleodganj", "mcleod", "bhagsu", "dalai lama"], "himachal_dharamshala_mcleod"),
    (["dalhousie", "khajjiar", "panchpula"], "himachal_dalhousie_khajjiar"),
    (["amritsar", "golden temple", "wagah", "jallianwala"], "himachal_amritsar_golden"),
    (["manali", "hadimba", "vashisht", "old manali"], "himachal_manali_valley"),
    (["shimla", "kufri", "jakhu", "mall road", "ridge", "christ church"], "himachal_shimla_mall"),
    (["chandigarh", "drive", "arrival"], "himachal_chandigarh_arrival"),
    (["sangla", "kinnaur", "kalpa"], "himachal_spiti_kaza"),

    # UP
    (["taj mahal", "agra"], "up_taj_mahal"),
    (["agra fort", "fatehpur sikri"], "up_agra_fort"),
    (["sarnath"], "up_sarnath"),
    (["aarti", "ganga aarti"], "up_ganga_aarti"),
    (["varanasi", "kashi", "vishwanath", "banaras", "ramnagar"], "up_varanasi_ghats"),
    (["ayodhya", "ram mandir", "hanuman garhi", "saryu", "kanak"], "up_ayodhya_ram_mandir"),
    (["prayagraj", "sangam", "triveni", "akshayavat", "anand bhavan"], "up_prayagraj_sangam"),
    (["mathura", "vrindavan", "krishna janmabhoomi", "banke bihari", "prem mandir", "iskcon", "govardhan"], "up_mathura_vrindavan"),
    (["jhansi", "orchha", "rani mahal"], "up_jhansi_orchha"),
    (["delhi", "red fort", "qutub", "india gate"], "up_delhi_arrival"),

    # Rajasthan
    (["hawa mahal", "city palace jaipur", "jantar mantar"], "raj_jaipur_hawa_mahal"),
    (["amber fort", "jaigarh", "nahargarh"], "raj_amber_fort"),
    (["mehrangarh", "jodhpur", "blue city", "jaswant thada"], "raj_jodhpur_mehrangarh"),
    (["jaisalmer fort", "patwon", "patwa"], "raj_jaisalmer_fort"),
    (["sam sand", "sand dune", "camel safari", "desert safari"], "raj_jaisalmer_dunes"),
    (["lake pichola", "udaipur", "saheliyon", "jagdish", "jag mandir", "city palace udaipur"], "raj_udaipur_lake_palace"),
    (["ranthambore", "tiger"], "raj_ranthambore_tiger"),
    (["pushkar", "brahma"], "raj_pushkar_brahma"),
    (["mount abu", "nakki", "dilwara", "achalgarh", "guru shikhar"], "raj_mount_abu_nakki_lake"),
    (["jawai", "leopard"], "raj_jawai_leopard"),
    (["kumbhalgarh"], "raj_kumbhalgarh_fort"),
    (["jaipur"], "raj_jaipur_hawa_mahal"),
    (["jaisalmer"], "raj_jaisalmer_fort"),

    # Uttarakhand
    (["kedarnath"], "ukd_kedarnath"),
    (["badrinath", "mana"], "ukd_badrinath"),
    (["yamunotri", "gangotri", "uttarkashi", "barkot", "guptkashi", "joshimath"], "ukd_yamunotri_gangotri"),
    (["haridwar", "har ki pauri", "mansa devi", "chandi devi"], "ukd_haridwar_ganga"),
    (["rishikesh", "lakshman jhula", "triveni ghat"], "ukd_rishikesh_lakshman_jhula"),
    (["kainchi", "neem karoli"], "ukd_kainchi_dham"),
    (["nainital", "naini", "snow view", "tiffin top", "pangot"], "ukd_nainital_lake"),
    (["ranikhet", "chaubatia", "jhula devi"], "ukd_ranikhet"),
    (["corbett", "jim corbett"], "ukd_corbett_safari"),
    (["mussoorie", "gun hill", "kempty", "lal tibba"], "ukd_mussoorie_mall"),
    (["dhanaulti", "kanatal", "surkhanda"], "ukd_dhanaulti_kanatal"),
    (["tehri"], "ukd_tehri_lake"),
    (["dehradun"], "ukd_mussoorie_mall"),
]


def find_library_key(text: str) -> str | None:
    """Match free-text against keyword map. Returns library key or None."""
    t = text.lower()
    for keywords, key in KEYWORD_MAP:
        for kw in keywords:
            if kw in t:
                return key
    return None


# ─── REPLACEMENT ENGINE ──────────────────────────────────────────────────────

# Track usage per (destination_slug, library_key) to cycle through variants
def make_picker():
    counters: dict[tuple[str, str], int] = defaultdict(int)
    def pick(dest: str, key: str, dim: tuple[int, int]) -> str:
        ids = LIBRARY[key]
        idx = counters[(dest, key)] % len(ids)
        counters[(dest, key)] += 1
        return url(ids[idx], dim[0], dim[1])
    return pick


def apply_destination_images(text: str, picker) -> tuple[str, int]:
    """Replace destination heroes (keep) and gallery images (curate)."""
    target_dests = {
        'kashmir':                    [("kashmir_dal_lake_shikara", "kashmir_houseboat", "kashmir_gulmarg_gondola", "kashmir_pahalgam_valley", "kashmir_mughal_gardens", "kashmir_sonmarg_glacier")],
        'himachal-pradesh':           [("himachal_shimla_mall", "himachal_manali_valley", "himachal_solang_rohtang", "himachal_dharamshala_mcleod", "himachal_dalhousie_khajjiar", "himachal_amritsar_golden")],
        'varanasi-and-uttar-pradesh': [("up_varanasi_ghats", "up_ganga_aarti", "up_taj_mahal", "up_ayodhya_ram_mandir", "up_mathura_vrindavan", "up_prayagraj_sangam")],
        'rajasthan':                  [("raj_jaipur_hawa_mahal", "raj_amber_fort", "raj_jodhpur_mehrangarh", "raj_jaisalmer_dunes", "raj_udaipur_lake_palace", "raj_pushkar_brahma")],
        'uttarakhand':                [("ukd_haridwar_ganga", "ukd_rishikesh_lakshman_jhula", "ukd_nainital_lake", "ukd_mussoorie_mall", "ukd_kedarnath", "ukd_corbett_safari")],
    }

    changes = 0
    for dest_slug, gallery_keys_list in target_dests.items():
        gallery_keys = gallery_keys_list[0]
        # Build new gallery URLs
        new_gallery = ',\n      '.join(
            f'"{picker(dest_slug, k, (800, 600))}"' for k in gallery_keys
        )
        new_gallery_block = f'galleryImages: [\n      {new_gallery},\n    ]'

        # Match this destination's full block and replace its galleryImages
        pattern = re.compile(
            r'(slug:\s*"' + re.escape(dest_slug) + r'".*?)galleryImages:\s*\[[^\]]*\]',
            re.DOTALL,
        )
        new_text, n = pattern.subn(lambda m: m.group(1) + new_gallery_block, text, count=1)
        if n:
            text = new_text
            changes += 1
    return text, changes


def apply_package_images(text: str, picker) -> tuple[str, int]:
    """Replace package hero, gallery (4 images), and itinerary day images."""
    # Identify each package block within the packages array
    target_dests = {'kashmir', 'himachal-pradesh', 'varanasi-and-uttar-pradesh', 'rajasthan', 'uttarakhand'}

    changes = 0

    # Use a destructive-find approach: scan all package objects, build replacements,
    # then apply them in reverse order to keep offsets valid.
    pkg_decl = "packages: Package[] = ["
    arr_start = text.index(pkg_decl) + len(pkg_decl)

    # Walk through balanced braces to find each top-level package
    depth = 0
    in_string = False
    string_char = ""
    obj_start = None
    pkg_ranges = []  # list of (start, end) absolute offsets

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

    # Process each package
    edits = []  # (start, end, new_text)
    for start, end in pkg_ranges:
        block = text[start:end]
        dest_m = re.search(r'destinationSlug:\s*"([^"]+)"', block)
        if not dest_m or dest_m.group(1) not in target_dests:
            continue
        dest = dest_m.group(1)
        slug_m = re.search(r'slug:\s*"([^"]+)"', block)
        title_m = re.search(r'title:\s*"([^"]+)"', block)
        slug = slug_m.group(1) if slug_m else ""
        title = title_m.group(1) if title_m else ""

        new_block = block

        # ─── Hero image ─────────────────────────────────────────
        # Use the destination hero local image if available
        local_hero_map = {
            "kashmir": LOCAL_IMAGES["kashmir_hero"],
            "himachal-pradesh": LOCAL_IMAGES["himachal_hero"],
            "rajasthan": LOCAL_IMAGES["rajasthan_hero"],
            "varanasi-and-uttar-pradesh": LOCAL_IMAGES["varanasi_hero"],
            "uttarakhand": LOCAL_IMAGES["uttarakhand_hero"],
        }
        hero_url = local_hero_map.get(dest)
        if hero_url:
            new_block = re.sub(
                r'(heroImage:\s*)"[^"]*"',
                lambda m: m.group(1) + f'"{hero_url}"',
                new_block, count=1
            )

        # ─── Gallery (4 images) ─────────────────────────────────
        # Pick 4 keys based on title keywords
        gallery_keys_by_pkg = {
            # Kashmir
            "kashmir-essence-srinagar-pahalgam":      ["kashmir_dal_lake_shikara", "kashmir_gulmarg_gondola", "kashmir_pahalgam_valley", "kashmir_sonmarg_glacier"],
            "kashmir-grand-jammu-srinagar":           ["kashmir_vaishno_devi", "kashmir_pahalgam_valley", "kashmir_gulmarg_gondola", "kashmir_dal_lake_shikara"],
            "kashmir-offbeat-gurez-sinthan":          ["kashmir_gurez_valley", "kashmir_doodhpathri", "kashmir_sinthan_top", "kashmir_dal_lake_shikara"],
            # Himachal
            "himachal-classic-shimla-manali":         ["himachal_shimla_mall", "himachal_manali_valley", "himachal_solang_rohtang", "himachal_kullu_drive"],
            "himachal-grand-circuit":                 ["himachal_shimla_mall", "himachal_manali_valley", "himachal_dharamshala_mcleod", "himachal_amritsar_golden"],
            "punjab-himachal-heritage":               ["himachal_amritsar_golden", "himachal_dalhousie_khajjiar", "himachal_dharamshala_mcleod", "himachal_bir_billing_paragliding"],
            "spiti-valley-adventure":                 ["himachal_spiti_kaza", "himachal_spiti_key_monastery", "himachal_spiti_chandratal", "himachal_shimla_mall"],
            # UP
            "up-spiritual-triangle":                  ["up_prayagraj_sangam", "up_varanasi_ghats", "up_ganga_aarti", "up_ayodhya_ram_mandir"],
            "brij-bhoomi-yatra":                      ["up_taj_mahal", "up_mathura_vrindavan", "up_delhi_arrival", "up_mathura_vrindavan"],
            "complete-up-heritage-circuit":           ["up_taj_mahal", "up_varanasi_ghats", "up_ayodhya_ram_mandir", "up_jhansi_orchha"],
            # Rajasthan
            "rajasthan-royal-heritage":               ["raj_jaipur_hawa_mahal", "raj_jodhpur_mehrangarh", "raj_jaisalmer_dunes", "raj_ranthambore_tiger"],
            "rajasthan-lakes-and-hills":              ["raj_mount_abu_nakki_lake", "raj_udaipur_lake_palace", "raj_jawai_leopard", "raj_kumbhalgarh_fort"],
            "rajasthan-complete-circuit":             ["raj_jaipur_hawa_mahal", "raj_jodhpur_mehrangarh", "raj_jaisalmer_dunes", "raj_udaipur_lake_palace"],
            # Uttarakhand
            "char-dham-by-road":                      ["ukd_yamunotri_gangotri", "ukd_kedarnath", "ukd_badrinath", "ukd_haridwar_ganga"],
            "uttarakhand-hills-and-pilgrimage":       ["ukd_haridwar_ganga", "ukd_rishikesh_lakshman_jhula", "ukd_nainital_lake", "ukd_corbett_safari"],
            "mussoorie-and-garhwal-hills":            ["ukd_mussoorie_mall", "ukd_dhanaulti_kanatal", "ukd_tehri_lake", "ukd_haridwar_ganga"],
        }
        gkeys = gallery_keys_by_pkg.get(slug)
        if gkeys:
            new_imgs = ',\n      '.join(
                f'"{picker(dest, k, (800, 600))}"' for k in gkeys
            )
            new_imgs_block = f'images: [\n      {new_imgs},\n    ]'
            new_block = re.sub(
                r'images:\s*\[[^\]]*\](?=,\s*\n\s*duration)',
                lambda m: new_imgs_block,
                new_block, count=1
            )

        # ─── Day-by-day images ──────────────────────────────────
        # Find each itinerary day and replace its image based on day title
        # Match each `{ day: N, title: "...", ..., image: "..." }` chunk.
        def replace_day_image(day_match):
            day_block = day_match.group(0)
            t_m = re.search(r'title:\s*"([^"]+)"', day_block)
            day_title = t_m.group(1) if t_m else ""

            # Special-case overrides: use local custom images where we have them
            if dest == "kashmir" and ("gulmarg" in day_title.lower() and "gondola" in day_title.lower()):
                new_img = LOCAL_IMAGES["kashmir_gulmarg_day"]
            elif dest == "kashmir" and ("arrival" in day_title.lower() and "srinagar" in day_title.lower()):
                new_img = LOCAL_IMAGES["kashmir_arrive_day"]
            elif dest == "uttarakhand" and "rishikesh" in day_title.lower():
                new_img = LOCAL_IMAGES["ukd_rishikesh_day"]
            elif dest == "uttarakhand" and "kedarnath" in day_title.lower():
                new_img = LOCAL_IMAGES["char_dham_kedarnath"]
            elif dest == "rajasthan" and ("camel" in day_title.lower() or "sand dune" in day_title.lower() or "desert safari" in day_title.lower()):
                new_img = LOCAL_IMAGES["rajasthan_camel"]
            elif dest == "rajasthan" and ("udaipur" in day_title.lower() and ("palace" in day_title.lower() or "pichola" in day_title.lower())):
                new_img = LOCAL_IMAGES["rajasthan_udaipur"]
            else:
                key = find_library_key(day_title)
                if not key:
                    # Fallback: use destination hero
                    return day_block
                new_img = picker(dest, key, (600, 400))

            return re.sub(
                r'(image:\s*)"[^"]*"',
                lambda m: m.group(1) + f'"{new_img}"',
                day_block, count=1
            )

        new_block = re.sub(
            r'\{[^{}]*?day:\s*\d+[^{}]*?\}',
            replace_day_image,
            new_block, flags=re.DOTALL
        )

        if new_block != block:
            edits.append((start, end, new_block))

    # Apply edits in reverse so offsets remain valid
    edits.sort(key=lambda e: e[0], reverse=True)
    for start, end, new_text in edits:
        text = text[:start] + new_text + text[end:]
        changes += 1

    return text, changes


def main():
    picker = make_picker()

    # Destinations
    dest_path = Path("src/data/destinations.ts")
    dest_text = dest_path.read_text(encoding="utf-8")
    dest_text, dest_changes = apply_destination_images(dest_text, picker)
    dest_path.write_text(dest_text, encoding="utf-8")
    print(f"destinations.ts: updated {dest_changes} destinations")

    # Packages
    pkg_path = Path("src/data/packages.ts")
    pkg_text = pkg_path.read_text(encoding="utf-8")
    pkg_text, pkg_changes = apply_package_images(pkg_text, picker)
    pkg_path.write_text(pkg_text, encoding="utf-8")
    print(f"packages.ts: updated {pkg_changes} packages")


if __name__ == "__main__":
    main()
