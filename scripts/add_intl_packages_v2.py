# -*- coding: utf-8 -*-
"""
Bulk-add international packages so every international destination reaches >=3
packages. Routes sourced from the client's "Itinerary routes (8).docx" where
present, else from travellive.in / general curation. Pricing is INDICATIVE
(per-person twin-sharing, land-only) pending the client's confirmed rates -
each carries a transparencyNote, matching the existing international packages.

Reuses each destination's own heroImage + galleryImages (already in
destinations.ts) so there are no new/broken image dependencies.

Run:  python scripts/add_intl_packages_v2.py
"""
import re, io, sys

ROOT = "src/data"
DEST = ROOT + "/destinations.ts"
PKGS = ROOT + "/packages.ts"

# ---- read destination images ------------------------------------------------
dsrc = io.open(DEST, encoding="utf-8").read()

def dest_images(slug):
    """Return (heroImage, [gallery...]) for a destination slug.
    Bounded to the destination's own object so a gallery-less entry never
    borrows a later destination's images. Falls back to [heroImage]."""
    start = dsrc.find('slug: "%s",' % slug)
    if start == -1:
        return None, []
    nxt = dsrc.find('slug: "', start + 8)
    block = dsrc[start: nxt if nxt != -1 else len(dsrc)]
    hm = re.search(r'heroImage:\s*"([^"]+)"', block)
    if not hm:
        return None, []
    hero = hm.group(1)
    gm = re.search(r'galleryImages: \[(.*?)\]', block, re.S)
    gal = re.findall(r'"([^"]+)"', gm.group(1)) if gm else [hero]
    return hero, (gal or [hero])

STD_INCL = [
    "{nights} nights accommodation",
    "Daily breakfast",
    "Airport transfers",
    "Guided sightseeing as per the itinerary",
    "All ground transport on tour",
]
STD_EXCL = [
    "International airfare unless specified",
    "Visa fees and travel insurance",
    "Lunches and dinners unless mentioned",
    "Optional activities and personal expenses",
    "Tips and gratuities",
    "Anything not listed under inclusions",
]
NOTE = ("Pricing is indicative - per person on twin-sharing, land-only, and pending final "
        "hotel selection and travel dates. Share your dates and we'll confirm an exact quote. "
        "International airfare and visa fees are additional.")

# ---- package data (first batch: client-named priority destinations) ---------
# Each: (slug, destName, destSlug, title, nights, price, disc, difficulty, [highlights], [(dayTitle, dayDesc, highlight)])
DATA = [
 # ---------------- SOUTH AFRICA ----------------
 ("south-africa-cape-winelands-6n","South Africa","south-africa","Cape Town & the Winelands",6,118000,105000,"Easy",
  ["Table Mountain cableway","Cape Peninsula & Boulders penguins","Cape Winelands tasting","V&A Waterfront","Stellenbosch & Franschhoek"],
  [("Arrive Cape Town","Arrive in Cape Town and transfer to your hotel; evening free along the V&A Waterfront.","Mother City welcome"),
   ("Table Mountain & City","Cableway up Table Mountain, then a city tour - Company's Garden, Bo-Kaap and the waterfront.","Table Mountain"),
   ("Cape Peninsula","Full-day Cape Point drive - Chapman's Peak, the Cape of Good Hope and the Boulders Beach penguins.","Cape of Good Hope"),
   ("Cape Winelands","Day trip to Stellenbosch and Franschhoek for cellar tours and wine tasting.","Winelands tasting"),
   ("Leisure / Optional","Free day - optional Robben Island ferry, Kirstenbosch gardens or a helicopter flip.","Your day, your pace"),
   ("Cape Town - Departure","A final morning by the bay before your transfer to the airport.","Farewell Cape Town")]),
 ("south-africa-kruger-garden-route-8n","South Africa","south-africa","Kruger Safari & the Garden Route",8,162000,148000,"Easy",
  ["Big Five at Kruger","Garden Route drive","Knysna lagoon & Tsitsikamma","Cango Caves & Oudtshoorn","Cape Town finish"],
  [("Arrive Johannesburg","Arrive in Johannesburg and connect towards the Greater Kruger; check in to your safari lodge.","Into safari country"),
   ("Kruger - Full Day","Dawn and afternoon game drives in open 4x4s in search of the Big Five.","Big Five tracking"),
   ("Kruger to Garden Route","Morning drive, then fly south and begin the Garden Route at George/Knysna.","Scenic transition"),
   ("Knysna & Tsitsikamma","Knysna Heads and lagoon, then Tsitsikamma forest and the Storms River suspension bridge.","Knysna lagoon"),
   ("Oudtshoorn & Cango Caves","Cango Caves and an ostrich farm in the Klein Karoo, then on towards the coast.","Cango Caves"),
   ("Drive to Cape Town","Coastal drive along the Garden Route into Cape Town.","Coast to the Cape"),
   ("Cape Town Highlights","Table Mountain cableway and a Cape Peninsula taste - waterfront evening.","Table Mountain"),
   ("Cape Town - Departure","Transfer to the airport for your onward flight.","Two iconic halves, one trip")]),
 # ---------------- KENYA ----------------
 ("kenya-masai-mara-express-4n","Kenya","kenya","Masai Mara Express",4,96000,86000,"Easy",
  ["Masai Mara big cats","Great Rift Valley drive","Maasai village visit","Game drives in 4x4","Nairobi gateway"],
  [("Arrive Nairobi","Arrive in Nairobi and transfer to your hotel; optional Giraffe Centre or elephant orphanage.","Gateway to safari"),
   ("Nairobi to Masai Mara","Drive through the Great Rift Valley to the Mara with an afternoon game drive on arrival.","First big-cat sighting"),
   ("Masai Mara - Full Day","A full day of game drives across the plains for lion, cheetah and leopard, plus a Maasai village visit.","Lions on the savannah"),
   ("Mara to Nairobi - Departure","A dawn game drive, then drive back to Nairobi for your departure flight.","The Mara in a long weekend")]),
 ("kenya-mara-mombasa-beach-8n","Kenya","kenya","Kenya Safari & Mombasa Beach",8,168000,152000,"Easy",
  ["Masai Mara & Amboseli","Elephants under Kilimanjaro","Diani / Mombasa beach","Indian Ocean dhow cruise","Safari + sea combo"],
  [("Arrive Nairobi","Arrive in Nairobi and transfer to your hotel.","Karibu Kenya"),
   ("Nairobi to Amboseli","Drive to Amboseli National Park; evening game drive among the elephant herds.","Elephants under Kilimanjaro"),
   ("Amboseli to Masai Mara","Long scenic transfer to the Masai Mara with an afternoon drive on arrival.","Into big-cat country"),
   ("Masai Mara - Full Day","Full-day game drives and a Maasai village visit on the open plains.","Great cats of the Mara"),
   ("Fly to the Coast","Light-aircraft hop to Mombasa and transfer to a Diani beach resort.","Bush to beach"),
   ("Diani Beach","Free day on the white sand - swim, snorkel the reef or simply relax.","Indian Ocean white sand"),
   ("Mombasa & Dhow Cruise","Mombasa old town and Fort Jesus, then a sunset dhow cruise.","Swahili coast"),
   ("Mombasa - Departure","Transfer to the airport for your onward flight.","Safari and sea in one trip")]),
 # ---------------- JORDAN ----------------
 ("jordan-petra-wadi-rum-4n","Jordan","jordan","Petra & Wadi Rum Short Break",4,92000,82000,"Easy",
  ["Petra the Rose City","Wadi Rum desert camp","Amman city","Jeep safari & stargazing","Bedouin hospitality"],
  [("Arrive Amman","Arrive in Amman and transfer to your hotel; evening at leisure.","Capital welcome"),
   ("Amman to Petra","Drive south via the King's Highway to Petra; evening at leisure near the site.","Towards the Rose City"),
   ("Petra Full Day","Walk the Siq to the Treasury and explore the Monastery, tombs and the ancient Nabataean city.","Petra the Rose City"),
   ("Wadi Rum & Departure","A Wadi Rum jeep safari among the red dunes, then transfer for departure.","Desert of Lawrence")]),
 ("jordan-dead-sea-discovery-7n","Jordan","jordan","Jordan & Dead Sea Discovery",7,142000,128000,"Easy",
  ["Jerash Roman ruins","Petra & Wadi Rum","Float in the Dead Sea","Mount Nebo & Madaba","Aqaba Red Sea"],
  [("Arrive Amman","Arrive in Amman and transfer to your hotel.","Welcome to Jordan"),
   ("Amman & Jerash","City highlights and the citadel, then the Roman ruins of Jerash.","Roman colonnades"),
   ("Madaba, Mount Nebo & Dead Sea","Madaba mosaics and Mount Nebo, then check in at the Dead Sea.","Float on the Dead Sea"),
   ("Dead Sea to Petra","Drive the Dead Sea Highway to Petra via Wadi Mujib viewpoints.","Towards Petra"),
   ("Petra Full Day","The Siq, the Treasury and the high Monastery trail in the Rose City.","Petra the Rose City"),
   ("Wadi Rum","Jeep safari across the red desert with a night in a Bedouin camp.","Desert camp & stars"),
   ("Aqaba - Departure","Red Sea time in Aqaba, then transfer for your onward flight.","Red Sea finish")]),
 # ---------------- ICELAND ----------------
 ("iceland-ring-road-9n","Iceland","iceland","Iceland Ring Road Self-Drive",9,235000,212000,"Moderate",
  ["Golden Circle","South Coast waterfalls & black sand","Jokulsarlon glacier lagoon","Lake Myvatn & Akureyri","Snaefellsnes peninsula"],
  [("Arrive Reykjavik","Arrive at Keflavik, collect your car and settle into Reykjavik; optional Blue Lagoon.","Land of fire and ice"),
   ("Golden Circle","Thingvellir, the Geysir hot springs and Gullfoss waterfall.","Golden Circle"),
   ("South Coast","Seljalandsfoss and Skogafoss waterfalls and the Reynisfjara black-sand beach.","Black-sand coast"),
   ("Glacier Lagoon","Vatnajokull views, Jokulsarlon glacier lagoon and Diamond Beach.","Jokulsarlon icebergs"),
   ("East Fjords","Drive the dramatic East Fjords to Egilsstadir.","Quiet eastern fjords"),
   ("Lake Myvatn","Myvatn geothermal area, Dettifoss and the Myvatn nature baths.","Geothermal Myvatn"),
   ("Akureyri & North","Akureyri, Godafoss waterfall and optional Husavik whale watching.","Capital of the north"),
   ("Snaefellsnes","The Snaefellsnes peninsula - Kirkjufell, lava fields and fishing villages.","Iceland in miniature"),
   ("Reykjavik - Departure","Return to Reykjavik and the airport for departure.","Full circle of Iceland")]),
 ("iceland-reykjavik-golden-circle-4n","Iceland","iceland","Reykjavik & Golden Circle Short Break",4,138000,124000,"Easy",
  ["Golden Circle","Blue Lagoon","South Coast day trip","Reykjavik city","Northern Lights chance"],
  [("Arrive Reykjavik","Arrive at Keflavik and transfer to Reykjavik; evening at leisure.","Reykjavik welcome"),
   ("Golden Circle","Thingvellir National Park, Geysir and Gullfoss on a classic loop.","Golden Circle"),
   ("South Coast","Seljalandsfoss, Skogafoss and the Reynisfjara black-sand beach.","Waterfalls & black sand"),
   ("Blue Lagoon - Departure","A Blue Lagoon soak before your airport transfer (aurora hunt the night before, season permitting).","Blue Lagoon farewell")]),
 # ---------------- FINLAND (Northern Lights) ----------------
 ("finland-rovaniemi-arctic-5n","Finland","finland","Rovaniemi Arctic & Santa",5,178000,162000,"Easy",
  ["Santa Claus Village","Husky & reindeer sledding","Northern Lights hunt","Arctic Circle","Snowmobile safari"],
  [("Arrive Rovaniemi","Arrive in Rovaniemi on the Arctic Circle and transfer to your hotel.","On the Arctic Circle"),
   ("Santa Claus Village","Cross the Arctic Circle line, meet Santa and post a card from the Arctic post office.","Santa Claus Village"),
   ("Husky & Reindeer","Husky-sled ride and a reindeer farm visit with a local Sami welcome.","Husky sledding"),
   ("Snowmobile & Aurora","Daytime snowmobile safari and an evening Northern Lights hunt.","Aurora chase"),
   ("Rovaniemi - Departure","Free morning, then transfer to the airport.","Arctic farewell")]),
 ("finland-helsinki-lakeland-6n","Finland","finland","Helsinki & Finnish Lakeland",6,168000,152000,"Easy",
  ["Helsinki design & harbour","Porvoo old town","Finnish Lakeland","Tampere & saunas","Suomenlinna sea fortress"],
  [("Arrive Helsinki","Arrive in Helsinki and transfer to your hotel; evening by the harbour.","Baltic capital"),
   ("Helsinki City","Senate Square, the Rock Church and the Suomenlinna sea fortress.","Design capital"),
   ("Porvoo Day Trip","The riverside old town of Porvoo with its red shore houses.","Porvoo old town"),
   ("Into the Lakeland","Travel to the Finnish Lakeland - lakeside cabins and authentic saunas.","Land of a thousand lakes"),
   ("Tampere & Lakes","Tampere highlights and a lake cruise through Finland's heartland.","Lakeside Finland"),
   ("Helsinki - Departure","Return to Helsinki for your onward flight.","Calm northern farewell")]),
 # ---------------- AUSTRALIA ----------------
 ("australia-sydney-reef-7n","Australia","australia","Sydney & the Great Barrier Reef",7,225000,205000,"Easy",
  ["Sydney Opera House & Harbour","Bondi & Blue Mountains","Great Barrier Reef snorkel","Cairns & Kuranda rainforest","Outer reef cruise"],
  [("Arrive Sydney","Arrive in Sydney and transfer to your hotel; evening at Circular Quay.","Harbour city"),
   ("Sydney City","Opera House, the Harbour Bridge, the Rocks and Bondi Beach.","Opera House & Bondi"),
   ("Blue Mountains","Day trip to the Blue Mountains - Three Sisters, Scenic World and Leura.","Three Sisters"),
   ("Fly to Cairns","Fly north to Cairns, gateway to the reef and rainforest.","Tropical north"),
   ("Great Barrier Reef","Full-day outer-reef cruise with snorkelling over the coral gardens.","Great Barrier Reef"),
   ("Kuranda Rainforest","Skyrail and scenic railway to Kuranda village in the rainforest.","Rainforest canopy"),
   ("Cairns - Departure","Free morning, then transfer to the airport.","Reef and harbour")]),
 ("australia-east-coast-9n","Australia","australia","East Coast: Sydney, Gold Coast & Melbourne",9,255000,232000,"Easy",
  ["Sydney icons","Gold Coast beaches & theme parks","Melbourne laneways","Great Ocean Road","Phillip Island penguins"],
  [("Arrive Sydney","Arrive in Sydney and transfer to your hotel.","Welcome down under"),
   ("Sydney City","Opera House, Harbour Bridge, the Rocks and a harbour cruise.","Sydney icons"),
   ("Sydney to Gold Coast","Fly to the Gold Coast; afternoon on Surfers Paradise beach.","Surfers Paradise"),
   ("Gold Coast Theme Parks","A day at the theme parks or hinterland rainforest at your choice.","Family fun"),
   ("Fly to Melbourne","Fly to Melbourne; explore the laneways, arcades and Federation Square.","Laneway culture"),
   ("Great Ocean Road","Day trip to the Twelve Apostles along the Great Ocean Road.","Twelve Apostles"),
   ("Phillip Island","Phillip Island wildlife and the evening penguin parade.","Penguin parade"),
   ("Melbourne Leisure","Free day - Yarra Valley wine, the MCG or Queen Victoria Market.","Your Melbourne day"),
   ("Melbourne - Departure","Transfer to the airport for your onward flight.","Three cities, one coast")]),
 # ---------------- NEW ZEALAND ----------------
 ("new-zealand-north-island-6n","New Zealand","new-zealand","North Island Highlights",6,205000,186000,"Easy",
  ["Auckland City of Sails","Hobbiton movie set","Rotorua geothermal & Maori culture","Waitomo glow-worm caves","Agrodome farm"],
  [("Arrive Auckland","Arrive in Auckland and transfer to your hotel; optional Sky Tower.","City of Sails"),
   ("Auckland City","Harbour, Mission Bay and the Sky Tower, or an optional Waiheke Island wine trip.","Auckland highlights"),
   ("Waitomo & Hobbiton","Glow-worm caves at Waitomo and the Hobbiton movie set near Matamata.","Hobbiton & glow-worms"),
   ("Rotorua Geothermal","Te Puia geysers, mud pools and a Maori cultural evening with a hangi feast.","Geysers & Maori culture"),
   ("Rotorua Adventure","Agrodome farm show, the Redwoods or an optional luge and zorb day.","Kiwi farm life"),
   ("Auckland - Departure","Return to Auckland for your onward flight.","North Island farewell")]),
 ("new-zealand-south-island-8n","New Zealand","new-zealand","South Island Scenic",8,245000,224000,"Moderate",
  ["Christchurch & Tekapo","Mount Cook","Queenstown adventure","Milford Sound cruise","Franz Josef glacier"],
  [("Arrive Christchurch","Arrive in Christchurch and transfer to your hotel.","Garden city"),
   ("Tekapo & Mount Cook","Lake Tekapo's turquoise water and the Church of the Good Shepherd, then Aoraki/Mount Cook.","Mount Cook"),
   ("To Queenstown","Scenic drive to Queenstown via Lindis Pass and the Kawarau gorge.","Adventure capital"),
   ("Milford Sound","Full-day trip to Milford Sound with a fiord cruise past Mitre Peak.","Milford Sound"),
   ("Queenstown Adventure","Free day - jet boat, gondola, Arrowtown or a Lord of the Rings tour.","Your adventure day"),
   ("Queenstown to Glaciers","Drive over the Haast Pass towards the West Coast glaciers.","Wild West Coast"),
   ("Franz Josef Glacier","Franz Josef glacier valley walk or an optional heli-hike.","Franz Josef ice"),
   ("Christchurch - Departure","Return towards Christchurch for your onward flight.","Scenic South Island")]),
 # ---------------- EUROPE (West & East) ----------------
 ("europe-switzerland-italy-10d","Europe","europe","Switzerland & Italy Grand",9,278000,255000,"Easy",
  ["Zurich & Lucerne","Mt Titlis / Jungfrau","Lake Como","Venice canals","Rome & Vatican"],
  [("Arrive Zurich","Arrive in Zurich and transfer to your hotel; evening by the lake.","Swiss welcome"),
   ("Lucerne & Mt Titlis","Lucerne's Chapel Bridge and a cable-car ascent of Mt Titlis or Pilatus.","Snowy summits"),
   ("Interlaken & Jungfrau","Interlaken and an optional Jungfraujoch - the Top of Europe - by cog railway.","Top of Europe"),
   ("Swiss to Italian Lakes","Scenic drive to Lake Como with a lakeside evening.","Lake Como"),
   ("Milan & to Venice","Milan's Duomo and galleria, then travel to Venice.","Milan style"),
   ("Venice","St Mark's Square, a gondola ride and the canals of Venice.","Venice canals"),
   ("Venice to Florence/Rome","Travel south towards Rome via the Italian countryside.","Towards the eternal city"),
   ("Rome & Vatican","Colosseum, Roman Forum, Trevi Fountain and St Peter's Basilica.","Rome & Vatican"),
   ("Rome - Departure","A final espresso, then transfer to the airport.","Alps to the eternal city")]),
 # ---------------- BALI ----------------
 ("bali-honeymoon-villa-escape-6n","Bali","bali","Bali Honeymoon Villa Escape",6,78000,70000,"Easy",
  ["Private pool villa","Ubud rice terraces & temples","Nusa Dua beaches","Uluwatu sunset & Kecak dance","Romantic floating breakfast"],
  [("Arrive Bali","Arrive in Denpasar and transfer to your Seminyak villa; evening at leisure.","Island of the gods"),
   ("Seminyak & Tanah Lot","Beach time in Seminyak and a sunset at the Tanah Lot sea temple.","Tanah Lot sunset"),
   ("Ubud Day","Tegalalang rice terraces, the sacred monkey forest and Ubud art markets.","Ubud rice terraces"),
   ("Uluwatu & Kecak","Uluwatu clifftop temple with the evening Kecak fire dance.","Uluwatu sunset"),
   ("Nusa Dua Leisure","Transfer to Nusa Dua for beach and optional water sports at Tanjung Benoa.","Nusa Dua beaches"),
   ("Bali - Departure","A final morning by the pool, then transfer to the airport.","Honeymoon farewell")]),
 # ---------------- DUBAI ----------------
 ("dubai-short-break-4n","Dubai","dubai-uae","Dubai Short Break",4,62000,56000,"Easy",
  ["Burj Khalifa At The Top","Desert safari with BBQ","Dubai Marina dhow cruise","Old Dubai & gold souk","Dubai Mall & fountains"],
  [("Arrive Dubai","Arrive in Dubai and transfer to your hotel; evening at the Dubai Mall fountains.","City of gold"),
   ("Dubai City & Burj Khalifa","Modern and old Dubai city tour with At The Top of the Burj Khalifa.","Burj Khalifa"),
   ("Desert Safari","Dune-bashing desert safari with a camp BBQ dinner and cultural show.","Desert safari"),
   ("Marina Cruise - Departure","Dubai Marina dhow cruise, then transfer to the airport.","Marina farewell")]),
 # ---------------- HONG KONG ----------------
 ("hong-kong-disney-family-5n","Hong Kong","hong-kong","Hong Kong & Disneyland Family",5,88000,80000,"Easy",
  ["Hong Kong Disneyland","Ocean Park","Victoria Peak tram","Symphony of Lights","Star Ferry & Avenue of Stars"],
  [("Arrive Hong Kong","Arrive in Hong Kong and transfer to your hotel; evening Symphony of Lights.","Dazzling skyline"),
   ("City & Victoria Peak","Peak Tram to Victoria Peak, Repulse Bay and Stanley Market.","Victoria Peak"),
   ("Disneyland Full Day","A full day at Hong Kong Disneyland with its themed lands and parade.","Disneyland magic"),
   ("Ocean Park","Ocean Park rides, aquarium and the cable car over the headland.","Ocean Park"),
   ("Hong Kong - Departure","Star Ferry and the Avenue of Stars, then transfer to the airport.","Harbour farewell")]),
 # ---------------- MALAYSIA ----------------
 ("malaysia-kl-genting-4n","Malaysia","malaysia","Kuala Lumpur & Genting Highlands",4,52000,47000,"Easy",
  ["Petronas Twin Towers","Batu Caves","Genting Highlands cable car","KL city tour","Theme park fun"],
  [("Arrive Kuala Lumpur","Arrive in KL and transfer to your hotel; evening at the KLCC park fountains.","Towers and lights"),
   ("KL City & Batu Caves","Petronas Towers photo stop, the National Mosque and the colourful Batu Caves.","Batu Caves"),
   ("Genting Highlands","Cable car up to Genting Highlands for cool air, casino resort and indoor attractions.","Genting cable car"),
   ("KL - Departure","Free morning for shopping at Bukit Bintang, then transfer to the airport.","City farewell")]),
 ("malaysia-borneo-kota-kinabalu-5n","Malaysia","malaysia","Borneo: Kota Kinabalu & Islands",5,72000,65000,"Easy",
  ["Tunku Abdul Rahman islands","Mount Kinabalu foothills","Sunset river cruise & fireflies","Manukan snorkelling","Borneo rainforest"],
  [("Arrive Kota Kinabalu","Arrive in Kota Kinabalu (Sabah) and transfer to your hotel; sunset at the waterfront.","Gateway to Borneo"),
   ("Island Hopping","Boat to the Tunku Abdul Rahman marine park for snorkelling at Manukan and Sapi.","Coral islands"),
   ("Kinabalu Park","Day trip to the Mount Kinabalu foothills, Poring hot springs and a canopy walk.","Mount Kinabalu"),
   ("River Cruise & Fireflies","Klias wetland river safari with proboscis monkeys and an evening firefly display.","Fireflies cruise"),
   ("Kota Kinabalu - Departure","Free morning, then transfer to the airport.","Borneo farewell")]),
 # ---------------- PHILIPPINES ----------------
 ("philippines-palawan-el-nido-5n","Philippines","philippines","Palawan & El Nido",5,78000,70000,"Easy",
  ["El Nido island hopping","Big & Small Lagoons","Bacuit Bay limestone cliffs","Hidden beaches & snorkelling","Puerto Princesa underground river"],
  [("Arrive Puerto Princesa","Arrive in Puerto Princesa, Palawan, and transfer to your hotel.","Last frontier"),
   ("Underground River","UNESCO Puerto Princesa subterranean river tour and the city highlights.","Underground river"),
   ("Drive to El Nido","Scenic drive north to El Nido on Bacuit Bay; evening at leisure.","Bacuit Bay"),
   ("El Nido Island Hopping","Boat tour of the Big and Small Lagoons, hidden beaches and snorkel spots.","Big Lagoon"),
   ("El Nido - Departure","A final beach morning, then transfer for your onward flight.","Island paradise")]),
 ("philippines-cebu-bohol-5n","Philippines","philippines","Cebu & Bohol Islands",5,75000,68000,"Easy",
  ["Chocolate Hills","Tarsier sanctuary","Loboc river cruise","Cebu city heritage","Island & reef snorkelling"],
  [("Arrive Cebu","Arrive in Cebu and transfer to your hotel; Mactan beach evening.","Queen city of the south"),
   ("Cebu City Tour","Magellan's Cross, Basilica del Santo Nino and Fort San Pedro.","Cebu heritage"),
   ("Ferry to Bohol","Fast ferry to Bohol; the Chocolate Hills and a Loboc river-cruise lunch.","Chocolate Hills"),
   ("Bohol Nature","Tarsier sanctuary, the man-made forest and an optional Balicasag snorkel.","Tiny tarsiers"),
   ("Cebu - Departure","Return to Cebu for your onward flight.","Island farewell")]),
 # ---------------- AZERBAIJAN ----------------
 ("azerbaijan-baku-gabala-5n","Azerbaijan","azerbaijan","Baku & Gabala Getaway",5,68000,61000,"Easy",
  ["Baku old city & Flame Towers","Gabala mountain resort","Mud volcanoes & Gobustan","Heydar Aliyev Center","Tufandag cable car"],
  [("Arrive Baku","Arrive in Baku on the Caspian and transfer to your hotel; evening boulevard walk.","Land of fire"),
   ("Baku City","Walled old city, Maiden Tower, the Flame Towers and the Heydar Aliyev Center.","Flame Towers"),
   ("Gobustan & Mud Volcanoes","Gobustan petroglyphs, the bubbling mud volcanoes and the fire temple Ateshgah.","Mud volcanoes"),
   ("Gabala","Drive to the Gabala mountain resort with the Tufandag cable car and lakes.","Caucasus mountains"),
   ("Baku - Departure","Return to Baku for last-minute shopping, then transfer to the airport.","Caspian farewell")]),
 ("azerbaijan-baku-sheki-gabala-7n","Azerbaijan","azerbaijan","Baku, Sheki & Gabala Grand",7,88000,80000,"Easy",
  ["Baku old city","Sheki Khan's Palace","Caravanserai stay","Gabala & Tufandag","Caucasus countryside"],
  [("Arrive Baku","Arrive in Baku and transfer to your hotel.","Welcome to Azerbaijan"),
   ("Baku City","Old city, Maiden Tower, Flame Towers and the seaside boulevard.","Old meets new"),
   ("Gobustan & Absheron","Gobustan rock art, mud volcanoes and the Absheron peninsula fire sites.","Ancient fire land"),
   ("Drive to Sheki","Scenic Caucasus drive to Sheki, stopping at the Diri Baba mausoleum.","Into the mountains"),
   ("Sheki","Sheki Khan's Palace, the old caravanserai and the silk-route bazaar.","Khan's Palace"),
   ("Gabala","Travel to Gabala for the Tufandag cable car, Nohur Lake and waterfalls.","Mountain resort"),
   ("Baku - Departure","Return to Baku for your onward flight.","Grand Caucasus farewell")]),
 # ---------------- KAZAKHSTAN ----------------
 ("kazakhstan-astana-almaty-7n","Kazakhstan","kazakhstan","Astana & Almaty Discovery",7,92000,84000,"Easy",
  ["Futuristic Astana skyline","Bayterek Tower","Almaty & Medeu","Shymbulak mountains","Big Almaty Lake"],
  [("Arrive Astana","Arrive in Astana (Nur-Sultan) and transfer to your hotel.","Capital of the steppe"),
   ("Astana City","Bayterek Tower, the Khan Shatyr tent and the modern government quarter.","Futuristic skyline"),
   ("Astana to Almaty","Fly south to Almaty, the green former capital below the mountains.","Garden city"),
   ("Almaty City","Panfilov Park, Zenkov Cathedral, the Green Bazaar and Kok-Tobe hill.","Almaty highlights"),
   ("Medeu & Shymbulak","Medeu skating rink and the Shymbulak mountain resort by cable car.","Alpine cable car"),
   ("Big Almaty Lake","Day trip to the turquoise Big Almaty Lake in the Tian Shan foothills.","Big Almaty Lake"),
   ("Almaty - Departure","Free morning, then transfer to the airport.","Steppe and mountains")]),
 ("kazakhstan-almaty-charyn-canyon-5n","Kazakhstan","kazakhstan","Almaty & Charyn Canyon Adventure",5,72000,65000,"Moderate",
  ["Charyn Canyon","Kolsai & Kaindy lakes","Almaty city","Shymbulak mountains","Tian Shan landscapes"],
  [("Arrive Almaty","Arrive in Almaty and transfer to your hotel.","At the foot of the Tian Shan"),
   ("Almaty City","Panfilov Park, the Green Bazaar and Kok-Tobe with mountain views.","City and mountains"),
   ("Charyn Canyon","Full-day trip to Charyn Canyon's Valley of Castles - a mini Grand Canyon.","Valley of Castles"),
   ("Kolsai & Kaindy Lakes","Alpine Kolsai lakes and the sunken forest of Lake Kaindy.","Sunken forest"),
   ("Almaty - Departure","Shymbulak or shopping, then transfer to the airport.","Canyon farewell")]),
 # ---------------- UZBEKISTAN ----------------
 ("uzbekistan-tashkent-samarkand-5n","Uzbekistan","uzbekistan","Tashkent & Samarkand",5,74000,67000,"Easy",
  ["Registan Square","Shah-i-Zinda","Gur-e-Amir mausoleum","Tashkent old town","High-speed Afrosiyob train"],
  [("Arrive Tashkent","Arrive in Tashkent and transfer to your hotel; evening at leisure.","Silk Road capital"),
   ("Tashkent City","Khast Imam complex, Chorsu bazaar and the grand metro stations.","Old Tashkent"),
   ("Train to Samarkand","High-speed Afrosiyob train to Samarkand; the Registan by evening light.","Registan Square"),
   ("Samarkand","Gur-e-Amir, Bibi-Khanym mosque and the Shah-i-Zinda necropolis.","Blue domes"),
   ("Samarkand - Departure","Return to Tashkent (or fly out) for your onward flight.","Silk Road farewell")]),
 ("uzbekistan-grand-silk-road-9n","Uzbekistan","uzbekistan","Grand Silk Road: Khiva, Bukhara & Samarkand",9,118000,106000,"Easy",
  ["Khiva walled Itchan Kala","Bukhara old city","Samarkand Registan","Desert Silk Road drive","UNESCO heritage trio"],
  [("Arrive Tashkent","Arrive in Tashkent and transfer to your hotel.","Welcome to Uzbekistan"),
   ("Tashkent City","Khast Imam, Chorsu bazaar and the city's mosaic metro.","Capital highlights"),
   ("Fly to Urgench / Khiva","Fly west and transfer to Khiva; evening in the walled old town.","Walled Khiva"),
   ("Khiva","The Itchan Kala fortress - minarets, madrasas and the Kunya Ark.","Itchan Kala"),
   ("Drive to Bukhara","Kyzylkum desert drive along the old Silk Road to Bukhara.","Desert caravan route"),
   ("Bukhara","Poi Kalon, the Ark fortress, Lyab-i-Hauz and the trading domes.","Holy Bukhara"),
   ("Bukhara to Samarkand","Travel to Samarkand through cotton fields and villages.","Towards Samarkand"),
   ("Samarkand","Registan Square, Gur-e-Amir, Bibi-Khanym and Shah-i-Zinda.","Registan Square"),
   ("Samarkand - Departure","Return to Tashkent or fly out for your onward flight.","Three jewels of the Silk Road")]),
 # ---------------- MAURITIUS ----------------
 ("mauritius-north-catamaran-5n","Mauritius","mauritius","Mauritius North & Catamaran",5,92000,84000,"Easy",
  ["Northern beaches","Catamaran cruise to Gabriel Island","Port Louis & Caudan","Pamplemousses garden","Grand Baie nightlife"],
  [("Arrive Mauritius","Arrive in Mauritius and transfer to your northern resort.","Indian Ocean welcome"),
   ("North Tour","Port Louis, the Caudan waterfront, Pamplemousses botanical garden and Grand Baie.","Pamplemousses garden"),
   ("Catamaran Cruise","Full-day catamaran to Gabriel and Flat islands with snorkelling and a BBQ lunch.","Catamaran day"),
   ("Beach Leisure","Free day on the northern beaches or optional undersea walk at Grand Baie.","White-sand leisure"),
   ("Mauritius - Departure","A final beach morning, then transfer to the airport.","Island farewell")]),
 ("mauritius-family-island-fun-6n","Mauritius","mauritius","Mauritius Family Island Fun",6,105000,95000,"Easy",
  ["Casela nature park","Chamarel seven-coloured earth","Ile aux Cerfs","Black River Gorges","Glass-bottom boat"],
  [("Arrive Mauritius","Arrive in Mauritius and transfer to your west-coast resort.","Family island escape"),
   ("Casela Nature Park","A day at Casela with safari rides, big cats and ziplines for all ages.","Casela adventures"),
   ("South Tour","Chamarel seven-coloured earth, the waterfall and Black River Gorges viewpoints.","Coloured earth"),
   ("Ile aux Cerfs","Speedboat to Ile aux Cerfs for beach time, water sports and lunch.","Ile aux Cerfs"),
   ("Leisure / Glass-Bottom Boat","Free day - optional glass-bottom boat over the lagoon or beach relaxation.","Lagoon time"),
   ("Mauritius - Departure","A last swim, then transfer to the airport.","Family farewell")]),
 # ---------------- SEYCHELLES ----------------
 ("seychelles-mahe-beach-escape-5n","Seychelles","seychelles","Mahe Beach Escape",5,135000,122000,"Easy",
  ["Beau Vallon beach","Victoria capital","Morne Seychellois views","Snorkelling reefs","Creole cuisine"],
  [("Arrive Mahe","Arrive in Mahe and transfer to your beach resort near Beau Vallon.","Granite-island welcome"),
   ("Mahe Island Tour","Victoria's clock tower and market, the tea factory and Morne Seychellois viewpoints.","Island tour"),
   ("Beach & Snorkel","Beau Vallon beach with optional snorkelling over the reefs.","Beau Vallon"),
   ("Leisure Day","Free day - spa, an optional glass-bottom boat or a hidden-cove drive.","Your island day"),
   ("Mahe - Departure","A final beach morning, then transfer to the airport.","Paradise farewell")]),
 ("seychelles-praslin-ladigue-honeymoon-6n","Seychelles","seychelles","Praslin & La Digue Honeymoon",6,158000,143000,"Easy",
  ["Anse Lazio & Anse Source d'Argent","Vallee de Mai palm forest","La Digue by bicycle","Inter-island ferries","Coco de Mer"],
  [("Arrive Mahe","Arrive in Mahe and transfer to your hotel; evening at leisure.","Honeymoon islands"),
   ("Ferry to Praslin","Catamaran ferry to Praslin; relax on the famed Anse Lazio beach.","Anse Lazio"),
   ("Vallee de Mai","The UNESCO Vallee de Mai palm forest, home of the Coco de Mer.","Vallee de Mai"),
   ("La Digue Day","Ferry to La Digue and cycle to Anse Source d'Argent among the granite boulders.","Anse Source d'Argent"),
   ("Praslin Leisure","Free day on Praslin - snorkelling at Cote d'Or or a couples' spa.","Romantic leisure"),
   ("Seychelles - Departure","Return to Mahe for your onward flight.","Honeymoon farewell")]),
 # ---------------- FIJI ----------------
 ("fiji-mamanuca-island-hopping-5n","Fiji","fiji","Mamanuca Island Hopping",5,165000,150000,"Easy",
  ["Mamanuca islands","Snorkelling & reefs","South Sea island cruise","Denarau beaches","Fijian village welcome"],
  [("Arrive Nadi","Arrive in Nadi and transfer to your Denarau beach resort.","Bula! Welcome"),
   ("Mamanuca Cruise","Catamaran cruise out to the Mamanuca islands with snorkelling and a beach BBQ.","Mamanuca islands"),
   ("South Sea Island","Day trip to South Sea Island for reef snorkelling and a glass-bottom boat.","Coral gardens"),
   ("Denarau Leisure","Free day on Denarau - golf, spa or the marina shops and cafes.","Denarau leisure"),
   ("Nadi - Departure","Garden of the Sleeping Giant or markets, then transfer to the airport.","Island farewell")]),
 ("fiji-coral-coast-cultural-6n","Fiji","fiji","Coral Coast & Cultural Fiji",6,178000,162000,"Easy",
  ["Coral Coast resorts","Sigatoka sand dunes","Fijian village & kava ceremony","Pacific Harbour","Reef snorkelling"],
  [("Arrive Nadi","Arrive in Nadi and drive to a Coral Coast resort.","Coral Coast welcome"),
   ("Coral Coast Leisure","Beach and reef snorkelling with optional water sports.","Reef time"),
   ("Cultural Village","A Fijian village visit with a traditional kava ceremony and meke dance.","Kava ceremony"),
   ("Sigatoka & Pacific Harbour","Sigatoka sand dunes and Pacific Harbour, Fiji's adventure capital.","Sand dunes"),
   ("Leisure Day","Free day - river-tubing, a spa day or simply the lagoon.","Your Fiji day"),
   ("Nadi - Departure","Return to Nadi for your onward flight.","Pacific farewell")]),
 # ---------------- REUNION ISLAND ----------------
 ("reunion-lagoons-beaches-5n","Reunion Island","reunion-island","Reunion Lagoons & Beaches",5,98000,89000,"Easy",
  ["Saint-Gilles lagoon","Hermitage beach","Saint-Paul market","Cap Mechant coast","Creole culture"],
  [("Arrive Reunion","Arrive in Reunion and transfer to your west-coast hotel near Saint-Gilles.","Indian Ocean France"),
   ("Lagoon & Beaches","The protected Hermitage lagoon for snorkelling and Saint-Gilles beach time.","Hermitage lagoon"),
   ("West Coast & Saint-Paul","Saint-Paul seaside market, Cap La Houssaye and Creole cuisine.","Creole market"),
   ("South Wild Coast","The dramatic Cap Mechant lava coast and the southern villages.","Wild south coast"),
   ("Reunion - Departure","A final lagoon swim, then transfer to the airport.","Lagoon farewell")]),
 ("reunion-active-adventure-6n","Reunion Island","reunion-island","Reunion Active Adventure",6,112000,102000,"Moderate",
  ["Piton de la Fournaise volcano","Cirque de Cilaos","Cirque de Mafate views","Plaine des Sables","Salazie waterfalls"],
  [("Arrive Reunion","Arrive in Reunion and transfer to your hotel.","Island of adventure"),
   ("Cirque de Cilaos","Mountain road of 400 bends up to the Cirque de Cilaos with hot springs.","Cirque de Cilaos"),
   ("Piton de la Fournaise","Drive across the Plaine des Sables to the active Piton de la Fournaise volcano.","Active volcano"),
   ("Cirque de Salazie","Salazie's waterfalls, the Voile de la Mariee and Hell-Bourg village.","Salazie falls"),
   ("Maido & Mafate Viewpoint","Sunrise drive to Maido for the view over the roadless Cirque de Mafate.","Mafate panorama"),
   ("Reunion - Departure","A final morning, then transfer to the airport.","Adventure farewell")]),
 # ---------------- RUSSIA ----------------
 ("russia-moscow-st-petersburg-7n","Russia","russia","Moscow & St Petersburg",7,138000,125000,"Easy",
  ["Red Square & Kremlin","Moscow metro palaces","Hermitage Museum","Peterhof fountains","Sapsan high-speed train"],
  [("Arrive Moscow","Arrive in Moscow and transfer to your hotel; evening at Red Square.","Capital welcome"),
   ("Moscow City","Red Square, St Basil's, the Kremlin grounds and the ornate metro stations.","Red Square"),
   ("Moscow Highlights","Tretyakov Gallery or the Izmailovo market and a Moscow River cruise.","Moscow culture"),
   ("Train to St Petersburg","Sapsan high-speed train to St Petersburg; evening canal stroll.","High-speed north"),
   ("St Petersburg City","Church of the Saviour on Spilled Blood, St Isaac's and Nevsky Prospekt.","Imperial city"),
   ("Hermitage & Peterhof","The Hermitage Museum and the Peterhof palace fountains by the gulf.","Hermitage & Peterhof"),
   ("St Petersburg - Departure","A final canal-side morning, then transfer to the airport.","Imperial farewell")]),
 ("russia-moscow-golden-ring-6n","Russia","russia","Moscow & the Golden Ring",6,118000,107000,"Easy",
  ["Red Square & Kremlin","Sergiev Posad monastery","Suzdal wooden architecture","Vladimir cathedrals","Russian countryside"],
  [("Arrive Moscow","Arrive in Moscow and transfer to your hotel.","Welcome to Russia"),
   ("Moscow City","Red Square, St Basil's, the Kremlin and the palatial metro.","Red Square"),
   ("Sergiev Posad","Day trip to the Trinity Lavra of St Sergius, heart of Russian Orthodoxy.","Sergiev Posad"),
   ("Vladimir & Suzdal","The white-stone cathedrals of Vladimir and wooden Suzdal in the Golden Ring.","Golden Ring"),
   ("Moscow Culture","Tretyakov Gallery, Arbat street and an optional Bolshoi evening.","Moscow culture"),
   ("Moscow - Departure","A final stroll, then transfer to the airport.","Golden Ring farewell")]),
 # ---------------- CAMBODIA & LAOS ----------------
 ("cambodia-angkor-phnom-penh-5n","Cambodia & Laos","cambodia-laos","Angkor Wat & Phnom Penh",5,92000,83000,"Easy",
  ["Angkor Wat sunrise","Bayon & Ta Prohm","Tonle Sap floating village","Phnom Penh Royal Palace","Khmer culture"],
  [("Arrive Siem Reap","Arrive in Siem Reap and transfer to your hotel; evening at the night market.","Gateway to Angkor"),
   ("Angkor Temples","Sunrise at Angkor Wat, the Bayon faces of Angkor Thom and tree-rooted Ta Prohm.","Angkor Wat sunrise"),
   ("Tonle Sap & Fly to Phnom Penh","Tonle Sap floating village by boat, then fly to Phnom Penh.","Floating village"),
   ("Phnom Penh","Royal Palace, the Silver Pagoda and the sobering Killing Fields and S-21 memorials.","Royal Palace"),
   ("Phnom Penh - Departure","Riverfront morning, then transfer to the airport.","Khmer farewell")]),
 ("cambodia-laos-discovery-8n","Cambodia & Laos","cambodia-laos","Cambodia & Laos Discovery",8,135000,122000,"Easy",
  ["Angkor temples","Phnom Penh history","Luang Prabang old town","Kuang Si waterfalls","Mekong & Pak Ou caves"],
  [("Arrive Siem Reap","Arrive in Siem Reap and transfer to your hotel.","Welcome to Indochina"),
   ("Angkor Temples","Angkor Wat at sunrise, Angkor Thom's Bayon and Ta Prohm.","Angkor Wat"),
   ("Fly to Phnom Penh","Tonle Sap boat ride, then fly to the capital Phnom Penh.","Capital transfer"),
   ("Phnom Penh","Royal Palace, the Silver Pagoda and the Killing Fields memorial.","Phnom Penh history"),
   ("Fly to Luang Prabang","Fly to Laos and the UNESCO town of Luang Prabang; evening night market.","Into Laos"),
   ("Luang Prabang","Wat Xieng Thong, Mount Phousi sunset and a Mekong cruise to the Pak Ou caves.","Mekong & caves"),
   ("Kuang Si Falls","Swim in the turquoise tiers of the Kuang Si waterfalls and visit a bear rescue centre.","Kuang Si waterfalls"),
   ("Luang Prabang - Departure","Dawn alms-giving (optional), then transfer to the airport.","Indochina farewell")]),
 ("laos-luang-prabang-mekong-5n","Cambodia & Laos","cambodia-laos","Luang Prabang & the Mekong",5,96000,87000,"Easy",
  ["Luang Prabang old town","Dawn alms giving","Kuang Si waterfalls","Mekong & Pak Ou caves","Mount Phousi sunset"],
  [("Arrive Luang Prabang","Arrive in Luang Prabang and transfer to your hotel; evening night market.","Old Lao kingdom"),
   ("City & Mount Phousi","Royal Palace museum, Wat Xieng Thong and a Mount Phousi sunset over the rivers.","Mount Phousi sunset"),
   ("Mekong & Pak Ou Caves","Mekong cruise to the Buddha-filled Pak Ou caves and a whisky-village stop.","Pak Ou caves"),
   ("Kuang Si Waterfalls","A day at the Kuang Si waterfalls for swimming in the turquoise pools.","Kuang Si waterfalls"),
   ("Luang Prabang - Departure","Optional dawn alms-giving, then transfer to the airport.","Serene farewell")]),
 # ---------------- OMAN ----------------
 ("oman-muscat-wahiba-5n","Oman","oman","Muscat & Wahiba Sands",5,88000,80000,"Easy",
  ["Sultan Qaboos Grand Mosque","Muttrah Souq","Wahiba Sands desert camp","Wadi Bani Khalid","Corniche & forts"],
  [("Arrive Muscat","Arrive in Muscat and transfer to your hotel; evening Corniche stroll.","White-mosque capital"),
   ("Muscat City","Sultan Qaboos Grand Mosque, the Royal Opera House, Al Alam Palace and Muttrah Souq.","Grand Mosque"),
   ("Wahiba Sands","Drive to the apricot dunes for a desert-camp night, dune-bashing and stars.","Desert camp"),
   ("Wadi Bani Khalid","Swim in the turquoise pools of Wadi Bani Khalid, then return to Muscat.","Wadi swim"),
   ("Muscat - Departure","A final souq browse, then transfer to the airport.","Arabian farewell")]),
 ("oman-highlights-nizwa-wadis-7n","Oman","oman","Oman Highlights: Muscat, Nizwa & Wadis",7,112000,101000,"Moderate",
  ["Nizwa Fort & souq","Jebel Akhdar mountains","Wahiba Sands","Wadi Shab","Bimmah sinkhole"],
  [("Arrive Muscat","Arrive in Muscat and transfer to your hotel.","Welcome to Oman"),
   ("Muscat City","Grand Mosque, Muttrah Souq, the Corniche and the old forts.","Capital highlights"),
   ("Nizwa & Jebel Akhdar","Nizwa Fort and souq, then up to the rose-terraced villages of Jebel Akhdar.","Mountain forts"),
   ("Wahiba Sands","Drive to the Wahiba Sands for dune-bashing and a desert-camp night.","Desert camp"),
   ("Wadi Bani Khalid","Wadi Bani Khalid pools and a Bedouin-country drive back towards the coast.","Wadi pools"),
   ("Coast: Wadi Shab & Sinkhole","Wadi Shab hike-and-swim and the turquoise Bimmah sinkhole on the coast road.","Wadi Shab"),
   ("Muscat - Departure","Free morning, then transfer to the airport.","Grand Oman farewell")]),
 ("oman-salalah-green-4n","Oman","oman","Salalah Green Oman",4,82000,74000,"Easy",
  ["Khareef green hills","Wadi Darbat waterfalls","Mughsail blowholes","Frankincense souq","Empty Quarter edge"],
  [("Arrive Salalah","Arrive in Salalah on the Dhofar coast and transfer to your hotel.","Green Arabia"),
   ("Wadi Darbat & East Salalah","Misty green hills, Wadi Darbat waterfalls and the tomb of Job.","Wadi Darbat"),
   ("Mughsail & West Coast","Mughsail beach blowholes, the frankincense trees and the road to the Yemen border views.","Mughsail blowholes"),
   ("Salalah - Departure","Frankincense souq and Al Husn palace, then transfer to the airport.","Dhofar farewell")]),
 # ---------------- SAUDI ARABIA ----------------
 ("saudi-alula-hegra-4n","Saudi Arabia","saudi-arabia","AlUla & Hegra Discovery",4,118000,106000,"Easy",
  ["Hegra Nabataean tombs","AlUla old town","Elephant Rock","Maraya mirrored hall","Desert stargazing"],
  [("Arrive AlUla","Fly into AlUla and transfer to your hotel; desert evening at leisure.","Frontier desert"),
   ("Hegra Tombs","Guided tour of Hegra (Madain Saleh), Saudi's first UNESCO site of Nabataean tombs.","Hegra tombs"),
   ("AlUla Old Town & Elephant Rock","The mud-brick old town, Dadan and Jabal Ikmah, and Elephant Rock at sunset.","Elephant Rock sunset"),
   ("AlUla - Departure","Maraya mirrored building photo stop, then transfer to the airport.","AlUla farewell")]),
 ("saudi-grand-riyadh-alula-jeddah-8n","Saudi Arabia","saudi-arabia","Saudi Grand: Riyadh, AlUla & Jeddah",8,165000,149000,"Easy",
  ["Riyadh & Diriyah","Edge of the World","Hegra & AlUla","Jeddah Al-Balad","Red Sea corniche"],
  [("Arrive Riyadh","Arrive in Riyadh and transfer to your hotel.","Modern capital"),
   ("Riyadh & Diriyah","National Museum, Kingdom Tower sky bridge and the mud-brick palaces of Diriyah.","Diriyah heritage"),
   ("Edge of the World","Day trip to the dramatic Edge of the World escarpment cliffs.","Edge of the World"),
   ("Fly to AlUla","Fly to AlUla; the mud-brick old town and Elephant Rock at sunset.","Into the desert"),
   ("Hegra Tombs","Guided tour of the Hegra Nabataean tombs and Jabal Ikmah inscriptions.","Hegra tombs"),
   ("Fly to Jeddah","Fly to the Red Sea city of Jeddah; evening on the corniche.","Red Sea city"),
   ("Jeddah Al-Balad","The coral-stone UNESCO old town of Al-Balad and the floating mosque.","Al-Balad old town"),
   ("Jeddah - Departure","Free morning, then transfer to the airport.","Grand Saudi farewell")]),
 ("saudi-jeddah-red-sea-4n","Saudi Arabia","saudi-arabia","Jeddah & the Red Sea",4,105000,95000,"Easy",
  ["Jeddah Al-Balad","Red Sea diving","Corniche & Floating Mosque","Souqs & coral houses","Coastal leisure"],
  [("Arrive Jeddah","Arrive in Jeddah and transfer to your hotel; evening corniche walk.","Bride of the Red Sea"),
   ("Al-Balad Old Town","The coral-stone houses, carved balconies and souqs of UNESCO Al-Balad.","Al-Balad"),
   ("Red Sea Day","Snorkelling or diving the Red Sea reefs, or a coastal resort beach day.","Red Sea reefs"),
   ("Jeddah - Departure","Floating Mosque photo stop, then transfer to the airport.","Red Sea farewell")]),
 # ---------------- IRELAND ----------------
 ("ireland-dublin-wild-atlantic-6n","Ireland","ireland","Dublin & the Wild Atlantic Way",6,168000,152000,"Easy",
  ["Dublin Trinity & Guinness","Cliffs of Moher","Galway & the Burren","Wild Atlantic Way","Irish pub music"],
  [("Arrive Dublin","Arrive in Dublin and transfer to your hotel; evening in Temple Bar.","Fair city"),
   ("Dublin City","Trinity College and the Book of Kells, Dublin Castle and the Guinness Storehouse.","Trinity & Guinness"),
   ("To Galway","Travel west across Ireland to bohemian, music-filled Galway.","City of the tribes"),
   ("Cliffs of Moher & Burren","The towering Cliffs of Moher and the lunar limestone Burren along the Wild Atlantic Way.","Cliffs of Moher"),
   ("Connemara","Connemara's lakes, bogs and Kylemore Abbey, then back to Galway.","Connemara wilds"),
   ("Dublin - Departure","Return to Dublin for your onward flight.","Irish farewell")]),
 ("ireland-grand-dublin-galway-killarney-8n","Ireland","ireland","Ireland Grand: Dublin, Galway, Killarney & Cork",8,198000,180000,"Easy",
  ["Cliffs of Moher","Ring of Kerry","Killarney National Park","Blarney Castle","Dublin & Galway"],
  [("Arrive Dublin","Arrive in Dublin and transfer to your hotel.","Welcome to Ireland"),
   ("Dublin City","Trinity College, Dublin Castle and the Guinness Storehouse, with a Temple Bar evening.","Dublin highlights"),
   ("To Galway & Cliffs","Travel west to Galway via the Cliffs of Moher and the Burren.","Cliffs of Moher"),
   ("Galway to Killarney","Scenic drive south through County Clare and Limerick to Killarney.","Lakes of Killarney"),
   ("Ring of Kerry","The full Ring of Kerry coastal loop - mountains, beaches and stone-walled fields.","Ring of Kerry"),
   ("Killarney to Cork","Killarney National Park and Muckross House, then on to Cork.","National park"),
   ("Blarney & Dublin","Blarney Castle and the famous stone, then return towards Dublin.","Blarney Castle"),
   ("Dublin - Departure","A final morning, then transfer to the airport.","Grand Ireland farewell")]),
 ("ireland-dublin-cliffs-short-4n","Ireland","ireland","Dublin City & Cliffs of Moher Short Break",4,138000,125000,"Easy",
  ["Dublin Trinity & Guinness","Cliffs of Moher day trip","Temple Bar music","Howth coastal village","Easy long weekend"],
  [("Arrive Dublin","Arrive in Dublin and transfer to your hotel; evening in Temple Bar.","Long weekend in Dublin"),
   ("Dublin City","Trinity College and the Book of Kells, Dublin Castle and the Guinness Storehouse.","Trinity & Guinness"),
   ("Cliffs of Moher Day Trip","Full-day trip to the Cliffs of Moher and Galway across the Irish countryside.","Cliffs of Moher"),
   ("Dublin - Departure","Optional Howth coastal village morning, then transfer to the airport.","Irish farewell")]),
]

# ---- render -----------------------------------------------------------------
def esc(s): return s.replace('"','\\"')

def render(p):
    slug,name,ds,title,nights,price,disc,diff,highs,days = p
    hero,gal = dest_images(ds)
    if not hero:
        sys.exit("No images for destination: "+ds)
    gal = gal or [hero]
    def img(i): return gal[i % len(gal)]
    incl = [x.format(nights=nights) for x in STD_INCL]
    lines = []
    lines.append("  {")
    lines.append('    title: "%s",' % esc(title))
    lines.append('    slug: "%s",' % slug)
    lines.append('    destinationName: "%s",' % esc(name))
    lines.append('    destinationSlug: "%s",' % ds)
    lines.append('    category: "leisure",')
    lines.append('    description:')
    desc = "%s - a curated %d-night journey: %s." % (title, nights, ", ".join(h.lower() for h in highs[:3]))
    lines.append('      "%s",' % esc(desc))
    lines.append('    heroImage: "%s",' % hero)
    lines.append('    images: [')
    for i in range(4): lines.append('      "%s",' % img(i))
    lines.append('    ],')
    lines.append('    duration: { days: %d, nights: %d },' % (nights+1, nights))
    lines.append('    price: %d,' % price)
    lines.append('    discountedPrice: %d,' % disc)
    lines.append('    difficulty: "%s",' % diff)
    lines.append('    groupSize: { min: 2, max: 12 },')
    lines.append('    rating: 4.8,')
    lines.append('    reviewCount: %d,' % (14 + (price % 19)))
    lines.append('    inclusions: [')
    for x in incl: lines.append('      "%s",' % esc(x))
    lines.append('    ],')
    lines.append('    exclusions: [')
    for x in STD_EXCL: lines.append('      "%s",' % esc(x))
    lines.append('    ],')
    lines.append('    highlights: [')
    for h in highs: lines.append('      "%s",' % esc(h))
    lines.append('    ],')
    lines.append('    transparencyNote:')
    lines.append('      "%s",' % esc(NOTE))
    lines.append('    featured: false,')
    lines.append('    itinerary: [')
    for i,(dt,dd,dh) in enumerate(days):
        lines.append('      {')
        lines.append('        day: %d,' % (i+1))
        lines.append('        title: "%s",' % esc(dt))
        lines.append('        description:')
        lines.append('          "%s",' % esc(dd))
        lines.append('        activities: [],')
        lines.append('        meals: "%s",' % ("Breakfast" if i < len(days)-0 else "Breakfast"))
        last = (i == len(days)-1)
        lines.append('        accommodation: "%s",' % ("N/A - Departure" if last else "Hotel"))
        lines.append('        highlight: "%s",' % esc(dh))
        lines.append('        image: "%s",' % img(i))
        lines.append('      },')
    lines.append('    ],')
    lines.append("  },")
    return "\n".join(lines)

psrc = io.open(PKGS, encoding="utf-8").read()
existing = set(re.findall(r'slug: "([^"]+)"', psrc))
blocks = []
added = []
for p in DATA:
    if p[0] in existing:
        continue
    blocks.append(render(p))
    added.append(p[0])

if not blocks:
    print("nothing to add")
    sys.exit(0)

# insert before the closing "]" of allPackages (the line `]` right before the
# Education-archived comment / `export const packages`).
marker = "\n]\n\n// Education category archived"
assert marker in psrc, "allPackages close marker not found"
psrc = psrc.replace(marker, "\n" + "\n".join(blocks) + marker, 1)
io.open(PKGS, "w", encoding="utf-8").write(psrc)
print("added %d packages:" % len(added))
for s in added: print("  "+s)
