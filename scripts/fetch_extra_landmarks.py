# -*- coding: utf-8 -*-
"""
Fetch additional, well-known landmark photos (coord-verified PLACES, high-res)
for the destinations whose itineraries are longer than their image pool, so the
deduped matcher (reconcile_v4) can give every day a distinct image. Saves to
public/images/generated/lm/ and appends them to each destination's
galleryImages in destinations.ts.
"""
import json,os,re,io,sys,subprocess,time,urllib.request,urllib.parse
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding="utf-8")
GEN="public/images/generated"; LMDIR=GEN+"/lm"
UA="TravelSenseImageBot/1.0 (https://travelsense.co.in; contact@travelsense.co.in)"

L={
"meghalaya":["Nohkalikai Falls","Umiam Lake","Mawlynnong","Dawki","Living root bridge","Elephant Falls Shillong","Mawsmai Cave","Seven Sisters Falls Meghalaya","Laitlum Canyons","Krang Suri Falls","Cherrapunji","Mawphlang sacred forest","Shillong Peak","Nartiang Monoliths","Wards Lake Shillong","Balpakram National Park","Nongriat","Phe Phe Falls"],
"gujarat":["Statue of Unity","Somnath temple","Dwarkadhish Temple","Gir National Park","Rani ki Vav","Sun Temple Modhera","Laxmi Vilas Palace Vadodara","Akshardham Gandhinagar","Sabarmati Ashram","Adalaj Stepwell","Champaner-Pavagadh","Saputara","Dholavira","Kankaria Lake","Marine National Park Gulf of Kutch"],
"varanasi-uttar-pradesh":["Dashashwamedh Ghat","Kashi Vishwanath Temple","Sarnath","Assi Ghat","Ramnagar Fort","Manikarnika Ghat","Taj Mahal","Agra Fort","Fatehpur Sikri","Bara Imambara","Triveni Sangam Prayagraj","Ram Mandir Ayodhya","Prem Mandir Vrindavan"],
"arunachal-pradesh":["Tawang Monastery","Sela Pass","Sangetsar Lake","Bum La Pass","Nuranang Falls","Ziro Valley","Dirang","Bomdila","Namdapha National Park","Mechuka","Jaswant Garh","Pasighat","Tipi Orchid Sanctuary"],
"andaman-islands":["Radhanagar Beach","Cellular Jail","Ross Island Andaman","Neil Island","Baratang Island","Elephant Beach Havelock","North Bay Island","Chidiya Tapu","Mahatma Gandhi Marine National Park"],
"assam":["Kaziranga National Park","Kamakhya Temple","Majuli","Rang Ghar","Manas National Park","Umananda Temple","Agnigarh","Hajo","Nameri National Park","Sivasagar"],
"kenya":["Maasai Mara","Amboseli National Park","Lake Nakuru","Mount Kenya","Diani Beach","Fort Jesus","Hells Gate National Park","Lake Naivasha","Samburu National Reserve","Nairobi National Park","Lake Bogoria"],
"jordan":["Petra","Wadi Rum","Dead Sea","Jerash","Amman Citadel","Mount Nebo","Aqaba","Kerak Castle","Madaba"],
"fiji":["Mamanuca Islands","Yasawa Islands","Sigatoka Sand Dunes","Garden of the Sleeping Giant","Bouma National Heritage Park","Sabeto","Denarau Island","Suva","Navala"],
"lakshadweep":["Agatti Island","Bangaram","Kavaratti","Minicoy","Kadmat Island","Kalpeni","Thinnakara"],
"reunion-island":["Piton de la Fournaise","Cirque de Mafate","Cirque de Cilaos","Cirque de Salazie","Piton des Neiges","Cap Mechant","Saint-Paul Reunion","Trou de Fer","Hell-Bourg"],
"bihar":["Mahabodhi Temple","Nalanda","Rajgir","Vikramshila","Vaishali","Golghar","Barabar Caves","Tomb of Sher Shah Suri"],
}
CTRY={"kenya":"Kenya","jordan":"Jordan","fiji":"Fiji","reunion-island":"Reunion"}

def webp_w(p):
    try:d=open(p,'rb').read(40)
    except:return 0
    if d[:4]!=b'RIFF':return 0
    f=d[12:16]
    if f==b'VP8 ':return int.from_bytes(d[26:28],'little')&0x3fff
    if f==b'VP8L':return (int.from_bytes(d[21:25],'little')&0x3fff)+1
    if f==b'VP8X':return int.from_bytes(d[24:27],'little')+1
    return 0
def slugify(q): return re.sub(r'[^a-z0-9]+','-',q.lower()).strip('-')[:50]
def fetch(q,ctry):
    url=("https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1"
         "&generator=search&gsrlimit=1&gsrsearch="+urllib.parse.quote(f"{q} {ctry}")+
         "&prop=coordinates|pageimages&piprop=original|thumbnail&pithumbsize=1600")
    j=json.load(urllib.request.urlopen(urllib.request.Request(url,headers={"User-Agent":UA}),timeout=25))
    for _,p in ((j.get("query") or {}).get("pages") or {}).items():
        if "coordinates" not in p: return None
        return (p.get("original") or p.get("thumbnail") or {}).get("source")
    return None

added=dict()
for dest,names in L.items():
    ctry=CTRY.get(dest,"India"); paths=[]
    for q in names:
        slug=slugify(q); out=os.path.join(LMDIR,slug+".webp"); rel=f"/images/generated/lm/{slug}.webp"
        try:
            if os.path.exists(out) and webp_w(out)>=600:
                paths.append(rel); continue
            src=fetch(q,ctry)
            if not src or not re.search(r"\.(jpg|jpeg|png)$",src,re.I): print("  miss",dest,q); time.sleep(0.3); continue
            ext=".png" if src.lower().endswith(".png") else ".jpg"
            tmp=os.path.join(LMDIR,"_x_"+slug+ext)
            open(tmp,"wb").write(urllib.request.urlopen(urllib.request.Request(src,headers={"User-Agent":UA}),timeout=50).read())
            r=subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",tmp,"-vf","scale='min(1600,iw)':-2","-c:v","libwebp","-quality","82",out],capture_output=True,text=True)
            os.remove(tmp)
            if r.returncode==0 and webp_w(out)>=500: paths.append(rel); print("  ok",dest,slug,webp_w(out))
            else:
                if os.path.exists(out): os.remove(out)
                print("  lowq/fail",dest,q)
        except Exception as e: print("  err",dest,q,repr(e)[:60])
        time.sleep(0.3)
    added[dest]=paths
    print(f"== {dest}: +{len(paths)}")

# wire into destinations.ts galleryImages
ds=io.open("src/data/destinations.ts",encoding="utf-8").read()
for dest,paths in added.items():
    if not paths: continue
    i=ds.find(f'slug: "{dest}"'); nxt=ds.find('slug: "',i+10); block=ds[i:nxt]
    m=re.search(r'(galleryImages: \[)(.*?)(\n    \])',block,re.S)
    if not m: print("no gallery for",dest); continue
    existing=set(re.findall(r'"([^"]+)"',m.group(2)))
    newl="".join(f'\n      "{p}",' for p in paths if p not in existing)
    if newl:
        nb=block[:m.start(3)]+newl+block[m.start(3):]
        ds=ds[:i]+nb+ds[nxt:]
io.open("src/data/destinations.ts","w",encoding="utf-8").write(ds)
print("\nDONE extra-landmarks. added per dest:",{k:len(v) for k,v in added.items()})
