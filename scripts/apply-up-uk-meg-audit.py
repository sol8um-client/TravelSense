# -*- coding: utf-8 -*-
"""Apply the UP / Uttarakhand / Meghalaya sightseeing-audit additions to the
specific itinerary days. Only adds the genuinely-missing spots (many were
already present). Adds to the day title and the activities chips."""
import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
PATH = r'E:\TravelSense\travelsense\src\data\packages.ts'
c = open(PATH, encoding='utf-8').read()


def find_block(c, t):
    p = re.compile(r'  \{\s*\n\s*title:\s*"' + re.escape(t) + r'"')
    m = p.search(c)
    s = m.start(); d = 0; i = s
    while i < len(c):
        if c[i] == '{':
            d += 1
        elif c[i] == '}':
            d -= 1
            if d == 0:
                return (s, i + 1)
        i += 1


# (package_title, day_title_old, day_title_new_or_None, [activities_to_add])
CHANGES = [
 ("UP Spiritual Triangle — Prayagraj, Varanasi & Ayodhya",
  "Varanasi — Sunrise Boat, Kashi Vishwanath, Sarnath",
  "Varanasi — Sunrise Boat, Kashi Vishwanath, Kaal Bhairav & Sarnath",
  ["Kaal Bhairav Temple", "Assi Ghat"]),
 ("UP Spiritual Triangle — Prayagraj, Varanasi & Ayodhya",
  "Ayodhya — Hanuman Garhi, Kanak Bhawan, Saryu",
  "Ayodhya — Hanuman Garhi, Kanak Bhawan, Ram Ki Paidi & Saryu Aarti",
  ["Ram Ki Paidi", "Saryu Aarti"]),
 ("Brij Bhoomi Yatra — Delhi, Mathura, Vrindavan & Agra",
  "Agra to Mathura to Vrindavan",
  "Agra Fort, then Mathura & Vrindavan",
  ["Agra Fort", "Vishram Ghat Yamuna Aarti"]),
 ("Complete UP Heritage Circuit — Delhi, Agra, Mathura, Jhansi, Prayagraj, Varanasi & Ayodhya",
  "Drive Vrindavan to Agra — Taj Mahal Sunset",
  "Drive Vrindavan to Agra — Taj Mahal & Mehtab Bagh Sunset",
  ["Mehtab Bagh"]),
 ("Uttarakhand Hills & Pilgrimage — Haridwar, Rishikesh, Kainchi Dham, Nainital, Ranikhet & Corbett",
  "Nainital Local — Snow View, Tiffin Top, Pangot",
  "Nainital Local — Snow View, Tiffin Top & the Lake District",
  ["Bhimtal", "Sattal", "Naukuchiatal"]),
 ("Uttarakhand Hills & Pilgrimage — Haridwar, Rishikesh, Kainchi Dham, Nainital, Ranikhet & Corbett",
  "Drive Nainital to Ranikhet",
  "Drive Nainital to Ranikhet via Mukteshwar & Kasar Devi",
  ["Mukteshwar", "Kasar Devi"]),
 ("Mussoorie & Garhwal Hills — Dehradun, Mussoorie, Dhanaulti, Kanatal, Tehri & Haridwar",
  "Mussoorie — Gun Hill, Kempty Falls, Lal Tibba",
  "Mussoorie — Gun Hill, Kempty Falls, Lal Tibba & Landour",
  ["Landour & Char Dukan"]),
 ("Meghalaya Essence — Shillong, Cherrapunjee, Mawlynnong & Dawki",
  "Shillong Local — Elephant Falls, Don Bosco Museum, Shillong Peak",
  "Shillong Local — Elephant Falls, Don Bosco Museum & Mawphlang",
  ["Mawphlang Sacred Forest"]),
 ("Meghalaya Essence — Shillong, Cherrapunjee, Mawlynnong & Dawki",
  "Shillong to Cherrapunjee — Wei Sawdong & Nohkalikai Falls",
  "Shillong to Cherrapunjee — Wei Sawdong, Arwah Caves & Nohkalikai",
  ["Arwah Cave", "Garden of Caves"]),
 ("Meghalaya Essence — Shillong, Cherrapunjee, Mawlynnong & Dawki",
  "Cherrapunjee — Double Decker Living Root Bridge Trek",
  None,
  ["Rainbow Falls (optional)"]),
]

count = 0
for pkg_t, day_old, day_new, acts in CHANGES:
    bs, be = find_block(c, pkg_t)
    block = c[bs:be]
    ti = block.find('title: "' + day_old + '"')
    if ti == -1:
        print("DAY NOT FOUND:", day_old, "in", pkg_t[:30]); continue
    # 1) title
    if day_new:
        block = block.replace('title: "' + day_old + '"', 'title: "' + day_new + '"', 1)
        ti = block.find('title: "' + day_new + '"')
    # 2) activities — first activities array after this title
    ai = block.find('activities: [', ti)
    ac = block.find(']', ai)
    add = ", ".join('"' + a + '"' for a in acts)
    block = block[:ac] + ', ' + add + block[ac:]
    c = c[:bs] + block + c[be:]
    count += 1
    print("updated:", (day_new or day_old)[:55])

open(PATH, 'w', encoding='utf-8').write(c)
print("\nDays updated:", count)
