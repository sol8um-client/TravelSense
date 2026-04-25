"""Bulk replace old phone/email/V9 references across the codebase."""
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / 'src'

REPLACEMENTS = [
    # Phone variants → new TravelSense number
    ('+91-9876543210', '+918087453658'),
    ('+91 9876543210', '+918087453658'),
    ('919876543210', '918087453658'),
    ('9876543210', '8087453658'),
    # Email → new TravelSense email
    ('hello@travelsense.in', 'travelsensepvtltd@gmail.com'),
]

# Files already updated by hand — skip
SKIP = {
    'config/site.ts',
    'config/company.ts',
    'lib/constants.ts',
    'lib/seo.ts',
    'components/contact/ContactInfo.tsx',
    'app/templates/letterhead/page.tsx',
    'app/templates/invoice/page.tsx',
}

changed = 0
for f in SRC.rglob('*'):
    if not f.is_file() or f.suffix not in ('.ts', '.tsx'):
        continue
    rel = f.relative_to(SRC).as_posix()
    if rel in SKIP:
        continue
    text = f.read_text(encoding='utf-8')
    new = text
    for old, new_val in REPLACEMENTS:
        new = new.replace(old, new_val)
    if new != text:
        f.write_text(new, encoding='utf-8')
        changed += 1
        print(f'  + {rel}')

print(f'\nReplaced contact refs in {changed} files')
