from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
)

# Brand colors
NAVY = colors.HexColor("#0A1425")
CHERRY = colors.HexColor("#C4324A")
GOLD = colors.HexColor("#D4A853")
SILVER = colors.HexColor("#8A9BB5")
LIGHT_BG = colors.HexColor("#F8F9FB")
DARK_TEXT = colors.HexColor("#1A1F2E")

output_path = r"E:\TravelSense\travelsense\docs\TravelSense_Phase1_Status.pdf"

doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    leftMargin=14 * mm,
    rightMargin=14 * mm,
    topMargin=16 * mm,
    bottomMargin=14 * mm,
)

styles = getSampleStyleSheet()

# Custom styles
title_style = ParagraphStyle(
    "TitleStyle",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=26,
    textColor=NAVY,
    alignment=TA_CENTER,
    spaceAfter=4,
    leading=32,
)

subtitle_style = ParagraphStyle(
    "SubtitleStyle",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=11,
    textColor=SILVER,
    alignment=TA_CENTER,
    spaceAfter=14,
)

section_style = ParagraphStyle(
    "SectionStyle",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=13,
    textColor=CHERRY,
    spaceBefore=6,
    spaceAfter=4,
    leading=15,
)

cell_style = ParagraphStyle(
    "CellStyle",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.5,
    textColor=DARK_TEXT,
    leading=13,
)

cell_bold = ParagraphStyle(
    "CellBold",
    parent=cell_style,
    fontName="Helvetica-Bold",
    fontSize=10,
    textColor=NAVY,
    leading=13,
)

footer_style = ParagraphStyle(
    "FooterStyle",
    parent=styles["Normal"],
    fontName="Helvetica-Oblique",
    fontSize=10,
    textColor=SILVER,
    alignment=TA_CENTER,
)

pending_style = ParagraphStyle(
    "PendingStyle",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8,
    textColor=DARK_TEXT,
    leading=10,
)

# ─── Build Story ────────────────────────────────────────────────────────

story = []

# Header
story.append(Paragraph("TravelSense - Phase 1 Delivery Status", title_style))
story.append(Paragraph(
    "Live at <b>travelsense.co.in</b>  |  April 2026",
    subtitle_style,
))

# Summary banner
banner_data = [[
    Paragraph(
        '<font color="#0A1425" size="11">'
        '29 pages built &nbsp;|&nbsp; 8 API routes live &nbsp;|&nbsp; '
        '20 destinations &nbsp;|&nbsp; 13 packages &nbsp;|&nbsp; 8 blog articles'
        '</font>',
        cell_style,
    )
]]
banner = Table(banner_data, colWidths=[182 * mm])
banner.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), SILVER),
    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("TOPPADDING", (0, 0), (-1, -1), 11),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 11),
    ("LEFTPADDING", (0, 0), (-1, -1), 10),
    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ("ROUNDEDCORNERS", [4, 4, 4, 4]),
]))
story.append(banner)
story.append(Spacer(1, 14))

# ─── Section 1: DELIVERED ───────────────────────────────────────────────

delivered_heading = Table([[
    Paragraph(
        '<font color="white" size="13"><b>&nbsp; DELIVERED &nbsp;</b></font>'
        '<font color="#0A1425" size="12"><b>&nbsp;&nbsp; Built &amp; Live on Production</b></font>',
        cell_style,
    )
]], colWidths=[182 * mm])
delivered_heading.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#1E7E3E")),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("TOPPADDING", (0, 0), (-1, -1), 7),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ("LEFTPADDING", (0, 0), (-1, -1), 8),
]))
story.append(delivered_heading)
story.append(Spacer(1, 6))

delivered_data = [
    # Header
    [
        Paragraph("<b>Area</b>", cell_bold),
        Paragraph("<b>What's Built</b>", cell_bold),
    ],
    [
        Paragraph("Homepage", cell_bold),
        Paragraph(
            "12 sections - 3D interactive globe, animated hero, destinations showcase, packages, "
            "categories, testimonials, how-it-works journey, trust stats, newsletter, CTAs",
            cell_style,
        ),
    ],
    [
        Paragraph("Destinations", cell_bold),
        Paragraph(
            "20 destinations (India + International) - listing page with filters + detail pages "
            "with hero, gallery (6 images each), highlights, practical tips, popular experiences",
            cell_style,
        ),
    ],
    [
        Paragraph("Packages", cell_bold),
        Paragraph(
            "13 travel packages incl. Char Dham Helicopter - listing with filters + detail pages "
            "with <b>gamified visual itinerary</b> (zigzag timeline, day-by-day images, meals, "
            "accommodation, elevation badges, progress tracker)",
            cell_style,
        ),
    ],
    [
        Paragraph("Blog", cell_bold),
        Paragraph(
            "8 full-length travel articles (400-600 words each) with cover images, author cards, "
            "category filters, tags, related posts - real travel advice and destination guides",
            cell_style,
        ),
    ],
    [
        Paragraph("Categories", cell_bold),
        Paragraph(
            "4 category pages - Leisure, Adventure, Educational, Sports - with tailored packages "
            "and destinations per category",
            cell_style,
        ),
    ],
    [
        Paragraph("Booking Forms", cell_bold),
        Paragraph(
            "Consultation, Vehicle Request, Visa Inquiry, Contact, Newsletter, Itinerary Builder, "
            "Hotels Interest - all with validation, success/error toasts, Supabase integration",
            cell_style,
        ),
    ],
    [
        Paragraph("Marketing Pages", cell_bold),
        Paragraph(
            "About (with founder story + 5-milestone timeline), Contact (with Google Maps embed), "
            "Services, FAQ, Gallery (20 travel photos in 6 categories), Privacy Policy, Terms",
            cell_style,
        ),
    ],
    [
        Paragraph("Admin Panel", cell_bold),
        Paragraph(
            "Password-protected dashboard with stats, inquiries management, bookings overview, "
            "analytics page - cookie-based authentication",
            cell_style,
        ),
    ],
    [
        Paragraph("API & Database", cell_bold),
        Paragraph(
            "8 API routes with Zod validation - connected to Supabase PostgreSQL with 6 tables "
            "(contact inquiries, consultations, vehicle requests, visa inquiries, newsletter, leads)",
            cell_style,
        ),
    ],
    [
        Paragraph("SEO & Performance", cell_bold),
        Paragraph(
            "Auto-generated sitemap.xml, robots.txt, meta tags, Open Graph tags, JSON-LD schemas "
            "(Organization, Service, Breadcrumbs), analytics components ready (GA4 + Meta Pixel)",
            cell_style,
        ),
    ],
    [
        Paragraph("Design System", cell_bold),
        Paragraph(
            "Brand identity - Navy/Cherry/Gold palette, Michroma + Exo 2 typography, responsive "
            "across all devices, smooth Framer Motion animations, custom error/loading/404 pages",
            cell_style,
        ),
    ],
    [
        Paragraph("Deployment", cell_bold),
        Paragraph(
            "GitHub repo > Vercel auto-deploy > Custom domain <b>travelsense.co.in</b> with SSL, "
            "environment variables configured",
            cell_style,
        ),
    ],
]

delivered_table = Table(
    delivered_data,
    colWidths=[38 * mm, 144 * mm],
    repeatRows=1,
)
delivered_table.setStyle(TableStyle([
    # Header row
    ("BACKGROUND", (0, 0), (-1, 0), NAVY),
    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
    # All cells
    ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
    ("FONTSIZE", (0, 0), (-1, -1), 10),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("TOPPADDING", (0, 0), (-1, -1), 9),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ("LEFTPADDING", (0, 0), (-1, -1), 10),
    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    # Grid
    ("GRID", (0, 0), (-1, -1), 0.25, SILVER),
    # Alternating row background
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT_BG]),
]))
story.append(delivered_table)
story.append(Spacer(1, 16))

# ─── Footer ─────────────────────────────────────────────────────────────

footer_text = (
    "<b>Built by Sol8um for TravelSense &nbsp;|&nbsp; travelsense.co.in</b>"
)
story.append(Paragraph(footer_text, footer_style))

# Build
doc.build(story)
print(f"PDF generated: {output_path}")
