# Tasks: NBA Player Profile Portfolio Rebuild

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~3,300–3,900 reviewable lines (≈2,700–3,300 additions + ≈600 deletions; excludes image binaries and regenerated `pnpm-lock.yaml`) |
| 400-line budget risk | High — this forecast exceeds the 400-line review budget by roughly 8–10× |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (static config) → PR 2 (data + tokens + shell + assets) → PR 3 (components + index rewrite + legacy deletion) → PR 4 (audit fixes + preview) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

**Explicit exceed statement:** the rebuild creates/rewrites ~14 source files and deletes 7 legacy components. Even the smallest meaningful split (data module ~330 lines, `global.css` ~700 lines, components ~900 lines) puts every PR above the 400-line budget. Chained PRs reduce per-review surface but cannot get under 400 without splitting the design's coherent slice into broken intermediate states; a `size-exception` single-PR for this full-rebuild slice is a legitimate alternative. The parent must apply the `ask-on-risk` strategy before sdd-apply.

```text
Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High
```

**Testing note:** no unit-test runner exists and `strict_tdd` is false (`openspec/config.yaml`). RED/GREEN sequencing is not applicable; the automated gate for every task is `pnpm build` (`astro check && astro build`) plus the static-output audits in Task 19. No `.astro` unit tests may be written.

---

## Implementation tasks (dependency-ordered per design §10 rollout)

### Task 1 — Baseline verification gate

- [x] Verify the recoverable baseline before any destructive edit: run `git status` (expect clean or explainable tree), `git log --oneline -5`, confirm tag `baseline-pre-nba-rebuild` exists (`git tag -l baseline-pre-nba-rebuild`) and that `origin/main` matches the local baseline (`git rev-parse baseline-pre-nba-rebuild` vs `git rev-parse origin/main`). The baseline is already resolved and pushed — this task only verifies it; if verification fails, stop and escalate before touching `src/`. <!-- sdd-owner: implementation -->

**Scope:** no file changes; read-only git inspection.
**Acceptance:** tag present, origin/main at the tag (or ahead-of in a safe direction), working tree understood.
**Verification:** the three git commands above plus `git show --stat baseline-pre-nba-rebuild | head -5`.

### Task 2 — Static delivery configuration (design §8, §9 "Modify")

- [x] Convert `astro.config.mjs` to `output: 'static'` with no adapter import; remove `"@astrojs/vercel"` from `package.json` dependencies only (keep `astro`, `@astrojs/check`, `typescript`, `vercel` devDependency, all scripts); ensure `.gitignore` ignores `.vercel/` generated output (with intentional `!.vercel/project.json` exception only if the CLI deployment path needs it, no stale `.vercel/output/` committed); run `pnpm install` to regenerate `pnpm-lock.yaml` (never hand-edit it); add no `vercel.json`. <!-- sdd-owner: implementation -->

**Scope:** `astro.config.mjs`, `package.json`, `.gitignore`, `pnpm-lock.yaml` (regenerated).
**Acceptance (spec: static-delivery):** build emits pure static HTML with no `_render.func` or server chunks; adapter dependency gone from lockfile importer.
**Verification:** `pnpm install && pnpm build`, then `find dist -name '_render.func' -o -name '*.node'` returns nothing and `dist/index.html` exists.

### Task 3 — Typed content module (design §2, §9 "Create")

- [x] Create `src/data/profile.ts` with the exact strict TypeScript contracts from design §2 (`AttributeLevel`, `HeadshotAsset`, `HeroIdentity`, `CareerStat`, `SeasonLogEntry`, `AttributeGroup`, `Highlight`, `GameLogCaseStudy`, `ProfileLink`, `ProfileContent`) and populate the readonly `profile` export with exactly: the hero identity (name, Monokera current role `Oct 2024 – Jul 2026`, Barranquilla location, frontend-specialist positioning, SDD bio, `heroStatKeys`), the ten Career Stat cards with the exact values/labels/scope flags from design §2 (historical `elenas-history` flag on 3M+/200K+), the six Season Log entries in order with the three-role Elenas progression, the seven Attribute groups (including the separated `learning-exploration` group with `experience: 'learning'`), the eight Highlights, the five Game Log case studies with `outcomeLabel` set per design, and exactly the three links (GitHub, LinkedIn, mailto). Do not add, merge, or invent any metric, employer, technology, project, or outcome beyond this transcription. <!-- sdd-owner: implementation -->

**Scope:** create `src/data/profile.ts`.
**Acceptance (specs: content-truth, career-stats, season-log, attributes, highlights, game-log, draft-me):** every string traces to `Jose_Cabarcas_Portfolio_Context.md` via design §2; types are literal/readonly as specified.
**Verification:** `pnpm astro check` passes with strict types; manual diff of `profile` fields against design §2 tables.

### Task 4 — Design tokens and global stylesheet (design §3, §6, §7)

- [x] Create `src/styles/global.css` with the reset, the exact `:root` token block from design §3 (colors, fonts, text scale, spacing, radii, `--content-width`, `--shadow-panel`), typography rules, responsive section layouts for all seven sections per design §6 (desktop ≥900px and mobile breakpoints, no horizontal scroll at 320px), `:focus-visible` states, portrait duotone treatment (`grayscale(1) contrast(1.08)`, accent blend and gradient pseudo-elements, `aspect-ratio: 2 / 3`), card/panel/rail/badge styles, header sticky + scrolled-state rule, the reveal-pending class, and the exact `prefers-reduced-motion` block from design §7. Accent (`#67e8f9`) is the only hue; no red/green/orange/purple gradients. <!-- sdd-owner: implementation -->

**Scope:** create `src/styles/global.css`.
**Acceptance (specs: accessibility, performance):** token contrast ratios match design §3; reduced-motion block disables all nonessential motion and forces `.reveal-pending` visible; no content hidden by default CSS.
**Verification:** token-block grep against design §3 values; visual pass at 1280/900/390/320px after Task 18.

### Task 5 — Layout shell rewrite (design §1, §4)

- [x] Rewrite `src/layouts/Layout.astro` as the English document shell: `<html lang="en">`, skip link as first focusable element, fixed truthful metadata (title `José Cabarcas — Frontend Staff Engineer`, matching description, canonical `https://josecabarcas.dev/`, `og:*` and Twitter `summary_large_image` tags pointing to `/og/jose-cabarcas-profile.png`), `/favicon.svg` link, Google Fonts non-blocking strategy (preconnect ×2 with `crossorigin`, preload→`rel="stylesheet"` on `onload`, `noscript` fallback, only the listed Barlow Condensed 600/700, IBM Plex Mono 400/500, DM Sans 400/500/600 weights), and the `global.css` import. No synchronous render-blocking remote stylesheet in the built head. <!-- sdd-owner: implementation -->

**Scope:** rewrite `src/layouts/Layout.astro`.
**Acceptance (specs: footer-metadata, accessibility, performance):** built `<head>` contains exactly the design metadata, non-blocking font links, and `lang="en"`; OG file referenced exists (Task 8).
**Verification:** `pnpm build && grep -E 'lang="en"|og:image|fonts.googleapis|rel="preload"' dist/index.html`; no `stylesheet` link without `onload`/`noscript` pair.

### Task 6 — Progressive enhancement script (design §1, §7)

- [x] Create `src/scripts/site.ts` with only: mobile menu behavior (native button toggle with `aria-expanded`, Escape close, close-on-link-activation, focus first link on open, focus return to toggle, `data-menu-enhanced` on root before collapsing so no-JS fallback keeps links visible), the `data-scrolled` header attribute after 8px, and the single IntersectionObserver reveal (threshold 0.12, unobserve after reveal, immediate reveal when IO unavailable, `.reveal-pending` only added when `matchMedia('(prefers-reduced-motion: reduce)')` is false). No hydration framework, animation package, or data fetching. <!-- sdd-owner: implementation -->

**Scope:** create `src/scripts/site.ts`.
**Acceptance (specs: header-navigation, accessibility, performance):** menu state machine and reveal behavior match design §7 exactly; content fully visible with the script absent.
**Verification:** `pnpm astro check`; post-build manual pass (keyboard menu open/close/Escape/focus-return; JS-disabled full-content check) in Task 20.

### Task 7 — Portrait asset pipeline (design §5, §9 "Create" images)

- [x] Generate committed portrait variants under `public/images/` from `/Users/josecabarcas/Downloads/Jose Omar Cabarcas Gutíerrez_A9A3905.jpg` (2400×3600, 2:3) at the design's exact dimensions: `jose-cabarcas-portrait-{640,960,1200}.avif`, `jose-cabarcas-portrait-{640,960,1200}.webp` (each at 640×960 / 960×1440 / 1200×1800), and `jose-cabarcas-portrait-960.jpg` (960×1440 fallback). First check encoder availability (`command -v cwebp avifenc magick`); macOS `sips` can only produce JPG (and resize). If `cwebp`/`avifenc`/ImageMagick are unavailable, fall back to `sips`-derived 960×1440 JPG plus whatever webp tooling exists, and document in the commit/PR exactly which variants were actually produced and which design-listed files are missing (the design treats the exact variant list as a release requirement — flag the gap, do not silently ship the 2400×3600 original as the only asset). Do not bake duotone/crop into the images (CSS-only treatment). <!-- sdd-owner: implementation -->

**Scope:** create `public/images/jose-cabarcas-portrait-*` (7 target files); source Downloads file is preprocessing-only, never committed.
**Acceptance (specs: player-card-hero, performance):** committed variants at exact dimensions preserving 2:3; raw 2400×3600 original is not the only browser asset in `dist/`.
**Verification:** `sips -g pixelWidth -g pixelHeight public/images/*` (or `file public/images/*`) matches the design dimension table; `find dist -name '*.jpg' -o -name '*.webp' -o -name '*.avif' | grep portrait` lists the variants actually emitted.

### Task 8 — Favicon and OG image (design §4, §5)

- [x] Replace `public/favicon.svg` with a small monochrome-and-accent `JC`/court-line-inspired SVG (no stock Astro rocket), and create `public/og/jose-cabarcas-profile.png` at exactly 1200×630 with the dark-stadium treatment and truthful visible identity (name and role text matching the site metadata). If no raster tooling can author the OG PNG at that size, escalate rather than reference a missing asset — the metadata must point at a real emitted file (design §5 includes it in the first slice). <!-- sdd-owner: implementation -->

**Scope:** modify `public/favicon.svg`; create `public/og/jose-cabarcas-profile.png`.
**Acceptance (spec: footer-metadata):** favicon is branded and tiny; OG PNG exists at 1200×630 and is referenced by the Layout meta tags.
**Verification:** `file public/og/jose-cabarcas-profile.png` reports 1200×630; `grep 'og:image' dist/index.html` resolves to the emitted file in `dist/og/`.

### Task 9 — Header navigation rewrite (design §1, §6)

- [x] Rewrite `src/components/Header.astro` in place: semantic `header` + `nav`, `JC / PROFILE` wordmark, six mono anchor links (career-stats, season-log, attributes, highlights, game-log, draft-me), bordered `Draft Me` action, and a real mobile menu button below 768px with text-visible `Menu`/`Close` label, `aria-expanded`/`aria-controls`, keyboard/touch operation, and static-HTML fallback (links visible by default until `data-menu-enhanced` collapses them). Sticky translucent surface with bottom rule; no dead button, no smooth-scroll-only script. <!-- sdd-owner: implementation -->

**Scope:** rewrite `src/components/Header.astro`.
**Acceptance (specs: header-navigation, accessibility):** every href resolves to a real section id in the built page; toggle state/focus behavior per design §7.
**Verification:** `grep -oE 'href="#[a-z-]+"' dist/index.html | sort -u` all resolve; manual keyboard/Escape/JS-off pass in Task 20.

### Task 10 — PlayerCardHero component (design §1, §2, §6)

- [x] Create `src/components/PlayerCardHero.astro` rendering `profile.hero` + `profile.links`: identity (name, `Frontend Staff Engineer` role, Monokera current-role context, location), positioning statement, bio, responsive `<picture>` portrait using exactly the design §5 markup (AVIF srcset, WebP srcset, 960×1440 JPG fallback, `width`/`height`/`sizes="(max-width: 700px) 42vw, 360px"`/`alt="Professional portrait of José Cabarcas"`/`loading="eager" fetchpriority="high"`), the three hero stat cards from `heroStatKeys` (11+ years, 5–7 led, historical 3M+/200K+ with shutdown context adjacent, not in a tooltip), Career Stats CTA, and direct email/Draft Me actions. Compact two-column card ≥900px, ~38–42vw portrait top row on mobile, auto height, no `100vh`. <!-- sdd-owner: implementation -->

**Scope:** create `src/components/PlayerCardHero.astro`.
**Acceptance (specs: player-card-hero, content-truth, performance):** all hero facts come from `profile.hero`; historical framing visible; next section begins in viewport at 1280×800 and 390×844.
**Verification:** built HTML picture/attribute inspection; Task 20 viewport checks.

### Task 11 — CareerStats component

- [x] Create `src/components/CareerStats.astro` as `section#career-stats` rendering all ten `profile.stats` cards with value/label/detail in normal flow: `02 / CAREER STATS` heading, four-column desktop grid with the two `elenas-history` cards sharing a labeled historical band, two-column mobile grid with long cards spanning, before/after arrows only inside the performance value strings. No derived or invented metrics; `6` labeled Employers, `2` labeled Stores published. <!-- sdd-owner: implementation -->

**Scope:** create `src/components/CareerStats.astro`.
**Acceptance (specs: career-stats, content-truth):** exactly ten cards matching design §2 values; historical wording adjacent to both scale figures.
**Verification:** count `CareerStat` render sites in built HTML; Task 19 numeric audit against the context source.

### Task 12 — SeasonLog component

- [x] Create `src/components/SeasonLog.astro` as `section#season-log` rendering all six `profile.seasonLog` entries chronologically with exact date strings, locations, summaries, and individually addressable ids; the Elenas entry renders the ordered three-role progression (`Senior Frontend Developer → Tech Lead → Frontend Staff Engineer` with dates) as a visible ordered sub-list. Vertical rail desktop layout (left rule, date marker, detail panel); stacked mobile layout with 1px left rule. All facts in static HTML — no hover-only or JS-gated detail. <!-- sdd-owner: implementation -->

**Scope:** create `src/components/SeasonLog.astro`.
**Acceptance (spec: season-log):** six static entries in chronological order; three Elenas roles visible without JS.
**Verification:** `grep -c` season entry ids in `dist/index.html`; JS-disabled inspection in Task 20.

### Task 13 — Attributes component

- [x] Create `src/components/Attributes.astro` as `section#attributes` rendering the seven `profile.attributes` groups as capability panels with visible text level badges (`Primary`, `Strong`, `Working / Applied`), group descriptions, and wrapped item chips; the `learning-exploration` group is visually separated with `Learning / exploration` text markers and a distinct rule, never described as production experience. Three-column desktop board (Primary row → Strong row → Working/Learning below), one-column mobile. No numbers, ratings, percentiles, years-per-skill, endorsements, certifications, or color/width/icon-only proficiency signals anywhere in the section. <!-- sdd-owner: implementation -->

**Scope:** create `src/components/Attributes.astro`.
**Acceptance (spec: attributes):** every item traceable to context; levels are text and survive grayscale.
**Verification:** `grep -E '[0-9]+/10|%|score' dist/index.html` returns nothing inside the attributes section; Task 19/20 audits.

### Task 14 — Highlights component

- [x] Create `src/components/Highlights.astro` as `section#highlights` rendering the eight `profile.highlights` cards as a two-column editorial grid (one column mobile), each with mono index, title, and explicit `MOMENT` / `CHALLENGE` / `RESULT` labeled fields; accent rule on hover/focus only, never required for comprehension; `data-reveal` attribute for the Task 6 enhancement. The SDD card keeps the same structure; no outcome attributed to AI beyond the documented workflow; no merged claims across the eight stories. <!-- sdd-owner: implementation -->

**Scope:** create `src/components/Highlights.astro`.
**Acceptance (spec: highlights):** eight separate cards matching design §2 ownership scoping.
**Verification:** card count and label presence in built HTML; Task 19 content audit.

### Task 15 — GameLog component

- [x] Create `src/components/GameLog.astro` as `section#game-log` rendering the five `profile.gameLog` case studies as box-score cards with a four-row `dl` (Context, Role, Stack as text list, and Outcome or Responsibility per `outcomeLabel`). Two-column desktop, one-column mobile. No fake scores, points, percentages, decorative numeric badges, or project links (context provides no verified URLs). <!-- sdd-owner: implementation -->

**Scope:** create `src/components/GameLog.astro`.
**Acceptance (spec: game-log):** five cards, uniform four-field shape, no links, no invented stats.
**Verification:** inspect each card's four field labels in `dist/index.html`; Task 19 link/numeric enumeration.

### Task 16 — DraftMe component

- [x] Create `src/components/DraftMe.astro` as `section#draft-me` rendering the final contact CTA from `profile.links`: prominent plain `mailto:` primary action, GitHub and LinkedIn as secondary bordered links with `target="_blank" rel="noreferrer"` and descriptive text labels, no form and no JavaScript requirement. Include the compact education supporting fact (Diploma in Software Engineering 2016; B.S. in Systems Engineering 2011–2016, Universidad Simón Bolívar) only if it stays a small footnote, not a new section. <!-- sdd-owner: implementation -->

**Scope:** create `src/components/DraftMe.astro`.
**Acceptance (spec: draft-me):** exactly the three confirmed links; mailto is the most prominent action; usable with JS disabled.
**Verification:** enumerate section hrefs in built HTML; JS-off click-through in Task 20.

### Task 17 — Footer rewrite

- [x] Rewrite `src/components/Footer.astro` in place: repeat only the real contact links (GitHub, LinkedIn, mailto) and valid in-document section navigation; no placeholder anchors, no unverified social links, no `href="#"`. <!-- sdd-owner: implementation -->

**Scope:** rewrite `src/components/Footer.astro`.
**Acceptance (specs: draft-me, footer-metadata):** every footer href resolves to a real section id or confirmed external URL.
**Verification:** `grep -oE 'href="[^"]*"' dist/index.html` global enumeration in Task 19; no `#`, `example.com`, YouTube, or Twitch matches.

### Task 18 — Page composition and legacy deletion (design §1, §9 "Delete")

- [x] Rewrite `src/pages/index.astro` to the exact seven-section composition from design §1 (`Header` → `main#main-content` with `PlayerCardHero`, `CareerStats`, `SeasonLog`, `Attributes`, `Highlights`, `GameLog`, `DraftMe` → `Footer`), importing only typed data from `src/data/profile.ts` and containing no professional copy of its own; then delete `src/components/Hero.astro`, `CodeWindow.astro`, `About.astro`, `Skills.astro`, `Projects.astro`, `Contact.astro`, and `Section.astro`. No old placeholder project/social data migrates into the new module. <!-- sdd-owner: implementation -->

**Scope:** rewrite `src/pages/index.astro`; delete 7 legacy component files.
**Acceptance (specs: content-truth, all section specs):** page builds with only the new imports; no stale references to deleted components.
**Verification:** `pnpm build` passes; `ls src/components` shows only the nine current components.

### Task 19 — Build and static-output audits (design §10 steps 3–6)

- [x] Run `pnpm build` (must pass both `astro check` and `astro build`) and audit the output: (a) `dist/index.html` exists with static HTML and no `_render.func`/server chunks; (b) exactly one each of `h1`, `header`, `nav`, `main`, `footer`, logical heading order, and all six section ids (`career-stats`, `season-log`, `attributes`, `highlights`, `game-log`, `draft-me`); (c) all header/footer/menu/CTA hrefs resolve; no `href="#"`, `example.com`, YouTube, Twitch, or stale Astro branding strings; (d) every image/favicon/OG file referenced by HTML exists in `dist/` and the raw 2400×3600 portrait is not the only browser asset; (e) enumerate all numeric text in Career Stats and Game Log and compare to the context source; confirm the Attributes section contains no numeric levels or ratings. <!-- sdd-owner: implementation -->

**Scope:** read-only `dist/` and source inspection; fixes to any component/data defect found.
**Acceptance (specs: static-delivery, accessibility, content-truth, career-stats, attributes, game-log):** every check in the design §10 automated gate passes.
**Verification:** the audit commands themselves (grep/find against `dist/index.html` and `dist/`), recorded in the PR description.

### Task 20 — Manual review matrix (design §10 manual checklist)

- [x] Run `pnpm preview` and complete the design §10 manual checklist: 1280×800 and 390×844 hero compactness with Career Stats beginning visible; 320px with no horizontal scrollbar and wrapping long values; Tab order (skip link → header → hero actions → document order) with visible focus everywhere; mobile menu keyboard/touch/Escape/close-on-link/focus-return; anchor targets land below the sticky header; JavaScript-disabled full content and email action; reduced-motion disabling smooth scroll/reveals without hiding content; grayscale and zoom preserving attribute levels, timeline dates, and CTA meaning; throttled-network hero/font check (no CLS, fallback fonts immediate); Elenas scale visibly historical and no generic full-stack positioning. <!-- sdd-owner: implementation -->

**Scope:** `pnpm preview` sessions; fixes for any found defect, re-verified.
**Acceptance (specs: accessibility, performance, header-navigation, player-card-hero, content-truth):** every manual checklist line passes.
**Verification:** completed checklist recorded against the preview URL.

### Task 21 — Vercel preview deployment (design §10 rollout step 6)

- [x] Deploy a Vercel preview of the rebuilt static output (existing CLI/project integration), inspect that the deployment serves the static `dist/` through the CDN (no serverless render function in the deployment output, correct OG/favicon/image URLs over the CDN), and confirm the preview passes a spot-check of the manual matrix. Only after preview validation is the rebuild promoted. Keep `.vercel/` generated output out of source control before/after. <!-- sdd-owner: implementation -->

**Scope:** deployment/preview inspection only; no further source changes expected.
**Acceptance (spec: static-delivery):** preview URL serves static HTML; deployment output shows no serverless page function.
**Verification:** Vercel deployment logs/output listing plus preview URL spot-check.

---

## Parent-owned actions (post-apply)

- [ ] Start or reuse bounded review covering the design §9 manifest completeness, content-truth spot checks against `Jose_Cabarcas_Portfolio_Context.md`, and the accessibility/static-delivery requirement matrix. <!-- sdd-owner: parent -->
- [ ] Apply the ask-on-risk delivery decision recorded in the Review Workload Forecast (chain the suggested PR split or approve a size-exception single PR) before merging/promoting past the preview. <!-- sdd-owner: parent -->
