"""Remove the Education travel category from all live surfaces (client request,
June 2026). The 30 education-tagged packages are ARCHIVED in code (kept in the
data file) but filtered out of the live `packages` export, so they vanish from
listings, search, sitemap, destination pages and the category page — reversible
by deleting one filter line. Flagship education-tagged *destinations* (Rajasthan,
Varanasi, etc.) are untouched (their category field isn't surfaced)."""
import io, re, sys

ROOT = r"E:\TravelSense\travelsense"
results = []

def rd(p):
    with io.open(ROOT + "\\" + p, "r", encoding="utf-8") as f:
        return f.read()

def wr(p, s):
    with io.open(ROOT + "\\" + p, "w", encoding="utf-8", newline="") as f:
        f.write(s)

def rep(p, old, new, expect=1):
    s = rd(p)
    n = s.count(old)
    if n != expect:
        results.append(f"WARN {p}: found {n}x (expected {expect}) for: {old[:55]!r}")
        return
    wr(p, s.replace(old, new))
    results.append(f"ok   {p}: replaced {n}x  {old[:45]!r}")

def sub(p, pattern, new, expect=1, flags=0):
    s = rd(p)
    n = len(re.findall(pattern, s, flags))
    if n != expect:
        results.append(f"WARN {p}: regex found {n} (expected {expect}) for {pattern[:45]!r}")
        return
    wr(p, re.sub(pattern, new, s, flags=flags))
    results.append(f"ok   {p}: regex {n}x  {pattern[:40]!r}")

# 1. config/categories.ts — drop the educational category object (last in array)
sub("src/config/categories.ts",
    r'\n  \{\n    id: "educational",[\s\S]*?\n  \},',
    "", expect=1)

# 2. config/navigation.ts — drop the two Educational entries
rep("src/config/navigation.ts",
    '      {\n        title: "Educational",\n        href: "/categories/educational",\n        description: "Learning-focused trips & student tours",\n      },\n',
    "")
rep("src/config/navigation.ts",
    '    { title: "Educational Travel", href: "/categories/educational" },\n',
    "")

# 3. data/packages.ts — archive-in-place: rename array, re-export filtered
rep("src/data/packages.ts",
    "export const packages: Package[] = [",
    "const allPackages: Package[] = [")
s = rd("src/data/packages.ts")
if s.rstrip().endswith("]") and "export const packages: Package[] = allPackages" not in s:
    s = s.rstrip() + (
        "\n\n// Education category archived (client request, June 2026): the education-tagged\n"
        "// packages remain in the data above but are hidden from the live site. Restore by\n"
        "// removing this filter.\n"
        'export const packages: Package[] = allPackages.filter((p) => p.category !== "educational")\n'
    )
    wr("src/data/packages.ts", s)
    results.append("ok   packages.ts: appended filtered export")
else:
    results.append("WARN packages.ts: could not append filtered export")

# 4. sitemap.ts — drop hardcoded educational category URL
rep("src/app/sitemap.ts",
    '    { url: `${SITE_URL}/categories/educational`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },\n',
    "")

# 5. ConsultationForm.tsx — drop the Educational interest option
rep("src/components/booking/ConsultationForm.tsx",
    '  { id: "educational", label: "Educational" },\n',
    "")

# 6-12. Copy mentions that list the three categories -> two
for p in ["src/config/site.ts", "src/app/layout.tsx", "src/lib/seo.ts",
          "src/app/categories/page.tsx", "src/app/packages/page.tsx",
          "src/app/(marketing)/faq/page.tsx", "src/components/layout/Footer.tsx"]:
    s = rd(p)
    if "leisure, adventure, and educational" in s:
        s = s.replace("leisure, adventure, and educational", "leisure and adventure")
        wr(p, s)
        results.append(f"ok   {p}: 'leisure, adventure, and educational' -> 'leisure and adventure'")
    else:
        results.append(f"WARN {p}: phrase not found")

# keyword-array entries
rep("src/config/site.ts", '    "educational travel",\n', "")
rep("src/app/layout.tsx", '    "educational travel",\n', "")

# 13. vehicles — incidental use-case phrasing
rep("src/app/vehicles/page.tsx",
    "corporate outings, and educational tours.",
    "corporate outings, and group tours.")

# 14. admin mock data
rep("src/app/admin/bookings/page.tsx", "Educational, Heritage", "Heritage")

# 15. About timeline milestone — reword off the education claim
rep("src/components/about/AboutContent.tsx",
    "Introduced educational tours for schools and colleges, broadening beyond leisure into specialised group travel. Distinct travel categories now under one roof.",
    "Expanded into specialised group travel for families and corporates, broadening beyond pure leisure. Distinct travel experiences now under one roof.")

# 16. Homepage LandingPage — drop Education card, renumber, fix headline + USP strip + section height
rep("src/components/home/LandingPage.tsx",
    '  { title: "Education", place: "Varanasi", tagline: "Learn & grow", coord: "25.31°N · 83.01°E", desc: "Heritage walks, cultural immersions and field trips that turn the world into your classroom.", image: "/images/generated/varanasi-hero.webp", num: "02", stat: "20+ programs", accent: "#1F8A7A", slug: "educational" },\n',
    "")
rep("src/components/home/LandingPage.tsx", 'num: "03", stat: "25+ experiences"', 'num: "02", stat: "25+ experiences"')
rep("src/components/home/LandingPage.tsx", "Three ways to <em>explore.</em>", "Two ways to <em>explore.</em>")
rep("src/components/home/LandingPage.tsx", 'desc: "Leisure + Adventure + Education"', 'desc: "Leisure & Adventure"')
rep("src/components/home/LandingPage.tsx",
    'className="relative bg-white" style={{ height: "320vh" }}',
    'className="relative bg-white" style={{ height: `${CATS.length * 110}vh` }}')

print("\n".join(results))
warns = [r for r in results if r.startswith("WARN")]
print(f"\n{len(warns)} warnings, {len(results)-len(warns)} ok")
sys.exit(1 if warns else 0)
