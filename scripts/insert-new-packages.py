"""Insert Maharashtra Shirdi pkg + Telangana Hyderabad 4N pkg into packages.ts"""
import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PATH = r'E:\TravelSense\travelsense\src\data\packages.ts'
with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()

shirdi_pkg = '''  {
    title: "3 Jyotirlinga + Shirdi + Shani Shingnapur + Daulatabad",
    slug: "maharashtra-jyot-shirdi-shani-daulatabad",
    destinationName: "Maharashtra",
    destinationSlug: "maharashtra",
    category: "educational",
    description:
      "A focused 5-day Maharashtra pilgrimage covering all three Jyotirlingas of the state — Bhimashankar, Trimbakeshwar, Grishneshwar — alongside Shirdi (Sai Baba), Shani Shingnapur (Lord Shani) and the Daulatabad Fort near Aurangabad. The most-asked Maharashtra spiritual circuit for first-time devotees, starting and ending at Pune.",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&h=900&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545158539-4e6d35bb84a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574183656312-3d8013f59c64?w=800&h=600&fit=crop",
    ],
    duration: { days: 5, nights: 4 },
    price: 15000,
    discountedPrice: 13000,
    difficulty: "Easy",
    groupSize: { min: 2, max: 18 },
    rating: 4.7,
    reviewCount: 62,
    inclusions: [
      "Pickup and drop at Pune",
      "4 nights accommodation in temple-town lodges/hotels",
      "Daily breakfast and dinner (pure-veg)",
      "All transfers in private AC vehicle",
      "Toll, parking, driver allowance",
    ],
    exclusions: [
      "Pooja, archana and special darshan tickets at any temple",
      "Lunches and personal expenses",
      "Camera/video fees inside temples",
      "VIP/skip-the-line darshan charges",
      "Travel insurance",
      "Tips and gratuities",
    ],
    highlights: [
      "All 3 Maharashtra Jyotirlingas (Bhimashankar, Trimbakeshwar, Grishneshwar)",
      "Shirdi Sai Baba samadhi darshan",
      "Shani Shingnapur — Lord Shani temple",
      "Daulatabad Fort & Ellora caves stop",
      "Pune-to-Pune round trip",
    ],
    featured: false,
    itinerary: [
      {
        day: 1,
        title: "Pune → Bhimashankar → Shirdi",
        description:
          "Pre-dawn pickup at Pune and drive to Bhimashankar Jyotirlinga in the Sahyadri ghats (≈110 km). Darshan and aarti. Drive to Shirdi (≈210 km) by evening. Visit Sai Baba samadhi mandir for the evening Shej Aarti. Overnight Shirdi.",
        activities: ["Bhimashankar Jyotirlinga darshan", "Drive to Shirdi", "Shej Aarti at Sai Baba samadhi"],
        meals: "Breakfast, Dinner",
        accommodation: "Lodge in Shirdi",
        distance: "Approx. 320 km / 7-8 hrs total",
        highlight: "Bhimashankar darshan",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&h=900&fit=crop",
      },
      {
        day: 2,
        title: "Shirdi — Sai Darshan + Shani Shingnapur Day Trip",
        description:
          "Early Kakad Aarti at Sai Baba samadhi mandir followed by full darshan. Mid-morning drive to Shani Shingnapur (≈70 km) for darshan of Lord Shani. Visit Dwarkamai and Chavadi back at Shirdi. Evening Shej Aarti. Overnight Shirdi.",
        activities: ["Kakad Aarti", "Sai Baba full darshan", "Shani Shingnapur darshan", "Dwarkamai + Chavadi"],
        meals: "Breakfast, Dinner",
        accommodation: "Lodge in Shirdi",
        distance: "Approx. 140 km round trip to Shani Shingnapur",
        highlight: "Shani Shingnapur darshan",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&h=900&fit=crop",
      },
      {
        day: 3,
        title: "Shirdi → Trimbakeshwar → Nashik",
        description:
          "Drive to Trimbakeshwar Jyotirlinga (≈90 km) at the source of the Godavari river. Darshan, abhishek (optional), and the Kushavarta Tirth. Drive to Nashik (≈30 km) and visit Kalaram Mandir, Panchavati and Tapovan. Overnight Nashik.",
        activities: ["Trimbakeshwar Jyotirlinga darshan", "Kushavarta Tirth", "Kalaram Mandir Nashik", "Panchavati Tapovan"],
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Nashik",
        distance: "Approx. 120 km",
        highlight: "Trimbakeshwar darshan at the Godavari source",
        image: "https://images.unsplash.com/photo-1545158539-4e6d35bb84a9?w=1600&h=900&fit=crop",
      },
      {
        day: 4,
        title: "Nashik → Aurangabad — Grishneshwar & Daulatabad",
        description:
          "Drive to Aurangabad (≈210 km). Afternoon visit Grishneshwar Jyotirlinga — the last of the 12 Jyotirlingas — at Verul, right next to Ellora. A brief stop at Ellora Cave 16 (Kailasa Temple) if time permits. Drive to Daulatabad Fort for sunset — the medieval hill fort once Muhammad bin Tughluq's capital. Overnight Aurangabad.",
        activities: ["Drive to Aurangabad", "Grishneshwar Jyotirlinga", "Ellora Kailasa Temple stop", "Daulatabad Fort sunset"],
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Aurangabad",
        distance: "Approx. 230 km",
        highlight: "Grishneshwar Jyotirlinga — completes Maharashtra's Jyotirlinga trio",
        image: "https://images.unsplash.com/photo-1574183656312-3d8013f59c64?w=1600&h=900&fit=crop",
      },
      {
        day: 5,
        title: "Aurangabad → Pune Departure",
        description:
          "Morning visit to Bibi ka Maqbara (Aurangabad's mini-Taj) if interested. Drive back to Pune (≈235 km) and drop at airport/railway station. Trip concludes.",
        activities: ["Bibi ka Maqbara", "Drive Aurangabad → Pune", "Drop at Pune airport/station"],
        meals: "Breakfast",
        accommodation: "N/A — Departure",
        distance: "Approx. 235 km",
        highlight: "A clean Jyotirlinga-plus-Sai circuit",
        image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1600&h=900&fit=crop",
      },
    ],
  },
'''

hyd_pkg = '''  {
    title: "Hyderabad City Break — Charminar, Golconda, Falaknuma & Ramoji",
    slug: "hyderabad-city-break-4n",
    destinationName: "Telangana",
    destinationSlug: "telangana",
    category: "leisure",
    description:
      "A focused 4-night Hyderabad city break — the Charminar and old-city bazaars, Golconda Fort's whispering acoustics, Chowmahalla and Falaknuma palaces, Salar Jung museum, and a full day at Ramoji Film City. The complete Hyderabad sampler for first-time visitors.",
    heroImage: "https://images.unsplash.com/photo-1672997317502-9dc18f4d8a6f?w=1600&h=900&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1672997317502-9dc18f4d8a6f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583309219338-a582f1f9ca6b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567261334392-04abf6c2c4ff?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    ],
    duration: { days: 5, nights: 4 },
    price: 17500,
    discountedPrice: 15000,
    difficulty: "Easy",
    groupSize: { min: 2, max: 20 },
    rating: 4.6,
    reviewCount: 88,
    inclusions: [
      "Airport/station pickup and drop in Hyderabad",
      "4 nights accommodation in a 3-star hotel",
      "Daily breakfast",
      "All sightseeing by private AC vehicle",
      "Ramoji Film City full-day entry & internal transport",
    ],
    exclusions: [
      "Airfare/train fare to and from Hyderabad",
      "Monument entry fees (Golconda, Chowmahalla, Salar Jung etc.)",
      "Lunches and dinners",
      "Falaknuma Palace high-tea/dinner (separate booking)",
      "Camera fees",
      "Travel insurance",
      "Tips and gratuities",
    ],
    highlights: [
      "Charminar and old-city bazaars (pearls, bangles, biryani)",
      "Golconda Fort whispering wall acoustics",
      "Ramoji Film City — world's largest film studio",
      "Salar Jung Museum & Chowmahalla Palace",
      "Optional Falaknuma Palace tea/dinner",
    ],
    featured: false,
    itinerary: [
      {
        day: 1,
        title: "Arrive Hyderabad — Charminar & Old City",
        description:
          "Arrive at Hyderabad airport/railway station and transfer to your hotel. Afternoon walking tour of the old city around Charminar — Laad Bazaar for lacquer bangles, Patthargatti for pearls, and a Hyderabadi biryani dinner at Shadab or Bawarchi. Overnight Hyderabad.",
        activities: ["Charminar visit", "Laad Bazaar (bangles)", "Patthargatti (pearls)", "Old-city biryani dinner"],
        meals: "Breakfast",
        accommodation: "Hotel in Hyderabad",
        highlight: "Charminar at sunset",
        image: "https://images.unsplash.com/photo-1672997317502-9dc18f4d8a6f?w=1600&h=900&fit=crop",
      },
      {
        day: 2,
        title: "Golconda Fort, Qutb Shahi Tombs & Chowmahalla Palace",
        description:
          "Morning visit to Golconda Fort — climb to the Bala Hissar pavilion and test the whispering-wall acoustics that carry sound a kilometre. Continue to the Qutb Shahi Tombs nearby. Afternoon at Chowmahalla Palace, seat of the Nizams, and the adjoining Mecca Masjid. Evening at Hussain Sagar lakefront.",
        activities: ["Golconda Fort climb", "Qutb Shahi Tombs", "Chowmahalla Palace", "Mecca Masjid", "Hussain Sagar lake"],
        meals: "Breakfast",
        accommodation: "Hotel in Hyderabad",
        highlight: "Golconda whispering walls",
        image: "https://images.unsplash.com/photo-1583309219338-a582f1f9ca6b?w=1600&h=900&fit=crop",
      },
      {
        day: 3,
        title: "Ramoji Film City — Full Day",
        description:
          "Full-day excursion to Ramoji Film City — the world's largest film-studio complex (1,666 acres, Guinness Record). Guided tour bus through outdoor sets, live action shows, a Wild West attraction, Eureka and Ramoji Tower, and the Bahubali sets. Return by evening. Overnight Hyderabad.",
        activities: ["Ramoji Film City guided tour", "Live-action shows", "Bahubali set", "Eureka park"],
        meals: "Breakfast",
        accommodation: "Hotel in Hyderabad",
        distance: "Approx. 50 km round trip",
        highlight: "Ramoji — world's largest film studio",
        image: "https://images.unsplash.com/photo-1567261334392-04abf6c2c4ff?w=1600&h=900&fit=crop",
      },
      {
        day: 4,
        title: "Salar Jung Museum, Birla Mandir & Optional Falaknuma",
        description:
          "Morning at Salar Jung Museum — one of India's largest single-collector museums (44,000 artefacts). Afternoon at Birla Mandir (white marble temple over the city) and Lumbini Park boat to Buddha statue. Evening optional high-tea at the Taj Falaknuma Palace (the Nizam's residence, now a Taj hotel — separate booking, must be reserved 3 days ahead).",
        activities: ["Salar Jung Museum", "Birla Mandir", "Lumbini Park boat", "Buddha statue Hussain Sagar", "Optional Falaknuma tea"],
        meals: "Breakfast",
        accommodation: "Hotel in Hyderabad",
        highlight: "Falaknuma Palace high-tea (optional)",
        image: "https://images.unsplash.com/photo-1672997317502-9dc18f4d8a6f?w=1600&h=900&fit=crop",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Morning at leisure. Last-minute shopping at Sultan Bazaar or pearl-shopping in Charminar area. Transfer to airport/railway station for departure.",
        activities: ["Free morning", "Optional shopping", "Departure transfer"],
        meals: "Breakfast",
        accommodation: "N/A — Departure",
        highlight: "Pearl pickup",
        image: "https://images.unsplash.com/photo-1672997317502-9dc18f4d8a6f?w=1600&h=900&fit=crop",
      },
    ],
  },
'''


def find_block_end(content, start_pattern_str):
    pat = re.compile(start_pattern_str)
    m = pat.search(content)
    if not m:
        return None
    pkg_start = content.rfind('  {\n', 0, m.start())
    depth = 0
    j = pkg_start
    while j < len(content):
        c = content[j]
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                end = j + 1
                while end < len(content) and content[end] in ',\n':
                    end += 1
                    if content[end-1] == '\n':
                        return end
                return end
        j += 1
    return None


# Insert Shirdi after 3 Jyotirlinga block
end1 = find_block_end(content, r'    title:\s*"3 Jyotirlinga Yatra —')
if end1:
    content = content[:end1] + shirdi_pkg + content[end1:]
    print(f"Inserted Shirdi Maharashtra pkg after position {end1}")
else:
    # Try alternate em-dash
    end1 = find_block_end(content, r'    title:\s*"3 Jyotirlinga Yatra')
    if end1:
        content = content[:end1] + shirdi_pkg + content[end1:]
        print(f"Inserted Shirdi pkg (alt match) after position {end1}")
    else:
        print("FAILED to find 3 Jyotirlinga insertion point")

# Insert Hyderabad after Hyd+Sris+Somasila
end2 = find_block_end(content, r'    title:\s*"Hyderabad \+ Srisailam \+ Somasila')
if end2:
    content = content[:end2] + hyd_pkg + content[end2:]
    print(f"Inserted Hyderabad City Break pkg after position {end2}")
else:
    print("FAILED to find Hyd+Sris+Somasila insertion point")

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done.")
