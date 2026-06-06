# -*- coding: utf-8 -*-
"""Generate docs/IMAGE_PROMPTS.md — Nano Banana 2 prompts for every image that
currently uses a dummy/placeholder: the 9 sourced destination heroes + the
itinerary day-images of the 25 packages whose days now repeat one image.

Hero prompts are hand-written (specific + premium); itinerary prompts are built
from each day's real title + activities so they stay scene-accurate.
"""
import re

STYLE = ("ultra-premium editorial travel photography, natural golden-hour light, "
         "rich but natural colours, shallow depth of field, atmospheric, "
         "photorealistic, sharp detail, no text, no watermark, no logos, "
         "no posed people looking at camera")

HERO = {  # slug -> (Title, scene, dims)
    "bhutan": ("Bhutan", "Paro Taktsang (Tiger's Nest) monastery clinging to a sheer cliff high above a misty Himalayan valley, fluttering prayer flags in the foreground, pine forest, soft morning light"),
    "gujarat": ("Gujarat", "the white salt desert of the Rann of Kutch stretching to the horizon under a vast twilight sky, full moon rising, a lone camel-cart silhouette, cracked salt-flat texture"),
    "jordan": ("Jordan", "the rose-red sandstone facade of Petra's Treasury (Al-Khazneh) glowing in warm light, framed by the narrow walls of the Siq canyon"),
    "uzbekistan": ("Uzbekistan", "Registan Square in Samarkand at blue hour, three grand madrasas with turquoise ribbed domes and intricate Islamic mosaic tilework, warm lamplight"),
    "chhattisgarh": ("Chhattisgarh", "the horseshoe-shaped Chitrakote Falls in full monsoon flow, wide curtains of water over red rock into a misty gorge, lush emerald jungle, a faint rainbow"),
    "telangana": ("Telangana", "the Charminar monument in old Hyderabad at golden hour, four grand minarets, the bustling Laad Bazaar glittering with bangles below, warm honeyed stone"),
    "bihar": ("Bihar", "the towering pyramidal spire of the Mahabodhi Temple at Bodh Gaya at dawn, the sacred Bodhi tree, saffron-robed monks in quiet meditation, golden serenity"),
    "azerbaijan": ("Azerbaijan", "the Baku waterfront at dusk where the ancient stone Maiden Tower and walled Old City meet the modern curved glass Flame Towers, the Caspian Sea, jewel-toned sky"),
    "philippines": ("Philippines", "El Nido in Palawan — dramatic karst limestone cliffs rising from a glassy turquoise lagoon, a traditional bangka outrigger boat, lush tropical green, tropical sun"),
}

# destination -> a short scene cue used to ground itinerary prompts
DEST_HINT = {
    "Leh-Ladakh": "high-altitude Himalayan desert, Buddhist monasteries, turquoise lakes",
    "Sri Lanka": "tropical Sri Lanka — tea hills, ancient stupas, palm coast",
    "Maharashtra": "Western Ghats, forts, temples and Konkan coast of Maharashtra, India",
    "Karnataka": "Karnataka, India — palaces, coffee hills, temple ruins, Western Ghats",
    "Goa": "lush Goa, India — waterfalls, spice forest, rivers",
    "Madhya Pradesh": "central India — riverside temples and ghats of Madhya Pradesh",
    "Varanasi & Uttar Pradesh": "north India — temple towns, ghats and Braj country of Uttar Pradesh",
    "Rajasthan": "Rajasthan, India — palaces, lakes and Aravalli hills",
    "Gujarat": "Gujarat, India — the Narmada, Statue of Unity and Saurashtra",
    "Telangana": "Telangana, India — Hyderabad monuments, Deccan temples",
    "Hong Kong": "Hong Kong & Macau — neon harbour skyline, peaks, colonial-Portuguese streets",
    "Bhutan": "the Himalayan kingdom of Bhutan — dzongs, prayer flags, forested valleys",
    "Russia": "the Caucasus — glaciated slopes of Mt Elbrus, Russia",
}

# the 25 affected packages (repetitive day images = dummy)
AFFECTED = {
 "leh-to-leh-bike-suv","5-nights-with-dambulla","ashthavinayak","badami-hampi-chikmangluru",
 "dudhsagar-waterfall-trek","maharashtra-jyot-shirdi-shani-daulatabad","scenic-sri-lanka",
 "scintillating-tropical-tour-to-sri-lanka","ujjain-omkareshwar","brij-bhoomi-yatra",
 "rajasthan-lakes-and-hills","statue-of-unity-narmada","mahabaleshwar-lonavala-weekend",
 "konkan-coastal","hyderabad-city-break-4n","karnataka-mysore-coorg","karnataka-coorg-ooty",
 "mysore-ooty-kodaikanal","hong-kong-essentials-4n","hong-kong-macau-6n","bhutan-discovery-7n",
 "bhutan-cultural-10n","bhutan-grand-12n","dagala-thousand-lakes-trek","mount-elbrus-climb",
}

pk = open("src/data/packages.ts", encoding="utf-8").read()
blocks = []
idxs = [m.start() for m in re.finditer(r"\n  \{\n    title:", pk)] + [len(pk)]
for i in range(len(idxs) - 1):
    blocks.append(pk[idxs[i]:idxs[i + 1]])


def field(b, name):
    m = re.search(name + r':\s*"([^"]+)"', b)
    return m.group(1) if m else ""


def clean(t):
    t = re.sub(r"^(Day\s*\d+\s*[—:-]\s*)", "", t)
    t = re.sub(r"^(Arrive in|Arrival in|Arrival|Depart|Departure[ ,-]*|Transfer to)\s*", "", t)
    return t.strip(" —-:")


out = []
out.append("# TravelSense — Nano Banana 2 image prompts (dummy-image replacements)\n")
out.append("Generated %s. Replaces the placeholder images currently on the site.\n" % "for the image refresh")
out.append("\n## How to use\n")
out.append("- Append the **STYLE** line to every prompt for a consistent premium look.\n")
out.append("- **Heroes:** render **16:9** (e.g. 1600×900) → save as the listed file (overwrites the placeholder).\n")
out.append("- **Itinerary days:** render **3:2** (e.g. 1200×800) → save under `public/images/generated/` with the listed name, then I'll wire them into the data.\n")
out.append("- Optimise PNG→WebP after (the repo's `scripts/optimize-images.py` pattern).\n")
out.append("\n**STYLE (append to all):** _%s_\n" % STYLE)

out.append("\n---\n\n## 1. Destination hero images (9) — replace the CC-BY placeholders\n")
for slug, (title, scene) in HERO.items():
    out.append("\n**%s**  → `public/images/destinations/%s.webp` (16:9)\n\n" % (title, slug))
    out.append("> %s. %s.\n" % (scene[0].upper() + scene[1:], STYLE))

out.append("\n---\n\n## 2. Itinerary day images — packages whose days currently repeat one photo\n")
n_days = 0
for b in blocks:
    slug = field(b, "slug")
    if slug not in AFFECTED:
        continue
    dest = field(b, "destinationName")
    title = field(b, "title")
    hint = DEST_HINT.get(dest, dest)
    # day entries
    days = re.findall(r"day:\s*(\d+),\s*\n\s*title:\s*\"([^\"]+)\"[\s\S]*?activities:\s*\[([^\]]*)\]", b)
    out.append("\n### %s  _(%s — %d days)_\n" % (title, dest, len(days)))
    for dnum, dtitle, acts in days:
        acts_l = [a.strip().strip('"') for a in acts.split(",") if a.strip()]
        scene = ", ".join(acts_l[:3])
        ct = clean(dtitle)
        fname = "%s-day%s.webp" % (slug, dnum)
        prompt = "%s — %s. Setting: %s. %s." % (ct, hint, scene if scene else hint, STYLE)
        out.append("- **Day %s — %s** → `generated/%s`\n  > %s\n" % (dnum, ct, fname, prompt))
        n_days += 1

import os
os.makedirs("docs", exist_ok=True)
open("docs/IMAGE_PROMPTS.md", "w", encoding="utf-8").write("".join(out))
print("wrote docs/IMAGE_PROMPTS.md  —  9 hero + %d itinerary-day prompts" % n_days)
