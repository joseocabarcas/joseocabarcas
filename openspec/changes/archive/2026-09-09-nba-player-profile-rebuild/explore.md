# Explore — NBA Player Profile Portfolio Rebuild

**Topic key:** `sdd/nba-player-profile-rebuild/explore` · **Type:** architecture · **Date:** 2026-09-08
**Repo:** `/Users/josecabarcas/Developments/WorkSpacePersonal/josecabarcas.dev`

> Change slug `nba-player-profile-rebuild` was chosen by the executor (no change ID was injected). Parent should confirm or rename before the plan phase.

## Change being prepared (already decided, not re-decided)

Full rebuild of the portfolio with an "NBA player profile" design concept: compact above-the-fold player-card hero (real headshot), scroll sections styled like an NBA player profile — career stats, season-log timeline of employers, skill attributes, career highlights, project case studies as box scores, "Draft Me" contact. English copy, dark stadium aesthetic, Astro 5 + Vercel stays.

**Real-data sources:**
- Career context: `/Users/josecabarcas/Downloads/Jose_Cabarcas_Portfolio_Context.md` (read in full; all facts below trace to it).
- Headshot: `/Users/josecabarcas/Downloads/Jose Omar Cabarcas Gutíerrez_A9A3905.jpg` (confirmed present; 2400×3600, will be copied into `public/`). Alternates A9A3903/04/06 and a duplicate `(1)` file also exist in Downloads — copy only the A9A3905 original, and consider renaming to a web-safe filename (spaces + accents in the current name; recommend e.g. `public/headshot.jpg` or `/images/jose-cabarcas.jpg`).

## 1. Repository map (current state)

Single-page Astro site, ~9 components, zero external state, all content inline in `index.astro`.

```
src/
  pages/index.astro          # sole page; ALL content data lives here as inline consts
  layouts/Layout.astro       # <html lang="es">, meta, Google Fonts, global reset CSS
  components/
    Header.astro             # fixed top nav, logo "<JoseDev/>", scroll effects, smooth-scroll JS
    Hero.astro               # 100vh hero, name+subtitle, 2 CTA buttons, embeds CodeWindow
    CodeWindow.astro         # fake "index.html" code window (Hero visual)
    About.astro              # initials-avatar profile card + bio paragraphs (sticky card)
    Skills.astro             # grid of 10 emoji-icon skill cards w/ category labels
    Projects.astro           # grid of 4 project cards w/ tech tags + live/github links
    Contact.astro            # vertical social-link cards + emoji chat illustration
    Footer.astro             # logo, anchor links, placeholder socials, dynamic year
    Section.astro            # shared section wrapper (title/subtitle/dark bg variants)
public/
  favicon.svg                # stock Astro rocket favicon (needs replacing)
```

**Global styles:** No standalone CSS file. `Layout.astro` holds the only global styles (`<style is:global>`): reset, `scroll-behavior: smooth`, body background `linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)`, white text, custom green scrollbar. Everything else is scoped component CSS. Theme accent is green `#2ecc71` throughout — all to be replaced by the dark stadium palette.

**Fonts currently used:** Google Fonts loaded in `Layout.astro` head — **Inter** (300–700) for body/headings and **Fira Code** (400,500) for the CodeWindow monospace. A player-profile design (stat blocks, jersey numbers, box scores) will likely want a condensed/display typeface for numerals and headings; decision belongs to the design/plan phase.

**Notable existing bug:** `Header.astro` shows a `mobile-menu-btn` below 768px but the script only implements scroll shading + smooth scrolling — **no toggle handler exists**, so on mobile the nav links are `display: none` with no way to open them. Irrelevant if the header is rebuilt, but worth knowing.

## 2. Build & config details

**`package.json`** (`type: module`, v0.0.1):
- Scripts: `dev`/`start` → `astro dev`; `build` → `astro check && astro build` (type-check gate included); `preview` → `astro preview`; `astro`.
- Dependencies: `astro ^5.8.1`, `@astrojs/vercel ^8.1.4`, `@astrojs/check ^0.9.4`, `typescript ^5.4.5`.
- devDependencies: `vercel ^42.3.0` (CLI for deploy).
- Package manager: **pnpm** (`pnpm-lock.yaml` present; no node_modules inspection done).

**`astro.config.mjs`:**
```js
import vercel from '@astrojs/vercel/serverless';
export default defineConfig({ output: 'server', adapter: vercel() });
```

**`tsconfig.json`:** extends `astro/tsconfigs/strict`; includes `.astro/types.d.ts` + all; excludes `dist`.

**`openspec/config.yaml`** (SDD session settings, already established):
- `artifact_store: openspec`, `execution: auto`, `delivery_strategy: ask-on-risk`, `review_budget: 400`.
- Phase rules: `pnpm build` (astro check) is the mandatory gate; **no unit test runner installed** — no unit tests for `.astro` components, raise as risk; artifacts persist under `openspec/`.
- Init already flagged: brief-vs-repo mismatch on `output: 'server'` vs "static output" (see §5).

## 3. Content inventory — current `index.astro` vs. real data

All content lives as inline consts in `src/pages/index.astro`: `personalInfo`, `skills`, `projects`, `socialLinks`. Nothing is externalized to a data file — a rebuild should likely extract this into a structured data module (single source of truth for the player-card/stats/timeline/box-score sections).

### Outdated or false claims (must not survive the rebuild)

| Current site claim | Reality (per context doc) |
| --- | --- |
| "over **9 years** of experience" | **11+ years** (started Oct 2014 at Janus IT) |
| Role: "Frontend & Mobile Developer" | **Frontend Staff Engineer** (peak role at Elenas); currently Senior Frontend Developer at Monokera; grew through Tech Lead → Staff |
| Bio: "clinical projects with Angular, Laravel, Java for Android" in 2014 | Not supported by the context doc — first job (Janus IT) was broad back-end/front-end/**mobile testing**; no Angular/Laravel/Java claims appear anywhere in the doc. **Do not carry over.** |
| Bio: "real-time features for a social network… live chat" | Real: Picap (2019–2020) — Firebase/Firestore driver-customer chat, live order tracking, video chat for medical appointments. Name it accurately or drop it. |
| 4 generic projects, all with `liveUrl: "https://example.com"` and `githubUrl: "https://github.com/example"` | Real project candidates: **Monokera-Core** (monorepo/design system, Turborepo+pnpm, JFrog), **Mi Banco** (insurance platform, component/service reuse), **Sales Builder** (Rails microservice), **Stories Feature** (Kotlin native module in RN), **Mobile CI/CD pipeline** (Expo Classic → EAS). |
| GitHub `github.com/josecabarcas` | Real handle: **github.com/joseocabarcas** (note the extra "o") |
| LinkedIn `linkedin.com/in/josecabarcas` | Real: **linkedin.com/in/jose-cabarcas** |
| YouTube / Twitch links (unverified, not in context doc) | Not mentioned anywhere in the context doc — verify with user or drop |
| No email anywhere on the site | Real: **josecabarcas94@gmail.com** (per context doc header) — should be central to "Draft Me" contact |
| Header logo/footer socials use `href="#"` placeholders; About card socials also `href="#"` | Dead links |
| `<html lang="es">` | New design copy is English → should become `lang="en"` |
| No photo (initials avatar in About) | Professional headshot exists and will be added to `public/` |

### Real content available for the NBA-style sections (mapped to design concepts)

- **Player card hero:** José Cabarcas, Barranquilla Colombia, Frontend Staff Engineer, 11+ YRS, headshot, contact/socials.
- **Career stats:** 11+ years; 6 employers; led teams of 5–7 engineers; app with 3M+ downloads / 200K+ DAU (Elenas, note: company shut down — context lives only in his history, not store-verifiable); startup 24s→7s / checkout 14s→5s; ~30% bundle reduction; Jest→Vitest ~25% faster tests; 2 stores published (Play + App Store); Sentry→Firebase Performance migration (cost reduction).
- **Season log (employer timeline):** Janus IT (2014–2016), Joonik (2016–2019), Merqueo (2019), Picap (2019–2020), Elenas (2020–2024, 3 roles: Senior FE → Tech Lead → Staff), Monokera (Oct 2024–Jul 2026).
- **Skill attributes (NBA 2K-style ratings):** React, React Native, Next.js, TypeScript, Expo, Node.js, Go, Ruby (Rails), Python, Kotlin, GraphQL, Zustand/TanStack Query, Turborepo/pnpm monorepos, AWS (Lambda/CloudFront/S3), Playwright/Vitest/Storybook, Datadog/Sentry/Grafana, AI tooling (Claude Code, Cursor, Codex, SDD). Ratings are user-assigned "attribute" numbers — needs user input or explicit design convention (avoid inventing false metrics).
- **Career highlights:** App Store rejection rescue under deadline (Segment SDK compliance); EAS pipeline build; Expo 47→51 migration; Clean Architecture mobile redesign; CRA→Vite dashboard migration; Rails microservice built on demand (language adaptability story).
- **Box scores (project case studies):** the 5 real projects above, each with tech stack, role, and concrete outcomes.
- **Tone rules from context doc:** "frontend specialist who keeps choosing real backend experience" — not generic full-stack; every claim traceable to the doc, no invented metrics; honest production-vs-learning labels (WatermelonDB/MMKV, CQRS/Event Sourcing are learning, not production); SDD/AI-assisted development is a proud differentiator, not buzzword.
- **Education:** B.S. Systems Engineering + Software Engineering Diploma, Universidad Simón Bolívar (2011–2016).

## 4. `public/` assets

- `public/favicon.svg` only — the **default Astro rocket logo** (stock starter asset, not branded). Needs a custom favicon for the NBA concept.
- No images directory, no headshot, no OG image. The rebuild needs: headshot (from Downloads), favicon, likely OG/social meta images, possibly stadium-aesthetic background/texture assets.
- **`.vercel/` build output is inside the working tree and NOT gitignored** (`.vercel/output/` contains a full deployable build incl. SSR function `_render.func`). Risk: stale build artifacts can be committed or confuse diffs. Recommend adding `.vercel/` to `.gitignore` (keeping `.vercel/project.json` if the team wants CLI-linked deploys) during the rebuild.

## 5. Deployment / setup constraints

- **Adapter:** `@astrojs/vercel/serverless` with `output: 'server'`. `.vercel/output/` confirms an SSR serverless function (`_render.func` with Astro server chunks + sharp) is generated for every page. `.vercel/project.json` links the Vercel org/project (`prj_A3jdpSgzRr5xopPvY7avKT4fRIEZ`).
- **Implication for a portfolio:** the site is 100% static content; `output: 'server'` means every request executes a serverless render — slower TTFB, function invocations, no static CDN HTML. Switching to `output: 'static'` (Astro default; Vercel adapter optional or `@astrojs/vercel/static`) would ship pure CDN static HTML. **"Astro 5 + Vercel stays" is compatible with either mode** — recommend the plan phase decide this explicitly. Note `astro.config.mjs` already imports the serverless adapter entry, so the change is one line + adapter import if chosen. (The sdd-init already flagged this brief-vs-repo mismatch; it remains unresolved.)
- **No `vercel.json`** at root; deployment relies on the adapter's generated `.vercel/output` + Vercel CLI/Git integration.
- **No remotes configured** in `.git/config` (no origin) — deploys appear to go via `vercel` CLI (`vercel` in devDependencies) rather than Git-push integration, or the remote was never added locally.
- **Verification gate (per SDD phase rules):** `pnpm build` = `astro check && astro build` is the only automated gate; no unit test runner exists. Visual review via `pnpm dev`/`preview` is manual.

## 6. Git state (with caveats — no git CLI was available to this phase)

- Branch: **`main`** (per `.git/HEAD` → `refs/heads/main`).
- **Rollback safety is NOT confirmed and is a real risk:** `.git/refs/heads/` contains **no ref files**, there is **no `packed-refs`**, and `FETCH_HEAD` is empty — consistent with an **unborn `main` branch (no commits yet)** despite ~11 loose objects in `.git/objects/` (possibly from a fetch or an abandoned initial commit). If the branch is unborn, **HEAD is NOT a safe rollback point** — there is nothing to roll back to.
- Also: **no remote is configured**, so there is no off-machine backup of current code.
- Working-tree cleanliness could not be verified without `git status`.
- **Required first action in the plan phase:** run `git status` + `git log --oneline -5`; if uncommitted/unborn, create a baseline commit (and ideally tag it, e.g. `baseline-pre-nba-rebuild`) **before any file is deleted or overwritten**, and confirm a Vercel deployment of the current state exists as a live rollback. Since this is a *full rebuild* of `src/`, the current files should be preserved via git history (or a `legacy/` branch) before replacement.

## 7. Risks & open questions for the plan phase

1. **Git baseline uncertainty** (§6): possibly unborn branch, no remote, unverified cleanliness — must be resolved before destructive rebuild work begins.
2. **`output: 'server'` vs `'static'`**: unresolved mismatch; static is the natural fit for a content-only portfolio; one-line config decision needed.
3. **No test runner**: visual/UX-heavy rebuild has only type-check + build + manual preview as verification; `astro check` will not catch visual regressions.
4. **Content honesty constraints**: the tone rules forbid invented metrics; NBA "attribute ratings" are inherently invented numbers — needs an explicit user-approved convention (e.g. self-assessed, clearly labeled) or user-provided ratings.
5. **Elenas claims (3M downloads, 200K DAU)** are real but no longer independently verifiable (company shut down) — fine to state as historical facts, per the doc.
6. **Unverified social links** (YouTube/Twitch, and exact GitHub handle spelling) must be confirmed with the user before shipping "Draft Me" links.
7. **Headshot file handling**: 2400×3600 original is large for web; plan should include resizing/optimizing (e.g. ≤ ~800–1200px wide variants, `<picture>`/AVIF-WebP) rather than shipping the raw file; rename to a path-safe filename when copying into `public/`.
8. **`.vercel/` untracked-in-gitignore build artifacts** in the working tree (§4) — hygiene fix recommended during rebuild.
9. **i18n/lang**: `<html lang="es">` → `en` (or `en-US`) since copy is English.
10. **Favicon/OG assets** don't exist yet; the design phase should specify what's needed beyond the headshot.
