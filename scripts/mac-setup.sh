#!/usr/bin/env bash
# TravelSense — one-shot Mac setup. Run from the project root:  bash scripts/mac-setup.sh
# Idempotent: safe to re-run. See MIGRATION.md for the full migration guide.
set -uo pipefail
say(){ printf "\n\033[1;36m== %s\033[0m\n" "$1"; }
ok(){ printf "  \033[32m✓ %s\033[0m\n" "$1"; }
warn(){ printf "  \033[33m! %s\033[0m\n" "$1"; }

say "1/6  Homebrew"
if ! command -v brew >/dev/null 2>&1; then
  warn "Homebrew not found — install it from https://brew.sh then re-run this script."
  exit 1
fi; ok "brew present"

say "2/6  Core tools (git, gh, ffmpeg, python, node@20)"
for f in git gh ffmpeg python@3.12 node@20; do
  brew list "$f" >/dev/null 2>&1 && ok "$f" || { echo "  installing $f…"; brew install "$f"; }
done
brew link --overwrite --force node@20 >/dev/null 2>&1 || true
ok "node $(node -v 2>/dev/null)"

say "3/6  pnpm (via corepack) + Vercel CLI + Claude Code"
corepack enable >/dev/null 2>&1 && corepack prepare pnpm@latest --activate >/dev/null 2>&1 && ok "pnpm $(pnpm -v 2>/dev/null)" || warn "pnpm/corepack issue — run: corepack enable"
command -v vercel >/dev/null 2>&1 && ok "vercel $(vercel --version 2>/dev/null)" || npm i -g vercel
command -v claude >/dev/null 2>&1 && ok "claude code present" || npm i -g @anthropic-ai/claude-code

say "4/6  Install project dependencies (pnpm install)"
if [ -f package.json ]; then pnpm install && ok "deps installed"; else warn "run this from the project root (no package.json here)"; exit 1; fi

say "5/6  Sanity checks"
[ -f .env.local ] && ok ".env.local present" || warn ".env.local MISSING — copy it from the pendrive (it's gitignored; holds Supabase keys etc.)"
node_modules/.bin/tsc --noEmit -p tsconfig.json >/dev/null 2>&1 && ok "typecheck clean" || warn "typecheck has errors — inspect with: node_modules/.bin/tsc --noEmit -p tsconfig.json"

say "6/6  Reminders (manual, one-time)"
cat <<'EOF'
  • Re-auth GitHub:   gh auth login
  • Re-auth Vercel:   vercel login   (then: vercel link  → sol8um-7719s-projects/travelsense)
  • Git identity:     git config --global user.name "Sol8um"; git config --global user.email "sol8um@gmail.com"
  • Claude memory:    copy the pendrive's  claude-knowledge/memory  +  *.jsonl  into
                      ~/.claude/projects/<this-dir-encoded>/   (launch `claude` once to create that folder; see MIGRATION.md §5)
  • Start dev:        pnpm dev        → http://localhost:3000
  • Deploy:           vercel deploy --prod --yes     (verify live with curl; client caches hard on mobile Safari)
EOF
say "Done. Next: read START_HERE.md, then launch Claude Code with the kickoff prompt."
