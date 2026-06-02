# -*- coding: utf-8 -*-
"""FIX: the earlier add-intl-destinations.py removal regex matched the new LIVE
Europe/Finland/Australia/New Zealand blocks (first occurrence) instead of the
coming-soon ones, so those 4 ended up coming-soon-only and their packages 404'd.
Re-add the 4 as LIVE destinations and remove them from comingSoon (scoped)."""
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

# Safety: don't double-add if a live block already exists
live_part = c.split('comingSoonDestinations')[0]
blocks = []

if 'slug: "finland"' not in live_part:
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

if 'slug: "europe"' not in live_part:
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

if 'slug: "australia"' not in live_part:
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

if 'slug: "new-zealand"' not in live_part:
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

# Insert live blocks before the destinations array close
if blocks:
    anchor = "\n]\n\n/* ─── Helper: get a destination by slug"
    idx = c.index(anchor)
    c = c[:idx] + "\n" + "".join(blocks).rstrip("\n") + "\n" + c[idx:]
    print("Re-added live:", len(blocks))

# Remove the 4 from the comingSoon section ONLY (scoped after the declaration)
cs_decl = c.index('export const comingSoonDestinations')
head, tail = c[:cs_decl], c[cs_decl:]
for slug in ["europe","australia","new-zealand","finland"]:
    pat = re.compile(r'  \{\n    name: "[^"]*",\n    slug: "'+re.escape(slug)+r'",.*?\n  \},\n', re.DOTALL)
    tail2 = pat.sub('', tail, count=1)
    if tail2 != tail:
        print("Removed from coming-soon:", slug)
        tail = tail2
c = head + tail

open(PATH,'w',encoding='utf-8').write(c)
print("Done.")
