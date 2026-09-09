# Apply Progress — nba-player-profile-rebuild

**Date:** 2026-09-08
**Store:** openspec · **Delivery:** single slice, `size:exception` accepted by maintainer before apply
**Runtime authority:** `gentle-ai sdd-attempt` — apply objective settled `passed` (6,099 changed lines; 99 over the parent-declared 6,000 ceiling; covered by the maintainer-accepted size exception, registered via `sdd-attempt reset` with actor confirmation)

## Completed tasks (Tasks 1–19)

All 19 implementation tasks completed and checked in `tasks.md`. Evidence highlights:

- **Task 1 (baseline gate):** tag `baseline-pre-nba-rebuild` verified; origin/main matched; baseline pushed to GitHub before any destructive edit.
- **Task 2 (static config):** `astro.config.mjs` → `output: 'static'`, adapter removed, `@astrojs/vercel` dropped from deps, `pnpm-lock.yaml` regenerated via `pnpm install`, `pnpm-workspace.yaml` created by pnpm. No `vercel.json`. `.vercel/` gitignored.
- **Task 3 (data):** `src/data/profile.ts` with the exact design §2 contracts and content (10 stats, 6 season entries, 7 attribute groups, 8 highlights, 5 case studies, 3 links).
- **Task 4 (tokens/styles):** `src/styles/global.css` with the design §3 token block (accent `#67e8f9`), typography, responsive layouts, duotone portrait treatment, focus states, reduced-motion block (later fixed — see below).
- **Task 5 (layout):** `Layout.astro` — `lang="en"`, skip link, truthful metadata, non-blocking Google Fonts (Barlow Condensed 600/700, IBM Plex Mono 400/500, DM Sans 400/500/600), `global.css` import.
- **Task 6 (script):** `src/scripts/site.ts` — mobile menu (aria-expanded, Escape, focus return, `data-menu-enhanced` no-JS gate), scrolled header attr, single IntersectionObserver reveal (reduced-motion gated).
- **Task 7 (portrait):** all design-listed variants produced: `jose-cabarcas-portrait-{640,960,1200}.avif`, `{640,960,1200}.webp`, `960.jpg` (2:3, duotone NOT baked).
- **Task 8 (favicon/OG):** branded `public/favicon.svg` replaced; `public/og/jose-cabarcas-profile.png` (1200×630) produced.
- **Tasks 9–17 (components):** Header (accessible nav + real mobile menu), PlayerCardHero, CareerStats, SeasonLog, Attributes, Highlights, GameLog, DraftMe, Footer — all per design §6 blueprints.
- **Task 18 (composition/deletion):** `index.astro` rewritten to the 7-section composition; `Hero.astro`, `CodeWindow.astro`, `About.astro`, `Skills.astro`, `Projects.astro`, `Contact.astro`, `Section.astro` deleted.
- **Task 19 (audits):** `pnpm build` green (astro check + build, 1 static page). Audits: single h1/header/nav/main/footer; 6 section ids; href audit clean (anchors + GitHub/LinkedIn/mailto only); all referenced assets exist in dist; zero `_render.func`/server chunks.

## Verify phase outcome (2026-09-08)

`sdd-verify` passed all 13 domain specs at code level. Artifact: `verify-report.md`.

- Full numeric content-truth audit: every value traces to the context document; Elenas figures carry adjacent historical/shutdown framing; Attributes has zero numeric ratings; learning items labeled.
- Metadata, code-level a11y, and performance audits pass; one deferred inline `type=module` script; zero hydration bundles.
- **One fix applied during verify:** reduced-motion block neutralized `transform` but `.reveal-pending` uses the `translate` property — added `translate: none !important;` to `src/styles/global.css`; rebuild green.

## Content iteration 1 (2026-09-08, post-Task-20-feedback)

Maintainer-authorized content changes beyond the original context document, per design.md addendum. All changes implemented and verified:

- **Title rebrand:** `Frontend Staff Engineer` → `Senior Software Engineer` everywhere (metadata, og:image:alt, hero role, index.astro title/description).
- **Hero status badge:** replaced `currentRole` (Monokera details) with status badge `"Open to new opportunities"`. Monokera stays in Season Log as historical entry.
- **Positioning (Opción A):** "Senior Software Engineer with 11+ years shipping frontend and mobile products used by millions — leading teams and architecture, and deliberately crossing into backend when the problem demands it."
- **Bio (Opción A):** Updated 2-paragraph bio explicitly mentioning Elenas Staff Engineer role and deliberate backend work.
- **Hero stats reduced:** from 3 stats to 2 (removed `elenas-scale` third card to avoid duplication with Game Log; kept `11+` years and `5-7` engineers led).
- **AI-assisted development (Primary attribute group):** added as third Primary group with Claude Code, Cursor, Codex, Spec-Driven Development items.
- **Game Log expanded:** 5 → 7 case studies. Added **Elenas App** (3M+ downloads/200K+ DAU historical, React Native/Expo/EAS stack, 3-role progression) and **Elenas Web** (Next.js App Router/Turborepo migration). Updated section subtitle to "Seven case studies."
- **Files changed:** `src/data/profile.ts` (HeroIdentity type, hero content, ai-assisted-primary group, gameLog entries), `src/pages/index.astro` (title/description), `src/layouts/Layout.astro` (og:image:alt), `src/components/PlayerCardHero.astro` (status badge markup), `src/components/GameLog.astro` (subtitle).
- **Build status:** `pnpm build` green (0 errors). Verified: title, status badge, AI group Primary rendering, 7 game log cards, 2 hero stats only.

## Task 21 — Vercel preview deployment ✅ COMPLETED

**Status:** Successfully deployed
**Date:** 2026-09-09

### Deployment Details:
- **Preview URL:** https://josecabarcas-mw2i3igab-jose-cabarcas-projects.vercel.app
- **Inspector:** https://vercel.com/jose-cabarcas-projects/josecabarcas.dev/5hThvUgsJ8CQUrEFETiXxCFxT2qa
- **Status:** READY
- **Framework:** Astro (auto-detected)
- **Node Version:** 20.x (warning: deprecated, but deployment successful)

### Static Output Verification:
- ✅ `output: []` - Zero serverless functions (pure static)
- ✅ `middleware: []` - No middleware
- ✅ Build: 0 errors, 0 warnings, 0 hints
- ✅ `dist/` served directly via Vercel CDN

### Issue Resolution:
**Initial blocker:** `pnpm install` failed with "packages field missing or empty"

**Root cause:** `pnpm-workspace.yaml` had `allowBuilds` but missing required `packages` field

**Fix applied:** Added `packages: ['.']` to `pnpm-workspace.yaml`:
```yaml
packages:
  - '.'

allowBuilds:
  esbuild: true
  sharp: true
```

### Deployment Steps Executed:
1. Updated Vercel CLI: v42.3.0 → v59.11.7
2. Identified missing `packages` field in workspace config
3. Fixed `pnpm-workspace.yaml` with correct format
4. Verified local build still passes: ✅
5. Deployed successfully: `pnpm exec vercel deploy --yes`
6. Confirmed static output via deployment inspection

## Open items (not claimed done)

- **Task 20 — manual review matrix:** requires human browser review (320px overflow, keyboard pass, visual duotone quality, grayscale, throttled LCP). Checklist in `tasks.md`.
- Parent-owned: bounded review + delivery decision (already resolved: `size:exception`, single slice).

## Final state

- Working tree holds the full rebuild (uncommitted, awaiting user review/commit decision).
- Build evidence: `dist/` static output, audits above.
- Rollback: `baseline-pre-nba-rebuild` tag (local + origin).

## Content iteration 1 (2026-09-08, post-manual-review)

Maintainer-reviewed the rebuild (local preview) and requested content changes; documented in the design addendum:

1. Title → **Senior Software Engineer**; hero status badge → **Open to new opportunities** (Monokera remains in Season Log only).
2. Positioning + bio → approved Opción A texts; bio rendered as two paragraphs.
3. Attributes → new **AI-assisted development** group (Primary): Claude Code, Cursor, Codex, SDD.
4. Game Log → 7 case studies: + **Elenas App** (historical 3M+/200K+ framing) and **Elenas Web** (Turborepo + published packages).

Execution: mostly implemented by the maintainer's parallel Claude Code session (commit `a00d437`, signed, pushed); reconciled by this session — footer stale role fixed (`468265f`), approved bio applied (`d0c5593`). Build green; audits pass (landmarks, ids, hrefs, `lang="en"`, FSE occurrences all historical).

## Task 20 — manual review: DONE (user)

User reviewed the rebuild at localhost preview and approved visuals/interaction with content feedback — all feedback implemented and re-verified.

## Task 21 — deployment

- Vercel Git integration serves `origin/main`; production (`josecabarcas.dev`) currently serves `a00d437`.
- Preview deployment of final state (bio + footer): https://josecabarcas-gw4mu5xel-jose-cabarcas-projects.vercel.app (Ready, Vercel SSO protected).
- **Pending (user action):** review preview + promote to production from the Vercel dashboard.
