"""
Remove specific packages from src/data/packages.ts by slug.
Each package is a top-level object in the `packages: Package[]` array,
starting with `  {` and ending with `  },` (2-space indent).
"""
import re
from pathlib import Path

SLUGS_TO_REMOVE = {
    # Kashmir — keep only 3 new PDF ones
    "kashmir-gurez-vaishno-devi",
    "kashmir-classic-family",
    "complete-offbeat-kashmir-highlights",
    "gurez-valley-kashmir",
    "kashmir-highlights",
    "kashmir-with-bangus-valley",
    "magical-kashmir-tour-for-family-highlights",
    # Himachal — keep only 4 new PDF ones (remove old "spiti-valley", keep new "spiti-valley-adventure")
    "himachal-pradesh-with-amritsar-and-chandigarh",
    "manali-with-kasol-and-jibhi",
    "shimla-kullu-manali",
    "spiti-valley",
    # Rajasthan — keep only 3 new PDF ones
    "rajasthan-5-days",
    "rajasthan-9-days",
    # Uttarakhand — keep only 3 new PDF ones
    "haridwar-mussoorie-rishikesh-nainital",
    "nainital-with-auli",
    "rishikesh-daredevil",
}

path = Path(r"E:\TravelSense\travelsense\src\data\packages.ts")
text = path.read_text(encoding="utf-8")

# Locate the start of the packages array — the `[` at the end of the declaration line
DECL = "export const packages: Package[] = ["
arr_start = text.index(DECL)
arr_open = arr_start + len(DECL) - 1  # points at the `[` of the array literal

# Find the matching closing `]` for the packages array
depth = 0
in_string = False
string_char = ""
i = arr_open + 1
arr_close = None
while i < len(text):
    c = text[i]
    if in_string:
        if c == "\\":
            i += 2
            continue
        if c == string_char:
            in_string = False
        i += 1
        continue
    if c in '"\'`':
        in_string = True
        string_char = c
        i += 1
        continue
    if c == "[" or c == "{":
        depth += 1
    elif c == "]" or c == "}":
        if depth == 0 and c == "]":
            arr_close = i
            break
        depth -= 1
    i += 1

assert arr_close is not None, "Could not find closing ] of packages array"

inner = text[arr_open + 1 : arr_close]
tail = text[arr_close:]

# Split inner into top-level objects. Each object begins at a `{` at depth 0
# and ends at the matching `}`.
objects = []
depth = 0
in_string = False
string_char = ""
obj_start = None
i = 0
while i < len(inner):
    c = inner[i]
    if in_string:
        if c == "\\":
            i += 2
            continue
        if c == string_char:
            in_string = False
        i += 1
        continue
    if c in '"\'`':
        in_string = True
        string_char = c
        i += 1
        continue
    if c == "{":
        if depth == 0:
            obj_start = i
        depth += 1
    elif c == "}":
        depth -= 1
        if depth == 0:
            obj_end = i + 1
            objects.append((obj_start, obj_end))
    i += 1

print(f"Found {len(objects)} package objects in array")

# Determine which to keep
kept_blocks = []
removed_count = 0
for start, end in objects:
    block = inner[start:end]
    m = re.search(r'slug:\s*"([^"]+)"', block)
    if m and m.group(1) in SLUGS_TO_REMOVE:
        removed_count += 1
        print(f"  REMOVING: {m.group(1)}")
    else:
        kept_blocks.append(block)

# Reconstruct the array body. Re-join with `,\n  ` so formatting is consistent.
new_inner = "\n  " + ",\n  ".join(kept_blocks) + ",\n"

# Reassemble file
new_text = text[: arr_open + 1] + new_inner + tail

# Write back
path.write_text(new_text, encoding="utf-8")

print(f"\nRemoved {removed_count} packages")
print(f"Kept {len(kept_blocks)} packages")
print(f"Wrote {len(new_text):,} chars to {path.name}")
