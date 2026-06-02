# -*- coding: utf-8 -*-
"""Strip the hard-coded ' | TravelSense' suffix from page metadata titles.
The root layout template '%s | TravelSense' already appends the brand, so pages
that also include it produced a doubled '... | TravelSense | TravelSense' title.
Keep layout.tsx (which owns the template) untouched."""
import sys, io, glob
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

files = glob.glob('src/app/**/*.tsx', recursive=True) + glob.glob('src/app/**/*.ts', recursive=True)
changed = 0
for f in files:
    norm = f.replace('\\', '/')
    if norm.endswith('app/layout.tsx'):
        continue
    t = open(f, encoding='utf-8').read()
    o = t
    t = t.replace(' | TravelSense"', '"')
    t = t.replace(' | TravelSense`', '`')
    if t != o:
        open(f, 'w', encoding='utf-8').write(t)
        changed += 1
        print("fixed:", norm)
print("files changed:", changed)
