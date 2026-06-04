"""Add the 3 Japan packages (from the client's 'Itinerary routes' docx tables)
to src/data/packages.ts. Faithful to her Option 1/2/3 day tables."""
import json, io, os

IMGS = [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&h=900&fit=crop",
]

def acc(city):
    if not city:
        return "N/A - Departure"
    if city == "Hakone":
        return "Ryokan / onsen hotel in Hakone"
    return f"Hotel in {city}"

opt1 = [
    dict(t="Arrive in Tokyo - Shinjuku Foodie Tour", d="Land in Tokyo and transfer to your hotel. In the evening, dive into the city's food scene on a guided Shinjuku foodie tour through izakaya alleys and the neon of Kabukicho.", a=["Airport transfer","Shinjuku foodie tour","Kabukicho neon walk"], city="Tokyo", meals="Dinner"),
    dict(t="Tokyo City Tour - Temples & Akihabara", d="A full city tour takes in Tokyo's landmark temples and historic sites, then the electric energy of the Akihabara district - anime, gaming and gadget heaven.", a=["Senso-ji & historic sites","Akihabara district","City sightseeing"], city="Tokyo", meals="Breakfast"),
    dict(t="Sumo in Ryogoku & TeamLab Planets", d="Watch a morning sumo practice in Ryogoku followed by a wrestler-style chanko lunch, then a self-guided visit to the immersive TeamLab Planets digital-art museum.", a=["Sumo practice (Ryogoku)","Chanko lunch","TeamLab Planets"], city="Tokyo", meals="Breakfast & lunch"),
    dict(t="Mount Fuji, Lake Kawaguchi & Whisky", d="Day excursion to the wonders of Mount Fuji and Lake Kawaguchi for Japan's most iconic views, finishing with a Japanese whisky tasting.", a=["Mount Fuji viewpoints","Lake Kawaguchi","Whisky tasting"], city="Tokyo", meals="Breakfast"),
    dict(t="Bullet Train to Kyoto - Samurai & Tea", d="Ride the shinkansen west to Kyoto. Explore the Samurai & Ninja Museum and slow down for a traditional kimono tea ceremony.", a=["Shinkansen to Kyoto","Samurai Ninja Museum","Kimono tea ceremony"], city="Kyoto", meals="Breakfast"),
    dict(t="Kyoto's Most Historic Sites", d="A full day among Kyoto's greatest hits - golden Kinkaku-ji, the thousand torii of Fushimi Inari and the temples and geisha lanes of the old imperial capital.", a=["Kinkaku-ji","Fushimi Inari","Gion district"], city="Kyoto", meals="Breakfast"),
    dict(t="Arashiyama - Bamboo Grove & Monkey Park", d="Explore Arashiyama: the towering bamboo grove, the Iwatayama Monkey Park and the gardens of Tenryu-ji Temple.", a=["Arashiyama bamboo grove","Monkey Park","Tenryu-ji Temple"], city="Kyoto", meals="Breakfast"),
    dict(t="Train to Osaka - Castle & Dotonbori", d="Transfer to Osaka and visit Osaka Castle, then the shopping of Shinsaibashi and the dazzling neon lights of Dotonbori by night.", a=["Osaka Castle","Shinsaibashi","Dotonbori neon"], city="Osaka", meals="Breakfast"),
    dict(t="Day Trip to Hiroshima & Miyajima", d="A day trip to Hiroshima for the moving Peace Memorial Park, then the floating torii of Itsukushima Shrine on Miyajima island.", a=["Peace Memorial Park","Itsukushima Shrine","Miyajima island"], city="Osaka", meals="Breakfast"),
    dict(t="Depart Osaka", d="After breakfast, transfer to the airport for your onward journey home.", a=["Airport transfer","Departure"], city="", meals="Breakfast"),
]

opt2 = [
    dict(t="Arrive in Osaka", d="Arrive in Osaka and transfer to your hotel; settle in to Japan's friendly kitchen city.", a=["Airport transfer","Check-in"], city="Osaka", meals="Dinner"),
    dict(t="Train to Kyoto", d="Travel to Kyoto, the old imperial capital, and begin exploring its temples and traditional streets.", a=["Transfer to Kyoto","Old town orientation"], city="Kyoto", meals="Breakfast"),
    dict(t="Fushimi Inari Shrine Hike", d="Hike the hillside tunnel of thousands of vermilion torii gates at Fushimi Inari, one of Japan's most photographed sights.", a=["Fushimi Inari hike","Torii gates"], city="Kyoto", meals="Breakfast"),
    dict(t="Day Trip to Nara & Uji", d="Day trip to Nara for its bowing deer and giant bronze Buddha at Todai-ji, and to Uji, home of Japan's finest green tea.", a=["Nara deer park","Todai-ji Great Buddha","Uji tea town"], city="Kyoto", meals="Breakfast"),
    dict(t="Train to Hiroshima - Memorial Visits", d="Travel to Hiroshima and visit the Peace Memorial Park and Museum - a powerful and moving experience.", a=["Transfer to Hiroshima","Peace Memorial Park & Museum"], city="Hiroshima", meals="Breakfast"),
    dict(t="Hiroshima / Miyajima Private Tour", d="A private tour of Hiroshima and the sacred island of Miyajima with its iconic floating torii gate.", a=["Miyajima island","Itsukushima floating torii","Private guide"], city="Hiroshima", meals="Breakfast"),
    dict(t="Fly to Okinawa - Beach Day", d="Fly south to the subtropical islands of Okinawa for white-sand beaches and turquoise water.", a=["Flight to Okinawa","Beach time"], city="Okinawa", meals="Breakfast"),
    dict(t="Tokashiki Island Tour", d="A self-guided day on Tokashiki Island - some of Okinawa's clearest water for snorkelling and swimming.", a=["Tokashiki Island","Snorkelling","Kerama beaches"], city="Okinawa", meals="Breakfast"),
    dict(t="Fly to Hakone - Onsen Experience", d="Fly back to the mainland for Hakone, where a traditional onsen (hot spring) soak awaits amid Fuji views.", a=["Flight + transfer to Hakone","Onsen hot springs"], city="Hakone", meals="Breakfast & dinner"),
    dict(t="Train to Tokyo - Ginza & Omotesando", d="Transfer to Tokyo and spend the afternoon along the boulevards of Ginza and Omotesando.", a=["Transfer to Tokyo","Ginza","Omotesando"], city="Tokyo", meals="Breakfast"),
    dict(t="Sumo Training & Tokyo Tour", d="Watch a sumo training session, then a guided tour of Tokyo's highlights from Asakusa to the Shibuya crossing.", a=["Sumo training session","Asakusa","Shibuya crossing"], city="Tokyo", meals="Breakfast"),
    dict(t="Depart Tokyo", d="After breakfast, transfer to the airport for your departure.", a=["Airport transfer","Departure"], city="", meals="Breakfast"),
]

opt3 = [
    dict(t="Arrive Osaka - Dotonbori District", d="Arrive in Osaka and take a guided evening tour of the buzzing Dotonbori district and its street-food canals.", a=["Airport transfer","Dotonbori guided tour"], city="Osaka", meals="Dinner"),
    dict(t="Osaka Castle & Kuromon Market", d="Visit the Museum of Housing & Living and Osaka Castle, then graze the gastronomy of Kuromon Ichiba Market.", a=["Museum of Housing & Living","Osaka Castle","Kuromon Market"], city="Osaka", meals="Breakfast"),
    dict(t="Himeji Castle, Kobe Beef & Sake", d="Day trip to the magnificent white Himeji Castle, with a Kobe beef lunch and a sake tasting.", a=["Himeji Castle","Kobe beef lunch","Sake tasting"], city="Osaka", meals="Breakfast & lunch"),
    dict(t="Kyoto - Tea Ceremony & Maiko Dinner", d="Transfer to Kyoto for a tea ceremony and a private maiko (apprentice geisha) dinner show in the evening.", a=["Transfer to Kyoto","Tea ceremony","Private maiko dinner show"], city="Kyoto", meals="Breakfast & dinner"),
    dict(t="Kyoto Historic Sites & Sake Museum", d="Explore Kyoto's historic temples and shrines, then a sake museum tour and tasting.", a=["Kyoto temples","Sake museum","Tasting"], city="Kyoto", meals="Breakfast"),
    dict(t="Ramen Workshop, Train to Tokyo", d="A hands-on ramen noodle workshop before boarding the bullet train to Tokyo.", a=["Ramen factory workshop","Shinkansen to Tokyo"], city="Tokyo", meals="Breakfast"),
    dict(t="Tokyo City Tour & Sumo Hot Pot", d="A guided Tokyo city tour followed by a chanko-nabe sumo hot pot dinner.", a=["Tokyo city tour","Sumo hot pot dinner"], city="Tokyo", meals="Breakfast & dinner"),
    dict(t="Tsukiji Market & Sushi Lesson", d="Explore the Tsukiji Outer Market and master the basics in a sushi-making lesson.", a=["Tsukiji Outer Market","Sushi-making lesson"], city="Tokyo", meals="Breakfast & lunch"),
    dict(t="Mount Fuji & Gotemba Distillery", d="Explore the realm of Mount Fuji, finishing with a tasting at the Fuji Gotemba distillery.", a=["Mount Fuji","Fuji Gotemba distillery","Tasting"], city="Tokyo", meals="Breakfast"),
    dict(t="Fly to Sapporo - Michelin Tasting", d="Fly north to Sapporo in Hokkaido for a self-guided tour of its Michelin-starred restaurants.", a=["Flight to Sapporo","Michelin dining"], city="Sapporo", meals="Breakfast"),
    dict(t="Sapporo City Tour, Beer & BBQ", d="A historic city tour with a beer tasting at the Sapporo Beer Museum and a Genghis Khan barbecue dinner.", a=["Sapporo city tour","Beer tasting","BBQ dinner"], city="Sapporo", meals="Breakfast & dinner"),
    dict(t="Salmon Hot Pot, Transfer to Hakodate", d="A salmon hot pot cooking lesson with a local family, then transfer to the port city of Hakodate.", a=["Salmon hot pot lesson","Transfer to Hakodate"], city="Hakodate", meals="Breakfast & lunch"),
    dict(t="Hakodate Morning Market & City Tour", d="The famous Hakodate Morning Market for a seafood breakfast, followed by a city tour and Mount Hakodate views.", a=["Hakodate Morning Market","Seafood breakfast","City tour"], city="Hakodate", meals="Breakfast"),
    dict(t="Depart Hakodate", d="After breakfast, transfer for your onward departure.", a=["Airport transfer","Departure"], city="", meals="Breakfast"),
]

def days_ts(days):
    out = []
    for i, dd in enumerate(days):
        n = i + 1
        img = IMGS[i % len(IMGS)]
        parts = [
            "      {",
            f"        day: {n},",
            f"        title: {json.dumps(dd['t'])},",
            f"        description:\n          {json.dumps(dd['d'])},",
            f"        activities: {json.dumps(dd['a'])},",
            f"        meals: {json.dumps(dd['meals'])},",
            f"        accommodation: {json.dumps(acc(dd['city']))},",
        ]
        if dd['city']:
            parts.append(f"        highlight: {json.dumps(dd['city'])},")
        parts.append(f"        image: {json.dumps(img)},")
        parts.append("      },")
        out.append("\n".join(parts))
    return "\n".join(out)

def pkg_ts(title, slug, days, nights, price, featured, rating, reviews, highlights,
           itinerary, inclusions, transparency, experience=None):
    lines = []
    lines.append("  {")
    lines.append(f"    title: {json.dumps(title)},")
    lines.append(f"    slug: {json.dumps(slug)},")
    lines.append('    destinationName: "Japan",')
    lines.append('    destinationSlug: "japan",')
    lines.append('    category: "leisure",')
    lines.append(f"    description:\n      {json.dumps(itinerary_desc[slug])},")
    lines.append(f"    heroImage:\n      {json.dumps(IMGS[0])},")
    imgs = json.dumps(IMGS[1:5], indent=0).replace("\n", " ")
    lines.append(f"    images: {json.dumps(IMGS[1:5])},")
    lines.append(f"    duration: {{ days: {days}, nights: {nights} }},")
    lines.append(f"    price: {price},")
    lines.append('    difficulty: "Easy",')
    lines.append("    groupSize: { min: 2, max: 14 },")
    lines.append(f"    rating: {rating},")
    lines.append(f"    reviewCount: {reviews},")
    lines.append(f"    inclusions: {json.dumps(inclusions)},")
    lines.append(f"    exclusions: {json.dumps(EXCL)},")
    lines.append(f"    highlights: {json.dumps(highlights)},")
    lines.append(f"    featured: {str(featured).lower()},")
    if experience:
        lines.append(f"    experienceStory:\n      {json.dumps(experience)},")
    lines.append(f"    transparencyNote:\n      {json.dumps(transparency)},")
    lines.append("    itinerary: [")
    lines.append(days_ts(itinerary))
    lines.append("    ],")
    lines.append("  },")
    return "\n".join(lines)

itinerary_desc = {
    "japan-golden-route": "Japan's classic first-timer route - neon Tokyo, imperial Kyoto and kitchen-of-the-nation Osaka - linked by the shinkansen bullet train, with Mount Fuji, a sumo practice and a Hiroshima day trip along the way.",
    "japan-grand-tour": "A wider loop of Japan beyond the Golden Route - Kyoto and Nara, the moving memorials of Hiroshima and Miyajima, the subtropical beaches of Okinawa, a Hakone onsen and finally Tokyo.",
    "japan-gourmet-trail": "A food-lover's journey the length of Japan - Osaka and Kobe beef, Kyoto's maiko dinner, Tokyo sushi and sumo hot pot, and the seafood, beer and barbecue of Hokkaido from Sapporo to Hakodate.",
}

EXCL = [
    "International airfare to/from Japan",
    "Japan visa fees and documentation charges",
    "Lunches and dinners except where specified",
    "Personal expenses, optional activities and tips",
    "Travel insurance (strongly recommended)",
    "Anything not mentioned under inclusions",
]
INCL_BASE = [
    "Accommodation on twin-sharing (3-4 star / ryokan where noted)",
    "Daily breakfast",
    "Shinkansen bullet-train & intercity rail transfers as per itinerary",
    "Guided tours and experiences listed in the itinerary",
    "Airport transfers on arrival and departure",
    "English-speaking local assistance",
]
INCL_FLY = INCL_BASE[:3] + ["Domestic flights where the route requires (Okinawa / Sapporo)"] + INCL_BASE[3:]
TRANSP = ("Pricing is indicative - per person on twin-sharing, land-only, pending final hotel "
          "selection and travel dates. Japan rates vary sharply by season (cherry-blossom and "
          "autumn peaks cost more). Share your dates and we'll confirm an exact quote. "
          "International airfare and Japan visa fees are additional.")

p1 = pkg_ts("Japan Golden Route - Tokyo, Kyoto & Osaka", "japan-golden-route", 10, 9, 185000, True, 4.9, 16,
            ["Tokyo - Shinjuku & Akihabara","Mount Fuji & Lake Kawaguchi","Sumo practice & chanko","Kyoto Fushimi Inari & Kinkaku-ji","Arashiyama bamboo grove","Hiroshima & Miyajima"],
            opt1, INCL_BASE, TRANSP,
            experience="Japan rewards the curious traveller like nowhere else - bullet trains that glide at 300 km/h, temples older than memory, and food that turns every meal into a small ceremony. This Golden Route threads the three great cities - neon Tokyo, imperial Kyoto and kitchen-of-the-nation Osaka - with Mount Fuji, a sumo morning and Hiroshima along the way.")
p2 = pkg_ts("Japan Grand Tour - Hiroshima, Okinawa & Hakone", "japan-grand-tour", 12, 11, 245000, False, 4.8, 9,
            ["Kyoto Fushimi Inari","Nara deer & Great Buddha","Hiroshima Peace Park","Miyajima floating torii","Okinawa beaches","Hakone onsen & Fuji"],
            opt2, INCL_FLY, TRANSP)
p3 = pkg_ts("Japan Gourmet Trail - Osaka to Hokkaido", "japan-gourmet-trail", 14, 13, 295000, False, 4.9, 7,
            ["Osaka Dotonbori & Kuromon","Himeji Castle & Kobe beef","Kyoto maiko dinner show","Tokyo sushi & sumo hot pot","Sapporo Michelin & beer","Hakodate seafood market"],
            opt3, INCL_FLY, TRANSP)

block = "\n".join([p1, p2, p3]) + "\n"

path = os.path.join("src", "data", "packages.ts")
with io.open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# find the sole top-level array close: a line that is exactly "]"
close_idx = None
for i, ln in enumerate(lines):
    if ln.rstrip("\n") == "]":
        close_idx = i
        break
assert close_idx is not None, "packages array close not found"

new_lines = lines[:close_idx] + [block] + lines[close_idx:]
with io.open(path, "w", encoding="utf-8", newline="\n") as f:
    f.writelines(new_lines)

print(f"Inserted 3 Japan packages before line {close_idx+1}. New file lines: {len(new_lines)}")
