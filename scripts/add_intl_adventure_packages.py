"""Add TWO international adventure treks/climbs to the Adventure category of
src/data/packages.ts — for two international destinations that already exist
(Bhutan, Russia) and match the Aquaterra specialist-operator reference:

  1. Dagala Thousand Lakes Trek  — Bhutan  (6D/5N, Moderate)
  2. Mount Elbrus Climb          — Russia  (8D/7N, Challenging)

We write our OWN concise day-wise itineraries (real stages + elevation in metres
for the altitude chart) — no third-party wording is copied. Both carry the agreed
transparencyNote verbatim and indicative international per-person pricing.

Pattern mirrors scripts/add_aquaterra_packages.py: build TS-literal package
objects matching the local Package interface in packages.ts and insert them
before the sole top-level `]` that closes the `allPackages` array. The file does
`const allPackages: Package[] = [...]` then
`export const packages = allPackages.filter((p) => p.category !== "educational")`.

NOTE on difficulty: the Package.difficulty union is only
"Easy" | "Moderate" | "Challenging" (no "Difficult"), so the Elbrus climb is
graded "Challenging" (its real seriousness is conveyed in the copy/highlights).
"""
import json, io, os

# ── shared transparency note (verbatim, on every package) ──────────────────
TRANSP = (
    "Indicative itinerary and pricing — our specialist adventure-operator "
    "partnership is being finalised; exact departures, grades and rates "
    "confirmed on enquiry."
)


def m(elev):
    """Format an elevation integer (metres) as a string like '3,500m'."""
    if elev is None:
        return None
    return f"{elev:,}m"


def day_ts(d, idx, hero):
    """Render one PackageItineraryDay TS literal. `d` keys:
    t(title), desc, acts(list), meals, acc(accommodation), elev(int|None),
    dist(str|None), hl(highlight str|None), img(str|None)."""
    img = d.get("img") or hero
    parts = [
        "      {",
        f"        day: {idx},",
        f"        title: {json.dumps(d['t'])},",
        f"        description:\n          {json.dumps(d['desc'])},",
        f"        activities: {json.dumps(d['acts'])},",
        f"        meals: {json.dumps(d['meals'])},",
        f"        accommodation: {json.dumps(d['acc'])},",
    ]
    if d.get("elev") is not None:
        parts.append(f"        elevation: {json.dumps(m(d['elev']))},")
    if d.get("dist"):
        parts.append(f"        distance: {json.dumps(d['dist'])},")
    if d.get("hl"):
        parts.append(f"        highlight: {json.dumps(d['hl'])},")
    parts.append(f"        image: {json.dumps(img)},")
    parts.append("      },")
    return "\n".join(parts)


def pkg_ts(p):
    """Render one Package TS literal from a dict `p`, matching the local
    Package interface field order in src/data/packages.ts."""
    hero = p["hero"]
    gallery = p.get("gallery") or [hero, hero, hero, hero]
    days = p["itin"]
    gmin, gmax = p.get("group", (2, 12))
    L = []
    L.append("  {")
    L.append(f"    title: {json.dumps(p['title'])},")
    L.append(f"    slug: {json.dumps(p['slug'])},")
    L.append(f"    destinationName: {json.dumps(p['destName'])},")
    L.append(f"    destinationSlug: {json.dumps(p['destSlug'])},")
    L.append('    category: "adventure",')
    L.append(f"    description:\n      {json.dumps(p['desc'])},")
    L.append(f"    heroImage: {json.dumps(hero)},")
    L.append(f"    images: {json.dumps(gallery)},")
    L.append(f"    duration: {{ days: {p['days']}, nights: {p['nights']} }},")
    L.append(f"    price: {p['price']},")
    L.append(f"    difficulty: {json.dumps(p['grade'])},")
    L.append(f"    groupSize: {{ min: {gmin}, max: {gmax} }},")
    L.append(f"    rating: {p['rating']},")
    L.append(f"    reviewCount: {p['reviews']},")
    L.append(f"    inclusions: {json.dumps(p['incl'])},")
    L.append(f"    exclusions: {json.dumps(p['excl'])},")
    L.append(f"    highlights: {json.dumps(p['hl'])},")
    L.append("    featured: false,")
    L.append(f"    transparencyNote:\n      {json.dumps(TRANSP)},")
    L.append("    itinerary: [")
    for i, dd in enumerate(days):
        L.append(day_ts(dd, i + 1, hero))
    L.append("    ],")
    L.append("  },")
    return "\n".join(L)


# ── shared inclusion / exclusion sets (international high-altitude) ─────────
TREK_INCL = [
    "Experienced trek leader and certified local mountain guides",
    "Camping equipment — tents, sleeping bags, mats, dining and toilet tents",
    "All meals on trek (breakfast, lunch, dinner) plus tea/snacks",
    "Pack ponies / porters for common loads and kitchen",
    "Trekking permits, conservation and area fees",
    "First-aid kit, oximeter and emergency evacuation coordination",
]
TREK_EXCL = [
    "International flights and visa fees",
    "Personal trekking gear, clothing and footwear",
    "Personal porter for individual backpack (on request)",
    "Personal expenses, tips and gratuities",
    "Travel insurance with high-altitude evacuation cover (mandatory)",
    "Anything not mentioned under inclusions",
]
CLIMB_INCL = [
    "IFMGA / certified mountain guides at a safe climbing ratio",
    "Mountain huts and barrel-hut bunk accommodation on the mountain",
    "All mountain meals plus tea/snacks during the programme",
    "Snowcat lift support and group climbing-rope teams on summit day",
    "Climbing permits, national-park and border-zone fees",
    "Group safety, radios, oximeter and emergency evacuation coordination",
]
CLIMB_EXCL = [
    "International flights and Russian visa fees",
    "Personal mountaineering kit — boots, crampons, ice-axe, harness, layers (rental on request)",
    "Personal expenses, tips and gratuities",
    "Travel insurance with high-altitude climbing and helicopter-evacuation cover (mandatory)",
    "Extra nights or summit-window contingency days due to weather",
    "Anything not mentioned under inclusions",
]

PACKAGES = []

# ════════════════════════════════════════════════════════════════════════
#  1. Dagala Thousand Lakes Trek — Bhutan, 6D/5N, Moderate
# ════════════════════════════════════════════════════════════════════════
DAGALA_HERO = "https://images.unsplash.com/photo-1602001011404-ec9c5e5c5e6f?w=1600&h=900&fit=crop"
PACKAGES.append(dict(
    title="Dagala Thousand Lakes Trek",
    slug="dagala-thousand-lakes-trek",
    destName="Bhutan", destSlug="bhutan",
    grade="Moderate", days=6, nights=5,
    price=159000, rating=4.8, reviews=24, group=(2, 12),
    hero=DAGALA_HERO,
    desc="A high-altitude trek on the Dagala range south of Thimphu, threading a string of clear glacial lakes — Utsho, Reli Tsho, Setho Tsho and more — across rolling alpine pasture. From the lake-dotted ridges an unbroken Himalayan wall stands on the horizon, from Jomolhari in the west to distant Kanchenjunga, making this one of Bhutan's finest yet least-crowded walks.",
    hl=["String of glacial lakes", "Jomolhari to Kanchenjunga panorama", "High alpine yak pastures", "Quiet, uncrowded trail", "Trout-filled mountain tarns", "Above Thimphu valley"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Thimphu to Gur — Trek to Gynekha", desc="Drive south of Thimphu to the trailhead at Gur, then walk down through blue-pine forest and terraced fields to the village of Gynekha on the river. An easy first day to find the legs before the climb begins.", acts=["Drive to trailhead", "Pine-forest descent", "Reach Gynekha village", "Riverside camp"], meals="Lunch, Dinner", acc="Camp at Gynekha", elev=2900, dist="6 km trek", hl="Onto the trail", img=DAGALA_HERO),
        dict(t="Gynekha to Gur (Lake Camp)", desc="The big climbing day — a steady ascent out of the valley onto the open Dagala pastures, gaining height past grazing yaks to the first high camp near the lakes. The Himalaya begin to show along the skyline.", acts=["Long ascent", "Yak pastures", "First lake views", "High camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Gur", elev=4100, dist="12 km trek", hl="Up onto the range", img=DAGALA_HERO),
        dict(t="Gur to Labatamba (Utsho Lake)", desc="Traverse the high meadows to the lake basin of Labatamba beside Utsho Lake, famous for its golden trout. Camp under the peaks with the lakes scattered across the plateau below — the heart of the trek.", acts=["High traverse", "Utsho Lake", "Trout lake basin", "Plateau camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Labatamba", elev=4300, dist="8 km trek", hl="The thousand lakes", img=DAGALA_HERO),
        dict(t="Lakes & Panorama Day", desc="A day to wander the lake plateau — Reli Tsho, Setho Tsho and Jagetsho — and climb a viewpoint ridge for the full sweep of the Bhutan Himalaya, from Jomolhari and Jichu Drake across to distant Kanchenjunga. Back to camp by the water.", acts=["Lake circuit walk", "Panorama ridge", "Jomolhari & Kanchenjunga views", "Photography"], meals="Breakfast, Lunch, Dinner", acc="Camp at Labatamba", elev=4500, dist="9 km round", hl="Himalayan skyline", img=DAGALA_HERO),
        dict(t="Labatamba to Panka", desc="Cross a couple of high saddles around 4,300–4,500m, watching for blue sheep and monal pheasant, then drop to the sheltered camp at Panka as the trail begins to bend back toward the valleys.", acts=["High saddle crossings", "Wildlife spotting", "Descend to Panka", "Sheltered camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Panka", elev=4000, dist="10 km trek", hl="Crossing the passes", img=DAGALA_HERO),
        dict(t="Panka to Talakha — Drive to Thimphu", desc="A long final descent through rhododendron and fir to Talakha Goemba above Thimphu, where the trek ends. Drive back down to the capital for a hot shower and a celebratory dinner.", acts=["Forest descent", "Talakha monastery", "Drive to Thimphu", "Trek ends"], meals="Breakfast, Lunch", acc="N/A - Departure", elev=3200, dist="14 km trek", hl="Down to Thimphu", img=DAGALA_HERO),
    ],
))

# ════════════════════════════════════════════════════════════════════════
#  2. Mount Elbrus Climb — Russia, 8D/7N, Challenging
# ════════════════════════════════════════════════════════════════════════
ELBRUS_HERO = "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=1600&h=900&fit=crop"
PACKAGES.append(dict(
    title="Mount Elbrus Climb",
    slug="mount-elbrus-climb",
    destName="Russia", destSlug="russia",
    grade="Challenging", days=8, nights=7,
    price=255000, rating=4.9, reviews=19, group=(2, 10),
    hero=ELBRUS_HERO,
    desc="An ascent of Mount Elbrus (5,642m) in the Caucasus — the highest summit in Europe and one of the Seven Summits. A non-technical but seriously high glaciated climb: you acclimatise with rotations up the south side, sleep in the famous barrel-huts, then make a long pre-dawn summit push across the saddle to the West Peak for a sunrise on the roof of Europe.",
    hl=["Highest summit in Europe — 5,642m", "One of the Seven Summits", "Barrel-hut high camp", "Glaciated non-technical climb", "Pre-dawn summit push", "Caucasus panorama"],
    incl=CLIMB_INCL, excl=CLIMB_EXCL,
    itin=[
        dict(t="Arrive Mineralnye Vody — Drive to Terskol", desc="Land at Mineralnye Vody and transfer up the Baksan valley to the mountain village of Terskol below Elbrus. Gear check, briefing and a first look at the peak.", acts=["Airport transfer", "Baksan valley drive", "Gear check", "Briefing"], meals="Dinner", acc="Hotel in Terskol", elev=2300, dist="190 km drive", hl="Into the Caucasus", img=ELBRUS_HERO),
        dict(t="Acclimatisation Hike — Cheget", desc="An acclimatisation day on the slopes of neighbouring Mount Cheget, climbing to a viewpoint for the classic profile of Elbrus's twin domes and learning the pace for the days ahead.", acts=["Cheget viewpoint hike", "Elbrus views", "Acclimatisation", "Pace practice"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Terskol", elev=3000, dist="8 km hike", hl="First height gain", img=ELBRUS_HERO),
        dict(t="Cable-car to the Barrels — Snow School", desc="Ride the cable-car and chair-lift to the Garabashi 'barrels' at 3,800m, the high camp. Move in, then a snow-school afternoon on the glacier: crampons, ice-axe self-arrest, roped travel and rest-step technique.", acts=["Lift to the barrels", "Move into high camp", "Crampon & ice-axe school", "Self-arrest practice"], meals="Breakfast, Lunch, Dinner", acc="Barrel-huts at Garabashi", elev=3800, hl="Reach high camp", img=ELBRUS_HERO),
        dict(t="Rotation to Pastukhov Rocks", desc="The key acclimatisation climb — ascend the glacier to the Pastukhov Rocks around 4,700m, tag the height, then descend to the barrels to sleep low. Climb high, sleep low.", acts=["Glacier ascent", "Pastukhov Rocks", "Tag 4,700m", "Descend to barrels"], meals="Breakfast, Lunch, Dinner", acc="Barrel-huts at Garabashi", elev=4700, hl="Climb high, sleep low", img=ELBRUS_HERO),
        dict(t="Rest & Prepare at the Barrels", desc="A deliberate rest day at high camp to recover and hydrate, with a final kit check and weather review. An early dinner and bed before the alpine start — summit day is long.", acts=["Rest & hydrate", "Final kit check", "Weather review", "Early night"], meals="Breakfast, Lunch, Dinner", acc="Barrel-huts at Garabashi", elev=3800, hl="Rest before the summit", img=ELBRUS_HERO),
        dict(t="Summit Day — West Peak (5,642m)", desc="A pre-dawn start, often with a snowcat lift to the Pastukhov Rocks to save energy, then a long climb across the saddle between the two peaks and up the final slope to the West Summit at 5,642m — the roof of Europe — before the long descent to the barrels.", acts=["Alpine start", "Cross the saddle", "Summit West Peak 5,642m", "Long descent to camp"], meals="Breakfast, Lunch, Dinner", acc="Barrel-huts at Garabashi", elev=5642, hl="Summit of Europe", img=ELBRUS_HERO),
        dict(t="Contingency / Descend to Terskol", desc="A summit-window contingency day held in reserve for weather; if the summit is already in the bag, descend by lift to Terskol for a hot shower and a celebration dinner in the valley.", acts=["Weather contingency", "Descend by lift", "Return to Terskol", "Celebration dinner"], meals="Breakfast, Dinner", acc="Hotel in Terskol", elev=2300, hl="Back in the valley", img=ELBRUS_HERO),
        dict(t="Drive to Mineralnye Vody — Depart", desc="After breakfast, transfer down the Baksan valley to Mineralnye Vody for your onward flight, Europe's highest point behind you.", acts=["Valley transfer", "Airport drop", "Departure"], meals="Breakfast", acc="N/A - Departure", elev=300, dist="190 km drive", hl="Farewell to the Caucasus", img=ELBRUS_HERO),
    ],
))


# ── render & insert ────────────────────────────────────────────────────────
slugs = [p["slug"] for p in PACKAGES]
assert len(slugs) == len(set(slugs)), "duplicate slug among new packages"

block = "\n".join(pkg_ts(p) for p in PACKAGES) + "\n"

path = os.path.join("src", "data", "packages.ts")
with io.open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Guard against re-running and double-inserting.
existing = "".join(lines)
for s in slugs:
    if f'slug: "{s}"' in existing:
        raise SystemExit(
            f"Package slug '{s}' already present in packages.ts — aborting to "
            f"avoid duplicate insert. Revert your edit before re-running."
        )

# Find the sole top-level array close: the first line that is exactly "]".
close_idx = None
for i, ln in enumerate(lines):
    if ln.rstrip("\n") == "]":
        close_idx = i
        break
assert close_idx is not None, "packages array close not found"

new_lines = lines[:close_idx] + [block] + lines[close_idx:]
with io.open(path, "w", encoding="utf-8", newline="\n") as f:
    f.writelines(new_lines)

print(
    f"Inserted {len(PACKAGES)} international adventure packages before line "
    f"{close_idx + 1}. New file lines: {len(new_lines)}."
)
print("Slugs:")
for s in slugs:
    print(f"  - {s}")
