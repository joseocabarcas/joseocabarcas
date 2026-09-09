# Design: NBA Player Profile Portfolio Rebuild

## Status and design decisions

This design turns the proposal and the 13 domain specifications into one static Astro page. The design keeps the NBA metaphor as an editorial hierarchy: player card, stat strips, season rail, attributes, highlights, and box-score case studies. It does not simulate a game, assign invented ratings, or imply that José played professional basketball.

Decisions resolved here:

- Astro remains the rendering layer; there are no framework components, hydrated islands, or client-side data fetching.
- `src/data/profile.ts` is the only source for professional content. Components receive typed data and do not contain independent factual claims.
- The page uses one electric cyan accent, warm-white copy, near-black stadium surfaces, condensed display type, mono metadata, and readable sans-serif body copy.
- The Vercel serverless adapter is removed. Astro emits `output: 'static'` and Vercel continues to serve the generated static files.
- The confirmed Downloads headshot is resized into committed, web-safe variants. Duotone treatment is CSS-only.
- Motion is progressive enhancement. Content is complete in the initial HTML and remains visible with JavaScript disabled or reduced motion enabled.
- Before deleting the existing source, implementation must run `git status` and `git log --oneline -5` and establish the `baseline-pre-nba-rebuild` tag. The exploration notes indicate that the current branch may be unborn, so this is an ask-on-risk gate rather than an assumption.

## 1. Component and page architecture

### Page composition

`src/pages/index.astro` composes the page in this order:

```astro
<Layout>
  <Header />
  <main id="main-content" tabindex="-1">
    <PlayerCardHero identity={profile.hero} links={profile.links} />
    <CareerStats stats={profile.stats} />
    <SeasonLog entries={profile.seasonLog} />
    <Attributes groups={profile.attributes} />
    <Highlights highlights={profile.highlights} />
    <GameLog caseStudies={profile.gameLog} />
    <DraftMe identity={profile.hero} links={profile.links} />
  </main>
  <Footer links={profile.links} />
</Layout>
```

`Layout.astro` owns the document shell, English language declaration, metadata, font loading, global CSS import, and skip link. `index.astro` owns the single `main` landmark and no professional copy beyond component composition.

### New and rewritten components

| File | Responsibility |
| --- | --- |
| `src/components/Header.astro` | One semantic `header` and `nav`; wordmark, six section links, `Draft Me` contact action, skip-link target context, and a real mobile menu toggle. The toggle has `aria-expanded`, `aria-controls`, Escape handling, focus return, and works with keyboard, touch, and JavaScript disabled fallback content. |
| `src/components/PlayerCardHero.astro` | Compact player-card hero. Renders José's identity, current/recent context, location, positioning statement, specific bio, responsive portrait, verified hero stats, Career Stats CTA, and direct email/Draft Me access. |
| `src/components/CareerStats.astro` | `section#career-stats`; renders the typed metric cards and explanatory labels, including historical framing for Elenas figures. It does not derive or invent metrics. |
| `src/components/SeasonLog.astro` | `section#season-log`; renders all six chronological employer chapters and the explicit three-role Elenas progression. Every entry and role is static HTML and individually addressable. |
| `src/components/Attributes.astro` | `section#attributes`; renders capability groups with visible `Primary`, `Strong`, or `Working / Applied` labels. Learning items are a separate, explicitly labeled exploration group. |
| `src/components/Highlights.astro` | `section#highlights`; renders eight independent moment/challenge/result cards. It keeps compliance rescue, EAS, migration, architecture, dashboard, Rails, performance, and SDD stories separate. |
| `src/components/GameLog.astro` | `section#game-log`; renders five consistent box-score-inspired case-study cards with labeled context, role, stack, and outcome/responsibility fields. No card receives a fake sports statistic or link. |
| `src/components/DraftMe.astro` | `section#draft-me`; renders the final contact CTA with a prominent plain `mailto:` anchor and the exact GitHub and LinkedIn anchors. No form or JavaScript is required. |
| `src/components/Footer.astro` | Repeats the real contact links and valid in-document navigation; contains no placeholder or unverified social links. |
| `src/data/profile.ts` | Strict TypeScript contracts and populated readonly content constants described below. This is the sole content source. |
| `src/scripts/site.ts` | Minimal progressive enhancement: mobile menu behavior, close-on-navigation/Escape, focus return, scroll state if needed, and IntersectionObserver reveal enhancement. No hydration framework or animation package. |
| `src/styles/global.css` | Reset, exact design tokens, typography, responsive layout, focus states, portrait treatment, section styles, and reduced-motion overrides. |

### Legacy replacement/deletion decisions

- `Hero.astro` is deleted and replaced by `PlayerCardHero.astro`; the old full-screen hero and generic CTA copy do not survive.
- `CodeWindow.astro` is deleted. The fake code window is not part of the player-profile information architecture.
- `About.astro` is deleted. Its biography is rewritten into the specific hero bio and the chronological Season Log; the initials avatar is replaced by the real portrait.
- `Skills.astro` is deleted and replaced by `Attributes.astro`; the emoji cards and flat keyword treatment are removed.
- `Projects.astro` is deleted and replaced by `GameLog.astro`; generic projects, fake demos, and placeholder GitHub URLs are removed.
- `Contact.astro` is deleted and replaced by `DraftMe.astro`; the illustration, contact form pattern, and unconfirmed services are removed.
- `Section.astro` is deleted. Each major section owns its semantic `section`, heading, anchor id, and responsive layout rather than passing dark/light background variants through a generic wrapper.
- `Header.astro` is rewritten in place. The current dead mobile button and smooth-scroll-only script are replaced by an operable menu.
- `Footer.astro` is rewritten in place with real links and valid anchors.
- `Layout.astro` is rewritten in place from Spanish metadata/gradient styling to the English stadium document shell.
- `src/pages/index.astro` is rewritten in place to use the composition above and import only the typed profile data.

## 2. Typed data architecture and content contract

All strings below are sourced from `Jose_Cabarcas_Portfolio_Context.md`. The implementation must not add a new metric, employer, technology, project, or outcome while transcribing this design.

The module uses readonly literals so Astro can type-check the data without a runtime model:

```ts
export type AttributeLevel = 'Primary' | 'Strong' | 'Working / Applied';
export type AttributeExperience = 'production' | 'learning';
export type LinkKind = 'github' | 'linkedin' | 'email';
export type StatScope = 'career' | 'elenas-history' | 'performance' | 'delivery';
export type HighlightPhase = 'moment' | 'challenge' | 'result';

export interface HeadshotAsset {
  alt: string;
  fallback: string;
  width: 960;
  height: 1440;
  aspectRatio: '2 / 3';
  sources: ReadonlyArray<{
    type: 'image/avif' | 'image/webp';
    srcSet: string;
  }>;
}

export interface HeroIdentity {
  name: string;
  role: 'Frontend Staff Engineer';
  currentRole: {
    title: 'Senior Frontend Developer';
    company: 'Monokera';
    dates: 'Oct 2024 – Jul 2026';
  };
  location: 'Barranquilla, Colombia';
  positioning: string;
  bio: string;
  headshot: HeadshotAsset;
  heroStatKeys: ReadonlyArray<string>;
}

export interface CareerStat {
  key: string;
  value: string;
  label: string;
  detail: string;
  scope: StatScope;
  historical?: boolean;
}

export interface SeasonRole {
  title: string;
  dates: string;
  summary: string;
}

export interface SeasonLogEntry {
  id: string;
  employer: string;
  dates: string;
  location?: 'Barranquilla' | 'Bogotá' | 'Remote, Colombia';
  summary: string;
  roles: ReadonlyArray<SeasonRole>;
}

export interface AttributeItem {
  name: string;
  experience: AttributeExperience;
  note?: string;
}

export interface AttributeGroup {
  id: string;
  title: string;
  level: AttributeLevel;
  description: string;
  items: ReadonlyArray<AttributeItem>;
}

export interface Highlight {
  id: string;
  title: string;
  moment: string;
  challenge: string;
  result: string;
}

export interface GameLogCaseStudy {
  id: string;
  name: string;
  context: string;
  role: string;
  stack: ReadonlyArray<string>;
  outcomeLabel: 'Outcome' | 'Responsibility';
  outcome: string;
}

export interface ProfileLink {
  kind: LinkKind;
  label: string;
  href:
    | 'https://github.com/joseocabarcas'
    | 'https://linkedin.com/in/jose-cabarcas'
    | 'mailto:josecabarcas94@gmail.com';
  external: boolean;
}

export interface ProfileContent {
  hero: HeroIdentity;
  stats: ReadonlyArray<CareerStat>;
  seasonLog: ReadonlyArray<SeasonLogEntry>;
  attributes: ReadonlyArray<AttributeGroup>;
  highlights: ReadonlyArray<Highlight>;
  gameLog: ReadonlyArray<GameLogCaseStudy>;
  links: ReadonlyArray<ProfileLink>;
}
```

The exported `profile` object is populated as follows. Copy must preserve the exact facts and distinctions; wording can be tightened for layout without expanding the claims.

### Hero identity

- `name`: `José Cabarcas`
- `role`: `Frontend Staff Engineer`
- `currentRole`: `Senior Frontend Developer`, `Monokera`, `Oct 2024 – Jul 2026`
- `location`: `Barranquilla, Colombia`
- `positioning`: a frontend-specialist-first statement: deepest specialization in frontend and mobile, with deliberate backend work when the problem requires it.
- `bio`: early broad back-end/front-end/mobile-testing exposure at Janus IT, progression into frontend/mobile specialization and technical leadership, and the SDD workflow of defining criteria, reviewing AI-generated first passes, validating layer by layer, and describing failures precisely for correction.
- `headshot.alt`: `Professional portrait of José Cabarcas`
- `heroStatKeys`: `['experience', 'led-team', 'elenas-scale']`

The hero stat strip renders `11+` / `years of experience since October 2014`, `5–7` / `engineers led at Elenas`, and a historical `3M+ downloads · 200K+ DAU` / `Elenas scale by the time he left in 2024; the company later shut down` card. The historical context is adjacent to both scale figures, not hidden in a tooltip.

### Career stats

The stats array has these ten cards and no other invented values:

1. `11+` — `Years of experience` — `Since October 2014.` — `career`.
2. `6` — `Employers` — `Six employer chapters; Elenas also includes a three-role progression.` — `career`.
3. `5–7` — `Engineers led` — `Team size led at Elenas under Scrum.` — `career`.
4. `3M+` — `App downloads` — `Historical Elenas figure by the time José left in 2024; the company later shut down.` — `elenas-history`, historical.
5. `200K+` — `Daily active users` — `Historical Elenas figure by the time José left in 2024; not a current app-store claim.` — `elenas-history`, historical.
6. `24s → 7s` — `Startup time on low-end devices` — `Performance result from the Elenas work.` — `performance`.
7. `14s → 5s` — `Checkout time` — `Performance result from the Elenas work.` — `performance`.
8. `~30%` — `Bundle/build optimization reduction` — `Rollup build-time optimization and code splitting at Monokera.` — `performance`.
9. `~25%` — `Faster test execution` — `After the Jest → Vitest migration at Monokera.` — `performance`.
10. `2` — `Stores published` — `The Elenas app was published to Google Play and the App Store.` — `delivery`.

The card labels never call `6` a role count, never call `2` two apps, and never describe the Elenas figures as current.

### Season Log

The array has six entries in this order:

1. `janus-it`, `Janus IT`, `Oct 2014 – Feb 2016`, `Barranquilla`, summary of broad back-end, front-end, and mobile-testing exposure that sparked the UX interest; role `Frontend and Android Developer`, same dates.
2. `joonik`, `Joonik`, `Mar 2016 – Mar 2019`, `Barranquilla`, migration of a legacy web app to Vue.js; role `Frontend and Android Developer`, same dates.
3. `merqueo`, `Merqueo`, `Mar 2019 – Sep 2019`, `Bogotá`, backend-heavy order-rating microservices with Node.js, Go, and DynamoDB plus a Vue.js ratings UI; role `Full Stack Developer`, same dates.
4. `picap`, `Picap`, `Oct 2019 – Apr 2020`, `Bogotá`, Firebase/Firestore communication patterns, driver-customer chat, live order tracking, and video chat for an online medical appointments vertical; role `Frontend Developer`, same dates.
5. `elenas`, `Elenas`, `May 2020 – Oct 2024`, `Remote, Colombia`, social commerce platform with mobile architecture, EAS, leadership, performance, web migration, and production-scale work; roles `Senior Frontend Developer` (`May 2020 – Oct 2021`), `Tech Lead` (`Oct 2021 – Aug 2023`), and `Frontend Staff Engineer` (`Aug 2023 – Oct 2024`).
6. `monokera`, `Monokera`, `Oct 2024 – Jul 2026`, `Remote, Colombia`, micro-frontends/monorepo architecture, reusable design-system components, test/build optimization, Sales Builder Rails service, and Datadog-backed production work; role `Senior Frontend Developer`, same dates.

The exact date strings remain visible in the default document state. Elenas progression is rendered as an ordered sub-list, not as a hover-only detail.

### Attributes

The groups are capability-based and use no numbers, ratings, percentiles, years-per-skill claims, endorsements, or certifications:

- `frontend-mobile-primary`, title `Frontend & mobile`, level `Primary`: React, React Native, Next.js, TypeScript, Expo.
- `architecture-leadership-primary`, title `Architecture & leadership`, level `Primary`: frontend architecture, design systems, monorepos / micro-frontends, technical leadership.
- `state-data-strong`, title `State & data`, level `Strong`: Zustand, TanStack Query, GraphQL.
- `backend-platform-strong`, title `Backend & platform`, level `Strong`: Node.js, Go, Ruby on Rails, Python, Kotlin / Android modules, AWS Lambda / CloudFront / S3.
- `quality-delivery-strong`, title `Quality & delivery`, level `Strong`: Playwright, Vitest, Storybook, observability tooling, CI/CD.
- `applied-tooling`, title `Working / applied`, level `Working / Applied`: JavaScript, NestJS, PostgreSQL, DynamoDB, Docker, GitHub Actions, GitLab CI/CD, Jenkins, Detox, Cypress, Firebase / Firestore, SASS, Segment, CleverTap, Amplitude, Agile / Scrum, code reviews, technical mentoring.
- `learning-exploration`, title `Learning / exploration`, level `Working / Applied`: WatermelonDB and MMKV with each item marked `Learning / exploration`; CQRS / Event Sourcing with the same mark. This group is visually separated from production groups and is never described as production experience.

The `level` text appears in every group heading and each item retains its group context, so meaning survives grayscale and CSS changes.

### Highlights

The eight `Highlight` objects are separate:

1. `store-compliance`: Moment — an App Store rejection and Google compliance deadline; Challenge — an outdated Segment SDK brought outdated Google Play Services; Result — patched the library to restore compliance, then led migration to a modern Segment version when there was more runway.
2. `eas-pipeline`: Moment — Elenas moved from Expo Classic Updates; Challenge — releases required a stronger delivery workflow; Result — led the Expo Classic Updates → EAS migration and CI/CD pipeline, enabling OTA updates without full store republishing.
3. `expo-migration`: Moment — Expo 47 → Expo 51; Challenge — breaking changes affected core functionality; Result — led the migration under those breaking changes.
4. `clean-architecture`: Moment — the most recent Elenas mobile architecture; Challenge — maintainability and testability across mobile concerns; Result — separated data, domain, and presentation layers and kept Zustand, Context API, and TanStack Query concerns distinct.
5. `vite-dashboard`: Moment — an internal dashboard on Create React App v3; Challenge — move the existing dashboard to a current build tool; Result — led the CRA v3 → Vite migration.
6. `sales-builder`: Moment — an assisted insurance-sales micro-frontend needed a service; Challenge — the service had to manage its rendered components; Result — built the Ruby on Rails Sales Builder microservice and picked up Rails for that need.
7. `performance-project`: Moment — Elenas mobile performance work; Challenge — startup and checkout were slow on low-end devices; Result — startup moved `24s → 7s` and checkout `14s → 5s`.
8. `sdd-workflow`: Moment — current AI-assisted development; Challenge — generated code still needs judgment and correction; Result — define acceptance criteria, generate a first pass with Claude Code/Cursor/Codex, validate layer by layer, and describe failures precisely enough for correction. No outcome is attributed to AI beyond the documented workflow.

### Game Log case studies

Each case study renders all four labels (`Context`, `Role`, `Stack`, and either `Outcome` or `Responsibility`):

1. **Monokera-Core** — Context: shared services, components, utilities, and design system consumed across company applications. Role: led adoption and architecture work for the Turborepo/pnpm monorepo. Stack: Turborepo, pnpm, design system, JFrog. Outcome: libraries were published and stored in JFrog.
2. **Mi Banco** — Context: insurance management and sales platform. Role: designed component/service reuse for the platform's first phase. Stack: component libraries, service reuse, insurance platform. Responsibility: establish a reusable foundation for the core platform's first phase.
3. **Sales Builder** — Context: assisted insurance-sales micro-frontend. Role: built the service and picked up Rails for the need. Stack: Ruby on Rails, microservice, micro-frontend. Outcome: managed the components rendered by the assisted sales micro-frontend.
4. **Stories Feature** — Context: short videos/photos and product discovery. Role: built the native module and bridge. Stack: Kotlin, Android Native Modules, React Native, Expo Bare. Outcome: showcased top-selling brands and products through the Stories-like feature.
5. **Mobile CI/CD pipeline** — Context: mobile release delivery. Role: led the Expo tooling migration and later EAS pipeline work. Stack: Expo Classic Updates, EAS, CI/CD, OTA updates. Outcome: shipped fixes through OTA updates without full store resubmission.

There are no project links because the context document provides none. Case-study cards use no fake scores, points, rebounds, percentages, or decorative numeric badges.

### Links

`profile.links` contains exactly:

```ts
[
  { kind: 'github', label: 'GitHub profile', href: 'https://github.com/joseocabarcas', external: true },
  { kind: 'linkedin', label: 'LinkedIn profile', href: 'https://linkedin.com/in/jose-cabarcas', external: true },
  { kind: 'email', label: 'Email José Cabarcas', href: 'mailto:josecabarcas94@gmail.com', external: false },
]
```

External links use `target="_blank" rel="noreferrer"` only for GitHub and LinkedIn. The email is a plain same-document mailto anchor. No `href="#"`, `example.com`, YouTube, Twitch, or project URL is emitted.

## 3. Visual system and exact tokens

The visual metaphor is a night stadium: a quiet near-black field, layered charcoal panels, thin broadcast-style rules, mono labels, and one electric accent. There are no red, green, orange, purple, or multicolor gradient accents. The cyan accent can use opacity for layering but remains the only hue.

`src/styles/global.css` defines these tokens:

```css
:root {
  color-scheme: dark;

  --color-base: #090b0d;
  --color-surface-1: #0e1216;
  --color-surface-2: #151a20;
  --color-surface-3: #1c232a;
  --color-accent: #67e8f9;
  --color-text-primary: #f4f1ea;
  --color-text-secondary: #b7c0c7;
  --color-text-tertiary: #82909a;
  --color-border: #2a333b;
  --color-border-strong: #44515b;
  --color-focus: #67e8f9;

  --font-display: 'Barlow Condensed', 'Arial Narrow', Impact, sans-serif;
  --font-mono: 'IBM Plex Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  --font-body: 'DM Sans', Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  --text-xs: 0.6875rem;
  --text-sm: 0.8125rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.375rem;
  --text-2xl: clamp(1.75rem, 3vw, 2.5rem);
  --text-hero: clamp(3.5rem, 10vw, 8rem);

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  --content-width: 72rem;
  --reading-width: 42rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.875rem;
  --rule: 1px solid var(--color-border);
  --shadow-panel: 0 1.5rem 4rem rgb(0 0 0 / 0.24);
}
```

The contrast verification uses the WCAG 2 relative-luminance formula, rounded down conservatively: `--color-text-primary` on `--color-base` is approximately `17.4:1`; `--color-text-secondary` on `--color-base` is approximately `10.7:1`; `--color-text-tertiary` on `--color-base` is approximately `5.7:1`; and `--color-accent` on `--color-surface-2` is approximately `11.9:1`. These exceed 4.5:1 for normal text and 3:1 for large text/UI focus use. Accent is not the sole carrier of meaning: labels, headings, and state text are always present.

Panel borders use `--color-border`; `--color-border-strong` is reserved for focus/selected rules. Accent is used for the player-card rule, active navigation, CTA borders, small section index marks, selected timeline rail segments, and focus outlines. Surface layers do the visual work; no background image or stock basketball image is needed.

## 4. Typography and loading

Use Google Fonts with a non-blocking stylesheet strategy:

- `Barlow Condensed`: weights 600 and 700 for José's name, section titles, large stat values, and compact labels.
- `IBM Plex Mono`: weights 400 and 500 for section indices, dates, stat metadata, labels, and box-score field names.
- `DM Sans`: weights 400, 500, and 600 for readable paragraph and UI copy.

`Layout.astro` preconnects to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` with `crossorigin`, then preloads the Google Fonts CSS URL with `display=swap`, changes the preload to `rel="stylesheet"` in its `onload`, and includes a `noscript` stylesheet fallback. The CSS URL requests only the listed weights. Font fallback is immediately usable through the exact stacks in the token block, so there is no invisible-text dependency. The built head must not contain a synchronous, render-blocking remote stylesheet.

The document metadata is fixed and truthful: title `José Cabarcas — Frontend Staff Engineer`; description `José Cabarcas is a frontend specialist and Frontend Staff Engineer with 11+ years across frontend, mobile, technical leadership, and deliberate backend work when the problem requires it.`; canonical `https://josecabarcas.dev/`; `og:type` `website`; `og:title` equal to the title; `og:description` equal to the description; `og:url` equal to the canonical; `og:image` `/og/jose-cabarcas-profile.png`; and matching Twitter `summary_large_image` tags. `Layout.astro` sets `<html lang="en">` and links `/favicon.svg`. The canonical is deployment metadata, while every professional statement in the title/description is also present in the context document and visible page.

The display face is narrow enough for the player-card hierarchy; DM Sans carries long descriptions without the readability cost of an all-condensed or all-mono page. The mono face gives the sports-broadcast/stat treatment without turning body copy into a code window.

## 5. Headshot pipeline and portrait treatment

Source: `/Users/josecabarcas/Downloads/Jose Omar Cabarcas Gutíerrez_A9A3905.jpg`, 2400×3600. The original is used as the source for preprocessing only and is not committed as the sole browser asset.

Commit these web-safe files under `public/images/`, all preserving the source's 2:3 ratio:

- `jose-cabarcas-portrait-640.avif` — 640×960.
- `jose-cabarcas-portrait-960.avif` — 960×1440.
- `jose-cabarcas-portrait-1200.avif` — 1200×1800.
- Matching `jose-cabarcas-portrait-640.webp`, `-960.webp`, and `-1200.webp` at the same dimensions.
- `jose-cabarcas-portrait-960.jpg` — 960×1440 fallback for browsers without AVIF/WebP support.

The hero uses:

```html
<picture>
  <source type="image/avif" srcset="...640.avif 640w, ...960.avif 960w, ...1200.avif 1200w">
  <source type="image/webp" srcset="...640.webp 640w, ...960.webp 960w, ...1200.webp 1200w">
  <img src="/images/jose-cabarcas-portrait-960.jpg"
       width="960" height="1440"
       sizes="(max-width: 700px) 42vw, 360px"
       alt="Professional portrait of José Cabarcas"
       loading="eager" fetchpriority="high" decoding="async">
</picture>
```

The portrait frame always declares `aspect-ratio: 2 / 3`, `overflow: hidden`, and a fixed responsive width. `object-fit: cover` and `object-position: center 28%` give a consistent face-forward crop without changing the source. CSS applies `filter: grayscale(1) contrast(1.08)` and two pseudo-elements: a low-opacity `var(--color-accent)` color blend for the duotone and a near-black-to-transparent gradient for legibility. No duotone, crop, or gradient is baked into the image.

The asset pipeline must inspect the generated files and confirm that the raw 2400×3600 image is not the only source in `dist/`. The `public/favicon.svg` file is replaced with a small `JC`/court-line-inspired monochrome-and-accent SVG. If OG artwork is included, create `public/og/jose-cabarcas-profile.png` at 1200×630 with the same dark stadium treatment and truthful visible identity; otherwise omit the OG image rather than reference a missing asset. This design includes it in the first slice so the metadata can reference a real emitted file.

## 6. Section-by-section layout blueprint

### Header and navigation

Desktop uses a sticky 64–72px header inside the same dark field: `JC / PROFILE` wordmark on the left, six compact mono anchor links in the center/right, and a bordered `Draft Me` action. The header is not a full-width bright bar; a translucent surface and bottom rule preserve the stadium field.

Below 768px, links collapse behind a real menu button with a text-visible `Menu`/`Close` label and `aria-expanded`. The open panel is a surface-2 block below the header, not a pointer-only hover menu. Its links are large enough for touch and remain in the static HTML. For the no-JavaScript fallback, the mobile nav is visible by default; `site.ts` adds a `data-menu-enhanced` attribute to the root before applying the collapsed mobile state, so a missing script can never strand the links. The skip link is the first focusable element and becomes visible on focus.

### Player-card hero

Desktop (roughly 900px and up) uses a two-column card inside the content width: identity and bio on the left, portrait on the right, with a full-width stat strip along the bottom. The card has a thin accent rule, a mono `PLAYER PROFILE / 01` index, and a subtle internal grid/rule texture implemented with CSS gradients only. It is padded, not full viewport height; its bottom edge is followed by the visible `Career Stats` section heading/first strip at 1280×800.

Mobile uses a compact top row with the portrait at approximately 38–42vw wide and identity beside it, then the positioning copy, bio, stats, and two actions. The card remains auto-height with no `100vh` minimum; at 390×844 the next section's label is visible or immediately reachable without clipping the name, role, stats, or contact action. Accent is limited to the rule, primary CTA, and key stat value.

### Career Stats

Desktop is a four-column scan grid. The 3M+/200K+ historical cards span two columns together or share a labeled historical band so their shutdown context is visually and textually adjacent. Performance cards use a before/after arrow in the value string, but the labels state exactly what changed. Employer count and stores are plain labeled cards rather than fake player ratings.

Mobile is a two-column grid with long cards spanning both columns. Each card keeps its value, label, and supporting detail in normal flow; no horizontal scrolling or clipped `nowrap` values. The historical note appears directly under the scale values. The section heading uses `02 / CAREER STATS` and a short plain-language subtitle.

### Season Log

Desktop is a vertical season rail: a thin border/accent line at the left, date marker and employer chapter on the rail, and a wide detail panel on the right. Six entries are visible as document content. The Elenas panel contains a clearly ordered `Senior Frontend Developer → Tech Lead → Frontend Staff Engineer` role sequence with dates, not a hover reveal.

Mobile keeps the rail as a 1px left rule with the date marker inset and stacks employer, date, role list, and summary. There is no horizontal timeline. A focused/selected entry may brighten its rail marker, but employer/date/role facts remain visible without hover, JavaScript, or motion.

### Attributes

Desktop uses a three-column capability board: each group is a panel with a text level badge, group description, and wrapped item rows. Primary groups occupy the first row, Strong groups the next, and Working / Applied plus Learning / exploration are separated below. The visual language is scouting/roster organization, not a radar chart or rating meter.

Mobile is one column; each group remains a bounded panel and chips wrap within the viewport. Every group level is written as text. No chip uses width, color, or an icon to imply proficiency. Learning items have a `Learning / exploration` text marker and a distinct rule, not a lower numeric score.

### Highlights

Desktop uses a two-column editorial grid of eight cards. Each card has a mono index, title, and explicit `MOMENT`, `CHALLENGE`, and `RESULT` labels. A top accent rule appears on keyboard focus/hover; the copy does not depend on that state. The SDD card is styled like a current-method note but has the same structure as the historical cards.

Mobile uses one column with generous vertical separation and readable line lengths. Cards reveal no text through animation; the only enhancement is a short translate/fade as the card enters the viewport when motion is allowed.

### Game Log

Desktop uses two columns of case-study cards with a box-score grid: title/header on top, then a four-row `dl` for Context, Role, Stack, and Outcome/Responsibility. A monospaced field label and thin rules evoke a score sheet while the values remain ordinary professional prose. Stack is a text list, not a fake stat line.

Mobile uses one column and stacks the same four labeled fields. Cards do not expose links because the context provides no verified project URLs. No points, rebounds, scores, percentages, or badges are added for visual effect.

### Draft Me

Desktop is a final split panel: plain-language invitation and email CTA on the left, three confirmed contact links on the right. The email button is the most prominent action, while GitHub and LinkedIn are secondary bordered links with text labels. The section is still useful with JavaScript disabled.

Mobile stacks the invitation, email CTA, then GitHub and LinkedIn. The links have descriptive visible names, not icon-only controls. The section ends with a short education supporting fact only if space permits: Diploma in Software Engineering (2016) and B.S. in Systems Engineering (2011–2016), Universidad Simón Bolívar; it is not a new section.

## 7. Motion and progressive enhancement

The default animation budget is intentionally small:

- Anchor navigation uses `scroll-behavior: smooth` in the default mode; the destination still works as a normal anchor.
- Links, buttons, cards, accent rules, and the menu panel use a `180ms ease` transition for color, border-color, background-color, box-shadow, and a maximum `translateY(-2px)` hover/focus lift. No transform is used to move essential layout.
- Cards with `data-reveal` get a `12px` upward fade-in when they enter the viewport. `site.ts` adds the pending class only when `matchMedia('(prefers-reduced-motion: reduce)')` is false. A single IntersectionObserver uses threshold `0.12` and unobserves each revealed element. If IntersectionObserver is unavailable, the script reveals everything immediately.
- The header may add a `data-scrolled` attribute after 8px of scroll to strengthen its bottom rule; this is a style-only enhancement and does not move content.
- The mobile menu opens on click/Enter/Space through the native button, focuses the first link, closes on Escape or link activation, and returns focus to the toggle. It does not animate in a way that blocks access.

Exact reduced-motion behavior:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
  .reveal-pending { opacity: 1 !important; transform: none !important; }
}
```

With reduced motion, `site.ts` does not add `.reveal-pending`, the menu changes state without a required animation, anchor jumps are immediate, and every content node is already present. With JavaScript disabled, the default CSS leaves all content visible and the native anchors/menu fallback remain usable.

## 8. Astro, package, and deployment configuration

### Final `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
});
```

There is no adapter import and no `adapter` property. There is no `vercel.json`; Vercel's existing CLI/project integration serves the generated `dist/` output.

### `package.json`

Remove `"@astrojs/vercel": "^8.1.4"` from `dependencies`. Keep `astro`, `@astrojs/check`, `typescript`, and the existing `vercel` CLI dev dependency. Keep the existing scripts, especially `build: "astro check && astro build"`. Run `pnpm install` after the edit so `pnpm-lock.yaml` removes the importer entry and prunes adapter-only packages; do not hand-edit integrity data.

### `.gitignore`

The repository already contains a `.vercel/` rule according to the exploration. The final form must continue to ignore generated Vercel output and may preserve the local project link file deliberately:

```gitignore
# Vercel generated output; preserve project link metadata when CLI deployment needs it
.vercel/
!.vercel/
.vercel/*
!.vercel/project.json
```

If the project link is not intended to be tracked, omit the final exception and retain the simpler `.vercel/` rule. In either case, `.vercel/output/` and stale serverless artifacts must not be committed. No `vercel.json` is added.

## 9. File-by-file change manifest

### Create

- `src/data/profile.ts` — typed content contracts and all profile data.
- `src/components/PlayerCardHero.astro` — player-card hero.
- `src/components/CareerStats.astro` — verified metric grid.
- `src/components/SeasonLog.astro` — chronological employer rail.
- `src/components/Attributes.astro` — qualitative capability groups.
- `src/components/Highlights.astro` — moment/challenge/result cards.
- `src/components/GameLog.astro` — five box-score case studies.
- `src/components/DraftMe.astro` — final contact CTA.
- `src/scripts/site.ts` — menu and reveal progressive enhancement.
- `src/styles/global.css` — tokens, reset, typography, layout, responsive rules, motion, and focus styles.
- `public/images/jose-cabarcas-portrait-640.avif`.
- `public/images/jose-cabarcas-portrait-960.avif`.
- `public/images/jose-cabarcas-portrait-1200.avif`.
- `public/images/jose-cabarcas-portrait-640.webp`.
- `public/images/jose-cabarcas-portrait-960.webp`.
- `public/images/jose-cabarcas-portrait-1200.webp`.
- `public/images/jose-cabarcas-portrait-960.jpg`.
- `public/og/jose-cabarcas-profile.png` — 1200×630 truthful social image.

### Modify/rewrite

- `src/pages/index.astro` — replace inline data and old composition with the seven-section composition.
- `src/layouts/Layout.astro` — English document shell, metadata, non-blocking fonts, CSS import, skip link, and static global structure.
- `src/components/Header.astro` — rewrite for semantic/accessible desktop and mobile navigation.
- `src/components/Footer.astro` — rewrite with real links and valid section anchors.
- `public/favicon.svg` — replace stock Astro rocket with branded JC/stadium favicon.
- `astro.config.mjs` — static output with no adapter.
- `package.json` — remove `@astrojs/vercel` only.
- `pnpm-lock.yaml` — regenerate through `pnpm install`.
- `.gitignore` — retain/add `.vercel/` output hygiene and an intentional project.json exception if deployment needs it.

### Delete

- `src/components/Hero.astro`.
- `src/components/CodeWindow.astro`.
- `src/components/About.astro`.
- `src/components/Skills.astro`.
- `src/components/Projects.astro`.
- `src/components/Contact.astro`.
- `src/components/Section.astro`.

No old placeholder project/social data is moved into the new module.

## 10. Verification plan and rollout

### Automated gate and build inspection

1. Before destructive edits, run `git status`, `git log --oneline -5`, verify or create the `baseline-pre-nba-rebuild` tag, and stop/escalate if the repository is still unborn or the baseline cannot be recovered.
2. Run `pnpm install` after package/config changes.
3. Run `pnpm build`; this must pass both `astro check` and `astro build`.
4. Inspect `dist/index.html` and the emitted asset tree. Confirm that static HTML exists, no `_render.func` or server chunk is generated for page delivery, all image variants and favicon/OG files referenced by HTML exist, and the raw source portrait is not the only browser asset.
5. Inspect the built HTML for exactly one `h1`, `header`, `nav`, `main`, and `footer`; heading order; all six section ids; all menu and CTA anchors; no `href="#"`, `example.com`, YouTube, Twitch, or stale Astro branding.
6. Enumerate numeric text in Career Stats/Game Log and compare it to the context source. Confirm attributes contain no numeric levels or ratings.

### Requirement-to-check matrix

| Spec area | Implementation proof | Verification |
| --- | --- | --- |
| Accessibility | Semantic landmarks, one `h1`, section headings, skip link, `:focus-visible`, text labels, descriptive portrait alt, no hover-only facts | Built HTML audit; keyboard Tab/Shift+Tab and Enter/Space pass; grayscale pass; 320–400px pass; reduced-motion pass |
| Header/navigation | Six valid anchors, visible Draft Me action, native button with menu state and focus return | Resolve every header href against `dist/index.html`; test desktop, 360px touch, keyboard, Escape, and JS-disabled fallback |
| Player-card hero | Real identity, current Monokera context, location, specialist positioning, verified stats, bio, responsive picture | View at 1280×800 and 390×844; inspect `picture`, `width`, `height`, `sizes`, and alt; confirm next section begins in viewport |
| Career Stats | Ten source-backed cards, explicit labels, historical Elenas note | Compare each value/label to context; verify 6 is employers, 2 is stores, and historical wording is adjacent |
| Season Log | Six static entries, exact dates/locations, three explicit Elenas roles | Disable JS and inspect static HTML; resolve entry ids; confirm chronological order |
| Attributes | Capability groups and qualitative text levels; separate learning group | Search section for numeric ratings/percentiles; remove color in manual review; verify every item against context |
| Highlights | Eight separate moment/challenge/result cards with scoped ownership | Compare each card to the deep-career sections; ensure no merged claim or AI-attributed outcome |
| Game Log | Five named case studies with uniform four-field shape | Inspect every card for Context/Role/Stack/Outcome or Responsibility; verify no fake score or project URL |
| Draft Me/footer | Exactly GitHub, LinkedIn, and mailto links; no form | Enumerate external hrefs globally and by section; test with JS disabled |
| Content truth/metadata | Single typed module, English copy, specialist-first metadata, education only if compact | `astro check`; source audit against context; inspect `lang="en"`, title, description, canonical/social tags, favicon, and OG file |
| Performance | Static HTML, eager responsive portrait with dimensions, non-blocking fonts, two small progressive scripts | Inspect `dist/` script/font/image output; preview under throttled network; watch hero for CLS; confirm no animation library/hydration bundle |
| Static delivery | `output: 'static'`, no adapter, refreshed lockfile, ignored Vercel output | Read config/package/lock; run build; inspect absence of `_render.func`; verify a Vercel preview/deployment serves `dist/` through CDN |

### Manual review checklist

- At 1280×800 and 390×844, the hero is compact, the portrait is readable, and the beginning of Career Stats is visible without clipping.
- At 320px, no horizontal scrollbar appears; long values wrap; primary stats and contact actions remain reachable.
- Tab order is skip link, header controls/links, hero actions, then document order; focus is visible on every control.
- Mobile menu opens and closes by keyboard and touch, exposes its state, closes on Escape and link selection, and returns focus correctly.
- Anchor targets land below the sticky header and every navigation target exists.
- JavaScript disabled still exposes all season facts, all cards, all links, and the email action; only enhancement behavior is absent.
- Reduced motion disables smooth scrolling, reveal motion, and nonessential transitions without hiding any content.
- Grayscale and zoom review preserve section identity, attribute levels, timeline dates, and CTA meaning.
- Image loading does not move the hero; fallback fonts render text immediately; no stock Astro/favicon/placeholder link remains.
- Elenas scale is visibly historical, the company shutdown context is present, and no copy calls José a generic full-stack engineer.

### Rollout order

1. Establish the recoverable baseline and resolve the git-risk gate.
2. Add the typed data, global tokens, layout shell, and static config.
3. Add the optimized assets and new section components, then remove legacy components.
4. Run `pnpm build` and static audits.
5. Perform responsive, keyboard, reduced-motion, grayscale, JS-disabled, and throttled-network review.
6. Deploy a Vercel preview, inspect the static deployment output, and only then promote the rebuild.

## Risks and mitigations

- **No safe rollback point:** exploration reports an unborn-looking branch and no remote. Do not delete `src/` until a real baseline commit/tag and deployment rollback are confirmed; escalate under `ask-on-risk` if not possible.
- **Source asset encoding tools may be unavailable:** treat the exact variant list as a release requirement; do not silently ship the 2400×3600 original as the only asset.
- **Remote fonts can regress first paint:** use the async `display=swap` preload strategy and verify fallback rendering under throttling; retain the explicit system stacks.
- **The metaphor can overwhelm professional clarity:** keep role, dates, labels, and plain copy more prominent than decorative rules; never use fake sports scores.
- **Visual review has no automated unit runner:** `pnpm build` catches type/build errors only, so the manual matrix is mandatory and no `.astro` unit-test suite is added.
- **Elenas historical figures are no longer app-store-verifiable:** preserve the source's historical/shutdown language beside both values.
- **Vercel project metadata may be needed locally:** ignore generated output, preserve only `.vercel/project.json` intentionally if the CLI deployment path requires it, and inspect the final git status before release.

---

## Addendum: Content iteration 1 (user-authorized, 2026-09-08)

From the Task 20 manual review. The maintainer authorized content changes beyond the original context document; these supersede the §2 transcription where they conflict:

1. **Title:** hero role and site metadata change from `Frontend Staff Engineer` to **`Senior Software Engineer`**. Season-log historical roles are unchanged (Elenas Staff Engineer stays as history).
2. **Current status:** the hero `currentRole` block (Senior Frontend Developer / Monokera) is replaced by a status badge **`Open to new opportunities`**. Monokera remains in the Season Log only.
3. **Positioning (Opción A):** "Senior Software Engineer with 11+ years shipping frontend and mobile products used by millions — leading teams and architecture, and deliberately crossing into backend when the problem demands it."
4. **Bio (Opción A):** the two-paragraph career-arc bio (Janus IT → Tech Lead/Staff at Elenas → SDD workflow → backend when needed), as approved via interactive preview.
5. **New Game Log entries (7 total), maintainer-authorized additions not present in the original context document:**
   - **Elenas App** — Context: social commerce platform connecting women-led resellers; historical scale 3M+ downloads / 200K+ DAU by 2024 (company later shut down). Role: Senior Frontend Developer → Tech Lead → Frontend Staff Engineer; owned mobile architecture, store releases, and the 5–7 engineer team. Stack: React Native, Expo, EAS, Clean Architecture, Zustand, TanStack Query. Outcome: historical scale of 3M+ downloads / 200K+ DAU by the time he left in 2024, with historical framing.
   - **Elenas Web** — Context: migrating key mobile features (Expo/React Native) to the web. Role: spearheaded the mobile-to-web migration as Frontend Staff Engineer (supported by the context doc's Next.js App Router + TurboRepo web migration claim). Stack: Next.js App Router, Turborepo, pnpm, published shared packages. Outcome: complete migration onto a Turborepo monorepo with published packages for large-scale code reuse.
6. **Attributes:** new capability group **`AI-assisted development`** at level **`Primary`**: Claude Code, Cursor, Codex, Spec-Driven Development. Rendered in the Primary row of the capability board.
7. Metadata title/description update to "Senior Software Engineer" wording, consistent with the visible copy.
