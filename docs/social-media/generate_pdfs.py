"""
TravelSense Social Media PDF Generator
Generates 4 professional PDFs for social media strategy execution.
"""

import os
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import inch, mm, cm
from reportlab.lib.colors import HexColor, white, black, Color
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, Frame, PageTemplate, BaseDocTemplate
)
from reportlab.pdfgen import canvas
from reportlab.platypus.flowables import Flowable

# ─── Brand Colors ───
NAVY = HexColor("#0A1425")
NAVY_LIGHT = HexColor("#1B2D4E")
CHERRY = HexColor("#C4324A")
GOLD = HexColor("#D4A853")
SILVER = HexColor("#8A9BB5")
BG_LIGHT = HexColor("#F7F8FA")
BG_WARM = HexColor("#FDF8F0")
WHITE = white
BLACK = black
DARK_TEXT = HexColor("#1a1a2e")
MEDIUM_TEXT = HexColor("#444466")
LIGHT_TEXT = HexColor("#666688")
BORDER_LIGHT = HexColor("#E0E4EA")
CHERRY_LIGHT = HexColor("#FEF0F2")
GOLD_LIGHT = HexColor("#FDF6E8")
NAVY_PALE = HexColor("#EEF1F6")

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))


# ─── Utility Classes ───

class ColorBar(Flowable):
    """A colored horizontal bar."""
    def __init__(self, width, height, color):
        Flowable.__init__(self)
        self.width = width
        self.height = height
        self.color = color

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.roundRect(0, 0, self.width, self.height, 2, fill=1, stroke=0)


class CheckboxLine(Flowable):
    """A checkbox with text."""
    def __init__(self, text, width=460, font_size=9.5):
        Flowable.__init__(self)
        self.text = text
        self.width = width
        self.height = 18
        self.font_size = font_size

    def draw(self):
        # Checkbox square
        self.canv.setStrokeColor(SILVER)
        self.canv.setLineWidth(1)
        self.canv.rect(0, 3, 11, 11, fill=0, stroke=1)
        # Text
        self.canv.setFillColor(DARK_TEXT)
        self.canv.setFont("Helvetica", self.font_size)
        self.canv.drawString(18, 4, self.text)


class SectionDivider(Flowable):
    """A thin divider line with optional color accent."""
    def __init__(self, width=480, color=BORDER_LIGHT):
        Flowable.__init__(self)
        self.width = width
        self.height = 8
        self.color = color

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(0.5)
        self.canv.line(0, 4, self.width, 4)


# ─── Shared Styles ───

def get_styles():
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        name='CoverTitle',
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=NAVY,
        alignment=TA_LEFT,
        spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        fontName='Helvetica',
        fontSize=13,
        leading=18,
        textColor=SILVER,
        alignment=TA_LEFT,
        spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name='SectionTitle',
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=22,
        textColor=NAVY,
        spaceBefore=16,
        spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name='SubSection',
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=16,
        textColor=NAVY_LIGHT,
        spaceBefore=10,
        spaceAfter=5,
    ))
    styles.add(ParagraphStyle(
        name='Body',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=DARK_TEXT,
        spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name='BodySmall',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=MEDIUM_TEXT,
        spaceAfter=3,
    ))
    styles.add(ParagraphStyle(
        name='Callout',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=14,
        textColor=CHERRY,
        spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name='Tip',
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=NAVY_LIGHT,
        spaceAfter=4,
        leftIndent=12,
    ))
    styles.add(ParagraphStyle(
        name='TableHeader',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=WHITE,
        alignment=TA_CENTER,
    ))
    styles.add(ParagraphStyle(
        name='TableCell',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=DARK_TEXT,
    ))
    styles.add(ParagraphStyle(
        name='TableCellCenter',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=DARK_TEXT,
        alignment=TA_CENTER,
    ))
    styles.add(ParagraphStyle(
        name='TableCellBold',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=DARK_TEXT,
    ))
    styles.add(ParagraphStyle(
        name='Footer',
        fontName='Helvetica',
        fontSize=7,
        leading=9,
        textColor=SILVER,
        alignment=TA_CENTER,
    ))
    styles.add(ParagraphStyle(
        name='TagStyle',
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=NAVY_LIGHT,
        spaceAfter=2,
    ))
    return styles


def make_cover_page(story, styles, title, subtitle, description_lines=None):
    """Create a branded cover page."""
    story.append(Spacer(1, 60))
    story.append(ColorBar(440, 4, CHERRY))
    story.append(Spacer(1, 20))
    story.append(Paragraph("TRAVELSENSE", ParagraphStyle(
        'BrandName', fontName='Helvetica-Bold', fontSize=12, leading=14,
        textColor=CHERRY, spaceAfter=4, letterSpacing=3
    )))
    story.append(Spacer(1, 8))
    story.append(Paragraph(title, styles['CoverTitle']))
    story.append(Spacer(1, 4))
    story.append(ColorBar(60, 3, GOLD))
    story.append(Spacer(1, 12))
    story.append(Paragraph(subtitle, styles['CoverSubtitle']))

    if description_lines:
        story.append(Spacer(1, 20))
        for line in description_lines:
            story.append(Paragraph(line, styles['Body']))

    story.append(Spacer(1, 40))

    # Meta info box
    meta_data = [
        ['Brand', 'TravelSense (by V9 Travels)', 'Website', 'travelsense.co.in'],
        ['Location', 'Pune, India', 'Date', 'March 2026'],
        ['Audience', '30-35+ Working Professionals', 'Platforms', 'IG, FB, X, LinkedIn'],
    ]
    meta_table = Table(meta_data, colWidths=[70, 150, 70, 150])
    meta_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 8.5),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (2, 0), (2, -1), 'Helvetica-Bold'),
        ('TEXTCOLOR', (0, 0), (0, -1), SILVER),
        ('TEXTCOLOR', (2, 0), (2, -1), SILVER),
        ('TEXTCOLOR', (1, 0), (1, -1), DARK_TEXT),
        ('TEXTCOLOR', (3, 0), (3, -1), DARK_TEXT),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('LINEBELOW', (0, 0), (-1, -2), 0.5, BORDER_LIGHT),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 30))
    story.append(ColorBar(440, 2, NAVY_PALE))
    story.append(PageBreak())


def make_branded_table(data, col_widths, header_color=NAVY):
    """Create a branded table with header row."""
    table = Table(data, colWidths=col_widths, repeatRows=1)
    style_commands = [
        # Header
        ('BACKGROUND', (0, 0), (-1, 0), header_color),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8.5),
        ('ALIGNMENT', (0, 0), (-1, 0), 'CENTER'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('TOPPADDING', (0, 0), (-1, 0), 8),
        # Body
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('TEXTCOLOR', (0, 1), (-1, -1), DARK_TEXT),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 6),
        ('TOPPADDING', (0, 1), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        # Grid
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('LINEBELOW', (0, 0), (-1, 0), 1.5, header_color),
    ]
    # Alternating row colors
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_commands.append(('BACKGROUND', (0, i), (-1, i), BG_LIGHT))
    table.setStyle(TableStyle(style_commands))
    return table


def add_page_footer(canvas_obj, doc):
    """Add footer to every page."""
    canvas_obj.saveState()
    canvas_obj.setFont("Helvetica", 7)
    canvas_obj.setFillColor(SILVER)
    canvas_obj.drawString(doc.leftMargin, 20, "TravelSense Social Media Strategy")
    canvas_obj.drawRightString(doc.width + doc.leftMargin, 20, f"Page {doc.page}")
    # Top accent bar
    canvas_obj.setFillColor(CHERRY)
    canvas_obj.rect(0, A4[1] - 4, A4[0], 4, fill=1, stroke=0)
    canvas_obj.restoreState()


def p(text):
    """Paragraph helper for table cells."""
    return Paragraph(text, ParagraphStyle('CalCell', fontName='Helvetica', fontSize=7.2, leading=10, textColor=DARK_TEXT))

def pb(text):
    """Bold paragraph helper for table cells."""
    return Paragraph(text, ParagraphStyle('CalCellB', fontName='Helvetica-Bold', fontSize=7.2, leading=10, textColor=DARK_TEXT))


def build_doc(filename, story):
    """Build a PDF document with branded template."""
    filepath = os.path.join(OUTPUT_DIR, filename)
    doc = SimpleDocTemplate(
        filepath,
        pagesize=A4,
        topMargin=28,
        bottomMargin=40,
        leftMargin=50,
        rightMargin=50,
    )
    doc.build(story, onFirstPage=add_page_footer, onLaterPages=add_page_footer)
    print(f"  Created: {filepath}")
    return filepath


# ══════════════════════════════════════════════════════════════
# PDF 1: Setup Guide
# ══════════════════════════════════════════════════════════════

def create_setup_guide():
    print("Creating PDF 1: Setup Guide...")
    styles = get_styles()
    story = []

    make_cover_page(story, styles,
        "Social Media\nSetup Guide",
        "One-time setup checklist for all platforms",
        ["Everything you need to register, configure, and prepare",
         "before posting your first piece of content."]
    )

    # ─── Section 1: Handle Registration ───
    story.append(Paragraph("1. Handle Registration", styles['SectionTitle']))
    story.append(ColorBar(40, 3, CHERRY))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Register all handles <b>simultaneously</b> to prevent squatting. First-come-first-served on all platforms.",
        styles['Callout']))
    story.append(Spacer(1, 6))

    handle_data = [
        ['Platform', 'Primary Handle', 'Backup 1', 'Backup 2', 'Notes'],
        ['Instagram', '@travelsense.in', '@thetravelsense', '@travelsensehq', 'Dots allowed on IG'],
        ['Facebook', 'Page: TravelSense\nURL: /travelsensein', '/thetravelsense', '/travelsensehq', 'Display name separate'],
        ['X (Twitter)', '@travelsensein', '@thetravelsense', '@travelsensehq', 'No dots allowed'],
        ['LinkedIn', 'Company: TravelSense\n/company/travelsense-in', '/company/thetravelsense', '--', 'Founder profile is primary'],
        ['YouTube', '@travelsensein', '@thetravelsense', '--', 'For future Shorts'],
        ['Threads', '@travelsense.in', '@thetravelsense', '--', '175M users in India'],
        ['WhatsApp', 'Business Account', '--', '--', 'Company profile + catalog'],
    ]
    story.append(make_branded_table(handle_data, [65, 115, 85, 85, 105]))
    story.append(Spacer(1, 10))

    story.append(Paragraph("Verification Tools", styles['SubSection']))
    tools = [
        "Namechk (namechk.com) -- checks 100+ platforms at once",
        "NameChecker.org -- checks 215+ platforms",
        "Instant Username Search (instantusername.com) -- real-time results",
        "Then verify directly on each platform (tools give estimates only)"
    ]
    for i, tool in enumerate(tools, 1):
        story.append(Paragraph(f"  {i}. {tool}", styles['Body']))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "AVOID: Never use 'travelsenseindia' -- taken by TravelSense India (Delhi). Brand confusion risk.",
        styles['Callout']))

    # ─── Section 2: Bios ───
    story.append(Spacer(1, 10))
    story.append(Paragraph("2. Bios (Copy-Paste Ready)", styles['SectionTitle']))
    story.append(ColorBar(40, 3, GOLD))
    story.append(Spacer(1, 8))

    bios = [
        ("Instagram (150 chars max)",
         "TravelSense | Curated Travel from Pune\n"
         "Your next adventure is one conversation away.\n"
         "Leisure | Adventure | Educational | Sports\n"
         "Book your free consultation\n"
         "travelsense.co.in"),
        ("Facebook Page (About section)",
         "TravelSense -- Premium curated travel experiences for India's working professionals.\n"
         "From weekend getaways to international adventures, we plan it all so you can focus on the experience.\n"
         "Leisure | Adventure | Educational | Sports Travel\n"
         "Based in Pune. Serving all of India.\n"
         "DM us or WhatsApp to start planning."),
        ("X / Twitter (160 chars max)",
         "Curated travel for India's working professionals. We plan, you explore.\n"
         "Leisure | Adventure | Educational | Sports\n"
         "Pune | travelsense.co.in"),
        ("LinkedIn Company Page",
         "TravelSense is a tech-enabled travel platform by V9 Travels, Pune. We design curated travel experiences for working professionals -- from weekend escapes to international adventures across Leisure, Adventure, Educational, and Sports travel.\n\n"
         "Founded by Jayshree Lakhotiya, we combine personal curation with AI-powered planning to make travel effortless."),
        ("LinkedIn -- Jayshree Lakhotiya (Founder)",
         "Founder, TravelSense | Turning India's travel dreams into reality, one curated trip at a time.\n"
         "15+ years in travel | Leisure, Adventure, Educational & Sports Travel\n"
         "Building the travel platform India's professionals deserve."),
        ("WhatsApp Business",
         "TravelSense -- Curated Travel from Pune\n"
         "We plan your perfect trip. You just show up.\n"
         "Leisure | Adventure | Educational | Sports\n"
         "Free consultation available.\n"
         "travelsense.co.in"),
    ]

    for platform, bio in bios:
        story.append(Paragraph(f"<b>{platform}</b>", styles['SubSection']))
        # Create a styled box for the bio text
        bio_lines = bio.split('\n')
        bio_text = '<br/>'.join(bio_lines)
        bio_table = Table([[Paragraph(bio_text, ParagraphStyle(
            'BioText', fontName='Helvetica', fontSize=8.5, leading=13,
            textColor=NAVY_LIGHT,
        ))]], colWidths=[430])
        bio_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), NAVY_PALE),
            ('LEFTPADDING', (0, 0), (-1, -1), 12),
            ('RIGHTPADDING', (0, 0), (-1, -1), 12),
            ('TOPPADDING', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
            ('BOX', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ]))
        story.append(bio_table)
        story.append(Spacer(1, 4))

    story.append(PageBreak())

    # ─── Section 3: Profile & Cover Image Specs ───
    story.append(Paragraph("3. Profile & Cover Image Specs", styles['SectionTitle']))
    story.append(ColorBar(40, 3, CHERRY))
    story.append(Spacer(1, 8))

    img_data = [
        ['Asset', 'Dimensions', 'Format', 'Details'],
        ['Profile Picture\n(all platforms)', '320x320px\n(displays 110x110)', 'PNG/JPG', 'TravelSense logo on white bg.\nSame across ALL platforms.'],
        ['FB Cover', '820x312px desktop\n640x360px mobile safe', 'JPG', 'Destination hero + brand overlay.\nNavy + Cherry + Gold.'],
        ['X Banner', '1500x500px', 'JPG', 'Same style as FB, cropped.'],
        ['LinkedIn Banner\n(Company)', '1128x191px', 'JPG', 'Professional destination panorama\n+ brand overlay.'],
        ['LinkedIn Banner\n(Personal)', '1584x396px', 'JPG', 'Founder-branded travel image.'],
        ['IG Highlights\nCovers', '1080x1920px', 'PNG', 'Navy circles with gold icons:\nDestinations, Reviews, Tips,\nAbout Us, Offers'],
    ]
    story.append(make_branded_table(img_data, [85, 100, 55, 210]))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        'Brand colors for all assets: Navy #0A1425 | Cherry #C4324A | Gold #D4A853',
        styles['Tip']))
    story.append(Paragraph(
        'Tagline for covers: "See it. Feel it. Live it."',
        styles['Tip']))

    # ─── Section 4: Infrastructure Setup ───
    story.append(Spacer(1, 12))
    story.append(Paragraph("4. Infrastructure Setup Checklist", styles['SectionTitle']))
    story.append(ColorBar(40, 3, GOLD))
    story.append(Spacer(1, 10))

    infra_items = [
        ("Meta Business Suite", "Manages IG + FB from one dashboard. Schedule posts, view analytics. FREE."),
        ("WhatsApp Business", "Company profile, product catalog, quick replies, auto welcome message. FREE."),
        ("Meta Pixel", "Install on travelsense.co.in BEFORE running any ads. Track conversions."),
        ("Buffer", "Schedule X + LinkedIn posts. Free plan: 30 posts/channel. $5/month for more."),
        ("Canva Pro", "Design carousels, Stories, Reel covers, templates. Rs 500/month."),
        ("Linktree / Bento", "Link-in-bio for Instagram: Website, WhatsApp, Consultation, Instagram."),
        ("CapCut", "Edit Reels and short-form videos. FREE."),
    ]
    for name, desc in infra_items:
        story.append(CheckboxLine(f"{name}  --  {desc}"))
        story.append(Spacer(1, 2))

    # ─── Section 5: Pre-Launch Checklist ───
    story.append(Spacer(1, 12))
    story.append(Paragraph("5. Pre-Launch Checklist (3-5 Days Before First Post)", styles['SectionTitle']))
    story.append(ColorBar(40, 3, CHERRY))
    story.append(Spacer(1, 10))

    story.append(Paragraph("Accounts & Branding", styles['SubSection']))
    acct_items = [
        "Check handle availability via Namechk + NameChecker + Instant Username Search",
        "Register handles on ALL 7 platforms simultaneously",
        "Upload consistent profile picture (logo on white bg) across all platforms",
        "Upload cover/banner images (FB, X, LinkedIn company + founder)",
        "Write bios per the templates in Section 2",
        "Set up Instagram Highlights covers (5 categories)",
        "Set up link-in-bio tool with: Website, WhatsApp, Consultation, Instagram",
    ]
    for item in acct_items:
        story.append(CheckboxLine(item))
        story.append(Spacer(1, 1))

    story.append(Spacer(1, 6))
    story.append(Paragraph("Content Preparation", styles['SubSection']))
    content_items = [
        "Create first 10 days of content in advance (batch production)",
        "Record 3-5 Reels in advance (destinations, tips, BTS)",
        "Prepare 3 carousels (launch intro, '5 weekend getaways', budget guide)",
        "Write Jayshree's LinkedIn launch post ('Why I'm building TravelSense')",
        "Write X launch thread (4-5 tweets)",
        "Create branded Canva templates for consistent design",
    ]
    for item in content_items:
        story.append(CheckboxLine(item))
        story.append(Spacer(1, 1))

    story.append(Spacer(1, 6))
    story.append(Paragraph("Seeding & Community", styles['SubSection']))
    seed_items = [
        "Follow 50-100 relevant accounts per platform (travel creators, Pune businesses, tourism boards)",
        "Jayshree connects with 50+ professionals on LinkedIn",
        "Join 5-10 relevant Facebook Groups (travel, Pune community, weekend getaways)",
        "Create Facebook Group 'TravelSense Explorers'",
        "Identify 10 Pune-based micro-influencers (1K-10K followers) for Week 2-3 outreach",
        "Set up WhatsApp Business with auto-reply welcome message",
    ]
    for item in seed_items:
        story.append(CheckboxLine(item))
        story.append(Spacer(1, 1))

    build_doc("TravelSense_Social_Media_Setup_Guide.pdf", story)


# ══════════════════════════════════════════════════════════════
# PDF 2: April Content Calendar
# ══════════════════════════════════════════════════════════════

def create_content_calendar():
    print("Creating PDF 2: Content Calendar...")
    styles = get_styles()
    story = []

    make_cover_page(story, styles,
        "April 2026\nContent Calendar",
        "Day-by-day content plan for all 4 platforms",
        ["Your daily reference for what to post, where, and when.",
         "Weeks 1-5 with specific formats, topics, and CTAs."]
    )

    # ─── Content Pillars ───
    story.append(Paragraph("Content Pillars & Mix", styles['SectionTitle']))
    story.append(ColorBar(40, 3, CHERRY))
    story.append(Spacer(1, 8))

    pillar_data = [
        ['Pillar', '%', 'What It Includes', 'Why It Works'],
        ['Destination\nInspiration', '30%', 'Stunning Reels, hidden gems, seasonal guides,\ndrone footage', 'Drives discovery, saves, shares.\nTop-of-funnel.'],
        ['Travel\nIntelligence', '25%', 'Visa timelines, budget breakdowns,\nmistakes to avoid, packing guides', 'Positions as expert. Highest\nsave rate. SEO value.'],
        ['Experience\nStories', '20%', 'Client trip diaries, day-in-the-life,\ntransformation stories', 'Social proof + emotional\nconnection. Converts.'],
        ['BTS /\nFounder', '10%', 'Team intros, planning process,\nJayshree\'s stories', 'Trust-building.\nHumanizes the brand.'],
        ['Social Proof\n& UGC', '10%', 'Customer testimonials, traveler\nphotos, reviews', 'Overcomes trust deficit.\nDecision-stage content.'],
        ['Offers &\nCTAs', '5%', 'Limited deals, early bird, seasonal\npackages, free consultations', 'Direct conversion. Keep at 5%\nto avoid ad fatigue.'],
    ]
    story.append(make_branded_table(pillar_data, [70, 30, 185, 165]))
    story.append(Spacer(1, 12))

    # ─── Posting Times ───
    story.append(Paragraph("Best Posting Times (IST)", styles['SubSection']))
    time_data = [
        ['Platform', 'Best Times', 'Best Days', 'Frequency'],
        ['Instagram Reels', '6:30-9 PM', 'Tue, Wed, Thu', '3-5/week'],
        ['Instagram Carousels', '8-10 AM', 'Tue, Wed, Thu', '2-3/week'],
        ['Instagram Stories', 'Morning + Evening', 'Daily', '3-5/day'],
        ['Facebook Page', '7-9 AM, 12-1 PM, 7-9 PM', 'Wednesday', '3-4/week'],
        ['Facebook Group', 'Anytime', 'Daily', 'Daily engagement'],
        ['X / Twitter', '8-10 AM, 7-9 PM', 'Tue, Wed, Thu', '2-3 tweets/day'],
        ['LinkedIn (Founder)', '8-10 AM, 4-6 PM', 'Tue, Wed, Thu', '3 posts/week'],
        ['LinkedIn (Company)', '8-10 AM', 'Tue, Thu', '1-2 posts/week'],
    ]
    story.append(make_branded_table(time_data, [100, 130, 100, 100], header_color=NAVY_LIGHT))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Key 2026 insight: Keyword-rich captions generate 30% more reach than hashtags. "
        "Use 3-5 hashtags max. Write captions like search queries your audience types.",
        styles['Callout']))

    story.append(PageBreak())

    # ─── Week-by-week calendar ───

    def make_week_header(week_num, dates, theme):
        story.append(Paragraph(f"Week {week_num}: {dates}", styles['SectionTitle']))
        # Theme bar
        theme_table = Table([[Paragraph(f"<b>THEME:</b> {theme}", ParagraphStyle(
            'ThemeText', fontName='Helvetica-Bold', fontSize=9, leading=13, textColor=WHITE
        ))]], colWidths=[450])
        theme_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), CHERRY),
            ('LEFTPADDING', (0, 0), (-1, -1), 12),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(theme_table)
        story.append(Spacer(1, 8))

    # ─── WEEK 1 ───
    make_week_header(1, "Apr 1-6", "LAUNCH WEEK")

    w1_data = [
        [pb('Day'), pb('Instagram'), pb('Facebook'), pb('X / Twitter'), pb('LinkedIn')],
        [p('Mon\nApr 1'),
         p('<b>Carousel:</b> "Introducing TravelSense" (8-10 slides)\n<b>Stories:</b> BTS + Poll\n<b>CTA:</b> Follow us'),
         p('<b>Carousel</b> + founder text story\n<b>Group:</b> Welcome post\n<b>CTA:</b> Join Group'),
         p('<b>Thread:</b> "Why India\'s professionals deserve better travel" (4-5 tweets)\n<b>CTA:</b> Follow + Reply'),
         p('<b>Jayshree:</b> "Why I\'m building TravelSense" (long-form)\n<b>Company:</b> Launch carousel\n<b>CTA:</b> Follow + Connect')],
        [p('Tue\nApr 2'),
         p('<b>Reel:</b> "3 mistakes professionals make planning trips" (25-30s)\n<b>Stories:</b> Tips + AMA\n<b>CTA:</b> DM \'TIPS\''),
         p('<b>Video:</b> Share Reel natively + standalone tip\n<b>CTA:</b> Like + Share'),
         p('<b>Tweet + Poll:</b> "What ruins your trip planning?"\n<b>CTA:</b> Vote + Reply'),
         p('--')],
        [p('Wed\nApr 3'),
         p('<b>Carousel:</b> "5 weekend getaways from Pune" (8-10 slides)\n<b>Stories:</b> Guess the place quiz\n<b>CTA:</b> Save this'),
         p('<b>Group:</b> "What\'s your go-to weekend escape?"\n<b>CTA:</b> Comment'),
         p('--'),
         p('<b>Jayshree:</b> "Why professionals are burning out & how travel fixes it"\n<b>CTA:</b> Comment + Share')],
        [p('Thu\nApr 4'),
         p('<b>Testimonial:</b> Real quote + photo + trip\n<b>CTA:</b> "Want this? DM us"'),
         p('<b>Text + Photos:</b> Longer testimonial\n<b>CTA:</b> Tag a friend'),
         p('<b>Engage:</b> Reply to trending travel conversations\n<b>CTA:</b> --'),
         p('<b>Company:</b> Client success story\n<b>CTA:</b> Follow')],
        [p('Fri\nApr 5'),
         p('<b>Reel:</b> "How we plan your trip in 24h" (30-45s)\n<b>Stories:</b> Team intros + AMA\n<b>CTA:</b> DM \'PLAN\''),
         p('<b>Video:</b> Share Reel + team intro\n<b>CTA:</b> Like'),
         p('--'),
         p('<b>Jayshree:</b> "The planning process agencies don\'t show" (PDF carousel)\n<b>CTA:</b> Save + Share')],
        [p('Sat\nApr 6'),
         p('<b>Poll Carousel:</b> "Pick your dream trip" (4 slides)\n<b>Stories:</b> This or That\n<b>CTA:</b> Vote + DM'),
         p('<b>Poll + Group promo:</b> Same poll\n<b>CTA:</b> Join Group'),
         p('<b>Tweet:</b> "One destination, unlimited budget, 5 days. Where?"\n<b>CTA:</b> Reply'),
         p('--')],
        [p('Sun\nApr 7'),
         p('<b>Carousel:</b> "First 20 get FREE consultation"\n<b>Stories:</b> Countdown\n<b>CTA:</b> DM \'FREE\''),
         p('<b>Post:</b> Share offer + WhatsApp link\n<b>CTA:</b> WhatsApp'),
         p('<b>Thread:</b> Launch offer + pin\n<b>CTA:</b> Reply + DM'),
         p('<b>Jayshree:</b> "We\'re offering 20 free consultations"\n<b>CTA:</b> Comment \'interested\'')],
    ]
    w1_table = Table(w1_data, colWidths=[38, 128, 107, 95, 112])
    w1_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 7.5),
        ('ALIGNMENT', (0, 0), (-1, 0), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('BACKGROUND', (0, 1), (0, -1), NAVY_PALE),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
    ]))
    for i in range(2, len(w1_data)):
        if i % 2 == 0:
            w1_table.setStyle(TableStyle([('BACKGROUND', (1, i), (-1, i), BG_LIGHT)]))
    story.append(w1_table)

    story.append(PageBreak())

    # ─── WEEK 2 ───
    make_week_header(2, "Apr 7-13", "ESTABLISH EXPERTISE")

    w2_data = [
        [pb('Day'), pb('Instagram'), pb('Facebook'), pb('X / Twitter'), pb('LinkedIn')],
        [p('Mon 7'),
         p('<b>Reel:</b> "Ladakh on Rs 25K budget" (30s)'),
         p('Share Reel + budget tips'),
         p('Tip tweet + Poll: "Solo or couple for Ladakh?"'),
         p('--')],
        [p('Tue 8'),
         p('<b>Carousel:</b> "Bali visa guide 2026" (8 slides)'),
         p('Share carousel'),
         p('<b>Thread:</b> "5 visa myths Indians believe"'),
         p('<b>Jayshree:</b> "What I learned from 500+ trips"')],
        [p('Wed 9'),
         p('<b>Stories:</b> This or That + BTS'),
         p('<b>Group:</b> "Your budget for 5-day trip?" poll'),
         p('Trending topic engagement'),
         p('<b>Company:</b> Team spotlight')],
        [p('Thu 10'),
         p('<b>Reel:</b> "POV: Landed in Meghalaya" (15s cinematic)'),
         p('Video: Same Reel natively'),
         p('Quote tweet travel news with hot take'),
         p('--')],
        [p('Fri 11'),
         p('<b>Carousel:</b> "Mahabaleshwar in 48 hours" (8 slides)'),
         p('Share + "Tag someone who needs this"'),
         p('"Weekend plans?" tweet'),
         p('<b>Jayshree:</b> "Weekend trips = new vacation"')],
        [p('Sat 12'),
         p('<b>Stories:</b> Poll + UGC repost'),
         p('<b>Group:</b> Weekend chat thread'),
         p('--'),
         p('--')],
        [p('Sun 13'),
         p('<b>Static:</b> Sunset shot + reflective caption'),
         p('--'),
         p('Inspirational travel quote'),
         p('--')],
    ]
    w2_table = Table(w2_data, colWidths=[42, 130, 110, 100, 110])
    w2_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 7.5),
        ('ALIGNMENT', (0, 0), (-1, 0), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('BACKGROUND', (0, 1), (0, -1), NAVY_PALE),
    ]))
    for i in range(2, len(w2_data)):
        if i % 2 == 0:
            w2_table.setStyle(TableStyle([('BACKGROUND', (1, i), (-1, i), BG_LIGHT)]))
    story.append(w2_table)

    story.append(Spacer(1, 10))
    story.append(Paragraph("Week 2 Engagement Tasks", styles['SubSection']))
    w2_tasks = [
        "Reach out to 3 Pune micro-influencers via DM",
        "Comment on 5 travel creator posts daily",
        "Reply to every DM within 2 hours",
        "Post 3-5 Stories daily (content + interactive mix)",
    ]
    for task in w2_tasks:
        story.append(CheckboxLine(task))
        story.append(Spacer(1, 1))

    story.append(PageBreak())

    # ─── WEEK 3 ───
    make_week_header(3, "Apr 14-20", "BUILD TRUST & SOCIAL PROOF")

    w3_data = [
        [pb('Day'), pb('Instagram'), pb('Facebook'), pb('X / Twitter'), pb('LinkedIn')],
        [p('Mon 14'),
         p('<b>Reel:</b> Client trip diary "3 days in Goa" (45s)'),
         p('Share Reel + longer client story'),
         p('"First client back from Goa..." tweet'),
         p('<b>Jayshree:</b> Story behind first client booking')],
        [p('Tue 15'),
         p('<b>Carousel:</b> "Domestic vs International cost comparison" (10 slides)'),
         p('Share carousel'),
         p('<b>Thread:</b> Price breakdown'),
         p('<b>Company:</b> Industry insight')],
        [p('Wed 16'),
         p('<b>Stories:</b> Q&A "Ask us anything"'),
         p('<b>Group:</b> "Worst travel horror story" discussion'),
         p('Engage trending topics aggressively'),
         p('--')],
        [p('Thu 17'),
         p('<b>Reel:</b> "3 things your travel agent won\'t tell you" (25s)'),
         p('Share Reel natively'),
         p('Hot take tweet about travel industry'),
         p('<b>Jayshree:</b> "Hard truth about travel agencies in India"')],
        [p('Fri 18'),
         p('<b>Carousel:</b> "Andaman 7-day itinerary" (10 slides + DM CTA)'),
         p('Share + "Tag someone who needs this"'),
         p('Poll: "Andaman or Lakshadweep?"'),
         p('--')],
        [p('Sat 19'),
         p('<b>Stories:</b> UGC repost + Highlights update'),
         p('<b>Group:</b> Weekend wanderlust thread'),
         p('--'),
         p('--')],
        [p('Sun 20'),
         p('<b>Static:</b> "Where would you rather be?" + destination photo'),
         p('Inspirational post'),
         p('Sunday travel quote'),
         p('--')],
    ]
    w3_table = Table(w3_data, colWidths=[42, 130, 110, 100, 110])
    w3_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 7.5),
        ('ALIGNMENT', (0, 0), (-1, 0), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('BACKGROUND', (0, 1), (0, -1), NAVY_PALE),
    ]))
    for i in range(2, len(w3_data)):
        if i % 2 == 0:
            w3_table.setStyle(TableStyle([('BACKGROUND', (1, i), (-1, i), BG_LIGHT)]))
    story.append(w3_table)

    story.append(Spacer(1, 10))
    story.append(Paragraph("Week 3 Action Items", styles['SubSection']))
    w3_tasks = [
        "Launch first micro-influencer collaboration (1 Reel + 3 Stories)",
        "Verify Meta Pixel is tracking correctly on travelsense.co.in",
        "Collect 3-5 testimonials from early customers/friends",
        "First Instagram Live: 'Ask a Travel Expert' (30 min, Thu/Fri evening)",
    ]
    for task in w3_tasks:
        story.append(CheckboxLine(task))
        story.append(Spacer(1, 1))

    story.append(PageBreak())

    # ─── WEEK 4 ───
    make_week_header(4, "Apr 21-27", "DRIVE CONVERSIONS + START ADS")

    w4_data = [
        [pb('Day'), pb('Instagram'), pb('Facebook'), pb('X / Twitter'), pb('LinkedIn')],
        [p('Mon 21'),
         p('<b>Reel:</b> "How we plan your trip in 24h" (30s process reveal)'),
         p('Share Reel + text explainer'),
         p('<b>Thread:</b> "What happens after you DM a travel company?"'),
         p('<b>Jayshree:</b> BTS of trip curation (document carousel)')],
        [p('Tue 22'),
         p('<b>Carousel:</b> "Top 5 international trips under Rs 80K" (10 slides + DM CTA)'),
         p('Share + "DM us to book"'),
         p('Summer recommendations thread'),
         p('<b>Company:</b> Summer travel trends')],
        [p('Wed 23'),
         p('<b>Stories:</b> Countdown + "DM SUMMER for early bird pricing"'),
         p('<b>Group:</b> "Summer travel plans?" mega-thread'),
         p('Summer tips + engagement'),
         p('--')],
        [p('Thu 24'),
         p('<b>Reel:</b> Customer testimonial video (30s, UGC-style)'),
         p('Share + testimonial text'),
         p('Share testimonial highlight'),
         p('<b>Jayshree:</b> "The message that made my week"')],
        [p('Fri 25'),
         p('<b>Carousel:</b> "Monsoon getaways -- Book now for July" (8 slides + offer)'),
         p('Share + limited-time offer'),
         p('Weekend + monsoon tips'),
         p('--')],
        [p('Sat 26'),
         p('<b>Stories:</b> "Last 5 slots for summer" + countdown'),
         p('<b>Group:</b> Monsoon destinations poll'),
         p('--'),
         p('--')],
        [p('Sun 27'),
         p('<b>Static:</b> "Why we started TravelSense" + founder photo'),
         p('--'),
         p('Thoughtful travel tweet'),
         p('--')],
    ]
    w4_table = Table(w4_data, colWidths=[42, 130, 110, 100, 110])
    w4_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 7.5),
        ('ALIGNMENT', (0, 0), (-1, 0), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('BACKGROUND', (0, 1), (0, -1), NAVY_PALE),
    ]))
    for i in range(2, len(w4_data)):
        if i % 2 == 0:
            w4_table.setStyle(TableStyle([('BACKGROUND', (1, i), (-1, i), BG_LIGHT)]))
    story.append(w4_table)

    story.append(Spacer(1, 10))
    story.append(Paragraph("Week 4 Ad Launch Tasks", styles['SubSection']))
    w4_tasks = [
        "Launch TOFU Meta Ad: 15-30s vertical video (stunning destinations)",
        "Objective: Video Views | Budget: Rs 500/day | Targeting: Broad, 28-45, India",
        "Set up WhatsApp click-to-chat auto-responses",
        "Create 3 ad creative variations for A/B testing",
        "Monitor daily: CPM, video view rate, audience build rate",
        "Kill underperformers after 3 days / Rs 1,500 with no results",
    ]
    for task in w4_tasks:
        story.append(CheckboxLine(task))
        story.append(Spacer(1, 1))

    story.append(PageBreak())

    # ─── WEEK 5 ───
    make_week_header(5, "Apr 28-30", "MONTH-END WRAP + TEASE MAY")

    w5_data = [
        [pb('Day'), pb('Instagram'), pb('Facebook'), pb('X / Twitter'), pb('LinkedIn')],
        [p('Mon 28'),
         p('<b>Reel:</b> "April recap -- what we built, where we sent people" (30s montage)'),
         p('Share recap + gratitude'),
         p('<b>Thread:</b> "Month 1 in the books. Here\'s what we learned."'),
         p('<b>Jayshree:</b> Month 1 learnings as founder')],
        [p('Tue 29'),
         p('<b>Carousel:</b> "May travel calendar -- best destinations by week" (10 slides)'),
         p('Share + "May is epic" teaser'),
         p('May preview thread'),
         p('<b>Company:</b> May lineup announcement')],
        [p('Wed 30'),
         p('<b>Stories:</b> "Thank you for 1 month!" + milestone + poll for May content'),
         p('<b>Group:</b> "What content do you want in May?"'),
         p('Gratitude tweet + what\'s coming'),
         p('--')],
    ]
    w5_table = Table(w5_data, colWidths=[42, 130, 110, 100, 110])
    w5_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 7.5),
        ('ALIGNMENT', (0, 0), (-1, 0), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('BACKGROUND', (0, 1), (0, -1), NAVY_PALE),
    ]))
    story.append(w5_table)

    story.append(Spacer(1, 16))
    story.append(Paragraph("Month-End Review Checklist", styles['SubSection']))
    review_tasks = [
        "Review analytics across all 4 platforms -- note top 3 performing posts",
        "Calculate engagement rate, follower growth, DM volume, leads captured",
        "Identify what content type worked best (Reel vs Carousel vs Static)",
        "Adjust May strategy based on findings -- double down on winners",
        "Review ad performance -- scale winners, kill losers",
        "Celebrate milestones with team!",
    ]
    for task in review_tasks:
        story.append(CheckboxLine(task))
        story.append(Spacer(1, 1))

    build_doc("TravelSense_April_Content_Calendar.pdf", story)


# ══════════════════════════════════════════════════════════════
# PDF 3: Daily Playbook
# ══════════════════════════════════════════════════════════════

def create_daily_playbook():
    print("Creating PDF 3: Daily Playbook...")
    styles = get_styles()
    story = []

    make_cover_page(story, styles,
        "Daily Playbook",
        "Quick-reference card for daily social media execution",
        ["Print this out. Keep it at your desk.",
         "Everything you need to know in 3 pages."]
    )

    # ─── Daily Routine ───
    story.append(Paragraph("Daily Engagement Routine", styles['SectionTitle']))
    story.append(ColorBar(40, 3, CHERRY))
    story.append(Spacer(1, 8))

    routine_data = [
        [pb('Time Block'), pb('Duration'), pb('Tasks')],
        [p('MORNING\n8-9 AM'),
         p('15 min'),
         p('1. Reply to all overnight DMs and comments\n'
           '2. Like/comment on 5 target accounts\' posts\n'
           '3. Check trending topics on X -- post if relevant\n'
           '4. Post morning Story (travel tip, BTS, or repost)')],
        [p('POST-PUBLISH\n(after each post)'),
         p('15 min'),
         p('1. Stay on platform for 30-45 min after posting\n'
           '2. Reply to EVERY comment within first hour\n'
           '3. Ask follow-up questions in replies (doubles comment count)\n'
           '4. Share post to Stories with a poll or question')],
        [p('EVENING\n7-8 PM'),
         p('15 min'),
         p('1. 3-2-1 rule: Like 3 posts, comment on 2, follow 1\n'
           '2. Post evening Stories (polls, quizzes, questions)\n'
           '3. Check Facebook Group -- respond to discussions\n'
           '4. Check X for conversation opportunities')],
    ]
    r_table = Table(routine_data, colWidths=[90, 55, 320])
    r_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8.5),
        ('ALIGNMENT', (0, 0), (-1, 0), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('BACKGROUND', (0, 1), (0, -1), CHERRY_LIGHT),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('BACKGROUND', (1, 1), (1, -1), GOLD_LIGHT),
    ]))
    story.append(r_table)

    story.append(Spacer(1, 10))

    # Weekly routine
    story.append(Paragraph("Weekly Routine", styles['SubSection']))
    weekly_data = [
        [pb('Day'), pb('Task')],
        [p('Sunday'), p('Plan next week\'s content -- topics, formats, captions, CTAs')],
        [p('Mon-Tue'), p('Create all visual assets for the week (Canva batch production)')],
        [p('Wednesday'), p('Schedule posts for the week using Meta Business Suite + Buffer')],
        [p('Daily'), p('Post Stories, engage, respond to comments/DMs, check trends')],
        [p('Friday'), p('Review week\'s analytics -- note what worked, what didn\'t, adjust')],
    ]
    wk_table = Table(weekly_data, colWidths=[70, 395])
    wk_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY_LIGHT),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('BACKGROUND', (0, 1), (0, -1), NAVY_PALE),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
    ]))
    for i in range(2, len(weekly_data)):
        if i % 2 == 0:
            wk_table.setStyle(TableStyle([('BACKGROUND', (1, i), (-1, i), BG_LIGHT)]))
    story.append(wk_table)

    story.append(Spacer(1, 12))

    # ─── Posting Times Quick Ref ───
    story.append(Paragraph("Posting Times Quick Reference (IST)", styles['SubSection']))
    times_data = [
        [pb('Platform'), pb('Best Times'), pb('Best Days'), pb('Frequency')],
        [p('IG Reels'), p('6:30-9 PM'), p('Tue, Wed, Thu'), p('3-5/week')],
        [p('IG Carousels'), p('8-10 AM'), p('Tue, Wed, Thu'), p('2-3/week')],
        [p('IG Stories'), p('Morning + Evening'), p('Daily'), p('3-5/day')],
        [p('Facebook'), p('7-9 AM, 12-1 PM, 7-9 PM'), p('Wednesday'), p('3-4/week')],
        [p('X / Twitter'), p('8-10 AM, 7-9 PM'), p('Tue-Thu'), p('2-3/day')],
        [p('LinkedIn'), p('8-10 AM, 4-6 PM'), p('Tue-Thu'), p('3/week (founder)')],
    ]
    t_table = Table(times_data, colWidths=[80, 145, 95, 95])
    t_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), CHERRY),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    for i in range(1, len(times_data)):
        if i % 2 == 0:
            t_table.setStyle(TableStyle([('BACKGROUND', (0, i), (-1, i), BG_LIGHT)]))
    story.append(t_table)

    story.append(PageBreak())

    # ─── Hashtag Cheat Sheet ───
    story.append(Paragraph("Hashtag Cheat Sheet", styles['SectionTitle']))
    story.append(ColorBar(40, 3, GOLD))
    story.append(Spacer(1, 8))

    # Key callout
    callout_table = Table([[Paragraph(
        "<b>2026 KEY CHANGE:</b> Keyword-rich captions > Hashtags. Instagram indexes captions like a search engine. "
        "Write captions using terms your audience searches for. Use only 3-5 hashtags per post.",
        ParagraphStyle('CalloutBox', fontName='Helvetica', fontSize=8.5, leading=12, textColor=CHERRY)
    )]], colWidths=[450])
    callout_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CHERRY_LIGHT),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('BOX', (0, 0), (-1, -1), 1, CHERRY),
    ]))
    story.append(callout_table)
    story.append(Spacer(1, 10))

    hash_data = [
        [pb('Category'), pb('Hashtags'), pb('Usage')],
        [p('BRANDED\n(every post)'), p('#TravelWithSense\n#TravelSenseStories\n#CuratedByTravelSense'), p('Always include 1\nbrand tag')],
        [p('HIGH-VOLUME\n(1 per post)'), p('#IncredibleIndia  #IndiaTravel  #TravelIndia\n#Wanderlust  #TravelGram'), p('For reach.\nPick 1 per post.')],
        [p('MID-VOLUME\n(1 per post)'), p('#IndiaClicks  #StoriesOfIndia\n#IndiaTravelDiaries  #DiscoverIndia'), p('For engagement.\nPick 1 per post.')],
        [p('NICHE\n(1-2 per post)'), p('#WeekendGetawayIndia  #PuneToMountains\n#OffbeatIndia  #NorthEastIndia\n#HimalayanTrails  #IndianAdventure'), p('Targeted.\nMatch to content\ntopic.')],
    ]
    h_table = Table(hash_data, colWidths=[85, 240, 120])
    h_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('BACKGROUND', (0, 1), (0, 1), CHERRY_LIGHT),
        ('BACKGROUND', (0, 2), (0, 2), BG_LIGHT),
        ('BACKGROUND', (0, 3), (0, 3), BG_LIGHT),
        ('BACKGROUND', (0, 4), (0, 4), BG_LIGHT),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
    ]))
    story.append(h_table)

    story.append(Spacer(1, 6))
    story.append(Paragraph("Per platform: IG = 3-5 tags | FB = 1-2 | X = 1-2 | LinkedIn = 3-5", styles['Tip']))

    story.append(Spacer(1, 12))

    # ─── Brand Voice ───
    story.append(Paragraph("Brand Voice Quick Reference", styles['SubSection']))
    story.append(Spacer(1, 4))

    voice_data = [
        [pb('Trait'), pb('Sounds Like'), pb('Does NOT Sound Like')],
        [p('Warm & personal'), p('"Let\'s plan your perfect escape"'), p('"Book now! Limited offer!"')],
        [p('Expert, approachable'), p('"Here\'s what most miss about Ladakh"'), p('"As per our extensive research..."')],
        [p('Confident, not pushy'), p('"We\'ve got you covered"'), p('"You NEED to book NOW"')],
        [p('Relatable to pros'), p('"That Monday meeting feeling? Here\'s the cure."'), p('"Wanna travel bro?"')],
        [p('Premium, not pretentious'), p('"Curated for your kind of adventure"'), p('"Luxury only the elite deserve"')],
    ]
    v_table = Table(voice_data, colWidths=[95, 175, 180])
    v_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY_LIGHT),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('BACKGROUND', (2, 1), (2, -1), CHERRY_LIGHT),
    ]))
    for i in range(1, len(voice_data)):
        if i % 2 == 0:
            v_table.setStyle(TableStyle([('BACKGROUND', (0, i), (1, i), BG_LIGHT)]))
    story.append(v_table)

    story.append(Spacer(1, 12))

    # ─── Repurposing Matrix ───
    story.append(Paragraph("Content Repurposing Matrix", styles['SubSection']))
    story.append(Spacer(1, 4))

    repurpose_data = [
        [pb('Original Content'), pb('Repurpose To')],
        [p('Instagram Reel (30s)'), p('Facebook Reel (native) + YouTube Short + Threads video')],
        [p('Instagram Carousel (8-10 slides)'), p('LinkedIn Document/PDF + Facebook carousel + X thread')],
        [p('Long-form LinkedIn post'), p('X Thread (4-6 tweets) + IG carousel (extract key points)')],
        [p('Customer testimonial video'), p('All platforms -- different format per platform')],
        [p('Behind-the-scenes Story'), p('X tweet + LinkedIn personal post (add professional context)')],
        [p('Blog post (when live)'), p('Carousel summary + Thread + LinkedIn article + FB Group post')],
    ]
    rp_table = Table(repurpose_data, colWidths=[165, 300])
    rp_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), GOLD),
        ('TEXTCOLOR', (0, 0), (-1, 0), NAVY),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
    ]))
    for i in range(1, len(repurpose_data)):
        if i % 2 == 0:
            rp_table.setStyle(TableStyle([('BACKGROUND', (0, i), (-1, i), BG_LIGHT)]))
    story.append(rp_table)

    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "Rule: Every piece of content should live on 3+ platforms in adapted formats. Create once, distribute 4x.",
        styles['Callout']))

    build_doc("TravelSense_Daily_Playbook.pdf", story)


# ══════════════════════════════════════════════════════════════
# PDF 4: Meta Ads Playbook
# ══════════════════════════════════════════════════════════════

def create_ads_playbook():
    print("Creating PDF 4: Meta Ads Playbook...")
    styles = get_styles()
    story = []

    make_cover_page(story, styles,
        "Meta Ads\nPlaybook",
        "Lead generation strategy for WhatsApp-first conversions",
        ["Start ads in Week 3-4 after organic presence is established.",
         "WhatsApp click-to-chat as primary CTA -- 40% lower CPL than lead forms."]
    )

    # ─── When to Start ───
    story.append(Paragraph("When to Start Ads", styles['SectionTitle']))
    story.append(ColorBar(40, 3, CHERRY))
    story.append(Spacer(1, 8))

    start_table = Table([[Paragraph(
        "<b>NOT Day 1.</b> Build organic presence for 2-4 weeks first. Ads perform better when the profile has "
        "content, followers, and social proof. <b>Target: Start ads in Week 3-4 (around April 14-21).</b>",
        ParagraphStyle('StartBox', fontName='Helvetica', fontSize=9.5, leading=14, textColor=NAVY)
    )]], colWidths=[450])
    start_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), GOLD_LIGHT),
        ('LEFTPADDING', (0, 0), (-1, -1), 14),
        ('RIGHTPADDING', (0, 0), (-1, -1), 14),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('BOX', (0, 0), (-1, -1), 1, GOLD),
    ]))
    story.append(start_table)

    # ─── Budget Plan ───
    story.append(Spacer(1, 12))
    story.append(Paragraph("Budget Plan", styles['SectionTitle']))
    story.append(ColorBar(40, 3, GOLD))
    story.append(Spacer(1, 8))

    budget_data = [
        ['Phase', 'Daily Budget', 'Monthly Budget', 'Duration', 'Focus'],
        ['Testing\n(Week 3-4)', 'Rs 500-1,000', 'Rs 15-30K', '2 weeks', 'Find winning creatives.\nBuild retarget audiences.'],
        ['Scaling\nWinners', 'Rs 1,000-2,000', 'Rs 30-60K', 'Month 2', 'Scale what works.\nLaunch MOFU retargeting.'],
        ['Full Scale', 'Rs 2,000-5,000', 'Rs 60-150K', 'Month 3+', 'Full funnel active.\nOptimize for ROAS.'],
    ]
    story.append(make_branded_table(budget_data, [70, 80, 85, 70, 155]))

    # ─── 3-Stage Funnel ───
    story.append(Spacer(1, 14))
    story.append(Paragraph("3-Stage Ad Funnel", styles['SectionTitle']))
    story.append(ColorBar(40, 3, CHERRY))
    story.append(Spacer(1, 8))

    # TOFU
    tofu_header = Table([[Paragraph(
        "<b>STAGE 1: TOFU (Top of Funnel) -- AWARENESS -- 40% of Budget</b>",
        ParagraphStyle('FunnelH', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=WHITE)
    )]], colWidths=[460])
    tofu_header.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), NAVY),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(tofu_header)

    tofu_data = [
        ['Format', '9:16 vertical video, 15-30 seconds'],
        ['Content', 'Stunning destination visuals, cinematic travel montages'],
        ['Objective', 'Video Views -- build 50%+ and 75%+ viewer audiences'],
        ['Audience', 'Broad targeting, age 28-45, India, interests: travel, adventure, resorts'],
        ['Creatives', '3-5 variations. Kill losers after 3 days.'],
        ['Goal', 'Build warm audiences for retargeting in Stage 2'],
    ]
    tofu_table = Table(tofu_data, colWidths=[80, 380])
    tofu_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8.5),
        ('TEXTCOLOR', (0, 0), (-1, -1), DARK_TEXT),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LINEBELOW', (0, 0), (-1, -2), 0.5, BORDER_LIGHT),
        ('BACKGROUND', (0, 0), (-1, -1), NAVY_PALE),
    ]))
    story.append(tofu_table)
    story.append(Spacer(1, 10))

    # MOFU
    mofu_header = Table([[Paragraph(
        "<b>STAGE 2: MOFU (Middle of Funnel) -- CONSIDERATION -- 35% of Budget</b>",
        ParagraphStyle('FunnelH2', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=WHITE)
    )]], colWidths=[460])
    mofu_header.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CHERRY),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(mofu_header)

    mofu_data = [
        ['Format', 'Carousel ads with itinerary breakdowns + pricing'],
        ['Content', '"7-Day Bali Trip -- Rs 45,000/person -- Swipe for full itinerary"'],
        ['Objective', 'Messages (WhatsApp click-to-chat) -- NOT lead forms'],
        ['Audience', 'Retarget 50%+ video viewers from Stage 1'],
        ['CTA', '"WhatsApp us to book" -- 40% lower CPL than forms'],
    ]
    mofu_table = Table(mofu_data, colWidths=[80, 380])
    mofu_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8.5),
        ('TEXTCOLOR', (0, 0), (-1, -1), DARK_TEXT),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LINEBELOW', (0, 0), (-1, -2), 0.5, BORDER_LIGHT),
        ('BACKGROUND', (0, 0), (-1, -1), CHERRY_LIGHT),
    ]))
    story.append(mofu_table)
    story.append(Spacer(1, 10))

    # BOFU
    bofu_header = Table([[Paragraph(
        "<b>STAGE 3: BOFU (Bottom of Funnel) -- CONVERSION -- 25% of Budget</b>",
        ParagraphStyle('FunnelH3', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=WHITE)
    )]], colWidths=[460])
    bofu_header.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), HexColor("#2D8B6A")),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(bofu_header)

    bofu_data = [
        ['Format', 'Testimonial/review video ads with urgency'],
        ['Content', 'Real customer talking about trip + "Only 5 slots left for June"'],
        ['Objective', 'Conversions / Lead Generation'],
        ['Audience', 'Retarget website visitors + carousel engagers'],
        ['CTA', 'WhatsApp click-to-chat'],
    ]
    bofu_table = Table(bofu_data, colWidths=[80, 380])
    bofu_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8.5),
        ('TEXTCOLOR', (0, 0), (-1, -1), DARK_TEXT),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LINEBELOW', (0, 0), (-1, -2), 0.5, BORDER_LIGHT),
        ('BACKGROUND', (0, 0), (-1, -1), HexColor("#E8F5F0")),
    ]))
    story.append(bofu_table)

    story.append(PageBreak())

    # ─── WhatsApp Section ───
    story.append(Paragraph("WhatsApp Click-to-Chat: Why It's Critical", styles['SectionTitle']))
    story.append(ColorBar(40, 3, CHERRY))
    story.append(Spacer(1, 8))

    wa_stats = [
        ['Metric', 'WhatsApp', 'Lead Forms', 'Advantage'],
        ['CPL (India)', 'Rs 5-15 per conversation', 'Rs 80-350 per lead', '40% lower CPL'],
        ['Open Rate', '95% within 3 minutes', '20-25% (email)', '4x higher'],
        ['Conversion Rate', '45-60%', '2-5% (email/SMS)', '10-20x higher'],
        ['India Users', '535 million', '--', 'Largest chat platform'],
        ['Free Window', '72 hours after click', '--', 'All messages free'],
    ]
    story.append(make_branded_table(wa_stats, [80, 130, 110, 110], header_color=HexColor("#25D366")))

    story.append(Spacer(1, 10))
    story.append(Paragraph("WhatsApp Setup Checklist", styles['SubSection']))
    wa_items = [
        "Create WhatsApp Business account with company profile and logo",
        "Set up auto welcome message: 'Hey! Thanks for reaching out to TravelSense...'",
        "Configure quick replies for: pricing, process, destinations, booking",
        "Create WhatsApp broadcast lists for seasonal offers and nurturing",
        "Respond to every message within 60 seconds for highest conversion",
    ]
    for item in wa_items:
        story.append(CheckboxLine(item))
        story.append(Spacer(1, 1))

    # ─── Creative Guidelines ───
    story.append(Spacer(1, 12))
    story.append(Paragraph("Ad Creative Guidelines", styles['SectionTitle']))
    story.append(ColorBar(40, 3, GOLD))
    story.append(Spacer(1, 8))

    creative_data = [
        ['Rule', 'Why'],
        ['UGC-style video > polished studio', '4x higher CTR. Authenticity wins in India.'],
        ['9:16 vertical with audio', '12% higher conversion per rupee than other formats.'],
        ['Static images = higher CPM', '40% more expensive than Reels. Always use video.'],
        ['Hook in first 3 seconds', 'Text overlay + movement. You lose 50% of viewers by second 3.'],
        ['Always add captions/subtitles', 'Most watch without sound. Captions are not optional.'],
        ['Strong CTA: "WhatsApp us"', 'Indians prefer chat over forms. Always.'],
        ['Test 3-5 creative variations', 'Per ad set. Different hooks, same offer.'],
        ['Kill losers after 3 days', 'Or Rs 1,500 spend with zero leads. Don\'t wait.'],
    ]
    story.append(make_branded_table(creative_data, [200, 260], header_color=NAVY_LIGHT))

    # ─── CPL Benchmarks ───
    story.append(Spacer(1, 12))
    story.append(Paragraph("CPL Benchmarks (India 2026)", styles['SubSection']))

    cpl_data = [
        ['Channel', 'Expected CPL', 'Notes'],
        ['WhatsApp click-to-chat', 'Rs 5-15 per conversation', 'Lowest CPL. Highest conversion.'],
        ['Lead form (Meta)', 'Rs 80-350 per lead', 'Higher drop-off. 30% abandonment.'],
        ['Website traffic to form', 'Rs 200-500 per warm lead', 'Needs optimized landing page.'],
        ['India CPM', '~$2.60 (Rs 215)', 'Tier 3 market. Very cost-effective.'],
    ]
    story.append(make_branded_table(cpl_data, [130, 130, 200]))

    story.append(PageBreak())

    # ─── Tracking Setup ───
    story.append(Paragraph("Tracking & Pixel Setup Checklist", styles['SectionTitle']))
    story.append(ColorBar(40, 3, CHERRY))
    story.append(Spacer(1, 10))

    tracking_items = [
        "Install Meta Pixel on travelsense.co.in (BEFORE running any ads)",
        "Configure conversion events: Lead form submit, WhatsApp click, Consultation booked",
        "Create Custom Audience: Website visitors (last 30 days)",
        "Create Custom Audience: Video viewers 50%+ (from TOFU ads)",
        "Create Custom Audience: Video viewers 75%+ (high intent)",
        "Create Custom Audience: Instagram/FB engagers (last 90 days)",
        "Create Lookalike Audience: Based on leads/customers (for Month 2 scaling)",
        "Set up UTM tracking for all ad links",
        "Verify Pixel fires on key pages (homepage, consultation, thank-you)",
        "Review ad performance daily for first 2 weeks, then every 2-3 days",
    ]
    for item in tracking_items:
        story.append(CheckboxLine(item))
        story.append(Spacer(1, 2))

    # ─── KPIs ───
    story.append(Spacer(1, 12))
    story.append(Paragraph("KPIs & Success Metrics", styles['SectionTitle']))
    story.append(ColorBar(40, 3, GOLD))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Month 1 Targets (April 2026)", styles['SubSection']))
    m1_data = [
        ['Metric', 'Instagram', 'Facebook', 'X', 'LinkedIn'],
        ['Followers', '300-500', '200-300 (Page)\n+100 (Group)', '100-200', '100-200 (Page)\n+500 (Founder)'],
        ['Posts Published', '16-20 feed\n+10-15 Reels', '14-16 Page\n+daily Group', '60-80 tweets', '8-12 Founder\n+6-8 Company'],
        ['Engagement Rate', '3-5%', '1-3%', '0.5-1.5%', '2-4%'],
        ['DMs/Inquiries', '20-30', '10-15', '5-10', '5-10'],
        ['Total Leads', '15-25 across all platforms', '', '', ''],
    ]
    story.append(make_branded_table(m1_data, [80, 90, 90, 80, 100]))
    story.append(Spacer(1, 10))

    story.append(Paragraph("Month 3 & 6 Targets", styles['SubSection']))
    m36_data = [
        ['Metric', 'Month 3 (June)', 'Month 6 (September)'],
        ['Total Followers (all)', '2,000-3,000', '10,000-15,000'],
        ['Monthly Leads', '50-100', '100-200'],
        ['CPL (ads)', 'Rs 80-300 (WhatsApp)', 'Optimized / decreasing'],
        ['Trips Booked from Social', '5-10', '15-25'],
        ['IG Engagement Rate', '4-6%', '3-5% (larger audience)'],
        ['WhatsApp Conversations/mo', '100-200', '300-500'],
        ['Pipeline Status', 'Growing', 'Self-sustaining'],
    ]
    story.append(make_branded_table(m36_data, [140, 160, 160]))

    story.append(Spacer(1, 12))

    # ─── Ad Testing Rules ───
    story.append(Paragraph("Ad Testing Rules", styles['SubSection']))

    rules_table = Table([[Paragraph(
        "<b>The 3-Day Rule:</b> Give each creative 3 days and Rs 1,500 of spend. If no leads, kill it.<br/><br/>"
        "<b>The 3-5 Rule:</b> Always test 3-5 creative variations per ad set. Different hooks, same offer.<br/><br/>"
        "<b>The 20% Rule:</b> Scale winning campaigns by 20-30% weekly. Never more than 30% at once.<br/><br/>"
        "<b>The Daily Review:</b> Check performance every day for the first 2 weeks. After that, every 2-3 days.<br/><br/>"
        "<b>Key Metrics:</b> CPL (primary), CTR (target 2%+), Video View Rate (50%+), ROAS (when available).",
        ParagraphStyle('RulesBox', fontName='Helvetica', fontSize=9, leading=14, textColor=NAVY)
    )]], colWidths=[450])
    rules_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), GOLD_LIGHT),
        ('LEFTPADDING', (0, 0), (-1, -1), 14),
        ('RIGHTPADDING', (0, 0), (-1, -1), 14),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('BOX', (0, 0), (-1, -1), 1, GOLD),
    ]))
    story.append(rules_table)

    build_doc("TravelSense_Meta_Ads_Playbook.pdf", story)


# ══════════════════════════════════════════════════════════════
# Main
# ══════════════════════════════════════════════════════════════

if __name__ == "__main__":
    print("\n=== TravelSense PDF Generator ===\n")
    create_setup_guide()
    create_content_calendar()
    create_daily_playbook()
    create_ads_playbook()
    print(f"\nAll 4 PDFs created in: {OUTPUT_DIR}")
    print("Done!")
