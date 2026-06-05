"""Add ~28 India Himalayan / Northeast adventure trips (rafting expeditions and
graded treks, inspired by specialist-operator routes) into the Adventure
category of src/data/packages.ts.

We write our OWN concise day-wise itineraries (real stages + elevation in metres
for the altitude chart) — no third-party wording is copied. Every package carries
the agreed transparencyNote and indicative per-person pricing.

Pattern mirrors scripts/add_japan_packages.py: build TS-literal package objects
and insert them before the sole top-level `]` that closes the `allPackages`
array. The file now does `const allPackages = [...]` then
`export const packages = allPackages.filter(...)`.

NOTE on difficulty: the Package.difficulty union is only
"Easy" | "Moderate" | "Challenging" (no "Difficult"), so grade "Difficult" is
mapped to "Challenging" to keep TS strict compiling. The hardest grades are still
conveyed in copy/highlights.
"""
import json, io, os

# ── shared transparency note (verbatim, on every package) ──────────────────
TRANSP = (
    "Indicative itinerary and pricing — our specialist adventure-operator "
    "partnership is being finalised; exact departures, grades and rates "
    "confirmed on enquiry."
)

# ── region hero / day images that already exist in /public/images/generated ─
IMG = {
    "ladakh": "/images/generated/leh-ladakh-hero.webp",
    "ladakh_khardung": "/images/generated/ladakh-day-5-khardung-la.webp",
    "ladakh_road": "/images/generated/ultimate-ladakh-road-trip.webp",
    "uk": "/images/generated/uttarakhand-hero.webp",
    "uk_rishikesh": "/images/generated/uttarakhand-day-2-rishikesh.webp",
    "uk_raft": "/images/generated/rishikesh-rafting.webp",
    "uk_gangotri": "/images/generated/gangotri-source-ganges.webp",
    "uk_tehri": "/images/generated/tehri-lake.webp",
    "assam": "/images/generated/assam-hero.webp",
    "arunachal": "/images/generated/arunachal-pradesh-hero.webp",
    "ne_river": "/images/generated/northeast-day-7-dawki-river.webp",
}

# ── destination map (only destinations that EXIST in destinations.ts) ───────
DEST = {
    "uttarakhand": ("Uttarakhand", "uttarakhand"),
    "leh-ladakh": ("Leh-Ladakh", "leh-ladakh"),
    "assam": ("Assam", "assam"),
    "arunachal-pradesh": ("Arunachal Pradesh", "arunachal-pradesh"),
}

# difficulty grade -> valid TS union value
GRADE = {
    "Easy": "Easy",
    "Moderate": "Moderate",
    "Challenging": "Challenging",
    "Difficult": "Challenging",  # union has no "Difficult"
}


def m(elev):
    """Format an elevation integer (metres) as a string like '3,500m'."""
    if elev is None:
        return None
    return f"{elev:,}m"


def day_ts(d, idx, hero):
    """Render one PackageItineraryDay TS literal. `d` is a dict with keys:
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
    """Render one Package TS literal from a dict `p`."""
    dn, ds = DEST[p["dest"]]
    hero = p["hero"]
    gallery = p.get("gallery") or [hero, hero, hero, hero]
    diff = GRADE[p["grade"]]
    days = p["itin"]
    L = []
    L.append("  {")
    L.append(f"    title: {json.dumps(p['title'])},")
    L.append(f"    slug: {json.dumps(p['slug'])},")
    L.append(f"    destinationName: {json.dumps(dn)},")
    L.append(f"    destinationSlug: {json.dumps(ds)},")
    L.append('    category: "adventure",')
    L.append(f"    description:\n      {json.dumps(p['desc'])},")
    L.append(f"    heroImage: {json.dumps(hero)},")
    L.append(f"    images: {json.dumps(gallery)},")
    L.append(
        f"    duration: {{ days: {p['days']}, nights: {p['nights']} }},"
    )
    L.append(f"    price: {p['price']},")
    L.append(f"    difficulty: {json.dumps(diff)},")
    gmin, gmax = p.get("group", (2, 12))
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


# ── shared inclusion / exclusion sets ──────────────────────────────────────
RAFT_INCL = [
    "Professional river guides and safety kayakers",
    "All rafting gear — self-bailing rafts, wetsuits, helmets, life jackets, paddles",
    "Riverside tented camping with sleeping bags and mats",
    "All meals on the river (camp kitchen)",
    "Group safety, throw-bags and first-aid equipment",
    "Permits and river-running fees as applicable",
]
RAFT_EXCL = [
    "Travel to and from the put-in / take-out point",
    "Sleeping-bag liner and personal river clothing",
    "Personal expenses, tips and gratuities",
    "Travel insurance (mandatory for white-water trips)",
    "Anything not mentioned under inclusions",
    "Costs arising from weather, road blocks or flow changes beyond our control",
]
TREK_INCL = [
    "Experienced trek leader and certified mountain guides",
    "Camping equipment — tents, sleeping bags, mats, dining and toilet tents",
    "All meals on trek (breakfast, lunch, dinner) plus tea/snacks",
    "Mules / porters for common loads and kitchen",
    "Forest, sanctuary and trekking permits",
    "First-aid kit, oximeter and emergency evacuation coordination",
]
TREK_EXCL = [
    "Travel to and from the road-head",
    "Personal trekking gear, clothing and footwear",
    "Personal porter for individual backpack (on request)",
    "Personal expenses, tips and gratuities",
    "Travel insurance (strongly recommended)",
    "Anything not mentioned under inclusions",
]

PACKAGES = []

# ════════════════════════════════════════════════════════════════════════
#  RAFTING EXPEDITIONS (8)
# ════════════════════════════════════════════════════════════════════════

# 1. Zanskar River Rafting Expedition — Leh-Ladakh, ~7D, Difficult
PACKAGES.append(dict(
    title="Zanskar River Rafting Expedition",
    slug="zanskar-river-rafting-expedition",
    dest="leh-ladakh", grade="Difficult", days=7, nights=6,
    price=68000, rating=4.9, reviews=37, group=(6, 16),
    hero=IMG["ladakh"], gallery=[IMG["ladakh"], IMG["ladakh_road"], IMG["ladakh_khardung"], IMG["ne_river"]],
    desc="A self-supported white-water expedition through the Zanskar Gorge — one of the deepest river canyons on earth. From Leh you acclimatise, drive over high passes to the put-in, then run committing Grade III-IV rapids walled in by 600-metre cliffs all the way to the Indus confluence at Nimmu.",
    hl=["Deepest gorge in Ladakh", "Grade III-IV white water", "Remote canyon camping", "Padum to Nimmu", "Indus-Zanskar confluence", "High-altitude expedition"],
    incl=RAFT_INCL, excl=RAFT_EXCL,
    itin=[
        dict(t="Arrive Leh — Acclimatise", desc="Land at Leh and rest at 3,500m. The river runs high and cold; today is for hydration and short walks only — acclimatisation is non-negotiable before a high-altitude expedition.", acts=["Airport transfer", "Rest & hydrate", "Leh bazaar walk"], meals="Dinner", acc="Hotel in Leh", elev=3500, hl="First day at altitude", img=IMG["ladakh"]),
        dict(t="Leh — River Briefing & Gear Check", desc="A second acclimatisation day with a full safety briefing, paddle drills on flat water near Leh, swim tests and equipment fitting. Guides cover self-rescue, signals and the line through the big rapids.", acts=["Safety briefing", "Paddle drills", "Swim test", "Gear fitting"], meals="Breakfast, Dinner", acc="Hotel in Leh", elev=3500, hl="Expedition briefing", img=IMG["ladakh_road"]),
        dict(t="Drive Leh to Chilling — Put-in", desc="Drive up the Indus and over to the river road to Chilling, the launch point. Rig the rafts, run the first read-and-run rapids and make the opening canyon camp on a sandbar deep in the gorge.", acts=["Drive to Chilling", "Rig rafts", "First rapids", "Canyon camp"], meals="Breakfast, Lunch, Dinner", acc="Riverside camp", elev=3300, dist="65 km drive", hl="Launch into the gorge", img=IMG["ne_river"]),
        dict(t="The Grand Canyon of Zanskar", desc="The crux day — continuous Grade III-IV water between sheer walls where the canyon narrows to a slot. Big-volume waves, tight lines and no road for miles. Camp on a remote beach beneath vertical rock.", acts=["Grade III-IV rapids", "Slot canyon", "Scout & run", "Wilderness camp"], meals="Breakfast, Lunch, Dinner", acc="Riverside camp", elev=3150, dist="35 km on river", hl="Heart of the gorge", img=IMG["ladakh_khardung"]),
        dict(t="Through the Lower Gorge", desc="More committing white water as the Zanskar carves toward the Indus. Read-and-run rapids, towering side-canyons and the occasional ibex on the cliffs above. Final river camp near Nimmu.", acts=["Lower gorge rapids", "Side-canyon views", "Wildlife spotting", "River camp"], meals="Breakfast, Lunch, Dinner", acc="Riverside camp", elev=3050, dist="30 km on river", hl="Lower Zanskar gorge", img=IMG["ne_river"]),
        dict(t="Confluence at Nimmu — Take-out", desc="Run the final rapids to the dramatic Indus-Zanskar confluence at Nimmu, where the green and brown rivers meet. De-rig, celebrate the expedition and drive back to Leh.", acts=["Final rapids", "Indus-Zanskar confluence", "De-rig", "Drive to Leh"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Leh", elev=3500, dist="40 km drive", hl="Sangam take-out", img=IMG["ladakh_road"]),
        dict(t="Depart Leh", desc="After breakfast, transfer to the airport for your onward flight with the canyon still echoing in your ears.", acts=["Airport transfer", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Ladakh", img=IMG["ladakh"]),
    ],
))

# 2. Brahmaputra River Rafting — Assam, ~7D, Challenging
PACKAGES.append(dict(
    title="Brahmaputra River Rafting Expedition",
    slug="brahmaputra-river-rafting-expedition",
    dest="assam", grade="Challenging", days=7, nights=6,
    price=58000, rating=4.8, reviews=29, group=(6, 18),
    hero=IMG["assam"], gallery=[IMG["assam"], IMG["ne_river"], IMG["arunachal"], IMG["assam"]],
    desc="A big-water wilderness journey on the upper Brahmaputra (the Siang/Dihang) as it bursts out of the Eastern Himalaya into Assam. Huge volume, read-and-run rapids and nights on vast white sandbars, with birdlife and tribal villages along the banks.",
    hl=["Big-volume Himalayan river", "Read-and-run rapids", "Vast sandbar camps", "Eastern Himalaya wilderness", "River birdlife", "Tribal river villages"],
    incl=RAFT_INCL, excl=RAFT_EXCL,
    itin=[
        dict(t="Arrive Dibrugarh — Drive to Pasighat Gate", desc="Meet at Dibrugarh in upper Assam and drive to the river base near the Arunachal foothills where the Siang becomes the Brahmaputra. Briefing and gear check by the water.", acts=["Meet at Dibrugarh", "Drive to river base", "Safety briefing"], meals="Dinner", acc="Riverside lodge / camp", elev=150, dist="110 km drive", hl="Reach the great river", img=IMG["assam"]),
        dict(t="Put-in — First Big Water", desc="Rig the rafts and launch onto the broad, powerful river. The opening section eases you into big-volume waves and boils. Make camp on an enormous mid-river sandbar under the stars.", acts=["Rig rafts", "First rapids", "Big-volume waves", "Sandbar camp"], meals="Breakfast, Lunch, Dinner", acc="Sandbar camp", elev=140, dist="25 km on river", hl="Onto the Brahmaputra", img=IMG["ne_river"]),
        dict(t="The Powerhouse Rapids", desc="The river funnels through its strongest section — surging Grade III-IV waves, whirlpools and huge hydraulics demanding crisp paddling. Eddy out below each rapid before the next sandbar camp.", acts=["Grade III-IV rapids", "Whirlpools", "Crew paddling", "River camp"], meals="Breakfast, Lunch, Dinner", acc="Sandbar camp", elev=130, dist="30 km on river", hl="Biggest water of the trip", img=IMG["arunachal"]),
        dict(t="Braided Channels & Birdlife", desc="The Brahmaputra splits into a maze of braided channels. Easier water lets you drift, swim and watch river terns, fish eagles and the occasional Gangetic dolphin. Quiet wilderness camp.", acts=["Braided channels", "Drift & swim", "Birdwatching", "Wilderness camp"], meals="Breakfast, Lunch, Dinner", acc="Sandbar camp", elev=120, dist="35 km on river", hl="Channels & dolphins", img=IMG["ne_river"]),
        dict(t="Riverside Village Visit", desc="Run the morning rapids then pull in near an Adi / Mishing riverside village to meet the community, see bamboo stilt houses and weaving. Afternoon paddle to the next beach camp.", acts=["Morning rapids", "Village visit", "Local culture", "Beach camp"], meals="Breakfast, Lunch, Dinner", acc="Sandbar camp", elev=110, dist="28 km on river", hl="River-people culture", img=IMG["assam"]),
        dict(t="Final Run to Take-out", desc="A last stretch of open big water before the take-out near Dibrugarh. De-rig on the bank, then drive back for a celebratory dinner.", acts=["Final big water", "Take-out", "De-rig", "Drive to Dibrugarh"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Dibrugarh", elev=110, dist="30 km on river", hl="Expedition take-out", img=IMG["ne_river"]),
        dict(t="Depart Dibrugarh", desc="After breakfast, transfer to Dibrugarh airport for your onward journey.", acts=["Airport transfer", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Assam", img=IMG["assam"]),
    ],
))

# 3. Subansiri River Rafting — Arunachal Pradesh, ~6D, Challenging
PACKAGES.append(dict(
    title="Subansiri River Rafting Expedition",
    slug="subansiri-river-rafting-expedition",
    dest="arunachal-pradesh", grade="Challenging", days=6, nights=5,
    price=56000, rating=4.8, reviews=21, group=(6, 16),
    hero=IMG["arunachal"], gallery=[IMG["arunachal"], IMG["ne_river"], IMG["assam"], IMG["arunachal"]],
    desc="A remote multi-day descent of the Subansiri, the Brahmaputra's largest tributary, through pristine Eastern Himalayan forest in Arunachal Pradesh. Clean Grade III rapids, untouched jungle banks and a real expedition feel far from any road.",
    hl=["Largest Brahmaputra tributary", "Grade III rapids", "Pristine jungle gorge", "Hornbill country", "Remote forest camps", "True wilderness river"],
    incl=RAFT_INCL, excl=RAFT_EXCL,
    itin=[
        dict(t="Arrive North Lakhimpur — Drive to Put-in", desc="Meet at North Lakhimpur and drive into the Arunachal foothills to the Subansiri put-in. Briefing, gear fitting and an evening by the river.", acts=["Meet & drive", "Safety briefing", "Gear fitting"], meals="Dinner", acc="Riverside camp", elev=200, dist="90 km drive", hl="Into Arunachal", img=IMG["arunachal"]),
        dict(t="Launch into the Forest Gorge", desc="Rig and launch onto clear green water hemmed by dense subtropical forest. Warm-up Grade II-III rapids and the calls of hornbills overhead. First forest camp on a quiet beach.", acts=["Rig rafts", "Grade II-III rapids", "Forest gorge", "Beach camp"], meals="Breakfast, Lunch, Dinner", acc="Riverside camp", elev=190, dist="22 km on river", hl="Enter the gorge", img=IMG["ne_river"]),
        dict(t="The Best White Water", desc="The river steepens into its finest Grade III rapids — clean read-and-run drops between forested walls. Scout the bigger ones, run them, then a long quiet pool to the next camp.", acts=["Grade III rapids", "Scout & run", "Jungle banks", "River camp"], meals="Breakfast, Lunch, Dinner", acc="Riverside camp", elev=175, dist="26 km on river", hl="Best rapids of the trip", img=IMG["arunachal"]),
        dict(t="Wildlife & Side Streams", desc="An easier day to drift, fish and explore clear side-streams tumbling in from the hills. Watch for hornbills, otters and a wealth of forest birds. Camp on a broad sandbar.", acts=["Drift & fish", "Side-stream walk", "Birdwatching", "Sandbar camp"], meals="Breakfast, Lunch, Dinner", acc="Riverside camp", elev=165, dist="24 km on river", hl="Forest wildlife", img=IMG["ne_river"]),
        dict(t="Final Rapids to Take-out", desc="One last set of lively rapids as the gorge opens toward the plains, then the take-out. De-rig and drive back to North Lakhimpur for a farewell dinner.", acts=["Final rapids", "Take-out", "De-rig", "Drive back"], meals="Breakfast, Lunch, Dinner", acc="Hotel in North Lakhimpur", elev=160, dist="20 km on river", hl="Expedition take-out", img=IMG["arunachal"]),
        dict(t="Depart North Lakhimpur", desc="After breakfast, transfer for your onward journey (Dibrugarh / Lilabari air links).", acts=["Transfer", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to the Subansiri", img=IMG["assam"]),
    ],
))

# 4. Kali-Sarda Rafting — Uttarakhand, ~5D, Moderate
PACKAGES.append(dict(
    title="Kali-Sarda River Rafting",
    slug="kali-sarda-river-rafting",
    dest="uttarakhand", grade="Moderate", days=5, nights=4,
    price=24000, rating=4.7, reviews=34, group=(6, 18),
    hero=IMG["uk_raft"], gallery=[IMG["uk_raft"], IMG["uk_rishikesh"], IMG["uk"], IMG["ne_river"]],
    desc="A scenic multi-day raft on the Kali (Sarda) river along the Kumaon-Nepal border in eastern Uttarakhand. Friendly Grade II-III rapids, warm water, terraced-village banks and two countries either side of the boat make this a superb first expedition.",
    hl=["India-Nepal border river", "Grade II-III rapids", "Warm-water rafting", "Kumaon terraced villages", "Beautiful sandbar camps", "Great first expedition"],
    incl=RAFT_INCL, excl=RAFT_EXCL,
    itin=[
        dict(t="Arrive Pancheshwar", desc="Reach Pancheshwar at the Kali-Saryu confluence in the Kumaon hills. Riverside briefing, paddle basics and an evening by the water with Nepal on the far bank.", acts=["Drive to Pancheshwar", "Safety briefing", "Paddle basics"], meals="Dinner", acc="Riverside camp", elev=540, hl="Reach the border river", img=IMG["uk_raft"]),
        dict(t="Pancheshwar to Chuka", desc="Launch onto the Kali for the first paddling day — bouncy Grade II-III rapids between forested ridges, India on one bank and Nepal on the other. Camp on a wide white beach.", acts=["First rapids", "Grade II-III", "Border views", "Beach camp"], meals="Breakfast, Lunch, Dinner", acc="Riverside camp", elev=480, dist="18 km on river", hl="Two countries, one river", img=IMG["uk_rishikesh"]),
        dict(t="Chuka to Boom", desc="The river's most playful section — read-and-run waves, surf spots and clear side-streams to swim in. Pass terraced fields and hill villages before another sandbar camp.", acts=["Playful rapids", "Surf & swim", "Village views", "Sandbar camp"], meals="Breakfast, Lunch, Dinner", acc="Riverside camp", elev=420, dist="20 km on river", hl="Best rapids of the run", img=IMG["uk"]),
        dict(t="Boom to Take-out", desc="A final relaxed stretch of open water and gentle rapids to the take-out near Jauljibi. De-rig, then drive out of the valley to the road-head with a farewell lunch.", acts=["Final rapids", "Open water", "Take-out", "De-rig"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Champawat / road-head", elev=380, dist="22 km on river", hl="Expedition take-out", img=IMG["ne_river"]),
        dict(t="Departure", desc="After breakfast, drive to your onward connection (Tanakpur rail / Pithoragarh).", acts=["Drive out", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Kumaon", img=IMG["uk_raft"]),
    ],
))

# 5. Upper Alaknanda Rafting — Uttarakhand, ~4D, Challenging
PACKAGES.append(dict(
    title="Upper Alaknanda River Rafting",
    slug="upper-alaknanda-river-rafting",
    dest="uttarakhand", grade="Challenging", days=4, nights=3,
    price=22000, rating=4.8, reviews=27, group=(6, 16),
    hero=IMG["uk_raft"], gallery=[IMG["uk_raft"], IMG["uk_gangotri"], IMG["uk_rishikesh"], IMG["uk"]],
    desc="A punchy white-water run on the upper Alaknanda in the Garhwal Himalaya, fed by glacial melt from the high peaks above Joshimath. Cold, clear, continuous Grade III-IV rapids in a steep mountain gorge for paddlers wanting a step up from Rishikesh.",
    hl=["Glacier-fed Garhwal river", "Continuous Grade III-IV", "Steep mountain gorge", "Pilgrim-route scenery", "Cold clear water", "Step up from Rishikesh"],
    incl=RAFT_INCL, excl=RAFT_EXCL,
    itin=[
        dict(t="Arrive Karnaprayag", desc="Drive up the pilgrim road to Karnaprayag, a sacred river confluence in Garhwal. Briefing, gear check and an evening beside the rushing Alaknanda.", acts=["Drive to Karnaprayag", "Safety briefing", "Gear check"], meals="Dinner", acc="Riverside camp", elev=860, hl="Sacred confluence town", img=IMG["uk_gangotri"]),
        dict(t="Karnaprayag to Rudraprayag", desc="Launch into cold glacial water for the trip's biggest white water — back-to-back Grade III-IV rapids in a tight gorge, with snow peaks glimpsed above. Camp on a beach near Rudraprayag.", acts=["Grade III-IV rapids", "Glacial water", "Gorge run", "Beach camp"], meals="Breakfast, Lunch, Dinner", acc="Riverside camp", elev=620, dist="32 km on river", hl="Biggest rapids of the trip", img=IMG["uk_raft"]),
        dict(t="Rudraprayag to Srinagar Take-out", desc="A second day of strong rapids easing into bigger, friendlier waves as the valley widens toward Srinagar (Garhwal). Surf the wave-trains, then take out and de-rig.", acts=["Strong rapids", "Wave-trains", "Surf spots", "Take-out"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Srinagar (Garhwal)", elev=560, dist="34 km on river", hl="Big friendly waves", img=IMG["uk_rishikesh"]),
        dict(t="Departure", desc="After breakfast, drive down-valley to Rishikesh / Haridwar for your onward journey.", acts=["Drive out", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to the Alaknanda", img=IMG["uk"]),
    ],
))

# 6. Tons Thriller Rafting — Uttarakhand, ~5D, Difficult
PACKAGES.append(dict(
    title="Tons Thriller Rafting Expedition",
    slug="tons-thriller-rafting-expedition",
    dest="uttarakhand", grade="Difficult", days=5, nights=4,
    price=32000, rating=4.9, reviews=23, group=(6, 14),
    hero=IMG["uk_raft"], gallery=[IMG["uk_raft"], IMG["uk_rishikesh"], IMG["uk_gangotri"], IMG["uk"]],
    desc="The Tons is the most demanding raftable river in Garhwal — steep, cold and technical, draining the snows of Bandarpunch. This full Thriller run links the hardest Grade IV-V drops with continuous white water through a pine-forested gorge for experienced paddlers only.",
    hl=["Hardest river in Garhwal", "Grade IV-V rapids", "Technical steep creek", "Bandarpunch snowmelt", "Pine-gorge wilderness", "Experienced paddlers only"],
    incl=RAFT_INCL, excl=RAFT_EXCL,
    itin=[
        dict(t="Arrive Mori — Tons Base", desc="Drive up the Tons valley to Mori, deep in the Garhwal forests. Settle into the river camp, get fitted for gear and walk a section of bank to scout the rapids ahead.", acts=["Drive to Mori", "Camp set-up", "Bank scouting", "Gear fitting"], meals="Dinner", acc="Riverside camp", elev=1100, hl="Reach the Tons valley", img=IMG["uk_gangotri"]),
        dict(t="Safety Day & Lower Warm-up", desc="A dedicated skills day — swim tests, rope work, raft drills and self-rescue in moving water, then a warm-up run on the lower Tons to read the river before the steep stuff.", acts=["Swim & rope drills", "Self-rescue", "Warm-up run", "Skills practice"], meals="Breakfast, Lunch, Dinner", acc="Riverside camp", elev=1050, dist="10 km on river", hl="Expedition skills day", img=IMG["uk_raft"]),
        dict(t="The Thriller Section", desc="The crux — continuous, technical Grade IV-V rapids with names earned the hard way. Scout, set safety and run tight lines through boulder gardens and steep drops. An adrenaline day to remember.", acts=["Grade IV-V rapids", "Boulder gardens", "Set safety", "Technical lines"], meals="Breakfast, Lunch, Dinner", acc="Riverside camp", elev=950, dist="18 km on river", hl="The Thriller rapids", img=IMG["uk_rishikesh"]),
        dict(t="Lower Tons to Take-out", desc="A final big-water day as the Tons charges down to meet the Yamuna — fast wave-trains and a few last Grade IV punches before the take-out and de-rig.", acts=["Big-water rapids", "Wave-trains", "Take-out", "De-rig"], meals="Breakfast, Lunch, Dinner", acc="Hotel near Naugaon", elev=850, dist="20 km on river", hl="Charge to the Yamuna", img=IMG["uk"]),
        dict(t="Departure", desc="After breakfast, drive down to Dehradun / Mussoorie for your onward journey.", acts=["Drive out", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to the Tons", img=IMG["uk_raft"]),
    ],
))

# 7. Total Tons Rafting — Uttarakhand, ~3D, Moderate
PACKAGES.append(dict(
    title="Total Tons River Rafting",
    slug="total-tons-river-rafting",
    dest="uttarakhand", grade="Moderate", days=3, nights=2,
    price=15000, rating=4.7, reviews=41, group=(6, 18),
    hero=IMG["uk_raft"], gallery=[IMG["uk_raft"], IMG["uk_rishikesh"], IMG["uk"], IMG["uk_gangotri"]],
    desc="A short, sweet weekend run on the friendlier middle Tons in Garhwal — lively Grade II-III rapids, clear cold water and two nights of riverside camping in pine forest. The ideal taste of expedition rafting without the full Thriller commitment.",
    hl=["Weekend river trip", "Grade II-III rapids", "Pine-forest camps", "Clear Garhwal water", "Beginner-friendly expedition", "Riverside bonfire nights"],
    incl=RAFT_INCL, excl=RAFT_EXCL,
    itin=[
        dict(t="Arrive Mori — First Paddle", desc="Drive to the Tons camp at Mori, get briefed and fitted, then a short orientation paddle on easy rapids to learn the strokes and signals. Bonfire and dinner by the river.", acts=["Drive to Mori", "Safety briefing", "Orientation paddle", "Bonfire"], meals="Dinner", acc="Riverside camp", elev=1100, hl="First strokes on the Tons", img=IMG["uk_gangotri"]),
        dict(t="The Full Day Run", desc="The main event — a full day on the middle Tons running continuous Grade II-III wave-trains, surfing standing waves and swimming the calm pools. Back to camp for a riverside evening.", acts=["Full-day rafting", "Grade II-III rapids", "Wave surfing", "River swim"], meals="Breakfast, Lunch, Dinner", acc="Riverside camp", elev=1020, dist="22 km on river", hl="Best rapids of the run", img=IMG["uk_raft"]),
        dict(t="Final Rapids & Departure", desc="A short morning run to the take-out, then de-rig and drive down to Dehradun / Mussoorie for your onward journey.", acts=["Morning run", "Take-out", "Drive out"], meals="Breakfast", acc="N/A - Departure", hl="Final paddle", img=IMG["uk_rishikesh"]),
    ],
))

# 8. Lower Tons Rafting — Uttarakhand, ~2D, Easy
PACKAGES.append(dict(
    title="Lower Tons River Rafting",
    slug="lower-tons-river-rafting",
    dest="uttarakhand", grade="Easy", days=2, nights=1,
    price=9000, rating=4.7, reviews=52, group=(4, 20),
    hero=IMG["uk_raft"], gallery=[IMG["uk_raft"], IMG["uk_rishikesh"], IMG["uk"], IMG["uk_gangotri"]],
    desc="An easy overnight introduction to river running on the gentle lower Tons in Garhwal. Splashy Grade I-II rapids, calm swimming pools and one night of beach camping — perfect for families and first-timers wanting a soft landing into white water.",
    hl=["Family-friendly rafting", "Grade I-II rapids", "Overnight beach camp", "Safe warm pools", "First-timer expedition", "Garhwal pine valley"],
    incl=RAFT_INCL, excl=RAFT_EXCL,
    itin=[
        dict(t="Arrive — Afternoon Float & Camp", desc="Drive to the lower Tons camp, get briefed and kitted, then an easy afternoon float through gentle Grade I-II rapids and clear pools. Beach camp with a bonfire and dinner.", acts=["Drive in & briefing", "Afternoon float", "Grade I-II rapids", "Beach camp"], meals="Dinner", acc="Riverside camp", elev=850, hl="First float", img=IMG["uk_raft"]),
        dict(t="Morning Run & Departure", desc="A relaxed morning run with a few splashy rapids and a final swim, then take out, de-rig and drive down to Dehradun for your onward journey.", acts=["Morning run", "Final swim", "Take-out", "Drive out"], meals="Breakfast", acc="N/A - Departure", hl="Last splash", img=IMG["uk_rishikesh"]),
    ],
))

# ════════════════════════════════════════════════════════════════════════
#  UTTARAKHAND TREKS (13)
# ════════════════════════════════════════════════════════════════════════

# 9. Har Ki Dun — 7D, Moderate
PACKAGES.append(dict(
    title="Har Ki Dun Valley Trek",
    slug="har-ki-dun-valley-trek",
    dest="uttarakhand", grade="Moderate", days=7, nights=6,
    price=18500, rating=4.8, reviews=86, group=(4, 16),
    hero=IMG["uk"], gallery=[IMG["uk"], IMG["uk_gangotri"], IMG["uk_rishikesh"], IMG["uk_tehri"]],
    desc="A classic cradle-shaped valley trek in the Govind sanctuary of western Garhwal, walking through ancient ribbon villages and pine forest to the meadows of Har Ki Dun beneath the Swargarohini massif. Gentle gradients and deep Mahabharata folklore make it a perfect first Himalayan trek.",
    hl=["Cradle valley of the gods", "Swargarohini massif views", "Ancient Garhwali villages", "Govind sanctuary forest", "Riverside meadow camps", "Beginner-friendly Himalaya"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Dehradun to Sankri", desc="A long, scenic drive from Dehradun up the Tons valley to the trekking village of Sankri, the gateway to the Govind sanctuary. Meet the team and overnight in a guesthouse.", acts=["Scenic drive", "Tons valley", "Team meeting"], meals="Dinner", acc="Guesthouse in Sankri", elev=1950, dist="200 km drive", hl="Reach the trailhead village", img=IMG["uk"]),
        dict(t="Sankri to Taluka to Seema", desc="A short drive to Taluka, then the trek begins — an easy forest trail along the Supin river through walnut and chestnut groves to the hamlet of Seema (Osla). First night under canvas.", acts=["Drive to Taluka", "Riverside forest trail", "Osla village", "Camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Seema", elev=2560, dist="12 km trek", hl="First day on the trail", img=IMG["uk_rishikesh"]),
        dict(t="Seema to Har Ki Dun", desc="Climb gently through terraced fields and pine into the hanging valley of Har Ki Dun, the meadow widening to reveal the twin peaks of Swargarohini ahead. Camp in the cradle of the valley.", acts=["Terraced-field climb", "Enter Har Ki Dun", "Swargarohini views", "Meadow camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Har Ki Dun", elev=3560, dist="11 km trek", hl="Arrive in the valley", img=IMG["uk_gangotri"]),
        dict(t="Explore Har Ki Dun & Jaundhar Glacier viewpoint", desc="A day to explore the upper valley — walk toward the Jaundhar glacier snout, soak in the amphitheatre of peaks and visit the Maninda lake. Return to camp for sunset on Swargarohini.", acts=["Jaundhar glacier viewpoint", "Maninda lake", "Photography", "Sunset views"], meals="Breakfast, Lunch, Dinner", acc="Camp at Har Ki Dun", elev=3560, dist="8 km round", hl="Glacier amphitheatre", img=IMG["uk"]),
        dict(t="Har Ki Dun to Seema", desc="Retrace the trail down the valley to Seema, the descent easy on the legs and full of new views back toward the peaks. Riverside camp for the night.", acts=["Descend valley", "Forest trail", "Riverside camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Seema", elev=2560, dist="11 km trek", hl="Valley views in reverse", img=IMG["uk_rishikesh"]),
        dict(t="Seema to Taluka to Sankri", desc="Walk the final forest section back to Taluka and drive to Sankri. Celebrate the trek's end with the team over a warm dinner in the guesthouse.", acts=["Forest descent", "Drive to Sankri", "Celebration dinner"], meals="Breakfast, Lunch, Dinner", acc="Guesthouse in Sankri", elev=1950, dist="12 km trek", hl="Back to the trailhead", img=IMG["uk_tehri"]),
        dict(t="Sankri to Dehradun", desc="After breakfast, the long drive back down to Dehradun, arriving by evening for your onward journey.", acts=["Drive to Dehradun", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Garhwal", img=IMG["uk"]),
    ],
))

# 10. Kuari Pass — 6D, Moderate
PACKAGES.append(dict(
    title="Kuari Pass Trek",
    slug="kuari-pass-trek",
    dest="uttarakhand", grade="Moderate", days=6, nights=5,
    price=16500, rating=4.8, reviews=94, group=(4, 16),
    hero=IMG["uk"], gallery=[IMG["uk"], IMG["uk_gangotri"], IMG["uk_tehri"], IMG["uk_rishikesh"]],
    desc="The historic Curzon Trail to Kuari Pass offers one of the finest mountain panoramas in Garhwal — a front-row arc of Nanda Devi, Dronagiri, Kamet and the Chaukhamba massif. Oak and rhododendron forest, open ridges and a gentle high point make it a superb early-season classic.",
    hl=["Curzon Trail panorama", "Nanda Devi grandstand", "Rhododendron forests", "Open ridge walking", "Auli ski-meadow finish", "Great winter-snow trek"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Rishikesh to Joshimath", desc="Drive up the Alaknanda pilgrim road to Joshimath, gateway to the Niti valley, passing the sacred confluences of Devprayag and Karnaprayag. Overnight in a hotel.", acts=["Pilgrim-road drive", "River confluences", "Joshimath"], meals="Dinner", acc="Hotel in Joshimath", elev=1875, dist="255 km drive", hl="Reach the base town", img=IMG["uk_rishikesh"]),
        dict(t="Joshimath to Gulling via Dhak", desc="A short drive to the Dhak road-head, then the trek begins with a steady climb through villages and oak forest to the meadow camp at Gulling.", acts=["Drive to Dhak", "Village climb", "Oak forest", "Meadow camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Gulling", elev=2980, dist="6 km trek", hl="First day on the trail", img=IMG["uk"]),
        dict(t="Gulling to Khullara", desc="Climb through rhododendron and birch onto open meadows at Khullara, with the Chaukhamba and Nanda Ghunti peaks unfolding across the valley. Camp with a sweeping mountain view.", acts=["Rhododendron forest", "Open meadows", "Peak panorama", "Ridge camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Khullara", elev=3350, dist="8 km trek", hl="Meadow grandstand", img=IMG["uk_gangotri"]),
        dict(t="Summit Kuari Pass & back to Khullara", desc="An early start for the climb to Kuari Pass, where the full arc of the Garhwal giants — Nanda Devi, Dronagiri, Kamet, Chaukhamba — opens before you. Soak it in, then descend back to Khullara.", acts=["Climb to Kuari Pass", "Nanda Devi panorama", "Summit photos", "Descend to camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Khullara", elev=4264, dist="10 km round", hl="Kuari Pass at 4,264m", img=IMG["uk"]),
        dict(t="Khullara to Auli to Joshimath", desc="Descend through forest to the high ski-meadows of Auli, ride the cable car (or walk) down to Joshimath and celebrate the trek's end.", acts=["Forest descent", "Auli meadows", "Cable car", "Celebration"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Joshimath", elev=1875, dist="11 km trek", hl="Auli ski-meadows", img=IMG["uk_tehri"]),
        dict(t="Joshimath to Rishikesh", desc="After breakfast, the long drive down the Alaknanda valley to Rishikesh for your onward journey.", acts=["Drive to Rishikesh", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Garhwal", img=IMG["uk_rishikesh"]),
    ],
))

# 11. Pangarchulla Climb — 7D, Challenging
PACKAGES.append(dict(
    title="Pangarchulla Peak Climb",
    slug="pangarchulla-peak-climb",
    dest="uttarakhand", grade="Challenging", days=7, nights=6,
    price=24500, rating=4.8, reviews=48, group=(4, 12),
    hero=IMG["uk"], gallery=[IMG["uk"], IMG["uk_gangotri"], IMG["uk_tehri"], IMG["uk_rishikesh"]],
    desc="A demanding non-technical summit above the Kuari Pass ridge, topping out near 4,600m with a steep, boulder-and-snow final push. The reward is a 360-degree summit panorama of Nanda Devi, Kamet, Dronagiri and Trishul that few day-treks can match.",
    hl=["Non-technical summit climb", "360-degree peak panorama", "Steep snow & boulder finish", "Nanda Devi up close", "Alpine start summit day", "Step up from Kuari Pass"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Rishikesh to Joshimath", desc="Drive up the Alaknanda to Joshimath, base for the Pangarchulla climb, past the holy confluences of the pilgrim road. Overnight and gear check.", acts=["Pilgrim-road drive", "River confluences", "Gear check"], meals="Dinner", acc="Hotel in Joshimath", elev=1875, dist="255 km drive", hl="Reach the base town", img=IMG["uk_rishikesh"]),
        dict(t="Joshimath to Gulling via Dhak", desc="Drive to Dhak and trek up through villages and oak forest to the Gulling meadow camp, the same approach as the Kuari Trail.", acts=["Drive to Dhak", "Village climb", "Oak forest", "Meadow camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Gulling", elev=2980, dist="6 km trek", hl="First day on the trail", img=IMG["uk"]),
        dict(t="Gulling to Khullara", desc="Ascend through rhododendron and birch to the open Khullara meadows with their grand peak views — your high base for the summit attempt.", acts=["Rhododendron climb", "Open meadows", "Peak views", "Base camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Khullara", elev=3350, dist="8 km trek", hl="Summit base camp", img=IMG["uk_gangotri"]),
        dict(t="Summit Pangarchulla & return to Khullara", desc="A pre-dawn alpine start for the long summit push — open snow slopes give way to a steep boulder field and a final scramble to the top near 4,600m, with Nanda Devi filling the sky. Descend carefully back to Khullara.", acts=["Pre-dawn start", "Snow slopes", "Boulder scramble", "Summit panorama"], meals="Breakfast, Lunch, Dinner", acc="Camp at Khullara", elev=4575, dist="12 km round", hl="Pangarchulla summit", img=IMG["uk"]),
        dict(t="Buffer / Reserve Summit Day", desc="A built-in reserve day at Khullara to re-attempt the summit if weather closed it out, or to rest and explore the meadows and nearby viewpoints. Essential safety margin on a peak climb.", acts=["Weather buffer", "Rest or re-attempt", "Viewpoint walk"], meals="Breakfast, Lunch, Dinner", acc="Camp at Khullara", elev=3350, hl="Reserve summit window", img=IMG["uk_tehri"]),
        dict(t="Khullara to Auli to Joshimath", desc="Descend through forest to the Auli ski-meadows, take the cable car down to Joshimath and celebrate a hard summit earned.", acts=["Forest descent", "Auli meadows", "Cable car", "Celebration"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Joshimath", elev=1875, dist="11 km trek", hl="Auli finish", img=IMG["uk_rishikesh"]),
        dict(t="Joshimath to Rishikesh", desc="After breakfast, the long drive back down to Rishikesh for your onward journey.", acts=["Drive to Rishikesh", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Garhwal", img=IMG["uk"]),
    ],
))

# 12. Dodital Lake — 6D, Easy
PACKAGES.append(dict(
    title="Dodital Lake Trek",
    slug="dodital-lake-trek",
    dest="uttarakhand", grade="Easy", days=6, nights=5,
    price=14500, rating=4.7, reviews=63, group=(4, 18),
    hero=IMG["uk"], gallery=[IMG["uk"], IMG["uk_gangotri"], IMG["uk_rishikesh"], IMG["uk_tehri"]],
    desc="A gentle forest trek to the serene freshwater lake of Dodital, the legendary birthplace of Lord Ganesha, ringed by oak, deodar and rhododendron. Easy gradients, trout-filled waters and an optional climb to Darwa Top make it ideal for families and first-time trekkers.",
    hl=["Sacred freshwater lake", "Birthplace of Ganesha legend", "Deodar & oak forest", "Trout-filled waters", "Optional Darwa Top viewpoint", "Easy family trek"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Dehradun to Sangam Chatti", desc="Drive via Uttarkashi up the Assi Ganga valley to the trailhead hamlet of Sangam Chatti. Meet the team and overnight in a riverside guesthouse.", acts=["Drive via Uttarkashi", "Assi Ganga valley", "Team meeting"], meals="Dinner", acc="Guesthouse at Sangam Chatti", elev=1800, dist="200 km drive", hl="Reach the trailhead", img=IMG["uk"]),
        dict(t="Sangam Chatti to Bebra", desc="The trek begins along the bubbling Assi Ganga through dense forest to the meadow campsite at Bebra, an easy first day to find your rhythm.", acts=["Riverside trail", "Forest walk", "Meadow camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Bebra", elev=2350, dist="9 km trek", hl="First day on the trail", img=IMG["uk_rishikesh"]),
        dict(t="Bebra to Dodital", desc="Climb gently through deodar and rhododendron to the emerald lake of Dodital, ringed by forest and rich in trout. Camp on the peaceful shore.", acts=["Deodar forest climb", "Reach Dodital", "Lakeside camp", "Trout spotting"], meals="Breakfast, Lunch, Dinner", acc="Camp at Dodital", elev=3050, dist="7 km trek", hl="Arrive at the lake", img=IMG["uk_gangotri"]),
        dict(t="Dodital — Darwa Top excursion", desc="An optional acclimatising climb to Darwa Top for a sweeping view of the Bandarpunch and Gangotri ranges, then back down to relax by the lake.", acts=["Climb to Darwa Top", "Bandarpunch views", "Lakeside rest"], meals="Breakfast, Lunch, Dinner", acc="Camp at Dodital", elev=4150, dist="8 km round", hl="Darwa Top panorama", img=IMG["uk"]),
        dict(t="Dodital to Sangam Chatti", desc="A long, gentle descent all the way back down the forested valley to Sangam Chatti, then a celebratory dinner at the guesthouse.", acts=["Forest descent", "Riverside trail", "Celebration dinner"], meals="Breakfast, Lunch, Dinner", acc="Guesthouse at Sangam Chatti", elev=1800, dist="16 km trek", hl="Back to the trailhead", img=IMG["uk_tehri"]),
        dict(t="Sangam Chatti to Dehradun", desc="After breakfast, the drive back down to Dehradun for your onward journey.", acts=["Drive to Dehradun", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Garhwal", img=IMG["uk"]),
    ],
))

# 13. Bali Pass — 8D, Difficult
PACKAGES.append(dict(
    title="Bali Pass Trek",
    slug="bali-pass-trek",
    dest="uttarakhand", grade="Difficult", days=8, nights=7,
    price=29500, rating=4.8, reviews=39, group=(4, 12),
    hero=IMG["uk"], gallery=[IMG["uk"], IMG["uk_gangotri"], IMG["uk_tehri"], IMG["uk_rishikesh"]],
    desc="A demanding high crossing that links the Har Ki Dun valley with the sacred Yamunotri, topping the 4,950m Bali Pass beneath the Swargarohini and Bandarpunch peaks. A steep snow col, big altitude gain and remote camps make this one of Garhwal's most rewarding hard treks.",
    hl=["4,950m Himalayan pass", "Har Ki Dun to Yamunotri link", "Swargarohini up close", "Ruinsara Tal en route", "Steep snow col crossing", "Remote high camps"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Dehradun to Sankri", desc="The long drive up the Tons valley to Sankri, gateway to the Govind sanctuary. Meet the team and overnight in a guesthouse.", acts=["Tons valley drive", "Team meeting"], meals="Dinner", acc="Guesthouse in Sankri", elev=1950, dist="200 km drive", hl="Reach the trailhead village", img=IMG["uk"]),
        dict(t="Sankri to Taluka to Seema", desc="Drive to Taluka, then trek the riverside forest trail along the Supin to the hamlet of Seema (Osla) for the first camp.", acts=["Drive to Taluka", "Riverside forest", "Osla village", "Camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Seema", elev=2560, dist="12 km trek", hl="First day on the trail", img=IMG["uk_rishikesh"]),
        dict(t="Seema to Ruinsara Tal", desc="Branch off toward the Ruinsara valley, climbing through forest and meadow to the holy lake of Ruinsara Tal, framed by Black Peak and Swargarohini. Lakeside camp.", acts=["Ruinsara valley", "Meadow climb", "Reach Ruinsara Tal", "Lakeside camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Ruinsara Tal", elev=3600, dist="11 km trek", hl="Ruinsara Tal", img=IMG["uk_gangotri"]),
        dict(t="Ruinsara Tal to Odari", desc="Climb steadily up the valley toward the base of the pass, the landscape turning to rock and snow at the high camp of Odari beneath the Bali col.", acts=["Valley ascent", "Alpine terrain", "High camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Odari", elev=3900, dist="6 km trek", hl="Approach the pass", img=IMG["uk"]),
        dict(t="Odari to Bali Pass base", desc="A short but steep acclimatising day to the high base camp directly below Bali Pass, positioning for an early crossing. Rest and prepare gear for the col.", acts=["Steep climb", "High base camp", "Gear prep"], meals="Breakfast, Lunch, Dinner", acc="Camp below Bali Pass", elev=4350, dist="4 km trek", hl="Pass base camp", img=IMG["uk_tehri"]),
        dict(t="Cross Bali Pass to Lower Dhamni", desc="The big day — a pre-dawn start for the steep snow climb to the 4,950m Bali Pass, with Swargarohini and Bandarpunch towering close. A long, knee-testing descent toward Yamunotri brings you to camp at Lower Dhamni.", acts=["Pre-dawn start", "Snow col climb", "Cross Bali Pass", "Long descent"], meals="Breakfast, Lunch, Dinner", acc="Camp at Lower Dhamni", elev=4950, dist="13 km trek", hl="Bali Pass at 4,950m", img=IMG["uk_gangotri"]),
        dict(t="Lower Dhamni to Yamunotri to Janki Chatti", desc="Descend through forest to the sacred Yamunotri shrine, source-temple of the Yamuna, then on to the road-head at Janki Chatti. Celebrate a hard pass crossed.", acts=["Forest descent", "Yamunotri shrine", "Reach Janki Chatti", "Celebration"], meals="Breakfast, Lunch, Dinner", acc="Hotel at Janki Chatti", elev=2650, dist="11 km trek", hl="Yamunotri darshan", img=IMG["uk"]),
        dict(t="Janki Chatti to Dehradun", desc="After breakfast, the long drive down to Dehradun for your onward journey.", acts=["Drive to Dehradun", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Garhwal", img=IMG["uk_rishikesh"]),
    ],
))

# 14. Ruinsara Lake — 6D, Moderate
PACKAGES.append(dict(
    title="Ruinsara Lake Trek",
    slug="ruinsara-lake-trek",
    dest="uttarakhand", grade="Moderate", days=6, nights=5,
    price=17500, rating=4.7, reviews=51, group=(4, 16),
    hero=IMG["uk"], gallery=[IMG["uk"], IMG["uk_gangotri"], IMG["uk_rishikesh"], IMG["uk_tehri"]],
    desc="A beautiful meadow-and-forest trek in the Govind sanctuary to the sacred glacial lake of Ruinsara Tal, set in a wide valley beneath Black Peak (Kalanag) and Swargarohini. Less crowded than its neighbour Har Ki Dun, with superb wild camping by the water.",
    hl=["Sacred glacial lake", "Black Peak & Swargarohini", "Govind sanctuary meadows", "Supin river valley", "Quieter than Har Ki Dun", "Superb lakeside camp"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Dehradun to Sankri", desc="Drive up the Tons valley to the trekking village of Sankri. Meet the team and overnight in a guesthouse.", acts=["Tons valley drive", "Team meeting"], meals="Dinner", acc="Guesthouse in Sankri", elev=1950, dist="200 km drive", hl="Reach the trailhead village", img=IMG["uk"]),
        dict(t="Sankri to Taluka to Seema", desc="Drive to Taluka, then trek the riverside forest along the Supin to the hamlet of Seema (Osla) for the first camp.", acts=["Drive to Taluka", "Riverside forest", "Osla village", "Camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Seema", elev=2560, dist="12 km trek", hl="First day on the trail", img=IMG["uk_rishikesh"]),
        dict(t="Seema to Ruinsara Tal", desc="Follow the Ruinsara valley up through meadow and birch to the holy lake of Ruinsara Tal, ringed by snow peaks. Pitch camp by the tranquil water.", acts=["Ruinsara valley", "Meadow & birch", "Reach the lake", "Lakeside camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Ruinsara Tal", elev=3600, dist="11 km trek", hl="Arrive at the lake", img=IMG["uk_gangotri"]),
        dict(t="Explore Ruinsara & Kyarkoti meadows", desc="A day to wander the upper meadows toward Kyarkoti at the foot of Black Peak, soaking in the amphitheatre of summits before returning to the lake camp.", acts=["Kyarkoti meadows", "Black Peak base views", "Photography", "Lakeside rest"], meals="Breakfast, Lunch, Dinner", acc="Camp at Ruinsara Tal", elev=3850, dist="8 km round", hl="Kyarkoti amphitheatre", img=IMG["uk"]),
        dict(t="Ruinsara Tal to Seema", desc="Descend the valley back to Seema with long views down the Supin, an easy day on the legs. Riverside camp for the night.", acts=["Valley descent", "Supin views", "Riverside camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Seema", elev=2560, dist="11 km trek", hl="Valley in reverse", img=IMG["uk_tehri"]),
        dict(t="Seema to Taluka to Sankri to Dehradun", desc="Walk the final forest section to Taluka, drive to Sankri and continue down to Dehradun for your onward journey.", acts=["Forest descent", "Drive to Dehradun", "Departure"], meals="Breakfast, Lunch", acc="N/A - Departure", hl="Farewell to Garhwal", img=IMG["uk"]),
    ],
))

# 15. Baraadsar Lake — 8D, Difficult
PACKAGES.append(dict(
    title="Baraadsar Lake Trek",
    slug="baraadsar-lake-trek",
    dest="uttarakhand", grade="Difficult", days=8, nights=7,
    price=30500, rating=4.8, reviews=24, group=(4, 12),
    hero=IMG["uk"], gallery=[IMG["uk"], IMG["uk_gangotri"], IMG["uk_tehri"], IMG["uk_rishikesh"]],
    desc="A remote, high and little-trodden trek to the sacred Baraadsar (Brahmasar) lake at nearly 4,700m in the wild upper Tons region. Vast rolling alpine pastures, a high lake ringed by peaks and very few other trekkers make this a true off-beat expedition for the fit.",
    hl=["Off-beat high lake", "Nearly 4,700m alpine lake", "Vast Tons pastures", "Remote shepherd country", "Rarely trekked trail", "True wilderness solitude"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Dehradun to Sankri", desc="The long drive up the Tons valley to Sankri, the staging village for the upper Tons treks. Meet the team and overnight in a guesthouse.", acts=["Tons valley drive", "Team meeting"], meals="Dinner", acc="Guesthouse in Sankri", elev=1950, dist="200 km drive", hl="Reach the trailhead village", img=IMG["uk"]),
        dict(t="Sankri to Sandukphu / Forest camp", desc="Drive a short way to the road-head and trek up through thick pine and oak forest to the first high forest camp, gaining height steadily.", acts=["Drive to road-head", "Pine & oak forest", "Forest camp"], meals="Breakfast, Lunch, Dinner", acc="Forest camp", elev=2900, dist="9 km trek", hl="First day on the trail", img=IMG["uk_rishikesh"]),
        dict(t="Forest camp to Pukhrola meadows", desc="Climb out of the trees onto the first of the vast rolling meadows of the upper Tons, dotted with shepherd huts and grazing flocks. Camp in open pasture.", acts=["Treeline climb", "Rolling meadows", "Shepherd country", "Pasture camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Pukhrola", elev=3450, dist="8 km trek", hl="Onto the high pastures", img=IMG["uk_gangotri"]),
        dict(t="Pukhrola to Kyalse / high meadow", desc="A long day across undulating high meadows with wide Himalayan horizons, gaining altitude toward the lake basin. Camp at a remote high pasture.", acts=["High meadow traverse", "Wide horizons", "Altitude gain", "Remote camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Kyalse", elev=3950, dist="10 km trek", hl="Deep into the wilderness", img=IMG["uk_tehri"]),
        dict(t="To Baraadsar base", desc="A steady climb up to the high base camp below the lake, the terrain now rock and tundra. Rest and acclimatise for the lake day ahead.", acts=["Climb to base", "Rock & tundra", "Acclimatise"], meals="Breakfast, Lunch, Dinner", acc="Camp at Baraadsar base", elev=4250, dist="7 km trek", hl="Lake base camp", img=IMG["uk"]),
        dict(t="Baraadsar Lake & return to base", desc="An early push to the sacred Baraadsar lake at nearly 4,700m, cupped among the peaks with prayer offerings on its shore. Soak in the solitude, then descend back to base camp.", acts=["Climb to lake", "Sacred Baraadsar Tal", "Summit-day views", "Descend to base"], meals="Breakfast, Lunch, Dinner", acc="Camp at Baraadsar base", elev=4680, dist="9 km round", hl="Baraadsar Lake at 4,680m", img=IMG["uk_gangotri"]),
        dict(t="Base to Pukhrola to Forest camp", desc="A long descent back across the meadows and down into the forest, retracing the high pastures with the lake behind you. Forest camp for the last night.", acts=["Meadow descent", "Forest re-entry", "Forest camp"], meals="Breakfast, Lunch, Dinner", acc="Forest camp", elev=2900, dist="16 km trek", hl="Down from the heights", img=IMG["uk_rishikesh"]),
        dict(t="Forest camp to Sankri to Dehradun", desc="Walk the final forest section to the road-head, drive to Sankri and continue down to Dehradun for your onward journey.", acts=["Forest descent", "Drive to Dehradun", "Departure"], meals="Breakfast, Lunch", acc="N/A - Departure", hl="Farewell to the Tons", img=IMG["uk"]),
    ],
))

# 16. Dayara Bugyal — 5D, Easy
PACKAGES.append(dict(
    title="Dayara Bugyal Trek",
    slug="dayara-bugyal-trek",
    dest="uttarakhand", grade="Easy", days=5, nights=4,
    price=12500, rating=4.7, reviews=72, group=(4, 20),
    hero=IMG["uk"], gallery=[IMG["uk"], IMG["uk_tehri"], IMG["uk_gangotri"], IMG["uk_rishikesh"]],
    desc="One of India's most beautiful high meadows, Dayara Bugyal rolls for kilometres at 3,400m with a 360-degree skyline of Bandarpunch, Black Peak and the Gangotri group. Gentle gradients, oak-and-maple forest and superb winter snow make it a perfect short trek for all ages.",
    hl=["Vast rolling alpine meadow", "360-degree peak skyline", "Bandarpunch & Black Peak", "Oak & maple forest", "Brilliant winter snow", "Easy all-ages trek"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Dehradun to Raithal", desc="Drive via Uttarkashi to the pretty trailhead village of Raithal, perched above the Bhagirathi valley. Meet the team and overnight in a homestay.", acts=["Drive via Uttarkashi", "Bhagirathi valley", "Village homestay"], meals="Dinner", acc="Homestay in Raithal", elev=2200, dist="190 km drive", hl="Reach the trailhead", img=IMG["uk"]),
        dict(t="Raithal to Gui meadow", desc="The trek begins through dense oak and rhododendron forest, climbing steadily to the forest-edge meadow of Gui. First night under canvas.", acts=["Oak forest climb", "Rhododendron trail", "Meadow camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Gui", elev=3000, dist="6 km trek", hl="First day on the trail", img=IMG["uk_rishikesh"]),
        dict(t="Gui to Dayara Bugyal", desc="Climb out of the trees onto the immense rolling meadow of Dayara Bugyal, the peaks unfolding all around. Wander the grasslands and camp at the meadow's edge.", acts=["Enter Dayara Bugyal", "Rolling grasslands", "Peak panorama", "Meadow camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Dayara", elev=3400, dist="5 km trek", hl="The great meadow", img=IMG["uk_gangotri"]),
        dict(t="Dayara to Bakaria Top & descend to Raithal", desc="A short climb to Bakaria Top for the finest panorama of the trek, then a long, easy descent through the forest back to Raithal for a celebration dinner.", acts=["Bakaria Top viewpoint", "Best panorama", "Forest descent", "Celebration"], meals="Breakfast, Lunch, Dinner", acc="Homestay in Raithal", elev=3500, dist="11 km trek", hl="Bakaria Top views", img=IMG["uk_tehri"]),
        dict(t="Raithal to Dehradun", desc="After breakfast, the drive back down to Dehradun for your onward journey.", acts=["Drive to Dehradun", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Garhwal", img=IMG["uk"]),
    ],
))

# 17. Auden's Col — 12D, Difficult
PACKAGES.append(dict(
    title="Auden's Col Expedition Trek",
    slug="audens-col-expedition-trek",
    dest="uttarakhand", grade="Difficult", days=12, nights=11,
    price=68500, rating=4.9, reviews=18, group=(4, 10),
    hero=IMG["uk_gangotri"], gallery=[IMG["uk_gangotri"], IMG["uk"], IMG["uk_tehri"], IMG["uk_rishikesh"]],
    desc="One of the hardest and most coveted treks in the Indian Himalaya — a glaciated 5,490m col crossing between the Gangotri and Kedarnath valleys, linking Jogin and Gangotri-III peaks. Roped glacier travel, crevasse fields and remote high camps make this a serious technical expedition for experienced mountaineers.",
    hl=["5,490m glaciated col", "Gangotri to Kedarnath link", "Roped glacier travel", "Khatling glacier descent", "Jogin & Gangotri peaks", "Serious technical expedition"],
    incl=TREK_INCL + ["Technical glacier gear — ropes, harnesses, ice axes, crampons", "Mountaineering-qualified expedition leader"],
    excl=TREK_EXCL,
    itin=[
        dict(t="Dehradun to Gangotri", desc="The long drive up the Bhagirathi valley to the holy town of Gangotri, source-temple of the Ganga and start of the expedition. Overnight and gear check.", acts=["Bhagirathi valley drive", "Gangotri temple", "Gear check"], meals="Dinner", acc="Hotel in Gangotri", elev=3100, dist="240 km drive", hl="Reach the source town", img=IMG["uk_gangotri"]),
        dict(t="Acclimatisation & rigging day", desc="A vital acclimatisation day at Gangotri with a skills refresher — rope work, crampon and ice-axe technique and crevasse rescue drills on nearby ground before heading high.", acts=["Acclimatise", "Rope & crampon drills", "Crevasse rescue", "Skills refresher"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Gangotri", elev=3100, hl="Technical skills day", img=IMG["uk"]),
        dict(t="Gangotri to Nala Camp", desc="Trek south off the pilgrim trail into the Rudugaira valley, climbing through meadow and moraine to the first high camp at Nala.", acts=["Rudugaira valley", "Meadow & moraine", "High camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Nala", elev=3550, dist="9 km trek", hl="Into the Rudugaira valley", img=IMG["uk_rishikesh"]),
        dict(t="Nala to Rudugaira Base", desc="Continue up the valley beneath the Rudugaira and Jogin peaks to the base camp, the landscape now glacial moraine and rock. Camp with the col route in view.", acts=["Valley ascent", "Glacial moraine", "Base camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Rudugaira Base", elev=4100, dist="7 km trek", hl="Beneath Jogin peaks", img=IMG["uk_tehri"]),
        dict(t="Rudugaira Base to Auden's Col Base", desc="A steep climb over moraine and onto the lower glacier to the high col base camp, positioning directly below Auden's Col. Rest and prepare ropes for the crossing.", acts=["Steep moraine climb", "Lower glacier", "Col base camp", "Rope prep"], meals="Breakfast, Lunch, Dinner", acc="Camp at Col Base", elev=4700, dist="6 km trek", hl="Col base camp", img=IMG["uk_gangotri"]),
        dict(t="Acclimatise & load-ferry", desc="A buffer and acclimatisation day at the col base — a short roped ferry toward the glacier to stash loads and read the route, then rest for the big crossing.", acts=["Acclimatise", "Roped load-ferry", "Route reading", "Rest"], meals="Breakfast, Lunch, Dinner", acc="Camp at Col Base", elev=4700, hl="Prepare for the crossing", img=IMG["uk"]),
        dict(t="Cross Auden's Col to Khatling side", desc="The crux day — a pre-dawn alpine start, roped travel up the glacier through crevasse fields to the 5,490m Auden's Col, then a long, careful descent onto the Khatling glacier side to a high camp.", acts=["Pre-dawn alpine start", "Roped glacier travel", "Cross Auden's Col", "Khatling descent"], meals="Breakfast, Lunch, Dinner", acc="Camp on Khatling side", elev=5490, dist="10 km trek", hl="Auden's Col at 5,490m", img=IMG["uk_tehri"]),
        dict(t="Khatling glacier to Kachni Khal", desc="Descend the rubble-strewn Khatling glacier and its lateral moraine, picking a careful line down to the meadow camp at Kachni Khal below the ice.", acts=["Khatling glacier descent", "Lateral moraine", "Meadow camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Kachni Khal", elev=4200, dist="8 km trek", hl="Off the glacier", img=IMG["uk_rishikesh"]),
        dict(t="Kachni Khal to Masar Tal", desc="Trek down past the source meadows of the Bhilangna to the sacred lake of Masar Tal, the terrain softening to grass and stream. Lakeside camp.", acts=["Bhilangna meadows", "Reach Masar Tal", "Lakeside camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Masar Tal", elev=3600, dist="9 km trek", hl="Masar Tal", img=IMG["uk_gangotri"]),
        dict(t="Masar Tal to Gangi village", desc="A long descent through alpine meadow and forest to the remote Garhwali village of Gangi, the first habitation on this side of the col. Camp near the village.", acts=["Meadow & forest descent", "Reach Gangi village", "Village camp"], meals="Breakfast, Lunch, Dinner", acc="Camp near Gangi", elev=2600, dist="12 km trek", hl="First village in days", img=IMG["uk"]),
        dict(t="Gangi to Reeh to road-head, drive to Ghuttu", desc="The final forest walk down to the road-head at Reeh, then a short drive to Ghuttu. Celebrate the completion of one of Garhwal's toughest crossings.", acts=["Forest descent", "Reach road-head", "Drive to Ghuttu", "Celebration"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Ghuttu", elev=1550, dist="10 km trek", hl="Expedition complete", img=IMG["uk_tehri"]),
        dict(t="Ghuttu to Dehradun", desc="After breakfast, the long drive back to Dehradun for your onward journey.", acts=["Drive to Dehradun", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Garhwal", img=IMG["uk_rishikesh"]),
    ],
))

# 18. Kirti Glacier Gangotri — 7D, Challenging
PACKAGES.append(dict(
    title="Kirti Glacier Gangotri Trek",
    slug="kirti-glacier-gangotri-trek",
    dest="uttarakhand", grade="Challenging", days=7, nights=6,
    price=26500, rating=4.8, reviews=27, group=(4, 12),
    hero=IMG["uk_gangotri"], gallery=[IMG["uk_gangotri"], IMG["uk"], IMG["uk_tehri"], IMG["uk_rishikesh"]],
    desc="A wild, lesser-known glacier trek out of Gangotri to the snout of the Kirti glacier beneath the soaring Bhagirathi peaks and Kirti Stambh. A quieter alternative to Gaumukh-Tapovan, with raw moraine, roaring glacial streams and grand high-mountain scenery.",
    hl=["Off-beat glacier trek", "Bhagirathi peaks up close", "Kirti glacier snout", "Quieter than Tapovan", "Gangotri source country", "Raw moraine landscape"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Dehradun to Gangotri", desc="The long drive up the Bhagirathi valley to Gangotri, source-temple of the Ganga and start of the trek. Overnight and gear check.", acts=["Bhagirathi valley drive", "Gangotri temple", "Gear check"], meals="Dinner", acc="Hotel in Gangotri", elev=3100, dist="240 km drive", hl="Reach the source town", img=IMG["uk_gangotri"]),
        dict(t="Acclimatise at Gangotri", desc="A short acclimatisation walk around Gangotri and up toward the Pandava Gufa, with time to visit the temple and prepare for the climb to altitude.", acts=["Acclimatisation walk", "Pandava Gufa", "Temple visit"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Gangotri", elev=3100, hl="Settle in at altitude", img=IMG["uk"]),
        dict(t="Gangotri to Chirbasa", desc="Trek the Gaumukh trail along the Bhagirathi through birch forest to the riverside camp at Chirbasa, with the first views of the Bhagirathi peaks ahead.", acts=["Bhagirathi trail", "Birch forest", "Riverside camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Chirbasa", elev=3600, dist="9 km trek", hl="First peak views", img=IMG["uk_rishikesh"]),
        dict(t="Chirbasa to Bhojbasa, branch to Kirti", desc="Continue toward Bhojbasa, then branch off the pilgrim trail toward the Kirti glacier valley, leaving the crowds behind for a wild moraine camp beneath the peaks.", acts=["Bhojbasa", "Branch to Kirti valley", "Moraine camp"], meals="Breakfast, Lunch, Dinner", acc="Camp near Kirti valley", elev=3950, dist="8 km trek", hl="Into the Kirti valley", img=IMG["uk_tehri"]),
        dict(t="Kirti Glacier snout & return", desc="A demanding day over boulder and moraine to the snout of the Kirti glacier, directly beneath the Bhagirathi I-II-III peaks and Kirti Stambh — a raw, magnificent amphitheatre of ice and rock. Return to camp.", acts=["Boulder & moraine", "Kirti glacier snout", "Bhagirathi amphitheatre", "Return to camp"], meals="Breakfast, Lunch, Dinner", acc="Camp near Kirti valley", elev=4350, dist="9 km round", hl="Kirti glacier snout", img=IMG["uk_gangotri"]),
        dict(t="Kirti valley to Gangotri", desc="A long descent back along the Bhagirathi to Gangotri, retracing the trail with the peaks at your back. Celebrate the trek's end in town.", acts=["Long descent", "Bhagirathi trail", "Celebration"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Gangotri", elev=3100, dist="17 km trek", hl="Back to Gangotri", img=IMG["uk"]),
        dict(t="Gangotri to Dehradun", desc="After breakfast, the long drive back down to Dehradun for your onward journey.", acts=["Drive to Dehradun", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Garhwal", img=IMG["uk_rishikesh"]),
    ],
))

# 19. Bandarpunch Climb — 10D, Difficult
PACKAGES.append(dict(
    title="Bandarpunch Base & Climb Expedition",
    slug="bandarpunch-climb-expedition",
    dest="uttarakhand", grade="Difficult", days=10, nights=9,
    price=58500, rating=4.8, reviews=15, group=(4, 10),
    hero=IMG["uk_gangotri"], gallery=[IMG["uk_gangotri"], IMG["uk"], IMG["uk_tehri"], IMG["uk_rishikesh"]],
    desc="A high-altitude mountaineering expedition toward Bandarpunch (the 'monkey's tail'), one of Garhwal's great snow peaks above the Yamunotri valley. Glacier school, roped travel and a non-technical snow summit attempt near 5,900m make this a serious introduction to Himalayan climbing.",
    hl=["Garhwal snow-peak expedition", "Glacier school & rope work", "Snow summit attempt", "Hanuman Ganga valley", "High glacier camps", "Intro to Himalayan climbing"],
    incl=TREK_INCL + ["Technical climbing gear — ropes, harnesses, ice axes, crampons", "Mountaineering-qualified expedition leader"],
    excl=TREK_EXCL,
    itin=[
        dict(t="Dehradun to Sankri", desc="Drive up the Tons valley to Sankri, the staging point for the Bandarpunch approach. Meet the expedition team and overnight in a guesthouse.", acts=["Tons valley drive", "Team meeting"], meals="Dinner", acc="Guesthouse in Sankri", elev=1950, dist="200 km drive", hl="Reach the staging village", img=IMG["uk"]),
        dict(t="Sankri to Taluka to Seema", desc="Drive to Taluka and trek the riverside forest along the Supin to Seema (Osla) for the first camp on the approach.", acts=["Drive to Taluka", "Riverside forest", "Osla camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Seema", elev=2560, dist="12 km trek", hl="First day on the trail", img=IMG["uk_rishikesh"]),
        dict(t="Seema to Ruinsara Tal", desc="Climb through the Ruinsara valley to the sacred lake beneath Black Peak and Swargarohini, a beautiful staging camp on the way to the Bandarpunch glacier.", acts=["Ruinsara valley", "Reach the lake", "Lakeside camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Ruinsara Tal", elev=3600, dist="11 km trek", hl="Ruinsara Tal", img=IMG["uk_gangotri"]),
        dict(t="Ruinsara to Bandarpunch Base Camp", desc="Trek up the valley over meadow and moraine to the Bandarpunch base camp on the glacier's edge, with the snow peak rising ahead. Set up the expedition base.", acts=["Valley ascent", "Glacier-edge base", "Base set-up"], meals="Breakfast, Lunch, Dinner", acc="Base Camp", elev=4200, dist="8 km trek", hl="Expedition base camp", img=IMG["uk"]),
        dict(t="Glacier School at Base", desc="A full mountaineering skills day on the lower glacier — rope teams, crampon and ice-axe technique, jumar and crevasse rescue. Essential drills before going high.", acts=["Glacier school", "Rope teams", "Ice-axe technique", "Crevasse rescue"], meals="Breakfast, Lunch, Dinner", acc="Base Camp", elev=4200, hl="Glacier skills day", img=IMG["uk_tehri"]),
        dict(t="Base Camp to Camp 1", desc="A roped carry up the glacier through the first crevasse zone to Camp 1 on the snow, establishing the high camp and acclimatising as you climb.", acts=["Roped glacier climb", "Crevasse zone", "Establish Camp 1"], meals="Breakfast, Lunch, Dinner", acc="Camp 1 (glacier)", elev=4900, dist="6 km trek", hl="High camp on snow", img=IMG["uk_gangotri"]),
        dict(t="Acclimatise / load-ferry to summit camp", desc="An acclimatisation and load-ferry day toward the summit camp, stashing gear higher on the snow slopes and returning to Camp 1 to rest for the summit bid.", acts=["Acclimatise", "Load-ferry", "Snow slopes", "Rest"], meals="Breakfast, Lunch, Dinner", acc="Camp 1 (glacier)", elev=5300, hl="Prepare for summit", img=IMG["uk"]),
        dict(t="Summit attempt & return to Camp 1", desc="A pre-dawn alpine start for the non-technical snow summit push toward 5,900m on rope teams, weather permitting, with vast views over the Garhwal and Tons ranges. Descend carefully to Camp 1.", acts=["Pre-dawn start", "Snow summit push", "Rope teams", "Summit panorama"], meals="Breakfast, Lunch, Dinner", acc="Camp 1 (glacier)", elev=5870, dist="8 km round", hl="Summit attempt ~5,870m", img=IMG["uk_tehri"]),
        dict(t="Camp 1 to Base to Ruinsara", desc="Strike the high camp, descend the glacier off the mountain and continue down to the meadow camp at Ruinsara Tal, leaving the ice behind.", acts=["Strike high camp", "Glacier descent", "Ruinsara camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Ruinsara Tal", elev=3600, dist="12 km trek", hl="Off the mountain", img=IMG["uk_gangotri"]),
        dict(t="Ruinsara to Sankri to Dehradun", desc="The long descent to Taluka and Sankri, then drive down to Dehradun for your onward journey. (Final stretch by road.)", acts=["Long descent", "Drive to Dehradun", "Departure"], meals="Breakfast, Lunch", acc="N/A - Departure", hl="Farewell to Garhwal", img=IMG["uk_rishikesh"]),
    ],
))

# 20. Traill's Pass — 10D, Difficult
PACKAGES.append(dict(
    title="Traill's Pass Expedition Trek",
    slug="traills-pass-expedition-trek",
    dest="uttarakhand", grade="Difficult", days=10, nights=9,
    price=62500, rating=4.9, reviews=12, group=(4, 10),
    hero=IMG["uk"], gallery=[IMG["uk"], IMG["uk_gangotri"], IMG["uk_tehri"], IMG["uk_rishikesh"]],
    desc="A legendary and very demanding Kumaon crossing over the 5,312m Traill's Pass on the shoulder of Nanda Devi East, linking the Pindari and Milam glacier valleys. Steep ice, fixed-rope sections and a huge descent make this historic col one of the toughest treks in the Indian Himalaya.",
    hl=["Historic 5,312m pass", "Shoulder of Nanda Devi East", "Pindari to Milam link", "Fixed-rope ice sections", "Huge committing descent", "One of India's hardest treks"],
    incl=TREK_INCL + ["Technical gear — fixed ropes, harnesses, ice axes, crampons", "Mountaineering-qualified expedition leader"],
    excl=TREK_EXCL,
    itin=[
        dict(t="Kathgodam to Khati", desc="Drive deep into the Kumaon hills via Bageshwar to the road-head, then a short trek to the last village of Khati on the Pindari trail. Village camp.", acts=["Kumaon drive", "Trek to Khati", "Village camp"], meals="Dinner", acc="Camp at Khati", elev=2200, dist="Drive + 6 km trek", hl="Last village on the trail", img=IMG["uk"]),
        dict(t="Khati to Dwali", desc="Trek up the Pindar river through forest to the river junction of Dwali, gaining height steadily on a beautiful valley trail.", acts=["Pindar valley", "Forest trail", "River-junction camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Dwali", elev=2580, dist="11 km trek", hl="Up the Pindar valley", img=IMG["uk_rishikesh"]),
        dict(t="Dwali to Pindari Zero Point area", desc="Climb to the Pindari glacier zone, with the great wall of Nanda Kot and Nanda Devi East rising ahead. Camp near the glacier snout.", acts=["Pindari glacier zone", "Nanda Kot views", "Glacier camp"], meals="Breakfast, Lunch, Dinner", acc="Camp near Pindari", elev=3600, dist="10 km trek", hl="Pindari glacier", img=IMG["uk_gangotri"]),
        dict(t="Acclimatise & glacier school", desc="A vital acclimatisation and skills day below the pass — rope work, crampon and ice-axe technique, fixed-rope practice and crevasse rescue before the crossing.", acts=["Acclimatise", "Glacier school", "Fixed-rope practice", "Crevasse rescue"], meals="Breakfast, Lunch, Dinner", acc="Camp near Pindari", elev=3600, hl="Technical skills day", img=IMG["uk_tehri"]),
        dict(t="To Traill's Pass Base Camp", desc="A steep climb over moraine and snow to the high base camp directly below Traill's Pass on the Nanda Devi East shoulder. Rest and rig ropes for the crossing.", acts=["Steep moraine & snow", "Pass base camp", "Rope rigging"], meals="Breakfast, Lunch, Dinner", acc="Camp below Traill's Pass", elev=4700, dist="6 km trek", hl="Pass base camp", img=IMG["uk"]),
        dict(t="Reserve / buffer day", desc="A built-in weather buffer at the high base camp — essential margin on a serious col. Rest, hydrate and watch the conditions for a safe crossing window.", acts=["Weather buffer", "Rest & hydrate", "Monitor conditions"], meals="Breakfast, Lunch, Dinner", acc="Camp below Traill's Pass", elev=4700, hl="Safety buffer day", img=IMG["uk_gangotri"]),
        dict(t="Cross Traill's Pass to Milam side", desc="The crux — a pre-dawn start for the steep ice climb on fixed ropes to the 5,312m Traill's Pass beneath Nanda Devi East, followed by a long, exposed descent down the far side toward the Milam valley to a high camp.", acts=["Pre-dawn start", "Fixed-rope ice climb", "Cross Traill's Pass", "Long descent"], meals="Breakfast, Lunch, Dinner", acc="Camp on Milam side", elev=5312, dist="11 km trek", hl="Traill's Pass at 5,312m", img=IMG["uk_tehri"]),
        dict(t="Descend to Milam Glacier valley", desc="Continue the big descent over moraine and meadow into the Milam valley, the historic trade route to Tibet, reaching the deserted village of Milam. Camp by the ruins.", acts=["Moraine descent", "Milam valley", "Milam village ruins", "Valley camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Milam", elev=3450, dist="10 km trek", hl="Reach Milam", img=IMG["uk_rishikesh"]),
        dict(t="Milam to Martoli to Railkot", desc="Trek down the Gori Ganga valley past Martoli and its old temple to the meadow camp at Railkot, the worst of the descent behind you.", acts=["Gori Ganga valley", "Martoli temple", "Meadow camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Railkot", elev=3100, dist="13 km trek", hl="Down the Gori Ganga", img=IMG["uk"]),
        dict(t="Railkot to Munsiyari & onward", desc="The final trek down to the road-head at Lilam and drive to Munsiyari, where the expedition ends with grand views of the Panchachuli peaks before your onward journey.", acts=["Descend to road-head", "Drive to Munsiyari", "Panchachuli views", "Departure"], meals="Breakfast, Lunch", acc="N/A - Departure", hl="Expedition complete", img=IMG["uk_gangotri"]),
    ],
))

# 21. Panpatia Col — 10D, Difficult
PACKAGES.append(dict(
    title="Panpatia Col Expedition Trek",
    slug="panpatia-col-expedition-trek",
    dest="uttarakhand", grade="Difficult", days=10, nights=9,
    price=64500, rating=4.9, reviews=11, group=(4, 10),
    hero=IMG["uk_gangotri"], gallery=[IMG["uk_gangotri"], IMG["uk"], IMG["uk_tehri"], IMG["uk_rishikesh"]],
    desc="A rarely-completed glaciated crossing of the Panpatia col and snowfield linking Badrinath with Kedarnath — the high route pilgrims once believed connected the two shrines. Vast snowfields, crevassed glacier travel and remote camps make this one of Garhwal's most committing expedition treks.",
    hl=["Badrinath to Kedarnath link", "Vast Panpatia snowfield", "Crevassed glacier travel", "Parvati Tal en route", "Legendary pilgrim high route", "Committing remote expedition"],
    incl=TREK_INCL + ["Technical glacier gear — ropes, harnesses, ice axes, crampons", "Mountaineering-qualified expedition leader"],
    excl=TREK_EXCL,
    itin=[
        dict(t="Rishikesh to Badrinath", desc="The long drive up the Alaknanda pilgrim road to the holy town of Badrinath, start of the expedition. Overnight, temple darshan and gear check.", acts=["Pilgrim-road drive", "Badrinath temple", "Gear check"], meals="Dinner", acc="Hotel in Badrinath", elev=3300, dist="295 km drive", hl="Reach the shrine town", img=IMG["uk_gangotri"]),
        dict(t="Acclimatise & glacier school", desc="An acclimatisation and skills day near Badrinath — rope work, crampon and ice-axe technique and crevasse rescue drills before the glacier crossing.", acts=["Acclimatise", "Glacier school", "Crevasse rescue", "Skills refresher"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Badrinath", elev=3300, hl="Technical skills day", img=IMG["uk"]),
        dict(t="Badrinath to Khirao valley camp", desc="Trek off the pilgrim trail into the wild Khirao Ganga valley, climbing through meadow and forest to a riverside camp deep in the side-valley.", acts=["Khirao Ganga valley", "Meadow & forest", "Riverside camp"], meals="Breakfast, Lunch, Dinner", acc="Camp in Khirao valley", elev=3700, dist="9 km trek", hl="Into the Khirao valley", img=IMG["uk_rishikesh"]),
        dict(t="Khirao valley to Glacier Base", desc="Continue up the valley over moraine to the glacier base camp below the Panpatia snowfield, the route ahead a vast field of ice. Camp and prepare ropes.", acts=["Moraine climb", "Glacier base", "Rope prep"], meals="Breakfast, Lunch, Dinner", acc="Glacier Base Camp", elev=4300, dist="7 km trek", hl="Edge of the snowfield", img=IMG["uk_tehri"]),
        dict(t="Acclimatise / load-ferry onto snowfield", desc="A buffer and load-ferry day — a short roped foray onto the Panpatia snowfield to read the crevasse route and stash loads, then rest at base for the crossing.", acts=["Acclimatise", "Roped foray", "Route reading", "Rest"], meals="Breakfast, Lunch, Dinner", acc="Glacier Base Camp", elev=4300, hl="Prepare for the crossing", img=IMG["uk_gangotri"]),
        dict(t="Cross onto Panpatia Snowfield to Col Camp", desc="Rope up and climb onto the great Panpatia snowfield, threading crevasse fields across the ice to a high camp on the snow near the Panpatia col at around 5,200m.", acts=["Roped glacier travel", "Panpatia snowfield", "Crevasse fields", "Snow camp"], meals="Breakfast, Lunch, Dinner", acc="Snowfield Camp", elev=5200, dist="8 km trek", hl="Onto the great snowfield", img=IMG["uk"]),
        dict(t="Cross Panpatia Col to Parvati Tal", desc="The crux — cross the Panpatia col and descend the far glacier on rope teams, picking through crevasses down to the sacred high lake of Parvati Tal on the Kedarnath side.", acts=["Cross Panpatia Col", "Far-glacier descent", "Crevasse navigation", "Reach Parvati Tal"], meals="Breakfast, Lunch, Dinner", acc="Camp near Parvati Tal", elev=5350, dist="9 km trek", hl="Panpatia Col crossing", img=IMG["uk_tehri"]),
        dict(t="Parvati Tal to Madhyamaheshwar meadows", desc="Descend off the ice onto the green Madhyamaheshwar meadows, the relief of grass underfoot after days on snow. Meadow camp beneath the Chaukhamba massif.", acts=["Off the glacier", "Madhyamaheshwar meadows", "Meadow camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Madhyamaheshwar", elev=3500, dist="10 km trek", hl="Back to green meadows", img=IMG["uk_gangotri"]),
        dict(t="Madhyamaheshwar to Ransi village", desc="Trek down past the ancient Madhyamaheshwar temple through forest and terraced fields to the road-head village of Ransi. Celebrate a rare crossing completed.", acts=["Madhyamaheshwar temple", "Forest & fields", "Reach Ransi", "Celebration"], meals="Breakfast, Lunch, Dinner", acc="Hotel near Ransi / Ukhimath", elev=2000, dist="12 km trek", hl="Expedition complete", img=IMG["uk"]),
        dict(t="Ransi to Rishikesh", desc="After breakfast, the long drive down the Mandakini and Alaknanda valleys to Rishikesh for your onward journey.", acts=["Drive to Rishikesh", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Garhwal", img=IMG["uk_rishikesh"]),
    ],
))

# ════════════════════════════════════════════════════════════════════════
#  LEH-LADAKH TREKS (7)
# ════════════════════════════════════════════════════════════════════════

# 22. Markha Valley — 8D, Moderate
PACKAGES.append(dict(
    title="Markha Valley Trek",
    slug="markha-valley-trek",
    dest="leh-ladakh", grade="Moderate", days=8, nights=7,
    price=34500, rating=4.8, reviews=78, group=(4, 14),
    hero=IMG["ladakh"], gallery=[IMG["ladakh"], IMG["ladakh_road"], IMG["ladakh_khardung"], IMG["uk"]],
    desc="Ladakh's classic 'tea-house' trek through the Hemis National Park, following the Markha river past whitewashed villages, gompas and chortens beneath the Stok and Kang Yatse peaks, crossing two high passes — Ganda La and Kongmaru La (5,260m). A wonderful mix of culture and high mountain.",
    hl=["Classic Ladakh trek", "Hemis National Park", "Two high passes", "Kongmaru La 5,260m", "Markha homestay villages", "Kang Yatse backdrop"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Arrive Leh — Acclimatise", desc="Land at Leh and rest at 3,500m. A full acclimatisation day with hydration and gentle walks only — vital before trekking high in Ladakh.", acts=["Airport transfer", "Rest & hydrate", "Leh bazaar walk"], meals="Dinner", acc="Hotel in Leh", elev=3500, hl="First day at altitude", img=IMG["ladakh"]),
        dict(t="Leh — Acclimatisation & briefing", desc="A second acclimatisation day with a short hike to a nearby monastery and a full trek briefing, gear check and team introductions.", acts=["Acclimatisation hike", "Monastery visit", "Trek briefing"], meals="Breakfast, Dinner", acc="Hotel in Leh", elev=3500, hl="Prepare for the trail", img=IMG["ladakh_road"]),
        dict(t="Leh to Zingchen, trek to Rumbak", desc="Drive to the Zingchen road-head in Hemis NP and trek up the gorge to the Ladakhi village of Rumbak, keeping an eye out for blue sheep and ibex. First camp.", acts=["Drive to Zingchen", "Gorge trail", "Rumbak village", "Camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Rumbak", elev=3900, dist="10 km trek", hl="First day on the trail", img=IMG["ladakh_khardung"]),
        dict(t="Rumbak to Ganda La base to Skiu", desc="Climb to the Ganda La (4,900m) for grand views of the Stok range and Zanskar peaks, then descend through a dramatic gorge to the village of Skiu on the Markha river.", acts=["Cross Ganda La", "Stok range views", "Gorge descent", "Skiu village"], meals="Breakfast, Lunch, Dinner", acc="Camp at Skiu", elev=4900, dist="14 km trek", hl="Ganda La at 4,900m", img=IMG["ladakh"]),
        dict(t="Skiu to Markha village", desc="A long, gentle day up the Markha valley itself, fording streams and passing chortens, mani walls and the ruins of old forts to the village of Markha. Camp by the river.", acts=["Markha valley", "Stream crossings", "Mani walls", "Riverside camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Markha", elev=3800, dist="18 km trek", hl="Up the Markha valley", img=IMG["ladakh_road"]),
        dict(t="Markha to Thachungtse (Kang Yatse view)", desc="Climb gradually past Tahungtse with the great pyramid of Kang Yatse coming into view, the meadows opening out beneath the snows. High camp at Thachungtse.", acts=["Valley climb", "Kang Yatse views", "Open meadows", "High camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Thachungtse", elev=4250, dist="13 km trek", hl="Kang Yatse appears", img=IMG["ladakh_khardung"]),
        dict(t="Thachungtse to Kongmaru La to Chokdo", desc="The big day — climb to Nimaling pastures then over the Kongmaru La (5,260m), the trek's high point with a magnificent panorama, followed by a long gorge descent to Chokdo and drive to Leh.", acts=["Nimaling pastures", "Cross Kongmaru La", "Summit panorama", "Drive to Leh"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Leh", elev=5260, dist="16 km trek", hl="Kongmaru La at 5,260m", img=IMG["ladakh"]),
        dict(t="Depart Leh", desc="After breakfast, transfer to the airport for your onward flight.", acts=["Airport transfer", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Ladakh", img=IMG["ladakh_road"]),
    ],
))

# 23. Markha Valley Winter — 7D, Challenging
PACKAGES.append(dict(
    title="Markha Valley Winter Trek",
    slug="markha-valley-winter-trek",
    dest="leh-ladakh", grade="Challenging", days=7, nights=6,
    price=39500, rating=4.7, reviews=21, group=(4, 10),
    hero=IMG["ladakh"], gallery=[IMG["ladakh"], IMG["ladakh_khardung"], IMG["ladakh_road"], IMG["uk"]],
    desc="The Markha valley in deep winter — a frozen, silent and starkly beautiful version of Ladakh's classic trek, with sub-zero nights, snow-dusted villages and a real chance of spotting wildlife drawn lower by the cold. A tough cold-weather adventure for hardy, experienced trekkers.",
    hl=["Frozen winter Markha", "Sub-zero high camps", "Snow-dusted villages", "Winter wildlife chances", "Stark silent landscape", "Hardy cold-weather trek"],
    incl=TREK_INCL + ["Four-season tents and extreme-cold sleeping bags (rated to -20C)"],
    excl=TREK_EXCL,
    itin=[
        dict(t="Arrive Leh — Acclimatise (winter)", desc="Land at Leh in the heart of winter and rest at 3,500m. Acclimatisation is even more important in the cold — hydration, warmth and gentle walks only.", acts=["Airport transfer", "Rest & hydrate", "Cold-weather briefing"], meals="Dinner", acc="Hotel in Leh", elev=3500, hl="Winter arrival", img=IMG["ladakh"]),
        dict(t="Leh — Acclimatise & winter gear check", desc="A second acclimatisation day with a short hike and a thorough winter gear check — layering, four-season tents, extreme-cold bags and frostbite-prevention briefing.", acts=["Acclimatisation hike", "Winter gear check", "Safety briefing"], meals="Breakfast, Dinner", acc="Hotel in Leh", elev=3500, hl="Prepare for the cold", img=IMG["ladakh_khardung"]),
        dict(t="Leh to Zingchen, trek to Rumbak", desc="Drive to Zingchen and trek the snowy gorge up to Rumbak, the cold sharpening the silence. Settle into the first sub-zero camp.", acts=["Drive to Zingchen", "Snowy gorge", "Rumbak village", "Cold camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Rumbak", elev=3900, dist="10 km trek", hl="First day on the snow", img=IMG["ladakh_road"]),
        dict(t="Rumbak to Yurutse to Ganda La base", desc="A short but cold day climbing toward the Ganda La base past the lone house of Yurutse, scanning the slopes for blue sheep and the elusive snow leopard that winter brings lower.", acts=["Climb toward Ganda La", "Yurutse", "Wildlife scanning", "High cold camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Ganda La base", elev=4500, dist="8 km trek", hl="Snow-leopard country", img=IMG["ladakh"]),
        dict(t="Cross Ganda La to Skiu", desc="Climb the snowbound Ganda La (4,900m) with hard-won views over white peaks, then a careful descent through a frozen gorge to the village of Skiu on the Markha.", acts=["Cross snowy Ganda La", "White-peak views", "Frozen gorge", "Skiu village"], meals="Breakfast, Lunch, Dinner", acc="Camp at Skiu", elev=4900, dist="14 km trek", hl="Ganda La in winter", img=IMG["ladakh_khardung"]),
        dict(t="Skiu to Markha & back toward road", desc="Walk up the frozen Markha valley to Markha village, then begin the return, the river ice and snow-bound chortens making for a magical, demanding day. Drive back toward Leh from the road-head.", acts=["Frozen Markha valley", "Markha village", "Return trail", "Drive to Leh"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Leh", elev=3800, dist="16 km trek", hl="Frozen valley walk", img=IMG["ladakh_road"]),
        dict(t="Depart Leh", desc="After breakfast, transfer to the airport for your onward flight, leaving the winter silence behind.", acts=["Airport transfer", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to winter Ladakh", img=IMG["ladakh"]),
    ],
))

# 24. Chadar Frozen Zanskar — 9D, Difficult
PACKAGES.append(dict(
    title="Chadar Frozen Zanskar Trek",
    slug="chadar-frozen-zanskar-trek",
    dest="leh-ladakh", grade="Difficult", days=9, nights=8,
    price=52500, rating=4.9, reviews=46, group=(6, 14),
    hero=IMG["ladakh"], gallery=[IMG["ladakh"], IMG["ladakh_khardung"], IMG["ladakh_road"], IMG["uk"]],
    desc="The legendary Chadar — walking the frozen surface of the Zanskar river through a sheer ice canyon in the depth of a Ladakhi winter. Temperatures plunge far below zero, the ice shifts daily and you camp in caves along the gorge. A bucket-list expedition demanding serious cold-weather resolve.",
    hl=["Walk a frozen river", "Sheer ice canyon", "Sub -25C nights", "Cave camping", "Frozen waterfalls", "Bucket-list winter trek"],
    incl=TREK_INCL + ["Four-season tents and extreme-cold sleeping bags (rated to -30C)", "Insulated gumboots and ice-walking support"],
    excl=TREK_EXCL,
    itin=[
        dict(t="Arrive Leh — Acclimatise (deep winter)", desc="Land at Leh in deep winter and rest at 3,500m. Acclimatisation and warmth are critical before the Chadar; hydration and gentle walks only today.", acts=["Airport transfer", "Rest & hydrate", "Winter briefing"], meals="Dinner", acc="Hotel in Leh", elev=3500, hl="Deep-winter arrival", img=IMG["ladakh"]),
        dict(t="Leh acclimatisation & medical check", desc="A vital second day at Leh — a short acclimatisation walk plus a mandatory medical check (mandated for the Chadar) and a thorough briefing on ice-walking, layering and frostbite prevention.", acts=["Acclimatisation walk", "Medical check", "Ice-walking briefing"], meals="Breakfast, Dinner", acc="Hotel in Leh", elev=3500, hl="Mandatory acclimatisation", img=IMG["ladakh_road"]),
        dict(t="Leh to Shingra Koma — onto the ice", desc="Drive down to the Chilling road-head where the trek begins, stepping onto the frozen Zanskar for the first time. A short ice walk to the cave camp at Shingra Koma.", acts=["Drive to Chilling", "First steps on ice", "Frozen river", "Cave camp"], meals="Breakfast, Lunch, Dinner", acc="Cave camp at Shingra Koma", elev=3200, dist="10 km on ice", hl="Onto the Chadar", img=IMG["ladakh_khardung"]),
        dict(t="Shingra Koma to Tibb Cave", desc="A full day walking the ice through the deepening gorge, reading the surface for safe lines as frozen waterfalls hang from the walls. Camp in the legendary Tibb cave.", acts=["Ice-canyon walk", "Read the ice", "Frozen waterfalls", "Tibb cave camp"], meals="Breakfast, Lunch, Dinner", acc="Cave camp at Tibb", elev=3300, dist="14 km on ice", hl="Into the ice canyon", img=IMG["ladakh"]),
        dict(t="Tibb Cave to Nerak", desc="Continue up-river to Nerak, where a spectacular frozen waterfall plunges down the canyon wall — the iconic image of the Chadar. Camp near the village in the deep cold.", acts=["Ice walk to Nerak", "Frozen Nerak waterfall", "Canyon scenery", "Cold camp"], meals="Breakfast, Lunch, Dinner", acc="Camp / cave at Nerak", elev=3390, dist="13 km on ice", hl="Nerak frozen waterfall", img=IMG["ladakh_road"]),
        dict(t="Nerak to Tibb Cave (return)", desc="Turn around and retrace the Chadar back toward Tibb, the river ice changed by a day's freeze so that no two crossings are the same. Cave camp once more.", acts=["Return on the ice", "Changing surface", "Canyon walls", "Tibb cave camp"], meals="Breakfast, Lunch, Dinner", acc="Cave camp at Tibb", elev=3300, dist="13 km on ice", hl="The Chadar in reverse", img=IMG["ladakh_khardung"]),
        dict(t="Tibb Cave to Shingra Koma", desc="Another day on the frozen river back toward the road-head, savouring the last of the ice canyon and its sculpted forms. Final cave camp on the Chadar.", acts=["Ice-canyon walk", "Ice formations", "Shingra Koma camp"], meals="Breakfast, Lunch, Dinner", acc="Cave camp at Shingra Koma", elev=3200, dist="14 km on ice", hl="Last full day on ice", img=IMG["ladakh"]),
        dict(t="Shingra Koma to Chilling, drive to Leh", desc="A final short walk on the Chadar to the Chilling road-head, then drive back up to Leh for a hot shower and a celebration of a true winter expedition completed.", acts=["Final ice walk", "Reach road-head", "Drive to Leh", "Celebration"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Leh", elev=3500, dist="10 km on ice", hl="Off the Chadar", img=IMG["ladakh_road"]),
        dict(t="Depart Leh", desc="After breakfast, transfer to the airport for your onward flight, the frozen river behind you forever.", acts=["Airport transfer", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Ladakh", img=IMG["ladakh"]),
    ],
))

# 25. Sham Valley — 4D, Easy
PACKAGES.append(dict(
    title="Sham Valley Trek",
    slug="sham-valley-trek",
    dest="leh-ladakh", grade="Easy", days=4, nights=3,
    price=18500, rating=4.6, reviews=58, group=(4, 16),
    hero=IMG["ladakh"], gallery=[IMG["ladakh"], IMG["ladakh_road"], IMG["ladakh_khardung"], IMG["uk"]],
    desc="The gentle 'Baby Trek' of Ladakh through the Sham region west of Leh — easy days linking the apricot villages of Likir, Yangthang and Hemis Shukpachan, with low passes, ancient gompas and warm Ladakhi homestays. The perfect first taste of high-altitude trekking.",
    hl=["Ladakh's gentle Baby Trek", "Apricot villages", "Homestay nights", "Low scenic passes", "Likir & Hemis gompas", "Great first Himalayan trek"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Arrive Leh — Acclimatise", desc="Land at Leh and rest at 3,500m. A short acclimatisation day with gentle walks and hydration, plus a trek briefing for the easy days ahead.", acts=["Airport transfer", "Rest & hydrate", "Trek briefing"], meals="Dinner", acc="Hotel in Leh", elev=3500, hl="First day at altitude", img=IMG["ladakh"]),
        dict(t="Leh to Likir, trek to Yangthang", desc="Drive west to Likir to see its great golden Maitreya Buddha and monastery, then trek over the gentle Phobe La to the village of Yangthang for a homestay night.", acts=["Likir monastery", "Golden Buddha", "Cross Phobe La", "Homestay"], meals="Breakfast, Lunch, Dinner", acc="Homestay at Yangthang", elev=3700, dist="10 km trek", hl="Likir & first pass", img=IMG["ladakh_road"]),
        dict(t="Yangthang to Hemis Shukpachan", desc="An easy, beautiful day over two low passes through juniper groves to Hemis Shukpachan, one of Sham's prettiest villages, ringed by sacred cedar trees. Homestay night.", acts=["Two low passes", "Juniper groves", "Hemis Shukpachan", "Homestay"], meals="Breakfast, Lunch, Dinner", acc="Homestay at Hemis Shukpachan", elev=3650, dist="11 km trek", hl="Sacred cedar village", img=IMG["ladakh_khardung"]),
        dict(t="Trek to Ang, drive to Leh & depart", desc="A short final walk over the Mebtak La to the village of Ang and the road-head, then drive back to Leh. Connect to your onward flight, or overnight if your schedule requires.", acts=["Cross Mebtak La", "Reach road-head", "Drive to Leh", "Departure"], meals="Breakfast, Lunch", acc="N/A - Departure", hl="Final pass", img=IMG["ladakh"]),
    ],
))

# 26. Sham Valley Winter — 5D, Moderate
PACKAGES.append(dict(
    title="Sham Valley Winter Trek",
    slug="sham-valley-winter-trek",
    dest="leh-ladakh", grade="Moderate", days=5, nights=4,
    price=24500, rating=4.6, reviews=29, group=(4, 14),
    hero=IMG["ladakh"], gallery=[IMG["ladakh"], IMG["ladakh_khardung"], IMG["ladakh_road"], IMG["uk"]],
    desc="The Sham villages under a blanket of winter snow — the gentle Baby Trek transformed into a crisp, white, sub-zero walk between cosy Ladakhi homestays, with frozen streams, snow-laden gompas and the deep stillness of a Ladakhi winter. Accessible cold-weather trekking.",
    hl=["Snowbound Sham villages", "Cosy winter homestays", "Frozen streams & gompas", "Crisp clear mountain air", "Accessible winter trek", "Deep Ladakhi stillness"],
    incl=TREK_INCL + ["Warm homestay lodging with local stoves; extreme-cold sleeping bags where camping"],
    excl=TREK_EXCL,
    itin=[
        dict(t="Arrive Leh — Acclimatise (winter)", desc="Land at Leh in winter and rest at 3,500m. A short acclimatisation day with hydration, warmth and a cold-weather trek briefing.", acts=["Airport transfer", "Rest & hydrate", "Winter briefing"], meals="Dinner", acc="Hotel in Leh", elev=3500, hl="Winter arrival", img=IMG["ladakh"]),
        dict(t="Leh — Acclimatise & gear check", desc="A second acclimatisation day with a short snowy walk and a thorough winter layering and gear check before heading to the Sham villages.", acts=["Acclimatisation walk", "Winter gear check", "Safety briefing"], meals="Breakfast, Dinner", acc="Hotel in Leh", elev=3500, hl="Prepare for the cold", img=IMG["ladakh_khardung"]),
        dict(t="Leh to Likir, trek to Yangthang", desc="Drive to Likir to see the snow-framed golden Buddha and gompa, then trek over the white Phobe La through the silence to a warm homestay at Yangthang.", acts=["Snowy Likir gompa", "Golden Buddha", "Cross white Phobe La", "Homestay"], meals="Breakfast, Lunch, Dinner", acc="Homestay at Yangthang", elev=3700, dist="10 km trek", hl="Snow-framed Likir", img=IMG["ladakh_road"]),
        dict(t="Yangthang to Hemis Shukpachan", desc="A crisp winter day over two low snowbound passes through frosted juniper to Hemis Shukpachan, the cedar village deep in snow. Cosy homestay by the stove.", acts=["Snowbound passes", "Frosted juniper", "Hemis Shukpachan", "Homestay"], meals="Breakfast, Lunch, Dinner", acc="Homestay at Hemis Shukpachan", elev=3650, dist="11 km trek", hl="Cedar village in snow", img=IMG["ladakh"]),
        dict(t="Trek to Ang, drive to Leh & depart", desc="A final snowy walk over the Mebtak La to the road-head at Ang, then drive back to Leh for your onward flight.", acts=["Cross snowy Mebtak La", "Reach road-head", "Drive to Leh", "Departure"], meals="Breakfast, Lunch", acc="N/A - Departure", hl="Final winter pass", img=IMG["ladakh_khardung"]),
    ],
))

# 27. Kang Yatse II Climb — 8D, Difficult
PACKAGES.append(dict(
    title="Kang Yatse II Climb Expedition",
    slug="kang-yatse-ii-climb-expedition",
    dest="leh-ladakh", grade="Difficult", days=8, nights=7,
    price=56500, rating=4.9, reviews=26, group=(4, 10),
    hero=IMG["ladakh"], gallery=[IMG["ladakh"], IMG["ladakh_khardung"], IMG["ladakh_road"], IMG["uk"]],
    desc="A superb non-technical 6,000m trekking-peak above the Markha valley — Kang Yatse II crowns the Nimaling pastures at 6,250m and offers, on a clear summit dawn, a vast Karakoram-to-Zanskar panorama. Glacier travel, roped snow slopes and an alpine start make it a fine first 6,000er.",
    hl=["6,250m trekking peak", "Non-technical 6,000er", "Nimaling pastures base", "Roped snow summit", "Karakoram to Zanskar views", "Fine first 6,000m climb"],
    incl=TREK_INCL + ["Technical climbing gear — ropes, harnesses, ice axes, crampons", "Mountaineering-qualified climbing leader"],
    excl=TREK_EXCL,
    itin=[
        dict(t="Arrive Leh — Acclimatise", desc="Land at Leh and rest at 3,500m. A full acclimatisation day with hydration and gentle walks — the foundation of a safe 6,000m climb.", acts=["Airport transfer", "Rest & hydrate", "Leh bazaar walk"], meals="Dinner", acc="Hotel in Leh", elev=3500, hl="First day at altitude", img=IMG["ladakh"]),
        dict(t="Leh — Acclimatise & climbing briefing", desc="A second acclimatisation day with a short hike plus a climbing briefing, gear fitting and a refresher on rope, crampon and ice-axe technique.", acts=["Acclimatisation hike", "Climbing briefing", "Gear fitting"], meals="Breakfast, Dinner", acc="Hotel in Leh", elev=3500, hl="Prepare for the climb", img=IMG["ladakh_road"]),
        dict(t="Leh to Shang Sumdo, trek to Shang Phu", desc="Drive to the Shang Sumdo road-head and trek up the Shang valley, a quieter approach to Nimaling, to the camp at Shang Phu among grazing pastures.", acts=["Drive to Shang Sumdo", "Shang valley", "Pasture camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Shang Phu", elev=4250, dist="10 km trek", hl="Into the Shang valley", img=IMG["ladakh_khardung"]),
        dict(t="Shang Phu to Nimaling", desc="Climb over a high col onto the broad Nimaling plateau at the foot of Kang Yatse, the great peak filling the sky. Set up the staging camp on the pastures.", acts=["Cross high col", "Nimaling plateau", "Kang Yatse base", "Pasture camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Nimaling", elev=4700, dist="9 km trek", hl="Beneath Kang Yatse", img=IMG["ladakh"]),
        dict(t="Nimaling to Base Camp & glacier school", desc="A short move up to the Kang Yatse base camp, then a glacier-skills afternoon — rope teams, crampon and ice-axe work and crevasse drills on the lower glacier.", acts=["Move to Base Camp", "Glacier school", "Rope teams", "Crevasse drills"], meals="Breakfast, Lunch, Dinner", acc="Base Camp", elev=5100, dist="5 km trek", hl="Glacier skills day", img=IMG["ladakh_road"]),
        dict(t="Summit Kang Yatse II & descend to Nimaling", desc="A pre-dawn alpine start, roping up to climb the snow slopes and final ridge to the 6,250m summit of Kang Yatse II, where the dawn reveals an immense Himalayan-Karakoram panorama. Descend all the way to Nimaling.", acts=["Pre-dawn alpine start", "Roped snow climb", "Summit Kang Yatse II", "Long descent"], meals="Breakfast, Lunch, Dinner", acc="Camp at Nimaling", elev=6250, dist="12 km round", hl="Summit at 6,250m", img=IMG["ladakh_khardung"]),
        dict(t="Nimaling to Kongmaru La to Leh", desc="Descend from Nimaling over the Kongmaru La (5,260m) and down the dramatic Markha-side gorge to the Chokdo road-head, then drive back to Leh to celebrate the summit.", acts=["Cross Kongmaru La", "Gorge descent", "Drive to Leh", "Celebration"], meals="Breakfast, Lunch, Dinner", acc="Hotel in Leh", elev=5260, dist="15 km trek", hl="Kongmaru La descent", img=IMG["ladakh"]),
        dict(t="Depart Leh", desc="After breakfast, transfer to the airport for your onward flight.", acts=["Airport transfer", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Farewell to Ladakh", img=IMG["ladakh_road"]),
    ],
))

# 28. Parang La — 9D, Difficult
PACKAGES.append(dict(
    title="Parang La Trek",
    slug="parang-la-trek",
    dest="leh-ladakh", grade="Difficult", days=9, nights=8,
    price=49500, rating=4.8, reviews=19, group=(4, 12),
    hero=IMG["ladakh"], gallery=[IMG["ladakh"], IMG["ladakh_road"], IMG["ladakh_khardung"], IMG["uk"]],
    desc="A remote, high trans-Himalayan crossing of the 5,580m Parang La, the ancient trade route linking Ladakh's Rupshu plateau with Spiti via the turquoise Tso Moriri lake and the vast Chumur grasslands. Big altitude, river crossings and nomad country make this a true wilderness traverse.",
    hl=["5,580m trade-route pass", "Ladakh to Spiti traverse", "Turquoise Tso Moriri", "Changpa nomad country", "Glacier-fed river crossings", "Remote high-plateau trek"],
    incl=TREK_INCL, excl=TREK_EXCL,
    itin=[
        dict(t="Arrive Leh — Acclimatise", desc="Land at Leh and rest at 3,500m. A full acclimatisation day with hydration and gentle walks — vital before the high Rupshu plateau.", acts=["Airport transfer", "Rest & hydrate", "Leh bazaar walk"], meals="Dinner", acc="Hotel in Leh", elev=3500, hl="First day at altitude", img=IMG["ladakh"]),
        dict(t="Leh to Tso Moriri (Korzok)", desc="A long, spectacular drive across the Rupshu plateau to the sacred lake of Tso Moriri, overnighting at the lakeside village of Korzok at 4,500m to acclimatise further.", acts=["Rupshu plateau drive", "Tso Moriri lake", "Korzok village"], meals="Breakfast, Lunch, Dinner", acc="Camp / guesthouse at Korzok", elev=4500, dist="220 km drive", hl="Turquoise Tso Moriri", img=IMG["ladakh_road"]),
        dict(t="Korzok to Kiangdom", desc="The trek begins along the eastern shore of Tso Moriri, the water an impossible blue beneath snow peaks, to the meadow camp at Kiangdom where kiang (wild ass) graze.", acts=["Tso Moriri shore", "Kiang sightings", "Meadow camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Kiangdom", elev=4550, dist="14 km trek", hl="Walking the lakeshore", img=IMG["ladakh_khardung"]),
        dict(t="Kiangdom to Pare Chu valley", desc="Leave the lake and climb into the broad Pare Chu valley, a vast high-desert basin of braided river and grazing land, camping among the wide horizons of Rupshu.", acts=["Pare Chu valley", "High-desert basin", "Wide-horizon camp"], meals="Breakfast, Lunch, Dinner", acc="Camp in Pare Chu valley", elev=4750, dist="13 km trek", hl="Into the Pare Chu", img=IMG["ladakh"]),
        dict(t="Pare Chu to Bongrojen", desc="Continue up the valley with several glacier-fed stream crossings (best in the cold of morning) toward the base of the pass at Bongrojen, the terrain growing wilder and higher.", acts=["River crossings", "Valley ascent", "Approach the pass", "High camp"], meals="Breakfast, Lunch, Dinner", acc="Camp at Bongrojen", elev=5000, dist="12 km trek", hl="Approaching Parang La", img=IMG["ladakh_road"]),
        dict(t="Bongrojen to Parang La base", desc="A short acclimatising climb to the high base camp directly below the Parang La glacier, positioning for an early crossing. Rest and prepare for the pass.", acts=["Climb to base", "Glacier-edge camp", "Rest & prep"], meals="Breakfast, Lunch, Dinner", acc="Camp below Parang La", elev=5250, dist="6 km trek", hl="Pass base camp", img=IMG["ladakh_khardung"]),
        dict(t="Cross Parang La to Dak Karzong", desc="The big day — a pre-dawn start across the Parang La glacier to the 5,580m pass on the Ladakh-Spiti divide, with sweeping trans-Himalayan views, then a long descent into Spiti to the camp at Dak Karzong.", acts=["Pre-dawn start", "Glacier crossing", "Cross Parang La", "Descend to Spiti"], meals="Breakfast, Lunch, Dinner", acc="Camp at Dak Karzong", elev=5580, dist="14 km trek", hl="Parang La at 5,580m", img=IMG["ladakh"]),
        dict(t="Dak Karzong to Kibber", desc="Descend the Spiti side through gorge and grassland, crossing the river toward the high village of Kibber above the Spiti valley, the traverse all but complete.", acts=["Spiti-side descent", "Gorge & grassland", "Reach Kibber", "Village camp"], meals="Breakfast, Lunch, Dinner", acc="Guesthouse / camp at Kibber", elev=4200, dist="15 km trek", hl="Into Spiti", img=IMG["ladakh_road"]),
        dict(t="Kibber to Kaza & onward", desc="A short drive down to Kaza, the Spiti hub, where the trek ends with its monasteries and grand valley views before your onward journey.", acts=["Drive to Kaza", "Spiti valley views", "Departure"], meals="Breakfast", acc="N/A - Departure", hl="Traverse complete", img=IMG["ladakh_khardung"]),
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
    f"Inserted {len(PACKAGES)} Aquaterra adventure packages before line "
    f"{close_idx + 1}. New file lines: {len(new_lines)}."
)
print("Slugs:")
for s in slugs:
    print(f"  - {s}")





