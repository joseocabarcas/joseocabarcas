# Verify Report: nba-player-profile-rebuild

- **Change:** `nba-player-profile-rebuild`
- **Date:** 2026-09-08
- **Verifier:** SDD verify executor (delegated)
- **Store:** openspec
- **Overall verification of implementation: PASS** (all 13 domain specs verified with evidence) — **but the change is NOT archive-ready** (see Blockers).
- **Strict TDD:** not active (`strict_tdd: false` in `openspec/config.yaml`; no unit-test runner exists). TDD evidence checks skipped by design; `pnpm build` (`astro check && astro build`) is the automated gate per config.
- **Status/action-context guard:** artifact store is `openspec` and `openspec/changes/nba-player-profile-rebuild/` is authoritative; implementation ownership verified — all changed files live inside the project root (`src/**`, `public/**`, config files). No `workspace-planning` constraints were provided or needed.

---

## 1. Verification commands run (final gate)

| Command | Result |
| --- | --- |
| `pnpm build` (astro check && astro build) | **PASS** — 0 type errors, 1 page built (run twice: pre-audit baseline and post-fix final gate) |
| `find dist -name '_render.func' -o -name '*.node'` | 0 results — pure static output |
| Landmark grep (`h1/header/nav/main/footer/section`) | 1/1/1/1/1/7 — exactly one of each landmark, 7 `section` elements |
| `grep -oE 'href="[^"]*"' dist/index.html` (global enumeration) | clean — see §4 |
| Per-section numeric extraction (Python, tags stripped) | clean — see §3 |
| Asset existence check (favicon, OG, 7 portrait variants, CSS) | all present in `dist/` |
| `git tag -l baseline-pre-nba-rebuild` | tag exists |
| `grep '@astrojs/vercel' pnpm-lock.yaml` / `package.json` | 0 occurrences — adapter fully removed |
| `ls vercel.json` | absent (correct) |

Parent-previously-run audits (confirmed still true on fresh dist): single h1/header/nav/main/footer, six section ids, clean href audit, `lang="en"`, zero `_render.func`, all image variants (AVIF 640/960/1200 + WebP ×3 + 960 JPG 960×1440 + OG PNG 1200×630 + favicon.svg).

## 2. Code fix applied during verification (small, unambiguous, within scope)

**One defect found and fixed (1 line changed in `src/styles/global.css`, then rebuilt):**

- **Issue:** the reduced-motion block ended with `.reveal-pending { opacity: 1 !important; transform: none !important; }`, but `.reveal-pending` sets its motion via the `translate` property (`translate: 0 12px`), not `transform`. Under `prefers-reduced-motion: reduce`, the 12px offset would not be neutralized — failing Task 4 acceptance ("reduced-motion block disables all nonessential motion and forces `.reveal-pending` visible") and the Accessibility spec's reduced-motion requirement at the motion level (opacity visibility was already correct).
- **Fix:** added `translate: none !important;` to that rule.
- **Re-verification:** `pnpm build` re-run → PASS; emitted `dist/_astro/index.CM1qWDrW.css` now contains `reveal-pending{opacity:1!important;transform:none!important;translate:none!important}`. All landmarks/hrefs/assets re-audited on the fresh dist and remain clean.
- Note: this state is only reachable if the class were applied by other means (site.ts correctly skips `.reveal-pending` under reduced motion), so the defect was defense-in-depth, not a live user-facing bug.

## 3. Content-truth deep audit (delegated item 1 & 2)

### 3a. Numeric traceability — every numeric token in `dist/index.html` vs `Jose_Cabarcas_Portfolio_Context.md`

| Section | Numeric tokens found | Trace to context document |
| --- | --- | --- |
| Hero | `01` (mono index), `11+`, `5–7`, `3M+`, `200K+`, `2014`, `2024`, `2026` | `11+ years` ✓ (Who I am); `teams of 5–7 engineers` ✓ (tech list / Tech Lead role); `3 million app downloads and 200,000 daily active users` ✓ (career arc #5); bio dates match Janus IT 2014 and role history ✓ |
| Career Stats | `11+`, `6`, `5–7`, `3M+`, `200K+`, `24s→7s`, `14s→5s`, `~30%`, `~25%`, `2`, `2014`, `2024` (+ `02` index) | all ten design §2 cards present with exactly these values ✓ — `11+` ("11+ years of experience"), `6` employers (six arc chapters), `5–7` (Tech Lead role), `3M+`/`200K+` (career arc #5), `24s→7s` and `14s→5s` (Tech Lead performance project), `~30%` (Monokera Rollup initiative), `~25%` (Jest→Vitest at Monokera), `2` stores (Staff Engineer role: "Published the app directly to Google Play and the App Store"), `Since October 2014` (Janus IT dates) |
| Season Log | years `2014, 2016, 2019, 2020, 2021, 2023, 2024, 2026` (+ `03` index) | all are the exact employer/role date strings from the context's role headers ✓ — no other numerics |
| Attributes | `04` index and `S3` (inside "AWS Lambda / CloudFront / S3", a product name) | **zero numeric ratings** ✓ — the only digits are the section index and the S3 product name; no `/10`, `%`, `score`, percentile, or years-per-skill anywhere in the section |
| Highlights | card indices `01–08` (decorative mono indexes), `47`, `51` (Expo 47 → 51 ✓), `24s`, `7s`, `14s`, `5s` (performance project ✓) | all traced ✓ |
| Game Log | `06` index only | **zero numeric content** in all five case studies ✓ — no fake box-score numbers |
| Draft Me | `2016`, `2011–2016` (+ `07` index) | education footnote matches the context Education section exactly ✓ |

**Elenas historical framing (adjacent, not tooltip):** both hero ("Elenas scale (historical)" + "By the time José left in 2024; the company later shut down.") and Career Stats (band label "Historical — Elenas scale at departure (2024)" wrapping both cards, plus per-card details "…the company later shut down." / "…not a current app-store claim."). **PASS** — matches the context's own "not independently verifiable via the app stores anymore" framing.

**Six season-log entries:** Janus IT (Oct 2014 – Feb 2016, Barranquilla), Joonik (Mar 2016 – Mar 2019, Barranquilla), Merqueo (Mar 2019 – Sep 2019, Bogotá), Picap (Oct 2019 – Apr 2020, Bogotá), Elenas (May 2020 – Oct 2024, Remote), Monokera (Oct 2024 – Jul 2026, Remote) — exact dates and locations, chronological, individually addressable ids (`janus-it`, `joonik`, `merqueo`, `picap`, `elenas`, `monokera` all present in built HTML). **Elenas three-role progression is an ordered visible list** with dates: Senior Frontend Developer (May 2020 – Oct 2021) → Tech Lead (Oct 2021 – Aug 2023) → Frontend Staff Engineer (Aug 2023 – Oct 2024). **PASS.**

**Eight highlights:** store-compliance, eas-pipeline, expo-migration, clean-architecture, vite-dashboard, sales-builder, performance-project, sdd-workflow — all present as separate MOMENT/CHALLENGE/RESULT cards, ownership scoped exactly as the context states (e.g., performance project attributed to the Tech Lead-era performance work, SDD card describes the documented workflow with no AI-outcome inflation). **PASS.**

**Five game-log case studies:** Monokera-Core (Outcome), Mi Banco (Responsibility), Sales Builder (Outcome), Stories Feature (Outcome), Mobile CI/CD pipeline (Outcome) — uniform four-row `dl` (Context / Role / Stack / Outcome-or-Responsibility), stack as text chips, no links, no invented metrics. `outcomeLabel` matches design §2 per card. **PASS.**

**Attributes learning labeling:** WatermelonDB, MMKV, CQRS/Event Sourcing each render with an adjacent "Learning / exploration" chip-note, the group is titled "Learning / exploration" with description "Studied and practiced outside production — never presented as production experience", and a divider rule reading "Learning / exploration — not production experience" separates it from production groups. **PASS.**

**No conflation with legacy claims:** the banned legacy claims (Angular/Laravel/Java bio, "9 years", generic "Frontend & Mobile Developer" title) are absent from the built page. Positioning copy is frontend-specialist-first everywhere (hero positioning, Draft Me copy, metadata description). **PASS.**

## 4. Metadata audit (delegated item 3)

Built `<head>` contains: title `José Cabarcas — Frontend Staff Engineer` ✓; description matches design §4 verbatim ✓; canonical `https://josecabarcas.dev/` ✓; `og:type=website`, `og:title/og:description/og:url` equal to title/description/canonical ✓; `og:image=/og/jose-cabarcas-profile.png` → **file exists in `dist/og/` at 1200×630** ✓; `twitter:card=summary_large_image` + matching twitter:title/description/url/image ✓; `link rel="icon"` → `/favicon.svg` (custom JC/court-line SVG, no Astro rocket) ✓; `<html lang="en">` ✓. **PASS.**

## 5. Code-level accessibility audit (delegated item 4)

| Check | Evidence | Result |
| --- | --- | --- |
| Skip link first focusable | `<body>` first element is `<a class="skip-link" href="#main-content">`; CSS hides via `transform: translateY(-200%)` and restores on `:focus-visible` | PASS |
| `:focus-visible` styles | global `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }` — no bare `outline: none` without replacement | PASS |
| Menu button semantics | `aria-expanded="false"` (toggled by JS), `aria-controls="site-nav-list"` → `ul#site-nav-list` exists; text-visible Menu/Close label swapped by JS | PASS |
| Portrait alt | `alt="Professional portrait of José Cabarcas"` — descriptive, not keyword stuffing | PASS |
| Picture element | `<picture>` with AVIF + WebP sources, `<img width="960" height="1440" sizes="(max-width: 700px) 42vw, 360px" loading="eager" fetchpriority="high" decoding="async">` | PASS |
| Reduced-motion CSS block | present; disables smooth scroll, all animation/transition durations, forces `.reveal-pending` fully visible and un-offset (after this verification's 1-line fix) | PASS (after fix) |
| No-JS fallback (`data-menu-enhanced`) | `site.ts` sets `data-menu-enhanced` on `<html>` before any collapsing; CSS only hides `.nav-list`/`.header-cta` and shows `.menu-toggle` under `[data-menu-enhanced]` at <768px — without JS the links stay visible; reveal class only added by JS, content complete in static HTML | PASS |
| Keyboard menu behavior in code | native `<button>` toggle (Enter/Space free), Escape closes + returns focus to toggle, close-on-link-activation, focus first link on open | PASS (code-level; live keyboard pass → manual review) |
| Heading hierarchy | 1× h1 → 6× h2 (one per section) → h3s inside sections; no skipped levels | PASS |

## 6. Performance checks (delegated item 5)

- **Font loading non-blocking:** 2× preconnect (googleapis, gstatic with `crossorigin`), `<link rel="preload" as="style" … onload="this.rel='stylesheet'">` swap pattern, `<noscript><link rel="stylesheet">` fallback; URL requests only Barlow Condensed 600/700, IBM Plex Mono 400/500, DM Sans 400/500/600 with `display=swap`. **No synchronous render-blocking remote stylesheet** in the built head. PASS. *(Minor note: the googleapis preconnect omits `crossorigin` while design §4 says "×2 with crossorigin" — this is the correct web-perf practice, since the CSS fetch is non-CORS; adding `crossorigin` there would force a second connection. Deliberate, beneficial deviation from the design's letter.)*
- **Scripts:** the whole enhancement script is one small inline `<script type="module">` (deferred by spec); **no external script bundle, no hydration/framework chunks** — `dist/_astro/` contains only CSS. PASS.
- **Images:** srcset covers 640/960/1200 in AVIF+WebP with a 960×1440 JPG fallback; explicit width/height + CSS `aspect-ratio: 2/3` reserves the layout box (no CLS from markup). PASS.
- **Static delivery:** `output: 'static'`, no adapter import, `@astrojs/vercel` gone from package.json and lockfile, no `vercel.json`, `.vercel/` ignored, zero `_render.func`/`.node` in dist. PASS.

## 7. Per-requirement verification matrix (13 specs)

| Spec | Requirement | Result | Evidence |
| --- | --- | --- | --- |
| accessibility | Semantic landmarks/heading hierarchy | PASS | §5 landmark grep; h1×1, h2×6, ordered h3s |
| accessibility | Keyboard reachability/focus/accessible names | PASS (code) / **manual pending** | `:focus-visible` styles, native controls, aria attrs in dist; live Tab pass needs a browser |
| accessibility | Descriptive headshot alt; decorative visuals non-semantic | PASS | only one img (portrait, descriptive alt); all texture is CSS |
| accessibility | Meaning not color/hover/motion/metaphor alone | PASS (code) / **manual pending** | levels, dates, labels all text; grayscale pass needs eyes |
| accessibility | Reduced-motion support | PASS (after fix) | reduced-motion block + JS gating verified in built CSS/JS |
| accessibility | Responsive no-overflow/no-hidden-essentials | **manual pending** | CSS has `overflow-x: clip`, `overflow-wrap: anywhere` guards; 320px check needs a browser |
| attributes | Qualitative levels only, no numerics | PASS | §3a: zero numeric ratings in section |
| attributes | Traceable conservative grouping | PASS | every item present in the context tech list / role sections; levels match production depth |
| attributes | Learning topics labeled learning | PASS | WatermelonDB/MMKV/CQRS labeled, separated group + divider |
| attributes | Grouped by capability | PASS | 7 labeled groups, no keyword wall |
| career-stats | Verified stats with explanatory labels | PASS | 10/10 cards, values+labels+details trace; `6` labeled Employers, `2` labeled Stores published |
| career-stats | Elenas scale as historical context | PASS | band label + per-card shutdown wording adjacent |
| career-stats | No metric forced into the metaphor | PASS | no percentiles/rankings/scores anywhere in the grid |
| content-truth | Every claim traces to context | PASS | §3a full-page traceability; no legacy claims survive |
| content-truth | No placeholder URLs | PASS | global href enumeration: only in-document anchors, 3 confirmed contact URLs, font hosts, asset paths |
| content-truth | Production vs learning distinction | PASS | learning items labeled in the only section where they appear |
| content-truth | Frontend-specialist positioning | PASS | hero/Draft Me/metadata all specialist-first; no "full-stack generalist" identity copy |
| content-truth | Qualitative attributes + `lang="en"`, English copy | PASS | `lang="en"`; all visible copy, aria-labels, alt, metadata English |
| content-truth | Education as supporting fact only | PASS | single footnote line in Draft Me, matches context exactly |
| draft-me | Confirmed links only | PASS | mailto + github/joseocabarcas + linkedin/jose-cabarcas exactly; no other social anywhere |
| draft-me | Works without JavaScript | PASS (code) / manual pending | plain anchors in static HTML; no form, no handler |
| draft-me | Obvious next action + accessible names | PASS (code) / manual pending | email is the primary `.btn-primary`; all links have descriptive text names |
| draft-me | No contact form | PASS | no `form`/input anywhere in dist |
| footer-metadata | Footer real destinations only | PASS | footer hrefs = 6 section anchors + 3 confirmed links |
| footer-metadata | `lang="en"` | PASS | dist html tag |
| footer-metadata | Metadata truthful + branded favicon/OG | PASS | §4; OG file exists at 1200×630; custom JC favicon |
| footer-metadata | Content extracted into typed module | PASS | `src/data/profile.ts` sole content source; `astro check` passes |
| game-log | Five documented case studies | PASS | all five, names/stacks/roles match context Projects section |
| game-log | Consistent card data shape | PASS | 4-row `dl` uniform; Responsibility used where no outcome metric is documented (Mi Banco) |
| game-log | No placeholder links/fake demos | PASS | zero hrefs inside game-log cards |
| game-log | No fabricated statistics | PASS | zero numeric content beyond section index |
| header-navigation | Semantic header, wordmark, anchors resolve | PASS | all six `#anchor` hrefs resolve to built ids; one header/nav |
| header-navigation | Visible contact action | PASS | `Draft Me` header CTA → `#draft-me` |
| header-navigation | Skip link first and functional | PASS (code) / manual pending | first focusable; live Tab check needs browser |
| header-navigation | Operable mobile navigation | PASS (code) / manual pending | real toggle w/ state machine, Escape, close-on-link, focus return; no dead button |
| header-navigation | Visible focus states | PASS (code) | `:focus-visible` outline everywhere; no removed outlines |
| highlights | Highlight set covers documented achievements | PASS | 8/8, including exact 24s→7s / 14s→5s figures |
| highlights | Scoped ownership, no merged claims | PASS | compliance rescue and EAS pipeline kept distinct; ownership wording matches context |
| highlights | Moment/challenge/result framing | PASS | labeled fields on every card |
| performance | Minimal client JavaScript | PASS | one inline type=module script, no libraries/hydration |
| performance | Non-blocking fonts w/ stable fallbacks | PASS (markup) / **manual pending** | preload+swap+noscript verified; throttled-network check needs browser |
| performance | Image sizing prevents layout shift | PASS | width/height + aspect-ratio + responsive variants |
| performance | Static delivery | PASS | static build verified; deployment-output inspection is Task 21 scope |
| player-card-hero | Optimized real headshot asset | PASS | web-safe path, 7 variants, original not shipped |
| player-card-hero | Hero identity content | PASS | name/role/current-role/location verbatim; specialist positioning |
| player-card-hero | Verified key stat row | PASS | 11+ / 5–7 / historical 3M+·200K+ with adjacent shutdown context |
| player-card-hero | Short specific bio card | PASS | specific narrative; no template filler ("passionate…" absent) |
| player-card-hero | Scroll CTA + contact access | PASS | Career Stats, Draft Me, email anchors all resolve |
| player-card-hero | Compact card exposes following content | **manual pending** | viewport checks at 1280×800 / 390×844 need a browser |
| season-log | Complete accurate timeline | PASS | 6/6 entries, exact dates, Merqueo "Full Stack Developer" + Bogotá locations correct |
| season-log | Elenas progression explicit | PASS | ordered 3-role list with dates in static HTML |
| season-log | Plain document content | PASS | all facts static; no hover/JS-gated detail |
| season-log | Anchorable entries | PASS | 6 entry ids present and resolvable |
| static-delivery | Static output config | PASS | `output: 'static'`, no adapter |
| static-delivery | Adapter dependency removed | PASS | package.json + lockfile clean; build passes |
| static-delivery | Deployment artifact hygiene | PASS (repo) / preview pending | `.vercel/` ignored; no stale output committed; Vercel preview is Task 21 |
| static-delivery | Rollback baseline verified | PASS | `baseline-pre-nba-rebuild` tag exists at `482b42a` |

## 8. Review workload / PR boundary

`tasks.md` forecasts ~3,300–3,900 changed lines (8–10× the 400-line budget), recommends chained PRs, and records `Chain strategy: pending` with `ask-on-risk`. The implementation was applied as one full-rebuild working-tree slice (consistent with the "size-exception single-PR" alternative the forecast explicitly legitimizes, but **the parent's ask-on-risk decision is still unrecorded** — the two parent-owned checkboxes remain open). No scope creep was detected: the working tree matches the design §9 manifest exactly (9 components, profile.ts, site.ts, global.css, 7 assets, config edits, 7 deletions) with nothing extra.

## 9. Task checkbox status — CRITICAL completeness/bookkeeping issue

**All 21 implementation tasks and both parent-owned tasks in `openspec/changes/nba-player-profile-rebuild/tasks.md` are still unchecked (`- [ ]`).** `grep -c '\- \[ \]'` = 23; `grep -c '\- \[x\]'` = 0. Per the task-checkbox verification contract this is a CRITICAL completeness issue and an archive blocker even though the working tree demonstrably implements the slice. Exact unchecked lines (Tasks 1–21 plus the two parent-owned actions, each beginning `- [ ] Verify the recoverable baseline…`, `- [ ] Convert astro.config.mjs…`, … through `- [ ] Deploy a Vercel preview…`, `- [ ] Start or reuse bounded review…`, `- [ ] Apply the ask-on-risk delivery decision…`).

Additionally, **`apply-progress.md` is absent** from `openspec/changes/nba-player-profile-rebuild/` — the phase contract's required apply-progress input could not be read; this verification relied on the parent's delegation context ("implementation is complete in the working tree") plus direct working-tree/dist evidence, which fully corroborates completion of Tasks 1–19.

Two tasks are inherently not machine-verifiable and remain open scope:
- **Task 20 (manual review matrix)** — the items below require manual human review.
- **Task 21 (Vercel preview deployment)** — not performed during this verification.

## 10. Requires manual human review (NOT claimed done by this report)

A human with a browser (`pnpm preview`) must complete:

1. **320px overflow check** — no horizontal scrollbar; long values (24s → 7s, hero name) wrap (CSS guards exist, but only eyes confirm).
2. **Keyboard pass** — Tab order skip link → header → hero actions → document order; visible focus on every control; menu open/Escape/close-on-link/focus-return live behavior.
3. **Visual duotone quality** — portrait grayscale+accent blend renders well; face-forward crop at `center 28%`.
4. **Grayscale comprehension** — attribute levels, timeline dates, CTA meaning survive color removal.
5. **Throttled-network LCP/CLS** — hero image reserves space with no reflow; fallback fonts render immediately (no invisible-text period); fonts arrive via the swap pattern.
6. **Hero compactness** — at 1280×800 and 390×844 the Career Stats heading is visible or immediately reachable; no 100vh behavior.
7. **Reduced-motion live pass** — OS setting enabled: no smooth scroll, no reveals, all content visible.
8. **JS-disabled live pass** — full content, all links, email action usable.
9. **Anchor landing offsets** — targets land below the sticky header (`scroll-margin-block-start` exists in CSS; confirm visually).

## 11. Exact blockers (archive-readiness)

1. **23 unchecked task checkboxes** in `tasks.md` (all implementation tasks + both parent-owned actions) — stale-checkbox reconciliation cannot be applied because no `apply-progress.md` exists. → Tick Tasks 1–19 (evidenced complete by this report and the working tree), leave 20–21 open until performed, or record the partial-slice decision.
2. **`apply-progress.md` missing** from `openspec/changes/nba-player-profile-rebuild/` — the required phase artifact must be created/retro-filled by the parent.
3. **Task 20 manual matrix** not yet performed (see §10).
4. **Task 21 Vercel preview** not yet deployed/inspected.
5. **Parent ask-on-risk delivery decision** (single size-exception PR vs chained PRs) unrecorded.

## 12. Residual minor observations (no action required)

- Reduced-motion block now also cancels `translate` (fixed this session, §2).
- `preconnect` to `fonts.googleapis.com` omits `crossorigin` (deliberate, correct practice; design §4's letter says both).
- Footer renders `© 2026` via `new Date().getFullYear()` at build time — currently correct (build date 2026-09-08), but the year is baked per-build; a future rebuild after New Year changes it silently (harmless).

---

**Verification verdict:** implementation **PASSES** all 13 domain specs at the automated/code level (one 1-line accessibility defect found and fixed, build re-gated green). **Not ready for archive** until the five blockers in §11 are resolved.
