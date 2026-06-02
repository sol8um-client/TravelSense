# -*- coding: utf-8 -*-
"""Add new international destinations from docx 7 / travellive list:
South Africa, Kenya, Japan, Jordan, Iceland, Finland, Europe, Australia,
New Zealand (live) + re-add Kazakhstan, Uzbekistan. Appends to destinations.ts
and removes the now-live ones from comingSoonDestinations.
"""
import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
PATH = r'E:\TravelSense\travelsense\src\data\destinations.ts'
c = open(PATH, encoding='utf-8').read()


def dest(name, slug, country, tagline, desc, longd, hero, gallery, best, weather,
         price, highlights, know, exps, featured=False):
    g = ",\n".join(f'      "{x}"' for x in gallery)
    h = ",\n".join(f'      "{x}"' for x in highlights)
    k = ",\n".join(f'      "{x}"' for x in know)
    e = ",\n".join(
        '      {\n'
        f'        title: "{t}",\n'
        f'        description:\n          "{d}",\n'
        f'        icon: "{ic}",\n'
        '      }' for (t, d, ic) in exps)
    return f'''  {{
    name: "{name}",
    slug: "{slug}",
    region: "International",
    country: "{country}",
    category: "leisure",
    tagline: "{tagline}",
    description:
      "{desc}",
    longDescription:
      "{longd}",
    heroImage: "{hero}",
    galleryImages: [
{g},
    ],
    bestTimeToVisit: "{best}",
    weather:
      "{weather}",
    startingPrice: {price},
    highlights: [
{h},
    ],
    thingsToKnow: [
{k},
    ],
    popularExperiences: [
{e},
    ],
    featured: {str(featured).lower()},
  }},
'''


U = "https://images.unsplash.com/"
def img(id, w=800, h=600):
    return f"{U}{id}?w={w}&h={h}&fit=crop"

blocks = []

# 1. South Africa
blocks.append(dest(
 "South Africa","south-africa","South Africa",
 "Cape Town, Garden Route & the Big Five",
 "From the flat top of Table Mountain and the penguins of Boulders Beach to Big Five game drives in Kruger and the wine estates of Stellenbosch \\u2014 South Africa is the world's most complete safari-and-city destination.",
 "South Africa packs a continent into one country. Cape Town sits beneath the cable-car-topped Table Mountain, with Cape Point, the Cape of Good Hope, the penguin colony at Boulders Beach and the colourful Bo-Kaap quarter all within reach, plus the winelands of Stellenbosch and Franschhoek an hour away. The Garden Route then unfurls east along the Indian Ocean through Knysna, Plettenberg Bay and Tsitsikamma's forests and gorges.\\n\\nInland, the Greater Kruger ecosystem delivers world-class Big Five safaris \\u2014 lion, leopard, elephant, rhino and buffalo \\u2014 from open 4x4 game vehicles at dawn and dusk. Johannesburg, the Apartheid Museum and Soweto add the historical layer, and Sun City offers a resort finale. It is a destination that works for first-time safari-goers and repeat travellers alike.",
 img("photo-1580060839134-75a5edca2e99",1600,900),
 [img("photo-1580060839134-75a5edca2e99"),img("photo-1516026672322-bc52d61a55d5"),
  img("photo-1547471080-7cc2caa01a7e"),img("photo-1521651201144-634f700b36ef"),
  img("photo-1534177616072-ef7dc120449d"),img("photo-1484318571209-661cf29a69c3")],
 "April to October (dry season for safari)",
 "Cape Town is Mediterranean \\u2014 warm dry summers (Nov-Mar) and cool wet winters. Kruger safari is best in the dry winter (May-Sep) when animals gather at waterholes.",
 136000,
 ["Table Mountain cable car","Cape Point & Cape of Good Hope","Boulders Beach penguins","Greater Kruger Big Five safari","Garden Route coastal drive","Stellenbosch wine estates"],
 ["Indian passport holders need a South Africa visa \\u2014 apply in advance with the standard document set.","Domestic flights link Cape Town, the Garden Route and the Kruger/Johannesburg side \\u2014 self-drive is also popular.","Malaria precaution is advised for the low-veld Kruger area (consult your doctor).","South African Rand (ZAR) \\u2014 cards are widely accepted; carry some cash for tips and curio markets.","Tipping ~10-15% in restaurants and for safari guides/trackers is customary."],
 [("Big Five Game Drive","Dawn and dusk 4x4 safaris in the Greater Kruger in search of lion, leopard, elephant, rhino and buffalo.","\\ud83e\\udd81"),
  ("Table Mountain Cablecar","Ride the rotating cable car to the flat summit for a 360-degree view over Cape Town and the Atlantic.","\\ud83c\\udf04"),
  ("Cape Winelands Tasting","Cellar tours and tastings among the Cape Dutch estates of Stellenbosch and Franschhoek.","\\ud83c\\udf77"),
  ("Boulders Beach Penguins","Walk the boardwalks beside a colony of African penguins on a Simon's Town beach.","\\ud83d\\udc27")],
 featured=True))

# 2. Kenya
blocks.append(dest(
 "Kenya","kenya","Kenya",
 "The Masai Mara & the Great Migration",
 "Big-cat country \\u2014 the rolling savannah of the Masai Mara, the flamingo lakes of the Rift Valley and the elephants of Amboseli beneath Kilimanjaro, the original African safari.",
 "Kenya is where the safari was born. The Masai Mara \\u2014 the northern extension of the Serengeti \\u2014 is the stage for the Great Migration (roughly July to October), when over a million wildebeest and zebra cross the Mara River past waiting crocodiles, with lion, cheetah and leopard never far behind. Amboseli, in the south, frames its big elephant herds against the snows of Mount Kilimanjaro across the Tanzanian border.\\n\\nThe Great Rift Valley adds Lake Nakuru's flamingo flocks and rhino sanctuary, while Lake Naivasha offers boat safaris and walking at Crescent Island. Encounters with the Maasai people, hot-air balloon flights over the Mara at dawn and a finish in Nairobi (with its elephant orphanage and giraffe centre) complete a classic Kenyan circuit.",
 img("photo-1547970810-dc1eac37d174",1600,900),
 [img("photo-1547970810-dc1eac37d174"),img("photo-1535941339077-2dd1c7963098"),
  img("photo-1516426122078-c23e76319801"),img("photo-1549366021-9f761d450615"),
  img("photo-1534177616072-ef7dc120449d"),img("photo-1503777119540-ec1f0e9c2a52")],
 "July to October (Great Migration) & January-February",
 "Warm year-round at safari altitude (20-30 \\u00b0C). Dry seasons (Jun-Oct and Jan-Feb) are best for game viewing; long rains fall Mar-May.",
 142500,
 ["Masai Mara big cats","Great Migration river crossings","Amboseli elephants under Kilimanjaro","Lake Nakuru flamingos & rhino","Hot-air balloon safari","Maasai village visit"],
 ["Indian passport holders need a Kenya eTA (electronic travel authorisation) \\u2014 applied online before travel.","A yellow-fever vaccination certificate may be required; malaria prophylaxis is advised.","Game drives are in 4x4 vehicles with pop-up roofs; pack neutral-coloured clothing and a zoom lens.","Kenyan Shilling (KES) \\u2014 USD is widely accepted at lodges; carry small notes for tips.","Domestic light-aircraft hops (e.g. Nairobi-Mara) save long road transfers."],
 [("Great Migration Crossing","Witness wildebeest and zebra brave the crocodile-filled Mara River \\u2014 one of nature's greatest spectacles.","\\ud83e\\udd93"),
  ("Balloon Safari at Dawn","Drift silently over the Mara at sunrise, then a champagne bush breakfast on the plains.","\\ud83c\\udf88"),
  ("Amboseli & Kilimanjaro","Photograph big elephant herds against Africa's highest peak.","\\ud83d\\udc18"),
  ("Maasai Village Visit","Meet a Maasai community for their songs, dances and way of life on the savannah.","\\ud83d\\udd31")],
 featured=True))

# 3. Japan
blocks.append(dest(
 "Japan","japan","Japan",
 "Tokyo Neon, Kyoto Temples & Mount Fuji",
 "Bullet trains and bamboo groves, neon Tokyo and the thousand torii of Kyoto, cherry blossom in spring and snow monkeys in winter \\u2014 Japan blends the hyper-modern with the deeply traditional.",
 "Japan is a study in contrasts. Tokyo dazzles with Shibuya's scramble crossing, the temples of Asakusa, the electronics of Akihabara and the views from the Skytree, while a day trip reaches Mount Fuji and the lakes of Hakone. The shinkansen bullet train then whisks you west to Kyoto, the old imperial capital \\u2014 the golden Kinkaku-ji, the thousand vermilion torii of Fushimi Inari, the bamboo grove of Arashiyama and the geisha lanes of Gion.\\n\\nNearby Nara adds its bowing deer and giant bronze Buddha, and Osaka brings the street food of Dotonbori and Osaka Castle. Spring (cherry blossom) and autumn (maple colours) are the headline seasons, but Japan rewards in every season \\u2014 from summer festivals to winter snow and onsen hot springs.",
 img("photo-1493976040374-85c8e12f0c0e",1600,900),
 [img("photo-1493976040374-85c8e12f0c0e"),img("photo-1545569341-9eb8b30979d9"),
  img("photo-1528360983277-13d401cdc186"),img("photo-1524413840807-0c3cb6fa808d"),
  img("photo-1480796927426-f609979314bd"),img("photo-1503899036084-c55cdd92da26")],
 "March-April (cherry blossom) & October-November (autumn)",
 "Four distinct seasons. Spring (Mar-May) and autumn (Oct-Nov) are mild and the most beautiful; summers are hot and humid; winters are cold with snow in the north.",
 185000,
 ["Tokyo \\u2014 Shibuya, Asakusa & Skytree","Mount Fuji & Hakone","Kyoto Fushimi Inari & Kinkaku-ji","Arashiyama bamboo grove","Nara deer & Great Buddha","Shinkansen bullet train"],
 ["Indian passport holders need a Japan visa \\u2014 apply in advance through the authorised agency with the standard set.","A Japan Rail Pass (bought before arrival) is excellent value for the Tokyo-Kyoto-Osaka route.","Japan is largely cash-friendly \\u2014 carry yen; IC cards (Suica/Pasmo) ease city transport.","Pocket Wi-Fi or an eSIM is recommended for navigation; English signage is good on main routes.","Etiquette matters \\u2014 no tipping, quiet on trains, and shoes off where indicated."],
 [("Fushimi Inari Torii Walk","Climb the tunnel of thousands of vermilion torii gates winding up the Kyoto hillside.","\\u26e9\\ufe0f"),
  ("Shinkansen Bullet Train","Ride the 300 km/h bullet train between Tokyo, Kyoto and Osaka.","\\ud83d\\ude85"),
  ("Mount Fuji & Hakone","Lake cruise, ropeway and hot springs with views of Japan's sacred peak.","\\ud83d\\uddfb"),
  ("Arashiyama Bamboo Grove","Walk the towering green bamboo corridor and the Tenryu-ji temple gardens.","\\ud83c\\udf8b")],
 featured=True))

# 4. Jordan
blocks.append(dest(
 "Jordan","jordan","Jordan",
 "Petra, Wadi Rum & the Dead Sea",
 "The rose-red rock city of Petra, the Martian desert of Wadi Rum, a float in the Dead Sea and the Roman ruins of Jerash \\u2014 Jordan is a compact, safe and spectacular Middle-East journey.",
 "Jordan is one of the Middle East's most rewarding and welcoming destinations. Its crown jewel is Petra \\u2014 the Nabataean city carved into rose-red sandstone, entered through the narrow Siq to the famous Treasury (Al-Khazneh), with the Monastery a climb beyond. South lies Wadi Rum, the Valley of the Moon, where 4x4 jeeps and Bedouin camps sit beneath towering sandstone massifs (the backdrop to many Mars films).\\n\\nThe Dead Sea, the lowest point on Earth, lets you float effortlessly and coat yourself in mineral mud, while the capital Amman, the vast Roman ruins of Jerash and the mosaics of Madaba and Mount Nebo add history and culture. Distances are short, the country is safe and friendly, and a week covers the highlights comfortably.",
 img("photo-1563177978-4c5ddccc10da",1600,900),
 [img("photo-1563177978-4c5ddccc10da"),img("photo-1518630257714-3a3f9bb9c5a3"),
  img("photo-1580834341580-8c17a3a630ca"),img("photo-1605908502724-9093a79a1b39"),
  img("photo-1547234935-80c7145ec969"),img("photo-1539020140153-e479b8c22e70")],
 "March to May & September to November",
 "Desert climate \\u2014 hot dry summers, cool winters. Spring and autumn are ideal; desert nights are cold year-round.",
 128000,
 ["Petra & the Treasury through the Siq","Wadi Rum jeep safari & Bedouin camp","Float in the Dead Sea","Jerash Roman ruins","Amman citadel & city","Mount Nebo & Madaba mosaics"],
 ["Indian passport holders need a Jordan visa \\u2014 the Jordan Pass (bought online) bundles the visa with Petra and 40+ sites.","Petra involves a lot of walking on uneven ground \\u2014 wear good shoes and carry water and sun protection.","Wadi Rum camps range from basic Bedouin tents to luxury bubble domes \\u2014 nights are cold.","Jordanian Dinar (JOD) \\u2014 cards work in cities; carry cash for desert camps and tips.","Jordan is very safe for tourists, including solo and women travellers."],
 [("Petra Through the Siq","Walk the narrow 1.2 km canyon that opens onto the Treasury \\u2014 travel's great reveal.","\\ud83c\\udfdb\\ufe0f"),
  ("Wadi Rum Jeep Safari","4x4 across red dunes to rock arches and a night under desert stars at a Bedouin camp.","\\ud83c\\udfdc\\ufe0f"),
  ("Float in the Dead Sea","Bob effortlessly in the mineral-rich water and slather on the famous black mud.","\\ud83c\\udf0a"),
  ("Jerash Roman City","Wander one of the best-preserved Roman provincial cities, colonnaded streets and all.","\\ud83c\\udff0")]))

# 5. Iceland
blocks.append(dest(
 "Iceland","iceland","Iceland",
 "Northern Lights, Waterfalls & the Golden Circle",
 "Waterfalls and geysers, black-sand beaches and glacier lagoons, the Blue Lagoon and \\u2014 in winter \\u2014 the aurora dancing overhead. Iceland is raw nature at its most dramatic.",
 "Iceland is a land of fire and ice. The Golden Circle loops from Reykjavik to the erupting Strokkur geyser, the thundering Gullfoss waterfall and Thingvellir, where you can walk between the North American and Eurasian tectonic plates. The south coast strings together the Seljalandsfoss and Skogafoss waterfalls, the black-sand beach of Reynisfjara and the surreal Jokulsarlon glacier lagoon with its drifting icebergs and Diamond Beach.\\n\\nIn winter (roughly September to March), the long dark nights bring the chance to chase the Northern Lights across the countryside, while the geothermal Blue Lagoon offers a warm soak any time of year. Summer brings the midnight sun, puffins and highland access. Compact and safe, Iceland delivers a new wonder around almost every bend.",
 img("photo-1504829857797-ddff29c27927",1600,900),
 [img("photo-1504829857797-ddff29c27927"),img("photo-1531168556467-80aace4d0144"),
  img("photo-1476610182048-b716b8518aae"),img("photo-1490650034439-fd184c3c86a5"),
  img("photo-1520769669658-f07657f5a307"),img("photo-1500530855697-b586d89ba3ee")],
 "September to March (Northern Lights) & June-August (midnight sun)",
 "Cool maritime climate. Winters (Nov-Mar) are dark and cold \\u2014 best for aurora; summers are mild with near-24-hour daylight. Weather changes fast year-round.",
 175000,
 ["Northern Lights hunting (winter)","Golden Circle \\u2014 Geysir & Gullfoss","Jokulsarlon glacier lagoon","Reynisfjara black-sand beach","Blue Lagoon geothermal spa","Thingvellir tectonic rift"],
 ["Indian passport holders need a Schengen visa for Iceland \\u2014 apply with full documents and travel insurance.","The Northern Lights need dark, clear, winter skies \\u2014 they are natural and never guaranteed; we plan multiple chances.","A self-drive or small-group tour is the usual way to circle the island; winter roads need care.","Icelandic Krona (ISK) \\u2014 Iceland is almost cashless; cards work everywhere.","Pack proper waterproof and warm layers \\u2014 the weather is famously changeable."],
 [("Northern Lights Hunt","Head out under dark winter skies with a guide to chase the green-and-violet aurora.","\\ud83c\\udf0c"),
  ("Golden Circle","Erupting Strokkur geyser, the Gullfoss falls and the Thingvellir rift in one loop.","\\u2668\\ufe0f"),
  ("Glacier Lagoon Cruise","Sail among floating icebergs at Jokulsarlon and walk the Diamond Beach.","\\ud83e\\uddca"),
  ("Blue Lagoon Soak","Bathe in the milky-blue geothermal waters set in a black-lava field.","\\ud83d\\udd35")],
 featured=True))

# 6. Finland (Northern Lights / Lapland)
blocks.append(dest(
 "Finland","finland","Finland",
 "Lapland, the Aurora & Santa's Arctic",
 "Glass igloos under the Northern Lights, husky and reindeer sleds across the snow, and Santa Claus Village on the Arctic Circle \\u2014 Finnish Lapland is the ultimate winter-wonderland.",
 "Finland's far north, Lapland, is the storybook Arctic. Rovaniemi, on the Arctic Circle, is the official home of Santa Claus, where you can cross the magic line, meet Santa and post a letter from his post office. Beyond the town, the snow-blanketed wilderness is the stage for husky-sled and reindeer-sleigh rides, snowmobile safaris and nights spent watching the Northern Lights from glass igloos and aurora cabins.\\n\\nHelsinki, the design-led seaside capital, makes a cultured start or finish with its cathedral, market square and island fortress of Suomenlinna. From late September to March the aurora is the headline act, while the deep winter adds frozen lakes, ice-fishing and the genuine Finnish sauna culture \\u2014 making Lapland one of the world's most magical cold-weather escapes.",
 img("photo-1483347756197-71ef80e95f73",1600,900),
 [img("photo-1483347756197-71ef80e95f73"),img("photo-1518562180175-34a163b1a9a6"),
  img("photo-1551524559-8af4e6624178"),img("photo-1517783999520-f068d7431a60"),
  img("photo-1491466424936-e304919aada7"),img("photo-1542401886-65d6c61db217")],
 "December to March (snow & aurora)",
 "Sub-arctic \\u2014 deep cold winters (-10 to -25 \\u00b0C in Lapland) with snow and aurora Dec-Mar; mild bright summers with the midnight sun.",
 195000,
 ["Northern Lights from a glass igloo","Husky sled safari","Reindeer sleigh ride","Santa Claus Village, Rovaniemi","Snowmobile through the taiga","Helsinki & Suomenlinna"],
 ["Indian passport holders need a Schengen visa \\u2014 apply with full documents and travel insurance.","Lapland winters are extremely cold \\u2014 thermal base layers, proper boots and gloves are essential (gear rental available).","The aurora is natural and weather-dependent; multiple nights in Lapland improve the odds.","Euro (EUR) \\u2014 cards accepted everywhere.","Glass-igloo and aurora-cabin stays are limited \\u2014 book the peak Dec-Feb window early."],
 [("Glass Igloo Aurora Night","Lie back in a heated glass igloo and watch the Northern Lights from your bed.","\\ud83d\\udecf\\ufe0f"),
  ("Husky Sled Safari","Mush your own team of huskies across the frozen Lapland wilderness.","\\ud83d\\udc15"),
  ("Santa Claus Village","Cross the Arctic Circle line, meet Santa and post a card from Rovaniemi.","\\ud83c\\udf85"),
  ("Reindeer Sleigh & Sami Culture","A reindeer-drawn sleigh ride and a taste of indigenous Sami life.","\\ud83e\\udd8c")],
 featured=True))

# 7. Europe (multi-country)
blocks.append(dest(
 "Europe","europe","Europe",
 "Grand Multi-Country Tours, West & East",
 "London to Paris to the Swiss Alps and Italy, or the imperial trio of Prague, Vienna and Budapest \\u2014 our Europe tours string the continent's icons into one seamless journey.",
 "Europe rewards the multi-country traveller. Our Western Europe circuit links the headline capitals \\u2014 London's Tower Bridge and Buckingham Palace, Paris's Eiffel Tower and Louvre, the Swiss Alps with cogwheel trains up Jungfrau or Mt Titlis, and Italy's Rome, Venice and Florence \\u2014 connected by fast trains and scenic coaches. It is the classic first-timer's grand tour of the continent.\\n\\nOur Eastern Europe circuit takes a more atmospheric route through the old Habsburg heart \\u2014 fairy-tale Prague with its astronomical clock and castle, imperial Vienna of Schonbrunn and the coffee houses, and Budapest straddling the Danube with its thermal baths and parliament. Both can be tailored from 7 to 16 nights, and combined for the ultimate cross-continent journey.",
 img("photo-1467269204594-9661b134dd2b",1600,900),
 [img("photo-1467269204594-9661b134dd2b"),img("photo-1502602898657-3e91760cbb34"),
  img("photo-1530122037265-a5f1f91d3b99"),img("photo-1515542622106-78bda8ba0e5b"),
  img("photo-1541849546-216549ae216d"),img("photo-1551867633-194f125695e9")],
 "April to October",
 "Mild spring and autumn, warm summers; the Alps stay cool. Winter brings Christmas markets and snow in the mountains.",
 235000,
 ["London \\u2014 Tower Bridge & Westminster","Paris \\u2014 Eiffel Tower & Louvre","Swiss Alps cogwheel trains","Italy \\u2014 Rome, Venice & Florence","Prague, Vienna & Budapest (East)","Fast inter-city trains & scenic coaches"],
 ["Indian passport holders need a Schengen visa (plus a separate UK visa if London is included) \\u2014 apply early with full documents.","Multi-country tours involve train and coach transfers \\u2014 pack light with a single check-in bag.","Euro (EUR) across most of the Eurozone; the UK uses Pounds and Switzerland uses Swiss Francs.","City taxes and some attraction reservations (Eiffel, Vatican) are pre-booked by us.","Distances are short by rail \\u2014 but allow buffer time for border and station transfers."],
 [("Swiss Alps Cogwheel Train","Ride up to a glacier summit (Jungfraujoch or Mt Titlis) for snow and Alpine views in any season.","\\ud83d\\udf04"),
  ("Eiffel Tower & Seine","Summit the Eiffel Tower and cruise the Seine past Paris's illuminated landmarks.","\\ud83d\\uddfc"),
  ("Venice Gondola & Canals","Glide the canals of Venice and wander St Mark's Square.","\\ud83d\\udef6"),
  ("Prague Old Town","The astronomical clock, Charles Bridge and the hilltop castle of fairy-tale Prague.","\\ud83c\\udff0")],
 featured=True))

# 8. Australia
blocks.append(dest(
 "Australia","australia","Australia",
 "Sydney, the Great Barrier Reef & Beyond",
 "The Sydney Opera House, snorkelling the Great Barrier Reef, the Great Ocean Road and koalas in the bush \\u2014 Australia is a sun-drenched mix of cities, reef and outback.",
 "Australia is a country-sized adventure. Sydney opens with its iconic Opera House and Harbour Bridge, Bondi Beach and a harbour cruise, with the Blue Mountains a day trip away. North, in tropical Queensland, Cairns is the gateway to the Great Barrier Reef \\u2014 the world's largest living structure \\u2014 for snorkelling and diving over coral gardens, plus the ancient Daintree Rainforest.\\n\\nMelbourne adds laneway coffee culture, the Great Ocean Road and the Twelve Apostles sea stacks, while wildlife parks bring koalas, kangaroos and wombats up close. Whether it's three cities or a reef-and-rainforest focus, Australia delivers big landscapes, easy English-speaking travel and some of the friendliest people anywhere.",
 img("photo-1523482580672-f109ba8cb9be",1600,900),
 [img("photo-1523482580672-f109ba8cb9be"),img("photo-1506973035872-a4ec16b8e8d9"),
  img("photo-1524293581917-878a6d017c71"),img("photo-1529108190281-9a4f620bc2d8"),
  img("photo-1516026672322-bc52d61a55d5"),img("photo-1494233892892-84542a694e72")],
 "September to November & March to May",
 "Southern-hemisphere seasons (reversed). Sydney/Melbourne are mild in spring/autumn; tropical Cairns is best in the dry May-Oct. December-February is hot summer.",
 215000,
 ["Sydney Opera House & Harbour","Great Barrier Reef snorkelling","Blue Mountains day trip","Great Ocean Road & Twelve Apostles","Koalas & kangaroos","Melbourne laneways"],
 ["Indian passport holders need an Australian visa (Visitor visa, subclass 600) \\u2014 applied online with documents.","Domestic flights connect Sydney, Cairns and Melbourne \\u2014 distances are large.","Australian Dollar (AUD) \\u2014 fully card-friendly; tap payments everywhere.","Sun is strong \\u2014 high-SPF, hat and reef-safe sunscreen are essential on the reef.","Reef trips run from Cairns/Port Douglas; sea conditions vary \\u2014 we pick reputable operators."],
 [("Great Barrier Reef Snorkel","Snorkel or dive over coral gardens and tropical fish on the world's largest reef.","\\ud83d\\udc20"),
  ("Sydney Opera House","Tour the sails of the Opera House and cruise the harbour past the bridge.","\\ud83c\\udfad"),
  ("Great Ocean Road","Drive the cliff-top road to the Twelve Apostles sea stacks at sunset.","\\ud83d\\ude97"),
  ("Wildlife Encounter","Cuddle a koala and hand-feed kangaroos at a wildlife sanctuary.","\\ud83d\\udc28")]))

# 9. New Zealand
blocks.append(dest(
 "New Zealand","new-zealand","New Zealand",
 "Fiords, Glaciers & the Adventure Capital",
 "Milford Sound's fiords, Queenstown's bungy and jetboats, glow-worm caves and Hobbiton \\u2014 New Zealand packs the planet's scenery into two spectacular islands.",
 "New Zealand is scenery turned up to eleven. The North Island offers Auckland's harbour, the Waitomo glow-worm caves, the geothermal geysers and Maori culture of Rotorua, and the green hills of Hobbiton from the Lord of the Rings films. The South Island raises the drama \\u2014 Christchurch and the Canterbury plains, the turquoise lakes of Tekapo and Pukaki beneath Aoraki/Mount Cook, the glaciers of the West Coast, and the fiords of Milford Sound.\\n\\nAt the heart of the South Island is Queenstown, the adventure capital of the world \\u2014 bungy jumping, jetboating, skydiving and gondola luge, ringed by the Remarkables and Lake Wakatipu. Easy English-speaking travel, superb road-tripping and warm Kiwi hospitality make it a bucket-list journey.",
 img("photo-1469521669194-babb45599def",1600,900),
 [img("photo-1469521669194-babb45599def"),img("photo-1507097634215-8d5e4b77c5e9"),
  img("photo-1578645510447-e20b4311e3ce"),img("photo-1504280390367-361c6d9f38f4"),
  img("photo-1530789253388-582c481c54b0"),img("photo-1551524559-8af4e6624178")],
 "October to April",
 "Temperate, southern-hemisphere seasons. Summer (Dec-Feb) is warm and busy; spring/autumn are quieter; the South Island can be cold and snowy in winter.",
 235000,
 ["Milford Sound fiord cruise","Queenstown adventure capital","Aoraki/Mount Cook & Lake Tekapo","Waitomo glow-worm caves","Rotorua geysers & Maori culture","Hobbiton movie set"],
 ["Indian passport holders need a New Zealand visa (Visitor visa) \\u2014 applied online with documents.","Distances and drive times are long but roads are superb \\u2014 self-drive is the classic way.","New Zealand Dollar (NZD) \\u2014 fully card-friendly.","Strict biosecurity \\u2014 declare all food, plant and outdoor gear on arrival.","Weather in the mountains and fiords changes fast \\u2014 layers and a rain shell are a must."],
 [("Milford Sound Cruise","Cruise the sheer cliffs and waterfalls of New Zealand's most famous fiord.","\\u26f0\\ufe0f"),
  ("Queenstown Adrenaline","Bungy, jetboat or skydive in the world's self-styled adventure capital.","\\ud83e\\ude82"),
  ("Glow-Worm Caves","Glide a boat through the Waitomo caves lit by thousands of glow-worms.","\\u2728"),
  ("Hobbiton Movie Set","Walk the Shire's hobbit holes on the green Waikato farmland.","\\ud83c\\udfe1")]))

# 10. Kazakhstan (re-add per docx 7)
blocks.append(dest(
 "Kazakhstan","kazakhstan","Kazakhstan",
 "Almaty, Big Almaty Lake & the Tien Shan",
 "Snow peaks above a green city, the turquoise Big Almaty Lake, Charyn Canyon's red cliffs and the futuristic capital Astana \\u2014 Central Asia's most accessible adventure.",
 "Kazakhstan, the world's largest landlocked country, has become a favourite short-haul escape from India. Almaty, the leafy former capital, sits at the foot of the Tien Shan mountains \\u2014 the Shymbulak ski resort and Kok-Tobe hill are a cable-car ride away, and the glacial Big Almaty Lake glows turquoise in an alpine bowl just outside the city. A day trip reaches Charyn Canyon, a miniature Grand Canyon of red rock often called the Valley of Castles.\\n\\nThe modern capital Astana (Nur-Sultan) showcases futuristic architecture \\u2014 the Bayterek Tower, the Khan Shatyr tent and gleaming ministries. With visa-free or easy e-visa access, short flight times and a mix of mountains, lakes and cities, Kazakhstan offers a fresh, uncrowded destination.",
 img("photo-1596306499317-8490232098fa",1600,900),
 [img("photo-1596306499317-8490232098fa"),img("photo-1605281317010-fe5ffe798166"),
  img("photo-1518684079-3c830dcef090"),img("photo-1551524559-8af4e6624178"),
  img("photo-1490650034439-fd184c3c86a5"),img("photo-1519681393784-d120267933ba")],
 "April to October",
 "Continental \\u2014 warm summers and cold snowy winters. Spring-autumn suit the lakes and canyons; winter is for skiing at Shymbulak.",
 46500,
 ["Big Almaty Lake","Shymbulak & Kok-Tobe cable cars","Charyn Canyon day trip","Almaty city & Green Bazaar","Medeu skating rink","Astana futuristic architecture"],
 ["Indian passport holders get visa-free entry for short stays (up to 14 days) \\u2014 confirm current rules before travel.","Almaty is a short, convenient flight from India \\u2014 great for a 4-5 night trip.","Kazakhstani Tenge (KZT) \\u2014 carry some cash; cards work in the cities.","Mountain weather changes fast \\u2014 Big Almaty Lake can be cold even in summer.","Russian and Kazakh are the main languages; a translation app helps."],
 [("Big Almaty Lake","Drive up to the glacier-fed turquoise lake ringed by Tien Shan peaks.","\\ud83c\\udfd4\\ufe0f"),
  ("Charyn Canyon","Hike the red-rock Valley of Castles, a miniature Grand Canyon.","\\ud83e\\udea8"),
  ("Shymbulak Cable Car","Ride above Almaty to the ski slopes and Medeu skating rink.","\\ud83d\\udf01"),
  ("Astana Skyline","Tour the futuristic Bayterek Tower and Khan Shatyr in the capital.","\\ud83c\\udfd9\\ufe0f")]))

# 11. Uzbekistan (re-add per docx 7)
blocks.append(dest(
 "Uzbekistan","uzbekistan","Uzbekistan",
 "Samarkand, Bukhara & the Silk Road",
 "The blue-tiled madrasas of Samarkand's Registan, the ancient lanes of Bukhara and walled Khiva \\u2014 Uzbekistan is the living heart of the Silk Road.",
 "Uzbekistan is the jewel of the Silk Road. Samarkand dazzles with the Registan \\u2014 three towering madrasas clad in turquoise and gold mosaic \\u2014 plus the Gur-e-Amir tomb of Timur and the Shah-i-Zinda avenue of mausoleums. Bukhara, a vast open-air museum, layers minarets, trading domes and the Ark fortress across a walkable old city, while Khiva's walled Itchan Kala feels like stepping into a frozen medieval caravan town.\\n\\nThe capital Tashkent adds a modern, metro-served contrast and a moving history. A high-speed train links Tashkent, Samarkand and Bukhara, making the classic Silk Road trio easy and comfortable. With warm hospitality, fine cuisine (the plov, the bread) and easy e-visa access, Uzbekistan is one of Asia's most rewarding cultural journeys.",
 img("photo-1602523961757-3c4f9d2f6a8c",1600,900),
 [img("photo-1602523961757-3c4f9d2f6a8c"),img("photo-1601921004897-c6e16a3a1c63"),
  img("photo-1564507592333-c60657eea523"),img("photo-1518684079-3c830dcef090"),
  img("photo-1539020140153-e479b8c22e70"),img("photo-1519681393784-d120267933ba")],
 "April to June & September to October",
 "Continental desert \\u2014 hot summers and cold winters. Spring and autumn are the comfortable seasons for sightseeing.",
 62000,
 ["Samarkand Registan Square","Shah-i-Zinda & Gur-e-Amir","Bukhara old city & the Ark","Khiva walled Itchan Kala","Tashkent metro & bazaars","High-speed Silk Road train"],
 ["Indian passport holders get an easy Uzbekistan e-visa \\u2014 applied online before travel.","The Afrosiyob high-speed train links Tashkent-Samarkand-Bukhara \\u2014 book seats ahead.","Uzbekistani Som (UZS) \\u2014 carry cash; cards are growing but not universal.","Summers are very hot \\u2014 spring and autumn are far more comfortable for the old cities.","Modest dress is appreciated when visiting mosques and mausoleums."],
 [("Registan Square","Stand before the three mosaic-clad madrasas of Samarkand, the Silk Road's grandest sight.","\\ud83d\\udd4c"),
  ("Bukhara Old City","Wander minarets, trading domes and the Ark fortress of a 2,000-year-old city.","\\ud83d\\udd4b"),
  ("Khiva Itchan Kala","Walk the walled medieval town at golden hour, a frozen caravan city.","\\ud83c\\udff0"),
  ("Silk Road Cuisine","Taste Uzbek plov, samsa and fresh tandoor bread with local families.","\\ud83c\\udf72")]))

# Insert before the destinations array close `]`
anchor = "\n]\n\n/* ─── Helper: get a destination by slug"
idx = c.index(anchor)
c = c[:idx] + "\n" + "".join(blocks).rstrip("\n") + "\n" + c[idx:]

# Remove now-live entries from comingSoonDestinations
for slug in ["europe","switzerland","italy","australia","new-zealand","finland"]:
    pat = re.compile(r'  \{\n    name: "[^"]*",\n    slug: "'+re.escape(slug)+r'",.*?\n  \},\n', re.DOTALL)
    c2 = pat.sub('', c, count=1)
    if c2 != c:
        print("Removed from coming-soon:", slug)
        c = c2

open(PATH,'w',encoding='utf-8').write(c)
print("\nDestinations added:", len(blocks))
