# START HERE — new machine / new Claude Code session

## If this is a fresh machine (e.g. the new Mac)
1. Read **`MIGRATION.md`** (full Windows→Mac transfer steps).
2. From the project root, run: **`bash scripts/mac-setup.sh`** (installs tools, `pnpm install`, runs checks).
3. Copy `.env.local` (from the pendrive — it's gitignored) into the project root.
4. Copy the Claude `memory/` folder + `*.jsonl` into `~/.claude/projects/<this-dir-encoded>/` (launch `claude` once to create that folder — see MIGRATION.md §5).
5. `gh auth login`, `vercel login` (+ `vercel link`).
6. Launch Claude Code and paste the **kickoff prompt** below.

---

## 🟢 Claude Code kickoff prompt (paste this at the start of ANY session)

> Read `CLAUDE.md` and `MIGRATION.md` in the repo root, and confirm my Claude memory loaded (you should see the TravelSense `MEMORY.md` index — list the memory files you can see). Then give me a 5-line status of the project (live URL, package/destination counts, what's open) so I know context is intact. Don't change anything yet — wait for my task.

If Claude says it can't see the memory files, the `memory/` folder isn't in the
right `~/.claude/projects/<cwd>/` location — fix per MIGRATION.md §5 and relaunch
from the same directory.

---

## Task-specific kickoff prompts (use the one matching your session)

**▸ Build a feature / fix something (default):**
> Continue TravelSense. Read CLAUDE.md + relevant memory first. Here's the task: <DESCRIBE>. Make it responsive (mobile+tablet+desktop) by default, verify, then deploy with `vercel deploy --prod --yes` and confirm live with curl.

**▸ Client feedback round (multiple items):**
> New client feedback for TravelSense (paste list). Create a task list, work through each item, keep changes scoped, verify each, then one deploy + a live curl check. Follow the feedback patterns in memory (`feedback_*`).

**▸ Image work (heroes / day images):**
> Image work on TravelSense. Read `memory/reference_image_pipeline.md` + `docs/IMAGE_PROMPTS.md` first. The live matcher is `scripts/reconcile_v4.py`. <DESCRIBE what to fix — e.g. new generated images in ~/Downloads, or fix specific package images>. Pre-compress to webp (images.unoptimized=true). Verify dimensions + duplicates before claiming done.

**▸ Add packages / destinations (content):**
> Add TravelSense content: <DESCRIBE>. Content is static TS in `src/data/packages.ts` / `destinations.ts`. Match existing structure (transparencyNote, full day-by-day itinerary, inclusions/exclusions). Build + spot-check the new pages + deploy.

**▸ Deploy only:**
> Deploy TravelSense to production: `vercel deploy --prod --yes` (use `--token <TOKEN>` if CLI auth fails), then verify the homepage + 2 changed pages return 200 on travelsense.co.in.

**▸ Resume a previous Claude Code session (Mac):**
> `claude --resume`   (CLI flag — pick the session from the list; transcripts in ~/.claude/projects/<cwd>/*.jsonl)

---

## Quick reference
- **Stack:** Next.js (App Router, TS, Tailwind 4) · **pnpm** · Node 20 LTS · static content in `src/data/`.
- **Run:** `pnpm dev` → http://localhost:3000  |  **Build:** `node_modules/.bin/next build`  |  **Typecheck:** `node_modules/.bin/tsc --noEmit -p tsconfig.json`
- **Deploy (manual):** `vercel deploy --prod --yes`  → live at **travelsense.co.in**  (verify with curl; mobile Safari caches hard)
- **Images:** `images.unoptimized:true` → pre-compress with `ffmpeg -i in.png -vf "scale='min(1600,iw)':-2" -c:v libwebp -quality 82 out.webp`
- **Deeper context:** `CLAUDE.md` (session logs) · Claude `memory/` (`MEMORY.md` index → roadmap, feedback, brand, image pipeline) · `MIGRATION.md`.
