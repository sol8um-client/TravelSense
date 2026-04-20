"""Swap flat dark card backgrounds for glass-card-dark per design system.
Only touches `rounded-2xl border border-white/10 bg-[opaque-dark]` patterns.
Leaves existing glass-card / glass-card-dark / bg-white/N alone.
"""
import re
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / "src"

# Patterns that indicate a flat dark card begging to be glass
CARD_PATTERNS = [
    # rounded-2xl border border-white/10 bg-[#0A1425]
    (
        r'rounded-2xl border border-white/10 bg-\[#0A1425\]',
        'rounded-2xl glass-card-dark',
    ),
    (
        r'rounded-2xl border border-white/10 bg-\[#060B15\]',
        'rounded-2xl glass-card-dark',
    ),
    (
        r'rounded-2xl border border-white/10 bg-primary-dark',
        'rounded-2xl glass-card-dark',
    ),
    (
        r'rounded-2xl border border-white/10 bg-primary(?![-/a-z])',
        'rounded-2xl glass-card-dark',
    ),
    # Same with rounded-xl
    (
        r'rounded-xl border border-white/10 bg-\[#0A1425\]',
        'rounded-xl glass-card-dark',
    ),
    (
        r'rounded-xl border border-white/10 bg-\[#060B15\]',
        'rounded-xl glass-card-dark',
    ),
]

# Already-hand-edited files (skip)
EXCLUDE_FILES = {
    "AboutContent.tsx",  # just did
    "LandingPage.tsx",   # has its own glass treatment
}

changed = []
scanned = 0
for tsx in SRC.rglob("*.tsx"):
    if tsx.name in EXCLUDE_FILES:
        continue
    scanned += 1
    original = tsx.read_text(encoding="utf-8")
    new = original
    swaps = 0
    for pattern, repl in CARD_PATTERNS:
        new2, n = re.subn(pattern, repl, new)
        new = new2
        swaps += n
    if new != original:
        tsx.write_text(new, encoding="utf-8")
        changed.append((tsx.relative_to(SRC), swaps))

print(f"Scanned {scanned} .tsx files")
print(f"Modified {len(changed)} files:")
for path, n in changed:
    print(f"  + {path}  (+{n} cards)")
