import { createClient } from "@sanity/client"

const client = createClient({
  projectId: "vq3r9df8",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

// ═══════════════════════════════════════════════════════════
// DESTINATIONS (from Excel + expanded with descriptions)
// ═══════════════════════════════════════════════════════════

const destinations = [
  // ── NORTH INDIA ──
  {
    name: "Kashmir",
    region: "north_india",
    country: "India",
    category: "leisure",
    description: "Paradise on Earth — snow-capped peaks, pristine lakes, and Mughal gardens make Kashmir India's most romantic destination.",
    bestTimeToVisit: "March to October",
    weather: "Cool summers (15-30°C), cold winters with heavy snowfall",
    startingPrice: 18000,
    highlights: ["Dal Lake Shikara Ride", "Gulmarg Gondola", "Pahalgam Valley", "Sonmarg Glaciers", "Mughal Gardens", "Vaishnodevi Temple"],
    featured: true,
  },
  {
    name: "Leh-Ladakh",
    region: "north_india",
    country: "India",
    category: "adventure",
    description: "The land of high passes — rugged landscapes, ancient monasteries, and the world's highest motorable roads await the adventurous traveler.",
    bestTimeToVisit: "June to September",
    weather: "Cold desert climate, summers 15-25°C, winters -20°C to 5°C",
    startingPrice: 22000,
    highlights: ["Pangong Lake", "Nubra Valley", "Khardung La Pass", "Magnetic Hill", "Kargil", "Hemis Monastery", "Turtuk Village"],
    featured: true,
  },
  {
    name: "Himachal Pradesh",
    region: "north_india",
    country: "India",
    category: "leisure",
    description: "From colonial hill stations to adventure hotspots — Himachal offers Shimla's charm, Manali's adventure, and Dharamshala's spiritual peace.",
    bestTimeToVisit: "March to June, October to November",
    weather: "Pleasant summers (10-25°C), snowy winters in higher regions",
    startingPrice: 12000,
    highlights: ["Shimla Mall Road", "Solang Valley", "Rohtang Pass", "Dharamshala & McLeodganj", "Bir Billing Paragliding", "Kasol & Kheerganga"],
    featured: true,
  },
  {
    name: "Rajasthan",
    region: "west_india",
    country: "India",
    category: "leisure",
    description: "The Land of Kings — majestic forts, colorful bazaars, vast deserts, and royal hospitality define India's most culturally rich state.",
    bestTimeToVisit: "October to March",
    weather: "Hot summers (40-45°C), pleasant winters (10-25°C)",
    startingPrice: 15000,
    highlights: ["Jaipur Amber Fort", "Jaisalmer Desert Safari", "Udaipur Lake Palace", "Ranthambore Tiger Reserve", "Pushkar Camel Fair", "Jodhpur Blue City"],
    featured: true,
  },
  {
    name: "Varanasi & Uttar Pradesh",
    region: "north_india",
    country: "India",
    category: "educational",
    description: "The spiritual heart of India — ancient ghats, sacred temples, and 5000 years of living history along the banks of the Ganges.",
    bestTimeToVisit: "October to March",
    weather: "Hot summers, pleasant winters (8-25°C)",
    startingPrice: 10000,
    highlights: ["Ganga Aarti at Dashashwamedh Ghat", "Ayodhya Ram Mandir", "Prayagraj Sangam", "Sarnath Buddhist Site", "Agra Taj Mahal", "Mathura-Vrindavan"],
    featured: false,
  },
  {
    name: "Golden Triangle",
    region: "north_india",
    country: "India",
    category: "educational",
    description: "India's most iconic circuit — Delhi's monuments, Agra's Taj Mahal, and Jaipur's royal heritage packed into one unforgettable journey.",
    bestTimeToVisit: "October to March",
    weather: "Hot summers, pleasant winters (10-25°C)",
    startingPrice: 12000,
    highlights: ["Taj Mahal Sunrise", "Amber Fort Elephant Ride", "Red Fort Delhi", "Qutub Minar", "Hawa Mahal", "Chandni Chowk Food Walk"],
    featured: true,
  },
  {
    name: "Uttarakhand",
    region: "north_india",
    country: "India",
    category: "adventure",
    description: "Dev Bhoomi — the Land of Gods. From Rishikesh's white-water rapids to Auli's ski slopes, Uttarakhand blends spirituality with adventure.",
    bestTimeToVisit: "March to June, September to November",
    weather: "Cool hills (10-25°C in summer), snowy peaks in winter",
    startingPrice: 11000,
    highlights: ["Rishikesh River Rafting", "Haridwar Ganga Aarti", "Nainital Boating", "Jim Corbett Safari", "Chopta Tungnath Trek", "Auli Skiing", "Mussoorie"],
    featured: true,
  },
  // ── NORTHEAST INDIA ──
  {
    name: "Meghalaya",
    region: "northeast_india",
    country: "India",
    category: "adventure",
    description: "The Abode of Clouds — living root bridges, crystal-clear rivers, spectacular waterfalls, and the wettest place on Earth.",
    bestTimeToVisit: "October to May",
    weather: "Cool and wet, 15-25°C year-round, heavy monsoon rains",
    startingPrice: 18000,
    highlights: ["Living Root Bridges", "Dawki River", "Nohkalikai Falls", "Mawlynnong Cleanest Village", "Shillong Peak", "Elephant Falls"],
    featured: true,
  },
  {
    name: "Sikkim & Darjeeling",
    region: "northeast_india",
    country: "India",
    category: "leisure",
    description: "Himalayan jewels — Kanchenjunga views, Buddhist monasteries, toy train rides, and the world's finest tea gardens.",
    bestTimeToVisit: "March to June, October to December",
    weather: "Cool and pleasant (10-20°C), cold winters",
    startingPrice: 16000,
    highlights: ["Tsomgo Lake", "Nathula Pass", "Darjeeling Toy Train", "Tiger Hill Sunrise", "Pelling Skywalk", "Rumtek Monastery"],
    featured: false,
  },
  {
    name: "Arunachal Pradesh",
    region: "northeast_india",
    country: "India",
    category: "adventure",
    description: "India's hidden frontier — pristine tribal culture, untouched landscapes, stunning monasteries, and the sunrise point of India.",
    bestTimeToVisit: "March to October",
    weather: "Cool to cold (5-25°C), monsoon June-September",
    startingPrice: 20000,
    highlights: ["Tawang Monastery", "Sela Pass", "Ziro Valley", "Namdapha National Park", "Mechuka Valley", "Bumla Pass"],
    featured: false,
  },
  {
    name: "Assam",
    region: "northeast_india",
    country: "India",
    category: "leisure",
    description: "Gateway to Northeast India — tea gardens stretching to the horizon, one-horned rhinos, mighty Brahmaputra, and vibrant Bihu culture.",
    bestTimeToVisit: "November to April",
    weather: "Warm and humid (15-35°C), heavy monsoon rains",
    startingPrice: 14000,
    highlights: ["Kaziranga One-horned Rhino", "Majuli River Island", "Kamakhya Temple", "Tea Garden Walks", "Brahmaputra River Cruise", "Manas National Park"],
    featured: false,
  },
  // ── SOUTH INDIA ──
  {
    name: "Kerala",
    region: "south_india",
    country: "India",
    category: "leisure",
    description: "God's Own Country — backwater houseboats, Ayurvedic retreats, spice plantations, and pristine beaches in tropical paradise.",
    bestTimeToVisit: "September to March",
    weather: "Tropical (25-35°C), monsoon June-August",
    startingPrice: 14000,
    highlights: ["Alleppey Houseboat", "Munnar Tea Gardens", "Thekkady Periyar Wildlife", "Kovalam Beach", "Fort Kochi Heritage", "Wayanad Hills"],
    featured: true,
  },
  {
    name: "Goa",
    region: "west_india",
    country: "India",
    category: "leisure",
    description: "India's beach paradise — golden sands, Portuguese heritage, vibrant nightlife, and seafood feasts by the Arabian Sea.",
    bestTimeToVisit: "November to February",
    weather: "Tropical (25-35°C), monsoon June-September",
    startingPrice: 8000,
    highlights: ["Baga & Calangute Beaches", "Old Goa Churches", "Dudhsagar Falls", "Spice Plantations", "Casino Cruise", "Chapora Fort"],
    featured: true,
  },
  {
    name: "Karnataka",
    region: "south_india",
    country: "India",
    category: "educational",
    description: "From Hampi's ruins to Coorg's coffee estates — Karnataka offers ancient heritage, tech-city buzz, and Western Ghats wilderness.",
    bestTimeToVisit: "October to February",
    weather: "Pleasant (20-30°C), varied by region",
    startingPrice: 10000,
    highlights: ["Hampi UNESCO Ruins", "Coorg Coffee Plantations", "Mysore Palace", "Jog Falls", "Gokarna Beaches", "Badami Caves"],
    featured: false,
  },
  // ── SPIRITUAL ──
  {
    name: "Char Dham",
    region: "north_india",
    country: "India",
    category: "educational",
    description: "The holiest pilgrimage circuit in Hinduism — Yamunotri, Gangotri, Kedarnath, and Badrinath nestled high in the Garhwal Himalayas.",
    bestTimeToVisit: "May to June, September to October",
    weather: "Cold mountain climate (5-20°C), temples closed in winter",
    startingPrice: 25000,
    highlights: ["Kedarnath Temple", "Badrinath Temple", "Gangotri Glacier", "Yamunotri Hot Springs", "Helicopter Service Available", "Valley of Flowers (nearby)"],
    featured: false,
  },
  // ── ISLANDS ──
  {
    name: "Andaman Islands",
    region: "islands",
    country: "India",
    category: "adventure",
    description: "India's tropical paradise — crystal-clear waters, pristine coral reefs, WWII history, and some of Asia's best diving spots.",
    bestTimeToVisit: "October to May",
    weather: "Tropical (24-35°C), monsoon May-September",
    startingPrice: 20000,
    highlights: ["Radhanagar Beach", "Cellular Jail", "Scuba Diving at Havelock", "Neil Island", "Baratang Limestone Caves", "Ross Island"],
    featured: false,
  },
  // ── INTERNATIONAL ──
  {
    name: "Bali",
    region: "international",
    country: "Indonesia",
    category: "leisure",
    description: "Island of the Gods — ancient temples, terraced rice fields, world-class surfing, and a wellness culture that draws travelers worldwide.",
    bestTimeToVisit: "April to October",
    weather: "Tropical (27-30°C), dry season April-October",
    startingPrice: 45000,
    highlights: ["Ubud Rice Terraces", "Tanah Lot Temple", "Seminyak Beach Club", "Mount Batur Sunrise", "Uluwatu Kecak Dance", "Nusa Penida"],
    featured: true,
  },
  {
    name: "Thailand",
    region: "international",
    country: "Thailand",
    category: "leisure",
    description: "The Land of Smiles — Bangkok's temples and street food, Phuket's beaches, Chiang Mai's mountains, all at incredible value.",
    bestTimeToVisit: "November to February",
    weather: "Tropical (25-35°C), monsoon June-October",
    startingPrice: 35000,
    highlights: ["Bangkok Grand Palace", "Phi Phi Islands", "Chiang Mai Night Bazaar", "Phuket Beaches", "Floating Markets", "Thai Massage & Spa"],
    featured: false,
  },
  {
    name: "Dubai & UAE",
    region: "international",
    country: "UAE",
    category: "leisure",
    description: "The city of superlatives — world's tallest building, luxury shopping, desert safaris, and a futuristic skyline rising from the sands.",
    bestTimeToVisit: "November to March",
    weather: "Hot desert (20-40°C), pleasant winters",
    startingPrice: 50000,
    highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Palm Jumeirah", "Abu Dhabi Grand Mosque", "Dhow Cruise"],
    featured: false,
  },
  {
    name: "Vietnam",
    region: "international",
    country: "Vietnam",
    category: "adventure",
    description: "From Ha Long Bay's limestone karsts to Saigon's buzzing streets — Vietnam offers incredible food, history, and natural beauty.",
    bestTimeToVisit: "February to April, August to October",
    weather: "Tropical (25-35°C), varies by region",
    startingPrice: 40000,
    highlights: ["Ha Long Bay Cruise", "Hoi An Ancient Town", "Cu Chi Tunnels", "Sapa Rice Terraces", "Pho & Street Food", "Mekong Delta"],
    featured: false,
  },
]

// ═══════════════════════════════════════════════════════════
// PACKAGES (using combinations from Excel)
// ═══════════════════════════════════════════════════════════

const packages = [
  // Kashmir packages
  {
    title: "Kashmir Standard — Pahalgam, Gulmarg & Srinagar",
    destinationSlug: "kashmir",
    category: "leisure",
    description: "Experience the classic beauty of Kashmir — Pahalgam's valleys, Gulmarg's meadows, Srinagar's houseboats, and Sonmarg's glaciers.",
    duration: { days: 7, nights: 6 },
    price: 28000,
    discountedPrice: 24500,
    difficulty: "Easy",
    groupSize: { min: 2, max: 15 },
    inclusions: ["Accommodation (3-star hotels)", "All transfers by private cab", "Shikara ride on Dal Lake", "Gulmarg Gondola Phase 1", "Breakfast daily", "Sightseeing as per itinerary"],
    exclusions: ["Flights/train tickets", "Lunch & dinner", "Gulmarg Gondola Phase 2", "Personal expenses", "Travel insurance"],
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", description: "Airport pickup, check-in to houseboat on Dal Lake. Evening Shikara ride with sunset views.", activities: ["Airport transfer", "Houseboat check-in", "Shikara ride"] },
      { day: 2, title: "Srinagar Local", description: "Visit Mughal Gardens — Nishat Bagh, Shalimar Bagh, and Chashme Shahi. Afternoon at Shankaracharya Temple.", activities: ["Mughal Gardens", "Shankaracharya Temple", "Local bazaar"] },
      { day: 3, title: "Srinagar to Pahalgam", description: "Drive to Pahalgam (95 km). En route visit saffron fields and Awantipora ruins. Evening walk by Lidder River.", activities: ["Drive to Pahalgam", "Saffron fields", "Lidder River walk"] },
      { day: 4, title: "Pahalgam Exploration", description: "Visit Betaab Valley, Aru Valley, and Chandanwari. Pony rides available.", activities: ["Betaab Valley", "Aru Valley", "Chandanwari"] },
      { day: 5, title: "Pahalgam to Gulmarg", description: "Drive to Gulmarg (250 km via Srinagar). Gulmarg Gondola ride with Himalayan views.", activities: ["Drive to Gulmarg", "Gondola ride", "Meadow walk"] },
      { day: 6, title: "Gulmarg to Sonmarg", description: "Morning in Gulmarg, then drive to Sonmarg. Visit Thajiwas Glacier.", activities: ["Gulmarg morning", "Drive to Sonmarg", "Thajiwas Glacier"] },
      { day: 7, title: "Departure", description: "Drive back to Srinagar airport. Departure with beautiful memories.", activities: ["Drive to Srinagar", "Airport drop"] },
    ],
    highlights: ["Dal Lake Houseboat Stay", "Gulmarg Gondola", "Pahalgam Valleys", "Sonmarg Glacier"],
    featured: true,
  },
  {
    title: "Kashmir with Gurez Valley — Extended Offbeat",
    destinationSlug: "kashmir",
    category: "adventure",
    description: "Beyond the standard circuit — explore the untouched Gurez Valley, Doodhpathri meadows, and Sinthan Top along with classic Kashmir.",
    duration: { days: 10, nights: 9 },
    price: 38000,
    discountedPrice: 34000,
    difficulty: "Moderate",
    groupSize: { min: 2, max: 10 },
    inclusions: ["Accommodation", "All transfers", "Gulmarg Gondola", "Gurez Valley permits", "Breakfast daily", "Dedicated guide"],
    exclusions: ["Flights", "Lunch & dinner", "Personal expenses", "Travel insurance"],
    itinerary: [
      { day: 1, title: "Arrival Srinagar", description: "Airport pickup, houseboat stay, evening Shikara ride.", activities: ["Airport transfer", "Shikara ride"] },
      { day: 2, title: "Doodhpathri Day Trip", description: "Drive to the 'Valley of Milk' — untouched alpine meadows surrounded by pine forests.", activities: ["Doodhpathri meadows", "Nature walk"] },
      { day: 3, title: "Srinagar to Gurez Valley", description: "Scenic drive through Razdan Pass to remote Gurez. Stunning views of Habba Khatoon peak.", activities: ["Drive to Gurez", "Habba Khatoon views"] },
      { day: 4, title: "Gurez Exploration", description: "Visit Dawar village, explore the Kishanganga river valley and ancient watchtowers.", activities: ["Dawar village", "Kishanganga river", "Watchtowers"] },
      { day: 5, title: "Gurez to Srinagar", description: "Return via Wular Lake, India's largest freshwater lake.", activities: ["Wular Lake", "Drive to Srinagar"] },
      { day: 6, title: "Srinagar to Pahalgam", description: "Drive to Pahalgam, visit Betaab Valley and Aru Valley.", activities: ["Betaab Valley", "Aru Valley"] },
      { day: 7, title: "Sinthan Top Excursion", description: "Drive to Sinthan Top (12,300 ft) for panoramic views of both Kashmir and Kishtwar valleys.", activities: ["Sinthan Top", "Panoramic views"] },
      { day: 8, title: "Pahalgam to Gulmarg", description: "Drive to Gulmarg. Gondola ride and meadow exploration.", activities: ["Gondola ride", "Gulmarg meadows"] },
      { day: 9, title: "Gulmarg & Sonmarg", description: "Morning in Gulmarg, drive to Sonmarg for Thajiwas Glacier visit.", activities: ["Thajiwas Glacier", "Sonmarg"] },
      { day: 10, title: "Departure", description: "Drive to Srinagar airport for departure.", activities: ["Airport transfer"] },
    ],
    highlights: ["Gurez Valley", "Doodhpathri", "Sinthan Top", "Dal Lake"],
    featured: false,
  },
  // Ladakh packages
  {
    title: "Ladakh Complete Circuit — Leh, Nubra, Pangong & Kargil",
    destinationSlug: "leh-ladakh",
    category: "adventure",
    description: "The ultimate Ladakh adventure — high passes, ancient monasteries, turquoise lakes, and the stark beauty of the cold desert.",
    duration: { days: 9, nights: 8 },
    price: 35000,
    discountedPrice: 31000,
    difficulty: "Challenging",
    groupSize: { min: 2, max: 12 },
    inclusions: ["Accommodation", "All transfers by Innova/Tempo", "Inner line permits", "Oxygen cylinder in vehicle", "Breakfast daily", "Pangong lakeside camp"],
    exclusions: ["Flights to Leh", "Lunch & dinner", "AMS medicine", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrival in Leh", description: "Fly into Leh (11,500 ft). Full day acclimatization. Light walks around Leh Market and Shanti Stupa.", activities: ["Acclimatization", "Leh Market", "Shanti Stupa"] },
      { day: 2, title: "Leh Local Sightseeing", description: "Visit Hemis Monastery, Thiksey Monastery, Rancho School (3 Idiots fame), and Hall of Fame.", activities: ["Hemis Monastery", "Thiksey Monastery", "Hall of Fame"] },
      { day: 3, title: "Leh to Kargil", description: "Drive to Kargil via Magnetic Hill, Gurudwara Pathar Sahib, and Lamayuru Moonland.", activities: ["Magnetic Hill", "Lamayuru", "Kargil War Memorial"] },
      { day: 4, title: "Kargil to Leh", description: "Return via a different route. Visit Mulbekh Monastery and Alchi Monastery.", activities: ["Mulbekh", "Alchi Monastery"] },
      { day: 5, title: "Leh to Nubra Valley", description: "Cross Khardung La (17,982 ft). Reach Hunder for sand dunes and double-humped Bactrian camels.", activities: ["Khardung La", "Hunder sand dunes", "Bactrian camel ride"] },
      { day: 6, title: "Nubra to Turtuk", description: "Drive to Turtuk — India's northernmost village with Balti culture. Return to Nubra.", activities: ["Turtuk village", "Balti culture", "Apricot orchards"] },
      { day: 7, title: "Nubra to Pangong Lake", description: "Drive via Shyok route to Pangong Tso (14,270 ft). Overnight in lakeside camp.", activities: ["Shyok route", "Pangong Lake", "Lakeside camping"] },
      { day: 8, title: "Pangong to Leh", description: "Morning at Pangong. Drive back to Leh via Chang La pass.", activities: ["Pangong sunrise", "Chang La", "Return to Leh"] },
      { day: 9, title: "Departure", description: "Airport transfer for departure flight.", activities: ["Airport transfer"] },
    ],
    highlights: ["Khardung La Pass", "Pangong Lake", "Nubra Valley", "Turtuk Village", "Kargil"],
    featured: true,
  },
  // Himachal packages
  {
    title: "Himachal Classic — Shimla, Manali & Dharamshala",
    destinationSlug: "himachal-pradesh",
    category: "leisure",
    description: "The best of Himachal in one trip — Shimla's colonial charm, Manali's adventure, and Dharamshala's Tibetan serenity.",
    duration: { days: 8, nights: 7 },
    price: 22000,
    discountedPrice: 19500,
    difficulty: "Easy",
    groupSize: { min: 2, max: 20 },
    inclusions: ["Hotel accommodation", "Volvo bus transfers", "Sightseeing", "Breakfast daily"],
    exclusions: ["Flights/trains to Chandigarh", "Lunch & dinner", "Adventure activities", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Chandigarh to Shimla", description: "Pickup from Chandigarh. Drive to Shimla. Evening walk on Mall Road.", activities: ["Drive to Shimla", "Mall Road walk"] },
      { day: 2, title: "Shimla Sightseeing", description: "Visit Kufri, Jakhu Temple, Christ Church, and The Ridge.", activities: ["Kufri", "Jakhu Temple", "The Ridge"] },
      { day: 3, title: "Shimla to Manali", description: "Scenic drive through Kullu Valley. Stop at Hanogi Devi Temple.", activities: ["Kullu Valley drive", "Hanogi Temple"] },
      { day: 4, title: "Manali Local", description: "Visit Hadimba Temple, Manu Temple, Vashisht Hot Springs, and Old Manali.", activities: ["Hadimba Temple", "Vashisht Hot Springs", "Old Manali"] },
      { day: 5, title: "Solang & Rohtang", description: "Adventure day — Solang Valley activities and Atal Tunnel to Sissu.", activities: ["Solang Valley", "Atal Tunnel", "Sissu"] },
      { day: 6, title: "Manali to Dharamshala", description: "Drive to Dharamshala. Evening visit to Bhagsu Waterfall.", activities: ["Drive to Dharamshala", "Bhagsu Waterfall"] },
      { day: 7, title: "McLeodganj & Dalai Lama Temple", description: "Visit Tsuglagkhang Complex, Namgyal Monastery, Triund base. Tibetan market.", activities: ["Dalai Lama Temple", "Namgyal Monastery", "Tibetan market"] },
      { day: 8, title: "Departure", description: "Drive to Dharamshala airport or Pathankot station.", activities: ["Airport/station transfer"] },
    ],
    highlights: ["Shimla Mall Road", "Solang Valley", "McLeodganj", "Kullu Valley"],
    featured: true,
  },
  // Rajasthan packages
  {
    title: "Royal Rajasthan — Jaipur to Jaisalmer Circuit",
    destinationSlug: "rajasthan",
    category: "leisure",
    description: "Live like royalty — pink palaces, golden desert, blue city, and white marble. The complete Rajasthan royal experience.",
    duration: { days: 8, nights: 7 },
    price: 26000,
    discountedPrice: 23000,
    difficulty: "Easy",
    groupSize: { min: 2, max: 20 },
    inclusions: ["Heritage hotel stays", "AC vehicle transfers", "Desert safari with cultural program", "Breakfast daily", "Monument entry fees"],
    exclusions: ["Flights/trains", "Lunch & dinner", "Camera fees at monuments", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrival Jaipur", description: "Arrive in the Pink City. Visit Hawa Mahal and Jantar Mantar. Evening at Nahargarh Fort for sunset.", activities: ["Hawa Mahal", "Jantar Mantar", "Nahargarh sunset"] },
      { day: 2, title: "Jaipur Forts", description: "Amber Fort with elephant/jeep ride, Jal Mahal photo stop, City Palace. Evening bazaar shopping.", activities: ["Amber Fort", "City Palace", "Bazaar shopping"] },
      { day: 3, title: "Jaipur to Ranthambore", description: "Drive to Ranthambore. Afternoon jungle safari for tiger spotting.", activities: ["Drive to Ranthambore", "Jungle safari"] },
      { day: 4, title: "Ranthambore to Jodhpur", description: "Morning safari, then drive to Jodhpur. Evening walk in the Blue City lanes.", activities: ["Morning safari", "Drive to Jodhpur", "Blue City walk"] },
      { day: 5, title: "Jodhpur Sightseeing", description: "Mehrangarh Fort, Umaid Bhawan Palace, Jaswant Thada. Zip-lining over the fort.", activities: ["Mehrangarh Fort", "Umaid Bhawan", "Zip-lining"] },
      { day: 6, title: "Jodhpur to Jaisalmer", description: "Drive to the Golden City. Visit Tanot Mata Temple en route. Evening at Sand Dunes — camel safari and folk music.", activities: ["Tanot Mata Temple", "Sand dunes", "Camel safari", "Folk music"] },
      { day: 7, title: "Jaisalmer Sightseeing", description: "Jaisalmer Fort (living fort), Patwon ki Haveli, Gadisar Lake. Kuldhara Ghost Village.", activities: ["Jaisalmer Fort", "Patwon Haveli", "Kuldhara"] },
      { day: 8, title: "Departure", description: "Drive to Jaisalmer station/airport or continue to Udaipur.", activities: ["Departure transfer"] },
    ],
    highlights: ["Amber Fort", "Desert Safari", "Mehrangarh Fort", "Jaisalmer Fort", "Tiger Safari"],
    featured: true,
  },
  // Golden Triangle
  {
    title: "Golden Triangle Explorer — Delhi, Agra & Jaipur",
    destinationSlug: "golden-triangle",
    category: "educational",
    description: "India's most iconic circuit — Mughal grandeur in Delhi, eternal love in Agra, and royal splendor in Jaipur in just 5 days.",
    duration: { days: 5, nights: 4 },
    price: 18000,
    discountedPrice: 15500,
    difficulty: "Easy",
    groupSize: { min: 2, max: 20 },
    inclusions: ["4-star hotel stays", "AC sedan/SUV transfers", "English-speaking guide", "Breakfast daily", "Monument entry fees"],
    exclusions: ["Flights/trains to Delhi", "Lunch & dinner", "Camera fees", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Delhi Heritage", description: "Red Fort, Jama Masjid, Chandni Chowk rickshaw ride, India Gate, Qutub Minar.", activities: ["Red Fort", "Chandni Chowk", "India Gate", "Qutub Minar"] },
      { day: 2, title: "Delhi to Agra", description: "Drive to Agra. Afternoon Taj Mahal visit for sunset. Evening Agra Fort.", activities: ["Drive to Agra", "Taj Mahal sunset", "Agra Fort"] },
      { day: 3, title: "Agra to Jaipur", description: "Sunrise at Taj Mahal. Drive to Jaipur via Fatehpur Sikri ghost city.", activities: ["Taj Mahal sunrise", "Fatehpur Sikri", "Drive to Jaipur"] },
      { day: 4, title: "Jaipur Royal Experience", description: "Amber Fort, City Palace, Hawa Mahal, Jantar Mantar. Evening Nahargarh sunset.", activities: ["Amber Fort", "City Palace", "Hawa Mahal"] },
      { day: 5, title: "Departure", description: "Morning free for shopping at Johari Bazaar. Transfer to Jaipur airport/station.", activities: ["Johari Bazaar", "Departure transfer"] },
    ],
    highlights: ["Taj Mahal Sunrise & Sunset", "Red Fort", "Amber Fort", "Fatehpur Sikri"],
    featured: true,
  },
  // Uttarakhand
  {
    title: "Uttarakhand Heritage & Nature — Nainital to Haridwar",
    destinationSlug: "uttarakhand",
    category: "leisure",
    description: "Hill stations, wildlife, and spiritual rivers — from Nainital's lake to Jim Corbett's tigers to Haridwar's evening aarti.",
    duration: { days: 7, nights: 6 },
    price: 20000,
    discountedPrice: 17500,
    difficulty: "Easy",
    groupSize: { min: 2, max: 15 },
    inclusions: ["Hotel stays", "AC vehicle", "Jim Corbett safari", "Breakfast daily"],
    exclusions: ["Flights/trains", "Lunch & dinner", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Delhi to Nainital", description: "Drive to Nainital. Evening boating on Naini Lake.", activities: ["Drive to Nainital", "Naini Lake boating"] },
      { day: 2, title: "Nainital Sightseeing", description: "Snow View Point, Tiffin Top, Eco Cave Garden, Naina Devi Temple.", activities: ["Snow View Point", "Tiffin Top", "Eco Cave Garden"] },
      { day: 3, title: "Nainital to Almora & Kasar Devi", description: "Drive to Almora. Visit Kasar Devi Temple — the cosmic energy hotspot.", activities: ["Almora", "Kasar Devi Temple"] },
      { day: 4, title: "Almora to Ranikhet", description: "Ranikhet — British-era cantonment with Himalayan panorama. Chaubatia Gardens.", activities: ["Ranikhet", "Chaubatia Gardens", "Golf course"] },
      { day: 5, title: "Ranikhet to Jim Corbett", description: "Drive to Jim Corbett National Park. Afternoon jeep safari.", activities: ["Drive to Corbett", "Jeep safari"] },
      { day: 6, title: "Jim Corbett to Haridwar", description: "Morning safari. Drive to Haridwar. Evening Ganga Aarti at Har Ki Pauri.", activities: ["Morning safari", "Ganga Aarti"] },
      { day: 7, title: "Departure", description: "Visit Rishikesh (optional Laxman Jhula, Ram Jhula). Departure from Dehradun.", activities: ["Rishikesh visit", "Departure"] },
    ],
    highlights: ["Naini Lake", "Jim Corbett Safari", "Ganga Aarti", "Kasar Devi"],
    featured: false,
  },
  // Northeast
  {
    title: "Northeast Discovery — Assam, Meghalaya & Darjeeling",
    destinationSlug: "meghalaya",
    category: "adventure",
    description: "India's best-kept secret — living root bridges, one-horned rhinos, cleanest village, and Darjeeling's toy train.",
    duration: { days: 10, nights: 9 },
    price: 32000,
    discountedPrice: 28000,
    difficulty: "Moderate",
    groupSize: { min: 2, max: 12 },
    inclusions: ["Hotel stays", "All transfers", "Kaziranga safari", "Breakfast daily", "Local guides"],
    exclusions: ["Flights to Guwahati", "Lunch & dinner", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive Guwahati", description: "Arrive in Guwahati. Visit Kamakhya Temple. Evening cruise on Brahmaputra.", activities: ["Kamakhya Temple", "Brahmaputra cruise"] },
      { day: 2, title: "Guwahati to Kaziranga", description: "Drive to Kaziranga National Park. Afternoon elephant safari.", activities: ["Drive to Kaziranga", "Elephant safari"] },
      { day: 3, title: "Kaziranga Safari", description: "Morning jeep safari for one-horned rhinos. Afternoon cultural program.", activities: ["Jeep safari", "Rhino spotting", "Cultural program"] },
      { day: 4, title: "Kaziranga to Shillong", description: "Drive to Shillong — Scotland of the East. Evening at Police Bazaar.", activities: ["Drive to Shillong", "Police Bazaar"] },
      { day: 5, title: "Cherrapunji Day Trip", description: "Visit Nohkalikai Falls, Seven Sisters Falls, Mawsmai Cave, and Living Root Bridge.", activities: ["Nohkalikai Falls", "Living Root Bridge", "Mawsmai Cave"] },
      { day: 6, title: "Dawki & Mawlynnong", description: "Crystal clear Dawki River boating. Visit Mawlynnong — Asia's cleanest village.", activities: ["Dawki River", "Mawlynnong village"] },
      { day: 7, title: "Shillong to Darjeeling", description: "Fly/drive to Bagdogra, transfer to Darjeeling. Evening Mall Road.", activities: ["Transfer to Darjeeling", "Mall Road"] },
      { day: 8, title: "Tiger Hill & Darjeeling", description: "Pre-dawn trip to Tiger Hill for Kanchenjunga sunrise. Toy train ride. Tea garden visit.", activities: ["Tiger Hill", "Toy train", "Tea garden"] },
      { day: 9, title: "Gangtok Day Trip", description: "Drive to Gangtok. Visit MG Road, Rumtek Monastery, Tashi Viewpoint.", activities: ["Rumtek Monastery", "MG Road", "Tashi Viewpoint"] },
      { day: 10, title: "Departure", description: "Drive to Bagdogra airport for departure.", activities: ["Airport transfer"] },
    ],
    highlights: ["Living Root Bridge", "Kaziranga Rhinos", "Dawki River", "Tiger Hill Sunrise", "Toy Train"],
    featured: true,
  },
  // Kerala
  {
    title: "Kerala Backwaters & Spices — Kochi to Kovalam",
    destinationSlug: "kerala",
    category: "leisure",
    description: "God's Own Country at its best — houseboats on backwaters, spice plantations in the hills, and palm-fringed beaches.",
    duration: { days: 7, nights: 6 },
    price: 24000,
    discountedPrice: 21000,
    difficulty: "Easy",
    groupSize: { min: 2, max: 15 },
    inclusions: ["Hotel + houseboat stay", "AC vehicle", "Houseboat with meals", "Kathakali show", "Breakfast daily"],
    exclusions: ["Flights", "Lunch & dinner (except houseboat)", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive Kochi", description: "Explore Fort Kochi — Chinese Fishing Nets, St. Francis Church, Jewish Synagogue. Evening Kathakali show.", activities: ["Fort Kochi walk", "Chinese Fishing Nets", "Kathakali show"] },
      { day: 2, title: "Kochi to Munnar", description: "Drive through tea plantations to Munnar. Stop at Cheeyappara Waterfalls.", activities: ["Cheeyappara Falls", "Tea garden drive"] },
      { day: 3, title: "Munnar Sightseeing", description: "Eravikulam National Park (Nilgiri Tahr), Tea Museum, Mattupetty Dam, Echo Point.", activities: ["Eravikulam", "Tea Museum", "Mattupetty Dam"] },
      { day: 4, title: "Munnar to Thekkady", description: "Drive to Thekkady. Spice plantation tour. Evening Periyar boat ride.", activities: ["Spice plantation", "Periyar Lake boat ride"] },
      { day: 5, title: "Thekkady to Alleppey", description: "Drive to Alleppey. Board premium houseboat for backwater cruise. All meals onboard.", activities: ["Houseboat cruise", "Backwater views", "Kerala meals"] },
      { day: 6, title: "Alleppey to Kovalam", description: "Disembark houseboat. Drive to Kovalam beach. Afternoon at Lighthouse Beach.", activities: ["Drive to Kovalam", "Beach time", "Lighthouse Beach"] },
      { day: 7, title: "Departure", description: "Morning yoga on beach. Transfer to Trivandrum airport.", activities: ["Beach yoga", "Airport transfer"] },
    ],
    highlights: ["Alleppey Houseboat", "Munnar Tea Gardens", "Periyar Wildlife", "Fort Kochi"],
    featured: true,
  },
  // Goa
  {
    title: "Goa Beach & Heritage — Complete Experience",
    destinationSlug: "goa",
    category: "leisure",
    description: "Sun, sand, and Portuguese charm — North Goa's party vibes and South Goa's serene beaches with heritage, food, and adventure.",
    duration: { days: 5, nights: 4 },
    price: 15000,
    discountedPrice: 12500,
    difficulty: "Easy",
    groupSize: { min: 2, max: 20 },
    inclusions: ["Beach resort stay", "Airport transfers", "North & South Goa sightseeing", "Breakfast daily"],
    exclusions: ["Flights", "Lunch & dinner", "Water sports", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrival & North Goa", description: "Arrive in Goa. Check-in to beach resort. Evening at Baga Beach and Tito's Lane.", activities: ["Beach resort check-in", "Baga Beach", "Tito's Lane"] },
      { day: 2, title: "North Goa Tour", description: "Fort Aguada, Chapora Fort, Anjuna Flea Market, Vagator Beach. Sunset at Chapora.", activities: ["Fort Aguada", "Chapora Fort", "Anjuna Market"] },
      { day: 3, title: "Old Goa & Spice Plantation", description: "Basilica of Bom Jesus (UNESCO), Se Cathedral, Spice Plantation with lunch. River cruise.", activities: ["Old Goa Churches", "Spice Plantation", "River cruise"] },
      { day: 4, title: "South Goa", description: "Colva Beach, Palolem Beach crescent, butterfly beach boat trip. Evening at beach shack.", activities: ["Palolem Beach", "Butterfly Beach", "Beach shack dinner"] },
      { day: 5, title: "Departure", description: "Morning free for shopping at Panjim market. Airport transfer.", activities: ["Panjim shopping", "Airport transfer"] },
    ],
    highlights: ["Baga Beach", "Old Goa Heritage", "Spice Plantation", "Palolem Beach"],
    featured: false,
  },
  // Bali International
  {
    title: "Bali — Island of Gods Complete Package",
    destinationSlug: "bali",
    category: "leisure",
    description: "Temples, rice terraces, beach clubs, and volcanoes — experience Bali's magic from Ubud's culture to Seminyak's sunsets.",
    duration: { days: 7, nights: 6 },
    price: 55000,
    discountedPrice: 48000,
    difficulty: "Easy",
    groupSize: { min: 2, max: 15 },
    inclusions: ["Villa/resort stay", "Airport transfers", "Ubud & temple tours", "Mount Batur sunrise trek", "Breakfast daily", "Travel insurance"],
    exclusions: ["Flights to Bali", "Lunch & dinner", "Visa on arrival fee", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrival Bali", description: "Arrive at Ngurah Rai airport. Transfer to Seminyak villa. Evening beach sunset.", activities: ["Airport transfer", "Seminyak sunset"] },
      { day: 2, title: "Ubud Culture Day", description: "Monkey Forest, Tegallalang Rice Terraces, Tirta Empul water temple, Ubud Art Market.", activities: ["Monkey Forest", "Rice Terraces", "Tirta Empul"] },
      { day: 3, title: "Mount Batur Sunrise", description: "2 AM start for Mount Batur trek. Watch sunrise over the caldera. Afternoon hot springs.", activities: ["Mount Batur trek", "Sunrise views", "Hot springs"] },
      { day: 4, title: "Temple Circuit", description: "Tanah Lot sea temple, Uluwatu temple with Kecak fire dance at sunset.", activities: ["Tanah Lot", "Uluwatu", "Kecak dance"] },
      { day: 5, title: "Nusa Penida Day Trip", description: "Speed boat to Nusa Penida. Visit Kelingking Beach, Broken Beach, Angel's Billabong.", activities: ["Kelingking Beach", "Broken Beach", "Snorkeling"] },
      { day: 6, title: "Free Day", description: "Choose your adventure — surfing, spa day, diving, or shopping in Seminyak.", activities: ["Free activities", "Seminyak shopping"] },
      { day: 7, title: "Departure", description: "Last morning at the villa. Airport transfer.", activities: ["Airport transfer"] },
    ],
    highlights: ["Mount Batur Sunrise", "Rice Terraces", "Nusa Penida", "Tanah Lot"],
    featured: true,
  },
  // Char Dham Helicopter package
  {
    title: "Char Dham Yatra by Helicopter — 6 Days Premium Pilgrimage",
    destinationSlug: "uttarakhand",
    category: "leisure",
    description: "Experience the sacred Char Dham Yatra in luxury — visit Yamunotri, Gangotri, Kedarnath, and Badrinath by helicopter. This premium pilgrimage covers all four divine shrines of the Garhwal Himalayas with VIP darshan, comfortable stays, and breathtaking aerial views of the Himalayan peaks.",
    duration: { days: 6, nights: 5 },
    price: 200000,
    discountedPrice: 195000,
    difficulty: "Easy",
    groupSize: { min: 2, max: 6 },
    inclusions: [
      "Round-trip helicopter service (Dehradun to Dehradun)",
      "All meals (Breakfast, Lunch & Dinner) at all four Dhams",
      "Accommodation — 5 nights (Dehradun, Yamunotri/Kharsali, Gangotri/Harsil, Guptkashi, Badrinath)",
      "VIP Darshan at all four temples",
      "Palki/Doli for Yamunotri trek (6 km round trip)",
      "Kedarnath shuttle helicopter service",
      "Local transfers for darshan and sightseeing",
      "Dehradun Airport/Railway Station pickup and drop",
      "Helipad landing & parking charges",
      "Complimentary duffle bag (5 kg luggage limit)",
    ],
    exclusions: [
      "Flights/trains to Dehradun",
      "Single room supplement (₹35,000 extra)",
      "Maha Abhishek Pooja at Badrinath (₹5,500 per person)",
      "Rudra Abhishek Pooja at Kedarnath (₹2,000 per person)",
      "Overweight charges (₹2,500/kg above 75 kg)",
      "Night halt at Kedarnath top (extra cost, basic facilities)",
      "Travel insurance",
      "Personal expenses, donations, tips",
      "Temple committee charges (~₹1,400 per person)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dehradun",
        description: "Arrive at Dehradun Airport or Railway Station. Transfer to hotel. Evening briefing session at 9 PM — receive duffle bags, weight measurement, and pilgrimage preparation details. Dinner and overnight stay in Dehradun.",
        activities: ["Airport/railway pickup", "Hotel check-in", "Pre-flight briefing", "Duffle bag distribution"],
      },
      {
        day: 2,
        title: "Dehradun → Yamunotri",
        description: "Early morning helicopter from Sahastradhara Helipad to Kharsali (6:00 AM departure). Transfer to Yamunotri Temple via palki or ponies — a 6 km trek taking approximately 5 hours round trip. Seek blessings at the sacred source of River Yamuna surrounded by mesmerizing Himalayan views. Return to Kharsali for dinner and overnight stay.",
        activities: ["Helicopter to Kharsali", "Palki/pony to Yamunotri Temple", "Yamunotri darshan", "Return to Kharsali"],
      },
      {
        day: 3,
        title: "Yamunotri → Gangotri",
        description: "Board helicopter from Kharsali to Harsil — the 'Mini Switzerland of India' with breathtaking aerial Himalayan views. 22 km drive (50 min) to Gangotri Temple, the origin of River Ganga. After darshan, return to Harsil resort for lunch and relaxation. Evening bonfire and leisure walk.",
        activities: ["Helicopter to Harsil", "Drive to Gangotri Temple", "Gangotri darshan", "Bonfire evening"],
      },
      {
        day: 4,
        title: "Gangotri → Kedarnath",
        description: "Helicopter from Harsil to Guptkashi, then shuttle helicopter to Kedarnath Dham — landing just 500 meters from the temple. VIP darshan at the sacred Jyotirlinga of Lord Shiva at 3,583 meters altitude. The darshan takes approximately 2 hours. Return by helicopter to Guptkashi for dinner and overnight stay.",
        activities: ["Helicopter to Guptkashi", "Shuttle helicopter to Kedarnath", "VIP Kedarnath darshan", "Return to Guptkashi"],
      },
      {
        day: 5,
        title: "Kedarnath → Badrinath",
        description: "After breakfast, helicopter from Guptkashi to Badrinath Helipad. Check in to hotel near the temple. Our ground staff arranges smooth VIP darshan at Badrinath Temple, dedicated to Lord Vishnu, amidst the breathtaking Alaknanda Valley.",
        activities: ["Helicopter to Badrinath", "Hotel check-in", "VIP Badrinath darshan", "Temple visit"],
      },
      {
        day: 6,
        title: "Badrinath → Dehradun (Departure)",
        description: "Optional: attend the Special Abhishek Puja at Badrinath Temple at 4:30 AM — a rare opportunity to witness the Shringar Darshan up close (own cost). After breakfast, helicopter back to Dehradun. Transfer to airport, railway station, or hotel. Sacred Char Dham Yatra complete with cherished memories to last a lifetime.",
        activities: ["Optional Abhishek Puja (4:30 AM)", "Breakfast", "Helicopter to Dehradun", "Airport/station drop"],
      },
    ],
    highlights: ["Helicopter Transfers", "VIP Darshan at All 4 Dhams", "Kedarnath Jyotirlinga", "Badrinath Temple", "Yamunotri & Gangotri", "Aerial Himalayan Views"],
    featured: true,
  },
]

// ═══════════════════════════════════════════════════════════
// BLOG POSTS
// ═══════════════════════════════════════════════════════════

const blogPosts = [
  {
    title: "10 Hidden Gems in Kashmir Beyond the Tourist Trail",
    category: "destination_guides",
    excerpt: "While Gulmarg and Dal Lake steal the spotlight, Kashmir's true magic lies in places most travelers never discover — Gurez Valley, Doodhpathri, and the mystical Sinthan Top.",
    readTime: 8,
    featured: true,
  },
  {
    title: "The Ultimate Ladakh Road Trip Checklist for 2026",
    category: "travel_tips",
    excerpt: "Planning a Ladakh trip? From AMS medication to inner line permits, here's everything you need to pack, book, and prepare before hitting the world's highest roads.",
    readTime: 10,
    featured: true,
  },
  {
    title: "Why Northeast India Should Be Your Next Adventure",
    category: "adventure",
    excerpt: "Living root bridges, crystal-clear rivers, one-horned rhinos, and the wettest place on Earth — discover why Northeast India is the country's best-kept secret.",
    readTime: 7,
    featured: false,
  },
  {
    title: "Budget Backpacking Through Rajasthan — A Complete Guide",
    category: "budget_travel",
    excerpt: "See the Land of Kings without breaking the bank. From ₹500 heritage hostels to free palace courtyards, here's how to do Rajasthan on a budget.",
    readTime: 9,
    featured: false,
  },
  {
    title: "Kerala Houseboat Guide — Everything You Need to Know",
    category: "destination_guides",
    excerpt: "Alleppey or Kumarakom? AC or non-AC? Shared or private? Your complete guide to choosing and booking the perfect Kerala houseboat experience.",
    readTime: 6,
    featured: false,
  },
  {
    title: "How to Plan Your First International Trip from India",
    category: "travel_planning",
    excerpt: "Passport, visa, forex, insurance — first international trip can feel overwhelming. Our step-by-step guide makes it simple, from Bali to Dubai to Vietnam.",
    readTime: 11,
    featured: true,
  },
  {
    title: "Street Food Tour — Best Eats in Old Delhi, Varanasi & Jaipur",
    category: "food_cuisine",
    excerpt: "From Chandni Chowk's paranthe wali gali to Varanasi's famous lassi, a food lover's guide to North India's most iconic street food destinations.",
    readTime: 7,
    featured: false,
  },
  {
    title: "Char Dham Yatra 2026 — Complete Planning Guide",
    category: "travel_planning",
    excerpt: "Dates, registration, helicopter booking, fitness preparation — everything you need to plan your spiritual journey to Yamunotri, Gangotri, Kedarnath, and Badrinath.",
    readTime: 12,
    featured: false,
  },
]

// ═══════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════

const testimonials = [
  { name: "Priya Sharma", location: "Mumbai", rating: 5, content: "TravelSense planned our Kashmir trip down to the last detail. The Gurez Valley recommendation was a game-changer — we had the entire valley to ourselves! Jayshree's personal touch made all the difference.", destination: "Kashmir", packageTitle: "Kashmir with Gurez Valley", featured: true },
  { name: "Rahul Mehta", location: "Bangalore", rating: 5, content: "The Ladakh circuit was perfectly planned considering acclimatization. Our guide knew every hidden spot. Pangong Lake at sunrise was the highlight of our lives.", destination: "Leh-Ladakh", packageTitle: "Ladakh Complete Circuit", featured: true },
  { name: "Anita Desai", location: "Pune", rating: 5, content: "As a solo female traveler, I was nervous about Northeast India. TravelSense arranged everything — safe stays, knowledgeable guides, and the living root bridges were surreal!", destination: "Meghalaya", packageTitle: "Northeast Discovery", featured: true },
  { name: "Vikram & Neha Joshi", location: "Delhi", rating: 5, content: "Our Kerala honeymoon was magical. The houseboat in Alleppey, the spice gardens in Thekkady, and the Kathakali show — every day was a new experience.", destination: "Kerala", packageTitle: "Kerala Backwaters & Spices", featured: true },
  { name: "Sanjay Patel", location: "Ahmedabad", rating: 4, content: "Took our family of 8 on the Royal Rajasthan trip. TravelSense handled the entire logistics — from a tempo traveller to heritage hotel stays. Desert safari was a hit with the kids!", destination: "Rajasthan", packageTitle: "Royal Rajasthan", featured: true },
  { name: "Meera Krishnan", location: "Chennai", rating: 5, content: "The Bali package was incredible value. Mount Batur sunrise trek and Nusa Penida were bucket-list experiences. The villa they arranged had its own private pool!", destination: "Bali", packageTitle: "Bali Island of Gods", featured: true },
  { name: "Arjun Reddy", location: "Hyderabad", rating: 5, content: "First time using a travel consultant and won't go back to DIY planning. The Golden Triangle itinerary was efficient — we saw both Taj Mahal sunrise AND sunset!", destination: "Golden Triangle", packageTitle: "Golden Triangle Explorer", featured: false },
  { name: "Deepa Nair", location: "Kochi", rating: 4, content: "The Himachal trip exceeded expectations. Bir Billing paragliding was a surprise add-on from the team. McLeodganj's Tibetan food was an unexpected delight.", destination: "Himachal Pradesh", packageTitle: "Himachal Classic", featured: false },
]

// ═══════════════════════════════════════════════════════════
// FAQs
// ═══════════════════════════════════════════════════════════

const faqs = [
  { question: "How do I book a trip with TravelSense?", answer: "Start by booking a free consultation on our website. Share your destination preferences, budget, dates, and interests. Our team will create a personalized itinerary for your review. Once you approve and make the initial payment, your trip is confirmed.", category: "booking", order: 1 },
  { question: "Can I customize any package?", answer: "Absolutely! Every TravelSense package is fully customizable. You can adjust the destination, duration, accommodation type, activities, meals, and transportation based on your preferences.", category: "booking", order: 2 },
  { question: "How far in advance should I book?", answer: "We recommend 3-4 weeks for domestic trips and 6-8 weeks for international travel. For peak seasons (summer holidays, Diwali, year-end), book 2-3 months ahead.", category: "booking", order: 3 },
  { question: "What payment methods do you accept?", answer: "We accept UPI, credit/debit cards, net banking, and bank transfers. A 30% advance is required at booking, with the balance due 15 days before travel.", category: "payment", order: 4 },
  { question: "What is your cancellation policy?", answer: "30+ days before departure: minimal charges. 15-30 days: 25% of package cost. 7-14 days: 50%. Less than 7 days: 75% or more. Travel insurance is strongly recommended.", category: "cancellation", order: 5 },
  { question: "Do you assist with visa and passport?", answer: "Yes! We handle documentation guidance, application filing, appointment scheduling, and follow-ups for 50+ countries. Submit an inquiry on our Visa & Passport page.", category: "visa", order: 6 },
  { question: "Do you provide vehicles for local travel?", answer: "Yes — we arrange sedans, SUVs, tempo travellers, mini buses, and luxury coaches for local sightseeing, airport transfers, and inter-city travel.", category: "vehicles", order: 7 },
  { question: "Is TravelSense suitable for solo travelers?", answer: "Definitely! We design solo-friendly itineraries with safe accommodations, guided tours, and local contacts. Solo adventure and educational packages are very popular.", category: "general", order: 8 },
  { question: "Do you offer group discounts?", answer: "Groups of 5+ get special pricing. Corporate retreats, college trips, and family reunions qualify for additional perks. Contact us for a custom group quote.", category: "general", order: 9 },
  { question: "What is typically included in a package?", answer: "Standard inclusions: accommodation, transfers, sightseeing as per itinerary, breakfast (or meals as specified), and a dedicated trip coordinator. Exact inclusions are listed with every quote.", category: "packages", order: 10 },
]

// ═══════════════════════════════════════════════════════════
// AUTHOR
// ═══════════════════════════════════════════════════════════

const author = {
  _type: "author",
  _id: "author-jayshree",
  name: "Jayshree Lakhotiya",
  bio: "Founder of TravelSense with 15+ years of travel expertise. Passionate about making curated, stress-free travel accessible to every working professional.",
}

// ═══════════════════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════════════════

async function seed() {
  console.log("🌱 Starting Sanity seed...")

  // 1. Create author
  console.log("Creating author...")
  await client.createOrReplace(author)

  // 2. Create destinations
  console.log("Creating destinations...")
  for (const d of destinations) {
    const doc = {
      _type: "destination",
      _id: `dest-${slug(d.name)}`,
      name: d.name,
      slug: { _type: "slug", current: slug(d.name) },
      description: d.description,
      region: d.region,
      country: d.country,
      category: d.category,
      bestTimeToVisit: d.bestTimeToVisit,
      weather: d.weather,
      startingPrice: d.startingPrice,
      highlights: d.highlights,
      featured: d.featured,
      published: true,
    }
    await client.createOrReplace(doc)
    console.log(`  ✓ ${d.name}`)
  }

  // 3. Create packages
  console.log("Creating packages...")
  for (const p of packages) {
    const doc = {
      _type: "package",
      _id: `pkg-${slug(p.title).substring(0, 60)}`,
      title: p.title,
      slug: { _type: "slug", current: slug(p.title).substring(0, 80) },
      description: p.description,
      destination: { _type: "reference", _ref: `dest-${p.destinationSlug}` },
      category: p.category,
      duration: p.duration,
      price: p.price,
      discountedPrice: p.discountedPrice,
      difficulty: p.difficulty,
      groupSize: p.groupSize,
      inclusions: p.inclusions,
      exclusions: p.exclusions,
      itinerary: p.itinerary.map((day, i) => ({
        _type: "object",
        _key: `day-${i}`,
        day: day.day,
        title: day.title,
        description: day.description,
        activities: day.activities,
      })),
      highlights: p.highlights,
      featured: p.featured,
      published: true,
    }
    await client.createOrReplace(doc)
    console.log(`  ✓ ${p.title}`)
  }

  // 4. Create blog posts
  console.log("Creating blog posts...")
  for (const b of blogPosts) {
    const doc = {
      _type: "blog",
      _id: `blog-${slug(b.title).substring(0, 60)}`,
      title: b.title,
      slug: { _type: "slug", current: slug(b.title).substring(0, 80) },
      excerpt: b.excerpt,
      category: b.category,
      readTime: b.readTime,
      featured: b.featured,
      publishedAt: new Date().toISOString(),
      author: { _type: "reference", _ref: "author-jayshree" },
      body: [
        {
          _type: "block",
          _key: "intro",
          style: "normal",
          children: [{ _type: "span", _key: "s1", text: b.excerpt + " Read more on the TravelSense blog for the complete guide." }],
          markDefs: [],
        },
      ],
    }
    await client.createOrReplace(doc)
    console.log(`  ✓ ${b.title}`)
  }

  // 5. Create testimonials
  console.log("Creating testimonials...")
  for (const t of testimonials) {
    const doc = {
      _type: "testimonial",
      _id: `testimonial-${slug(t.name)}`,
      name: t.name,
      location: t.location,
      rating: t.rating,
      content: t.content,
      destination: t.destination,
      packageTitle: t.packageTitle,
      featured: t.featured,
      published: true,
    }
    await client.createOrReplace(doc)
    console.log(`  ✓ ${t.name}`)
  }

  // 6. Create FAQs
  console.log("Creating FAQs...")
  for (const f of faqs) {
    const doc = {
      _type: "faq",
      _id: `faq-${slug(f.question).substring(0, 60)}`,
      question: f.question,
      answer: f.answer,
      category: f.category,
      order: f.order,
      published: true,
    }
    await client.createOrReplace(doc)
    console.log(`  ✓ ${f.question.substring(0, 50)}...`)
  }

  console.log("\n✅ Sanity seeding complete!")
  console.log(`  ${destinations.length} destinations`)
  console.log(`  ${packages.length} packages`)
  console.log(`  ${blogPosts.length} blog posts`)
  console.log(`  ${testimonials.length} testimonials`)
  console.log(`  ${faqs.length} FAQs`)
  console.log(`  1 author`)
}

seed().catch(console.error)
