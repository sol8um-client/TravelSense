# TravelSense — Windows → MacBook Migration Guide
_Last updated: 2026-06-18. Move this project + all Claude Code work to a new Mac and continue seamlessly._

---

## 0. ✅ STATUS — everything is now pushed to GitHub

As of **2026-06-18, commit `37ab62e`**, ALL of June's work (international packages,
Russia/MICE/passport/About-nav/cascade filters, and the full image overhaul incl.
929 generated webp images) is **committed and pushed** to
`github.com/sol8um-client/TravelSense` (branch `main`). Working tree is clean.

So on the Mac you have **two equally-good options**:
- **Easiest — `git clone`** (gets all code + images), then hand-copy the **one
  gitignored file `.env.local`** from the pendrive. See Method A-clone below.
- **Pendrive folder-copy** (fully offline, also brings `.git` + `.env.local`).

> The ONLY thing git does NOT carry is **`.env.local`** (gitignored secrets) and
> your **Claude memory** (`~/.claude/...`). Both must be hand-copied either way.

### Method A-clone (recommended, simplest)
```bash
mkdir -p ~/TravelSense && cd ~/TravelSense
git clone https://github.com/sol8um-client/TravelSense.git travelsense
cd travelsense
# then copy .env.local from the pendrive into this folder:
cp /Volumes/<PENDRIVE>/travelsense/.env.local .
```
Then jump to §4 (tools) → §5 (Claude memory) → §8 (verify). Skip §2/§3 unless
you prefer fully-offline.

---

## 1. What has to move (3 buckets)

| Bucket | Where it is now (Windows) | Size | In git? | How it moves |
|---|---|---|---|---|
| **A. The project** | `E:\TravelSense\travelsense\` | ~200 MB* | mostly yes (178 uncommitted) | copy folder (excl. `node_modules`,`.next`,`.vercel`) |
| **B. Secrets** | `E:\TravelSense\travelsense\.env.local` | 35 lines | **NO (gitignored)** | copy file by hand |
| **C. Claude Code knowledge** | `C:\Users\vsfag\.claude\projects\E--TravelSense\` | ~205 MB | n/a | copy `memory\` + `*.jsonl` |

\* the project is only ~200 MB **after excluding** `node_modules` + `.next` +
`.vercel` (those are regenerated on the Mac — never copy them; they're huge and
platform-specific). `public/images` alone is **191 MB** (the real payload).

Optional bucket D: the client's source images in `C:\Users\vsfag\Downloads`
(the `* hero.png`, `Day_N — *.png`, and `Ultra-premium…` batches) — only needed
if you'll generate/rewire more images later. See `docs/IMAGE_PROMPTS.md` +
`memory/reference_image_pipeline.md`.

---

## 2. Method A — Pendrive transfer (primary)

### 2a. On Windows — copy to the pendrive

Use a USB drive ≥ 1 GB. In **PowerShell** (drive letter `E:` = project, `D:` = pendrive — adjust):

```powershell
# 1) The project WITHOUT the huge regenerable folders
robocopy "E:\TravelSense\travelsense" "D:\travelsense" /E /XD node_modules .next .vercel /XF "*.tsbuildinfo"
#   /E = all subfolders incl. empty, /XD = exclude dirs, /XF = exclude files
#   This DOES include .env.local and .git (so git history + uncommitted state travel).

# 2) Claude Code knowledge (memory + transcripts)
robocopy "C:\Users\vsfag\.claude\projects\E--TravelSense" "D:\claude-knowledge" /E

# 3) (optional) global Claude settings (permission allowlists, prefs)
copy "C:\Users\vsfag\.claude\settings.json" "D:\claude-settings.json"
```

> `.env.local` is inside the project folder, so step 1 carries it. Confirm it's
> on the pendrive: `dir D:\travelsense\.env.local`.

Safely eject the drive.

### 2b. On the Mac — place the files

```bash
# choose a home for the project
mkdir -p ~/TravelSense
cp -R /Volumes/<PENDRIVE>/travelsense ~/TravelSense/travelsense
# (cp -R preserves the .git folder + .env.local + all images)
```

Claude knowledge goes in section 4 (it needs the right folder name first).

---

## 3. Method B — Git push backup (do this too, it's a safety net)

Even with the pendrive, push the current state so there's a cloud backup and the
Mac can `git pull` future changes. From Windows (or ask Claude to do it):

```bash
cd E:/TravelSense/travelsense
git add -A
git commit -m "chore: June 2026 work — intl packages, Russia, MICE, passport, nav, cascade filters, full image overhaul"
git push origin main
```
Then on the Mac you could `git clone` instead of the pendrive — but the pendrive
still wins for `.env.local` (never commit that) and is faster for the 191 MB of
images. **Recommended: pendrive for files + git push for backup/sync.**

---

## 4. Mac setup — tools (one-time)

Install **Homebrew** (https://brew.sh), then:

```bash
# core toolchain
brew install git gh ffmpeg python@3.12
# Node: use Node 20 LTS (Next 15 is unhappy on Node 25 — that bit us on Windows)
brew install node@20 && brew link --overwrite --force node@20
# pnpm (this repo uses pnpm + pnpm-lock.yaml)
corepack enable && corepack prepare pnpm@latest --activate
# Vercel CLI
npm i -g vercel
# Claude Code
npm i -g @anthropic-ai/claude-code     # or: brew install claude-code (if available)
```

Verify: `node -v` (v20.x), `pnpm -v`, `ffmpeg -version`, `vercel --version`,
`gh --version`, `python3 --version`, `claude --version`.

Install the project deps:
```bash
cd ~/TravelSense/travelsense
pnpm install        # regenerates node_modules (do NOT copy it from Windows)
```

---

## 5. Migrate the Claude Code knowledge (memory + transcripts)

Claude Code stores per-project memory under
`~/.claude/projects/<ENCODED-CWD>/`, where `<ENCODED-CWD>` is the launch
directory with `/` → `-`. On Windows it was `E--TravelSense` (from `E:\TravelSense`).
On the Mac it will be different, e.g. launching from `~/TravelSense` →
`-Users-<you>-TravelSense`. So you can't just keep the old folder name.

**Steps:**
```bash
# 1) Launch Claude Code once from the SAME dir you'll always use, then quit.
cd ~/TravelSense          # (or ~/TravelSense/travelsense — pick one and stick to it)
claude                    # let it start, then exit. This creates the project folder.

# 2) Find the new folder name it created:
ls ~/.claude/projects/    # note the entry like  -Users-<you>-TravelSense

# 3) Copy the memory + transcripts from the pendrive into it:
DEST=~/.claude/projects/-Users-<you>-TravelSense      # <-- use the real name from step 2
cp -R /Volumes/<PENDRIVE>/claude-knowledge/memory "$DEST"/
cp /Volumes/<PENDRIVE>/claude-knowledge/*.jsonl "$DEST"/ 2>/dev/null || true

# 4) (optional) global settings / permission allowlists:
cp /Volumes/<PENDRIVE>/claude-settings.json ~/.claude/settings.json
```

The **`memory/` folder is the durable cross-session brain** (17 files incl.
`MEMORY.md` index, the roadmap, feedback rules, brand/company refs, image
pipeline). The `.jsonl` files are full past-session transcripts (searchable
history). Memory is what makes a new session pick up context instantly.

> Tip: **always launch Claude Code from the same directory** so the memory folder
> stays consistent. If you later move the project, copy `memory/` to the new
> encoded folder again.

---

## 6. Rebuild `.env.local` (if the copy ever gets lost)

It carries on the pendrive inside the project, but for reference it has these
**18 keys** (values are secrets — get them from the copied file, the Vercel
project's Environment Variables, or the respective dashboards):

```
DATABASE_URL              DIRECT_URL
NEXT_PUBLIC_SANITY_PROJECT_ID   NEXT_PUBLIC_SANITY_DATASET   SANITY_API_TOKEN
RAZORPAY_KEY_ID           RAZORPAY_KEY_SECRET           NEXT_PUBLIC_RAZORPAY_KEY_ID
BREVO_API_KEY
NEXT_PUBLIC_GA_MEASUREMENT_ID   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY   NEXT_PUBLIC_META_PIXEL_ID
NEXT_PUBLIC_SUPABASE_URL  NEXT_PUBLIC_SUPABASE_ANON_KEY   (Supabase: rkalfwndmrhkqctzmgpe.supabase.co)
NEXT_PUBLIC_SITE_URL      NEXT_PUBLIC_SITE_NAME
ANTHROPIC_API_KEY         OPENAI_API_KEY
```
Many are placeholders/unused in Phase 1 (Sanity is removed; Razorpay/GA/Meta
pending client IDs). The live essentials are the **Supabase** pair (forms) and
`NEXT_PUBLIC_SITE_URL`.

---

## 7. Re-auth the CLIs on the Mac

```bash
# Git identity (kept consistent with deploys)
git config --global user.name "Sol8um" && git config --global user.email "sol8um@gmail.com"

# GitHub
gh auth login        # pick GitHub.com → HTTPS → browser

# Vercel  (project: sol8um-7719s-projects/travelsense, domain travelsense.co.in)
vercel login         # browser; OR keep deploying with a token:
#   vercel deploy --prod --yes --token <TOKEN>   (generate at vercel.com/account/tokens)
```
The `.vercel` folder was intentionally NOT copied — run `vercel link` once to
re-link to the existing project (`sol8um-7719s-projects/travelsense`).

🔒 **Revoke the Vercel token** that was pasted into chat earlier; create a fresh one on the Mac.

---

## 8. First-run verification (prove the migration worked)

```bash
cd ~/TravelSense/travelsense
pnpm install
node_modules/.bin/tsc --noEmit -p tsconfig.json     # should be clean
node_modules/.bin/next build                          # should reach 293 static pages
node_modules/.bin/next dev                            # open http://localhost:3000
```
Spot-check: a destination page, a package detail page (images load, day-by-day
images present), `/mice`, `/visa-passport` (Visa/Passport tabs), the destinations
filter cascade. Then a no-op deploy to confirm the pipeline:
`vercel deploy --prod --yes` (or `--token`).

---

## 9. Project-specific gotchas to carry over (don't relearn the hard way)

- **Package manager = pnpm** (`pnpm install`, `pnpm dev`). `npm i` was broken on the old box under Node 25 → use **Node 20 LTS** on the Mac.
- **`images.unoptimized: true`** in `next.config` (no runtime `sharp`). So **pre-compress** any new image to webp at the source: `ffmpeg -i in.png -vf "scale='min(1600,iw)':-2" -c:v libwebp -quality 82 out.webp`.
- **Deploys are manual** (Vercel auto-deploy is disconnected): `vercel deploy --prod --yes`. Verify live with `curl -s -o /dev/null -w "%{http_code}" https://travelsense.co.in/...` — the client reviews on mobile Safari which **caches hard**.
- **Content is static TS** in `src/data/` (`packages.ts` ~20k lines, `destinations.ts`, `blog.ts`). **Sanity is removed** (code still in `sanity/` but unused).
- **Forms → Supabase** (`src/lib/supabase.ts`, 6 tables). Itinerary builder = rule-based engine in `src/app/api/itinerary/route.ts` (destination-first matching).
- **Image system**: `docs/IMAGE_PROMPTS.md` is the map; the working scripts live in `scripts/` (`reconcile_v4.py` = the live matcher, `coord_filter.py`, `fetch_extra_landmarks.py`, `boost_landmarks.py`, plus `add_intl_packages_v2.py`, `sync_generated_images.py`, `wire_day_images.py`). Full method in `memory/reference_image_pipeline.md`.
- **Homepage WebGL globe** can stall the Claude preview tool; `vh/svh/dvh` read as 0 in preview. Verify layout on the live deploy, not preview screenshots.
- The Claude **memory** captures the rest (client feedback patterns, brand, do/don'ts) — keep it migrated and current.

---

## 10. Path translation (Windows → Mac)

| Windows | Mac |
|---|---|
| `E:\TravelSense\travelsense` | `~/TravelSense/travelsense` |
| `C:\Users\vsfag\.claude\projects\E--TravelSense\memory` | `~/.claude/projects/-Users-<you>-TravelSense/memory` |
| `C:\Users\vsfag\Downloads` | `~/Downloads` |
| PowerShell / `robocopy` | zsh / `cp -R`, `rsync -a` |
| `$env:VAR`, `\` paths | `$VAR`, `/` paths |

Once on the Mac, tell Claude Code: _"read MIGRATION.md and CLAUDE.md, confirm
memory loaded, then continue TravelSense."_
