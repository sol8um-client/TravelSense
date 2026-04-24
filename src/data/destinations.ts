export type Region =
  | "North India"
  | "Northeast India"
  | "South India"
  | "West India"
  | "International"

export type Category = "leisure" | "adventure" | "educational" | "sports"

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
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609837644286-48fa3e6cd3bf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1624466440418-ba5c78826a9b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587922546307-776227941871?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&h=600&fit=crop",
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
      "https://images.unsplash.com/photo-1544735716-ea9ef790fcfd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1626621341522-e1a5a4a5b086?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580289234369-3bd2e6d3b546?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581791538302-03537b9c97bf?w=800&h=600&fit=crop",
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
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524309307259-7c7d4bf28a1e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609947017136-9dab4ab0dbc0?w=800&h=600&fit=crop",
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
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571536802086-159e4c3eb207?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=600&fit=crop",
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

  /* ──────────────────────── 15. Char Dham ──────────────────────── */
  {
    name: "Char Dham",
    slug: "char-dham",
    region: "North India",
    country: "India",
    category: "leisure",
    tagline: "Sacred Pilgrimage in the Himalayas",
    description:
      "The sacred pilgrimage to Yamunotri, Gangotri, Kedarnath, and Badrinath is India's holiest spiritual circuit. Set amidst the grandeur of the Garhwal Himalayas, the Char Dham Yatra is a journey of faith, endurance, and overwhelming natural beauty.",
    longDescription:
      "The Char Dham Yatra is Hinduism's most revered pilgrimage circuit, connecting four sacred shrines in the Garhwal Himalayas of Uttarakhand. Each shrine sits at the source of a holy river: Yamunotri at the origin of the Yamuna, Gangotri where the Ganga begins, Kedarnath dedicated to Lord Shiva beside the Mandakini, and Badrinath devoted to Lord Vishnu on the banks of the Alaknanda. Completing the full circuit is believed to wash away all sins and pave the path to moksha.\n\nThe journey itself is as transformative as the destination. The route winds through some of the most spectacular mountain scenery on earth — deep gorges, thundering waterfalls, alpine meadows carpeted in wildflowers, and snow-capped peaks that pierce an impossibly blue sky. Kedarnath, at 11,755 ft, was devastated by floods in 2013 but has been rebuilt with a massive protective wall, and the trek to its ancient temple through a valley of rhododendron forests remains deeply moving. Badrinath, flanked by the Nar and Narayan peaks, contains a temple believed to have been established by Adi Shankaracharya in the 8th century.\n\nModern infrastructure has made the yatra more accessible than ever — helicopter services connect the shrines, the Char Dham Highway project is widening roads, and accommodation ranges from basic dharamshalas to comfortable hotels. Yet the essence remains unchanged: a deeply personal journey through some of the most sacred and spectacular terrain on the planet.",
    heroImage: "/images/generated/char-dham-hero.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1600176183920-ff3e18e45321?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573053985939-81bc1a37a4cb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570543999-74aebc83ca7c?w=800&h=600&fit=crop",
    ],
    bestTimeToVisit: "May to June & September to October",
    weather:
      "The shrines are open only May to November. Summer (May–Jun) has mild days at 10–20 °C. Monsoon (Jul–Aug) brings landslide risk. Autumn (Sep–Oct) offers clear skies and fewer crowds.",
    startingPrice: 20000,
    highlights: [
      "Kedarnath Temple Trek",
      "Badrinath Temple Darshan",
      "Gangotri Glacier View",
      "Yamunotri Hot Springs",
      "Mana Village — Last Indian Village",
      "Helicopter Darshan Option",
    ],
    thingsToKnow: [
      "Register on the official Char Dham Yatra portal — biometric registration is mandatory.",
      "Carry a medical fitness certificate; altitude sickness is a real risk above 10,000 ft.",
      "Helicopter bookings for Kedarnath sell out months in advance during peak season.",
      "Pack layered clothing, rain gear, a sturdy walking stick, and high-energy snacks.",
      "The full circuit takes 10–12 days by road; plan for rest days at Guptkashi and Joshimath.",
    ],
    popularExperiences: [
      {
        title: "Kedarnath Temple Trek",
        description:
          "Walk 18 km through a rhododendron valley to the ancient Shiva temple at 11,755 ft.",
        icon: "🛕",
      },
      {
        title: "Badrinath Hot Springs Dip",
        description:
          "Bathe in the naturally heated Tapt Kund before entering the shrine of Lord Vishnu at dawn.",
        icon: "♨️",
      },
      {
        title: "Gangotri Glacier Viewpoint",
        description:
          "Trek beyond Gangotri town to Gaumukh, the snout of the glacier where the Ganga is born.",
        icon: "🏔️",
      },
      {
        title: "Mana Village Heritage Walk",
        description:
          "Visit India's last inhabited village before Tibet, featuring Vyas Cave and Bhim Pul bridge.",
        icon: "🏘️",
      },
    ],
    featured: false,
  },

  /* ──────────────────────── 16. Andaman Islands ──────────────────────── */
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
    name: "Karnataka",
    slug: "karnataka",
    region: "South India",
    country: "India",
    category: "leisure",
    tagline: "Where Palaces Meet Coffee Plantations",
    description:
      "From Mysore's royal Dasara splendour to the UNESCO ruins of Hampi, the misty coffee hills of Coorg, and the pristine beaches of Karwar — Karnataka is South India's most diverse state.",
    longDescription:
      "Karnataka blends centuries of royal history with wild natural beauty. Hampi's 14th-century Vijayanagara ruins — temples, elephant stables, and boulder-strewn landscapes — are a UNESCO World Heritage Site. Mysore's Amba Vilas Palace lights up during Dasara in October with a procession that rivals any in India.\n\nThe Western Ghats along the state's western edge give rise to Coorg (Kodagu) and Chikmagalur — India's coffee-growing belt where you can stay on family-run plantations. Wildlife enthusiasts head to Bandipur and Nagarahole national parks for tiger and elephant sightings.\n\nThe coastal strip offers Karwar, Gokarna, and Udupi — each with their own identity. Bengaluru, the state capital, is both India's tech hub and home to leafy parks and vibrant nightlife.",
    heroImage:
      "/images/generated/karnataka-hero.webp",
    galleryImages: [
      "/images/generated/karnataka-hero.webp",
    ],
    bestTimeToVisit: "October to March",
    weather:
      "Coastal areas warm year-round (24-32°C). Western Ghats cooler (15-28°C). Summers (Mar-May) hot inland; monsoon (Jun-Sep) heavy on the coast.",
    startingPrice: 14000,
    highlights: [
      "Hampi UNESCO Ruins",
      "Mysore Palace & Dasara",
      "Coorg Coffee Estates",
      "Gokarna Beaches",
      "Bandipur Tiger Reserve",
      "Badami Cave Temples",
      "Jog Falls",
    ],
    thingsToKnow: [
      "Best visited during October to March for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Hampi UNESCO Ruins",
        description:
          "One of the signature experiences in Karnataka.",
        icon: "✨",
      },
      {
        title: "Mysore Palace & Dasara",
        description:
          "Explore the living heritage of Karnataka with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Coorg Coffee Estates",
        description:
          "Taste the flavours of Karnataka — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Gokarna Beaches",
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
    name: "Hyderabad",
    slug: "hyderabad",
    region: "South India",
    country: "India",
    category: "leisure",
    tagline: "City of Pearls and Nizami Heritage",
    description:
      "The legendary city of Charminar, Golconda Fort's whispering walls, Chowmahalla Palace's royal opulence, and Hyderabadi biryani — a 400-year-old capital with IT-age energy.",
    longDescription:
      "Hyderabad's twin city Secunderabad forms one of India's largest metropolitan areas, yet its old quarters preserve 400 years of Nizami heritage. The Charminar — built in 1591 — anchors the old city's bazaars where you'll find pearls (the city's historic trade), lacquer bangles, and authentic Hyderabadi biryani cooked over slow dum.\n\nGolconda Fort was the Qutb Shahi capital and is famous for its acoustics — a clap at the entrance is heard at the summit a kilometre away. The Chowmahalla Palace, Falaknuma Palace (now a Taj hotel), and Salar Jung Museum showcase the wealth of the Asaf Jahi dynasty, rumoured to have produced the richest man in the world in his time.\n\nModern Hyderabad is also India's pharma and IT capital. Ramoji Film City on the outskirts is the world's largest film complex.",
    heroImage:
      "https://images.unsplash.com/photo-1672997317502-9dc18f4d8a6f?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1672997317502-9dc18f4d8a6f?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "October to February",
    weather:
      "Summers (Mar-May) hot at 30-40°C. Winters (Nov-Feb) pleasant at 15-28°C. Short monsoon (Jun-Sep).",
    startingPrice: 12000,
    highlights: [
      "Charminar & Old City Bazaars",
      "Golconda Fort",
      "Chowmahalla Palace",
      "Salar Jung Museum",
      "Falaknuma Palace",
      "Ramoji Film City",
      "Biryani Trail",
    ],
    thingsToKnow: [
      "Best visited during October to February for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Charminar & Old City Bazaars",
        description:
          "One of the signature experiences in Hyderabad.",
        icon: "✨",
      },
      {
        title: "Golconda Fort",
        description:
          "Explore the living heritage of Hyderabad with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Chowmahalla Palace",
        description:
          "Taste the flavours of Hyderabad — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Salar Jung Museum",
        description:
          "A day-trip to the region's most memorable landscape.",
        icon: "🌄",
      },
    ],
    featured: false,
  },
  {
    name: "Vietnam",
    slug: "vietnam",
    region: "International",
    country: "Vietnam",
    category: "leisure",
    tagline: "Limestone Karsts, Ancient Towns & Street Food Paradise",
    description:
      "From the emerald waters of Ha Long Bay to the lantern-lit streets of Hoi An, the Mekong Delta, Saigon's chaos, and the mountain terraces of Sapa — Vietnam is Southeast Asia's most captivating country.",
    longDescription:
      "Vietnam stretches 1,650 km from the Chinese border to the Gulf of Thailand, packing in more variety than most countries twice its size. Hanoi, the capital, balances French colonial grace with a frenetic Old Quarter of 36 streets named after the guilds that once worked them.\n\nHa Long Bay's 1,600 limestone karsts rising from emerald water is a UNESCO World Heritage Site and best experienced on an overnight cruise. Central Vietnam offers Hoi An (a perfectly preserved 15th-century trading port lit by silk lanterns every evening), Hue (the former imperial capital), and the pristine beaches of Da Nang and China Beach.\n\nHo Chi Minh City (Saigon) is Vietnam's commercial engine — a motorbike-choked sprawl with world-class street food, rooftop bars, and the sobering Cu Chi Tunnels and War Remnants Museum. The Mekong Delta offers floating markets and homestays. In the far north, Sapa's terraced rice fields and ethnic minority villages are a trekker's paradise.",
    heroImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "November to April",
    weather:
      "Tropical, varies by region. North: cool winters (15-22°C), hot summers. Central: beach-ideal Jan-Aug. South: warm year-round (26-32°C).",
    startingPrice: 45000,
    highlights: [
      "Ha Long Bay Cruise",
      "Hoi An Lantern Town",
      "Ho Chi Minh City Street Food",
      "Mekong Delta",
      "Sapa Rice Terraces",
      "Hue Imperial City",
      "Cu Chi Tunnels",
    ],
    thingsToKnow: [
      "Best visited during November to April for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Ha Long Bay Cruise",
        description:
          "One of the signature experiences in Vietnam.",
        icon: "✨",
      },
      {
        title: "Hoi An Lantern Town",
        description:
          "Explore the living heritage of Vietnam with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Ho Chi Minh City Street Food",
        description:
          "Taste the flavours of Vietnam — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Mekong Delta",
        description:
          "A day-trip to the region's most memorable landscape.",
        icon: "🌄",
      },
    ],
    featured: false,
  },
  {
    name: "Thailand",
    slug: "thailand",
    region: "International",
    country: "Thailand",
    category: "leisure",
    tagline: "Beaches, Temples, and Street-Food Capital",
    description:
      "From Bangkok's buzz to Phuket's beaches, Chiang Mai's temples and elephant sanctuaries, the limestone bays of Krabi, and the full-moon parties of Koh Phangan — Thailand is endlessly rewarding.",
    longDescription:
      "Thailand remains Southeast Asia's most visited country for good reason — it packs world-class beaches, ornate Buddhist temples, elephants, street food, and friendly locals into an accessible, affordable destination.\n\nBangkok is a sensory overload — the Grand Palace, Wat Pho's reclining Buddha, floating markets, rooftop bars, and khao soi noodles at midnight. Head south for the beaches: Phuket for nightlife, Koh Samui for resorts, Koh Phi Phi for snorkelling, Krabi for limestone karsts, and Koh Lanta or Koh Yao for quiet.\n\nChiang Mai in the north is the cultural heart — 300+ Buddhist temples, cooking schools, ethical elephant sanctuaries, and the starting point for treks to hill-tribe villages. Pai and Chiang Rai extend the northern loop with bohemian towns and the surreal White Temple.",
    heroImage:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "November to March",
    weather:
      "Tropical year-round. Cool-dry (Nov-Feb) is ideal. Hot (Mar-May) reaches 35-40°C. Rainy (Jun-Oct) — short afternoon showers.",
    startingPrice: 40000,
    highlights: [
      "Bangkok Grand Palace",
      "Phuket Beaches",
      "Chiang Mai Elephant Sanctuaries",
      "Krabi Island Hopping",
      "Floating Markets",
      "Muay Thai Boxing",
      "Thai Cooking Class",
    ],
    thingsToKnow: [
      "Best visited during November to March for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Bangkok Grand Palace",
        description:
          "One of the signature experiences in Thailand.",
        icon: "✨",
      },
      {
        title: "Phuket Beaches",
        description:
          "Explore the living heritage of Thailand with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Chiang Mai Elephant Sanctuaries",
        description:
          "Taste the flavours of Thailand — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Krabi Island Hopping",
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
    name: "South Africa",
    slug: "south-africa",
    region: "International",
    country: "South Africa",
    category: "adventure",
    tagline: "Safari, Cape Coast, and the Rainbow Nation",
    description:
      "Kruger's Big Five, the Cape Peninsula's Table Mountain, the Garden Route's coastal drive, Stellenbosch wine country, and Robben Island — South Africa is a continent-in-one.",
    longDescription:
      "South Africa is Africa's most complete travel experience. Cape Town is regularly voted the world's most beautiful city — Table Mountain looming over Camps Bay's beaches, the cable car to the summit, Cape Point where two oceans meet, and the Winelands of Stellenbosch and Franschhoek producing world-class Pinotage and Chenin Blanc.\n\nThe Garden Route connects Cape Town to Port Elizabeth along 300 km of spectacular coastline — stops at Knysna, Plettenberg Bay, and Storms River National Park are essential. Adventure seekers bungee jump from Bloukrans Bridge (216m) and dive with great whites at Gansbaai.\n\nKruger National Park and adjacent private reserves (Sabi Sands, Timbavati) offer world-class Big Five safaris — lion, leopard, elephant, buffalo, rhino. Johannesburg's Apartheid Museum and nearby Soweto townships tell the country's difficult modern history.",
    heroImage:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "May to September (for safaris), November to April (for Cape Town)",
    weather:
      "Seasons opposite to India. Cape Town Mediterranean. Kruger subtropical — dry winter (May-Sep) best for wildlife.",
    startingPrice: 100000,
    highlights: [
      "Cape Town & Table Mountain",
      "Kruger Big Five Safari",
      "Garden Route Drive",
      "Stellenbosch Wine Country",
      "Cape Point",
      "Cape Peninsula Penguins",
      "Johannesburg History Tour",
    ],
    thingsToKnow: [
      "Best visited during May to September for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Cape Town & Table Mountain",
        description:
          "One of the signature experiences in South Africa.",
        icon: "✨",
      },
      {
        title: "Kruger Big Five Safari",
        description:
          "Explore the living heritage of South Africa with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Garden Route Drive",
        description:
          "Taste the flavours of South Africa — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Stellenbosch Wine Country",
        description:
          "A day-trip to the region's most memorable landscape.",
        icon: "🌄",
      },
    ],
    featured: false,
  },
  {
    name: "Kenya",
    slug: "kenya",
    region: "International",
    country: "Kenya",
    category: "adventure",
    tagline: "Where the Great Migration Thunders",
    description:
      "The Maasai Mara's big cats, the Great Wildebeest Migration, Amboseli's elephants framed by Kilimanjaro, the flamingos of Lake Nakuru, and Diani's Indian Ocean beaches — classic African safari.",
    longDescription:
      "Kenya is the archetype of the African safari. The Maasai Mara National Reserve is the northern extension of Tanzania's Serengeti and hosts the Great Migration of 1.5 million wildebeest and 300,000 zebra from July to October — one of the greatest wildlife spectacles on Earth.\n\nAmboseli National Park, set against the backdrop of snow-capped Mount Kilimanjaro across the border in Tanzania, is famous for enormous elephant herds. Lake Nakuru hosts millions of flamingos and is one of the best places to see white rhino. Lake Naivasha and Hell's Gate offer boat safaris and cycling among giraffes.\n\nNairobi serves as the hub — visit the Giraffe Centre, the David Sheldrick Elephant Orphanage, and Karen Blixen's home. For a beach extension, the Indian Ocean coast at Diani and Watamu offers coral reefs and Swahili culture.",
    heroImage:
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "July to October (migration), January to March (green season)",
    weather:
      "Equatorial. Highlands (Nairobi, Mara) pleasantly cool (10-25°C). Coast tropical (24-32°C). Long rains Apr-May, short rains Nov-Dec.",
    startingPrice: 90000,
    highlights: [
      "Great Wildebeest Migration",
      "Maasai Mara Big Cats",
      "Amboseli Elephants & Kilimanjaro",
      "Lake Nakuru Flamingos",
      "Maasai Village Visit",
      "Diani Beach",
      "Nairobi Elephant Orphanage",
    ],
    thingsToKnow: [
      "Best visited during July to October for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Great Wildebeest Migration",
        description:
          "One of the signature experiences in Kenya.",
        icon: "✨",
      },
      {
        title: "Maasai Mara Big Cats",
        description:
          "Explore the living heritage of Kenya with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Amboseli Elephants & Kilimanjaro",
        description:
          "Taste the flavours of Kenya — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Lake Nakuru Flamingos",
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
  {
    name: "Kazakhstan",
    slug: "kazakhstan",
    region: "International",
    country: "Kazakhstan",
    category: "leisure",
    tagline: "Silk Road Heritage & Steppe Grandeur",
    description:
      "Almaty's Tien Shan peaks, the ancient Silk Road mausoleums of Turkestan, the Charyn Canyon, and Astana's space-age architecture — Kazakhstan is the world's 9th-largest country and Central Asia's most accessible.",
    longDescription:
      "Kazakhstan stretches from the Caspian Sea to the Altai Mountains, spanning a territory bigger than Western Europe. Almaty — the former capital — nestles against the snow-capped Zailiyskiy Alatau range of the Tien Shan. The Kok Tobe gondola offers city panoramas, and the Medeo high-altitude ice rink is a short drive up the mountain.\n\nThe country's most dramatic natural sight is Charyn Canyon — a 150 km gorge often called Kazakhstan's Grand Canyon — located 3 hours from Almaty. Kolsai Lakes and Kaindy (with its underwater forest) are equally spectacular.\n\nIn the south, Turkestan's Mausoleum of Khoja Ahmed Yasawi is a UNESCO site and a key Silk Road pilgrimage centre. Astana (officially renamed Nur-Sultan) is the purpose-built modern capital with the Bayterek Tower and Khan Shatyr tent.",
    heroImage:
      "https://images.unsplash.com/photo-1599772515036-5d00d5c1be48?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1599772515036-5d00d5c1be48?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "May to September",
    weather:
      "Continental. Almaty cold winters (-5 to 5°C), warm summers (20-30°C). Steppe very cold in winter.",
    startingPrice: 75000,
    highlights: [
      "Almaty & Tien Shan",
      "Charyn Canyon",
      "Kolsai & Kaindy Lakes",
      "Medeo Ice Rink",
      "Kok Tobe Gondola",
      "Turkestan Silk Road Mausoleum",
      "Big Almaty Lake",
    ],
    thingsToKnow: [
      "Best visited during May to September for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Almaty & Tien Shan",
        description:
          "One of the signature experiences in Kazakhstan.",
        icon: "✨",
      },
      {
        title: "Charyn Canyon",
        description:
          "Explore the living heritage of Kazakhstan with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Kolsai & Kaindy Lakes",
        description:
          "Taste the flavours of Kazakhstan — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Medeo Ice Rink",
        description:
          "A day-trip to the region's most memorable landscape.",
        icon: "🌄",
      },
    ],
    featured: false,
  },
  {
    name: "Uzbekistan",
    slug: "uzbekistan",
    region: "International",
    country: "Uzbekistan",
    category: "educational",
    tagline: "The Heart of the Silk Road",
    description:
      "Samarkand's Registan Square, Bukhara's 10th-century minarets, Khiva's walled old city, and the tiled Timurid architecture of the Great Silk Road — Uzbekistan is a living museum.",
    longDescription:
      "Uzbekistan is the cultural heart of Central Asia and one of the world's most rewarding destinations for architecture lovers. The Silk Road triangle of Samarkand, Bukhara, and Khiva contains some of the finest surviving Timurid and Uzbek monuments.\n\nSamarkand's Registan Square — three 15th to 17th-century madrasas facing each other across a public square — is one of the most visually stunning sights in the Islamic world. The Gur-e-Amir Mausoleum holds Timur's (Tamerlane's) tomb. Bukhara's historic centre is UNESCO-listed with the 10th-century Ismail Samani Mausoleum, the Kalyan Minaret, and the Ark citadel.\n\nKhiva's Itchan Kala is a perfectly preserved walled old town of mosques, madrasas, and caravanserais. Tashkent, the modern capital, balances Soviet-era planning with Uzbek craft markets like Chorsu Bazaar.",
    heroImage:
      "https://images.unsplash.com/photo-1578674473215-9e07a0a1dffc?w=1600&h=900&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1578674473215-9e07a0a1dffc?w=1600&h=900&fit=crop",
    ],
    bestTimeToVisit: "March to May, September to November",
    weather:
      "Continental. Summers (Jun-Aug) very hot at 35-45°C. Winters (Dec-Feb) cold at -5 to 5°C. Spring/autumn ideal.",
    startingPrice: 70000,
    highlights: [
      "Samarkand Registan Square",
      "Bukhara Kalyan Minaret",
      "Khiva's Walled Old City",
      "Gur-e-Amir Mausoleum",
      "Shahi-Zinda Necropolis",
      "Tashkent Chorsu Bazaar",
      "Silk Road Caravanserai",
    ],
    thingsToKnow: [
      "Best visited during March to May, September to November for the most reliable weather.",
      "Currency, visa, and SIM card guidance available from your TravelSense consultant before you fly.",
      "All itineraries are customisable — tell us your pace, interests, and we rebuild around you.",
      "Small-group departures available; private bookings also supported for families and couples.",
    ],
    popularExperiences: [
      {
        title: "Samarkand Registan Square",
        description:
          "One of the signature experiences in Uzbekistan.",
        icon: "✨",
      },
      {
        title: "Bukhara Kalyan Minaret",
        description:
          "Explore the living heritage of Uzbekistan with a local expert.",
        icon: "🏛️",
      },
      {
        title: "Khiva's Walled Old City",
        description:
          "Taste the flavours of Uzbekistan — curated meals at trusted local spots.",
        icon: "🍽️",
      },
      {
        title: "Gur-e-Amir Mausoleum",
        description:
          "A day-trip to the region's most memorable landscape.",
        icon: "🌄",
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
