# -*- coding: utf-8 -*-
"""Rewrite the 6 remaining scraped packages with clean, human itineraries.
Replaces each package's itinerary array (and tidies the package description/highlights).
"""
import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PATH = r'E:\TravelSense\travelsense\src\data\packages.ts'
with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()


def find_block(content, title):
    pat = re.compile(r'  \{\s*\n\s*title:\s*"' + re.escape(title) + r'"')
    m = pat.search(content)
    if not m:
        return None
    s = m.start(); depth = 0; i = s
    while i < len(content):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                return (s, i + 1)
        i += 1
    return None


def day(n, title, desc, acts, meals, acc, hi, img):
    a = ", ".join(f'"{x}"' for x in acts)
    return (
        "      {\n"
        f"        day: {n},\n"
        f'        title: "{title}",\n'
        f'        description:\n          "{desc}",\n'
        f"        activities: [{a}],\n"
        f'        meals: "{meals}",\n'
        f'        accommodation: "{acc}",\n'
        f'        highlight: "{hi}",\n'
        f'        image: "{img}",\n'
        "      },\n"
    )


# ─────────────────────────── itineraries ───────────────────────────
KA = "/images/generated/karnataka-hero.webp"
LK = "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=1600&h=900&fit=crop"
MP = "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1600&h=900&fit=crop"
GA = "https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=1600&h=900&fit=crop"

ITINS = {
"Badami - Hampi - Chikmangluru": dict(
  new_title="Badami, Hampi & Chikmagalur — Karnataka Heritage Circuit",
  desc="An eight-day loop through Karnataka's greatest heritage and coffee country — the Hoysala temple towns of Belur and Halebid, the UNESCO ruins of Hampi and the Chalukyan rock-temples of Badami, Pattadakal and Aihole, ending in the misty coffee hills of Chikmagalur.",
  highlights=["Hampi UNESCO ruins & Stone Chariot","Badami cave temples & Pattadakal","Belur & Halebid Hoysala temples","Shravanabelagola Gomateshwara","Chikmagalur coffee hills & Mullayangiri","Coracle ride on the Tungabhadra"],
  days=[
    day(1,"Bengaluru – Shravanabelagola – Hassan","Arrive at Bengaluru and drive to Hassan, stopping en route at Shravanabelagola to see the 17-metre monolithic statue of Lord Bahubali (Gomateshwara). Evening at leisure in Hassan.",["Bengaluru arrival","Shravanabelagola","Gomateshwara statue","Drive to Hassan"],"Dinner","Hotel in Hassan","Gomateshwara monolith",KA),
    day(2,"Hassan – Belur – Halebid – Hampi","Visit Belur's Chennakeshava Temple on the banks of the Yagachi, then the 12th-century Hoysaleswara Temple at Halebid with its intricate stone friezes. Continue to Hampi, the former Vijayanagara capital, for the night.",["Belur Chennakeshava Temple","Halebid Hoysaleswara Temple","Drive to Hampi"],"Breakfast, Dinner","Hotel in Hampi","Hoysala temple carvings",KA),
    day(3,"Hampi — UNESCO Ruins by Auto-Rickshaw","A full day exploring Hampi, the 'world's largest open-air museum'. See the Virupaksha Temple, the Vittala Temple with its iconic Stone Chariot and musical pillars, the underground Shiva temple, the Royal Centre (Queen's Bath, Lotus Mahal, Elephant Stables) and the Lakshmi Narasimha monolith.",["Virupaksha Temple","Vittala Temple & Stone Chariot","Royal Centre","Lotus Mahal","Elephant Stables","Lakshmi Narasimha"],"Breakfast, Dinner","Hotel in Hampi","The Vittala Stone Chariot",KA),
    day(4,"Hampi – Badami – Pattadakal – Aihole – Hampi","Day trip to the Chalukyan heartland — the red-sandstone Badami cave temples and Bhutanatha group by the lake, the UNESCO temple complex at Pattadakal, and the 5th-century stone temples of Aihole, the cradle of Indian temple architecture. Return to Hampi.",["Badami cave temples","Bhutanatha temples","Pattadakal UNESCO complex","Aihole stone temples"],"Breakfast, Dinner","Hotel in Hampi","Badami cliff-carved caves",KA),
    day(5,"Hampi — Coracle Ride & Anegundi","A gentler day on the far bank of the Tungabhadra — a traditional coracle (round-boat) ride, the heritage village of Anegundi believed to be the mythical Kishkindha, and a sunset from Hemakuta Hill over the boulder-strewn landscape.",["Tungabhadra coracle ride","Anegundi heritage village","Hemakuta Hill sunset"],"Breakfast, Dinner","Hotel in Hampi","Sunset from Hemakuta Hill",KA),
    day(6,"Hampi – Chitradurga – Chikmagalur","Drive to Chikmagalur, the 'coffee land of Karnataka', stopping at the dramatic hill fortress of Chitradurga with its seven concentric walls and clever water tanks. Evening arrival in the coffee hills.",["Chitradurga Fort","Seven-walled fortress","Drive to Chikmagalur"],"Breakfast, Dinner","Resort in Chikmagalur","Chitradurga's seven walls",KA),
    day(7,"Chikmagalur — Mullayangiri & Coffee Country","Explore Chikmagalur — drive up Mullayangiri, the highest peak in Karnataka, through the twisting Western Ghats, visit the Honnamana Halla falls, and tour a working coffee plantation and museum where the beans are sun-dried.",["Mullayangiri Peak","Western Ghats drive","Honnamana Halla falls","Coffee plantation tour"],"Breakfast, Dinner","Resort in Chikmagalur","Mullayangiri — Karnataka's highest peak",KA),
    day(8,"Chikmagalur – Bengaluru – Departure","Drive back to Bengaluru, with a stop at the HAL Aerospace Museum if time allows, and transfer to the airport / railway station for your onward journey.",["Drive to Bengaluru","HAL Aerospace Museum","Departure transfer"],"Breakfast","N/A — Departure","A full Karnataka heritage loop",KA),
  ]),

"Scenic Sri Lanka": dict(
  new_title="Scenic Sri Lanka — Colombo, Kandy, Sigiriya, Ella & Galle",
  desc="A seven-day scenic loop of the island — colonial Colombo, the hill capital of Kandy with its Temple of the Sacred Tooth, the Sigiriya Lion Rock, the tea-country charm of Ella, and the Dutch-walled fort of Galle on the south coast.",
  highlights=["Sigiriya Lion Rock fortress","Kandy Temple of the Tooth","Pinnawala Elephant Orphanage","Ella Nine Arch Bridge & tea country","Galle Dutch Fort (UNESCO)","Colombo city tour"],
  days=[
    day(1,"Arrive Colombo","Meet our representative at Bandaranaike International Airport and transfer to Colombo, Sri Lanka's vibrant seafront capital. An orientation drive past the Galle Face Green, the old Dutch Hospital and Gangaramaya Temple, then check in for the night.",["Airport pickup","Galle Face Green","Gangaramaya Temple","Colombo orientation"],"Dinner","Hotel in Colombo","Colombo's seafront promenade",LK),
    day(2,"Colombo – Kandy (Pinnawala en route)","Drive to the hill city of Kandy, stopping at the Pinnawala Elephant Orphanage to watch the herd bathe in the river. In Kandy, visit the Temple of the Sacred Tooth Relic and enjoy a Kandyan cultural dance show in the evening.",["Pinnawala Elephant Orphanage","Temple of the Sacred Tooth","Kandy Lake","Kandyan dance show"],"Breakfast, Dinner","Hotel in Kandy","Temple of the Sacred Tooth",LK),
    day(3,"Kandy – Sigiriya Excursion – Kandy","A day excursion to the Sigiriya Lion Rock, the 5th-century fortress-palace on a 200-metre granite monolith with its frescoes and water gardens, and the nearby Dambulla Cave Temple. Return to Kandy via a spice garden.",["Sigiriya Lion Rock","Sigiriya frescoes","Dambulla Cave Temple","Spice garden"],"Breakfast, Dinner","Hotel in Kandy","Climbing Sigiriya Lion Rock",LK),
    day(4,"Kandy – Ella","Take the scenic route to Ella, a laid-back hill town wrapped in tea estates. See the famous Nine Arch Bridge, Little Adam's Peak and the Ravana Falls, with sweeping views over the misty valley.",["Nine Arch Bridge","Little Adam's Peak","Ravana Falls","Ella tea estates"],"Breakfast, Dinner","Hotel in Ella","The Nine Arch Bridge",LK),
    day(5,"Ella – Galle","Descend to the south coast and the historic port of Galle. Walk the ramparts of the UNESCO-listed Galle Dutch Fort, its lighthouse, churches and boutique lanes, then unwind by the sea.",["Galle Dutch Fort","Fort ramparts walk","Galle Lighthouse","South-coast beach"],"Breakfast, Dinner","Hotel in Galle","Sunset on the Galle Fort ramparts",LK),
    day(6,"Galle – Colombo","Drive back up the coast to Colombo for a city tour — the Independence Square, the National Museum, Pettah bazaar and a stop for shopping before a farewell dinner.",["Independence Square","National Museum","Pettah bazaar","Shopping"],"Breakfast, Dinner","Hotel in Colombo","Colombo city highlights",LK),
    day(7,"Departure","After breakfast, transfer to Bandaranaike International Airport for your departure flight, carrying away a bagful of island memories.",["Airport transfer","Departure"],"Breakfast","N/A — Departure","Farewell to the teardrop isle",LK),
  ]),

"Scintillating Tropical Tour to Sri Lanka": dict(
  new_title="Scintillating Sri Lanka — Kandy, Nuwara Eliya, Bentota & Mirissa",
  desc="A seven-day tropical tour pairing the cultural triangle with the beaches of the south-west — Kandy and Sigiriya, the tea-country hill station of Nuwara Eliya, whale-watching at Mirissa, and the golden sands of Bentota.",
  highlights=["Sigiriya Lion Rock","Kandy Temple of the Tooth","Nuwara Eliya tea country","Mirissa whale watching","Bentota golden beaches","Pinnawala Elephant Orphanage"],
  days=[
    day(1,"Arrive Colombo – Kandy","Arrive and drive to Kandy, the island's hill capital, stopping at the Pinnawala Elephant Orphanage en route. Evening visit to the Temple of the Sacred Tooth Relic and a Kandyan cultural show.",["Pinnawala Elephant Orphanage","Temple of the Sacred Tooth","Kandyan dance show"],"Dinner","Hotel in Kandy","Temple of the Sacred Tooth",LK),
    day(2,"Sigiriya Excursion","A full day at the Sigiriya Rock Fortress — climb the Lion Rock past its mirror wall and frescoes to the summit palace ruins, then visit the Dambulla Cave Temple before returning to Kandy.",["Sigiriya Lion Rock","Summit palace ruins","Dambulla Cave Temple"],"Breakfast, Dinner","Hotel in Kandy","The summit of Sigiriya",LK),
    day(3,"Kandy – Nuwara Eliya","Drive into the hills to Nuwara Eliya, 'Little England', past the towering Bahiravokanda Vihara Buddha statue and a working tea factory. Explore the colonial town, tea estates and cool spring-like weather.",["Bahiravokanda Buddha","Tea factory tour","Nuwara Eliya town","Tea estates"],"Breakfast, Dinner","Hotel in Nuwara Eliya","Tea-carpeted hills of Nuwara Eliya",LK),
    day(4,"Nuwara Eliya – Bentota","Descend to the west-coast beach town of Bentota, stopping at the Royal Botanical Garden at Peradeniya en route. Evening on the beach with optional water sports on the Bentota river.",["Royal Botanical Garden","Bentota beach","Bentota river water sports"],"Breakfast, Dinner","Resort in Bentota","First sunset on Bentota beach",LK),
    day(5,"Mirissa Excursion","An early start to Mirissa for a blue-whale and dolphin watching boat safari — the largest animal on the planet cruises these waters — with the Galle Fort visited on the way back.",["Mirissa whale watching","Dolphin spotting","Galle Fort"],"Breakfast, Dinner","Resort in Bentota","Spotting blue whales off Mirissa",LK),
    day(6,"Bentota – Colombo","Drive to Colombo for a city tour — Gangaramaya Temple, Independence Square, the National Museum and Pettah market — with time for shopping before a farewell dinner.",["Gangaramaya Temple","Independence Square","National Museum","Pettah market"],"Breakfast, Dinner","Hotel in Colombo","Colombo's mix of old and new",LK),
    day(7,"Departure from Colombo","After breakfast, transfer to Bandaranaike International Airport for your flight home with a plethora of memories.",["Airport transfer","Departure"],"Breakfast","N/A — Departure","A scintillating island farewell",LK),
  ]),

"5 Nights with Dambulla": dict(
  new_title="Sri Lanka with Dambulla — Sigiriya, Nuwara Eliya & Colombo",
  desc="A six-day introduction to Sri Lanka's cultural triangle and hill country — the cave temples of Dambulla, the Sigiriya Lion Rock, the tea-country town of Nuwara Eliya, and a finish in seafront Colombo.",
  highlights=["Sigiriya Lion Rock","Dambulla Cave Temple","Pinnawala Elephant Orphanage","Nuwara Eliya tea estates","Lake Gregory & Victoria Park","Colombo city tour"],
  days=[
    day(1,"Arrive Colombo – Dambulla","Arrive at Bandaranaike International Airport and drive to Dambulla, stopping at the Pinnawala Elephant Orphanage en route. Check in and relax in the heart of the cultural triangle.",["Pinnawala Elephant Orphanage","Drive to Dambulla"],"Dinner","Hotel in Dambulla","Into the cultural triangle",LK),
    day(2,"Dambulla — Sigiriya & Cave Temple","Climb the Sigiriya Lion Rock fortress with its frescoes and water gardens, then visit the golden Dambulla Cave Temple, five caves of Buddha statues and painted ceilings dating back two millennia.",["Sigiriya Lion Rock","Sigiriya water gardens","Dambulla Cave Temple"],"Breakfast, Dinner","Hotel in Dambulla","Sigiriya's rock-top palace",LK),
    day(3,"Dambulla – Nuwara Eliya","Drive up into the tea hills to Nuwara Eliya, surrounded by plantations and spring-like weather. Stop at a tea factory to see the leaf-to-cup process and taste a fresh Ceylon brew.",["Tea factory tour","Ceylon tea tasting","Nuwara Eliya hills"],"Breakfast, Dinner","Hotel in Nuwara Eliya","Ceylon tea straight from the estate",LK),
    day(4,"Nuwara Eliya — Tea Estates & Lake Gregory","A full day in 'Little England' — stroll the colonial town, Victoria Park and the golf course, and enjoy boating or fishing on Lake Gregory amid the tea-carpeted hills.",["Victoria Park","Lake Gregory boating","Nuwara Eliya golf course","Tea estate walk"],"Breakfast, Dinner","Hotel in Nuwara Eliya","Boating on Lake Gregory",LK),
    day(5,"Nuwara Eliya – Colombo","Descend to Colombo for a city tour — Galle Face Green, Gangaramaya Temple, Independence Square and Pettah bazaar — with time for last-minute shopping.",["Galle Face Green","Gangaramaya Temple","Independence Square","Pettah bazaar"],"Breakfast, Dinner","Hotel in Colombo","Colombo's seafront and temples",LK),
    day(6,"Departure","After breakfast, transfer to the airport for your departure flight with beautiful memories of the island.",["Airport transfer","Departure"],"Breakfast","N/A — Departure","Goodbye to Sri Lanka",LK),
  ]),

"Ujjain Omkareshwar": dict(
  new_title="Ujjain, Omkareshwar & Maheshwar — Madhya Pradesh Spiritual Circuit",
  desc="A five-day spiritual circuit of western Madhya Pradesh — the Mahakaleshwar Jyotirlinga at Ujjain on the Kshipra, the island shrine of Omkareshwar on the Narmada, Ahilyabai's riverside town of Maheshwar, and the romantic ruins of Mandu.",
  highlights=["Mahakaleshwar Jyotirlinga, Ujjain","Omkareshwar island Jyotirlinga","Maheshwar Ahilya Fort & Narmada ghats","Mandu — Jahaz Mahal & Rani Roopmati","Narmada boating","Kshipra river ghats"],
  days=[
    day(1,"Indore – Ujjain","Arrive at Indore and drive to Ujjain, the ancient city on the banks of the Kshipra. Visit the Mahakaleshwar Jyotirlinga, one of the twelve sacred shrines of Shiva, the Kal Bhairav temple and the Ram Ghat for the evening aarti.",["Mahakaleshwar Jyotirlinga","Kal Bhairav temple","Ram Ghat aarti","Kshipra river"],"Dinner","Hotel in Ujjain","Evening aarti at Mahakaleshwar",MP),
    day(2,"Ujjain – Omkareshwar","Drive south to Omkareshwar, where a Narmada-island shaped like the sacred 'OM' holds another of the twelve Jyotirlingas. Take the boat across, visit the Omkareshwar and Mamleshwar temples, and stay overnight by the river.",["Omkareshwar Jyotirlinga","Narmada island boat","Mamleshwar temple","River ghats"],"Breakfast, Dinner","Hotel in Omkareshwar","The OM-shaped island shrine",MP),
    day(3,"Omkareshwar – Maheshwar","Drive to Maheshwar, the riverside town rebuilt by the queen Ahilyabai Holkar. Tour the Ahilya Fort and the cluster of riverside temples, shop for the famous Maheshwari saris, and take an evening boat on the Narmada.",["Ahilya Fort","Riverside temples","Maheshwari sari weavers","Narmada boating"],"Breakfast, Dinner","Hotel in Maheshwar","Sunset boat on the Narmada",MP),
    day(4,"Maheshwar – Mandu","Travel to the hilltop fortress city of Mandu. Explore the Rani Roopmati Pavilion, the Jami Masjid, the ship-shaped Jahaz Mahal and Baz Bahadur's Palace, set among monsoon-green ravines.",["Rani Roopmati Pavilion","Jami Masjid","Jahaz Mahal","Baz Bahadur's Palace"],"Breakfast, Dinner","Hotel in Mandu","Jahaz Mahal, the ship palace",MP),
    day(5,"Indore — Lal Bagh Palace & Chappan Dukan, Departure","On the final morning, visit Indore's grand Lal Bagh Palace and the Rajwada Holkar palace, then taste the city's famous street food at the 56-stall Chappan Dukan and pick up Maheshwari fabrics at Sarafa Bazaar. Transfer to Indore airport / railway station for your onward journey.",["Lal Bagh Palace","Rajwada Holkar Palace","Chappan Dukan street food","Sarafa Bazaar","Departure transfer"],"Breakfast","N/A — Departure","Indore's legendary street food",MP),
  ]),

"Dudhsagar Waterfall Trek": dict(
  new_title="Dudhsagar Waterfall Trek — Pune/Mumbai Weekend",
  desc="A weekend trek to the four-tiered Dudhsagar Falls on the Goa-Karnataka border — an overnight train from Pune, a trek through the Bhagwan Mahaveer Sanctuary in the Western Ghats to the foot of the thundering 'Sea of Milk', and back by the next morning.",
  highlights=["Dudhsagar four-tier waterfall","Bhagwan Mahaveer Sanctuary trek","Castle Rock railway trail","Western Ghats scenery","Overnight train adventure","Kulem base village"],
  days=[
    day(1,"Pune – Overnight Train to Goa","Meet the team at Pune Railway Station and board the night train (Goa Express) towards the Western Ghats. Settle in for an overnight journey towards Dudhsagar.",["Pune Railway Station meet","Goa Express boarding","Overnight train journey"],"None","Overnight train","The classic overnight train start",GA),
    day(2,"Kulem – Dudhsagar Falls Trek","Reach Kulem at dawn for breakfast at the base village, then trek through the Bhagwan Mahaveer Sanctuary to the foot of the Dudhsagar Falls. Explore the four-tiered cascade, lunch back at base, and begin the return journey.",["Kulem base village","Sanctuary trek","Dudhsagar Falls","Four-tier cascade"],"Breakfast, Lunch","Overnight train","Standing below the Sea of Milk",GA),
    day(3,"Return to Pune / Mumbai","Arrive back early morning — Pune participants reach Pune, Mumbai participants continue onward — having captured the fauna of the Western Ghats and the jaw-dropping four-tier Dudhsagar Falls.",["Morning arrival Pune","Onward to Mumbai","Trek concludes"],"None","N/A — Departure","Memories of the Western Ghats",GA),
  ]),
}

count = 0
for title, spec in ITINS.items():
    blk = find_block(content, title)
    if not blk:
        print("NOT FOUND:", title)
        continue
    s, e = blk
    block = content[s:e]

    # 1) package title
    block = re.sub(r'title:\s*"' + re.escape(title) + r'"',
                   'title: "' + spec['new_title'] + '"', block, count=1)
    # 2) package description (first description: in block, before itinerary)
    block = re.sub(r'description:\s*\n?\s*"[^"]*"',
                   'description:\n      "' + spec['desc'].replace('"', '\\"') + '"',
                   block, count=1)
    # 3) highlights (first highlights array)
    hl = ",\n".join('      "' + h + '"' for h in spec['highlights'])
    block = re.sub(r'highlights:\s*\[[^\]]*\]',
                   'highlights: [\n' + hl + ',\n    ]', block, count=1)
    # 4) replace the itinerary array (itinerary is the last field)
    pos = block.index('\n    itinerary:')
    days = "".join(spec['days'])
    block = block[:pos] + '\n    itinerary: [\n' + days + '    ],\n  }'

    content = content[:s] + block + content[e:]
    count += 1
    print("REWROTE:", title, "->", spec['new_title'][:50])

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"\nDone. Rewrote {count}/6 scraped packages.")
