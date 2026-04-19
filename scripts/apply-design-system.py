"""Apply TravelSense design-system heading transforms across src/**.tsx.
Safe, conservative: only touches exact class substrings — never structural changes.
"""
import re
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / "src"

# (pattern regex, replacement, description)
REPLACEMENTS = [
    # "font-heading ... font-normal tracking-wide" (most common) — keep color/size, swap weight/tracking
    (
        r'font-heading ([^"]*?)font-normal tracking-wide(?!st|r)',
        r'font-heading \1font-medium tracking-[-0.015em] leading-[1.15]',
    ),
    # font-heading ... font-normal tracking-widest
    (
        r'font-heading ([^"]*?)font-normal tracking-widest',
        r'font-heading \1font-medium tracking-[-0.015em] leading-[1.15]',
    ),
    # font-heading ... font-normal tracking-wider
    (
        r'font-heading ([^"]*?)font-normal tracking-wider',
        r'font-heading \1font-medium tracking-[-0.015em] leading-[1.15]',
    ),
    # font-heading ... tracking-wide (no explicit font-normal)
    (
        r'font-heading ([^"]*?)\btracking-wide\b(?!st|r)',
        r'font-heading \1font-medium tracking-[-0.015em] leading-[1.15]',
    ),
    # font-heading ... tracking-widest (no font-normal)
    (
        r'font-heading ([^"]*?)\btracking-widest\b',
        r'font-heading \1font-medium tracking-[-0.015em] leading-[1.15]',
    ),
    # font-heading ... tracking-wider (no font-normal)
    (
        r'font-heading ([^"]*?)\btracking-wider\b',
        r'font-heading \1font-medium tracking-[-0.015em] leading-[1.15]',
    ),
    # Some use arbitrary tracking like tracking-[0.08em], tracking-[0.12em] with font-heading and h2/h3 scale
    (
        r'font-heading ([^"]*?)font-normal tracking-\[0\.08em\]',
        r'font-heading \1font-medium tracking-[-0.02em] leading-[1.08]',
    ),
    (
        r'font-heading ([^"]*?)font-normal tracking-\[0\.12em\]',
        r'font-heading \1font-medium tracking-[-0.02em] leading-[1.06]',
    ),
    (
        r'font-heading ([^"]*?)font-normal tracking-\[0\.15em\]',
        r'font-heading \1font-medium tracking-[-0.02em] leading-[1.06]',
    ),
    # Stats/labels using font-heading+uppercase+tracking → swap to body tracked caps
    (
        r'font-heading ([^"]*?)tracking-\[0\.3em\] uppercase',
        r'font-body \1font-semibold tracking-[0.28em] uppercase',
    ),
    (
        r'font-heading font-normal tracking-\[0\.2em\] uppercase',
        r'font-body font-semibold tracking-[0.24em] uppercase',
    ),
]

EXCLUDE_DIRS = {".next", "node_modules", "public"}
# Files we already edited by hand — don't double-touch
EXCLUDE_FILES = {
    # Already fully editorial
    "LandingPage.tsx",
    "SectionHeading.tsx",
    "PageHero.tsx",
    "LeadCaptureModal.tsx",
    "Footer.tsx",
    "Header.tsx",
    "BlogCard.tsx",
    "BlogContent.tsx",
    "RelatedPosts.tsx",
    "AuthorCard.tsx",
    "DestinationCard.tsx",
    "PackageCard.tsx",
}

def should_skip(path: Path) -> bool:
    if any(part in EXCLUDE_DIRS for part in path.parts):
        return True
    return False

changed = []
scanned = 0
for tsx in SRC.rglob("*.tsx"):
    if should_skip(tsx):
        continue
    scanned += 1
    original = tsx.read_text(encoding="utf-8")
    new = original
    for pattern, repl in REPLACEMENTS:
        new = re.sub(pattern, repl, new)
    if new != original:
        tsx.write_text(new, encoding="utf-8")
        diffs = sum(1 for _ in re.finditer(r'font-medium tracking-\[-0\.0', new)) - sum(
            1 for _ in re.finditer(r'font-medium tracking-\[-0\.0', original)
        )
        changed.append((tsx.relative_to(SRC), diffs))

print(f"Scanned {scanned} .tsx files under src/")
print(f"Modified {len(changed)} files:")
for path, delta in changed:
    print(f"  + {path}  ({delta:+d} editorial headings)")
