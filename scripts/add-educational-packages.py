# -*- coding: utf-8 -*-
"""Add student educational tour packages (school/college groups), modeled on the
bharatbooking educational-adventure-trips reference. Category: educational,
group-oriented (20-150 students), affordable, with clear learning focus."""
import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
PATH = r'E:\TravelSense\travelsense\src\data\packages.ts'
c = open(PATH, encoding='utf-8').read()

U = "https://images.unsplash.com/"
def im(id, w=1600, h=900): return f"{U}{id}?w={w}&h={h}&fit=crop"

EDU_NOTE = ("Designed for school and college groups (20-150 students). Price is per student on "
            "group sharing; accompanying teachers/escorts travel complimentary as per group size. "
            "Includes a TravelSense tour educator, a learning workbook, first-aid and 24x7 supervision. "
            "Dates, board (veg/Jain meals) and the academic focus are customised to your institution.")

def day(n, t, desc, acts, meals, acc, hi, img):
    a = ", ".join(f'"{x}"' for x in acts)
    return ("      {\n"
            f"        day: {n},\n        title: \"{t}\",\n"
            f"        description:\n          \"{desc}\",\n"
            f"        activities: [{a}],\n        meals: \"{meals}\",\n"
            f"        accommodation: \"{acc}\",\n        highlight: \"{hi}\",\n        image: \"{img}\",\n      }},\n")

def pkg(title, slug, dname, dslug, desc, hero, imgs, days, nights, price, disc,
        gmin, gmax, rating, reviews, incl, hi, focus, itin):
    images = ",\n".join(f'      "{x}"' for x in imgs)
    inc = ",\n".join(f'      "{x}"' for x in incl)
    hl = ",\n".join(f'      "{x}"' for x in hi)
    excl = ["Train/flight fare to and from the start city","Personal expenses and shopping",
            "Any monument/activity not listed in the inclusions","Travel insurance (can be arranged on request)",
            "Anything not mentioned under inclusions"]
    exc = ",\n".join(f'      "{x}"' for x in excl)
    return f'''  {{
    title: "{title}",
    slug: "{slug}",
    destinationName: "{dname}",
    destinationSlug: "{dslug}",
    category: "educational",
    description:
      "{desc}",
    heroImage: "{hero}",
    images: [
{images},
    ],
    duration: {{ days: {days}, nights: {nights} }},
    price: {price},
    discountedPrice: {disc},
    difficulty: "Easy",
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
    transparencyNote:
      "{EDU_NOTE}",
    experienceStory:
      "{focus}",
    featured: false,
    itinerary: [
{itin}    ],
  }},
'''

INC_COMMON = ["Accommodation in student-friendly hotels/hostels (dorm or sharing)",
              "All meals — breakfast, lunch and dinner (veg/Jain available)",
              "All transfers and sightseeing in private buses/tempo travellers",
              "TravelSense tour educator + local guides",
              "All listed monument and activity entry fees",
              "First-aid kit and 24x7 supervision"]

OUT = []

# 1. Jim Corbett wildlife
OUT.append(pkg(
 "Jim Corbett Wildlife & Nature Camp — Student Tour","student-corbett-wildlife-3d",
 "Uttarakhand","uttarakhand",
 "A three-day wildlife and nature learning camp at Jim Corbett, India's oldest tiger reserve — jeep safaris, a nature-interpretation centre and riverside ecology walks that bring biology and conservation to life for students.",
 im("photo-1549366021-9f761d450615"),
 [im("photo-1549366021-9f761d450615",800,600),im("photo-1564349683136-77e08dba1ef7",800,600),im("photo-1602491453631-e2a5ad90a131",800,600),im("photo-1472396961693-142e6e269027",800,600)],
 3,2,7000,6000,20,120,4.7,38,INC_COMMON,
 ["Jim Corbett jeep safari","Tiger reserve & ecosystems","Nature interpretation centre","Kosi river ecology walk","Conservation & biodiversity learning"],
 "A hands-on introduction to wildlife biology and conservation — students track signs of tiger, elephant and deer on a guided jeep safari, learn how a tiger reserve protects an ecosystem, and study river and forest habitats with a naturalist.",
 "".join([
  day(1,"Delhi/NCR to Jim Corbett — Nature Orientation","Board the bus to Jim Corbett (approx. 6 hrs). Check in to the resort, an evening nature-orientation session with the tour educator, and a briefing on the park's wildlife and rules.",["Drive to Corbett","Nature orientation","Wildlife briefing"],"Lunch, Dinner","Student resort near Corbett","First evening in tiger country",im("photo-1549366021-9f761d450615")),
  day(2,"Dawn Jeep Safari & River Ecology","An early jeep safari into the Bijrani/Jhirna zone in search of tigers, elephants and deer. Afternoon at the nature-interpretation centre and a guided walk along the Kosi river to study riverine ecology.",["Dawn jeep safari","Wildlife spotting","Interpretation centre","Kosi river ecology walk"],"Breakfast, Lunch, Dinner","Student resort near Corbett","The dawn jungle safari",im("photo-1564349683136-77e08dba1ef7")),
  day(3,"Corbett to Delhi — Departure","After breakfast and a wrap-up session on what was learned, drive back to Delhi/NCR for departure.",["Wrap-up session","Drive to Delhi","Departure"],"Breakfast","N/A — Departure","A field lesson in conservation",im("photo-1602491453631-e2a5ad90a131")),
 ])))

# 2. Delhi-Agra heritage
OUT.append(pkg(
 "Delhi & Agra Heritage & Monuments — Student Tour","student-delhi-agra-heritage-4d",
 "Golden Triangle","golden-triangle",
 "A four-day history-and-architecture tour of Delhi and Agra for students — the Red Fort, Qutub Minar and Humayun's Tomb, a science centre, and the Taj Mahal, Agra Fort and Fatehpur Sikri, turning textbook history into living monuments.",
 im("photo-1564507592333-c60657eea523"),
 [im("photo-1564507592333-c60657eea523",800,600),im("photo-1524492412937-b28074a5d7da",800,600),im("photo-1548013146-72479768bada",800,600),im("photo-1587474260584-136574528ed5",800,600)],
 4,3,6000,5500,25,150,4.8,52,INC_COMMON,
 ["Taj Mahal & Agra Fort","Red Fort & Qutub Minar","Humayun's Tomb (UNESCO)","National Science Centre","Fatehpur Sikri","Mughal & Sultanate history"],
 "Mughal and Sultanate history come alive: students read the architecture of the Red Fort and Qutub Minar, decode the symmetry of the Taj Mahal, and connect the dots between empire, art and science across Delhi and Agra.",
 "".join([
  day(1,"Delhi — Red Fort, Jama Masjid & Qutub Minar","Arrive in Delhi and begin with the Red Fort and Chandni Chowk, then the towering Qutub Minar and India Gate, with the tour educator framing the Sultanate and Mughal timeline.",["Red Fort","Chandni Chowk","Qutub Minar","India Gate"],"Lunch, Dinner","Student hotel in Delhi","Standing inside the Red Fort",im("photo-1587474260584-136574528ed5")),
  day(2,"Delhi — Humayun's Tomb & Science Centre","Humayun's Tomb (the blueprint for the Taj) and the Lotus Temple in the morning; afternoon at the National Science Centre / Nehru Planetarium for an interactive science session.",["Humayun's Tomb","Lotus Temple","National Science Centre","Planetarium show"],"Breakfast, Lunch, Dinner","Student hotel in Delhi","A hands-on science afternoon",im("photo-1548013146-72479768bada")),
  day(3,"Drive to Agra — Taj Mahal & Agra Fort","Drive to Agra on the expressway. Visit the Taj Mahal and study its Mughal architecture and symmetry, then the red-sandstone Agra Fort overlooking the Yamuna.",["Drive to Agra","Taj Mahal","Agra Fort","Mughal architecture study"],"Breakfast, Lunch, Dinner","Student hotel in Agra","The Taj Mahal up close",im("photo-1564507592333-c60657eea523")),
  day(4,"Fatehpur Sikri & Departure","Visit the abandoned Mughal capital of Fatehpur Sikri (UNESCO) en route back to Delhi for departure.",["Fatehpur Sikri","Buland Darwaza","Drive to Delhi","Departure"],"Breakfast","N/A — Departure","The ghost city of Fatehpur Sikri",im("photo-1524492412937-b28074a5d7da")),
 ])))

# 3. Jaipur astronomy/heritage
OUT.append(pkg(
 "Jaipur Royal Heritage & Astronomy — Student Tour","student-jaipur-heritage-3d",
 "Rajasthan","rajasthan",
 "A three-day Pink City tour for students — the Amber Fort, City Palace and Hawa Mahal alongside the Jantar Mantar, the world's largest stone astronomical observatory, blending Rajput history with hands-on astronomy.",
 im("photo-1599661046289-e31897846e41"),
 [im("photo-1599661046289-e31897846e41",800,600),im("photo-1477587458883-47145ed94245",800,600),im("photo-1603262110263-fb0112e7cc33",800,600),im("photo-1524492412937-b28074a5d7da",800,600)],
 3,2,5500,5000,25,150,4.7,44,INC_COMMON,
 ["Amber Fort & Jaigarh","Jantar Mantar observatory","City Palace & Hawa Mahal","Albert Hall Museum","Rajput history & astronomy"],
 "Astronomy meets architecture: at Jantar Mantar students read the giant sundials and instruments that measured time and the stars, then explore how the Rajputs built and defended the Amber Fort and the Pink City.",
 "".join([
  day(1,"Jaipur — City Palace, Jantar Mantar & Hawa Mahal","Arrive in Jaipur and explore the City Palace, the Jantar Mantar observatory (a UNESCO site of giant astronomical instruments) and the honeycomb facade of Hawa Mahal.",["City Palace","Jantar Mantar observatory","Hawa Mahal","Astronomy session"],"Lunch, Dinner","Student hotel in Jaipur","Reading the giant sundials",im("photo-1599661046289-e31897846e41")),
  day(2,"Amber Fort, Jaigarh & Albert Hall","Morning at the hilltop Amber Fort and the Jaigarh Fort with the world's largest cannon-on-wheels; afternoon at the Albert Hall Museum and the local bazaars for handicrafts.",["Amber Fort","Jaigarh Fort","Albert Hall Museum","Bazaar walk"],"Breakfast, Lunch, Dinner","Student hotel in Jaipur","The ramparts of Amber Fort",im("photo-1477587458883-47145ed94245")),
  day(3,"Jaipur Departure","After breakfast and a wrap-up, transfer to the station/airport for departure.",["Wrap-up session","Departure"],"Breakfast","N/A — Departure","A royal history field trip",im("photo-1603262110263-fb0112e7cc33")),
 ])))

# 4. Shimla-Manali ecology/adventure
OUT.append(pkg(
 "Shimla–Manali Himalayan Adventure & Ecology — Student Tour","student-shimla-manali-5d",
 "Himachal Pradesh","himachal-pradesh",
 "A five-day Himalayan camp for students across Shimla and Manali — colonial hill-station history, alpine ecology and safe adventure activities at Solang Valley, with the mountains as the classroom.",
 im("photo-1626621341517-bbf3d9990a23"),
 [im("photo-1626621341517-bbf3d9990a23",800,600),im("photo-1605649461784-ee5eb326f1d3",800,600),im("photo-1571536802807-30451a456b58",800,600),im("photo-1544735716-392fe2489ffa",800,600)],
 5,4,7000,6500,20,120,4.7,40,INC_COMMON,
 ["Shimla Ridge & Kufri","Manali — Hadimba & Solang Valley","Atal Tunnel & Himalayan ecology","Safe adventure activities","Colonial hill-station history"],
 "The Himalaya as a living lab: students study alpine forests and glacial valleys, learn how the British built Shimla, and build teamwork and confidence through supervised adventure activities at Solang Valley.",
 "".join([
  day(1,"Chandigarh to Shimla","Board the bus to Shimla, the former summer capital of British India. Evening walk on the Ridge and Mall Road with a history briefing.",["Drive to Shimla","The Ridge","Mall Road","History briefing"],"Lunch, Dinner","Student hotel in Shimla","First evening on the Ridge",im("photo-1626621341517-bbf3d9990a23")),
  day(2,"Shimla — Kufri & Colonial Heritage","Visit Kufri for Himalayan views and the nature park, the Viceregal Lodge and Christ Church — studying colonial architecture and mountain ecology.",["Kufri","Himalayan Nature Park","Viceregal Lodge","Christ Church"],"Breakfast, Lunch, Dinner","Student hotel in Shimla","Himalayan views from Kufri",im("photo-1571536802807-30451a456b58")),
  day(3,"Shimla to Manali via Kullu Valley","Scenic drive to Manali along the Beas river through the Kullu valley, with stops to understand river and valley geography.",["Kullu valley drive","Beas river","River geography stop","Manali check-in"],"Breakfast, Lunch, Dinner","Student hotel in Manali","Following the Beas to Manali",im("photo-1605649461784-ee5eb326f1d3")),
  day(4,"Solang Valley Adventure & Atal Tunnel","A full day at Solang Valley for safe, supervised adventure activities (ropeway, zorbing), then the Atal Tunnel and Hadimba Temple — a lesson in mountain engineering and ecology.",["Solang Valley activities","Ropeway","Atal Tunnel","Hadimba Temple"],"Breakfast, Lunch, Dinner","Student hotel in Manali","Adventure day at Solang",im("photo-1544735716-392fe2489ffa")),
  day(5,"Manali to Chandigarh — Departure","After breakfast and a wrap-up session, drive back to Chandigarh for departure.",["Wrap-up session","Drive to Chandigarh","Departure"],"Breakfast","N/A — Departure","Mountains as the classroom",im("photo-1626621341517-bbf3d9990a23")),
 ])))

# 5. Nainital lake ecology
OUT.append(pkg(
 "Nainital Lake District Ecology — Student Tour","student-nainital-ecology-4d",
 "Uttarakhand","uttarakhand",
 "A four-day ecology tour of the Kumaon lake district — Naini, Bhimtal, Sattal and Naukuchiatal lakes plus the birding forests of Pangot — where students study freshwater ecosystems and Himalayan birdlife first-hand.",
 im("photo-1558431382-27e303142255"),
 [im("photo-1558431382-27e303142255",800,600),im("photo-1605649461784-ee5eb326f1d3",800,600),im("photo-1472396961693-142e6e269027",800,600),im("photo-1571536802807-30451a456b58",800,600)],
 4,3,8000,7500,20,100,4.7,33,INC_COMMON,
 ["Naini Lake ecology","Bhimtal, Sattal & Naukuchiatal","Pangot birding forest","Snow View cable car","Freshwater & forest ecosystems"],
 "Freshwater ecology in the field: students compare the lake systems of the Kumaon — Naini, Bhimtal, Sattal and Naukuchiatal — and spend a morning birding in the oak forests of Pangot to understand Himalayan biodiversity.",
 "".join([
  day(1,"Delhi/NCR to Nainital","Drive up to Nainital, the gem of the Kumaon. Evening boat on the emerald Naini Lake and an orientation on the region's lake systems.",["Drive to Nainital","Naini Lake boat","Lake-system orientation"],"Lunch, Dinner","Student hotel in Nainital","First boat on Naini Lake",im("photo-1558431382-27e303142255")),
  day(2,"Lake District — Bhimtal, Sattal & Naukuchiatal","A full day studying the satellite lakes — Bhimtal with its island aquarium, the seven interconnected lakes of Sattal, and the nine-cornered Naukuchiatal — comparing their ecology.",["Bhimtal & aquarium","Sattal lakes","Naukuchiatal","Freshwater ecology study"],"Breakfast, Lunch, Dinner","Student hotel in Nainital","Seven lakes at Sattal",im("photo-1472396961693-142e6e269027")),
  day(3,"Snow View & Pangot Birding","Cable car to Snow View for Himalayan peaks, then a morning in the birding forests of Pangot with a naturalist to spot Himalayan species.",["Snow View cable car","Pangot birding walk","Naturalist session"],"Breakfast, Lunch, Dinner","Student hotel in Nainital","Birding in the oak forest",im("photo-1571536802807-30451a456b58")),
  day(4,"Nainital to Delhi — Departure","After breakfast and a wrap-up, drive back to Delhi/NCR for departure.",["Wrap-up session","Drive to Delhi","Departure"],"Breakfast","N/A — Departure","A lesson in lake ecology",im("photo-1605649461784-ee5eb326f1d3")),
 ])))

# 6. Haridwar-Rishikesh Ganga & adventure
OUT.append(pkg(
 "Haridwar & Rishikesh — Ganga, Ecology & Adventure Student Tour","student-haridwar-rishikesh-3d",
 "Uttarakhand","uttarakhand",
 "A three-day Ganga tour for students — the grand Har ki Pauri aarti at Haridwar, river ecology and white-water rafting at Rishikesh, and an introduction to yoga, blending culture, environment and adventure.",
 im("photo-1591018533274-7986e34c5f9c"),
 [im("photo-1591018533274-7986e34c5f9c",800,600),im("photo-1561361513-2d000a50f0dc",800,600),im("photo-1544735716-392fe2489ffa",800,600),im("photo-1605649461784-ee5eb326f1d3",800,600)],
 3,2,4000,3400,20,120,4.6,47,INC_COMMON,
 ["Har ki Pauri Ganga Aarti","Rishikesh suspension bridges","White-water rafting (graded)","River ecology session","Yoga introduction"],
 "The Ganga as culture and ecosystem: students witness the Har ki Pauri aarti, study how a Himalayan river shapes life downstream, and learn teamwork and safety on a graded white-water rafting stretch at Rishikesh.",
 "".join([
  day(1,"Haridwar — Har ki Pauri Ganga Aarti","Arrive in Haridwar and head to Har ki Pauri for the famous evening Ganga Aarti, with a session on the river's cultural and ecological importance.",["Har ki Pauri","Ganga Aarti","River-culture session"],"Lunch, Dinner","Student hotel in Haridwar","Diyas on the Ganga at dusk",im("photo-1591018533274-7986e34c5f9c")),
  day(2,"Rishikesh — Rafting & River Ecology","Drive to Rishikesh for a graded, fully-supervised white-water rafting stretch, the Lakshman/Ram Jhula suspension bridges, a river-ecology talk and an evening yoga introduction.",["White-water rafting","Lakshman Jhula","River ecology talk","Yoga introduction"],"Breakfast, Lunch, Dinner","Student hotel in Rishikesh","Rafting the Ganga rapids",im("photo-1561361513-2d000a50f0dc")),
  day(3,"Rishikesh Departure","After breakfast and a wrap-up, transfer for departure.",["Wrap-up session","Departure"],"Breakfast","N/A — Departure","Culture, river and adventure",im("photo-1544735716-392fe2489ffa")),
 ])))

# 7. Gangtok-Darjeeling tea science
OUT.append(pkg(
 "Gangtok & Darjeeling — Himalayan Culture & Tea Science Student Tour","student-gangtok-darjeeling-5d",
 "Sikkim & Darjeeling","sikkim-darjeeling",
 "A five-day Eastern-Himalayan tour for students — Gangtok's monasteries and zoological park, Darjeeling's tea estates and the toy-train, and a sunrise over Kanchenjunga from Tiger Hill — combining mountain geography, tea science and culture.",
 im("photo-1544233726-9f1d2b27be8b"),
 [im("photo-1544233726-9f1d2b27be8b",800,600),im("photo-1622308644420-b20142dc993c",800,600),im("photo-1605649461784-ee5eb326f1d3",800,600),im("photo-1571536802807-30451a456b58",800,600)],
 5,4,9000,8000,20,90,4.8,29,INC_COMMON,
 ["Tiger Hill Kanchenjunga sunrise","Darjeeling tea estate & processing","Darjeeling Himalayan Railway (toy train)","Gangtok Rumtek & Zoological Park","Himalayan geography & tea science"],
 "Tea from leaf to cup: students tour a working Darjeeling estate to see plucking, withering and processing, ride the UNESCO toy-train, and study Eastern-Himalayan geography and culture from Gangtok's monasteries to Tiger Hill.",
 "".join([
  day(1,"Bagdogra to Gangtok","Arrive at Bagdogra and drive up to Gangtok, the Sikkim capital. Evening orientation and a walk on M.G. Marg.",["Drive to Gangtok","M.G. Marg","Orientation"],"Lunch, Dinner","Student hotel in Gangtok","Into the Eastern Himalaya",im("photo-1544233726-9f1d2b27be8b")),
  day(2,"Gangtok — Rumtek & Himalayan Zoological Park","Visit the Rumtek Monastery, the Himalayan Zoological Park (red panda, snow leopard) and the Namgyal Institute of Tibetology — a study of Himalayan ecology and Buddhist culture.",["Rumtek Monastery","Himalayan Zoological Park","Institute of Tibetology","Handicraft centre"],"Breakfast, Lunch, Dinner","Student hotel in Gangtok","Red pandas at the zoo park",im("photo-1622308644420-b20142dc993c")),
  day(3,"Gangtok to Darjeeling","Scenic drive to Darjeeling, the tea capital. Evening at the Chowrasta Mall with a briefing on the region's tea history.",["Drive to Darjeeling","Chowrasta Mall","Tea-history briefing"],"Breakfast, Lunch, Dinner","Student hotel in Darjeeling","Arriving in tea country",im("photo-1605649461784-ee5eb326f1d3")),
  day(4,"Tiger Hill Sunrise, Tea Estate & Toy Train","Pre-dawn trip to Tiger Hill for sunrise over Kanchenjunga, then a working tea estate to study tea processing, the Himalayan Mountaineering Institute, and a ride on the UNESCO Darjeeling Himalayan Railway.",["Tiger Hill sunrise","Tea estate & processing","HMI & Padmaja Zoo","Toy-train joy ride"],"Breakfast, Lunch, Dinner","Student hotel in Darjeeling","Sunrise on Kanchenjunga",im("photo-1571536802807-30451a456b58")),
  day(5,"Darjeeling to Bagdogra — Departure","After breakfast and a wrap-up, drive down to Bagdogra for departure.",["Wrap-up session","Drive to Bagdogra","Departure"],"Breakfast","N/A — Departure","Tea science in the field",im("photo-1544233726-9f1d2b27be8b")),
 ])))

# 8. Goa heritage & coastal ecology
OUT.append(pkg(
 "Goa Heritage & Coastal Ecology — Student Tour","student-goa-heritage-ecology-4d",
 "Goa","goa",
 "A four-day Goa tour for students — the UNESCO churches of Old Goa and Portuguese heritage, a spice plantation for botany, and the beaches and forts of the coast for marine and coastal ecology.",
 im("photo-1512343879784-a960bf40e7f2"),
 [im("photo-1512343879784-a960bf40e7f2",800,600),im("photo-1587922546307-776227941871",800,600),im("photo-1559677201-2c0e6d38b1e9",800,600),im("photo-1605649461784-ee5eb326f1d3",800,600)],
 4,3,5500,5000,20,120,4.6,36,INC_COMMON,
 ["Old Goa UNESCO churches","Portuguese colonial heritage","Spice plantation (botany)","Aguada Fort & beaches","Marine & coastal ecology"],
 "Colonial history and coastal ecology side by side: students explore the 16th-century churches of Old Goa, learn botany on a working spice plantation, and study intertidal and beach ecosystems along the Arabian Sea coast.",
 "".join([
  day(1,"Arrive Goa — Coastal Orientation","Arrive in Goa and check in. Evening orientation at a calm beach with an introduction to the coast's geography and the trip's themes.",["Arrival & check-in","Beach orientation","Theme briefing"],"Lunch, Dinner","Student hotel in Goa","First sunset on the Arabian Sea",im("photo-1512343879784-a960bf40e7f2")),
  day(2,"Old Goa Churches & Spice Plantation","Morning at the UNESCO churches of Old Goa — the Basilica of Bom Jesus and Se Cathedral — studying Portuguese colonial history; afternoon at a working spice plantation for a botany and agriculture session.",["Basilica of Bom Jesus","Se Cathedral","Portuguese heritage walk","Spice plantation botany"],"Breakfast, Lunch, Dinner","Student hotel in Goa","Inside the Basilica of Bom Jesus",im("photo-1587922546307-776227941871")),
  day(3,"Forts, Beaches & Marine Ecology","Visit Aguada Fort and a lighthouse, then a guided session on beach and intertidal ecology, ending with supervised time at a calm beach.",["Aguada Fort","Lighthouse","Marine ecology session","Supervised beach time"],"Breakfast, Lunch, Dinner","Student hotel in Goa","Tide pools and coastal ecology",im("photo-1559677201-2c0e6d38b1e9")),
  day(4,"Goa Departure","After breakfast and a wrap-up, transfer to the station/airport for departure.",["Wrap-up session","Departure"],"Breakfast","N/A — Departure","History and ecology by the sea",im("photo-1605649461784-ee5eb326f1d3")),
 ])))

# insert before the packages array close
anchor = c.rfind('\n  },\n')
insert_pos = anchor + len('\n  },\n')
c = c[:insert_pos] + "".join(OUT) + c[insert_pos:]
open(PATH, 'w', encoding='utf-8').write(c)
print("Educational packages added:", len(OUT))
