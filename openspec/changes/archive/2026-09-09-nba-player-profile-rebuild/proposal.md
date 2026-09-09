# Proposal: NBA Player Profile Portfolio Rebuild

## Status

Proposed for plan and implementation. This proposal treats the confirmed handoff decisions and the validated exploration map as authoritative. It does not reopen the product direction, language, framework, or content-truth decisions.

## Executive summary

Rebuild the single-page Astro portfolio as a compact, editorial NBA player-profile experience for José Cabarcas, a frontend specialist who has grown into Staff-level technical leadership while deliberately taking on backend and platform work when the problem requires it.

The current site is a generic starter-style portfolio: it uses Spanish document metadata despite English-bound replacement copy, an initials avatar, placeholder social links, outdated experience and role claims, generic project cards, and a server-rendered Vercel deployment for content that is entirely static. The rebuild will replace `src/` with a coherent player-profile information architecture, use the verified career context as the only source for professional claims, add an optimized real headshot, and ship as static HTML through Vercel's CDN.

The visual language is a dark stadium: near-black surfaces, one electric accent, condensed display typography, and mono treatment for stats and labels. The player-profile metaphor is an information hierarchy and art direction—not a literal game simulation and not a numeric self-rating system. Attributes therefore use sober levels such as Primary, Strong, and Working rather than invented 2K-style scores.

## Problem and opportunity

### Problem

The current portfolio makes José's actual experience harder to understand and trust than it should be:

- Its generic structure does not communicate the progression from broad early-career work through frontend specialization, technical leadership, and Staff Engineer responsibility.
- Several claims are outdated or unsupported by the career context, including nine years of experience, a generic frontend/mobile title, unsupported early-career technology claims, and placeholder project/social links.
- The site has no real portrait, no central email contact, and no clear presentation of verified outcomes such as performance improvements, team leadership, release ownership, or the Elenas product scale.
- A server output mode renders a 100% static portfolio through a serverless function rather than serving prebuilt HTML directly from the CDN.
- The current mobile navigation is incomplete, and the existing visual system does not provide a strong, memorable reason for a hiring manager or collaborator to continue reading.

### Opportunity

Present the portfolio as a fast, distinctive player card for a technical frontend leader. A visitor should be able to identify who José is, what level of work he has done, how his career developed, what he is strongest at, and how to contact him within the first screenful—then explore evidence through a season timeline and project case studies.

## Goals

1. Replace the current generic portfolio UI with a custom NBA player-profile concept that is memorable without copying a Dribbble reference or imitating a sports-game interface literally.
2. Make the above-the-fold card communicate José's name, role, real headshot, location, key verified stats, short positioning statement, scroll path, and contact access.
3. Present a truthful career narrative from October 2014 through July 2026, including six employers and the three-role progression at Elenas.
4. Make verified outcomes easy to scan: 11+ years, team leadership of 5–7 engineers, Elenas historical scale, startup and checkout improvements, bundle and test-speed improvements, and release/platform ownership.
5. Distinguish capability levels with qualitative labels rather than fabricated numerical ratings.
6. Use project case studies as evidence, with role, stack, context, and concrete outcome where the source supports one.
7. Make SDD and disciplined AI-assisted development visible as a genuine differentiator, without turning it into generic AI marketing language.
8. Improve accessibility, mobile usability, static delivery, image performance, and metadata while preserving Astro 5, pnpm, and Vercel.
9. Ensure every professional claim can be traced to `Jose_Cabarcas_Portfolio_Context.md` and preserve production-versus-learning distinctions.

## Non-goals

The first slice will not include:

- A CMS, content editing interface, database, API, or dynamic personalization.
- A blog, writing archive, newsletter, or separate case-study routing system.
- An i18n toggle or multilingual content system. The site is English-only and uses `lang="en"`.
- A unit-test runner or unit tests for Astro components. The repository has no unit-test runner; `pnpm build` remains the mandatory automated gate, with manual responsive/visual review.
- A game-like numeric attribute/rating system, leaderboard, fabricated percentile, or invented metric.
- Animation libraries where CSS and small progressive-enhancement scripts are sufficient.
- A literal basketball-game simulator, live data, player comparison, score calculator, or interactive roster feature.
- Unverified YouTube, Twitch, client logos, testimonials, project URLs, or outcome claims.
- A claim that José is a generic full-stack engineer. The positioning remains frontend specialist first, with credible backend experience when the problem requires it.
- A requirement to preserve the old component structure, old copy, green theme, fake code window, placeholder links, or initials avatar.

## Target users and situations

### Primary users

- Hiring managers and engineering leaders evaluating a senior/staff frontend candidate.
- Technical interviewers who need a fast view of architecture, delivery, leadership, and production evidence.
- Founders or product/engineering collaborators deciding whether José can own frontend architecture and work across adjacent backend/platform concerns.

### Secondary users

- Recruiters and professional contacts scanning on a phone or from a shared link.
- Engineers who want to understand José's technical range, project decisions, and SDD/AI-assisted workflow.

### Usage situation

Most visitors will arrive from a direct link, LinkedIn, GitHub, or a hiring conversation with limited attention. The first viewport must answer “who is this, what does he do, and why should I keep reading?” The rest of the page should support a quick scan or a deeper chronological/project review without requiring a form submission or client-side application state.

## Proposed scope and information architecture

Implement one responsive static page with semantic anchor navigation. The exact component boundaries may change during planning, but the product sections are fixed as follows.

### 1. Header and navigation

- Compact brand/wordmark for José.
- Links to the major page anchors: Career Stats, Season Log, Attributes, Highlights, Game Log, and Draft Me.
- A clearly visible contact action that reaches the Draft Me section or email.
- Mobile navigation must be operable with keyboard and touch; no dead menu button.
- Include a skip link and preserve visible focus states.

### 2. Player-card hero

Above the fold, present a compact player card rather than a full-screen generic hero:

- Optimized real headshot sourced from the confirmed Downloads file and copied under a web-safe public path.
- Name: José Cabarcas.
- Primary role: Frontend Staff Engineer, with current/recent context represented accurately as Senior Frontend Developer at Monokera through July 2026 if shown.
- Location: Barranquilla, Colombia.
- Positioning statement centered on frontend specialization, technical leadership, and choosing backend work when the problem calls for it.
- Key stat row using only verified values, such as `11+ YRS`, `6 TEAMS/EMPLOYERS` only if the label is made unambiguous, `5–7 LED`, and the historical Elenas scale. Avoid compressing ambiguous facts into misleading sports statistics.
- Bio card with a short, specific narrative rather than generic “passionate developer” language.
- Scroll CTA pointing to Career Stats or Season Log.
- Direct contact access, including email and/or Draft Me anchor.

The card should remain compact enough to expose the beginning of the next content on common desktop and mobile viewports, while preserving readable portrait treatment and clear hierarchy.

### 3. Career Stats

A scan-friendly grid of large, verified facts with supporting labels and optional source context:

- 11+ years of experience, beginning October 2014.
- Six employer chapters across the season log, with labels that clarify employer count versus roles.
- Teams of 5–7 engineers led at Elenas.
- Elenas historical scale: 3M+ app downloads and 200K+ daily active users by the time José left in 2024; explicitly presented as historical context because the company later shut down.
- Performance outcomes: startup 24s → 7s on low-end devices and checkout 14s → 5s.
- Approximately 30% bundle/build optimization reduction where the context supports the label.
- Approximately 25% faster test execution after Jest → Vitest migration.
- Two stores published: Google Play and App Store.

The card labels must explain what each number means. Do not convert every fact into a number merely to fit the metaphor.

### 4. Season Log

A chronological employer timeline covering 2014 → 2026:

- Janus IT — Oct 2014–Feb 2016, broad back-end, front-end, and mobile-testing exposure; the origin of the UX interest.
- Joonik — Mar 2016–Mar 2019, legacy web app migration to Vue.js.
- Merqueo — Mar 2019–Sep 2019, backend-heavy order-rating microservices using Node.js, Go, and DynamoDB, plus Vue.js ratings UI.
- Picap — Oct 2019–Apr 2020, Firebase/Firestore communication, driver-customer chat, live order tracking, and video chat for an online medical appointments vertical.
- Elenas — May 2020–Oct 2024, three roles: Senior Frontend Developer, Tech Lead, and Frontend Staff Engineer. Include mobile architecture, EAS, leadership, performance, web migration, and production scale where relevant.
- Monokera — Oct 2024–Jul 2026, Senior Frontend Developer. Include micro-frontends/monorepo architecture, reusable design-system components, testing and build optimization, Sales Builder Rails service, and Datadog-backed production work.

Timeline interactions should be lightweight: anchorable entries, hover/focus detail, or progressive disclosure only if it remains accessible without relying on hover or JavaScript. The chronology must work as plain document content.

### 5. Attributes

Group skills by meaningful capability rather than a flat keyword wall. Use qualitative levels:

- **Primary:** React, React Native, Next.js, TypeScript, Expo, frontend architecture, design systems, monorepos/micro-frontends, technical leadership.
- **Strong:** Zustand, TanStack Query, GraphQL, Node.js, Go, Ruby on Rails, Python, Kotlin/Android modules, Playwright, Vitest, Storybook, AWS Lambda/CloudFront/S3, observability tooling, CI/CD.
- **Working / Applied:** selected adjacent technologies and practices evidenced in the context.

The final grouping must be conservative and traceable. Learning-only topics such as WatermelonDB/MMKV and CQRS/Event Sourcing must be labeled as learning/exploration if included, not presented as production experience. Attribute chips or rows must not imply a numeric score, years-per-skill claim, endorsement, or certification.

### 6. Highlights

A set of career achievement cards with concise “moment / challenge / result” framing, including:

- App Store/Google compliance rescue involving the outdated Segment SDK and Google Play Services deadline.
- Expo Classic Updates → EAS pipeline and OTA release workflow.
- Expo 47 → Expo 51 migration under breaking changes.
- Clean Architecture mobile redesign separating data, domain, and presentation.
- CRA v3 → Vite internal dashboard migration.
- Ruby on Rails Sales Builder microservice built to meet a concrete product need.
- Performance work that moved startup and checkout times to the verified outcomes.
- SDD and AI-assisted development as a current working method: define criteria, generate a first pass, validate layer by layer, and describe failures precisely for correction.

Do not imply ownership beyond the context document or combine separate achievements into an unsupported single claim.

### 7. Game Log

Project case studies presented as box-score-inspired cards, not as fake game statistics:

- **Monokera-Core:** shared services, components, utilities, and design system in a Turborepo/pnpm monorepo; libraries published/stored in JFrog.
- **Mi Banco:** insurance management and sales platform; component/service reuse as a foundation for the core platform's first phase.
- **Sales Builder:** Ruby on Rails microservice managing components for an assisted insurance-sales micro-frontend.
- **Stories Feature:** native Kotlin Android module bridged into React Native/Expo for short videos/photos and product discovery.
- **Mobile CI/CD pipeline:** Expo tooling and later EAS pipeline enabling OTA updates without full store resubmission.

Each card should have a consistent data shape—context, role, stack, and verified outcome or responsibility. Omit a metric when the source does not provide one. Do not use `example.com`, fake GitHub links, or unsupported live demos.

### 8. Draft Me

A final contact CTA that uses the confirmed links only:

- GitHub: `https://github.com/joseocabarcas`
- LinkedIn: `https://linkedin.com/in/jose-cabarcas`
- Email: `mailto:josecabarcas94@gmail.com`

The section should make the next action obvious, work without JavaScript, expose accessible link names, and avoid YouTube/Twitch. A simple mailto action is sufficient; a contact form is out of scope.

### 9. Footer and metadata

- Repeat the primary contact/navigation path without placeholder anchors.
- Set document language to English: `<html lang="en">`.
- Add title, description, canonical/social metadata, and a branded favicon/OG image if produced within the asset scope.
- Ensure metadata claims match the visible, verified copy.

## Design direction

### Visual system

- **Base:** near-black stadium/night surfaces with layered charcoal panels rather than a broad multicolor gradient.
- **Accent:** one electric accent color used for active states, rules, selected values, and calls to action. The exact accessible hue should be chosen in implementation after contrast checks; avoid retaining the current green as a default.
- **Text:** high-contrast warm white for primary copy, muted gray for supporting labels, and accent text only where contrast remains compliant.
- **Surfaces:** player-card panels, stat strips, timeline rails, and box-score grids can use subtle borders, grain, or glow, but decoration must not compete with the content.
- **Imagery:** the real headshot is the primary visual anchor. No stock basketball imagery or decorative visual that implies José played professional basketball.

### Typography

- Use a condensed display face for the name, section titles, large numbers, and short labels.
- Use a monospace face for stats, metadata, section indices, and box-score labels.
- Use a highly readable sans-serif/system stack for paragraph copy and long descriptions.
- Prefer a self-hostable or otherwise performance-conscious font strategy; if remote fonts are retained, loading must not block primary content and the fallback metrics must remain acceptable.

### Motion and interaction

- Use restrained CSS transitions for card emphasis, anchor navigation, accent rules, and timeline reveal.
- Do not require animation for comprehension or access to content.
- Honor `prefers-reduced-motion: reduce` by disabling smooth scrolling and nonessential transitions/reveals.
- Avoid animation libraries unless implementation demonstrates that CSS cannot meet a real product need.
- Preserve a fast first render: no autoplay video, canvas scene, or heavy client-side animation framework.

## Content plan and source discipline

The context document is the content source of truth. Content should be extracted into a structured data module or equivalent typed constants instead of remaining as unrelated inline strings across page markup. Every displayed claim should be traceable to a context section:

| Site area | Source material | Guardrail |
| --- | --- | --- |
| Hero identity and positioning | “Who I am”, contact, tone/voice notes | Say frontend specialist first; do not call José a generic full-stack engineer. |
| Career Stats | “Career narrative arc”, detailed Elenas roles, Monokera role | Use only supplied values and explain historical context for Elenas metrics. |
| Season Log | “Career narrative arc” and detailed experience by role | Preserve dates, role progression, locations/remote context, and employer overlap accurately. |
| Attributes | Full technology list and detailed roles | Use Primary/Strong/Working labels; separate learning from production. |
| Highlights | Interview-ready deep dives and detailed experience | Keep ownership and outcomes scoped to the source. |
| Game Log | Projects section and relevant detailed roles | Use real project names and outcomes; no placeholder URLs or invented metrics. |
| Draft Me | Contact line and confirmed handoff | Use only GitHub, LinkedIn, and email links. |
| Education, if included | Education | Keep as a small supporting fact, not a new primary section in the first slice. |

The site copy should be concise enough for scanning, but it must retain the meaningful distinctions in the source: early broad exposure, frontend/mobile specialization, backend adaptability, production versus learning, and SDD as an actual workflow.

## Deployment and configuration changes

1. Change `astro.config.mjs` to `output: 'static'`.
2. **Adapter decision: drop the Vercel adapter from the Astro build.** A content-only Astro site with static output does not need `@astrojs/vercel/serverless` or a runtime adapter. Remove the serverless adapter import/configuration and, if no other package uses it, remove the adapter dependency from `package.json` and refresh `pnpm-lock.yaml`.
3. Keep Vercel as the deployment platform. Vercel should serve the generated static `dist/` output through its CDN using the existing CLI/project integration or the repository's established deployment path; Astro 5 and Vercel remain unchanged at the platform level.
4. Do not introduce a `vercel.json` unless the actual deployment requires an explicit build/output override. The default Astro static output should be the first choice.
5. Add `.vercel/` to `.gitignore` for generated deployment artifacts, while deliberately preserving any project-link metadata the team needs for CLI deployment if it is tracked or required locally.
6. Copy the confirmed headshot into `public/` under a web-safe name such as `public/images/jose-cabarcas.jpg`, then generate appropriately sized WebP/AVIF or responsive variants during implementation. Do not ship the 2400×3600 original as the only browser asset.
7. Replace the stock Astro favicon and, if included in the first slice, generate a lightweight social/OG image consistent with the new visual system.
8. Before destructive source replacement, verify the existing git status/history and confirm the user-provided `baseline-pre-nba-rebuild` tag and remote baseline. The supplied handoff treats rollback as safe; the implementation phase must still verify the working checkout rather than assume it.

## Accessibility and performance expectations

### Accessibility

- Use semantic landmarks: `header`, `nav`, `main`, meaningful `section` headings, and `footer`.
- Maintain a logical heading hierarchy and useful anchor targets.
- Provide descriptive alt text for the headshot; decorative textures must use empty alt or CSS.
- Ensure all interactive elements are keyboard reachable, have visible focus styles, and expose useful accessible names.
- Do not rely on color, hover, motion, or the basketball metaphor alone to communicate meaning. Attribute levels and timeline states must be written as text.
- Check accent, muted text, panel, and focus colors against appropriate contrast expectations.
- Make the mobile menu, if implemented, operable with keyboard, touch, and assistive technology; closing and focus behavior must be understandable.
- Respect `prefers-reduced-motion` and keep anchor navigation usable when smooth scrolling is disabled.
- Ensure responsive layouts do not hide essential stats or contact actions at narrow widths and do not cause horizontal scrolling.

### Performance

- Treat Core Web Vitals as a design constraint: fast initial HTML, low layout shift, responsive image sizing, and minimal client JavaScript.
- Use explicit image dimensions/aspect ratio and responsive sources to prevent layout shift.
- Prefer static HTML/CSS, defer nonessential scripts, and avoid hydration unless a behavior genuinely needs it.
- Keep typography loading non-blocking and provide stable fallbacks.
- Use the static output mode to remove per-request serverless rendering and improve cacheability/TTFB.
- Review the production build and preview on mobile and desktop, including a slow-network mindset for the hero image and fonts.

## First-slice boundaries

The first implementation slice is complete when it contains one coherent, shippable static page with:

1. The rebuilt player-card hero and accessible responsive header.
2. Career Stats, Season Log, Attributes, Highlights, Game Log, and Draft Me sections.
3. Truthful English content mapped to the supplied context document.
4. The optimized real headshot, branded favicon, and essential metadata.
5. Dark stadium styling, condensed display/mono typography treatment, restrained motion, and reduced-motion support.
6. Static Astro/Vercel configuration with the adapter decision implemented and generated output suitable for CDN delivery.
7. Working GitHub, LinkedIn, and email links with no placeholder social/project URLs.
8. `pnpm build` passing (`astro check && astro build`) plus manual responsive/accessibility review.

Later refinements may improve micro-interactions, add richer OG artwork, tune typography, or split project details into dedicated pages only if actual content volume justifies it. They are not prerequisites for the first product slice.

## Success criteria

### Product and content

- A first-time visitor can identify José's role, specialization, location, career span, and contact path from the hero and first section without reading the entire page.
- The page communicates the progression from 2014 through 2026 and the Elenas Senior → Tech Lead → Staff growth without ambiguity.
- Every metric, role, technology claim, project, and achievement included in the page is supported by the career context document.
- Production experience and learning/exploration are not conflated.
- The portfolio feels like a distinct player profile while remaining clearly a professional engineering portfolio.

### UX and quality

- All navigation and contact actions work on desktop and mobile, including keyboard use.
- No placeholder links, unsupported YouTube/Twitch links, dead menu controls, or stock Astro branding remain.
- Reduced-motion users receive the same content and usable navigation.
- The page has no avoidable horizontal overflow or cumulative layout shift caused by the headshot, fonts, or dynamic content.
- `pnpm build` passes before the phase is considered complete.
- Static output is generated without a serverless render function for the page, and Vercel can serve the resulting build through the CDN.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| NBA metaphor overwhelms professional clarity | Visitors may mistake the site for a gimmick or infer invented sports credentials | Keep copy factual, use the metaphor for hierarchy and visual framing, and make role/experience prominent in plain language. |
| Condensed type, mono labels, and dark contrast reduce readability | Poor mobile or low-vision experience | Use readable body text, test contrast, constrain line lengths, preserve semantic text, and validate at narrow widths. |
| Metrics become misleading when compressed into stat cards | Loss of trust | Add explicit labels and historical context; omit metrics that cannot be clearly labeled. |
| Attribute levels are interpreted as unsupported self-ratings | Content credibility risk | Use sober qualitative labels, explain that they are portfolio groupings if necessary, and avoid numeric scores or false precision. |
| Elenas metrics cannot be independently verified after shutdown | Recruiter skepticism | State them as historical facts from José's career context and avoid implying current app-store verification. |
| Full rebuild discards useful existing behavior or introduces regressions | Delivery/rollback risk | Verify the confirmed baseline tag and working tree before replacing `src/`; keep the baseline available and review the current deployment. |
| Static adapter/configuration change conflicts with deployment setup | Build or deploy failure | Implement `output: 'static'`, remove the serverless adapter deliberately, run `pnpm build`, and verify a Vercel preview/deployment before release. |
| No unit-test runner exists | Visual/accessibility regressions may escape automation | Treat `pnpm build` as the automated gate and require manual preview checks across responsive, keyboard, reduced-motion, and content paths. |
| Headshot or font assets are too heavy | Slow LCP and poor mobile experience | Resize/crop intentionally, provide modern formats and dimensions, use non-blocking font loading/fallbacks, and inspect the production build. |
| Scope expands into a full case-study platform | Delayed rebuild and diluted first impression | Keep one static page, five box-score case studies, and no CMS/blog/routes in the first slice. |

## Rollback plan

- Preserve the pre-rebuild state under the confirmed `baseline-pre-nba-rebuild` git tag before deleting or overwriting source files.
- If the static configuration or visual rebuild fails acceptance, revert the rebuild commit(s) to restore the baseline Astro site and its known deployment configuration.
- If the source rollback is needed but deployment is healthy, redeploy the baseline commit/tag through Vercel.
- Keep generated `.vercel/` output out of source control so stale serverless artifacts cannot obscure whether the deployed build is static.
- Rollback is limited to the site/configuration changes; no content database or migration is involved.

## Proposal question round

The handoff explicitly resolved the product questions that would otherwise block this proposal: audience direction, English language, visual concept, page sections, qualitative attributes, contact destinations, static output intent, content-truth rules, headshot source, and baseline/verification expectations. No additional product question round is required before planning. Any remaining choices—exact accent hue, font package, component decomposition, image encoder, and minor copy wording—are implementation/design details and should be resolved without changing the product scope or source-of-truth rules.
