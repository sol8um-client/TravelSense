"""
Process the Nano Banana hero assets into clean, web-ready transparent PNGs.

1. Globe  (A_premium..._0201.jpeg, white bg) -> tight circular cut that keeps the
   on-sphere rim/terminator glow but drops the broad white halo (that broad glow is
   re-added in CSS so it can animate). Output: public/images/hero/globe.png
2. VR traveller (A_..._traveller_0206.jpeg, baked checkerboard bg) -> rembg cutout,
   autocropped + downscaled. Output: public/images/hero/vr-traveller.png
"""
import os
from PIL import Image, ImageFilter
import numpy as np

DL = r"C:\Users\vsfag\Downloads"
OUT = r"E:\TravelSense\travelsense\public\images\hero"
os.makedirs(OUT, exist_ok=True)

# ---------------------------------------------------------------- GLOBE --------
GLOBE_SRC = os.path.join(DL, "A_premium,_photorealistic_3D_planet_202606060201.jpeg")
CX, CY = 1034, 1026          # sphere centre (measured)
R_SOLID = 824                # solid out to here (keeps bright rim terminator)
R_EDGE = 840                 # feather to fully transparent here
PAD = 14                     # transparent breathing room around the circle

im = Image.open(GLOBE_SRC).convert("RGB")
arr = np.asarray(im).astype(np.float32)
h, w, _ = arr.shape
yy, xx = np.mgrid[0:h, 0:w]
dist = np.sqrt((xx - CX) ** 2 + (yy - CY) ** 2)
# smooth 1->0 alpha across the [R_SOLID, R_EDGE] band
alpha = np.clip((R_EDGE - dist) / (R_EDGE - R_SOLID), 0.0, 1.0)
alpha8 = (alpha * 255).astype(np.uint8)
rgba = np.dstack([arr.astype(np.uint8), alpha8])
globe = Image.fromarray(rgba, "RGBA")

# crop tight square around the circle (+pad), then resize for web
side = int((R_EDGE + PAD) * 2)
left = CX - side // 2
top = CY - side // 2
globe = globe.crop((left, top, left + side, top + side))
globe = globe.resize((1200, 1200), Image.LANCZOS)
globe.save(os.path.join(OUT, "globe.png"))
print("globe.png written:", globe.size)

# ------------------------------------------------------------- VR PERSON -------
VR_SRC = os.path.join(DL, "A_photorealistic_young_Indian_traveller_202606060206.jpeg")
try:
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
    cut = remove(src, session=sess) if sess else remove(src)
    cut = cut.convert("RGBA")
    # autocrop to the non-transparent bbox
    a = np.asarray(cut)[:, :, 3]
    ys, xs = np.where(a > 12)
    if len(xs):
        x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
        m = 8
        x0 = max(0, x0 - m); y0 = max(0, y0 - m)
        x1 = min(cut.width, x1 + m); y1 = min(cut.height, y1 + m)
        cut = cut.crop((x0, y0, x1, y1))
    # downscale to a sensible web height
    target_h = 1300
    if cut.height > target_h:
        ratio = target_h / cut.height
        cut = cut.resize((int(cut.width * ratio), target_h), Image.LANCZOS)
    cut.save(os.path.join(OUT, "vr-traveller.png"))
    print("vr-traveller.png written:", cut.size)
except Exception as e:
    print("VR rembg FAILED:", e)
