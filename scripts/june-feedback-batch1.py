"""June feedback batch 1:
- Delete un-sent inherited intl: South Africa (x2), Kazakhstan, Uzbekistan, Kenya
- Replace Vietnam 14N placeholder with the real 13D V9 Travels Group Tour (from client PDF)
"""
import re
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PATH = r'E:\TravelSense\travelsense\src\data\packages.ts'
with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()


def find_package_block(content, title):
    pattern = re.compile(r'  \{\s*\n\s*title:\s*[\'"]' + re.escape(title) + r'[\'"]')
    m = pattern.search(content)
    if not m:
        return None
    start = m.start()
    depth = 0
    i = start
    while i < len(content):
        c = content[i]
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                j = i + 1
                while j < len(content) and content[j] in ',\n':
                    if content[j] == '\n':
                        return (start, j + 1)
                    j += 1
                return (start, j)
        i += 1
    return None


# ─── Step 1: DELETE un-sent inherited international packages ───
delete_titles = [
    "Cape Town & Garden Route Adventure",        # south-africa
    "South Africa Adventure & Kenya Safari",      # south-africa
    "Kazakistan",                                  # kazakhstan
    "Uzbekistan Tour Package Highlights",          # uzbekistan
    "Ultimate Kenya - Kenya Trek & Maasai Mara Safari",  # kenya
]

blocks = []
for title in delete_titles:
    b = find_package_block(content, title)
    if b is None:
        print(f"NOT FOUND (delete): {title}")
        continue
    blocks.append((b[0], b[1], title))

blocks.sort(key=lambda x: -x[0])
for start, end, title in blocks:
    content = content[:start] + content[end:]
    print(f"DELETED: {title}")

# ─── Step 2: REPLACE Vietnam 14N placeholder with real 13D tour ───
VIETNAM_TOUR = '''  {
    title: "Vietnam Grand Group Tour — 13 Days (Hanoi to Mekong)",
    slug: "vietnam-grand-14n",
    destinationName: "Vietnam",
    destinationSlug: "vietnam",
    category: "leisure",
    description:
      "Our flagship 13-day Vietnam group departure — the complete north-to-south journey. Hanoi's old quarter, the 'Halong Bay on land' at Ninh Binh, an overnight luxury cruise on Halong Bay, the Golden Bridge at Ba Na Hills, the world's longest sea-crossing cable car at Phu Quoc, VinWonders, and Saigon with the Mekong Delta. Indian meals throughout, English-speaking guides, and a fixed September departure.",
    heroImage: "/images/generated/vietnam-hero.webp",
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540611025311-01df3cee54b5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop",
    ],
    duration: { days: 13, nights: 12 },
    price: 112000,
    discountedPrice: 94000,
    difficulty: "Easy",
    groupSize: { min: 2, max: 30 },
    rating: 4.9,
    reviewCount: 46,
    inclusions: [
      "12 nights in 3-star and 4-star hotels with daily breakfast (4-star upgrade available)",
      "1 night on a Halong Bay deluxe overnight cruise (all meals on board)",
      "Indian meals through the tour (except breakfast, buffets and meals on cruise) — veg options available",
      "Private air-conditioned vehicle and English-speaking guide at every city",
      "All entrance fees as per programme",
      "Ba Na Hills cable car, Golden Bridge and Fantasy Park entry",
      "Hon Thom world's-longest sea cable car + Aquatopia Water Park ticket",
      "VinWonders Phu Quoc 1-day ticket + Grand World entrance",
      "Bamboo basket-boat ride at Cam Thanh Coconut Forest",
      "Boat trips at Ninh Binh (Tam Coc) and the Mekong Delta",
      "One bottle of water per person per tour day",
      "Tipping for guides and drivers",
    ],
    exclusions: [
      "International and domestic airfare (approx. ₹30,000 return + domestic sectors)",
      "Vietnam e-visa (USD 25-30 per person)",
      "Beverages and any meals not mentioned in the programme",
      "Optional activities — alpine coaster, wine cellar, wax museum and paid games at Fantasy Park",
      "Early check-in / late check-out at hotels",
      "Travel insurance and personal expenses",
      "Surcharge for holiday-period travel (Christmas, New Year, Vietnam Independence Day)",
      "TCS where applicable",
    ],
    highlights: [
      "Halong Bay deluxe overnight cruise",
      "Ba Na Hills Golden Bridge (the giant stone hands)",
      "Hon Thom — world's longest sea-crossing cable car (~8 km)",
      "VinWonders Phu Quoc theme park",
      "Hoi An Ancient Town (UNESCO) + lantern night market",
      "Ninh Binh Tam Coc — 'Halong Bay on land'",
      "Saigon + Mekong Delta sampan cruise",
    ],
    transparencyNote:
      "This is a fixed-departure group tour (September 2026), priced on twin/triple sharing. Land cost is approx. ₹94,000 (3+4★) to ₹1,06,000 (4★) per person; international and domestic airfare (~₹30,000+) is additional. Itinerary order may shift slightly based on the final Halong cruise and flight timings. An optional 2-night Sapa extension (Moana Sapa + Fansipan cable car) can be added before the main tour.",
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Arrive Hanoi — Tran Quoc Pagoda & the Old Quarter",
        description:
          "Land at Noi Bai Airport where our guide and driver welcome you. The first stop is Tran Quoc Pagoda, the oldest Buddhist temple in Hanoi, set on a little island in West Lake. Then a walk through the Old Quarter — the famous '36 Streets', each historically named after the trade once sold there. Check in and unwind, followed by dinner at an Indian restaurant.",
        activities: ["Airport welcome", "Tran Quoc Pagoda", "Old Quarter 36 Streets walk", "Indian dinner"],
        meals: "Dinner",
        accommodation: "Thang Long Espana or similar (Hanoi, 3★) / La Casa Hanoi (4★)",
        highlight: "Tran Quoc Pagoda on West Lake",
        image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1600&h=900&fit=crop",
      },
      {
        day: 2,
        title: "Ninh Binh — Hoa Lu & Tam Coc 'Halong on Land'",
        description:
          "After breakfast, drive to Ninh Binh province. Visit Hoa Lu, the ancient capital of Vietnam (968-1010 AD) under the Dinh, Le and Ly dynasties. Then a 1.5-hour bamboo boat through Tam Coc — paddy fields, river, sky and a stunning cave system the Vietnamese call 'Halong Bay on land'. Dinner and return to Hanoi for the night.",
        activities: ["Hoa Lu ancient capital", "Tam Coc 1.5-hr bamboo boat", "Cave system", "Dinner"],
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Hanoi",
        distance: "Approx. 100 km each way",
        highlight: "Tam Coc bamboo boat through the karst caves",
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&h=900&fit=crop",
      },
      {
        day: 3,
        title: "Halong Bay — Overnight on a Deluxe Cruise",
        description:
          "Drive to Halong Bay (about 3 hrs) and board your cruise at Tuan Chau Marina around midday. Welcome drink, cabin check-in and lunch as you sail into the bay. Afternoon at the Surprising (Sung Sot) Cave — the most beautiful in Halong — then Titop Island for a swim and the climb to the summit viewpoint. Sunset party on the sundeck with a spring-roll cooking class, dinner and an overnight on board.",
        activities: ["Tuan Chau Marina embarkation", "Sung Sot 'Surprising' Cave", "Titop Island summit", "Sunset party", "Spring-roll cooking class"],
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Le Journey Premium Cruise — Deluxe or similar (overnight on board)",
        highlight: "Sunset over Halong Bay from the sundeck",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&h=900&fit=crop",
      },
      {
        day: 4,
        title: "Halong Half-Day → Fly Hanoi to Da Nang",
        description:
          "Breakfast on board as the boat cruises to the natural preservation area. Kayak to Luon Cave — keep an eye out for the cliff monkeys — and continue past Dog Islet before disembarking around noon at Tuan Chau. Transfer back to Hanoi, dinner, then an evening flight to Da Nang (after 21:00). Our driver escorts you to the Da Nang hotel.",
        activities: ["Breakfast cruising", "Kayaking at Luon Cave", "Dog Islet", "Transfer to Hanoi", "Evening flight to Da Nang"],
        meals: "Breakfast, Brunch, Dinner",
        accommodation: "Sepon Blue Da Nang or similar (3★) / Yarra Ocean Suite (4★)",
        highlight: "Kayaking into Luon Cave",
        image: "https://images.unsplash.com/photo-1540611025311-01df3cee54b5?w=1600&h=900&fit=crop",
      },
      {
        day: 5,
        title: "Son Tra · Marble Mountains · Coconut Forest · Hoi An",
        description:
          "Begin at Son Tra ('Monkey Mountain') and Linh Ung Pagoda, home to the 67-metre Goddess of Mercy — the tallest in Southeast Asia. Next the Marble Mountains with their caves and Buddhist pagodas, and the Non Nuoc stone-carving village. Then Cam Thanh Coconut Forest for a hands-on basket-boat ride. The afternoon belongs to Hoi An Ancient Town — Phuc Kien Pagoda, the Japanese Covered Bridge, Phung Hung old house and the central market — staying for the shimmering lantern night market.",
        activities: ["Linh Ung Pagoda (Son Tra)", "Marble Mountains", "Non Nuoc stone village", "Cam Thanh basket-boat", "Hoi An Old Town", "Lantern night market"],
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Da Nang",
        highlight: "Hoi An's lantern-lit night market",
        image: "https://images.unsplash.com/photo-1540611025311-01df3cee54b5?w=1600&h=900&fit=crop",
      },
      {
        day: 6,
        title: "Ba Na Hills & the Golden Bridge",
        description:
          "Ride the Suoi Mo cable-car system — holder of four world records — up the mountain past white-foaming waterfalls and primeval forest. Visit Linh Ung Pagoda and the 27-metre Shakyamuni Buddha, the 'Le Jardin d'Amour' flower garden, and the world-famous Golden Bridge held aloft by two giant stone hands at 1,400 m. A second cable line takes you to the summit and Fantasy Park — the third-largest indoor amusement park in the world (most games free). The last cable car down is 15:00.",
        activities: ["Suoi Mo cable car", "Linh Ung Pagoda & 27m Buddha", "Golden Bridge", "Le Jardin d'Amour", "Fantasy Park", "French Village"],
        meals: "Breakfast, Lunch (buffet), Dinner",
        accommodation: "Hotel in Da Nang",
        elevation: "1,400 m at the Golden Bridge",
        highlight: "The Golden Bridge held by giant stone hands",
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&h=900&fit=crop",
      },
      {
        day: 7,
        title: "Fly to Phu Quoc — Grand World",
        description:
          "Drive to Da Nang airport and fly to Phu Quoc, Vietnam's largest island. After hotel check-in, head to Grand World for a vibrant evening — sightseeing, canal walks and the Bamboo Legend traditional performance. Dinner and overnight on the island.",
        activities: ["Flight to Phu Quoc", "Grand World", "Canal walk", "Bamboo Legend show"],
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Gaia Phu Quoc or similar (3★) / AVS Hotel Phu Quoc (4★)",
        highlight: "Bamboo Legend show at Grand World",
        image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1600&h=900&fit=crop",
      },
      {
        day: 8,
        title: "Hon Thom Sea Cable Car · Aquatopia · Sunset Town",
        description:
          "Drive to An Thoi station and ride the world's longest sea-crossing cable car — almost 8 km across the ocean — to Hon Thom island, with panoramic views of turquoise water, islets and fishing boats. Spend the day at Aquatopia Water Park (20+ slides), then cable-car back to the mainland. Close the day in Sunset Town's European-style streets with a sunset at the iconic Kiss Bridge.",
        activities: ["Hon Thom 8 km sea cable car", "Aquatopia Water Park", "Sunset Town", "Kiss Bridge sunset"],
        meals: "Breakfast, Lunch (buffet), Dinner",
        accommodation: "Hotel in Phu Quoc",
        highlight: "World's longest sea-crossing cable car (~8 km)",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&h=900&fit=crop",
      },
      {
        day: 9,
        title: "VinWonders Phu Quoc — Full Day",
        description:
          "A full day at VinWonders, one of Vietnam's largest theme parks — thrilling rides, themed zones and a water park. Dinner and overnight in Phu Quoc.",
        activities: ["VinWonders theme park", "Themed zones", "Water park"],
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Phu Quoc",
        highlight: "VinWonders rides and themed zones",
        image: "https://images.unsplash.com/photo-1540611025311-01df3cee54b5?w=1600&h=900&fit=crop",
      },
      {
        day: 10,
        title: "Fly to Ho Chi Minh City — Ben Thanh Market",
        description:
          "Fly to Ho Chi Minh City; our driver escorts you to the hotel. In the late afternoon, explore and shop at the bustling Ben Thanh Market. Evening free to discover Saigon's energy on your own.",
        activities: ["Flight to Ho Chi Minh City", "Ben Thanh Market", "Evening in Saigon"],
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Queen Ann Saigon or similar (3★) / Sky Gem Ben Thanh (4★)",
        highlight: "Ben Thanh Market browsing",
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&h=900&fit=crop",
      },
      {
        day: 11,
        title: "Ho Chi Minh City — Full-Day Tour",
        description:
          "A full city tour starting at the Independence (Reunification) Palace, then the War Remnants Museum for a powerful look at Vietnam's past. A short walk reaches two French-colonial landmarks — the Central Post Office and Notre Dame Cathedral (1877-1883). Continue west to Cho Lon (the Big Market) and Thien Hau Pagoda in Chinatown.",
        activities: ["Independence Palace", "War Remnants Museum", "Central Post Office", "Notre Dame Cathedral", "Cho Lon", "Thien Hau Pagoda"],
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Ho Chi Minh City",
        highlight: "Reunification Palace & colonial Saigon",
        image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1600&h=900&fit=crop",
      },
      {
        day: 12,
        title: "Mekong Delta — My Tho & the Tien River",
        description:
          "Drive into the Mekong Delta past green rice paddies, stopping at Vinh Trang — the biggest pagoda in the delta. At My Tho, a boat on the Tien River weaves past the four islands (Dragon, Unicorn, Phoenix and Tortoise). Glide a small canal by sampan, cycle a little through the village, visit a coconut-candy workshop, taste seasonal fruit with honey tea, and hear Southern Vietnamese folk music performed by locals. Return to Saigon for dinner.",
        activities: ["Vinh Trang Pagoda", "My Tho Tien River boat", "Sampan canal", "Coconut-candy workshop", "Folk music"],
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Ho Chi Minh City",
        distance: "Approx. 70 km to My Tho",
        highlight: "Sampan through the Mekong's coconut canals",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&h=900&fit=crop",
      },
      {
        day: 13,
        title: "Departure",
        description:
          "Breakfast at the hotel and time to relax until check-out at noon. Based on your flight time, our driver escorts you to the airport. End of service.",
        activities: ["Leisure morning", "Airport transfer"],
        meals: "Breakfast",
        accommodation: "N/A — Departure",
        highlight: "A complete north-to-south Vietnam journey",
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&h=900&fit=crop",
      },
    ],
  },
'''

placeholder_block = find_package_block(content, "Vietnam Grand 14 Nights — Custom PDF Tour")
if placeholder_block is None:
    print("Vietnam placeholder NOT FOUND — aborting")
    sys.exit(1)
start, end = placeholder_block
content = content[:start] + VIETNAM_TOUR + content[end:]
print("REPLACED: Vietnam placeholder -> real 13D V9 Group Tour")

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"\nDone. New length: {len(content)} chars")
