# -*- coding: utf-8 -*-
"""Add 12 international packages for the new destinations (docx 7 / travellive list)."""
import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
PATH = r'E:\TravelSense\travelsense\src\data\packages.ts'
c = open(PATH, encoding='utf-8').read()

U = "https://images.unsplash.com/"
def im(id, w=1600, h=900):
    return f"{U}{id}?w={w}&h={h}&fit=crop"

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

def pkg(title, slug, dname, dslug, desc, hero, imgs, days, nights, price, disc,
        diff, gmin, gmax, rating, reviews, incl, excl, hi, itin, featured=False,
        tnote=None):
    images = ",\n".join(f'      "{x}"' for x in imgs)
    inc = ",\n".join(f'      "{x}"' for x in incl)
    exc = ",\n".join(f'      "{x}"' for x in excl)
    hl = ",\n".join(f'      "{x}"' for x in hi)
    tn = f'    transparencyNote:\n      "{tnote}",\n' if tnote else ""
    return f'''  {{
    title: "{title}",
    slug: "{slug}",
    destinationName: "{dname}",
    destinationSlug: "{dslug}",
    category: "leisure",
    description:
      "{desc}",
    heroImage: "{hero}",
    images: [
{images},
    ],
    duration: {{ days: {days}, nights: {nights} }},
    price: {price},
    discountedPrice: {disc},
    difficulty: "{diff}",
    groupSize: {{ min: {gmin}, max: {gmax} }},
    rating: {rating},
    reviewCount: {reviews},
    inclusions: [
{inc},
    ],
    exclusions: [
{exc},
    ],
    highlights: [
{hl},
    ],
{tn}    featured: {str(featured).lower()},
    itinerary: [
{itin}    ],
  }},
'''

# shared exclusions for international tours
EXC = ["International airfare unless specified","Visa fees and travel insurance",
       "Lunches and dinners except where mentioned","Optional activities and personal expenses",
       "Tips for guides and drivers","Anything not listed under inclusions"]

OUT = []

# ─────────── 1. SOUTH AFRICA ───────────
OUT.append(pkg(
 "South Africa Highlights — Cape Town, Garden Route & Kruger Safari","south-africa-highlights-10d",
 "South Africa","south-africa",
 "Ten days covering the three faces of South Africa — cosmopolitan Cape Town and Table Mountain, the scenic Garden Route along the Indian Ocean, and Big Five game drives in the Greater Kruger.",
 im("photo-1580060839134-75a5edca2e99"),
 [im("photo-1580060839134-75a5edca2e99",800,600),im("photo-1516026672322-bc52d61a55d5",800,600),im("photo-1547471080-7cc2caa01a7e",800,600),im("photo-1521651201144-634f700b36ef",800,600)],
 10,9,150000,136000,"Easy",2,16,4.8,64,
 ["9 nights in 4-star hotels and a safari lodge","Daily breakfast + safari full-board","Table Mountain & Cape Point tours","Cape Winelands tasting tour","Garden Route scenic drive","2-night Greater Kruger safari with game drives","All inter-city transfers + 1 domestic flight"],
 EXC,
 ["Table Mountain cable car","Cape Point & Boulders penguins","Cape Winelands tasting","Garden Route drive","Greater Kruger Big Five safari"],
 "".join([
  day(1,"Arrive Cape Town","Arrive in Cape Town and transfer to your hotel. Evening at the V&A Waterfront with views of Table Mountain.",["Airport pickup","V&A Waterfront"],"Dinner","Hotel in Cape Town","Table Mountain over the harbour",im("photo-1580060839134-75a5edca2e99")),
  day(2,"Table Mountain & City Tour","Cable car up Table Mountain, then a city tour of the Company's Garden, Bo-Kaap and Signal Hill.",["Table Mountain cable car","Bo-Kaap quarter","Signal Hill"],"Breakfast","Hotel in Cape Town","Flat-top summit views",im("photo-1516026672322-bc52d61a55d5")),
  day(3,"Cape Peninsula — Cape Point & Penguins","Full-day Cape Peninsula tour — Chapman's Peak drive, Cape of Good Hope, Cape Point and the African penguins at Boulders Beach.",["Chapman's Peak Drive","Cape of Good Hope","Cape Point","Boulders Beach penguins"],"Breakfast","Hotel in Cape Town","Penguins at Boulders Beach",im("photo-1547471080-7cc2caa01a7e")),
  day(4,"Cape Winelands","Day trip to Stellenbosch and Franschhoek for cellar tours and wine tasting among the Cape Dutch estates.",["Stellenbosch","Franschhoek","Wine tasting"],"Breakfast","Hotel in Cape Town","Cape Dutch wine estates",im("photo-1521651201144-634f700b36ef")),
  day(5,"Garden Route — Drive to Knysna","Begin the Garden Route drive east along the coast to Knysna, the lagoon town, via Mossel Bay.",["Garden Route drive","Mossel Bay","Knysna lagoon"],"Breakfast","Hotel in Knysna","Knysna Heads lagoon",im("photo-1534177616072-ef7dc120449d")),
  day(6,"Knysna & Tsitsikamma","Explore the Knysna Heads and the forests and suspension bridge of Tsitsikamma National Park.",["Knysna Heads","Tsitsikamma National Park","Storms River bridge"],"Breakfast","Hotel in Knysna","Tsitsikamma forest gorge",im("photo-1484318571209-661cf29a69c3")),
  day(7,"Fly to the Greater Kruger","Drive to George/Port Elizabeth and fly via Johannesburg to the Greater Kruger. Evening game drive on arrival at the lodge.",["Domestic flight","Safari lodge check-in","Evening game drive"],"Breakfast, Dinner","Safari lodge, Greater Kruger","First sundowner game drive",im("photo-1547970810-dc1eac37d174")),
  day(8,"Kruger — Full Safari Day","Dawn and afternoon 4x4 game drives in search of the Big Five, with a bush brunch between drives.",["Dawn game drive","Big Five tracking","Afternoon game drive"],"Breakfast, Lunch, Dinner","Safari lodge, Greater Kruger","Big Five at close range",im("photo-1535941339077-2dd1c7963098")),
  day(9,"Kruger to Johannesburg","Morning game drive, then drive/fly to Johannesburg for a city and Soweto tour including the Apartheid Museum.",["Morning game drive","Soweto tour","Apartheid Museum"],"Breakfast","Hotel in Johannesburg","Soweto & Apartheid Museum",im("photo-1516026672322-bc52d61a55d5")),
  day(10,"Departure","Transfer to OR Tambo International Airport for your departure flight.",["Airport transfer"],"Breakfast","N/A — Departure","City, coast and safari in one trip",im("photo-1580060839134-75a5edca2e99")),
 ]),featured=True,
 tnote="Land cost per person on twin sharing; international and the one domestic flight are additional. The Greater Kruger area is a malaria-precaution zone — please consult your doctor. Safari game viewing is wild and never guaranteed, but the Greater Kruger has excellent Big Five density."))

# ─────────── 2. KENYA ───────────
OUT.append(pkg(
 "Kenya Safari — Masai Mara, Lake Nakuru & Amboseli","kenya-safari-7d",
 "Kenya","kenya",
 "A classic seven-day Kenyan safari circuit — the big cats of the Masai Mara, the flamingos and rhino of Lake Nakuru, and the elephants of Amboseli beneath Mount Kilimanjaro.",
 im("photo-1547970810-dc1eac37d174"),
 [im("photo-1547970810-dc1eac37d174",800,600),im("photo-1535941339077-2dd1c7963098",800,600),im("photo-1516426122078-c23e76319801",800,600),im("photo-1549366021-9f761d450615",800,600)],
 7,6,158000,142500,"Easy",2,12,4.9,52,
 ["6 nights in safari lodges and tented camps","Full board on safari (all meals)","Game drives in 4x4 with pop-up roof","Park and conservancy entry fees","Services of a professional safari guide","All ground transfers; Maasai village visit"],
 EXC,
 ["Masai Mara big cats","Great Migration (in season)","Lake Nakuru flamingos & rhino","Amboseli elephants under Kilimanjaro","Optional balloon safari"],
 "".join([
  day(1,"Arrive Nairobi","Arrive in Nairobi and transfer to your hotel. Optional visit to the Giraffe Centre or the Sheldrick elephant orphanage.",["Airport pickup","Giraffe Centre (optional)"],"Dinner","Hotel in Nairobi","Gateway to the safari",im("photo-1516426122078-c23e76319801")),
  day(2,"Nairobi to Masai Mara","Drive through the Great Rift Valley to the Masai Mara. Afternoon game drive on arrival.",["Rift Valley viewpoint","Masai Mara afternoon game drive"],"Breakfast, Lunch, Dinner","Tented camp, Masai Mara","First big-cat sighting",im("photo-1547970810-dc1eac37d174")),
  day(3,"Masai Mara — Full Day","Full day of game drives across the Mara plains in search of lion, cheetah and leopard, with an optional dawn balloon safari.",["Dawn game drive","Optional balloon safari","Big-cat tracking"],"Breakfast, Lunch, Dinner","Tented camp, Masai Mara","Lions on the open savannah",im("photo-1535941339077-2dd1c7963098")),
  day(4,"Mara to Lake Nakuru","Drive to Lake Nakuru National Park, famous for its flamingos and as a rhino sanctuary. Afternoon game drive.",["Lake Nakuru game drive","Flamingo flocks","Rhino sanctuary"],"Breakfast, Lunch, Dinner","Lodge near Lake Nakuru","Pink flamingos & rhino",im("photo-1549366021-9f761d450615")),
  day(5,"Nakuru to Amboseli","Long drive south to Amboseli National Park, framed by Mount Kilimanjaro. Evening game drive among the elephant herds.",["Drive to Amboseli","Evening game drive","Elephant herds"],"Breakfast, Lunch, Dinner","Lodge in Amboseli","Elephants under Kilimanjaro",im("photo-1534177616072-ef7dc120449d")),
  day(6,"Amboseli — Kilimanjaro Views","Morning and afternoon game drives with classic views of Kilimanjaro, plus a Maasai village visit.",["Dawn game drive","Kilimanjaro views","Maasai village visit"],"Breakfast, Lunch, Dinner","Lodge in Amboseli","Kilimanjaro at sunrise",im("photo-1516426122078-c23e76319801")),
  day(7,"Amboseli to Nairobi — Departure","Drive back to Nairobi for your departure flight, or onward connection.",["Drive to Nairobi","Airport transfer"],"Breakfast","N/A — Departure","Three iconic parks in a week",im("photo-1547970810-dc1eac37d174")),
 ]),featured=True,
 tnote="Land cost per person on twin sharing; international airfare is additional. A yellow-fever certificate may be required and malaria prophylaxis is advised. The Great Migration river crossings (roughly Jul-Oct) are seasonal and wild — never guaranteed, but the Mara has superb year-round game viewing."))

# ─────────── 3. JAPAN ───────────
OUT.append(pkg(
 "Japan Discovery — Tokyo, Mount Fuji, Kyoto & Osaka","japan-discovery-8d",
 "Japan","japan",
 "Eight days across Japan's golden route — neon Tokyo, Mount Fuji and Hakone, the temples and torii of Kyoto, the deer of Nara and the street food of Osaka, linked by the shinkansen bullet train.",
 im("photo-1493976040374-85c8e12f0c0e"),
 [im("photo-1493976040374-85c8e12f0c0e",800,600),im("photo-1545569341-9eb8b30979d9",800,600),im("photo-1528360983277-13d401cdc186",800,600),im("photo-1524413840807-0c3cb6fa808d",800,600)],
 8,7,205000,185000,"Easy",2,16,4.9,71,
 ["7 nights in 3-4 star hotels with daily breakfast","Shinkansen bullet train Tokyo-Kyoto","Tokyo city tour + Mount Fuji/Hakone day trip","Kyoto & Nara guided sightseeing","Osaka city tour","All transfers and an English-speaking guide on tour days"],
 EXC,
 ["Tokyo Shibuya & Asakusa","Mount Fuji & Hakone","Fushimi Inari & Kinkaku-ji, Kyoto","Nara deer park","Osaka Dotonbori","Shinkansen bullet train"],
 "".join([
  day(1,"Arrive Tokyo","Arrive at Narita/Haneda and transfer to your hotel. Evening at the Shibuya scramble crossing and Shinjuku.",["Airport pickup","Shibuya crossing","Shinjuku"],"Dinner","Hotel in Tokyo","Tokyo's neon nightscape",im("photo-1493976040374-85c8e12f0c0e")),
  day(2,"Tokyo City Tour","Asakusa Senso-ji temple, the Imperial Palace gardens, Meiji Shrine and the Tokyo Skytree.",["Senso-ji temple","Meiji Shrine","Tokyo Skytree"],"Breakfast","Hotel in Tokyo","Senso-ji & old Asakusa",im("photo-1540959733332-eab4deabeeaf")),
  day(3,"Mount Fuji & Hakone","Day trip to the Mount Fuji 5th Station (weather permitting), a Lake Ashi cruise and the Hakone ropeway.",["Mount Fuji 5th Station","Lake Ashi cruise","Hakone ropeway"],"Breakfast","Hotel in Tokyo","Mount Fuji up close",im("photo-1578637387939-43c525550085")),
  day(4,"Tokyo to Kyoto by Bullet Train","Ride the shinkansen to Kyoto. Afternoon at the golden Kinkaku-ji and Nijo Castle.",["Shinkansen to Kyoto","Kinkaku-ji","Nijo Castle"],"Breakfast","Hotel in Kyoto","300 km/h bullet train",im("photo-1545569341-9eb8b30979d9")),
  day(5,"Kyoto — Fushimi Inari & Arashiyama","The thousand torii of Fushimi Inari, the Arashiyama bamboo grove and the geisha lanes of Gion.",["Fushimi Inari torii","Arashiyama bamboo grove","Gion district"],"Breakfast","Hotel in Kyoto","The vermilion torii tunnel",im("photo-1528360983277-13d401cdc186")),
  day(6,"Nara Day Trip","Excursion to Nara for the bowing deer of Nara Park and the giant bronze Buddha of Todai-ji.",["Nara Park deer","Todai-ji Great Buddha","Kasuga Shrine"],"Breakfast","Hotel in Kyoto","Bowing deer & Great Buddha",im("photo-1524413840807-0c3cb6fa808d")),
  day(7,"Kyoto to Osaka","Transfer to Osaka — Osaka Castle, the Umeda Sky Building and the street food of Dotonbori.",["Osaka Castle","Umeda Sky Building","Dotonbori street food"],"Breakfast","Hotel in Osaka","Dotonbori at night",im("photo-1590559899731-a382839e5549")),
  day(8,"Departure","Transfer to Kansai International Airport for your departure flight.",["Airport transfer"],"Breakfast","N/A — Departure","Japan's golden route complete",im("photo-1493976040374-85c8e12f0c0e")),
 ]),featured=True))

# ─────────── 4. JORDAN ───────────
OUT.append(pkg(
 "Jordan Highlights — Petra, Wadi Rum & the Dead Sea","jordan-highlights-6d",
 "Jordan","jordan",
 "Six days through Jordan's greatest hits — the rose-red rock city of Petra, the desert of Wadi Rum, a float in the Dead Sea, and the Roman ruins of Jerash near Amman.",
 im("photo-1563177978-4c5ddccc10da"),
 [im("photo-1563177978-4c5ddccc10da",800,600),im("photo-1518630257714-3a3f9bb9c5a3",800,600),im("photo-1580834341580-8c17a3a630ca",800,600),im("photo-1605908502724-9093a79a1b39",800,600)],
 6,5,142000,128000,"Moderate",2,14,4.8,44,
 ["5 nights in hotels + a Wadi Rum desert camp","Daily breakfast + camp dinners","Jordan Pass (visa + Petra + 40 sites)","Petra guided tour through the Siq","Wadi Rum 4x4 jeep safari","Dead Sea resort access; all transfers"],
 EXC,
 ["Petra & the Treasury","Wadi Rum jeep safari & camp","Float in the Dead Sea","Jerash Roman ruins","Amman citadel"],
 "".join([
  day(1,"Arrive Amman — Jerash","Arrive in Amman and drive to Jerash, one of the best-preserved Roman provincial cities. Return to Amman for the citadel and city view.",["Airport pickup","Jerash Roman city","Amman Citadel"],"Dinner","Hotel in Amman","Colonnaded streets of Jerash",im("photo-1539020140153-e479b8c22e70")),
  day(2,"Amman to Petra via Mount Nebo & Madaba","Drive the King's Highway to Petra, stopping at the mosaics of Madaba and the Moses viewpoint of Mount Nebo.",["Madaba mosaics","Mount Nebo","Drive to Petra"],"Breakfast, Dinner","Hotel in Petra","First view of Wadi Musa",im("photo-1547234935-80c7145ec969")),
  day(3,"Petra — Full Day","A full day in Petra — walk the Siq to the Treasury, the Street of Facades, the Royal Tombs and climb to the Monastery.",["Petra Siq walk","The Treasury","Royal Tombs","Monastery climb"],"Breakfast","Hotel in Petra","The Treasury reveal",im("photo-1563177978-4c5ddccc10da")),
  day(4,"Petra to Wadi Rum","Drive to Wadi Rum for a 4x4 jeep safari among the red dunes and rock arches, with a night at a Bedouin desert camp.",["Wadi Rum jeep safari","Rock arches","Bedouin camp dinner","Stargazing"],"Breakfast, Dinner","Desert camp, Wadi Rum","Stars over the Valley of the Moon",im("photo-1518630257714-3a3f9bb9c5a3")),
  day(5,"Wadi Rum to the Dead Sea","Drive north to the Dead Sea, the lowest point on Earth, for an afternoon float and a mineral-mud spa.",["Drive to Dead Sea","Float in the Dead Sea","Mineral mud spa"],"Breakfast","Dead Sea resort","Floating in the Dead Sea",im("photo-1580834341580-8c17a3a630ca")),
  day(6,"Dead Sea to Amman — Departure","Morning at leisure by the sea, then transfer to Queen Alia International Airport for departure.",["Resort morning","Airport transfer"],"Breakfast","N/A — Departure","A complete Jordan in 6 days",im("photo-1563177978-4c5ddccc10da")),
 ]),featured=True))

# ─────────── 5. ICELAND ───────────
OUT.append(pkg(
 "Iceland Northern Lights & Golden Circle","iceland-northern-lights-7d",
 "Iceland","iceland",
 "Seven days circling Iceland's south — the Golden Circle's geysers and waterfalls, the south coast's black beaches and glacier lagoon, the Blue Lagoon, and winter nights chasing the Northern Lights.",
 im("photo-1504829857797-ddff29c27927"),
 [im("photo-1504829857797-ddff29c27927",800,600),im("photo-1531168556467-80aace4d0144",800,600),im("photo-1476610182048-b716b8518aae",800,600),im("photo-1490650034439-fd184c3c86a5",800,600)],
 7,6,195000,175000,"Easy",2,14,4.9,38,
 ["6 nights in 3-4 star hotels with daily breakfast","Golden Circle & south coast tours","Jokulsarlon glacier lagoon visit","Blue Lagoon entry (with transfer)","Northern Lights hunt (winter departures)","All transfers and an English-speaking guide"],
 EXC,
 ["Northern Lights hunt","Golden Circle geysers & Gullfoss","Jokulsarlon glacier lagoon","Reynisfjara black beach","Blue Lagoon spa"],
 "".join([
  day(1,"Arrive Reykjavik","Arrive at Keflavik and transfer to Reykjavik. Evening walk to the Hallgrimskirkja church and Harpa concert hall.",["Airport pickup","Hallgrimskirkja","Harpa harbour"],"Dinner","Hotel in Reykjavik","Colourful Reykjavik",im("photo-1504829857797-ddff29c27927")),
  day(2,"Golden Circle","The Thingvellir tectonic rift, the erupting Strokkur geyser and the thundering Gullfoss waterfall. Evening Northern Lights hunt.",["Thingvellir rift","Strokkur geyser","Gullfoss waterfall","Aurora hunt"],"Breakfast","Hotel in Reykjavik","Gullfoss in full flow",im("photo-1531168556467-80aace4d0144")),
  day(3,"South Coast — Waterfalls & Black Beach","Seljalandsfoss and Skogafoss waterfalls, the black-sand beach of Reynisfjara and the village of Vik.",["Seljalandsfoss","Skogafoss","Reynisfjara black beach","Vik"],"Breakfast","Hotel near Vik","Basalt columns of Reynisfjara",im("photo-1476610182048-b716b8518aae")),
  day(4,"Jokulsarlon Glacier Lagoon","Drive east to the Jokulsarlon glacier lagoon for a boat among the icebergs and the Diamond Beach. Evening aurora hunt.",["Jokulsarlon lagoon","Diamond Beach","Glacier views","Aurora hunt"],"Breakfast","Hotel near Vik","Icebergs at Jokulsarlon",im("photo-1490650034439-fd184c3c86a5")),
  day(5,"Return to Reykjavik via Hveragerdi","Drive back west, stopping at the geothermal village of Hveragerdi and the Kerid crater lake.",["Hveragerdi geothermal area","Kerid crater","Reykjavik return"],"Breakfast","Hotel in Reykjavik","Steaming earth at Hveragerdi",im("photo-1520769669658-f07657f5a307")),
  day(6,"Blue Lagoon & Reykjavik","Morning soak at the Blue Lagoon geothermal spa, afternoon to explore Reykjavik's old town and museums.",["Blue Lagoon spa","Reykjavik old town","Perlan museum"],"Breakfast","Hotel in Reykjavik","Milky-blue Blue Lagoon",im("photo-1500530855697-b586d89ba3ee")),
  day(7,"Departure","Transfer to Keflavik International Airport for your departure flight.",["Airport transfer"],"Breakfast","N/A — Departure","Fire, ice and aurora",im("photo-1504829857797-ddff29c27927")),
 ]),featured=True,
 tnote="Land cost per person; international airfare and the Schengen visa are additional. The Northern Lights are a natural phenomenon needing dark, clear winter skies — they are never guaranteed, but winter departures include multiple hunt nights. The aurora hunt does not run on summer (midnight-sun) departures."))

# ─────────── 6. FINLAND ───────────
OUT.append(pkg(
 "Finnish Lapland Northern Lights — Rovaniemi & Helsinki","finland-lapland-northern-lights-7d",
 "Finland","finland",
 "Seven days in the Finnish Arctic — Santa Claus Village on the Arctic Circle, husky and reindeer sleds, glass-igloo aurora nights in Rovaniemi, and a finish in design-led Helsinki.",
 im("photo-1483347756197-71ef80e95f73"),
 [im("photo-1483347756197-71ef80e95f73",800,600),im("photo-1518562180175-34a163b1a9a6",800,600),im("photo-1551524559-8af4e6624178",800,600),im("photo-1517783999520-f068d7431a60",800,600)],
 7,6,215000,195000,"Easy",2,12,4.9,29,
 ["6 nights incl. 1 glass-igloo / aurora cabin night","Daily breakfast + select dinners","Husky sled & reindeer sleigh safaris","Santa Claus Village visit","Snowmobile safari with aurora hunt","Helsinki city tour; Rovaniemi-Helsinki flight; thermal gear loan"],
 EXC,
 ["Glass-igloo aurora night","Husky sled safari","Reindeer sleigh ride","Santa Claus Village","Snowmobile aurora hunt","Helsinki & Suomenlinna"],
 "".join([
  day(1,"Arrive Helsinki","Arrive in Helsinki and transfer to your hotel. Evening at the Senate Square and the seafront market.",["Airport pickup","Senate Square","Market Square"],"Dinner","Hotel in Helsinki","Helsinki's white cathedral",im("photo-1551524559-8af4e6624178")),
  day(2,"Helsinki to Rovaniemi","Morning Helsinki tour and the island fortress of Suomenlinna, then fly north to Rovaniemi in Lapland.",["Suomenlinna fortress","Flight to Rovaniemi","Arctic arrival"],"Breakfast","Hotel in Rovaniemi","Crossing into the Arctic",im("photo-1483347756197-71ef80e95f73")),
  day(3,"Santa Claus Village & Husky Safari","Cross the Arctic Circle at Santa Claus Village, meet Santa, then a husky-sled safari through the snowy taiga.",["Santa Claus Village","Arctic Circle line","Husky sled safari"],"Breakfast, Lunch","Hotel in Rovaniemi","Mushing your own husky team",im("photo-1518562180175-34a163b1a9a6")),
  day(4,"Reindeer Sleigh & Glass-Igloo Aurora Night","A reindeer-sleigh ride and Sami culture by day; tonight, an aurora-cabin / glass-igloo stay to watch the Northern Lights.",["Reindeer sleigh ride","Sami culture","Glass-igloo aurora night"],"Breakfast, Dinner","Glass igloo / aurora cabin","Aurora from your bed",im("photo-1517783999520-f068d7431a60")),
  day(5,"Snowmobile Safari & Ice Activities","A snowmobile safari across frozen lakes, ice-fishing and an optional ice-floating experience, with another aurora hunt at night.",["Snowmobile safari","Ice fishing","Aurora hunt"],"Breakfast, Lunch","Hotel in Rovaniemi","Snowmobiling the frozen wild",im("photo-1491466424936-e304919aada7")),
  day(6,"Rovaniemi to Helsinki","Morning at leisure for last Arctic activities, then fly back to Helsinki for a final design-district evening.",["Flight to Helsinki","Design District"],"Breakfast","Hotel in Helsinki","Finnish design finale",im("photo-1542401886-65d6c61db217")),
  day(7,"Departure","Transfer to Helsinki Airport for your departure flight.",["Airport transfer"],"Breakfast","N/A — Departure","The ultimate Arctic winter",im("photo-1483347756197-71ef80e95f73")),
 ]),featured=True,
 tnote="A winter (Dec-Mar) Lapland programme; land cost per person, international airfare and the Schengen visa are additional. The Northern Lights are natural and weather-dependent — multiple hunt nights are built in but sightings are never guaranteed. Thermal outerwear is provided on activities."))

# ─────────── 7. EUROPE WEST ───────────
OUT.append(pkg(
 "Western Europe Grand Tour — London, Paris, Switzerland & Italy","western-europe-grand-tour-11d",
 "Europe","europe",
 "Eleven days through Western Europe's icons — London and Paris, the Swiss Alps with a cogwheel train to a glacier summit, and Italy's Venice, Florence and Rome, linked by fast trains and scenic coaches.",
 im("photo-1467269204594-9661b134dd2b"),
 [im("photo-1467269204594-9661b134dd2b",800,600),im("photo-1502602898657-3e91760cbb34",800,600),im("photo-1530122037265-a5f1f91d3b99",800,600),im("photo-1515542622106-78bda8ba0e5b",800,600)],
 11,10,260000,235000,"Easy",2,20,4.8,57,
 ["10 nights in 3-4 star central hotels with breakfast","Eurostar / fast trains and scenic coaches","London & Paris city tours","Swiss Alps cogwheel-train excursion","Venice, Florence & Rome guided sightseeing","All inter-city transfers and a tour manager"],
 EXC,
 ["London Tower Bridge & Westminster","Paris Eiffel Tower & Louvre","Swiss Alps glacier-summit train","Venice gondola & canals","Florence & Rome","Vatican & Colosseum"],
 "".join([
  day(1,"Arrive London","Arrive in London and transfer to your hotel. Evening walk along the South Bank and Westminster.",["Airport pickup","South Bank","Westminster"],"Dinner","Hotel in London","Big Ben & the Thames",im("photo-1467269204594-9661b134dd2b")),
  day(2,"London City Tour","Tower of London, Tower Bridge, Buckingham Palace and a London Eye ride.",["Tower of London","Buckingham Palace","London Eye"],"Breakfast","Hotel in London","Changing of the Guard",im("photo-1513635269975-59663e0ac1ad")),
  day(3,"London to Paris by Eurostar","Take the Eurostar under the Channel to Paris. Afternoon Seine cruise and Montmartre.",["Eurostar to Paris","Seine cruise","Montmartre"],"Breakfast","Hotel in Paris","Under the Channel to Paris",im("photo-1502602898657-3e91760cbb34")),
  day(4,"Paris City Tour","Eiffel Tower summit, the Louvre, Champs-Elysees and the Arc de Triomphe.",["Eiffel Tower","Louvre Museum","Champs-Elysees"],"Breakfast","Hotel in Paris","Top of the Eiffel Tower",im("photo-1502602898657-3e91760cbb34")),
  day(5,"Paris to Switzerland","Scenic train/coach to the Swiss Alps. Evening by Lake Lucerne or Interlaken.",["Train to Switzerland","Lake Lucerne","Alpine evening"],"Breakfast","Hotel in Lucerne / Interlaken","First Alpine lake view",im("photo-1530122037265-a5f1f91d3b99")),
  day(6,"Swiss Alps — Glacier Summit","Cogwheel train to a glacier summit (Jungfraujoch or Mt Titlis) for snow and panoramic Alpine views.",["Cogwheel mountain train","Glacier summit","Ice palace","Snow play"],"Breakfast","Hotel in Lucerne / Interlaken","Top of Europe",im("photo-1530122037265-a5f1f91d3b99")),
  day(7,"Switzerland to Venice","Travel south into Italy to Venice. Evening St Mark's Square and a first taste of the canals.",["Travel to Venice","St Mark's Square","Canal evening"],"Breakfast","Hotel in Venice / Mestre","Venice by lamplight",im("photo-1514890547357-a9ee288728e0")),
  day(8,"Venice & on to Florence","Gondola ride and Murano glass, then train to Florence, the cradle of the Renaissance.",["Gondola ride","Murano glass","Train to Florence"],"Breakfast","Hotel in Florence","Gliding the Venetian canals",im("photo-1515542622106-78bda8ba0e5b")),
  day(9,"Florence to Rome","Florence's Duomo and Ponte Vecchio, then on to Rome. Evening at the Trevi Fountain.",["Florence Duomo","Ponte Vecchio","Trevi Fountain"],"Breakfast","Hotel in Rome","Tossing a coin at the Trevi",im("photo-1515542622106-78bda8ba0e5b")),
  day(10,"Rome — Vatican & Colosseum","The Vatican Museums and St Peter's, the Colosseum and the Roman Forum.",["Vatican Museums","St Peter's Basilica","Colosseum","Roman Forum"],"Breakfast","Hotel in Rome","Inside the Colosseum",im("photo-1552832230-c0197dd311b5")),
  day(11,"Departure","Transfer to Rome Fiumicino Airport for your departure flight.",["Airport transfer"],"Breakfast","N/A — Departure","Four countries, ten nights",im("photo-1467269204594-9661b134dd2b")),
 ]),featured=True,
 tnote="Land cost per person on twin sharing; international airfare is additional. London requires a separate UK visa in addition to the Schengen visa for the European leg — we guide you through both. Itinerary order may flex with train timetables."))

# ─────────── 8. EUROPE EAST ───────────
OUT.append(pkg(
 "Eastern Europe — Prague, Vienna & Budapest","eastern-europe-prague-vienna-budapest-8d",
 "Europe","europe",
 "Eight days through the imperial heart of Central Europe — fairy-tale Prague, the palaces and coffee houses of Vienna, and Budapest straddling the Danube with its thermal baths and parliament.",
 im("photo-1541849546-216549ae216d"),
 [im("photo-1541849546-216549ae216d",800,600),im("photo-1516550893923-42d28e5677af",800,600),im("photo-1551867633-194f125695e9",800,600),im("photo-1565426873118-a17ed65d74b9",800,600)],
 8,7,175000,158000,"Easy",2,18,4.8,41,
 ["7 nights in 3-4 star central hotels with breakfast","Fast trains/coaches between the three capitals","Prague, Vienna & Budapest city tours","Vltava river cruise (Prague)","Schonbrunn Palace visit (Vienna)","Danube cruise (Budapest); all transfers"],
 EXC,
 ["Prague Old Town & Castle","Charles Bridge & astronomical clock","Vienna Schonbrunn Palace","Vienna coffee-house culture","Budapest Danube & Parliament","Szechenyi thermal baths"],
 "".join([
  day(1,"Arrive Prague","Arrive in Prague and transfer to your hotel. Evening stroll across the Charles Bridge.",["Airport pickup","Charles Bridge"],"Dinner","Hotel in Prague","Charles Bridge at dusk",im("photo-1541849546-216549ae216d")),
  day(2,"Prague City Tour","The Old Town Square and astronomical clock, Prague Castle and St Vitus Cathedral, with a Vltava river cruise.",["Old Town Square","Astronomical clock","Prague Castle","Vltava cruise"],"Breakfast","Hotel in Prague","The hilltop castle skyline",im("photo-1541849546-216549ae216d")),
  day(3,"Prague to Vienna","Train/coach to Vienna. Afternoon at the Belvedere or a Ringstrasse orientation.",["Travel to Vienna","Belvedere / Ringstrasse"],"Breakfast","Hotel in Vienna","Imperial Vienna arrival",im("photo-1516550893923-42d28e5677af")),
  day(4,"Vienna — Schonbrunn & City","The Schonbrunn Palace and gardens, St Stephen's Cathedral and a classic Viennese coffee-house stop.",["Schonbrunn Palace","St Stephen's Cathedral","Viennese coffee house"],"Breakfast","Hotel in Vienna","Schonbrunn's golden halls",im("photo-1516550893923-42d28e5677af")),
  day(5,"Vienna to Budapest","Travel to Budapest. Evening Danube cruise past the illuminated Parliament and Chain Bridge.",["Travel to Budapest","Danube cruise","Parliament by night"],"Breakfast","Hotel in Budapest","The Danube light show",im("photo-1551867633-194f125695e9")),
  day(6,"Budapest City Tour","Buda Castle, the Fisherman's Bastion and Matthias Church, then the Pest side and Heroes' Square.",["Buda Castle","Fisherman's Bastion","Matthias Church","Heroes' Square"],"Breakfast","Hotel in Budapest","Fisherman's Bastion views",im("photo-1565426873118-a17ed65d74b9")),
  day(7,"Budapest — Thermal Baths","Morning at the Szechenyi thermal baths, afternoon free for the Central Market and Andrassy Avenue.",["Szechenyi thermal baths","Central Market Hall","Andrassy Avenue"],"Breakfast","Hotel in Budapest","Soaking in the Szechenyi baths",im("photo-1551867633-194f125695e9")),
  day(8,"Departure","Transfer to Budapest Airport for your departure flight.",["Airport transfer"],"Breakfast","N/A — Departure","Three imperial capitals",im("photo-1541849546-216549ae216d")),
 ]),
 tnote="Land cost per person on twin sharing; international airfare and the Schengen visa are additional. The three capitals are linked by comfortable trains/coaches; itinerary order may flex with timetables."))

# ─────────── 9. AUSTRALIA ───────────
OUT.append(pkg(
 "Australia Highlights — Sydney, Cairns & Melbourne","australia-highlights-9d",
 "Australia","australia",
 "Nine days across Australia's best — Sydney's harbour and Opera House, the Great Barrier Reef from Cairns, and Melbourne with the Great Ocean Road, linked by domestic flights.",
 im("photo-1523482580672-f109ba8cb9be"),
 [im("photo-1523482580672-f109ba8cb9be",800,600),im("photo-1506973035872-a4ec16b8e8d9",800,600),im("photo-1524293581917-878a6d017c71",800,600),im("photo-1529108190281-9a4f620bc2d8",800,600)],
 9,8,238000,215000,"Easy",2,16,4.8,46,
 ["8 nights in 4-star hotels with breakfast","2 domestic flights (Sydney-Cairns-Melbourne)","Sydney city tour + harbour cruise","Great Barrier Reef snorkelling day","Blue Mountains day trip","Great Ocean Road tour; all transfers"],
 EXC,
 ["Sydney Opera House & Harbour","Great Barrier Reef snorkelling","Blue Mountains","Great Ocean Road & Twelve Apostles","Melbourne laneways"],
 "".join([
  day(1,"Arrive Sydney","Arrive in Sydney and transfer to your hotel. Evening at Darling Harbour.",["Airport pickup","Darling Harbour"],"Dinner","Hotel in Sydney","First harbour lights",im("photo-1523482580672-f109ba8cb9be")),
  day(2,"Sydney City & Harbour Cruise","Opera House, the Royal Botanic Garden, Bondi Beach and a Sydney Harbour lunch cruise under the bridge.",["Opera House","Bondi Beach","Harbour cruise"],"Breakfast","Hotel in Sydney","Sailing past the Opera House",im("photo-1506973035872-a4ec16b8e8d9")),
  day(3,"Blue Mountains Day Trip","Day trip to the Blue Mountains — the Three Sisters, Scenic World railway and Featherdale wildlife park.",["Three Sisters","Scenic World","Featherdale wildlife"],"Breakfast","Hotel in Sydney","The Three Sisters",im("photo-1529108190281-9a4f620bc2d8")),
  day(4,"Sydney to Cairns","Fly to tropical Cairns. Afternoon at the Esplanade lagoon and a night market.",["Flight to Cairns","Cairns Esplanade","Night market"],"Breakfast","Hotel in Cairns","Into the tropics",im("photo-1516026672322-bc52d61a55d5")),
  day(5,"Great Barrier Reef","Full-day reef cruise to an outer-reef pontoon for snorkelling over coral gardens and tropical fish.",["Reef cruise","Snorkelling","Coral gardens","Glass-bottom boat"],"Breakfast, Lunch","Hotel in Cairns","Snorkelling the Great Barrier Reef",im("photo-1524293581917-878a6d017c71")),
  day(6,"Kuranda & Daintree","The Kuranda Scenic Railway and Skyrail rainforest cableway, or an optional Daintree rainforest day.",["Kuranda Scenic Railway","Skyrail cableway","Rainforest village"],"Breakfast","Hotel in Cairns","Above the rainforest canopy",im("photo-1494233892892-84542a694e72")),
  day(7,"Cairns to Melbourne","Fly south to Melbourne. Afternoon city tour — Federation Square, the laneways and the Queen Victoria Market.",["Flight to Melbourne","Federation Square","Laneway cafes"],"Breakfast","Hotel in Melbourne","Melbourne's coffee laneways",im("photo-1514395462725-fb4566210144")),
  day(8,"Great Ocean Road","Full-day Great Ocean Road tour to the Twelve Apostles sea stacks and the Loch Ard Gorge.",["Great Ocean Road","Twelve Apostles","Loch Ard Gorge"],"Breakfast","Hotel in Melbourne","Twelve Apostles at sunset",im("photo-1529108190281-9a4f620bc2d8")),
  day(9,"Departure","Transfer to Melbourne Airport for your departure flight.",["Airport transfer"],"Breakfast","N/A — Departure","Cities, reef and coast",im("photo-1523482580672-f109ba8cb9be")),
 ]),featured=True,
 tnote="Land cost per person on twin sharing; international and the two domestic flights are additional. Great Barrier Reef trips are weather- and sea-dependent; we book reputable, certified operators. An Australian Visitor visa (subclass 600) is required."))

# ─────────── 10. NEW ZEALAND ───────────
OUT.append(pkg(
 "New Zealand Explorer — North & South Island","new-zealand-explorer-10d",
 "New Zealand","new-zealand",
 "Ten days across both New Zealand islands — Auckland, Rotorua's geysers and Hobbiton on the North Island, then Christchurch, Mount Cook, Queenstown and the Milford Sound fiords on the South.",
 im("photo-1469521669194-babb45599def"),
 [im("photo-1469521669194-babb45599def",800,600),im("photo-1507097634215-8d5e4b77c5e9",800,600),im("photo-1578645510447-e20b4311e3ce",800,600),im("photo-1504280390367-361c6d9f38f4",800,600)],
 10,9,260000,235000,"Moderate",2,14,4.9,33,
 ["9 nights in 3-4 star hotels with breakfast","Inter-island flight (Auckland-Christchurch/Queenstown)","Rotorua geothermal & Maori cultural evening","Hobbiton movie-set tour","Milford Sound nature cruise","Queenstown gondola; all coach transfers"],
 EXC,
 ["Rotorua geysers & Maori culture","Hobbiton movie set","Waitomo glow-worm caves","Mount Cook & Lake Tekapo","Milford Sound cruise","Queenstown adventures"],
 "".join([
  day(1,"Arrive Auckland","Arrive in Auckland, the City of Sails. Evening at the Viaduct Harbour and Sky Tower.",["Airport pickup","Viaduct Harbour","Sky Tower"],"Dinner","Hotel in Auckland","City of Sails skyline",im("photo-1507097634215-8d5e4b77c5e9")),
  day(2,"Auckland to Waitomo & Rotorua","Glide through the glow-worm-lit Waitomo Caves, then on to Rotorua for a Maori hangi dinner and cultural show.",["Waitomo glow-worm caves","Drive to Rotorua","Maori hangi & culture"],"Breakfast, Dinner","Hotel in Rotorua","Glow-worm cave boat ride",im("photo-1578645510447-e20b4311e3ce")),
  day(3,"Rotorua & Hobbiton","Te Puia geysers and mud pools, then the green Hobbiton movie set from the Lord of the Rings films.",["Te Puia geysers","Mud pools","Hobbiton movie set"],"Breakfast","Hotel in Rotorua","Walking through the Shire",im("photo-1469521669194-babb45599def")),
  day(4,"Fly to Christchurch","Fly to the South Island's Christchurch. Afternoon city tour — the Botanic Gardens and Re:START.",["Flight to Christchurch","Botanic Gardens","City tour"],"Breakfast","Hotel in Christchurch","Garden City of the south",im("photo-1504280390367-361c6d9f38f4")),
  day(5,"Christchurch to Lake Tekapo & Mount Cook","Drive inland to the turquoise Lake Tekapo and the Church of the Good Shepherd, beneath Aoraki/Mount Cook.",["Lake Tekapo","Church of the Good Shepherd","Mount Cook views"],"Breakfast","Hotel near Mount Cook","Turquoise Lake Tekapo",im("photo-1530789253388-582c481c54b0")),
  day(6,"Mount Cook to Queenstown","Scenic drive past Lake Pukaki to Queenstown, the adventure capital. Evening Skyline gondola and luge.",["Lake Pukaki","Drive to Queenstown","Skyline gondola"],"Breakfast","Hotel in Queenstown","Queenstown from the gondola",im("photo-1469521669194-babb45599def")),
  day(7,"Milford Sound Cruise","Full-day excursion to Milford Sound for a nature cruise past Mitre Peak and the waterfalls of the fiord.",["Milford Sound cruise","Mitre Peak","Fiord waterfalls"],"Breakfast, Lunch","Hotel in Queenstown","Mitre Peak over the fiord",im("photo-1507097634215-8d5e4b77c5e9")),
  day(8,"Queenstown — Adventure or Wine","Choose adrenaline (jetboat, bungy) or a relaxed Gibbston Valley wine and Arrowtown day.",["Shotover jetboat / bungy","Arrowtown","Gibbston Valley wine"],"Breakfast","Hotel in Queenstown","Jetboating the Shotover",im("photo-1578645510447-e20b4311e3ce")),
  day(9,"Queenstown at Leisure","A morning lake cruise on the TSS Earnslaw to Walter Peak, with the afternoon for shopping and cafes.",["TSS Earnslaw cruise","Walter Peak","Lakefront stroll"],"Breakfast","Hotel in Queenstown","Steamship across Wakatipu",im("photo-1504280390367-361c6d9f38f4")),
  day(10,"Departure","Transfer to Queenstown Airport for your departure flight.",["Airport transfer"],"Breakfast","N/A — Departure","Both islands in ten days",im("photo-1469521669194-babb45599def")),
 ]),featured=True))

# ─────────── 11. KAZAKHSTAN ───────────
OUT.append(pkg(
 "Kazakhstan — Almaty, Big Almaty Lake & Charyn Canyon","kazakhstan-almaty-5d",
 "Kazakhstan","kazakhstan",
 "A five-day Almaty escape — the turquoise Big Almaty Lake, the red cliffs of Charyn Canyon, the Shymbulak cable car and the leafy city itself, an easy short-haul break from India.",
 im("photo-1596306499317-8490232098fa"),
 [im("photo-1596306499317-8490232098fa",800,600),im("photo-1605281317010-fe5ffe798166",800,600),im("photo-1518684079-3c830dcef090",800,600),im("photo-1490650034439-fd184c3c86a5",800,600)],
 5,4,52000,46500,"Easy",2,15,4.7,36,
 ["4 nights in a 3-4 star Almaty hotel with breakfast","Big Almaty Lake half-day tour","Charyn Canyon full-day excursion","Shymbulak & Kok-Tobe cable cars","Almaty city tour; all transfers"],
 EXC,
 ["Big Almaty Lake","Charyn Canyon","Shymbulak cable car","Kok-Tobe & Medeu","Almaty Green Bazaar"],
 "".join([
  day(1,"Arrive Almaty","Arrive in Almaty and transfer to your hotel. Evening at Kok-Tobe hill by cable car for city views.",["Airport pickup","Kok-Tobe cable car","City views"],"Dinner","Hotel in Almaty","Almaty from Kok-Tobe",im("photo-1596306499317-8490232098fa")),
  day(2,"Big Almaty Lake & City Tour","Drive up to the turquoise Big Almaty Lake, then a city tour — Panfilov Park, Zenkov Cathedral and the Green Bazaar.",["Big Almaty Lake","Panfilov Park","Zenkov Cathedral","Green Bazaar"],"Breakfast","Hotel in Almaty","Turquoise Big Almaty Lake",im("photo-1605281317010-fe5ffe798166")),
  day(3,"Charyn Canyon","Full-day excursion to Charyn Canyon, hiking the red-rock Valley of Castles.",["Charyn Canyon","Valley of Castles hike","Charyn River"],"Breakfast, Lunch","Hotel in Almaty","The Valley of Castles",im("photo-1490650034439-fd184c3c86a5")),
  day(4,"Shymbulak & Medeu","Cable car to the Shymbulak mountain resort and the high-altitude Medeu skating rink in the Tien Shan.",["Medeu skating rink","Shymbulak cable car","Tien Shan views"],"Breakfast","Hotel in Almaty","Above Almaty at Shymbulak",im("photo-1518684079-3c830dcef090")),
  day(5,"Departure","Transfer to Almaty International Airport for your departure flight.",["Airport transfer"],"Breakfast","N/A — Departure","Mountains, lake and city",im("photo-1596306499317-8490232098fa")),
 ])))

# ─────────── 12. UZBEKISTAN ───────────
OUT.append(pkg(
 "Uzbekistan Silk Road — Tashkent, Samarkand, Bukhara & Khiva","uzbekistan-silk-road-8d",
 "Uzbekistan","uzbekistan",
 "Eight days along the Silk Road — Tashkent's metro and bazaars, the mosaic madrasas of Samarkand's Registan, the ancient lanes of Bukhara and the walled medieval town of Khiva.",
 im("photo-1602523961757-3c4f9d2f6a8c"),
 [im("photo-1602523961757-3c4f9d2f6a8c",800,600),im("photo-1601921004897-c6e16a3a1c63",800,600),im("photo-1564507592333-c60657eea523",800,600),im("photo-1539020140153-e479b8c22e70",800,600)],
 8,7,70000,62000,"Easy",2,16,4.8,31,
 ["7 nights in 3-4 star hotels with breakfast","Afrosiyob high-speed train tickets","Tashkent, Samarkand, Bukhara & Khiva tours","Domestic flight Urgench-Tashkent","English-speaking guide on tour days","All transfers"],
 EXC,
 ["Samarkand Registan","Shah-i-Zinda & Gur-e-Amir","Bukhara old city & the Ark","Khiva Itchan Kala","Tashkent bazaars","Silk Road train"],
 "".join([
  day(1,"Arrive Tashkent","Arrive in Tashkent and transfer to your hotel. Evening orientation of the modern capital.",["Airport pickup","City orientation"],"Dinner","Hotel in Tashkent","Silk Road gateway",im("photo-1539020140153-e479b8c22e70")),
  day(2,"Tashkent City & Train to Samarkand","Tashkent's Khast Imam complex and Chorsu Bazaar, then the Afrosiyob high-speed train to Samarkand.",["Khast Imam","Chorsu Bazaar","Tashkent metro","Train to Samarkand"],"Breakfast","Hotel in Samarkand","The bullet train to Samarkand",im("photo-1564507592333-c60657eea523")),
  day(3,"Samarkand — Registan & Tombs","The Registan's three mosaic madrasas, the Gur-e-Amir tomb of Timur and the Bibi-Khanym mosque.",["Registan Square","Gur-e-Amir","Bibi-Khanym Mosque"],"Breakfast","Hotel in Samarkand","The Registan at golden hour",im("photo-1602523961757-3c4f9d2f6a8c")),
  day(4,"Samarkand — Shah-i-Zinda & on to Bukhara","The Shah-i-Zinda avenue of mausoleums and Ulugh Beg's observatory, then drive/train to Bukhara.",["Shah-i-Zinda","Ulugh Beg Observatory","Travel to Bukhara"],"Breakfast","Hotel in Bukhara","Tiled tombs of Shah-i-Zinda",im("photo-1601921004897-c6e16a3a1c63")),
  day(5,"Bukhara Old City","The Ark fortress, the Kalyan minaret and mosque, the trading domes and the Lyabi-Hauz pool.",["The Ark fortress","Kalyan Minaret","Trading domes","Lyabi-Hauz"],"Breakfast","Hotel in Bukhara","The Kalyan Minaret",im("photo-1601921004897-c6e16a3a1c63")),
  day(6,"Bukhara to Khiva","Drive across the Kyzylkum desert to Khiva, the walled caravan town. Evening within the Itchan Kala walls.",["Kyzylkum desert drive","Khiva arrival","Itchan Kala by night"],"Breakfast","Hotel in Khiva","Sunset over the Itchan Kala",im("photo-1564507592333-c60657eea523")),
  day(7,"Khiva & Fly to Tashkent","Tour the open-air museum of Itchan Kala, then fly from Urgench back to Tashkent.",["Itchan Kala museum-city","Kalta Minor minaret","Flight to Tashkent"],"Breakfast","Hotel in Tashkent","The walled town of Khiva",im("photo-1539020140153-e479b8c22e70")),
  day(8,"Departure","Transfer to Tashkent International Airport for your departure flight.",["Airport transfer"],"Breakfast","N/A — Departure","The full Silk Road",im("photo-1602523961757-3c4f9d2f6a8c")),
 ])))

# insert before the packages array close (tail looks like "  },\n\n]\n")
anchor = c.rfind('\n  },\n')
# find the array-closing ] after that anchor
close = c.find(']', anchor)
insert_pos = anchor + len('\n  },\n')
c = c[:insert_pos] + "".join(OUT) + c[insert_pos:]
open(PATH,'w',encoding='utf-8').write(c)
print("Packages added:", len(OUT), "| close bracket at", close)
