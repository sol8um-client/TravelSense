"""
Process the Nano Banana hero assets into clean, web-ready transparent PNGs.

1. Globe  (A_premium..._0201.jpeg, white bg) -> tight circular cut with a SOFT,
   cinematic feathered rim (keeps the on-sphere terminator glow, dissolves the
   hard circle edge). Output: public/images/hero/globe.png
2. VR traveller (A_..._traveller_0206.jpeg) -> rembg full cutout (kept for ref):
   public/images/hero/vr-traveller.png
3. VR FACE  -> a square crop of just the head + goggles from the cutout, for the
   thin AR/VR ribbon. Output: public/images/hero/vr-face.png
"""
import os
from PIL import Image
import numpy as np

DL = r"C:\Users\vsfag\Downloads"
OUT = r"E:\TravelSense\travelsense\public\images\hero"
os.makedirs(OUT, exist_ok=True)

# ---------------------------------------------------------------- GLOBE --------
GLOBE_SRC = os.path.join(DL, "A_premium,_photorealistic_3D_planet_202606060201.jpeg")
CX, CY = 1034, 1026          # sphere centre (measured)
R_SOLID = 806                # fully opaque out to here
R_EDGE = 856                 # soft feather to fully transparent (≈50px = cinematic)
PAD = 26                     # transparent breathing room around the circle

im = Image.open(GLOBE_SRC).convert("RGB")
arr = np.asarray(im).astype(np.float32)
h, w, _ = arr.shape
yy, xx = np.mgrid[0:h, 0:w]
dist = np.sqrt((xx - CX) ** 2 + (yy - CY) ** 2)
# smootherstep 1->0 across [R_SOLID, R_EDGE] for a silky rim
t = np.clip((dist - R_SOLID) / (R_EDGE - R_SOLID), 0.0, 1.0)
alpha = 1.0 - (t * t * (3 - 2 * t))
alpha8 = (alpha * 255).astype(np.uint8)
rgba = np.dstack([arr.astype(np.uint8), alpha8])
globe = Image.fromarray(rgba, "RGBA")
side = int((R_EDGE + PAD) * 2)
left, top = CX - side // 2, CY - side // 2
globe = globe.crop((left, top, left + side, top + side)).resize((1200, 1200), Image.LANCZOS)
globe.save(os.path.join(OUT, "globe.png"))
print("globe.png written:", globe.size)

# ------------------------------------------------------------- VR PERSON -------
VR_SRC = os.path.join(DL, "A_photorealistic_young_Indian_traveller_202606060206.jpeg")
from rembg import remove, new_session

sess = None
for model in ("isnet-general-use", "u2net_human_seg", "u2net"):
    try:
        sess = new_session(model)
        print("rembg model:", model)
        break
    except Exception as e:
        print("  model", model, "unavailable:", str(e)[:60])

src = Image.open(VR_SRC).convert("RGB")
cut = remove(src, session=sess).convert("RGBA")
a = np.asarray(cut)[:, :, 3]
ys, xs = np.where(a > 12)
x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
full = cut.crop((max(0, x0 - 8), max(0, y0 - 8), min(cut.width, x1 + 8), min(cut.height, y1 + 8)))
if full.height > 1300:
    r = 1300 / full.height
    full = full.resize((int(full.width * r), 1300), Image.LANCZOS)
full.save(os.path.join(OUT, "vr-traveller.png"))
print("vr-traveller.png written:", full.size)

# ----- FACE crop: head + goggles only ------------------------------------------
# Work on the tight full-body cutout. Head sits at the top; find where the
# silhouette first widens to ~shoulders and cut a padded square above that.
fa = np.asarray(full)[:, :, 3]
H, W = fa.shape
rows_w = (fa > 30).sum(axis=1)          # opaque pixels per row
head_top = int(np.argmax(rows_w > 5))   # first real row
# shoulder line ≈ where row width first exceeds 78% of the body's max width,
# scanning downward from the top — the head/neck is narrower than the shoulders.
maxw = rows_w.max()
shoulder = head_top + 10
for yrow in range(head_top + 10, H):
    if rows_w[yrow] > 0.72 * maxw:
        shoulder = yrow
        break
# horizontal centre of the head band
band = fa[head_top:shoulder]
cols = np.where(band.sum(axis=0) > 0)[0]
hcx = int((cols.min() + cols.max()) / 2) if len(cols) else W // 2
side = int((shoulder - head_top) * 1.18)            # square a touch taller than head
side = max(side, cols.max() - cols.min() + 30) if len(cols) else side
cy0 = head_top + (shoulder - head_top) // 2
left = max(0, hcx - side // 2)
top = max(0, head_top - int(side * 0.10))
face = full.crop((left, top, min(W, left + side), min(H, top + side)))
face = face.resize((420, 420), Image.LANCZOS)
face.save(os.path.join(OUT, "vr-face.png"))
print("vr-face.png written:", face.size, "(head_top=%d shoulder=%d)" % (head_top, shoulder))
