export type Region =
  | "North India"
  | "Northeast India"
  | "South India"
  | "West India"
  | "International"

export type Category = "leisure" | "adventure" | "educational"

export interface PopularExperience {
  title: string
  description: string
  icon: string
}

export interface Destination {
  name: string
  slug: string
  region: Region
  country: string
  category: Category
  tagline: string
  description: string
  longDescription: string
  heroImage: string
  galleryImages: string[]
  bestTimeToVisit: string
  weather: string
  startingPrice: number
  highlights: string[]
  thingsToKnow: string[]
  popularExperiences: PopularExperience[]
  featured: boolean
}

export const destinations: Destination[] = [
  /* ──────────────────────── 1. Kashmir ──────────────────────── */
  {
    name: "Kashmir",
    slug: "kashmir",
    region: "North India",
    country: "India",
    category: "leisure",
    tagline: "Paradise on Earth Awaits You",
    description:
      "Snow-capped peaks, pristine Dal Lake, and lush Mughal gardens make Kashmir an unforgettable escape. From the flower-filled meadows of Pahalgam to the ski slopes of Gulmarg, every corner of this Himalayan jewel offers breathtaking beauty.",
    longDescription:
      "Kashmir has captivated travellers for centuries with its extraordinary natural beauty. Nestled in the northernmost reaches of India, the valley is cradled by the Pir Panjal and Karakoram ranges, giving rise to alpine meadows, glacial lakes, and dense pine forests that shift colours with every season. A shikara ride on Dal Lake at sunrise, drifting past floating gardens and carved wooden houseboats, remains one of the most iconic travel experiences in the world.\n\nBeyond the lakes, Gulmarg transforms into a world-class ski destination in winter and a wildflower paradise in summer. Pahalgam offers serene riverside walks and serves as the base for the sacred Amarnath Yatra. Sonamarg — the Meadow of Gold — is the gateway to the Thajiwas Glacier and the stunning Zoji La pass. Throughout the valley, Mughal-era gardens like Shalimar Bagh and Nishat Bagh showcase centuries of horticultural artistry.\n\nKashmiri culture is equally enchanting — from the intricate Pashmina shawls and papier-mache craftsmanship to the rich Wazwan cuisine featuring dishes like Rogan Josh and Yakhni. Whether you seek adventure, spirituality, or pure relaxation, Kashmir delivers an experience that lingers long after you leave.",
    heroImage: "/images/generated/kashmir-hero.webp",
    galleryImages: [
      "/images/generated/kashmir-shikara-dal-lake.webp",
      "/images/generated/kashmir-gulmarg-meadow.webp",
      "/images/generated/kashmir-pahalgam-lidder.webp",
      "/images/generated/kashmir-mughal-gardens.webp",
      "/images/generated/kashmir-sonmarg-glacier.webp",
      "/images/generated/kashmir-betaab-valley.webp",
    ],
    bestTimeToVisit: "March to October (Summer & Autumn)",
    weather:
      "Summers (Apr–Jun) are pleasant at 15–30 °C, ideal for sightseeing. Winters (Nov–Feb) drop to −5 °C with heavy snowfall — perfect for skiing. Monsoon (Jul–Sep) brings moderate rain.",
    startingPrice: 18000,
    highlights: [
      "Dal Lake Shikara Ride",
      "Gulmarg Gondola & Skiing",
      "Pahalgam Valley Trek",
      "Mughal Gardens",
      "Sonamarg Glacier Trail",
      "Wazwan Cuisine Experience",
      "Pashmina Shopping",
      "Houseboat Stay",
    ],
    thingsToKnow: [
      "Carry warm clothing even in summer — evenings can get chilly above 7,000 ft.",
      "Book houseboats through verified operators to ensure safety and cleanliness.",
      "The Amarnath Yatra (Jun–Aug) requires a separate permit and medical fitness certificate.",
      "Mobile connectivity can be unreliable in remote areas — download offline maps.",
      "Respect local customs; dress modestly when visiting religious sites.",
    ],
    popularExperiences: [
      {
        title: "Shikara Sunrise on Dal Lake",
        description:
          "Glide past floating gardens and wooden houseboats as the first light paints the Zabarwan hills gold.",
        icon: "🛶",
      },
      {
        title: "Gulmarg Gondola Ride",
        description:
          "Soar to 13,000 ft on one of the world's highest cable cars for jaw-dropping Himalayan panoramas.",
        icon: "🚡",
      },
      {
        title: "Betaab Valley Picnic",
        description:
          "Spread a blanket in the film-famous meadow surrounded by snow-dusted peaks and crystal streams.",
        icon: "🏔️",
      },
      {
        title: "Wazwan Feast",
        description:
          "Savour the legendary multi-course Kashmiri banquet featuring Rogan Josh, Gushtaba, and saffron rice.",
        icon: "🍛",
      },
    ],
    featured: true,
  },

  /* ──────────────────────── 2. Leh-Ladakh ──────────────────────── */
  {
    name: "Leh-Ladakh",
    slug: "leh-ladakh",
    region: "North India",
    country: "India",
    category: "adventure",
    tagline: "Where the Mountains Touch the Sky",
    description:
      "The land of high passes offers breathtaking cold desert landscapes, ancient Buddhist monasteries, and the highest motorable roads in the world. Pangong Lake's ever-changing blues and the rugged Nubra Valley make Ladakh a bucket-list adventure.",
    longDescription:
      "Ladakh is a realm of extremes — the air is thin, the sun fierce, and the landscape so surreal it feels like another planet. Perched at an average altitude of 11,500 ft, this cold desert is carved by the Indus River and framed by the Karakoram and Zanskar ranges. The stark, mineral-toned mountains shift from ochre to violet as the sun moves across a relentlessly blue sky, and the silence is profound enough to hear your own heartbeat.\n\nThe crown jewel is Pangong Tso, a 134-km-long lake that oscillates between turquoise, sapphire, and emerald depending on the light. Nubra Valley — reached via the legendary Khardung La at 17,982 ft — surprises with sand dunes and rare Bactrian camels. Hemis, Thiksey, and Diskit monasteries dot the landscape, their prayer flags fluttering against impossibly dramatic backdrops. In Leh town itself, whitewashed stupas line bustling bazaars where you can sip butter tea and shop for turquoise jewellery.\n\nAdventure seekers can attempt the Chadar frozen-river trek in winter, raft the Zanskar rapids in summer, or ride a Royal Enfield along the Manali-Leh Highway. Ladakh rewards those who brave its altitude with experiences found nowhere else on earth.",
    heroImage: "/images/generated/leh-ladakh-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1573053985939-81bc1a37a4cb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1589824783845-94f6f1dd8e23?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600176183920-ff3e18e45321?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1614604689579-1a41395e5009?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590674668498-9c1e68326e01?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570543999-74aebc83ca7c?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "June to September",
    weather:
      "Summers (Jun–Sep) range 15–30 °C during the day but drop near freezing at night. Winters (Nov–Mar) plummet to −20 °C with heavy snow closing most passes. Spring (Apr–May) is transitional with limited road access.",
    startingPrice: 22000,
    highlights: [
      "Pangong Tso Lake",
      "Khardung La Pass",
      "Nubra Valley & Sand Dunes",
      "Hemis Monastery",
      "Magnetic Hill",
      "Tso Moriri Lake",
      "Zanskar River Rafting",
      "Leh Palace & Old Town",
    ],
    thingsToKnow: [
      "Acclimatise for at least 24–48 hours in Leh before heading to high-altitude passes.",
      "Inner Line Permits are required for Pangong, Nubra, Tso Moriri, and border areas — arrange through a local agent.",
      "Carry Diamox or consult a doctor for altitude sickness prevention before your trip.",
      "Fuel stations are scarce beyond Leh — keep your tank full and carry a spare jerry can.",
      "Respect monastery etiquette: remove shoes, walk clockwise around stupas, and ask before photographing monks.",
    ],
    popularExperiences: [
      {
        title: "Pangong Lake Camping",
        description:
          "Spend a night under a canopy of stars beside the colour-shifting lake at 14,000 ft.",
        icon: "⛺",
      },
      {
        title: "Khardung La Motorcycle Ride",
        description:
          "Conquer one of the world's highest motorable roads on a Royal Enfield through switchbacks and snow.",
        icon: "🏍️",
      },
      {
        title: "Hemis Monastery Festival",
        description:
          "Witness masked Cham dances and vibrant Buddhist celebrations at the largest gompa in Ladakh.",
        icon: "🎭",
      },
      {
        title: "Zanskar River Rafting",
        description:
          "Navigate Grade III–IV rapids through a dramatic gorge flanked by towering canyon walls.",
        icon: "🚣",
      },
    ],
    featured: true,
  },

  /* ──────────────────────── 3. Himachal Pradesh ──────────────────────── */
  {
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    region: "North India",
    country: "India",
    category: "leisure",
    tagline: "Mountains, Monasteries, and Magic Moments",
    description:
      "From the colonial charm of Shimla to the adventure hub of Manali and the spiritual calm of Dharamshala, Himachal Pradesh offers mountains, apple orchards, and serene valleys that cater to every kind of traveller.",
    longDescription:
      "Himachal Pradesh is the quintessential Himalayan getaway for Indians and international visitors alike. The state unfurls across a stunning range of altitudes — from the subtropical foothills near Chandigarh to the trans-Himalayan moonscapes of Spiti Valley above 12,000 ft. Each town has its own personality: Shimla charms with its Ridge promenade and mock-Tudor architecture, Manali pulses with backpacker energy and roaring rivers, and McLeodganj offers Tibetan momos and meditation retreats in the shadow of the Dhauladhar range.\n\nNature lovers will find no shortage of wonders — the Great Himalayan National Park (a UNESCO World Heritage Site) shelters snow leopards and over 375 bird species, while Kasol and Kheerganga draw trekkers with pine-forest trails ending at natural hot springs. The Kullu Valley erupts in colour during the October Dussehra festival, a week-long celebration unique to the region. And for the truly intrepid, the Spiti circuit delivers jaw-dropping vistas of barren peaks, hanging monasteries, and fossil-laden ridges.\n\nHimachal is also an epicure's delight — think fresh trout from Tirthan Valley, Sidu bread from Kullu, and piping-hot Siddu with ghee on a cold mountain morning. Whether you seek adrenaline or tranquillity, this state wraps you in mountain air and sends you home renewed.",
    heroImage: "/images/generated/himachal-pradesh-hero.webp",
    galleryImages: [
      "/images/generated/shimla-mall-road.webp",
      "/images/generated/manali-valley.webp",
      "/images/generated/solang-valley-snow.webp",
      "/images/generated/mcleodganj-monastery.webp",
      "/images/generated/khajjiar-meadow.webp",
      "/images/generated/spiti-kaza-village.webp",
    ],
    bestTimeToVisit: "March to June & October to February",
    weather:
      "Summers (Mar–Jun) see 15–25 °C in hill stations — ideal for trekking. Monsoon (Jul–Sep) brings landslides on some routes. Winters (Oct–Feb) offer snowfall in Shimla, Manali, and Spiti.",
    startingPrice: 12000,
    highlights: [
      "Shimla Ridge & Mall Road",
      "Manali & Solang Valley",
      "Dharamshala & McLeodganj",
      "Spiti Valley Road Trip",
      "Kasol & Kheerganga Trek",
      "Great Himalayan National Park",
    ],
    thingsToKnow: [
      "Spiti Valley roads are open only from June to October — plan accordingly.",
      "Book Volvo buses from Delhi early; they sell out fast during peak season (May–Jun, Dec).",
      "Carry layers — temperature can swing 15 degrees between sun and shade at altitude.",
      "Inner Line Permits may be needed for areas close to the Indo-Tibetan border.",
    ],
    popularExperiences: [
      {
        title: "Solang Valley Paragliding",
        description:
          "Soar above the Beas Valley with snow-capped peaks stretching to the horizon on both sides.",
        icon: "🪂",
      },
      {
        title: "Triund Night Trek",
        description:
          "Hike through rhododendron forests to a ridge campsite with panoramic Dhauladhar views.",
        icon: "🥾",
      },
      {
        title: "Tibetan Culture Walk in McLeodganj",
        description:
          "Visit the Dalai Lama's temple, spin prayer wheels, and taste authentic Tibetan thukpa.",
        icon: "🛕",
      },
      {
        title: "Apple Orchard Stay in Kullu",
        description:
          "Sleep in a heritage cottage surrounded by blossoming apple trees and mountain silence.",
        icon: "🍎",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 4. Rajasthan ──────────────────────── */
  {
    name: "Rajasthan",
    slug: "rajasthan",
    region: "North India",
    country: "India",
    category: "educational",
    tagline: "Royal Heritage of the Desert Kings",
    description:
      "Royal palaces, golden deserts, and vibrant culture define the land of kings. From the pink walls of Jaipur to the blue streets of Jodhpur and the golden fort of Jaisalmer, Rajasthan is a living museum of Indian history and artistry.",
    longDescription:
      "Rajasthan is India distilled to its most vivid essence — a tapestry of colour, courage, and craftsmanship spread across the Thar Desert and the Aravalli hills. Every city here wears a colour: Jaipur is the Pink City of ornate havelis and the majestic Amber Fort, Jodhpur is the Blue City crowned by the impregnable Mehrangarh, Udaipur is the White City of shimmering lakes and floating palaces, and Jaisalmer is the Golden City where a 12th-century citadel rises from the sand like a mirage.\n\nThe state's heritage runs deep. Rajput warriors built cliff-top fortresses that are now UNESCO World Heritage Sites; Mughal emperors laid intricate marble gardens; and generations of artisans perfected block printing, blue pottery, and miniature painting traditions that continue today. The annual Pushkar Camel Fair, the Jaipur Literature Festival, and the Desert Festival at Jaisalmer draw global audiences who come as visitors and leave as devotees.\n\nBeyond monuments, Rajasthan offers sensory overload in the best way — the aroma of dal bati churma wafting through narrow lanes, the swirl of ghagra-choli skirts at a village wedding, the silence of a desert night interrupted only by folk songs around a campfire. A Rajasthan trip is not just a holiday; it is an education in how history, art, and resilience shape a culture.",
    heroImage: "/images/generated/rajasthan-hero.webp",
    galleryImages: [
      "/images/generated/jaipur-hawa-mahal.webp",
      "/images/generated/amber-fort-jaipur.webp",
      "/images/generated/jodhpur-mehrangarh.webp",
      "/images/generated/jaisalmer-fort-golden.webp",
      "/images/generated/ranthambore-tiger-safari.webp",
      "/images/generated/pushkar-lake-ghats.webp",
    ],
    bestTimeToVisit: "October to March",
    weather:
      "Winters (Oct–Mar) are ideal at 10–25 °C. Summers (Apr–Jun) soar above 45 °C in the desert. Monsoon (Jul–Sep) brings brief relief and lush greenery to Udaipur and Mount Abu.",
    startingPrice: 15000,
    highlights: [
      "Amber Fort & Jaipur City Palace",
      "Mehrangarh Fort, Jodhpur",
      "Lake Palace, Udaipur",
      "Jaisalmer Desert Safari",
      "Pushkar Camel Fair",
      "Ranthambore Tiger Safari",
      "Hawa Mahal & Jantar Mantar",
      "Blue Pottery Workshop",
    ],
    thingsToKnow: [
      "Avoid visiting between April and June — daytime temperatures in the Thar can exceed 48 °C.",
      "Ranthambore tiger safari slots book out weeks ahead — reserve early on the official portal.",
      "Carry scarves and long sleeves for temple visits and sun protection in the desert.",
      "Bargain respectfully at bazaars; fixed-price government emporiums offer quality souvenirs too.",
      "Hire a local guide at forts like Mehrangarh — the stories bring the stones to life.",
    ],
    popularExperiences: [
      {
        title: "Desert Camping Under the Stars",
        description:
          "Ride a camel into the Thar dunes, feast on Rajasthani thali, and sleep under a billion stars.",
        icon: "🐪",
      },
      {
        title: "Amber Fort Elephant or Jeep Ascent",
        description:
          "Ascend the ramparts of Jaipur's hilltop fortress with the Maota Lake glittering below.",
        icon: "🏰",
      },
      {
        title: "Lake Pichola Sunset Boat Ride",
        description:
          "Cruise Udaipur's jewel-like lake as the City Palace and Jag Mandir glow in the twilight.",
        icon: "⛵",
      },
      {
        title: "Ranthambore Tiger Safari",
        description:
          "Track Bengal tigers through the ruins of an ancient fortress-turned-wildlife sanctuary.",
        icon: "🐅",
      },
    ],
    featured: true,
  },

  /* ──────────────────────── 5. Varanasi & Uttar Pradesh ──────────────────────── */
  {
    name: "Varanasi & Uttar Pradesh",
    slug: "varanasi-uttar-pradesh",
    region: "North India",
    country: "India",
    category: "educational",
    tagline: "Spiritual Capital of Ancient India",
    description:
      "One of the oldest living cities in the world, Varanasi pulses with sacred rituals, ancient temples, and the mesmerising Ganga Aarti. Uttar Pradesh also houses the Taj Mahal, Sarnath, and the epic city of Lucknow.",
    longDescription:
      "Varanasi defies easy description. Situated on the banks of the Ganges, it has been a centre of learning, faith, and culture for over 3,000 years. The city's 84 ghats cascade down to the river in a maze of stone steps, each with its own story — Dashashwamedh Ghat hosts the spectacular nightly Ganga Aarti, where priests wield flaming brass lamps in synchronised choreography that draws thousands. At Manikarnika Ghat, funeral pyres burn around the clock, a stark and profound reminder of the Hindu belief that dying here grants moksha — liberation from the cycle of rebirth.\n\nBeyond the ghats, the old city is a labyrinth of narrow lanes (galis) that conceal silk-weaving workshops, centuries-old sweet shops, and temples to every imaginable deity. The Kashi Vishwanath Temple, dedicated to Lord Shiva, is the spiritual anchor of Varanasi. Nearby Sarnath, where the Buddha gave his first sermon, offers serene stupas and a world-class archaeological museum.\n\nUttar Pradesh extends the narrative — the Taj Mahal in Agra stands as humanity's greatest monument to love, Lucknow serves up kebabs and Nawabi architecture, and Prayagraj hosts the Kumbh Mela, the largest gathering of humans on earth. A journey through UP is a journey through the layered soul of India.",
    heroImage: "/images/generated/varanasi-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1570804485046-1d51e3edcbe9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585135497273-1a86d9d55580?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1602339752474-f77aa7bcdeaa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to March",
    weather:
      "Winters (Nov–Feb) are comfortable at 8–22 °C. Summers (Apr–Jun) are extremely hot, above 40 °C. Monsoon (Jul–Sep) is humid with heavy rain.",
    startingPrice: 10000,
    highlights: [
      "Ganga Aarti at Dashashwamedh Ghat",
      "Kashi Vishwanath Temple",
      "Sarnath Buddhist Ruins",
      "Boat Ride at Sunrise",
      "Taj Mahal, Agra",
      "Lucknow Kebab Trail",
    ],
    thingsToKnow: [
      "Dress conservatively when visiting temples — shoulders and knees should be covered.",
      "Hire a local boatman for a sunrise ride — it is the most peaceful way to see the ghats.",
      "Avoid the extreme summer months (May–June); temperatures regularly exceed 45 °C.",
      "Be cautious with street food if you have a sensitive stomach — stick to busy, reputable stalls.",
      "Photography at cremation ghats is strictly prohibited out of respect.",
    ],
    popularExperiences: [
      {
        title: "Ganga Aarti Ceremony",
        description:
          "Watch priests perform the ancient fire ritual on the steps of Dashashwamedh Ghat at dusk.",
        icon: "🪔",
      },
      {
        title: "Sunrise Boat Ride",
        description:
          "Float past 84 ghats at dawn as the rising sun bathes the ancient city in amber light.",
        icon: "🚣",
      },
      {
        title: "Silk Weaving Workshop",
        description:
          "Meet master weavers crafting Banarasi silk saris on hand-operated looms in narrow alleyways.",
        icon: "🧵",
      },
      {
        title: "Street Food Walk",
        description:
          "Taste kachori sabzi, malaiyyo, and tamatar chaat on a guided walk through the old city lanes.",
        icon: "🍽️",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 6. Golden Triangle ──────────────────────── */
  {
    name: "Golden Triangle",
    slug: "golden-triangle",
    region: "North India",
    country: "India",
    category: "educational",
    tagline: "India's Most Iconic Heritage Circuit",
    description:
      "The Delhi-Agra-Jaipur circuit is the perfect introduction to India's rich heritage. From the Mughal grandeur of the Taj Mahal to the Rajput splendour of Amber Fort and the cosmopolitan energy of Delhi, this triangle packs centuries of history into one unforgettable journey.",
    longDescription:
      "The Golden Triangle is India's most popular tourist route, and for good reason — it distils the subcontinent's staggering diversity into three extraordinary cities connected by well-maintained highways. Delhi opens the journey with a dual personality: Old Delhi's Chandni Chowk is a sensory onslaught of spices, rickshaws, and Mughal-era monuments like the Red Fort and Jama Masjid, while New Delhi's tree-lined avenues showcase Lutyens' colonial architecture, India Gate, and the modern bustle of Connaught Place.\n\nAgra, two hundred kilometres southeast, is home to the Taj Mahal — a monument whose perfection in white marble defies photography and must be witnessed in person. The nearby Agra Fort and the abandoned Mughal city of Fatehpur Sikri add depth to the Mughal narrative. From Agra, the road swings southwest to Jaipur, the Pink City, where the Amber Fort perches on a hill like a crown, the Hawa Mahal's honeycomb facade conceals royal secrets, and the Jantar Mantar observatory reminds you that Indian science was centuries ahead of its time.\n\nThe beauty of the Golden Triangle lies in its compactness — the entire circuit can be comfortably covered in five to seven days, making it ideal for first-time visitors to India or travellers with limited time. TravelSense enhances the classic itinerary with curated local experiences, boutique hotel stays, and expert guides who turn monuments into living stories.",
    heroImage: "/images/generated/golden-triangle-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515091943-9d5c0ad475af?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585135497273-1a86d9d55580?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524309307259-7c7d4bf28a1e?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to March",
    weather:
      "Winters (Oct–Mar) are ideal at 8–25 °C. Summers (Apr–Jun) are very hot, crossing 42 °C. Monsoon (Jul–Sep) brings humidity and occasional heavy rain.",
    startingPrice: 18000,
    highlights: [
      "Taj Mahal at Sunrise",
      "Amber Fort & Elephant Ride",
      "Chandni Chowk Food Walk",
      "Hawa Mahal & City Palace",
      "Qutub Minar & India Gate",
      "Fatehpur Sikri",
    ],
    thingsToKnow: [
      "Book Taj Mahal tickets online in advance — queues can be very long, especially on weekends.",
      "Fridays the Taj Mahal is closed to tourists (open only for prayers).",
      "Use prepaid taxis or Uber/Ola at airports and railway stations to avoid scams.",
      "The circuit is best done by private car with driver — roads between cities are 4–6 hours each.",
      "Carry cash for smaller shops and tips; UPI works widely at restaurants and hotels.",
    ],
    popularExperiences: [
      {
        title: "Taj Mahal at Sunrise",
        description:
          "Enter the grounds at first light and watch the marble monument blush pink in the dawn sky.",
        icon: "🕌",
      },
      {
        title: "Old Delhi Heritage Walk",
        description:
          "Navigate Chandni Chowk's 400-year-old lanes with a historian and taste legendary street food.",
        icon: "🚶",
      },
      {
        title: "Amber Fort Sound & Light Show",
        description:
          "Watch the fort walls come alive with projected history and Rajasthani folk music after dark.",
        icon: "🏰",
      },
      {
        title: "Block Printing Workshop in Jaipur",
        description:
          "Learn the ancient art of hand-stamped textile printing from master craftsmen in Sanganer.",
        icon: "🎨",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 7. Uttarakhand ──────────────────────── */
  {
    name: "Uttarakhand",
    slug: "uttarakhand",
    region: "North India",
    country: "India",
    category: "adventure",
    tagline: "Land of Gods and Wild Rivers",
    description:
      "The Dev Bhoomi offers sacred pilgrimages, Himalayan treks, and wildlife sanctuaries amidst stunning mountain scenery. From yoga in Rishikesh to the lakes of Nainital and the peaks of the Garhwal Himalayas, Uttarakhand is a haven for seekers and adventurers.",
    longDescription:
      "Uttarakhand — the Land of the Gods — sits at the threshold where the Indo-Gangetic plains surrender to the mighty Himalayas. The state is the source of India's two holiest rivers, the Ganga and the Yamuna, and its ancient temples have drawn pilgrims for millennia. Rishikesh, the Yoga Capital of the World, combines spiritual energy with adrenaline: meditate at dawn in an ashram, then raft Class IV rapids on the Ganga by afternoon. Haridwar, just downstream, hosts the nightly Ganga Aarti at Har Ki Pauri with a fervour that rivals Varanasi.\n\nFor nature lovers, the state is a treasure chest. Jim Corbett National Park — India's oldest — shelters Bengal tigers, elephants, and over 600 bird species. The Valley of Flowers, a UNESCO World Heritage Site, blooms in a kaleidoscope of alpine wildflowers every monsoon. Nainital and Mussoorie offer colonial-era lakeside charm, while Auli provides some of the best skiing in India with panoramic views of Nanda Devi.\n\nThe spiritual heart of Uttarakhand beats strongest at the Char Dham — the four sacred shrines of Yamunotri, Gangotri, Kedarnath, and Badrinath — a pilgrimage that traverses some of the most spectacular mountain scenery on earth. Whether your journey is inward or outward, Uttarakhand has a path for you.",
    heroImage: "/images/generated/uttarakhand-hero.webp",
    galleryImages: [
      "/images/generated/haridwar-har-ki-pauri.webp",
      "/images/generated/nainital-naini-lake.webp",
      "/images/generated/mussoorie-mall-road.webp",
      "/images/generated/badrinath-temple.webp",
      "/images/generated/jim-corbett-safari.webp",
      "/images/generated/rishikesh-rafting.webp",
    ],
    bestTimeToVisit: "March to June & September to November",
    weather:
      "Summers (Mar–Jun) are pleasant in the hills at 15–30 °C. Monsoon (Jul–Aug) brings heavy rainfall and landslide risk. Winters (Nov–Feb) see snowfall above 6,000 ft.",
    startingPrice: 14000,
    highlights: [
      "Rishikesh Yoga & Rafting",
      "Nainital Lake & Naini Peak",
      "Jim Corbett Tiger Safari",
      "Valley of Flowers Trek",
      "Haridwar Ganga Aarti",
      "Auli Skiing",
      "Mussoorie Hill Station",
      "Chopta-Tungnath Trek",
    ],
    thingsToKnow: [
      "Rishikesh and Haridwar are holy cities — alcohol and non-vegetarian food are restricted in many areas.",
      "Valley of Flowers is accessible only July to September and requires a moderate trek.",
      "Jim Corbett zones book out months ahead — Dhikala zone offers the best tiger sighting odds.",
      "Road conditions deteriorate during monsoon; avoid driving in the hills during heavy rain.",
    ],
    popularExperiences: [
      {
        title: "Bungee Jumping in Rishikesh",
        description:
          "Leap from India's highest bungee platform at 83 metres above a rocky river gorge.",
        icon: "🤸",
      },
      {
        title: "Ganga Rafting Adventure",
        description:
          "Paddle through Grade III–IV rapids on a 16-km stretch of the holy Ganga river.",
        icon: "🚣",
      },
      {
        title: "Sunrise at Chopta-Tungnath",
        description:
          "Trek to the world's highest Shiva temple at 12,073 ft and watch dawn break over the Himalayas.",
        icon: "⛰️",
      },
      {
        title: "Corbett Jungle Safari",
        description:
          "Spot Bengal tigers, wild elephants, and gharials on a guided jeep safari through sal forests.",
        icon: "🐘",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 8. Meghalaya ──────────────────────── */
  {
    name: "Meghalaya",
    slug: "meghalaya",
    region: "Northeast India",
    country: "India",
    category: "adventure",
    tagline: "Abode of Clouds and Living Bridges",
    description:
      "Living root bridges, crystal-clear rivers, and the wettest place on earth await in the abode of clouds. Meghalaya is a hidden gem of northeast India where nature has sculpted an otherworldly landscape of limestone caves, plunging waterfalls, and emerald canyons.",
    longDescription:
      "Meghalaya — literally 'the abode of clouds' — is northeast India's best-kept secret, a highland of rolling green hills perpetually draped in mist and rain. The state receives some of the highest rainfall on the planet, and this abundance of water has created a landscape of extraordinary beauty: Nohkalikai Falls plunges 340 metres into a turquoise pool, the Dawki River flows so clear that boats appear to float on glass, and underground caverns stretch for kilometres in the Jaintia Hills.\n\nThe most iconic features are the living root bridges of the Khasi and Jaintia tribes — centuries-old bioengineering marvels where the roots of rubber fig trees have been trained across rivers to form sturdy, growing bridges. The double-decker root bridge at Nongriat requires a 3,500-step descent but rewards visitors with a sight found nowhere else on earth. Mawlynnong, often called Asia's cleanest village, demonstrates that eco-conscious living is a tradition here, not a trend.\n\nBeyond adventure, Meghalaya offers cultural richness — the Khasi matrilineal society, where lineage and property pass through the mother, is one of the few such systems in the world. Local markets bustle with smoked meats, Jadoh rice dishes, and fermented bamboo shoot preparations. Whether you are caving in Krem Mawmluh, kayaking on Umngot River, or simply sitting on a cliff edge watching clouds roll in below you, Meghalaya delivers an experience that is raw, unspoiled, and profoundly moving.",
    heroImage: "/images/generated/meghalaya-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1625735765267-7c2bae3f5b9d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609340667519-3f314bd23c3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586325194227-7625ed95172b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506038634487-60a69ae4b7b1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to May",
    weather:
      "Post-monsoon (Oct–Nov) and spring (Mar–May) are ideal with clear skies and waterfalls at full flow. Monsoon (Jun–Sep) brings extreme rain — Cherrapunji gets 11,000 mm annually. Winters (Dec–Feb) are cool and pleasant at 5–15 °C.",
    startingPrice: 20000,
    highlights: [
      "Living Root Bridges of Nongriat",
      "Dawki River Crystal Waters",
      "Nohkalikai & Elephant Falls",
      "Mawlynnong Cleanest Village",
      "Cherrapunji Caves & Viewpoints",
      "Shillong Peak & Ward's Lake",
    ],
    thingsToKnow: [
      "The trek to the double-decker root bridge involves 3,500 steep steps — be reasonably fit.",
      "Carry waterproof bags and quick-dry clothing; rain can arrive without warning any time of year.",
      "Meghalaya is a dry state on certain days — check local liquor laws before planning.",
      "Respect tribal customs in villages; always ask before photographing people.",
      "Inner Line Permits are NOT required for Meghalaya, unlike some other NE states.",
    ],
    popularExperiences: [
      {
        title: "Living Root Bridge Trek",
        description:
          "Descend thousands of steps through jungle to stand on a bridge grown over 500 years by human hands.",
        icon: "🌿",
      },
      {
        title: "Glass-Bottom Kayaking on Dawki",
        description:
          "Paddle over the transparent Umngot River and watch fish swim beneath your crystal-clear boat.",
        icon: "🛶",
      },
      {
        title: "Cave Exploration in Krem Mawmluh",
        description:
          "Crawl, wade, and scramble through India's fourth-longest cave system with a headlamp.",
        icon: "🦇",
      },
      {
        title: "Cherrapunji Cliff Walk",
        description:
          "Stroll along misty cliff edges with waterfalls plunging into the Bangladesh plains far below.",
        icon: "🌧️",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 9. Sikkim & Darjeeling ──────────────────────── */
  {
    name: "Sikkim & Darjeeling",
    slug: "sikkim-darjeeling",
    region: "Northeast India",
    country: "India",
    category: "leisure",
    tagline: "Tea Gardens and Himalayan Sunrises",
    description:
      "Stunning views of Kanchenjunga, ancient monasteries, and the world-famous Darjeeling tea gardens make this region a haven of serenity. Sikkim adds colourful Buddhist culture and pristine alpine lakes to the experience.",
    longDescription:
      "Sikkim and Darjeeling together offer one of India's most enchanting Himalayan experiences — a blend of British colonial nostalgia, Tibetan Buddhist spirituality, and raw mountain grandeur. Darjeeling, perched at 6,700 ft, is synonymous with its tea — the 'Champagne of Teas' — and a ride on the UNESCO-listed Darjeeling Himalayan Railway (the Toy Train) through misty loops and switchbacks is a journey back in time. Tiger Hill delivers what many consider the finest sunrise in India: the first rays igniting Kanchenjunga's snowy ridges in gold and pink while Everest peeks over the horizon.\n\nCross into Sikkim and the landscape shifts to steeper valleys, wilder rivers, and more vivid monasteries. Gangtok, the capital, sits on a ridge with sweeping views of the Kanchenjunga range. Rumtek and Pemayangtse monasteries house centuries of Buddhist art, and during Losar (Tibetan New Year) the valleys erupt in masked dances and prayer flags. Tsomgo Lake, at 12,310 ft, is a sacred glacial pool that freezes solid in winter and thaws into sapphire blue by spring.\n\nFor trekkers, the Goechala trail leads to the base of Kanchenjunga, offering some of the most dramatic mountain scenery in the eastern Himalayas. For everyone else, the simple pleasure of sipping first-flush Darjeeling tea while watching clouds part to reveal the world's third-highest peak is reason enough to visit.",
    heroImage: "/images/generated/sikkim-and-darjeeling-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1575550959580-76e19e2a5e3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567600700712-470c1e4e3849?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "March to May & October to December",
    weather:
      "Spring (Mar–May) brings clear skies, blooming rhododendrons, and 10–20 °C. Monsoon (Jun–Sep) is heavy rain. Autumn (Oct–Dec) has crystal-clear mountain views. Winters are cold with snow above 8,000 ft.",
    startingPrice: 18000,
    highlights: [
      "Tiger Hill Sunrise",
      "Darjeeling Tea Estate Tour",
      "Toy Train Ride (UNESCO)",
      "Rumtek Monastery",
      "Tsomgo Lake",
      "Goechala Trek",
    ],
    thingsToKnow: [
      "Inner Line Permits (ILP) are required for Tsomgo Lake, Nathula Pass, and parts of North Sikkim.",
      "Nathula Pass (India-China border) is closed on Mondays and Tuesdays.",
      "Altitude sickness can affect visitors at Tsomgo (12,000 ft) and above — acclimatise gradually.",
      "Darjeeling's Toy Train runs limited services; book in advance for the joy ride or full route.",
      "Try momos, thukpa, and gundruk at local Tibetan eateries for an authentic meal.",
    ],
    popularExperiences: [
      {
        title: "Tiger Hill Sunrise",
        description:
          "Rise at 4 AM to witness Kanchenjunga and distant Everest glow gold in the first light of dawn.",
        icon: "🌅",
      },
      {
        title: "Tea Garden Walk & Tasting",
        description:
          "Stroll through manicured Darjeeling tea bushes and taste first-flush brews with a planter.",
        icon: "🍵",
      },
      {
        title: "Toy Train Joy Ride",
        description:
          "Chug along the UNESCO heritage railway through loops, tunnels, and pine-scented air.",
        icon: "🚂",
      },
      {
        title: "Monastery Meditation Session",
        description:
          "Join monks for a guided meditation at Rumtek Monastery overlooking the Gangtok valley.",
        icon: "🧘",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 10. Arunachal Pradesh ──────────────────────── */
  {
    name: "Arunachal Pradesh",
    slug: "arunachal-pradesh",
    region: "Northeast India",
    country: "India",
    category: "adventure",
    tagline: "India's Untouched Eastern Frontier",
    description:
      "India's last frontier offers untouched tribal cultures, the majestic Tawang monastery, and pristine Himalayan landscapes. Arunachal Pradesh is a land of mist-covered mountains, roaring rivers, and ancient traditions preserved by 26 major tribes.",
    longDescription:
      "Arunachal Pradesh — the Land of the Dawn-Lit Mountains — is India's wildest and least-visited state, and therein lies its magic. Spanning from the snow-clad eastern Himalayas to the subtropical forests of the Brahmaputra basin, it harbours a biodiversity rivalled only by the Amazon and a cultural richness that has no parallel elsewhere in India. The 26 major tribal groups — including the Monpa, Adi, Apatani, and Nyishi — each maintain distinct languages, festivals, costumes, and architectural styles.\n\nTawang is the jewel of the state: a 400-year-old Buddhist monastery perched at 10,000 ft that is the second-largest in the world after Lhasa's Potala Palace. The drive to Tawang via Sela Pass (13,700 ft) is among the most dramatic in India, passing frozen lakes and prayer-flag-draped ridges. Ziro Valley, a UNESCO World Heritage tentative site, is home to the Apatani tribe and their unique rice-fish farming system, and the annual Ziro Music Festival draws indie bands and travellers from around the globe.\n\nFor adventure seekers, Mechuka offers riverside camping in a valley so remote it feels like Shangri-La, while Namdapha National Park — one of the largest protected areas in Asia — shelters snow leopards, red pandas, and all four big cat species of India. Visiting Arunachal requires patience (permits, rough roads, limited infrastructure), but those who make the effort are rewarded with experiences that feel genuinely untouched by mass tourism.",
    heroImage: "/images/generated/arunachal-pradesh-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1611911813383-67d01a3a7a73?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596627116790-af6f46ddddbc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571536802086-159e4c3eb207?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "March to October",
    weather:
      "Spring (Mar–May) and autumn (Sep–Oct) offer clear skies and mild temperatures. Monsoon (Jun–Aug) brings heavy rain but lush greenery. Winters (Nov–Feb) see snowfall at higher elevations and road closures.",
    startingPrice: 25000,
    highlights: [
      "Tawang Monastery",
      "Sela Pass (13,700 ft)",
      "Ziro Valley & Apatani Culture",
      "Mechuka Valley",
      "Namdapha National Park",
      "Bomdila & Dirang Valleys",
    ],
    thingsToKnow: [
      "Inner Line Permit (ILP) is mandatory for all Indian tourists — apply online at least 7 days ahead.",
      "Foreign nationals need a Protected Area Permit (PAP) — apply through a registered tour operator.",
      "Roads are rough and travel times are long; plan no more than 150 km of driving per day.",
      "Mobile network coverage is patchy outside Itanagar and Tawang town — carry offline maps.",
      "The state is largely dry; alcohol is restricted in several districts.",
    ],
    popularExperiences: [
      {
        title: "Tawang Monastery Visit",
        description:
          "Explore the 400-year-old gompa at 10,000 ft and watch monks debate in the courtyard.",
        icon: "🛕",
      },
      {
        title: "Sela Pass Snow Drive",
        description:
          "Cross a 13,700-ft frozen pass draped in prayer flags with panoramic Himalayan views.",
        icon: "🏔️",
      },
      {
        title: "Ziro Music Festival",
        description:
          "Camp in rice paddies and enjoy indie music surrounded by the Apatani tribal homeland.",
        icon: "🎶",
      },
      {
        title: "Mechuka Valley Camping",
        description:
          "Pitch your tent beside the Siyom River in one of India's most remote and beautiful valleys.",
        icon: "🏕️",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 11. Assam ──────────────────────── */
  {
    name: "Assam",
    slug: "assam",
    region: "Northeast India",
    country: "India",
    category: "leisure",
    tagline: "Wild Rhinos and Golden Tea Gardens",
    description:
      "Vast tea estates, the mighty Brahmaputra, one-horned rhinos, and vibrant Bihu culture define India's gateway to the northeast. Assam combines wildlife encounters with river island serenity and one of the world's finest tea-growing regions.",
    longDescription:
      "Assam is the gateway to northeast India and a destination that rewards the curious with its vast, fertile landscapes and warm Assamese hospitality. The state is defined by the Brahmaputra — one of the world's great rivers — which carves a wide valley between the Himalayan foothills and the Karbi-Meghalaya plateau. On its banks and flood plains, Kaziranga National Park shelters two-thirds of the world's population of the greater one-horned rhinoceros, alongside wild elephants, water buffalo, and tigers. A jeep safari through Kaziranga's tall elephant grass at dawn, with rhinos grazing just metres away, is among India's most thrilling wildlife experiences.\n\nBeyond Kaziranga, Manas National Park (a UNESCO World Heritage Site) offers tigersighting opportunities in a more remote, less-visited setting. Majuli — the world's largest river island — sits in the Brahmaputra and is the cultural heart of Assam, home to centuries-old Vaishnavite satras (monasteries) where mask-making and neo-Vaishnavite dance traditions continue.\n\nAssam's tea heritage is legendary. The region produces over half of India's tea, and a visit to a working tea estate in Upper Assam — with mist rolling over emerald bushes — is unforgettable. The state comes alive during Bihu, the harvest festival, when communities gather for feasts, folk dances, and buffalo fights. Assam is not a destination you rush through; it is one you settle into, letting the pace of the river set the rhythm of your days.",
    heroImage: "/images/generated/assam-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600071907662-57460e6b1320?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1589793907316-f94025b46850?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617824654019-900adea4e457?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "November to April",
    weather:
      "Winters (Nov–Feb) are dry and pleasant at 10–25 °C — best for wildlife. Spring (Mar–Apr) is warm. Monsoon (May–Sep) brings heavy floods; Kaziranga closes Jul–Oct.",
    startingPrice: 16000,
    highlights: [
      "Kaziranga Rhino Safari",
      "Majuli Island Culture",
      "Assam Tea Estate Tour",
      "Manas National Park",
      "Brahmaputra River Cruise",
      "Kamakhya Temple, Guwahati",
    ],
    thingsToKnow: [
      "Kaziranga National Park is closed from May to October due to monsoon flooding.",
      "Book elephant and jeep safari slots online well in advance — especially for the Central Range.",
      "Majuli island is accessible only by ferry from Jorhat; services depend on river conditions.",
      "Carry insect repellent — the riverine areas have mosquitoes, especially near dusk.",
      "Assam tea estates sometimes offer homestay experiences — book through local tourism boards.",
    ],
    popularExperiences: [
      {
        title: "Kaziranga Elephant Safari",
        description:
          "Ride atop an elephant through tall grass at dawn for eye-level encounters with one-horned rhinos.",
        icon: "🦏",
      },
      {
        title: "Brahmaputra Sunset Cruise",
        description:
          "Sail the mighty river as the sun dips behind the hills and dolphins surface alongside the boat.",
        icon: "🚢",
      },
      {
        title: "Tea Garden Breakfast",
        description:
          "Sip fresh Assam CTC brew amid rolling green bushes as mist lifts off the plantation at sunrise.",
        icon: "🍵",
      },
      {
        title: "Majuli Mask-Making Workshop",
        description:
          "Learn the ancient Vaishnavite art of crafting bamboo and clay masks at a 500-year-old satra.",
        icon: "🎭",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 12. Kerala ──────────────────────── */
  {
    name: "Kerala",
    slug: "kerala",
    region: "South India",
    country: "India",
    category: "leisure",
    tagline: "God's Own Country of Backwaters",
    description:
      "Backwaters, lush tea gardens, Ayurvedic wellness, and palm-fringed beaches make Kerala a tropical paradise. From houseboat cruises in Alleppey to the mist-covered hills of Munnar, every experience here is steeped in natural beauty.",
    longDescription:
      "Kerala, hugging India's southwestern coast, is a narrow strip of paradise sandwiched between the Arabian Sea and the Western Ghats. The state has earned its 'God's Own Country' moniker through a remarkable combination of natural beauty, cultural richness, and a quality of life that consistently leads India in education and healthcare. The backwaters — a network of 900 km of interconnected canals, rivers, and lakes — are Kerala's signature, and a night on a traditional kettuvallam houseboat drifting past coconut groves, paddy fields, and village temples is one of India's most iconic travel experiences.\n\nInland, the Western Ghats rise to reveal Munnar, where endless carpets of tea plantations drape the hillsides in brilliant green. Thekkady's Periyar Wildlife Sanctuary offers bamboo rafting alongside wild elephants, and the spice gardens of Wayanad fill the air with cardamom, pepper, and cinnamon. On the coast, Kovalam and Varkala offer cliff-top beaches and world-class Ayurvedic resorts where traditional treatments have been practiced for over 5,000 years.\n\nKerala's cultural calendar is equally vibrant: the Onam harvest festival brings flower carpets and snake-boat races, Kathakali dance-dramas tell mythological tales through elaborate makeup and codified gestures, and the Thrissur Pooram temple festival features 30 caparisoned elephants and a competitive fireworks display. Add to this a cuisine built on coconut, curry leaves, and fresh seafood, and Kerala becomes not just a destination but a full sensory immersion.",
    heroImage: "/images/generated/kerala-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584723333016-ee4747be3b29?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590677880200-f563bdb25e1b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609340667519-3f314bd23c3e?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "September to March",
    weather:
      "Winter (Oct–Feb) is ideal at 22–32 °C with low humidity. Summer (Mar–May) gets hot and humid. Monsoon (Jun–Sep) brings lush greenery — Ayurveda treatments are considered most effective during monsoon.",
    startingPrice: 15000,
    highlights: [
      "Alleppey Houseboat Cruise",
      "Munnar Tea Plantations",
      "Periyar Wildlife Sanctuary",
      "Kovalam & Varkala Beaches",
      "Kathakali Dance Performance",
      "Ayurvedic Spa & Wellness",
      "Fort Kochi Heritage Walk",
      "Wayanad Spice Gardens",
    ],
    thingsToKnow: [
      "Book houseboats through Kerala Tourism-certified operators to ensure safety standards.",
      "Ayurvedic treatments require multi-day programmes for real benefit — plan at least 5–7 days.",
      "Kerala is a partial prohibition state; alcohol is available only at licensed hotels and toddy shops.",
      "Monsoon season (Jun–Sep) is off-peak but ideal for Ayurveda and lush photography.",
      "Carry modest clothing for temple visits — many require white or light-coloured attire.",
    ],
    popularExperiences: [
      {
        title: "Alleppey Houseboat Night Stay",
        description:
          "Drift through palm-lined backwater canals on a traditional kettuvallam with a private chef onboard.",
        icon: "🛥️",
      },
      {
        title: "Munnar Tea Plantation Walk",
        description:
          "Stroll through emerald-green tea gardens at 6,000 ft with mountain mist swirling around you.",
        icon: "🌿",
      },
      {
        title: "Kathakali Performance",
        description:
          "Watch a 300-year-old dance-drama tradition unfold through vibrant costumes and expressive gestures.",
        icon: "💃",
      },
      {
        title: "Ayurvedic Rejuvenation",
        description:
          "Surrender to warm herbal oil therapies at a traditional Ayurvedic centre overlooking the sea.",
        icon: "🧖",
      },
    ],
    featured: true,
  },

  /* ──────────────────────── 13. Goa ──────────────────────── */
  {
    name: "Goa",
    slug: "goa",
    region: "West India",
    country: "India",
    category: "leisure",
    tagline: "Sun, Sand, and Portuguese Soul",
    description:
      "Sun-kissed beaches, Portuguese heritage, and vibrant nightlife make Goa India's favourite coastal escape. From the lively shores of Baga to the serene coves of South Goa, the smallest state packs a punch far beyond its size.",
    longDescription:
      "Goa is India's party capital and spiritual retreat rolled into one tiny coastal state. For over 450 years under Portuguese rule, Goa developed a hybrid culture that blends Latin Catholicism with Hindu traditions, creating a vibe found nowhere else in the country. The Old Goa churches — including the Basilica of Bom Jesus, which houses the remains of St. Francis Xavier — are UNESCO World Heritage Sites, and the whitewashed chapels scattered through the countryside give the landscape a distinctly Mediterranean flavour.\n\nNorth Goa is where the action lives: Baga and Calangute beaches throb with shack music and water sports, Anjuna hosts the legendary Wednesday flea market, and Vagator's hilltop clubs overlook the sea with world-class DJs spinning till dawn. Cross the Zuari River to South Goa and the mood shifts — Palolem's crescent beach, Agonda's quiet sands, and Cabo de Rama's clifftop fort offer a more relaxed, nature-focused experience.\n\nBeyond the beaches, Goa surprises with spice plantations in Ponda, mangrove kayaking in Cumbarjua, and Fontainhas — a neighbourhood in Panaji lined with colour-washed Portuguese-era houses and bakeries selling warm bebinca and poee bread. The Goan seafood thali — featuring prawn balchao, fish curry rice, and sol kadhi — is a culinary experience in itself. Whether you come for the party or the peace, Goa has a way of making you stay longer than you planned.",
    heroImage: "/images/generated/goa-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587922546307-776227941871?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "November to February",
    weather:
      "Winter (Nov–Feb) is peak season at 21–32 °C with zero rain. Summer (Mar–May) gets hot and humid. Monsoon (Jun–Oct) transforms Goa into lush green — many shacks close but waterfalls come alive.",
    startingPrice: 12000,
    highlights: [
      "Baga & Calangute Beaches",
      "Old Goa Churches (UNESCO)",
      "Anjuna Flea Market",
      "Palolem Beach, South Goa",
      "Fontainhas Latin Quarter",
      "Dudhsagar Waterfalls",
      "Spice Plantation Tour",
      "Sunset Cruise on the Mandovi",
    ],
    thingsToKnow: [
      "Peak season (Dec–Jan) sees high prices and crowded beaches — book accommodation 2–3 months ahead.",
      "Rent a scooter for the best way to explore; carry your international or Indian driving licence.",
      "North Goa is lively and party-oriented; South Goa is quieter and more family-friendly.",
      "Dudhsagar Falls is best visited during or just after monsoon (Aug–Nov) when water flow is strongest.",
      "Tipping is customary at beach shacks — 10% is standard.",
    ],
    popularExperiences: [
      {
        title: "Sunset Kayaking in Mangroves",
        description:
          "Paddle through silent mangrove channels as the sky turns orange over the Mandovi estuary.",
        icon: "🛶",
      },
      {
        title: "Old Goa Heritage Walking Tour",
        description:
          "Explore 16th-century Portuguese churches, convents, and the tomb of St. Francis Xavier.",
        icon: "⛪",
      },
      {
        title: "Beach Shack Seafood Feast",
        description:
          "Dig your toes in the sand while feasting on butter-garlic prawns and Goan fish curry.",
        icon: "🦐",
      },
      {
        title: "Saturday Night Market at Arpora",
        description:
          "Shop for bohemian fashion, eat global street food, and enjoy live music under the stars.",
        icon: "🎪",
      },
    ],
    featured: true,
  },

  /* ──────────────────────── 14. Karnataka ──────────────────────── */
  {
    name: "Karnataka",
    slug: "karnataka",
    region: "South India",
    country: "India",
    category: "educational",
    tagline: "Ruins, Coffee, and Coastal Magic",
    description:
      "From the ancient ruins of Hampi to the coffee plantations of Coorg and the regal splendour of Mysore Palace, Karnataka blends heritage, nature, and a stunning coastline into one richly diverse state.",
    longDescription:
      "Karnataka is one of India's most underrated travel destinations, offering a staggering range of experiences within a single state. The crown jewel is Hampi — the ruined capital of the Vijayanagara Empire, where over 1,600 stone monuments and temple complexes are scattered across a surreal boulder-strewn landscape that looks like it was designed by giants. The Vittala Temple's stone chariot and musical pillars are marvels of medieval engineering that leave visitors speechless.\n\nCoorg (Kodagu) provides a complete change of scenery: mist-covered coffee plantations, pepper vines, waterfalls, and the distinct Kodava culture with its martial traditions and pork-heavy cuisine. Mysore — the City of Palaces — is Karnataka's cultural capital, where the illuminated Mysore Palace during Dussehra (Dasara) is one of India's most spectacular sights. The Brindavan Gardens, the Chamundi Hill temple, and the Devaraja Market complete the royal experience.\n\nThe Karnataka coast is an undiscovered gem: Gokarna offers Goa-like beaches without the crowds, the ancient temple town of Udupi serves the best dosa you will ever eat, and Murudeshwar's 123-ft Shiva statue looms over the Arabian Sea. Inland, the Deccan Plateau reveals Badami's cave temples, Aihole's experimental early temples, and Pattadakal's UNESCO-listed Chalukyan masterpieces. Karnataka is a state where every region tells a different chapter of Indian civilisation.",
    heroImage: "/images/generated/karnataka-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586325194227-7625ed95172b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1602339752474-f77aa7bcdeaa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580289234369-3bd2e6d3b546?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to February",
    weather:
      "Winters (Oct–Feb) are pleasant at 15–28 °C statewide. Summers (Mar–May) are hot in the plains but comfortable in Coorg. Monsoon (Jun–Sep) transforms the coast and the Western Ghats into lush green paradise.",
    startingPrice: 14000,
    highlights: [
      "Hampi Ruins (UNESCO)",
      "Coorg Coffee Plantations",
      "Mysore Palace & Dasara Festival",
      "Gokarna Beaches",
      "Badami Cave Temples",
      "Jog Falls",
    ],
    thingsToKnow: [
      "Hampi is best explored over 2–3 days; rent a bicycle or moped to cover the spread-out ruins.",
      "Mysore Dasara (October) is spectacular but extremely crowded — book hotels months ahead.",
      "Coorg homestays are the best way to experience the region — many offer plantation tours included.",
      "Gokarna's Om Beach and Half Moon Beach require short treks; carry water and sun protection.",
      "The Jog Falls are most impressive during and just after monsoon (Aug–Nov).",
    ],
    popularExperiences: [
      {
        title: "Hampi Boulder Sunrise",
        description:
          "Climb Matanga Hill before dawn and watch the sun rise over thousands of ancient temple ruins.",
        icon: "🌄",
      },
      {
        title: "Coorg Coffee Trail",
        description:
          "Walk through misty coffee plantations, learn the bean-to-cup process, and sip fresh brew.",
        icon: "☕",
      },
      {
        title: "Mysore Palace Night Illumination",
        description:
          "See 97,000 bulbs light up the Indo-Saracenic palace every Sunday and during Dasara.",
        icon: "🏛️",
      },
      {
        title: "Gokarna Beach Trek",
        description:
          "Hike the coastal trail linking Paradise, Half Moon, and Om beaches through rocky headlands.",
        icon: "🏖️",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 15. Andaman Islands ──────────────────────── */
  {
    name: "Andaman Islands",
    slug: "andaman-islands",
    region: "South India",
    country: "India",
    category: "adventure",
    tagline: "Pristine Beaches and Coral Wonders",
    description:
      "Crystal-clear waters, pristine beaches, and world-class diving in the Bay of Bengal. The Andaman Islands offer India's most exotic tropical escape with dense mangrove forests, bioluminescent bays, and a fascinating colonial history.",
    longDescription:
      "The Andaman Islands are India's answer to the Maldives — only wilder, more remote, and rich with history. This archipelago of over 570 islands lies 1,200 km off the Indian mainland in the Bay of Bengal, and only a handful are open to visitors, ensuring that the experience remains pristine and uncrowded. Havelock Island (Swaraj Dweep) is the star attraction: Radhanagar Beach has been ranked among Asia's best, and the underwater world around Elephant Beach and the Lighthouse reef rivals the Great Barrier Reef in colour and diversity.\n\nPort Blair, the capital, offers a sobering history lesson at the Cellular Jail — a colonial-era prison where Indian freedom fighters were held in solitary confinement. The nightly Sound & Light Show at the jail is a powerful reminder of the independence struggle. Ross Island and Viper Island add more layers to the colonial narrative with their crumbling ruins overtaken by jungle.\n\nFor adventure seekers, Andaman is a playground: scuba diving and snorkelling at sites like The Wall, Dixon's Pinnacle, and North Reef reveal manta rays, turtles, and technicolor coral gardens. Sea-walking at North Bay lets even non-swimmers walk the ocean floor. Neil Island (Shaheed Dweep) is quieter and perfect for cycling between secluded beaches. The bioluminescent plankton at Havelock, visible on dark nights, turn the lapping waves into liquid starlight — a sight that stays with you forever.",
    heroImage: "/images/generated/andaman-islands-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584723333016-ee4747be3b29?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to May",
    weather:
      "Dry season (Nov–May) offers calm seas, clear skies, and 24–33 °C. Monsoon (Jun–Sep) brings rough seas and some ferry cancellations but lush greenery.",
    startingPrice: 28000,
    highlights: [
      "Radhanagar Beach, Havelock",
      "Scuba Diving at The Wall",
      "Cellular Jail Sound & Light Show",
      "Neil Island Cycling",
      "Bioluminescence Night Kayak",
      "Sea Walking at North Bay",
    ],
    thingsToKnow: [
      "Flights from mainland India (Chennai, Kolkata, Delhi) book up fast in peak season — plan early.",
      "Inter-island ferries (Makruzz, Nautika) should be booked online at least a week ahead.",
      "Scuba diving requires no prior experience for Discovery/Try Dives — certified divers can explore deeper sites.",
      "Tribal reserves (North Sentinel, Jarawa territory) are strictly off-limits; respect these boundaries.",
      "Carry cash — ATMs are limited on Havelock and Neil; many places do not accept cards.",
    ],
    popularExperiences: [
      {
        title: "Scuba Diving at Havelock",
        description:
          "Descend into coral gardens teeming with clownfish, turtles, and manta rays in crystal-clear waters.",
        icon: "🤿",
      },
      {
        title: "Radhanagar Beach Sunset",
        description:
          "Sink your feet into Asia's finest sand as the sun melts into the Bay of Bengal in a blaze of gold.",
        icon: "🌅",
      },
      {
        title: "Bioluminescence Kayaking",
        description:
          "Paddle through a dark bay and watch every stroke light up the water with electric-blue plankton.",
        icon: "✨",
      },
      {
        title: "Cellular Jail Night Show",
        description:
          "Experience India's freedom struggle come alive through light projections on the prison walls.",
        icon: "🏛️",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 17. Bali ──────────────────────── */
  {
    name: "Bali",
    slug: "bali",
    region: "International",
    country: "Indonesia",
    category: "leisure",
    tagline: "Island of Gods and Eternal Beauty",
    description:
      "Tropical paradise with terraced rice paddies, ancient temples, and a vibrant arts scene. Bali is Indonesia's island of the gods, where volcanic peaks, coral reefs, and Balinese Hindu culture create a uniquely enchanting destination.",
    longDescription:
      "Bali is a destination that transcends the ordinary. This Indonesian island, barely 150 km across, packs an extraordinary diversity of experiences into its compact frame. The spiritual heart of Bali beats in Ubud, where the Tegallalang rice terraces cascade down hillsides in brilliant emerald tiers, galleries and craft shops line monkey-forest lanes, and the Saraswati Temple floats on a lotus pond. The Sacred Monkey Forest Sanctuary, with its moss-covered temples and 700 resident long-tailed macaques, is both spiritual and playful.\n\nThe southern coast delivers Bali's glamorous side: Seminyak's beach clubs like Potato Head and La Brisa set the tone for sunset cocktails, Kuta draws surfers and budget travellers, and the clifftop Uluwatu Temple stages Kecak fire dances against a backdrop of crashing Indian Ocean waves at sunset. For those seeking deeper immersion, the eastern coast reveals Amed's quiet snorkelling reefs, Sidemen's pristine rice terraces (without the crowds of Tegallalang), and Tirta Gangga's ornate water palace.\n\nBali's volcano, Mount Agung, dominates the island's skyline and cultural imagination. A pre-dawn hike to the summit rewards with a sunrise above the clouds. The surrounding highlands offer white-water rafting on the Ayung River, quad-bike rides through jungle trails, and coffee plantations where you can taste the legendary (and controversial) Luwak coffee. Bali manages to be both a luxury retreat and a budget-friendly adventure hub, a spiritual sanctuary and a party paradise — and that is precisely its magic.",
    heroImage: "/images/generated/bali-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "April to October (Dry Season)",
    weather:
      "Dry season (Apr–Oct) sees 27–30 °C with low humidity — ideal for beach and outdoor activities. Wet season (Nov–Mar) brings afternoon showers but also lush greenery and fewer crowds.",
    startingPrice: 55000,
    highlights: [
      "Tegallalang Rice Terraces",
      "Uluwatu Temple & Kecak Dance",
      "Ubud Monkey Forest",
      "Seminyak Beach Clubs",
      "Mount Agung Sunrise Hike",
      "Tirta Empul Holy Spring",
      "Nusa Penida Island Day Trip",
      "Ayung River Rafting",
    ],
    thingsToKnow: [
      "Indians get Visa on Arrival (VoA) for 30 days at Ngurah Rai Airport — carry a return ticket.",
      "Rent a scooter or hire a private driver for the day (roughly ₹2,500–3,000) to explore freely.",
      "Temples require sarongs — they are usually provided at entrances, but carry your own for smaller temples.",
      "Bargain at markets but not at restaurants or fixed-price shops — start at 50% and settle around 70%.",
      "Nyepi (Day of Silence, around March) shuts down the entire island for 24 hours — no flights, no going out.",
    ],
    popularExperiences: [
      {
        title: "Tegallalang Sunrise Walk",
        description:
          "Wander through cascading rice terraces at dawn before the tour buses arrive and capture the magic.",
        icon: "🌾",
      },
      {
        title: "Uluwatu Kecak Fire Dance",
        description:
          "Watch 50 bare-chested performers chant and dance as the sun sets over the ocean cliffs.",
        icon: "🔥",
      },
      {
        title: "Nusa Penida Island Hopping",
        description:
          "Speed-boat to the dinosaur-shaped coastline, snorkel with manta rays, and explore Kelingking Beach.",
        icon: "🏝️",
      },
      {
        title: "Ubud Art & Craft Walk",
        description:
          "Visit painters, woodcarvers, and silversmiths in the surrounding villages with a local guide.",
        icon: "🎨",
      },
    ],
    featured: true,
  },

  /* ──────────────────────── 18. Thailand ──────────────────────── */
  {
    name: "Thailand",
    slug: "thailand",
    region: "International",
    country: "Thailand",
    category: "leisure",
    tagline: "Temples, Islands, and Street Food Bliss",
    description:
      "Golden temples, bustling night markets, and idyllic islands make Thailand Southeast Asia's crown jewel. From the vibrant chaos of Bangkok to the emerald waters of Krabi and the cultural riches of Chiang Mai, Thailand has something for every traveller.",
    longDescription:
      "Thailand — the Land of Smiles — is Southeast Asia's most visited destination, and it consistently delivers on its promise of warmth, beauty, and value. Bangkok, the pulsating capital, is a study in contrasts: glittering Buddhist temples like Wat Phra Kaew stand alongside futuristic skyscrapers, and humble street-food carts serve dishes that rival any Michelin restaurant. The city's Grand Palace, floating markets at Damnoen Saduak, and rooftop bars overlooking the Chao Phraya River offer a sensory overload that somehow feels entirely manageable.\n\nThe Thai islands are legendary. Phuket is the largest and most developed, with Patong Beach offering nightlife, water sports, and island-hopping to the Phi Phi Islands — where Maya Bay's turquoise lagoon became famous worldwide. Krabi's Railay Beach, accessible only by boat and framed by limestone karsts, is a rock-climber's paradise. Koh Samui and Koh Phangan cater to honeymooners and full-moon partygoers respectively, while Koh Lipe in the deep south remains a hidden gem with Maldivian clarity.\n\nNorthern Thailand is where culture deepens. Chiang Mai, the Rose of the North, is ringed by forested mountains dotted with hilltribe villages, elephant sanctuaries (ethical ones that focus on rescue and rehabilitation), and the beautiful Doi Suthep temple. The Night Bazaar is a treasure hunt for Thai silk, hand-carved soap flowers, and aromatic massage oils. Thai cuisine — from pad thai and green curry to mango sticky rice — is an adventure in itself, and cooking classes in Chiang Mai or Bangkok are among the most popular activities for visiting Indians.",
    heroImage: "/images/generated/thailand-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558500133-66ff3e620849?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "November to February (Cool & Dry Season)",
    weather:
      "Cool season (Nov–Feb) is ideal at 20–32 °C. Hot season (Mar–May) can exceed 38 °C. Monsoon (Jun–Oct) varies by coast — Gulf islands peak Nov–Dec while Andaman coast is wet.",
    startingPrice: 45000,
    highlights: [
      "Grand Palace & Wat Phra Kaew, Bangkok",
      "Phi Phi Islands & Maya Bay",
      "Chiang Mai Night Bazaar",
      "Railay Beach Rock Climbing",
      "Floating Markets",
      "Ethical Elephant Sanctuary",
    ],
    thingsToKnow: [
      "Indians get Visa on Arrival for 15 days or can apply for e-Visa (60 days) — carry 2 passport photos and 10,000 THB equivalent.",
      "Tuk-tuks and taxis in Bangkok often refuse meters — use Grab (Southeast Asia's Uber) for fair fares.",
      "Temple dress code: cover shoulders and knees. Many temples provide wraps at the entrance.",
      "Thai street food is safe and delicious — look for stalls with high local turnover for the freshest food.",
      "Full Moon Parties on Koh Phangan happen monthly — book Koh Samui or Koh Phangan hotels well in advance.",
    ],
    popularExperiences: [
      {
        title: "Grand Palace Temple Tour",
        description:
          "Explore Bangkok's most sacred site, home to the Emerald Buddha and 200 years of Thai royal history.",
        icon: "🛕",
      },
      {
        title: "Phi Phi Island Speedboat Tour",
        description:
          "Snorkel in turquoise lagoons, kayak through sea caves, and swim at the famous Maya Bay.",
        icon: "🏝️",
      },
      {
        title: "Chiang Mai Cooking Class",
        description:
          "Shop at a local market then cook authentic pad thai, green curry, and mango sticky rice.",
        icon: "👨‍🍳",
      },
      {
        title: "Ethical Elephant Experience",
        description:
          "Feed, bathe, and walk alongside rescued elephants at a sanctuary in the Chiang Mai hills.",
        icon: "🐘",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 19. Dubai & UAE ──────────────────────── */
  {
    name: "Dubai & UAE",
    slug: "dubai-uae",
    region: "International",
    country: "UAE",
    category: "leisure",
    tagline: "Luxury, Adventure, and Desert Dreams",
    description:
      "Futuristic skylines, luxury shopping, and desert adventures — the UAE is a playground of modern marvels. From the world's tallest building to golden sand dune safaris, Dubai and Abu Dhabi redefine what a holiday can be.",
    longDescription:
      "The United Arab Emirates has transformed from a sleepy Gulf trading post into one of the world's most ambitious travel destinations in barely five decades. Dubai leads the charge with superlatives: the Burj Khalifa at 828 metres is the world's tallest building, the Dubai Mall is the largest shopping centre, the Palm Jumeirah is the largest artificial island, and the Dubai Frame offers a gilded doorway between old and new. The city's appetite for the extraordinary is matched by its hospitality — five-star hotels, Michelin-starred restaurants, and experiences like indoor skiing at Ski Dubai and deep-sea diving at Deep Dive Dubai make it a playground without parallel.\n\nBeyond the glass towers, the old heart of Dubai still beats in the Al Fahidi Historical Neighbourhood, where wind-tower houses line narrow lanes, and the Dubai Creek bustles with traditional wooden dhows. A sunset desert safari — complete with dune bashing, camel rides, falconry displays, and a BBQ dinner under the stars — is a must-do that connects visitors with the Bedouin heritage underlying the UAE's modern exterior.\n\nAbu Dhabi, an hour's drive away, offers a more cultured counterpoint. The Sheikh Zayed Grand Mosque is one of the most beautiful religious buildings on earth, the Louvre Abu Dhabi brings world art to the Gulf under Jean Nouvel's iconic dome, and Yas Island combines a Formula 1 circuit with Ferrari World and Warner Bros. World theme parks. For Indian travellers, the UAE holds a special place — with a massive Indian diaspora, familiar food, direct flights from every major city, and visa-on-arrival convenience, it is the easiest international getaway from India.",
    heroImage: "/images/generated/dubai-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "November to March",
    weather:
      "Winter (Nov–Mar) is ideal at 18–28 °C. Summer (Apr–Oct) soars to 45 °C+ with extreme humidity — outdoor activities become very challenging.",
    startingPrice: 60000,
    highlights: [
      "Burj Khalifa Observation Deck",
      "Desert Safari with BBQ Dinner",
      "Dubai Mall & Fountain Show",
      "Sheikh Zayed Grand Mosque",
      "Palm Jumeirah & Atlantis",
      "Louvre Abu Dhabi",
      "Dubai Creek & Gold Souk",
      "Ferrari World, Yas Island",
    ],
    thingsToKnow: [
      "Indians can get a 14-day visa on arrival in the UAE — ensure your passport is valid for 6+ months.",
      "Dress modestly in public spaces, especially at malls, mosques, and government buildings.",
      "Friday is the weekend in UAE; the Dubai Fountain show runs every 30 minutes from 6 PM daily.",
      "The Dubai Metro is efficient and affordable — buy a Nol card for seamless public transport.",
      "Alcohol is available only at licensed restaurants and hotels; public intoxication is a legal offence.",
    ],
    popularExperiences: [
      {
        title: "Burj Khalifa Sunset Visit",
        description:
          "Ride to the 148th floor observation deck and watch the sun set below a sea of skyscrapers.",
        icon: "🏙️",
      },
      {
        title: "Desert Dune Bashing Safari",
        description:
          "Race over golden sand dunes in a 4x4, ride camels, and feast on BBQ under a canopy of stars.",
        icon: "🏜️",
      },
      {
        title: "Dubai Creek Dhow Cruise",
        description:
          "Sail on a traditional wooden dhow past illuminated city skylines while enjoying an Arabic dinner.",
        icon: "⛵",
      },
      {
        title: "Sheikh Zayed Mosque Tour",
        description:
          "Marvel at the world's largest hand-knotted carpet and 24-karat gold chandeliers in this white marble masterpiece.",
        icon: "🕌",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 20. Vietnam ──────────────────────── */
  {
    name: "Vietnam",
    slug: "vietnam",
    region: "International",
    country: "Vietnam",
    category: "adventure",
    tagline: "Ancient Charm Meets Natural Splendour",
    description:
      "Emerald rice paddies, dramatic Ha Long Bay, and vibrant ancient towns make Vietnam a feast for the senses. From the bustling streets of Hanoi to the lantern-lit lanes of Hoi An and the floating markets of the Mekong Delta, this S-shaped nation is an adventure from north to south.",
    longDescription:
      "Vietnam is a country that grabs you by the senses and never lets go. The 1,600-km S-curve from Hanoi in the north to Ho Chi Minh City in the south traverses an astonishing range of landscapes, cultures, and cuisines. In the north, Ha Long Bay's 1,600 limestone karsts rise from emerald waters like a dragon's spine, and an overnight cruise through its misty grottoes is one of Southeast Asia's defining experiences. Sapa's terraced rice fields, carved by Hmong and Dao hillside communities over centuries, turn from vivid green in summer to golden amber before harvest.\n\nCentral Vietnam anchors the cultural heart. Hue, the former imperial capital, shelters the Citadel, ornate royal tombs, and a cuisine so refined it was created exclusively for the emperor. Hoi An, a UNESCO World Heritage town, is a living postcard of Japanese bridges, Chinese temples, French colonial shophouses, and hundreds of silk tailors who can turn your design into a custom suit overnight. The Thu Bon River, lit by hundreds of floating lanterns on full-moon nights, creates a scene of magical beauty.\n\nThe south delivers a different energy entirely. Ho Chi Minh City (Saigon) pulses with motorbike-laden streets, French colonial landmarks, rooftop bars, and the sobering Cu Chi Tunnels that tell the story of the Vietnam War from the other side. The Mekong Delta, a vast maze of rivers and canals, hosts floating markets where boats piled high with tropical fruit and flowers jostle for space at dawn. Vietnamese cuisine — from the steaming pho of Hanoi to the banh mi of Hoi An and the broken rice of Saigon — is increasingly recognised as one of the world's greatest, and eating your way through the country is a journey in itself.",
    heroImage: "/images/generated/vietnam-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540611025311-01df3cee54b5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "February to April & August to October",
    weather:
      "North Vietnam: cool winters (Nov–Mar), hot humid summers (May–Sep). Central: driest Feb–Aug. South: warm year-round at 25–35 °C, wettest May–Nov. The country's length means you can almost always find good weather somewhere.",
    startingPrice: 50000,
    highlights: [
      "Ha Long Bay Overnight Cruise",
      "Hoi An Lantern-Lit Old Town",
      "Sapa Rice Terrace Trekking",
      "Mekong Delta Floating Markets",
      "Cu Chi Tunnels, Ho Chi Minh City",
      "Hue Imperial Citadel",
    ],
    thingsToKnow: [
      "Indians need an e-Visa for Vietnam — apply online at least 5 business days before travel.",
      "Motorbike traffic is intense; cross the road slowly and steadily — drivers will go around you.",
      "Vietnamese dong comes in large denominations; double-check bills to avoid confusion between 50K and 500K notes.",
      "Hoi An tailors can make custom suits and dresses in 24 hours — allow time for a fitting and alterations.",
      "Street food is the best food — a bowl of pho on a plastic stool often beats a hotel restaurant.",
    ],
    popularExperiences: [
      {
        title: "Ha Long Bay Cruise",
        description:
          "Sail through thousands of limestone karsts, kayak into hidden caves, and sleep on the emerald waters.",
        icon: "🚢",
      },
      {
        title: "Hoi An Lantern Night",
        description:
          "Release a floating lantern on the Thu Bon River as hundreds of lights shimmer on the water.",
        icon: "🏮",
      },
      {
        title: "Sapa Valley Homestay Trek",
        description:
          "Hike through terraced rice fields and stay overnight with a Hmong family in the highlands.",
        icon: "🥾",
      },
      {
        title: "Saigon Street Food Tour",
        description:
          "Zip through the city on a motorbike tasting pho, banh mi, broken rice, and egg coffee.",
        icon: "🍜",
      },
    ],
    featured: false,
  },
  // ─── V9 Travels catalogue migration — new destinations ───
  {
    name: "Gujarat",
    slug: "gujarat",
    region: "West India",
    country: "India",
    category: "leisure",
    tagline: "The Vibrant Jewel of Western India",
    description:
      "From the white salt flats of the Rann of Kutch to the towering Statue of Unity and the lion sanctuaries of Gir, Gujarat offers a tapestry of wildlife, architecture, and culture unmatched in western India.",
    longDescription:
      "Gujarat is a state of staggering variety — the endless white desert of Kutch during the Rann Utsav, the world's tallest statue at Kevadia, the lions of Gir National Park (the last remaining wild population outside Africa), and the rich trading heritage of Ahmedabad's walled city.\n\nTravellers come for the vibrant folk culture and textile crafts — Patola silk from Patan, Bandhani tie-dye, and the embroidery of Kutchi artisans. The coastal belt offers Diu's Portuguese forts and pristine beaches. Spiritual seekers visit Somnath (one of the 12 Jyotirlingas), Dwarka (birthplace of Lord Krishna), and the Jain temples at Palitana.\n\nGujarati food is legendary — the thali spreads, farsan snacks, and dhoklas represent centuries of plant-based culinary tradition.",
    heroImage:
      "https://images.unsplash.com/photo-1609608700147-2ccfdebe05f5?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1609608700147-2ccfdebe05f5?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "November to February (Winter) — ideal for the Rann Utsav",
    weather:
      "Summers (Mar-Jun) are hot at 35-45°C. Winters (Nov-Feb) pleasant at 10-30°C. Monsoon (Jul-Sep) moderate.",
    startingPrice: 15000,
    highlights: [
      "White Rann of Kutch",
      "Statue of Unity",
      "Gir National Park Lions",
      "Somnath Jyotirlinga",
      "Dwarka Temple",
      "Ahmedabad Heritage Walk",
      "Rann Utsav",
    ],
    thingsToKnow: [
      "Best visited during November to February for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "White Rann of Kutch",
        description:
          "One of the signature experiences in Gujarat.",
        icon: "✨",
      },
      {
        title: "Statue of Unity",
        description:
          "Explore the living heritage of Gujarat with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Gir National Park Lions",
        description:
          "Taste the flavours of Gujarat — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Somnath Jyotirlinga",
        description:
          "A day-trip to the region's most memorable landscape.",
        icon: "🌄",
      },
    ],
    featured: false,
  },
  {
    name: "Maharashtra",
    slug: "maharashtra",
    region: "West India",
    country: "India",
    category: "leisure",
    tagline: "Forts, Beaches, Jyotirlingas, and Wildlife",
    description:
      "From the Ashtavinayak Ganesh pilgrimage to the Jyotirlingas of Trimbakeshwar, Bhimashankar, and Grishneshwar — Maharashtra is India's spiritual and historical heartland with Konkan beaches and Tadoba tigers.",
    longDescription:
      "Maharashtra is deeply religious and naturally varied. The Ashtavinayak circuit covers eight ancient Ganesh temples around Pune, considered obligatory for devout Maharashtrians. Three of the twelve Jyotirlingas — Bhimashankar, Trimbakeshwar (near Nashik), and Grishneshwar (at Ellora) — make the state a pilgrim's essential.\n\nFor wildlife, Tadoba-Andhari Tiger Reserve offers some of India's most reliable tiger sightings. The hill stations of Mahabaleshwar, Panchgani, and Matheran provide cool weekend retreats. The Konkan coast's Ganapatipule and Tarkarli beaches rival Goa without the crowds.\n\nShivaji's forts — Raigad, Sinhagad, Rajgad, and Pratapgad — crown hilltops across the state. Ajanta and Ellora caves near Aurangabad hold 2,000-year-old Buddhist, Hindu, and Jain rock-cut masterpieces recognised by UNESCO.",
    heroImage:
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "October to March",
    weather:
      "Mumbai/coast humid and warm year-round (25-33°C). Deccan plateau (Pune, Aurangabad) cooler (15-35°C). Monsoon (Jun-Sep) heavy, especially on the coast.",
    startingPrice: 12000,
    highlights: [
      "Ashtavinayak Darshan",
      "Ajanta & Ellora Caves",
      "Tadoba Tigers",
      "Ganapatipule Beach",
      "Tarkarli Water Sports",
      "Shivaji Forts",
      "Mahabaleshwar Hills",
    ],
    thingsToKnow: [
      "Best visited during October to March for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Ashtavinayak Darshan",
        description:
          "One of the signature experiences in Maharashtra.",
        icon: "✨",
      },
      {
        title: "Ajanta & Ellora Caves",
        description:
          "Explore the living heritage of Maharashtra with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Tadoba Tigers",
        description:
          "Taste the flavours of Maharashtra — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Ganapatipule Beach",
        description:
          "A day-trip to the region's most memorable landscape.",
        icon: "🌄",
      },
    ],
    featured: false,
  },
  {
    name: "Madhya Pradesh",
    slug: "madhya-pradesh",
    region: "West India",
    country: "India",
    category: "leisure",
    tagline: "The Heart of Incredible India",
    description:
      "Tigers of Kanha and Bandhavgarh, the erotic temples of Khajuraho, the spiritual city of Ujjain with its Jyotirlinga, and marble rocks of Bhedaghat — Madhya Pradesh is India's most underrated treasure.",
    longDescription:
      "Madhya Pradesh sits at the geographic heart of India and packs in more diversity than most entire countries. Kanha and Bandhavgarh National Parks offer India's best tiger sightings. Khajuraho's UNESCO-listed 10th-century temples are masterworks of sandstone erotic sculpture.\n\nUjjain is one of the seven holiest cities of Hinduism and home to the Mahakaleshwar Jyotirlinga — one of only 12 in the world. Omkareshwar (also a Jyotirlinga) sits on an island in the Narmada river shaped like the sacred syllable Om. Orchha's Mughal-era palaces perch dramatically over the Betwa river.\n\nOther gems include the marble cliffs of Bhedaghat, the Buddhist stupas of Sanchi (another UNESCO site), the colonial-era hill station of Pachmarhi, and Indore's famous street food scene centred around Sarafa Bazaar.",
    heroImage:
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "October to March",
    weather:
      "Summers (Apr-Jun) very hot at 35-45°C. Winters (Nov-Feb) cool at 5-25°C. Monsoon (Jul-Sep) moderate.",
    startingPrice: 13000,
    highlights: [
      "Kanha Tiger Reserve",
      "Khajuraho Temples",
      "Ujjain Mahakaleshwar",
      "Omkareshwar Jyotirlinga",
      "Sanchi Stupa",
      "Bhedaghat Marble Rocks",
      "Orchha Palaces",
    ],
    thingsToKnow: [
      "Best visited during October to March for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Kanha Tiger Reserve",
        description:
          "One of the signature experiences in Madhya Pradesh.",
        icon: "✨",
      },
      {
        title: "Khajuraho Temples",
        description:
          "Explore the living heritage of Madhya Pradesh with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Ujjain Mahakaleshwar",
        description:
          "Taste the flavours of Madhya Pradesh — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Omkareshwar Jyotirlinga",
        description:
          "A day-trip to the region's most memorable landscape.",
        icon: "🌄",
      },
    ],
    featured: false,
  },
  {
    name: "Singapore",
    slug: "singapore",
    region: "International",
    country: "Singapore",
    category: "leisure",
    tagline: "Garden City of the Future",
    description:
      "Gardens by the Bay's Supertrees, Marina Bay Sands' infinity pool, Sentosa's Universal Studios, hawker-centre food, and the world's most efficient city — Singapore packs a holiday into 728 km².",
    longDescription:
      "Singapore is a city-state that runs like a Swiss watch — clean, safe, multicultural, and relentlessly forward-looking. Yet underneath its future-facing skyline lies centuries of trading history in Chinatown, Little India, and Kampong Glam.\n\nMarina Bay's trinity — Gardens by the Bay's Supertree Grove, the ArtScience Museum, and Marina Bay Sands with its iconic rooftop infinity pool — defines the modern skyline. Sentosa island offers Universal Studios, the S.E.A. Aquarium, and beaches. The Singapore Zoo and Night Safari are consistently ranked among the world's best.\n\nFood is a national obsession — hawker centres (Maxwell, Lau Pa Sat, Newton) serve Michelin-recognised chicken rice, laksa, satay, and char kway teow for a few dollars. Orchard Road is Asia's premier shopping strip.",
    heroImage:
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "February to April",
    weather:
      "Tropical and humid year-round (25-31°C). Short afternoon rain common. No seasons in the Indian sense.",
    startingPrice: 55000,
    highlights: [
      "Gardens by the Bay",
      "Marina Bay Sands Infinity Pool",
      "Sentosa & Universal Studios",
      "Hawker Centre Food",
      "Singapore Zoo & Night Safari",
      "Orchard Road Shopping",
      "Chinatown & Little India",
    ],
    thingsToKnow: [
      "Best visited during February to April for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Gardens by the Bay",
        description:
          "One of the signature experiences in Singapore.",
        icon: "✨",
      },
      {
        title: "Marina Bay Sands Infinity Pool",
        description:
          "Explore the living heritage of Singapore with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Sentosa & Universal Studios",
        description:
          "Taste the flavours of Singapore — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Hawker Centre Food",
        description:
          "A day-trip to the region's most memorable landscape.",
        icon: "🌄",
      },
    ],
    featured: false,
  },
  {
    name: "Sri Lanka",
    slug: "sri-lanka",
    region: "International",
    country: "Sri Lanka",
    category: "leisure",
    tagline: "Pearl of the Indian Ocean",
    description:
      "Ancient rock fortresses like Sigiriya, tea-clad hills of Nuwara Eliya, wild leopards at Yala, surf breaks at Arugam Bay, and warm beaches at Bentota — Sri Lanka is a full-spectrum tropical gem.",
    longDescription:
      "Sri Lanka packs eight UNESCO World Heritage sites, 26 national parks, and a thousand beaches into a teardrop-shaped island you can drive across in a day. The cultural triangle — Sigiriya's 5th-century rock fortress, Dambulla's cave temples, Polonnaruwa and Anuradhapura's ancient ruins, and Kandy's Temple of the Tooth — covers 2,500 years of Buddhist and royal history.\n\nThe hill country around Nuwara Eliya and Ella is Sri Lanka's tea heartland — ride the famous train between Kandy and Ella for some of the world's most scenic rail views. The south coast offers beaches for every mood: Unawatuna and Mirissa for swimming, Weligama and Hikkaduwa for surfing, Bentota for resorts.\n\nWildlife is exceptional — Yala National Park has the highest leopard density in the world, Udawalawe is excellent for elephants, and whales are spotted off Mirissa from November to April.",
    heroImage:
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "December to March (west/south), April to September (east)",
    weather:
      "Tropical. Coast warm year-round (27-32°C). Hill country cooler (15-25°C). Two monsoons: southwest May-Sep, northeast Oct-Jan.",
    startingPrice: 38000,
    highlights: [
      "Sigiriya Rock Fortress",
      "Kandy Temple of the Tooth",
      "Nuwara Eliya Tea Country",
      "Ella Rock Hike",
      "Yala Leopards",
      "Galle Dutch Fort",
      "Bentota Beach",
    ],
    thingsToKnow: [
      "Best visited during December to March for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Sigiriya Rock Fortress",
        description:
          "One of the signature experiences in Sri Lanka.",
        icon: "✨",
      },
      {
        title: "Kandy Temple of the Tooth",
        description:
          "Explore the living heritage of Sri Lanka with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Nuwara Eliya Tea Country",
        description:
          "Taste the flavours of Sri Lanka — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Ella Rock Hike",
        description:
          "A day-trip to the region's most memorable landscape.",
        icon: "🌄",
      },
    ],
    featured: false,
  },
  {
    name: "Hong Kong",
    slug: "hong-kong",
    region: "International",
    country: "Hong Kong SAR",
    category: "leisure",
    tagline: "Skyscrapers, Dim Sum, and Disneyland",
    description:
      "Victoria Peak's skyline views, Star Ferry rides across the harbour, Hong Kong Disneyland, Ocean Park's panda reserve, and dim sum breakfast in Sham Shui Po — a compact, electric city.",
    longDescription:
      "Hong Kong is a special administrative region of China with a personality all its own — ex-British colonial architecture meeting Cantonese tradition meeting vertical modernity. Victoria Peak's tram delivers the most photographed skyline in Asia. The Star Ferry between Central and Tsim Sha Tsui remains one of the world's most affordable great city experiences.\n\nHong Kong Disneyland on Lantau Island — smaller than its American cousins but uniquely charming — is often combined with a trip to Macau (the Las Vegas of Asia) and Ngong Ping's Big Buddha statue. Ocean Park offers pandas and thrill rides. Shoppers love Central's luxury boutiques and Temple Street Night Market.\n\nFood is an obsession — Michelin-starred dim sum at Tim Ho Wan, egg tarts at Tai Cheong Bakery, roast goose, cha chaan teng diners, and milk tea by the bucket. The outlying islands (Cheung Chau, Lamma) offer car-free beach days.",
    heroImage:
      "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "October to December",
    weather:
      "Subtropical. Cool-dry Nov-Mar (15-25°C). Hot-humid May-Sep (28-33°C), typhoon season Jul-Sep.",
    startingPrice: 65000,
    highlights: [
      "Victoria Peak Skyline",
      "Hong Kong Disneyland",
      "Star Ferry Harbour Ride",
      "Ngong Ping Big Buddha",
      "Ocean Park",
      "Dim Sum Food Trail",
      "Macau Day Trip",
    ],
    thingsToKnow: [
      "Best visited during October to December for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Victoria Peak Skyline",
        description:
          "One of the signature experiences in Hong Kong.",
        icon: "✨",
      },
      {
        title: "Hong Kong Disneyland",
        description:
          "Explore the living heritage of Hong Kong with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Star Ferry Harbour Ride",
        description:
          "Taste the flavours of Hong Kong — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Ngong Ping Big Buddha",
        description:
          "A day-trip to the region's most memorable landscape.",
        icon: "🌄",
      },
    ],
    featured: false,
  },
  {
    name: "Azerbaijan",
    slug: "azerbaijan",
    region: "International",
    country: "Azerbaijan",
    category: "leisure",
    tagline: "Fire Temples, Caspian Coast & Ultra-Modern Baku",
    description:
      "Baku's flame towers, Gobustan's ancient petroglyphs, Absheron's fire temples, the mountain village of Lahij, and the Caspian Sea — Azerbaijan is a surprising East-meets-West gem.",
    longDescription:
      "Azerbaijan sits at the crossroads of Europe and Asia on the western shore of the Caspian Sea. Its capital Baku is a city of contrasts — the UNESCO-listed medieval Old City (Icheri Sheher) sits just blocks from the ultra-modern Flame Towers and Heydar Aliyev Center (designed by Zaha Hadid).\n\nDay trips from Baku go to Gobustan — a UNESCO site with 6,000-year-old petroglyphs and nearby mud volcanoes (Azerbaijan has more than half the world's total). Yanar Dag, a hillside that has been on fire for over 60 years thanks to natural gas seeps, is a short drive north. The Ateshgah Fire Temple reminds of the country's pre-Islamic Zoroastrian heritage.\n\nThe mountain region around Sheki and Lahij offers Caucasus scenery, coppersmith villages, and traditional baklava. Azerbaijani cuisine — plov, dolma, and qutabs — is a highlight.",
    heroImage:
      "https://images.unsplash.com/photo-1601130884591-c7dd5a45c3c0?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1601130884591-c7dd5a45c3c0?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "April to June, September to October",
    weather:
      "Continental. Baku mild winters (5-10°C), warm summers (25-32°C). Mountains cooler.",
    startingPrice: 70000,
    highlights: [
      "Baku Old City (Icheri Sheher)",
      "Flame Towers & Heydar Aliyev Center",
      "Gobustan Petroglyphs",
      "Yanar Dag Burning Hillside",
      "Ateshgah Fire Temple",
      "Sheki Khan Palace",
      "Caspian Sea Boulevard",
    ],
    thingsToKnow: [
      "Best visited during April to June, September to October for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Baku Old City (Icheri Sheher)",
        description:
          "One of the signature experiences in Azerbaijan.",
        icon: "✨",
      },
      {
        title: "Flame Towers & Heydar Aliyev Center",
        description:
          "Explore the living heritage of Azerbaijan with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Gobustan Petroglyphs",
        description:
          "Taste the flavours of Azerbaijan — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Yanar Dag Burning Hillside",
        description:
          "A day-trip to the region's most memorable landscape.",
        icon: "🌄",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── Bihar ──────────────────────── */
  {
    name: "Bihar",
    slug: "bihar",
    region: "North India",
    country: "India",
    category: "educational",
    tagline: "The Cradle of Indian Civilisation",
    description:
      "Bodh Gaya, where Buddha attained enlightenment under the Bodhi tree; Nalanda, the world's earliest residential university; Rajgir's hot springs and Jain temples — Bihar is where Indian history, philosophy and spirituality all begin.",
    longDescription:
      "Bihar may be one of India's quietest tourist circuits, but it is one of the most consequential in world history. Bodh Gaya is the most sacred site in Buddhism — the Mahabodhi Temple complex, a UNESCO World Heritage Site, marks the exact spot where Prince Siddhartha became the Buddha. The descendant Bodhi tree still stands in the temple courtyard, and pilgrims from Sri Lanka, Thailand, Japan, Bhutan, and Myanmar fill the small town year-round.\n\nNalanda, just 90 km away, was the world's first great residential university (5th–12th century CE), with 10,000 students and 2,000 teachers at its peak. The vast brick ruins, now a UNESCO site, stretch over 23 hectares. Nearby Rajgir was the capital of the Magadha kingdom — both the Buddha and Mahavira lived and taught here, and its surrounding hills are dotted with Buddhist stupas, Jain temples, and hot springs.\n\nVaishali — believed to be the world's first republic — and Patna (ancient Pataliputra, capital of the Mauryan empire under Ashoka) complete the picture. For Sikh pilgrims, Takht Sri Patna Sahib marks the birthplace of Guru Gobind Singh. A Buddhist Circuit tour through Bihar is one of the most spiritually rewarding journeys in India.",
    heroImage: "https://images.unsplash.com/photo-1614366833937-30b3a4a5f97c?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1614366833937-30b3a4a5f97c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547222530-c01a0d4ef0bd?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to March",
    weather:
      "Winters (Oct–Feb) are cool and dry with 10–25 °C — the ideal time. Summers (Mar–Jun) are very hot, often crossing 40 °C. Monsoon (Jul–Sep) brings heavy rain and humidity.",
    startingPrice: 15000,
    highlights: [
      "Mahabodhi Temple at Bodh Gaya (UNESCO)",
      "Nalanda University Ruins (UNESCO)",
      "Rajgir Hot Springs & Vishwa Shanti Stupa",
      "Vaishali — World's First Republic",
      "Patna Sahib Gurudwara",
      "Vikramshila Buddhist Monastery",
    ],
    thingsToKnow: [
      "The Buddhist Circuit pilgrimage flows naturally over 5–7 days; allow at least 2 nights at Bodh Gaya.",
      "Bihar is largely a dry state — alcohol is prohibited and enforcement is strict.",
      "Patna airport has good connectivity to Delhi, Mumbai, Kolkata; Gaya airport receives international Buddhist pilgrim flights.",
      "Modest dress is expected at all temple complexes; remove footwear before entry.",
      "Litti chokha — the traditional roasted wheat-ball dish — is a Bihar must-try.",
    ],
    popularExperiences: [
      {
        title: "Meditation Under the Bodhi Tree",
        description:
          "Sit in silent meditation at the exact spot where the Buddha attained enlightenment, surrounded by pilgrims chanting in dozens of languages.",
        icon: "🙏",
      },
      {
        title: "Nalanda University Walk",
        description:
          "Walk the brick avenues of the world's earliest university, where Xuanzang studied for 7 years in the 7th century.",
        icon: "🏛️",
      },
      {
        title: "Rajgir Ropeway to Vishwa Shanti Stupa",
        description:
          "Single-seat chairlift up Ratnagiri Hill to the white Peace Pagoda — sweeping views across the Magadha hills.",
        icon: "🚠",
      },
      {
        title: "Evening Aarti at the Mahabodhi Temple",
        description:
          "Witness the gilded inner sanctum lit by hundreds of butter lamps as monks chant the Heart Sutra.",
        icon: "🕯️",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── Chhattisgarh ──────────────────────── */
  {
    name: "Chhattisgarh",
    slug: "chhattisgarh",
    region: "West India",
    country: "India",
    category: "adventure",
    tagline: "Tribal Heartland of Central India",
    description:
      "Dense sal forests, India's broadest waterfall at Chitrakote, the limestone caves of Kutumsar, and 32 indigenous tribes preserving ancient ways of life — Chhattisgarh is India's most under-discovered nature and culture destination.",
    longDescription:
      "Chhattisgarh — carved out of Madhya Pradesh in 2000 — remains one of India's most pristine wildernesses. The state is 44% forest cover, supports tigers in Indravati and Achanakmar reserves, and is home to 32 tribal groups whose haats (weekly markets), masks, and dances are still entirely living traditions.\n\nChitrakote Falls — often called the 'Niagara of India' — is the country's widest waterfall, particularly spectacular during monsoon when the Indravati river thunders over a 300-metre horseshoe drop. Nearby, the limestone Kutumsar Caves descend 35 metres underground into chambers filled with stalactites and blind cave fish. Tirathgarh Falls cascades down five tiers through deep sal forest. Bastar's tribal villages — Jagdalpur, Kanger, Kondagaon — produce extraordinary metal-cast Dhokra art (a 4,000-year-old technique).\n\nRaipur, the modern capital, gives access to the wildlife reserves and to Sirpur — a 5th-century Buddhist site with rock-cut temples. For those seeking authentic, uncrowded tribal India and waterfalls outside the tourist machine, Chhattisgarh is unmatched.",
    heroImage: "https://images.unsplash.com/photo-1591105575633-922c8897af9e?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1591105575633-922c8897af9e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604608672516-f1b9b1d1f3b8?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to March (waterfalls best Aug-Oct)",
    weather:
      "Winters (Oct-Feb) are pleasant at 15-28 °C. Summers (Mar-Jun) very hot 35-45 °C. Monsoon (Jul-Sep) brings the waterfalls to peak flow.",
    startingPrice: 18000,
    highlights: [
      "Chitrakote Falls (India's widest)",
      "Kutumsar Limestone Caves",
      "Tirathgarh Five-Tiered Falls",
      "Bastar Tribal Villages",
      "Sirpur Buddhist Ruins",
      "Kanger Valley National Park",
    ],
    thingsToKnow: [
      "Inner regions of Bastar are politically sensitive — travel with a registered operator and avoid unscheduled stops.",
      "Mobile network coverage is limited inside Kanger Valley and tribal interiors.",
      "Hire a local Gondi-speaking guide for tribal village visits — it transforms the experience.",
      "Photography of tribal communities requires consent; many haats charge a nominal camera fee.",
      "Try the traditional bamboo chicken, Bhajia rice, and mahua-based drinks during village stays.",
    ],
    popularExperiences: [
      {
        title: "Chitrakote Falls Boat Ride",
        description:
          "Take a small motorboat to the base of the 300-metre horseshoe falls — close enough to feel the spray.",
        icon: "💦",
      },
      {
        title: "Bastar Haat Market Walk",
        description:
          "Visit a weekly tribal market where Muria, Maria and Halba communities trade rice beer, terracotta, and forest produce.",
        icon: "🛍️",
      },
      {
        title: "Kutumsar Cave Exploration",
        description:
          "Descend 35 metres into limestone chambers carved over millions of years by an underground stream.",
        icon: "🦇",
      },
      {
        title: "Dhokra Metalwork Workshop",
        description:
          "Watch artisans in Kondagaon cast bronze figures using the 4,000-year-old lost-wax technique.",
        icon: "⚒️",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── West Bengal ──────────────────────── */
  {
    name: "West Bengal",
    slug: "west-bengal",
    region: "Northeast India",
    country: "India",
    category: "leisure",
    tagline: "From Tea Gardens to Tiger Mangroves",
    description:
      "Darjeeling's misty tea slopes, Kalimpong's old-world bungalows, the Dooars' wildlife reserves, Sundarbans' Royal Bengal tigers, and Kolkata's literary lanes — West Bengal packs Himalayas, forests, deltas and high culture into one state.",
    longDescription:
      "West Bengal is India's most culturally dense state — home of Tagore, Ray, the Bengali Renaissance, and the country's intellectual heart. Kolkata, the City of Joy, juxtaposes British-era grandeur (Victoria Memorial, Howrah Bridge) with the chaotic colour of its bazaars, the spiritual intensity of Kalighat Kali Temple, and the literary cafés of College Street.\n\nNorth Bengal is a different world entirely — the toy-train towns of Darjeeling and Kalimpong perch on the lower Himalayas with stunning Kanchenjunga views, working tea estates, and old planters' bungalows now run as homestays. The lesser-visited Dooars region (Buxa, Jaldapara, Gorumara national parks) shelters one-horned rhinos, elephants, and over 240 bird species. Tinchuley, Lamahatta, and Chatakpur are offbeat tea-garden villages where you can stay with farming families and walk through cloud forests at dawn.\n\nSouth, the Sundarbans — a UNESCO-listed mangrove delta — is home to the elusive Royal Bengal Tiger, saltwater crocodiles, and the world's most extensive mangrove ecosystem. Cruises through the narrow tidal creeks are a haunting reminder of how forest, river, and sea can blur into one. From Himalayas to the Bay of Bengal, no Indian state covers as much ground as West Bengal.",
    heroImage: "https://images.unsplash.com/photo-1558431382-27e303142255?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1558431382-27e303142255?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1623709486403-2a4ce5fe2fa1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574722772515-1cf04a3a6464?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to April (Sundarbans Nov-Mar)",
    weather:
      "North Bengal: pleasant year-round in the hills, 5–20 °C; monsoon (Jun-Sep) brings landslides. Kolkata & Sundarbans: hot summers (35-40 °C), cool winters (12-25 °C), humid monsoon.",
    startingPrice: 18000,
    highlights: [
      "Darjeeling Toy Train (UNESCO)",
      "Tiger Hill Sunrise",
      "Sundarbans Mangrove Cruise",
      "Buxa, Jaldapara, Gorumara Dooars Safaris",
      "Victoria Memorial, Kolkata",
      "Tinchuley & Lamahatta Tea Villages",
    ],
    thingsToKnow: [
      "Sundarbans requires forest department permits — easiest via a registered tour operator out of Kolkata.",
      "October to early November in Kolkata is Durga Puja — the city's biggest festival, immersive and unforgettable.",
      "North Bengal hills can have political bandhs (strikes) in summer; check before travel.",
      "Try authentic Bengali cuisine — shorshe ilish (mustard hilsa), kosha mangsho (mutton curry), mishti doi.",
      "The Dooars wildlife reserves close monsoon (mid-Jun to mid-Sep) — plan visits Oct-May.",
    ],
    popularExperiences: [
      {
        title: "Sundarbans Boat Safari",
        description:
          "Three days on a motor launch through tidal mangrove creeks, watching for tigers swimming between islands.",
        icon: "🐅",
      },
      {
        title: "Darjeeling Toy Train Joy Ride",
        description:
          "Steam-powered 1881-built train loops through Batasia and Ghum on the UNESCO-listed Himalayan Railway.",
        icon: "🚂",
      },
      {
        title: "Tea Garden Stay at Tinchuley",
        description:
          "Wake up to cloud-wrapped tea slopes and Kanchenjunga in the distance from a planter's bungalow homestay.",
        icon: "🍵",
      },
      {
        title: "Durga Puja Pandal Hopping",
        description:
          "Walk through Kolkata's most elaborate neighbourhood pandals during the city's biggest festival in October.",
        icon: "🎭",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── Telangana ──────────────────────── */
  {
    name: "Telangana",
    slug: "telangana",
    region: "South India",
    country: "India",
    category: "leisure",
    tagline: "From Nizami Palaces to Cave Temples",
    description:
      "Hyderabad's Charminar and biryani, Srisailam's Mallikarjuna Jyotirlinga, the Somasila pilgrim cruise, Warangal's Kakatiya temples, and the rugged Nallamala forest — Telangana blends Nizami heritage with deep South Indian temple traditions.",
    longDescription:
      "Telangana, India's youngest state (formed in 2014), is anchored by Hyderabad's Nizami grandeur but extends far beyond the capital. The state is dotted with rock-cut temples, Kakatiya-era stepwells, and the Nallamala forest range — one of the oldest in India.\n\nSrisailam, perched above the Krishna river in the Nallamala hills, is home to the Mallikarjuna Jyotirlinga — one of Hinduism's 12 holiest Shiva shrines — and the Bhramaramba Shakti Peetha temple right beside it, a rare combined Shiva-Shakti pilgrimage. The Krishna river here is dammed into the vast Srisailam reservoir, making the site uniquely scenic. Just downstream, Somasila reservoir offers cruise pilgrimages along its quiet waters past forested banks.\n\nWarangal preserves the 12th-century Kakatiya dynasty's masterpieces — the Thousand Pillar Temple, the Warangal Fort gateways, and the Ramappa Temple (a UNESCO World Heritage Site for its 'floating brick' construction). Bhongir's monolithic rock fort, the Bhadrachalam Sita Ramachandraswamy Temple, and Kuntala Falls in Adilabad complete a state with deep historical, spiritual and natural diversity that goes far past the Charminar.",
    heroImage: "https://images.unsplash.com/photo-1672997317502-9dc18f4d8a6f?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1672997317502-9dc18f4d8a6f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583309219338-a582f1f9ca6b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567261334392-04abf6c2c4ff?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545158539-4e6d35bb84a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572805156329-b9b81e64aab9?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to February",
    weather:
      "Winters (Oct-Feb) pleasant at 15-28 °C. Summers (Mar-Jun) hot, often above 40 °C. Short monsoon (Jul-Sep) cools things down with intermittent rain.",
    startingPrice: 15000,
    highlights: [
      "Charminar & Hyderabad Old City",
      "Golconda Fort & Qutb Shahi Tombs",
      "Srisailam Mallikarjuna Jyotirlinga",
      "Somasila Pilgrim Cruise",
      "Warangal Kakatiya Temples (UNESCO Ramappa)",
      "Bhongir Rock Fort",
    ],
    thingsToKnow: [
      "Srisailam temple is busy during Maha Shivaratri (Feb-Mar) and Kartik Purnima; book well in advance.",
      "Somasila cruises run select days only — check schedule with operators in Hyderabad.",
      "The Nallamala forest road between Hyderabad and Srisailam is closed after sunset due to wildlife.",
      "Hyderabad biryani is the state's signature dish — Paradise, Bawarchi, Shadab are local institutions.",
      "Many Telangana temples require traditional dress — dhoti for men, sari for women; lungis available on rent.",
    ],
    popularExperiences: [
      {
        title: "Charminar Old City Food Walk",
        description:
          "Eat your way through Hyderabad's old quarter — Irani chai at Nimrah, haleem at Pista House, biryani at Shadab.",
        icon: "🍛",
      },
      {
        title: "Mallikarjuna Jyotirlinga Darshan",
        description:
          "Pray at one of Hinduism's 12 holiest Shiva shrines, set above the Krishna river in the Nallamala hills.",
        icon: "🕉️",
      },
      {
        title: "Somasila Cruise",
        description:
          "Quiet motorboat journey along the Krishna river through forested banks of the Nallamala reserve.",
        icon: "⛵",
      },
      {
        title: "Ramappa Temple Visit",
        description:
          "UNESCO World Heritage Kakatiya temple famed for sandstone carvings and floating-brick roof construction.",
        icon: "🛕",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── Odisha ──────────────────────── */
  {
    name: "Odisha",
    slug: "odisha",
    region: "Northeast India",
    country: "India",
    category: "leisure",
    tagline: "Temple Architecture & Beach Coastline",
    description:
      "The 13th-century Sun Temple at Konark, Puri's Jagannath Dham, Bhubaneswar's 600 ancient temples, Chilika's flamingo lagoon, and tribal Koraput — Odisha is India's most underrated coastal temple state.",
    longDescription:
      "Odisha quietly holds some of India's most extraordinary architectural and natural treasures. Bhubaneswar, the capital, has been called the 'Temple City of India' — over 600 ancient temples spanning a thousand years, with the 11th-century Lingaraj Temple as its anchor. The Mukteshwar, Rajarani and Brahmeshwar temples nearby are masterpieces of Kalinga-style sandstone carving.\n\nKonark's 13th-century Sun Temple — a UNESCO World Heritage Site — is conceived as a colossal chariot of the sun god Surya, with 24 intricately carved wheels and seven horses pulling it across the sky. Puri, just down the coast, houses one of Hinduism's four char dhams — the Jagannath Dham — and hosts the annual Rath Yatra, where massive wooden chariots are pulled through the streets by hundreds of thousands of devotees.\n\nChilika Lake — Asia's largest brackish water lagoon — hosts over a million migratory birds in winter, including flamingos. Gopalpur's quiet beaches contrast with the bustle of Puri. Inland, the tribal Koraput and Kotpad regions are home to over 60 indigenous groups producing some of India's finest natural-dye textiles. With Buddhist Lalitgiri and Ratnagiri ruins and the rugged Eastern Ghats hill stations of Daringbadi (the 'Kashmir of Odisha'), the state delivers history, wildlife, beaches and culture in equal measure.",
    heroImage: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565017228812-9f4b65fb0c54?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563492065-1a5e4a4e8b30?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to March",
    weather:
      "Winters (Oct-Feb) pleasant and dry, 15-28 °C — ideal. Summers (Mar-Jun) hot and humid 30-40 °C. Monsoon (Jun-Sep) brings cyclones and heavy rain — most of inland Odisha is closed to tourism.",
    startingPrice: 22000,
    highlights: [
      "Konark Sun Temple (UNESCO)",
      "Jagannath Dham Puri",
      "Lingaraj & Mukteshwar Temples Bhubaneswar",
      "Chilika Lake Bird Sanctuary",
      "Gopalpur-on-Sea Beach",
      "Daringbadi Hill Station",
    ],
    thingsToKnow: [
      "Non-Hindus cannot enter the inner Jagannath Temple at Puri — viewing is possible from the rooftop of the Raghunandan Library.",
      "Rath Yatra (June-July) is Puri's biggest festival — crowds are enormous; book hotels 6+ months ahead.",
      "Tropical cyclones occasionally hit the Odisha coast in October-November; track weather before coastal travel.",
      "Pattachitra paintings from Raghurajpur make exceptional souvenirs — meet the artists at the heritage village.",
      "Try Odia thali — dahi pakhal (curd rice), chhena poda (caramelised cottage cheese cake), and Macha besara (mustard fish curry).",
    ],
    popularExperiences: [
      {
        title: "Sunrise at Konark Sun Temple",
        description:
          "Walk through the 13th-century stone chariot of the sun god as the first rays light up the carved wheels.",
        icon: "🌅",
      },
      {
        title: "Chilika Lake Dolphin Cruise",
        description:
          "Boat ride to spot the resident Irrawaddy dolphins and over a million migratory birds in winter.",
        icon: "🦩",
      },
      {
        title: "Raghurajpur Pattachitra Village",
        description:
          "Visit the heritage crafts village where every household practises the traditional palm-leaf and silk painting.",
        icon: "🎨",
      },
      {
        title: "Bhubaneswar Temple Trail",
        description:
          "Walking tour through 600 sandstone temples spanning a thousand years of Kalinga architecture.",
        icon: "🛕",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── Tamil Nadu ──────────────────────── */
  {
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    region: "South India",
    country: "India",
    category: "educational",
    tagline: "Temple Towns, Hill Stations & a Three-Sea Cape",
    description:
      "Madurai's towering Meenakshi temple, Rameswaram's island shrine, the sunrise-and-sunset cape at Kanyakumari, the misty hill stations of Ooty and Kodaikanal, French-quarter Pondicherry and Chennai's Marina Beach — Tamil Nadu is the deepest, most living temple culture in India.",
    longDescription:
      "Tamil Nadu holds India's oldest continuous civilisation and its grandest temple architecture. Madurai — over 2,500 years old — is anchored by the Meenakshi Amman Temple, a riot of 14 gopuram towers covered in thousands of painted sculptures, with a nightly ceremony carrying the god to the goddess's chamber. South-east, the holy island of Rameswaram holds the Ramanathaswamy Temple (one of the 12 Jyotirlingas) with the longest temple corridor in India, and the haunting ghost town of Dhanushkodi at the very tip of Pamban Island.\n\nAt Kanyakumari, the subcontinent ends — three seas meet, and you can watch the sun rise and set over the ocean from the same spot, with the Vivekananda Rock Memorial and the 133-foot Thiruvalluvar statue offshore. Inland, the Western Ghats lift into the cool hill stations of Ooty — the 'Queen of Hill Stations' with its botanical gardens and toy train — and Kodaikanal, the 'Princess of Hill Stations', set around a star-shaped lake.\n\nThe coast tells a different story. Pondicherry preserves a French Quarter of mustard-yellow villas, boulevards and seaside cafés, alongside the experimental township of Auroville. Chennai, the state capital, balances the colonial Fort St. George, the 12th-century Kapaleeshwarar Temple and the long sweep of Marina Beach. Tamil Nadu rewards the traveller who wants culture with depth — temples that have never stopped functioning, and hills and coastline that frame them.",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545158539-4e6d35bb84a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to March",
    weather:
      "Winters (Oct-Mar) are pleasant on the plains at 20-30 °C — the ideal time. Summers (Apr-Jun) are hot and humid. The hill stations of Ooty and Kodaikanal stay cool (10-20 °C) year-round.",
    startingPrice: 16000,
    highlights: [
      "Meenakshi Amman Temple, Madurai",
      "Ramanathaswamy Temple & Dhanushkodi, Rameswaram",
      "Kanyakumari — confluence of three seas",
      "Ooty — Queen of Hill Stations",
      "Kodaikanal — Princess of Hill Stations",
      "Pondicherry French Quarter & Auroville",
    ],
    thingsToKnow: [
      "Temple dress codes are strict — men often need a dhoti and women a sari or salwar; carry modest clothing.",
      "Non-Hindus may have restricted access to the inner sanctum of some temples.",
      "The Ooty and Kodaikanal hill stations need warm layers even in summer evenings.",
      "Tamil filter coffee, dosa, Chettinad cuisine and Madurai's jigarthanda are essential tastes.",
      "Carry the Pamban bridge in your plan — the rail and road bridge to Rameswaram island is a sight in itself.",
    ],
    popularExperiences: [
      {
        title: "Meenakshi Temple Night Ceremony",
        description:
          "Witness the nightly palki ceremony carrying Lord Sundareswarar to Goddess Meenakshi's chamber.",
        icon: "🛕",
      },
      {
        title: "Kanyakumari Sunrise & Sunset",
        description:
          "Watch both the sunrise and sunset over the ocean from the southern tip of the Indian peninsula.",
        icon: "🌅",
      },
      {
        title: "Ooty Toy Train Ride",
        description:
          "Ride the UNESCO-listed Nilgiri Mountain Railway through tea slopes and eucalyptus forest.",
        icon: "🚂",
      },
      {
        title: "Pondicherry French Quarter Walk",
        description:
          "Stroll the mustard-yellow colonial villas, seaside promenade and French cafés of White Town.",
        icon: "🏘️",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── Lakshadweep ──────────────────────── */
  {
    name: "Lakshadweep",
    slug: "lakshadweep",
    region: "South India",
    country: "India",
    category: "leisure",
    tagline: "India's Coral Island Paradise",
    description:
      "36 coral islands scattered across the Arabian Sea — turquoise lagoons, white-sand atolls, world-class scuba diving, and a slower pace of life than anywhere else in India. Permit-controlled, blissfully uncrowded.",
    longDescription:
      "Lakshadweep is India's smallest Union Territory and its quietest beach destination — 36 coral islands, only 10 inhabited, all of them ringed by translucent lagoons and protected coral reefs. The gateway is Agatti, the only island with an airstrip; from there, ships and speedboats fan out to Bangaram (the luxury resort island), Kadmat (the diving hub), Kavaratti (the administrative capital), and Minicoy (the southernmost, with a distinct Maldivian-Mahl culture).\n\nWhat makes Lakshadweep unlike Maldives or Andaman: permits are mandatory and tightly controlled, the reefs are still in pristine condition, alcohol is restricted (it is a dry territory outside Bangaram), and the experience is genuinely off-grid. There are no rooftop bars, no malls, no busy harbours — just lagoons that grade from turquoise to deep blue, dhonis returning at sunset, and PADI dive instructors who have spent decades on the same reef wall.\n\nMost visitors come for the watersports — scuba diving over 5,000-year-old coral, snorkeling with reef sharks and turtles, glass-bottom boat rides through the lagoon, kayaking at dawn — and stay for the silence. A typical 6-night trip combines an arrival/departure stop at Agatti with extended stays at Bangaram and/or Kadmat. With both Vembanad and Kerala backwaters as the natural pre/post-trip pairing, Lakshadweep is the quiet bookend to an Indian beach holiday.",
    heroImage: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to March",
    weather:
      "Tropical, 25-32 °C year-round. Winter (Oct-Mar) is dry, calm seas and best for diving. Monsoon (May-Sep) closes most island operations and inter-island ships.",
    startingPrice: 48000,
    highlights: [
      "Bangaram Atoll",
      "Kadmat Diving",
      "Agatti Lagoon",
      "Kavaratti Marine Aquarium",
      "Minicoy Lighthouse",
      "Scuba & PADI Certification",
    ],
    thingsToKnow: [
      "Entry permits are mandatory for all visitors (Indian and foreign) — TravelSense arranges these as part of the package.",
      "Foreign nationals can currently visit only Bangaram, Agatti and Kadmat.",
      "Lakshadweep is a dry territory; alcohol is permitted only at the licensed Bangaram resort.",
      "Inter-island travel is by ship or speedboat — sea conditions can shift schedules; build flexibility into your dates.",
      "Cash and offline maps are essential — connectivity is patchy, ATMs are limited to Kavaratti, Agatti and Minicoy.",
    ],
    popularExperiences: [
      {
        title: "Scuba Diving at Kadmat",
        description:
          "PADI Discover Scuba or full Open Water certification at one of India's best dive sites, over coral that pre-dates the pyramids.",
        icon: "🤿",
      },
      {
        title: "Bangaram Sunset Sailing",
        description:
          "Sail a traditional dhoni across the Bangaram lagoon at golden hour, with the chance to spot reef sharks below the keel.",
        icon: "⛵",
      },
      {
        title: "Glass-Bottom Boat over Coral",
        description:
          "Drift over the reef in a glass-bottom boat — watch parrotfish, octopus and the occasional sea turtle without getting wet.",
        icon: "🐢",
      },
      {
        title: "Kayaking at Dawn in Agatti Lagoon",
        description:
          "Paddle the still, translucent lagoon as the sun comes up and the islanders set out their fishing dhonis.",
        icon: "🛶",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── Malaysia ──────────────────────── */
  {
    name: "Malaysia",
    slug: "malaysia",
    region: "International",
    country: "Malaysia",
    category: "leisure",
    tagline: "Twin Towers, Tropical Islands & Penang Street Food",
    description:
      "From the gleaming Petronas Twin Towers of Kuala Lumpur to the UNESCO heritage streets of Georgetown Penang and the white-sand cable-car beaches of Langkawi — Malaysia is Southeast Asia's most balanced multi-culture, multi-island destination.",
    longDescription:
      "Malaysia packs three distinct holidays into one trip. Kuala Lumpur is a cosmopolitan capital where the 452-metre Petronas Twin Towers (the world's tallest twin buildings until 2004) anchor a skyline of glass and steel — Sky Bridge views, Suria KLCC shopping, and Jalan Alor street-food nights are the must-do trio. Batu Caves and the Genting Highlands cable car make for great day trips from KL.\n\nPenang's Georgetown — a UNESCO World Heritage city — is the cultural and culinary heart. Trishaw rides past Chinese clan jetties, century-old Peranakan mansions, Cheong Fatt Tze (the Blue Mansion), Khoo Kongsi temple, and a street-art trail that turned Penang into Asia's coolest art city. Penang's hawker food — char kway teow, asam laksa, hokkien mee — is widely regarded as the best in Southeast Asia.\n\nLangkawi is the beach finale: 99 jewel-green islands off Malaysia's northwest coast, dominated by Pulau Langkawi where Cenang Beach's water sports and the SkyCab — the world's steepest cable-car at 42 degrees — to the Sky Bridge are headline attractions. Mangrove tours, Eagle Square, the night market, and a duty-free shopping scene round out the experience.",
    heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605649461784-ee5eb326f1d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555217851-6141535bd771?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1597000571127-e4e3e3686e88?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "December to April",
    weather:
      "Tropical year-round (24-33 °C). West coast (KL, Penang, Langkawi) is driest Dec-Apr. Brief afternoon showers possible in monsoon (May-Oct).",
    startingPrice: 75000,
    highlights: [
      "Petronas Twin Towers Sky Bridge",
      "Georgetown Penang UNESCO heritage",
      "Penang street-food trail",
      "Langkawi SkyCab & Sky Bridge",
      "Batu Caves & Genting Highlands",
      "Cenang Beach water sports",
    ],
    thingsToKnow: [
      "Visa on arrival or e-visa for Indian passport holders — process before travel via Malaysia eNTRI portal.",
      "KL Sentral is the central transit hub for trains, KLIA Express to airport, and onward to Penang/Langkawi.",
      "Penang's George Town is best explored on foot or by trishaw — most heritage attractions within 1 km radius.",
      "Langkawi ferry from Penang takes 2.5 hrs; direct flights are faster (45 min).",
      "Malaysian Ringgit (MYR) — keep small notes for hawker food and trishaw rides.",
    ],
    popularExperiences: [
      {
        title: "Petronas Twin Towers Sky Bridge",
        description:
          "Ride to the 41st-floor Sky Bridge and 86th-floor observation deck for panoramic views over the KL skyline.",
        icon: "🌆",
      },
      {
        title: "Penang Street-Food Trail",
        description:
          "Hawker hopping at Gurney Drive, New Lane, and Chulia Street — Penang is the undisputed street-food capital of Southeast Asia.",
        icon: "🍜",
      },
      {
        title: "Langkawi SkyCab Cable Car",
        description:
          "Ride the world's steepest cable car up Mount Mat Cincang and walk the Sky Bridge — a 125-m curved pedestrian bridge suspended at 700 m.",
        icon: "🚠",
      },
      {
        title: "Georgetown Street Art Walk",
        description:
          "Follow the famous trail of murals and wrought-iron sculptures that turned Penang's heritage zone into an open-air museum.",
        icon: "🎨",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── Philippines ──────────────────────── */
  {
    name: "Philippines",
    slug: "philippines",
    region: "International",
    country: "Philippines",
    category: "leisure",
    tagline: "7,641 Islands of Beaches, Reefs & Underground Rivers",
    description:
      "From the historic streets of Manila and the Spanish-era charm of Cebu to the powdery white sand of Boracay and the UNESCO underground river of Puerto Princesa — the Philippines is the world's most island-rich beach destination.",
    longDescription:
      "The Philippines is an archipelago of 7,641 islands — beaches, reefs, jungles, volcanoes and three centuries of Spanish colonial heritage that make it Southeast Asia's most culturally distinct destination. Manila, the capital on Luzon island, is anchored by Intramuros — the walled colonial city with Fort Santiago, San Agustin Church (the country's oldest, 1607), and Casa Manila — alongside Rizal Park and the modern Bonifacio Global City skyline.\n\nCebu, the 'Queen City of the South', is where Magellan landed in 1521 and where the country's Christianisation began. Magellan's Cross, Basilica del Santo Niño, Fort San Pedro and the lively Mactan Island resorts mix history with beach access. Cebu is also the launchpad for the Kawasan Falls canyoneering adventure and Oslob whale-shark snorkelling.\n\nBoracay, a tiny 7-km-long island, has been ranked Asia's best beach again and again — White Beach's flour-fine sand stretches 4 km, lined with stations 1-2-3 for kitesurfing, parasailing and island hopping to Crystal Cove and Magic Island. Sunset cocktails at D'Mall and Bulabog Beach kiteboarding round out a perfect three days.\n\nPuerto Princesa on Palawan island is home to the Puerto Princesa Underground River — a UNESCO World Heritage Site and one of the New 7 Wonders of Nature. The 8.2-km cave river runs through limestone karst beneath a mountain. Honda Bay island-hopping, Sabang Beach and the Iwahig Firefly Watching tour are the supporting acts.",
    heroImage: "https://images.unsplash.com/photo-1518509562904-e7ef99cddc85?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1518509562904-e7ef99cddc85?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565073624497-7e91b5cc3843?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583338917496-7b46b5d8a08c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551866442-65523e29b6ee?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "December to May",
    weather:
      "Tropical year-round (25-33 °C). Dry season Dec-May ideal for beaches. Avoid Jun-Nov typhoon season, especially Sep-Oct.",
    startingPrice: 92000,
    highlights: [
      "Boracay White Beach (Asia's best beach)",
      "Puerto Princesa Underground River (UNESCO)",
      "Cebu Magellan's Cross & Basilica del Santo Niño",
      "Manila Intramuros walled city",
      "Honda Bay island hopping",
      "Oslob whale-shark snorkelling",
    ],
    thingsToKnow: [
      "Indian passport holders require a visa — apply at the Philippines embassy in advance.",
      "Inter-island flights are usually faster and cheaper than ferries — Cebu Pacific and Philippine Airlines.",
      "Puerto Princesa Underground River permits are limited daily — book through your operator at least 3 days ahead.",
      "Boracay was closed for environmental rehabilitation in 2018; current rules ban smoking, drinking and littering on the beach.",
      "Philippine Peso (PHP) — ATMs widely available, USD also accepted at most resorts.",
    ],
    popularExperiences: [
      {
        title: "Boracay White Beach Sunset",
        description:
          "Walk barefoot along the 4-km flour-fine sand at sunset with a Mango Daiquiri from D'Mall — the iconic Boracay moment.",
        icon: "🏖️",
      },
      {
        title: "Underground River Cave Cruise",
        description:
          "Paddle through 8.2 km of cathedral-like caves on the Puerto Princesa Underground River — UNESCO and one of the New 7 Wonders.",
        icon: "🚣",
      },
      {
        title: "Intramuros Walking Tour",
        description:
          "Step into 17th-century Spanish Manila — Fort Santiago, San Agustin Church (1607) and cobblestone streets within the walled city.",
        icon: "🏛️",
      },
      {
        title: "Honda Bay Island Hopping",
        description:
          "Bangka boat to Cowrie, Starfish and Luli islands for snorkelling over reefs and a beach barbecue lunch.",
        icon: "🐠",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── Bhutan ──────────────────────── */
  {
    name: "Bhutan",
    slug: "bhutan",
    region: "International",
    country: "Bhutan",
    category: "leisure",
    tagline: "The Last Himalayan Kingdom — Gross National Happiness",
    description:
      "Tiger's Nest Monastery clinging to a cliff at 3,120 m, the dzongs of Paro and Punakha, the prayer-flag passes of central Bhutan — the world's only Vajrayana Buddhist kingdom where Gross National Happiness is government policy.",
    longDescription:
      "Bhutan is the world's most carefully managed travel destination — every foreign visitor pays a Sustainable Development Fee that funds free healthcare and education for Bhutanese citizens, and tourism is deliberately kept small-scale. The result: a Himalayan kingdom that has chosen to preserve its Vajrayana Buddhist culture, its 70%-forest cover (constitutionally mandated), and an unhurried pace that disappeared from the rest of Asia decades ago.\n\nParo, where the international airport is, is anchored by the Paro Dzong (Rinpung Dzong) — a 17th-century fortress-monastery — and the National Museum housed in the Ta Dzong watchtower. The signature experience is the hike to Taktsang (Tiger's Nest) Monastery, perched on a cliff 900 m above the Paro valley floor. The 4-5 hour round-trip climb to 3,120 m delivers one of the most photographed sights in the Himalayas.\n\nThimphu, the capital, is the world's only national capital without a single traffic light — police officers in white gloves direct traffic at the main junction. The 51-m bronze Buddha Dordenma overlooking the city, the Memorial Chorten where locals walk meditative circuits, the Tashichho Dzong (seat of government and the King), and the Folk Heritage Museum are essential stops.\n\nPunakha, the former winter capital, has the most beautiful dzong in Bhutan — Punakha Dzong at the confluence of the Pho Chhu and Mo Chhu rivers, with white-water rafting on the Mo Chhu river. The drive to Punakha crosses the Dochu La pass at 3,100 m where 108 chortens (memorial stupas) face the Eastern Himalayas. Longer trips continue to central Bhutan — Trongsa, Bumthang (the spiritual heartland) and the black-necked crane valley of Phobjikha.",
    heroImage: "https://images.unsplash.com/photo-1602001011404-ec9c5e5c5e6f?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1602001011404-ec9c5e5c5e6f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571536802807-30451a456b58?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531219432768-9f540ce91934?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1543874746-b7e36e8a2b3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583309219338-a582f1f9ca6b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545158539-4e6d35bb84a9?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "March to May, September to November",
    weather:
      "Spring (Mar-May) and autumn (Sep-Nov) are ideal — clear skies, pleasant 15-25 °C in Paro/Thimphu. Winters cold (Dec-Feb) but rhododendron-free clarity. Monsoon (Jun-Aug) lush but cloudy.",
    startingPrice: 130000,
    highlights: [
      "Tiger's Nest (Taktsang) Monastery hike",
      "Punakha Dzong — Bhutan's most beautiful fortress",
      "Buddha Dordenma 51-m bronze statue, Thimphu",
      "Dochu La Pass — 108 chortens",
      "Bumthang spiritual valley & burning lake",
      "Phobjikha black-necked crane valley (Oct-Mar)",
    ],
    thingsToKnow: [
      "Bhutan operates a Sustainable Development Fee (SDF) of USD 100/person/day for foreign tourists — Indian nationals pay INR 1,200/day from 2022 onwards.",
      "Indian passport holders need a permit (no visa) — arranged by the licensed Bhutanese operator before travel.",
      "All trips must be booked through a registered Bhutanese tour operator — no independent travel.",
      "Tiger's Nest hike requires 4-5 hrs round trip; horses available till halfway tea-house then on foot.",
      "Bhutanese Ngultrum (BTN) is pegged 1:1 to Indian Rupee — INR is widely accepted (except INR 2000 notes).",
    ],
    popularExperiences: [
      {
        title: "Tiger's Nest (Taktsang) Hike",
        description:
          "The signature Bhutan experience — a 4-5 hour climb to the 17th-century monastery perched on a cliff 900 m above the Paro valley floor.",
        icon: "🛕",
      },
      {
        title: "Dochu La Pass Sunrise",
        description:
          "108 chortens face the Eastern Himalayas across the 3,100 m pass — at sunrise on clear days you can see Gangkar Puensum, Bhutan's tallest mountain.",
        icon: "🏔️",
      },
      {
        title: "Punakha Dzong Visit",
        description:
          "Bhutan's most photographed fortress, set at the confluence of the 'father' (Pho Chhu) and 'mother' (Mo Chhu) rivers — wooden bridges, white walls, jacaranda blossoms in spring.",
        icon: "🏯",
      },
      {
        title: "Mo Chhu River Rafting",
        description:
          "Gentle Class II-III white-water rafting on the Mo Chhu river past Punakha Dzong — Bhutan's most popular soft-adventure activity.",
        icon: "🚣",
      },
    ],
    featured: false,
  },
  {
    name: "South Africa",
    slug: "south-africa",
    region: "International",
    country: "South Africa",
    category: "leisure",
    tagline: "Cape Town, Garden Route & the Big Five",
    description:
      "From the flat top of Table Mountain and the penguins of Boulders Beach to Big Five game drives in Kruger and the wine estates of Stellenbosch \u2014 South Africa is the world's most complete safari-and-city destination.",
    longDescription:
      "South Africa packs a continent into one country. Cape Town sits beneath the cable-car-topped Table Mountain, with Cape Point, the Cape of Good Hope, the penguin colony at Boulders Beach and the colourful Bo-Kaap quarter all within reach, plus the winelands of Stellenbosch and Franschhoek an hour away. The Garden Route then unfurls east along the Indian Ocean through Knysna, Plettenberg Bay and Tsitsikamma's forests and gorges.\n\nInland, the Greater Kruger ecosystem delivers world-class Big Five safaris \u2014 lion, leopard, elephant, rhino and buffalo \u2014 from open 4x4 game vehicles at dawn and dusk. Johannesburg, the Apartheid Museum and Soweto add the historical layer, and Sun City offers a resort finale. It is a destination that works for first-time safari-goers and repeat travellers alike.",
    heroImage: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "April to October (dry season for safari)",
    weather:
      "Cape Town is Mediterranean \u2014 warm dry summers (Nov-Mar) and cool wet winters. Kruger safari is best in the dry winter (May-Sep) when animals gather at waterholes.",
    startingPrice: 136000,
    highlights: [
      "Table Mountain cable car",
      "Cape Point & Cape of Good Hope",
      "Boulders Beach penguins",
      "Greater Kruger Big Five safari",
      "Garden Route coastal drive",
      "Stellenbosch wine estates",
    ],
    thingsToKnow: [
      "Indian passport holders need a South Africa visa \u2014 apply in advance with the standard document set.",
      "Domestic flights link Cape Town, the Garden Route and the Kruger/Johannesburg side \u2014 self-drive is also popular.",
      "Malaria precaution is advised for the low-veld Kruger area (consult your doctor).",
      "South African Rand (ZAR) \u2014 cards are widely accepted; carry some cash for tips and curio markets.",
      "Tipping ~10-15% in restaurants and for safari guides/trackers is customary.",
    ],
    popularExperiences: [
      {
        title: "Big Five Game Drive",
        description:
          "Dawn and dusk 4x4 safaris in the Greater Kruger in search of lion, leopard, elephant, rhino and buffalo.",
        icon: "\ud83e\udd81",
      },
      {
        title: "Table Mountain Cablecar",
        description:
          "Ride the rotating cable car to the flat summit for a 360-degree view over Cape Town and the Atlantic.",
        icon: "\ud83c\udf04",
      },
      {
        title: "Cape Winelands Tasting",
        description:
          "Cellar tours and tastings among the Cape Dutch estates of Stellenbosch and Franschhoek.",
        icon: "\ud83c\udf77",
      },
      {
        title: "Boulders Beach Penguins",
        description:
          "Walk the boardwalks beside a colony of African penguins on a Simon's Town beach.",
        icon: "\ud83d\udc27",
      },
    ],
    featured: true,
  },
  {
    name: "Kenya",
    slug: "kenya",
    region: "International",
    country: "Kenya",
    category: "leisure",
    tagline: "The Masai Mara & the Great Migration",
    description:
      "Big-cat country \u2014 the rolling savannah of the Masai Mara, the flamingo lakes of the Rift Valley and the elephants of Amboseli beneath Kilimanjaro, the original African safari.",
    longDescription:
      "Kenya is where the safari was born. The Masai Mara \u2014 the northern extension of the Serengeti \u2014 is the stage for the Great Migration (roughly July to October), when over a million wildebeest and zebra cross the Mara River past waiting crocodiles, with lion, cheetah and leopard never far behind. Amboseli, in the south, frames its big elephant herds against the snows of Mount Kilimanjaro across the Tanzanian border.\n\nThe Great Rift Valley adds Lake Nakuru's flamingo flocks and rhino sanctuary, while Lake Naivasha offers boat safaris and walking at Crescent Island. Encounters with the Maasai people, hot-air balloon flights over the Mara at dawn and a finish in Nairobi (with its elephant orphanage and giraffe centre) complete a classic Kenyan circuit.",
    heroImage: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503777119540-ec1f0e9c2a52?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "July to October (Great Migration) & January-February",
    weather:
      "Warm year-round at safari altitude (20-30 \u00b0C). Dry seasons (Jun-Oct and Jan-Feb) are best for game viewing; long rains fall Mar-May.",
    startingPrice: 142500,
    highlights: [
      "Masai Mara big cats",
      "Great Migration river crossings",
      "Amboseli elephants under Kilimanjaro",
      "Lake Nakuru flamingos & rhino",
      "Hot-air balloon safari",
      "Maasai village visit",
    ],
    thingsToKnow: [
      "Indian passport holders need a Kenya eTA (electronic travel authorisation) \u2014 applied online before travel.",
      "A yellow-fever vaccination certificate may be required; malaria prophylaxis is advised.",
      "Game drives are in 4x4 vehicles with pop-up roofs; pack neutral-coloured clothing and a zoom lens.",
      "Kenyan Shilling (KES) \u2014 USD is widely accepted at lodges; carry small notes for tips.",
      "Domestic light-aircraft hops (e.g. Nairobi-Mara) save long road transfers.",
    ],
    popularExperiences: [
      {
        title: "Great Migration Crossing",
        description:
          "Witness wildebeest and zebra brave the crocodile-filled Mara River \u2014 one of nature's greatest spectacles.",
        icon: "\ud83e\udd93",
      },
      {
        title: "Balloon Safari at Dawn",
        description:
          "Drift silently over the Mara at sunrise, then a champagne bush breakfast on the plains.",
        icon: "\ud83c\udf88",
      },
      {
        title: "Amboseli & Kilimanjaro",
        description:
          "Photograph big elephant herds against Africa's highest peak.",
        icon: "\ud83d\udc18",
      },
      {
        title: "Maasai Village Visit",
        description:
          "Meet a Maasai community for their songs, dances and way of life on the savannah.",
        icon: "\ud83d\udd31",
      },
    ],
    featured: true,
  },
  {
    name: "Japan",
    slug: "japan",
    region: "International",
    country: "Japan",
    category: "leisure",
    tagline: "Tokyo Neon, Kyoto Temples & Mount Fuji",
    description:
      "Bullet trains and bamboo groves, neon Tokyo and the thousand torii of Kyoto, cherry blossom in spring and snow monkeys in winter \u2014 Japan blends the hyper-modern with the deeply traditional.",
    longDescription:
      "Japan is a study in contrasts. Tokyo dazzles with Shibuya's scramble crossing, the temples of Asakusa, the electronics of Akihabara and the views from the Skytree, while a day trip reaches Mount Fuji and the lakes of Hakone. The shinkansen bullet train then whisks you west to Kyoto, the old imperial capital \u2014 the golden Kinkaku-ji, the thousand vermilion torii of Fushimi Inari, the bamboo grove of Arashiyama and the geisha lanes of Gion.\n\nNearby Nara adds its bowing deer and giant bronze Buddha, and Osaka brings the street food of Dotonbori and Osaka Castle. Spring (cherry blossom) and autumn (maple colours) are the headline seasons, but Japan rewards in every season \u2014 from summer festivals to winter snow and onsen hot springs.",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "March-April (cherry blossom) & October-November (autumn)",
    weather:
      "Four distinct seasons. Spring (Mar-May) and autumn (Oct-Nov) are mild and the most beautiful; summers are hot and humid; winters are cold with snow in the north.",
    startingPrice: 185000,
    highlights: [
      "Tokyo \u2014 Shibuya, Asakusa & Skytree",
      "Mount Fuji & Hakone",
      "Kyoto Fushimi Inari & Kinkaku-ji",
      "Arashiyama bamboo grove",
      "Nara deer & Great Buddha",
      "Shinkansen bullet train",
    ],
    thingsToKnow: [
      "Indian passport holders need a Japan visa \u2014 apply in advance through the authorised agency with the standard set.",
      "A Japan Rail Pass (bought before arrival) is excellent value for the Tokyo-Kyoto-Osaka route.",
      "Japan is largely cash-friendly \u2014 carry yen; IC cards (Suica/Pasmo) ease city transport.",
      "Pocket Wi-Fi or an eSIM is recommended for navigation; English signage is good on main routes.",
      "Etiquette matters \u2014 no tipping, quiet on trains, and shoes off where indicated.",
    ],
    popularExperiences: [
      {
        title: "Fushimi Inari Torii Walk",
        description:
          "Climb the tunnel of thousands of vermilion torii gates winding up the Kyoto hillside.",
        icon: "\u26e9\ufe0f",
      },
      {
        title: "Shinkansen Bullet Train",
        description:
          "Ride the 300 km/h bullet train between Tokyo, Kyoto and Osaka.",
        icon: "\ud83d\ude85",
      },
      {
        title: "Mount Fuji & Hakone",
        description:
          "Lake cruise, ropeway and hot springs with views of Japan's sacred peak.",
        icon: "\ud83d\uddfb",
      },
      {
        title: "Arashiyama Bamboo Grove",
        description:
          "Walk the towering green bamboo corridor and the Tenryu-ji temple gardens.",
        icon: "\ud83c\udf8b",
      },
    ],
    featured: true,
  },
  {
    name: "Jordan",
    slug: "jordan",
    region: "International",
    country: "Jordan",
    category: "leisure",
    tagline: "Petra, Wadi Rum & the Dead Sea",
    description:
      "The rose-red rock city of Petra, the Martian desert of Wadi Rum, a float in the Dead Sea and the Roman ruins of Jerash \u2014 Jordan is a compact, safe and spectacular Middle-East journey.",
    longDescription:
      "Jordan is one of the Middle East's most rewarding and welcoming destinations. Its crown jewel is Petra \u2014 the Nabataean city carved into rose-red sandstone, entered through the narrow Siq to the famous Treasury (Al-Khazneh), with the Monastery a climb beyond. South lies Wadi Rum, the Valley of the Moon, where 4x4 jeeps and Bedouin camps sit beneath towering sandstone massifs (the backdrop to many Mars films).\n\nThe Dead Sea, the lowest point on Earth, lets you float effortlessly and coat yourself in mineral mud, while the capital Amman, the vast Roman ruins of Jerash and the mosaics of Madaba and Mount Nebo add history and culture. Distances are short, the country is safe and friendly, and a week covers the highlights comfortably.",
    heroImage: "https://images.unsplash.com/photo-1563177978-4c5ddccc10da?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1563177978-4c5ddccc10da?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518630257714-3a3f9bb9c5a3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605908502724-9093a79a1b39?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "March to May & September to November",
    weather:
      "Desert climate \u2014 hot dry summers, cool winters. Spring and autumn are ideal; desert nights are cold year-round.",
    startingPrice: 128000,
    highlights: [
      "Petra & the Treasury through the Siq",
      "Wadi Rum jeep safari & Bedouin camp",
      "Float in the Dead Sea",
      "Jerash Roman ruins",
      "Amman citadel & city",
      "Mount Nebo & Madaba mosaics",
    ],
    thingsToKnow: [
      "Indian passport holders need a Jordan visa \u2014 the Jordan Pass (bought online) bundles the visa with Petra and 40+ sites.",
      "Petra involves a lot of walking on uneven ground \u2014 wear good shoes and carry water and sun protection.",
      "Wadi Rum camps range from basic Bedouin tents to luxury bubble domes \u2014 nights are cold.",
      "Jordanian Dinar (JOD) \u2014 cards work in cities; carry cash for desert camps and tips.",
      "Jordan is very safe for tourists, including solo and women travellers.",
    ],
    popularExperiences: [
      {
        title: "Petra Through the Siq",
        description:
          "Walk the narrow 1.2 km canyon that opens onto the Treasury \u2014 travel's great reveal.",
        icon: "\ud83c\udfdb\ufe0f",
      },
      {
        title: "Wadi Rum Jeep Safari",
        description:
          "4x4 across red dunes to rock arches and a night under desert stars at a Bedouin camp.",
        icon: "\ud83c\udfdc\ufe0f",
      },
      {
        title: "Float in the Dead Sea",
        description:
          "Bob effortlessly in the mineral-rich water and slather on the famous black mud.",
        icon: "\ud83c\udf0a",
      },
      {
        title: "Jerash Roman City",
        description:
          "Wander one of the best-preserved Roman provincial cities, colonnaded streets and all.",
        icon: "\ud83c\udff0",
      },
    ],
    featured: false,
  },
  {
    name: "Iceland",
    slug: "iceland",
    region: "International",
    country: "Iceland",
    category: "leisure",
    tagline: "Northern Lights, Waterfalls & the Golden Circle",
    description:
      "Waterfalls and geysers, black-sand beaches and glacier lagoons, the Blue Lagoon and \u2014 in winter \u2014 the aurora dancing overhead. Iceland is raw nature at its most dramatic.",
    longDescription:
      "Iceland is a land of fire and ice. The Golden Circle loops from Reykjavik to the erupting Strokkur geyser, the thundering Gullfoss waterfall and Thingvellir, where you can walk between the North American and Eurasian tectonic plates. The south coast strings together the Seljalandsfoss and Skogafoss waterfalls, the black-sand beach of Reynisfjara and the surreal Jokulsarlon glacier lagoon with its drifting icebergs and Diamond Beach.\n\nIn winter (roughly September to March), the long dark nights bring the chance to chase the Northern Lights across the countryside, while the geothermal Blue Lagoon offers a warm soak any time of year. Summer brings the midnight sun, puffins and highland access. Compact and safe, Iceland delivers a new wonder around almost every bend.",
    heroImage: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531168556467-80aace4d0144?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "September to March (Northern Lights) & June-August (midnight sun)",
    weather:
      "Cool maritime climate. Winters (Nov-Mar) are dark and cold \u2014 best for aurora; summers are mild with near-24-hour daylight. Weather changes fast year-round.",
    startingPrice: 175000,
    highlights: [
      "Northern Lights hunting (winter)",
      "Golden Circle \u2014 Geysir & Gullfoss",
      "Jokulsarlon glacier lagoon",
      "Reynisfjara black-sand beach",
      "Blue Lagoon geothermal spa",
      "Thingvellir tectonic rift",
    ],
    thingsToKnow: [
      "Indian passport holders need a Schengen visa for Iceland \u2014 apply with full documents and travel insurance.",
      "The Northern Lights need dark, clear, winter skies \u2014 they are natural and never guaranteed; we plan multiple chances.",
      "A self-drive or small-group tour is the usual way to circle the island; winter roads need care.",
      "Icelandic Krona (ISK) \u2014 Iceland is almost cashless; cards work everywhere.",
      "Pack proper waterproof and warm layers \u2014 the weather is famously changeable.",
    ],
    popularExperiences: [
      {
        title: "Northern Lights Hunt",
        description:
          "Head out under dark winter skies with a guide to chase the green-and-violet aurora.",
        icon: "\ud83c\udf0c",
      },
      {
        title: "Golden Circle",
        description:
          "Erupting Strokkur geyser, the Gullfoss falls and the Thingvellir rift in one loop.",
        icon: "\u2668\ufe0f",
      },
      {
        title: "Glacier Lagoon Cruise",
        description:
          "Sail among floating icebergs at Jokulsarlon and walk the Diamond Beach.",
        icon: "\ud83e\uddca",
      },
      {
        title: "Blue Lagoon Soak",
        description:
          "Bathe in the milky-blue geothermal waters set in a black-lava field.",
        icon: "\ud83d\udd35",
      },
    ],
    featured: true,
  },
  {
    name: "Kazakhstan",
    slug: "kazakhstan",
    region: "International",
    country: "Kazakhstan",
    category: "leisure",
    tagline: "Almaty, Big Almaty Lake & the Tien Shan",
    description:
      "Snow peaks above a green city, the turquoise Big Almaty Lake, Charyn Canyon's red cliffs and the futuristic capital Astana \u2014 Central Asia's most accessible adventure.",
    longDescription:
      "Kazakhstan, the world's largest landlocked country, has become a favourite short-haul escape from India. Almaty, the leafy former capital, sits at the foot of the Tien Shan mountains \u2014 the Shymbulak ski resort and Kok-Tobe hill are a cable-car ride away, and the glacial Big Almaty Lake glows turquoise in an alpine bowl just outside the city. A day trip reaches Charyn Canyon, a miniature Grand Canyon of red rock often called the Valley of Castles.\n\nThe modern capital Astana (Nur-Sultan) showcases futuristic architecture \u2014 the Bayterek Tower, the Khan Shatyr tent and gleaming ministries. With visa-free or easy e-visa access, short flight times and a mix of mountains, lakes and cities, Kazakhstan offers a fresh, uncrowded destination.",
    heroImage: "https://images.unsplash.com/photo-1596306499317-8490232098fa?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1596306499317-8490232098fa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "April to October",
    weather:
      "Continental \u2014 warm summers and cold snowy winters. Spring-autumn suit the lakes and canyons; winter is for skiing at Shymbulak.",
    startingPrice: 46500,
    highlights: [
      "Big Almaty Lake",
      "Shymbulak & Kok-Tobe cable cars",
      "Charyn Canyon day trip",
      "Almaty city & Green Bazaar",
      "Medeu skating rink",
      "Astana futuristic architecture",
    ],
    thingsToKnow: [
      "Indian passport holders get visa-free entry for short stays (up to 14 days) \u2014 confirm current rules before travel.",
      "Almaty is a short, convenient flight from India \u2014 great for a 4-5 night trip.",
      "Kazakhstani Tenge (KZT) \u2014 carry some cash; cards work in the cities.",
      "Mountain weather changes fast \u2014 Big Almaty Lake can be cold even in summer.",
      "Russian and Kazakh are the main languages; a translation app helps.",
    ],
    popularExperiences: [
      {
        title: "Big Almaty Lake",
        description:
          "Drive up to the glacier-fed turquoise lake ringed by Tien Shan peaks.",
        icon: "\ud83c\udfd4\ufe0f",
      },
      {
        title: "Charyn Canyon",
        description:
          "Hike the red-rock Valley of Castles, a miniature Grand Canyon.",
        icon: "\ud83e\udea8",
      },
      {
        title: "Shymbulak Cable Car",
        description:
          "Ride above Almaty to the ski slopes and Medeu skating rink.",
        icon: "\ud83d\udf01",
      },
      {
        title: "Astana Skyline",
        description:
          "Tour the futuristic Bayterek Tower and Khan Shatyr in the capital.",
        icon: "\ud83c\udfd9\ufe0f",
      },
    ],
    featured: false,
  },
  {
    name: "Uzbekistan",
    slug: "uzbekistan",
    region: "International",
    country: "Uzbekistan",
    category: "leisure",
    tagline: "Samarkand, Bukhara & the Silk Road",
    description:
      "The blue-tiled madrasas of Samarkand's Registan, the ancient lanes of Bukhara and walled Khiva \u2014 Uzbekistan is the living heart of the Silk Road.",
    longDescription:
      "Uzbekistan is the jewel of the Silk Road. Samarkand dazzles with the Registan \u2014 three towering madrasas clad in turquoise and gold mosaic \u2014 plus the Gur-e-Amir tomb of Timur and the Shah-i-Zinda avenue of mausoleums. Bukhara, a vast open-air museum, layers minarets, trading domes and the Ark fortress across a walkable old city, while Khiva's walled Itchan Kala feels like stepping into a frozen medieval caravan town.\n\nThe capital Tashkent adds a modern, metro-served contrast and a moving history. A high-speed train links Tashkent, Samarkand and Bukhara, making the classic Silk Road trio easy and comfortable. With warm hospitality, fine cuisine (the plov, the bread) and easy e-visa access, Uzbekistan is one of Asia's most rewarding cultural journeys.",
    heroImage: "https://images.unsplash.com/photo-1602523961757-3c4f9d2f6a8c?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1602523961757-3c4f9d2f6a8c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1601921004897-c6e16a3a1c63?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "April to June & September to October",
    weather:
      "Continental desert \u2014 hot summers and cold winters. Spring and autumn are the comfortable seasons for sightseeing.",
    startingPrice: 62000,
    highlights: [
      "Samarkand Registan Square",
      "Shah-i-Zinda & Gur-e-Amir",
      "Bukhara old city & the Ark",
      "Khiva walled Itchan Kala",
      "Tashkent metro & bazaars",
      "High-speed Silk Road train",
    ],
    thingsToKnow: [
      "Indian passport holders get an easy Uzbekistan e-visa \u2014 applied online before travel.",
      "The Afrosiyob high-speed train links Tashkent-Samarkand-Bukhara \u2014 book seats ahead.",
      "Uzbekistani Som (UZS) \u2014 carry cash; cards are growing but not universal.",
      "Summers are very hot \u2014 spring and autumn are far more comfortable for the old cities.",
      "Modest dress is appreciated when visiting mosques and mausoleums.",
    ],
    popularExperiences: [
      {
        title: "Registan Square",
        description:
          "Stand before the three mosaic-clad madrasas of Samarkand, the Silk Road's grandest sight.",
        icon: "\ud83d\udd4c",
      },
      {
        title: "Bukhara Old City",
        description:
          "Wander minarets, trading domes and the Ark fortress of a 2,000-year-old city.",
        icon: "\ud83d\udd4b",
      },
      {
        title: "Khiva Itchan Kala",
        description:
          "Walk the walled medieval town at golden hour, a frozen caravan city.",
        icon: "\ud83c\udff0",
      },
      {
        title: "Silk Road Cuisine",
        description:
          "Taste Uzbek plov, samsa and fresh tandoor bread with local families.",
        icon: "\ud83c\udf72",
      },
    ],
    featured: false,
  },

  {
    name: "Finland",
    slug: "finland",
    region: "International",
    country: "Finland",
    category: "leisure",
    tagline: "Lapland, the Aurora & Santa's Arctic",
    description:
      "Glass igloos under the Northern Lights, husky and reindeer sleds across the snow, and Santa Claus Village on the Arctic Circle \u2014 Finnish Lapland is the ultimate winter-wonderland.",
    longDescription:
      "Finland's far north, Lapland, is the storybook Arctic. Rovaniemi, on the Arctic Circle, is the official home of Santa Claus, where you can cross the magic line, meet Santa and post a letter from his post office. Beyond the town, the snow-blanketed wilderness is the stage for husky-sled and reindeer-sleigh rides, snowmobile safaris and nights spent watching the Northern Lights from glass igloos and aurora cabins.\n\nHelsinki, the design-led seaside capital, makes a cultured start or finish with its cathedral, market square and island fortress of Suomenlinna. From late September to March the aurora is the headline act, while the deep winter adds frozen lakes, ice-fishing and the genuine Finnish sauna culture \u2014 making Lapland one of the world's most magical cold-weather escapes.",
    heroImage: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1491466424936-e304919aada7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "December to March (snow & aurora)",
    weather:
      "Sub-arctic \u2014 deep cold winters (-10 to -25 \u00b0C in Lapland) with snow and aurora Dec-Mar; mild bright summers with the midnight sun.",
    startingPrice: 195000,
    highlights: [
      "Northern Lights from a glass igloo",
      "Husky sled safari",
      "Reindeer sleigh ride",
      "Santa Claus Village, Rovaniemi",
      "Snowmobile through the taiga",
      "Helsinki & Suomenlinna",
    ],
    thingsToKnow: [
      "Indian passport holders need a Schengen visa \u2014 apply with full documents and travel insurance.",
      "Lapland winters are extremely cold \u2014 thermal base layers, proper boots and gloves are essential (gear rental available).",
      "The aurora is natural and weather-dependent; multiple nights in Lapland improve the odds.",
      "Euro (EUR) \u2014 cards accepted everywhere.",
      "Glass-igloo and aurora-cabin stays are limited \u2014 book the peak Dec-Feb window early.",
    ],
    popularExperiences: [
      {
        title: "Glass Igloo Aurora Night",
        description:
          "Lie back in a heated glass igloo and watch the Northern Lights from your bed.",
        icon: "\ud83d\udecf\ufe0f",
      },
      {
        title: "Husky Sled Safari",
        description:
          "Mush your own team of huskies across the frozen Lapland wilderness.",
        icon: "\ud83d\udc15",
      },
      {
        title: "Santa Claus Village",
        description:
          "Cross the Arctic Circle line, meet Santa and post a card from Rovaniemi.",
        icon: "\ud83c\udf85",
      },
      {
        title: "Reindeer Sleigh & Sami Culture",
        description:
          "A reindeer-drawn sleigh ride and a taste of indigenous Sami life.",
        icon: "\ud83e\udd8c",
      },
    ],
    featured: true,
  },
  {
    name: "Europe",
    slug: "europe",
    region: "International",
    country: "Europe",
    category: "leisure",
    tagline: "Grand Multi-Country Tours, West & East",
    description:
      "London to Paris to the Swiss Alps and Italy, or the imperial trio of Prague, Vienna and Budapest \u2014 our Europe tours string the continent's icons into one seamless journey.",
    longDescription:
      "Europe rewards the multi-country traveller. Our Western Europe circuit links the headline capitals \u2014 London's Tower Bridge and Buckingham Palace, Paris's Eiffel Tower and Louvre, the Swiss Alps with cogwheel trains up Jungfrau or Mt Titlis, and Italy's Rome, Venice and Florence \u2014 connected by fast trains and scenic coaches. It is the classic first-timer's grand tour of the continent.\n\nOur Eastern Europe circuit takes a more atmospheric route through the old Habsburg heart \u2014 fairy-tale Prague with its astronomical clock and castle, imperial Vienna of Schonbrunn and the coffee houses, and Budapest straddling the Danube with its thermal baths and parliament. Both can be tailored from 7 to 16 nights, and combined for the ultimate cross-continent journey.",
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551867633-194f125695e9?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "April to October",
    weather:
      "Mild spring and autumn, warm summers; the Alps stay cool. Winter brings Christmas markets and snow in the mountains.",
    startingPrice: 235000,
    highlights: [
      "London \u2014 Tower Bridge & Westminster",
      "Paris \u2014 Eiffel Tower & Louvre",
      "Swiss Alps cogwheel trains",
      "Italy \u2014 Rome, Venice & Florence",
      "Prague, Vienna & Budapest (East)",
      "Fast inter-city trains & scenic coaches",
    ],
    thingsToKnow: [
      "Indian passport holders need a Schengen visa (plus a separate UK visa if London is included) \u2014 apply early with full documents.",
      "Multi-country tours involve train and coach transfers \u2014 pack light with a single check-in bag.",
      "Euro (EUR) across most of the Eurozone; the UK uses Pounds and Switzerland uses Swiss Francs.",
      "City taxes and some attraction reservations (Eiffel, Vatican) are pre-booked by us.",
      "Distances are short by rail \u2014 but allow buffer time for border and station transfers.",
    ],
    popularExperiences: [
      {
        title: "Swiss Alps Cogwheel Train",
        description:
          "Ride up to a glacier summit (Jungfraujoch or Mt Titlis) for snow and Alpine views in any season.",
        icon: "\ud83d\udf04",
      },
      {
        title: "Eiffel Tower & Seine",
        description:
          "Summit the Eiffel Tower and cruise the Seine past Paris's illuminated landmarks.",
        icon: "\ud83d\uddfc",
      },
      {
        title: "Venice Gondola & Canals",
        description:
          "Glide the canals of Venice and wander St Mark's Square.",
        icon: "\ud83d\udef6",
      },
      {
        title: "Prague Old Town",
        description:
          "The astronomical clock, Charles Bridge and the hilltop castle of fairy-tale Prague.",
        icon: "\ud83c\udff0",
      },
    ],
    featured: true,
  },
  {
    name: "Australia",
    slug: "australia",
    region: "International",
    country: "Australia",
    category: "leisure",
    tagline: "Sydney, the Great Barrier Reef & Beyond",
    description:
      "The Sydney Opera House, snorkelling the Great Barrier Reef, the Great Ocean Road and koalas in the bush \u2014 Australia is a sun-drenched mix of cities, reef and outback.",
    longDescription:
      "Australia is a country-sized adventure. Sydney opens with its iconic Opera House and Harbour Bridge, Bondi Beach and a harbour cruise, with the Blue Mountains a day trip away. North, in tropical Queensland, Cairns is the gateway to the Great Barrier Reef \u2014 the world's largest living structure \u2014 for snorkelling and diving over coral gardens, plus the ancient Daintree Rainforest.\n\nMelbourne adds laneway coffee culture, the Great Ocean Road and the Twelve Apostles sea stacks, while wildlife parks bring koalas, kangaroos and wombats up close. Whether it's three cities or a reef-and-rainforest focus, Australia delivers big landscapes, easy English-speaking travel and some of the friendliest people anywhere.",
    heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1494233892892-84542a694e72?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "September to November & March to May",
    weather:
      "Southern-hemisphere seasons (reversed). Sydney/Melbourne are mild in spring/autumn; tropical Cairns is best in the dry May-Oct. December-February is hot summer.",
    startingPrice: 215000,
    highlights: [
      "Sydney Opera House & Harbour",
      "Great Barrier Reef snorkelling",
      "Blue Mountains day trip",
      "Great Ocean Road & Twelve Apostles",
      "Koalas & kangaroos",
      "Melbourne laneways",
    ],
    thingsToKnow: [
      "Indian passport holders need an Australian visa (Visitor visa, subclass 600) \u2014 applied online with documents.",
      "Domestic flights connect Sydney, Cairns and Melbourne \u2014 distances are large.",
      "Australian Dollar (AUD) \u2014 fully card-friendly; tap payments everywhere.",
      "Sun is strong \u2014 high-SPF, hat and reef-safe sunscreen are essential on the reef.",
      "Reef trips run from Cairns/Port Douglas; sea conditions vary \u2014 we pick reputable operators.",
    ],
    popularExperiences: [
      {
        title: "Great Barrier Reef Snorkel",
        description:
          "Snorkel or dive over coral gardens and tropical fish on the world's largest reef.",
        icon: "\ud83d\udc20",
      },
      {
        title: "Sydney Opera House",
        description:
          "Tour the sails of the Opera House and cruise the harbour past the bridge.",
        icon: "\ud83c\udfad",
      },
      {
        title: "Great Ocean Road",
        description:
          "Drive the cliff-top road to the Twelve Apostles sea stacks at sunset.",
        icon: "\ud83d\ude97",
      },
      {
        title: "Wildlife Encounter",
        description:
          "Cuddle a koala and hand-feed kangaroos at a wildlife sanctuary.",
        icon: "\ud83d\udc28",
      },
    ],
    featured: false,
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    region: "International",
    country: "New Zealand",
    category: "leisure",
    tagline: "Fiords, Glaciers & the Adventure Capital",
    description:
      "Milford Sound's fiords, Queenstown's bungy and jetboats, glow-worm caves and Hobbiton \u2014 New Zealand packs the planet's scenery into two spectacular islands.",
    longDescription:
      "New Zealand is scenery turned up to eleven. The North Island offers Auckland's harbour, the Waitomo glow-worm caves, the geothermal geysers and Maori culture of Rotorua, and the green hills of Hobbiton from the Lord of the Rings films. The South Island raises the drama \u2014 Christchurch and the Canterbury plains, the turquoise lakes of Tekapo and Pukaki beneath Aoraki/Mount Cook, the glaciers of the West Coast, and the fiords of Milford Sound.\n\nAt the heart of the South Island is Queenstown, the adventure capital of the world \u2014 bungy jumping, jetboating, skydiving and gondola luge, ringed by the Remarkables and Lake Wakatipu. Easy English-speaking travel, superb road-tripping and warm Kiwi hospitality make it a bucket-list journey.",
    heroImage: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507097634215-8d5e4b77c5e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "October to April",
    weather:
      "Temperate, southern-hemisphere seasons. Summer (Dec-Feb) is warm and busy; spring/autumn are quieter; the South Island can be cold and snowy in winter.",
    startingPrice: 235000,
    highlights: [
      "Milford Sound fiord cruise",
      "Queenstown adventure capital",
      "Aoraki/Mount Cook & Lake Tekapo",
      "Waitomo glow-worm caves",
      "Rotorua geysers & Maori culture",
      "Hobbiton movie set",
    ],
    thingsToKnow: [
      "Indian passport holders need a New Zealand visa (Visitor visa) \u2014 applied online with documents.",
      "Distances and drive times are long but roads are superb \u2014 self-drive is the classic way.",
      "New Zealand Dollar (NZD) \u2014 fully card-friendly.",
      "Strict biosecurity \u2014 declare all food, plant and outdoor gear on arrival.",
      "Weather in the mountains and fiords changes fast \u2014 layers and a rain shell are a must.",
    ],
    popularExperiences: [
      {
        title: "Milford Sound Cruise",
        description:
          "Cruise the sheer cliffs and waterfalls of New Zealand's most famous fiord.",
        icon: "\u26f0\ufe0f",
      },
      {
        title: "Queenstown Adrenaline",
        description:
          "Bungy, jetboat or skydive in the world's self-styled adventure capital.",
        icon: "\ud83e\ude82",
      },
      {
        title: "Glow-Worm Caves",
        description:
          "Glide a boat through the Waitomo caves lit by thousands of glow-worms.",
        icon: "\u2728",
      },
      {
        title: "Hobbiton Movie Set",
        description:
          "Walk the Shire's hobbit holes on the green Waikato farmland.",
        icon: "\ud83c\udfe1",
      },
    ],
    featured: false,
  },

]

/* ─── Helper: get a destination by slug ─────────────────────────────────── */
export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}

/* ─── Helper: get featured destinations ─────────────────────────────────── */
export function getFeaturedDestinations(): Destination[] {
  return destinations.filter((d) => d.featured)
}

/* ──────────────────────────────────────────────────────────────────────────
 * Coming-soon destinations — provided by the client (docx) but without
 * itineraries yet. Shown as enquire-only cards on the destinations page; NOT
 * included in detail-page generation, packages, or the sitemap until live.
 * ────────────────────────────────────────────────────────────────────────── */
export interface ComingSoonDestination {
  name: string
  slug: string
  region: Region
  country: string
  tagline: string
  heroImage: string
}

export const comingSoonDestinations: ComingSoonDestination[] = [
  {
    name: "Cambodia & Laos",
    slug: "cambodia-laos",
    region: "International",
    country: "Cambodia & Laos",
    tagline: "Angkor temples & the Mekong's gentle heart",
    heroImage: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&h=600&fit=crop",
  },
  {
    name: "Oman",
    slug: "oman",
    region: "International",
    country: "Oman",
    tagline: "Wadis, dunes & the forts of Arabia",
    heroImage: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800&h=600&fit=crop",
  },
  {
    name: "Saudi Arabia",
    slug: "saudi-arabia",
    region: "International",
    country: "Saudi Arabia",
    tagline: "AlUla, the Red Sea & desert heritage",
    heroImage: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800&h=600&fit=crop",
  },
  {
    name: "Ireland",
    slug: "ireland",
    region: "International",
    country: "Ireland",
    tagline: "Emerald cliffs, castles & the Wild Atlantic Way",
    heroImage: "https://images.unsplash.com/photo-1590759668628-05b0fc34bb70?w=800&h=600&fit=crop",
  },
  {
    name: "Russia",
    slug: "russia",
    region: "International",
    country: "Russia",
    tagline: "Moscow's Red Square & imperial St Petersburg",
    heroImage: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800&h=600&fit=crop",
  },
]
