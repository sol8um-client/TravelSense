"""Add storytelling/transparency/seasonal fields to Kashmir (3) + Leh (6) packages.

Client feedback (1 Jun):
- Kashmir: transparency notes, seasonal advisories, local taxi clarification, stronger storytelling.
- Leh: transform from 'tour itineraries' into 'legendary Himalayan experiences' — storytelling,
  altitude transparency, signature moments, expedition branding.
"""
import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PATH = r'E:\TravelSense\travelsense\src\data\packages.ts'
with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()


def esc(s):
    return s.replace('"', '\\"')


def ts_block(story, note, advisories):
    lines = []
    lines.append(f'    experienceStory:\n      "{esc(story)}",')
    lines.append(f'    transparencyNote:\n      "{esc(note)}",')
    adv = ",\n".join([f'      "{esc(a)}"' for a in advisories])
    lines.append(f'    seasonalAdvisories: [\n{adv},\n    ],')
    return "\n".join(lines) + "\n"


# Shared Kashmir local-taxi transparency (the recurring real-world gotcha)
KASHMIR_TAXI = (
    "Local transparency: across Kashmir, sightseeing inside Gulmarg, Pahalgam and Sonmarg is run by "
    "the local taxi unions at government-fixed rates — your Srinagar cab drops you at the town and the "
    "union vehicle takes you to the actual points (Gulmarg Gondola base, the Betaab/Aru/Chandanwari "
    "valleys, the Thajiwas glacier road). These union charges, the Gondola ticket, and pony/sledge "
    "rides are optional, paid directly on the spot, and are not part of the package price — we tell you "
    "the typical rates in advance so there are no surprises."
)

DATA = {
    # ─────────────────────────── KASHMIR ───────────────────────────
    "Kashmir Essence — Srinagar, Gulmarg, Sonmarg & Pahalgam": dict(
        story=(
            "This is the Kashmir of postcards, lived rather than photographed. You wake to mist lifting "
            "off Dal Lake from a carved-cedar houseboat, glide past floating vegetable gardens on a "
            "shikara, ride the Gulmarg Gondola — the world's second-highest cable car — to the snow line, "
            "and walk the Lidder-river meadows of Pahalgam where the Amarnath pilgrimage begins. Evenings "
            "are slow: kahwa by the samovar, a Wazwan feast, and the call to prayer drifting across the lake."
        ),
        note=KASHMIR_TAXI,
        advisories=[
            "The Tulip Garden (Asia's largest) blooms only for roughly 3-4 weeks from late March to mid-April; the Gondola Phase-2 to Apharwat can shut at short notice on weather/avalanche grounds.",
            "The Srinagar-Sonmarg road and Sinthan-side routes can close after fresh snow (Dec-Mar); we keep an alternate valley as backup on snow days.",
            "Peak demand (May-Jun, and the Amarnath Yatra window) means houseboats and Gulmarg hotels book out early — confirm dates ahead.",
        ],
    ),
    "Kashmir Grand — Jammu, Katra, Pahalgam, Gulmarg, Sonmarg & Srinagar": dict(
        story=(
            "A grand arc through Jammu and the Valley — beginning with the climb to Mata Vaishno Devi above "
            "Katra, then crossing the Pir Panjal into Kashmir proper: the saffron fields of Pampore, the "
            "alpine bowl of Gulmarg, the glacier road at Sonmarg, and three unhurried nights between a "
            "Pahalgam riverside and a Dal Lake houseboat. Pilgrimage and paradise in a single journey."
        ),
        note=(
            KASHMIR_TAXI + " At Katra, the 12 km Vaishno Devi trek is on foot; ponies, palki and the "
            "helicopter shuttle are optional and booked/paid separately."
        ),
        advisories=[
            "Vaishno Devi helicopter tickets are limited and weather-dependent — book well ahead or plan for the trek/pony option.",
            "The Tulip Garden is late-March to mid-April only; Gulmarg Gondola Phase-2 is weather-gated.",
            "Sonmarg and high roads can close on heavy-snow days in winter — an alternate sightseeing day is kept in reserve.",
        ],
    ),
    "Kashmir Offbeat with Gurez Valley & Sinthan Top": dict(
        story=(
            "Beyond the postcard valleys lies the Kashmir few travellers reach. Cross the 11,672 ft Razdan "
            "Pass into Gurez — a Dard-Shin valley of log-cabin villages along the Kishanganga, watched over "
            "by the pyramid of Habba Khatoon peak, so close to the Line of Control that the next ridge is "
            "another country. Add the high meadow of Sinthan Top and the quiet of Doodhpathri, and this "
            "becomes a Kashmir of silence, not crowds."
        ),
        note=(
            KASHMIR_TAXI + " Gurez is a sensitive border area: carry your original photo ID for the army "
            "checkposts (foreign nationals need a permit), expect BSNL/postpaid network only and limited, "
            "basic guesthouse stays — it is offbeat by nature, not luxury."
        ),
        advisories=[
            "Gurez is reachable only from about May to October; the Razdan Pass is snow-closed through winter and can shut briefly even in season after rain or landslides.",
            "Sinthan Top stays under snow into early summer; the road opens later than the main valley.",
            "Mobile network and ATMs are scarce beyond Srinagar — carry cash and download offline maps.",
        ],
    ),
    # ─────────────────────────── LEH–LADAKH ───────────────────────────
    "Ladakh Complete Circuit": dict(
        story=(
            "Ladakh is less a destination than an expedition into thin air and high silence. From Leh you "
            "climb to Khardung La — at 18,380 ft one of the world's highest motorable passes — drop into the "
            "Shyok and Nubra dunes where Bactrian camels still walk the old Silk Route, then stand at the "
            "edge of Pangong Tso as it shifts through impossible blues at 14,000 ft. Monasteries cling to "
            "cliffs, prayer flags shred in the wind, and every pass is crossed with a shout of 'Julley!'."
        ),
        note=(
            "Altitude transparency: Leh sits at 11,500 ft and you will go far higher. Day 1-2 are deliberately "
            "kept light for acclimatisation — this is not padding, it is what keeps you safe from Acute Mountain "
            "Sickness, and it is non-negotiable. Inner Line Permits are required for Nubra, Pangong and Hanle "
            "(we arrange them; carry original ID). Only postpaid mobile SIMs work in Ladakh (prepaid does not), "
            "fuel and ATMs exist only in Leh, and weather can close a pass at any time — the itinerary stays "
            "flexible by design."
        ),
        advisories=[
            "The high passes and lake roads are typically open only May to early October; Khardung La and Chang La can shut for hours after snow even in summer.",
            "Pangong and Tso Moriri partly freeze from November, and most camps close for winter — peak season is June to September.",
            "Carry a light down layer year-round: nights at Nubra, Pangong and Sarchu drop near or below freezing.",
        ],
    ),
    "Leh to Leh — Bike & SUV Adventure": dict(
        story=(
            "The classic Himalayan road trip, ridden the way it is meant to be. Throttle open across the "
            "Khardung La top-world signboard, thread the Shyok river gorge to Nubra, and chase the light to "
            "Pangong — a loop of high passes, hairpins and roadside dhabas where the chai is sweet and the "
            "horizon is always one more ridge away. Bike or SUV, this is Ladakh earned mile by mile."
        ),
        note=(
            "Altitude transparency: a mandatory acclimatisation day in Leh (11,500 ft) comes before any high "
            "pass — riders feel altitude harder, so this protects you from AMS. Bikes are well-serviced Royal "
            "Enfields with a backup vehicle and mechanic; you carry your own riding gear. Inner Line Permits "
            "(arranged by us), postpaid-only mobile network, and Leh-only fuel/ATMs all apply — plan refuelling "
            "around the long Nubra and Pangong legs."
        ),
        advisories=[
            "Riding season is roughly mid-May to September; passes can be snow-blocked or muddy outside this window.",
            "Weather can turn a 5-hour leg into a 9-hour one — never plan a flight out on the same day you ride back to Leh.",
            "Nights at Nubra and Pangong are near freezing; pack thermals even in July.",
        ],
    ),
    "Leh to Leh with Turtuk — Ladakh Extended": dict(
        story=(
            "An extended loop that reaches Turtuk — a Balti village of apricot orchards and stone-and-wood "
            "homes that only opened to travellers in 2010, the last settlement before the Pakistan border and "
            "a window into a Ladakh that feels more Central Asian than Indian. Add Khardung La, the Nubra dunes "
            "and Pangong's blues, and this is the fullest first-timer's Ladakh."
        ),
        note=(
            "Altitude transparency: the first two days in Leh (11,500 ft) are acclimatisation days by design, "
            "to keep you ahead of Acute Mountain Sickness before Khardung La. Turtuk and Nubra are border zones "
            "— Inner Line Permits are mandatory (we arrange them; carry original photo ID), postpaid mobile "
            "network only, and stays in Turtuk are simple homestays/guesthouses, which is the point."
        ),
        advisories=[
            "Turtuk and the high passes are seasonal — broadly May to early October; check road status after any snow.",
            "Pangong camps and Turtuk homestays largely close in winter; June-September is the reliable window.",
            "Carry cash from Leh — there are no ATMs in Nubra or Turtuk.",
        ],
    ),
    "Manali-Leh-Manali Himalayan Circuit": dict(
        story=(
            "Two of the planet's great mountain highways, ridden out and back. Climb from the cedar forests of "
            "Manali over the Atal Tunnel and the Baralacha La onto the Morey Plains, camp under a blanket of "
            "stars at Sarchu, and crest Tanglang La before Leh opens up below. The reward beyond: Khardung La, "
            "Nubra and Pangong. This is the high road in its purest, most demanding form."
        ),
        note=(
            "Altitude transparency: this route gains height fast and sleeps high — the night at Sarchu is around "
            "14,100 ft, where altitude is genuinely felt. We build in an acclimatisation day at Leh and keep the "
            "pace honest; AMS is managed, not ignored. Stretches between Manali and Leh have no fuel, network or "
            "medical help for hours — the trip runs with a support plan, and the schedule flexes for road and "
            "weather closures on the Baralacha and Tanglang passes."
        ),
        advisories=[
            "The Manali-Leh highway is open only about June to September/early October — it is snow-closed the rest of the year.",
            "River crossings (nallahs) on the Pang-Sarchu stretch run high by afternoon snow-melt; early starts are essential.",
            "Sarchu camps are basic and very cold at night — a four-season sleeping setup and thermals are a must.",
        ],
    ),
    "Manali-Leh-Srinagar One-Way Expedition": dict(
        story=(
            "A one-way traverse of the Western Himalaya, climbing out of Manali over the great passes to Leh, "
            "then descending the old Treaty Road past Lamayuru's moonland and the Kargil war-memorials to end on "
            "a Dal Lake houseboat in Srinagar. Desert to alpine to valley — three worlds in one continuous line "
            "across the mountains."
        ),
        note=(
            "Altitude transparency: starting from Manali means you gain height quickly, so an acclimatisation day "
            "at Leh is built in before you continue — this is what keeps AMS at bay. The Manali-Leh leg has long "
            "no-fuel, no-network stretches and high camps (Sarchu ~14,100 ft); the Leh-Srinagar leg needs an Inner "
            "Line awareness near the LoC. The plan stays flexible for pass and weather closures."
        ),
        advisories=[
            "The full traverse is only possible roughly June to September, when both the Manali-Leh and Zoji La (Leh-Srinagar) roads are open.",
            "Zoji La can close for hours on weather or convoy days — we keep a buffer before any onward flight from Srinagar.",
            "Nights at Sarchu and Leh are cold year-round; pack layers regardless of the calendar.",
        ],
    ),
    "Srinagar-Leh-Manali One-Way Expedition": dict(
        story=(
            "The connoisseur's direction across the Himalaya. Beginning low in Srinagar's Mughal gardens, you "
            "rise gently through Sonmarg and over Zoji La into Ladakh — a gradient that acclimatises you the way "
            "the body prefers — past Lamayuru and Leh to the great passes, before the long, dramatic drop over "
            "Tanglang La and Baralacha back down to the cedars of Manali."
        ),
        note=(
            "Altitude transparency: starting in Srinagar (5,200 ft) and rising slowly to Leh is the gentler "
            "acclimatisation profile, which is why many seasoned travellers prefer this direction — but the high "
            "camps and passes are the same, so we still keep a measured pace and watch for AMS. Long no-fuel and "
            "no-network stretches, Inner Line awareness near the LoC, and weather-dependent passes all apply."
        ),
        advisories=[
            "Both Zoji La (Srinagar side) and the Manali-Leh passes are open only about June to September/early October.",
            "Afternoon snow-melt streams on the Pang-Sarchu stretch are easiest crossed early — mornings start at dawn.",
            "Carry cold-weather layers throughout; even mid-summer nights at Leh and Sarchu are near freezing.",
        ],
    ),
}

inserted = 0
for title, d in DATA.items():
    pat = re.compile(r'(  \{\s*\n\s*title:\s*"' + re.escape(title) + r'")')
    m = pat.search(content)
    if not m:
        print("NOT FOUND:", title)
        continue
    # find the package's `    itinerary:` after the title
    it = re.search(r'\n    itinerary:\s*\[', content[m.start():])
    if not it:
        print("NO itinerary for:", title)
        continue
    pos = m.start() + it.start() + 1  # at the '    itinerary' line start
    block = ts_block(d['story'], d['note'], d['advisories'])
    content = content[:pos] + block + content[pos:]
    inserted += 1
    print("ADDED fields:", title)

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"\nInserted into {inserted}/9 packages.")
