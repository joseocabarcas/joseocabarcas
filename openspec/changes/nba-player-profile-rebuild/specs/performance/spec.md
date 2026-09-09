# Performance Specification

## Purpose

Core Web Vitals treated as a design constraint: fast initial HTML, low layout shift, responsive image sizing, non-blocking typography, and minimal client JavaScript on a fully static build.

## Requirements

### Requirement: Minimal client JavaScript

The page MUST ship minimal client JavaScript: static HTML/CSS is the default, nonessential scripts are deferred, and Astro hydration is used only where a behavior genuinely needs it. No animation library may be included unless implementation demonstrates CSS cannot meet a real product need. No autoplay video, canvas scene, or heavy client-side animation framework.

#### Scenario: Script audit of the built output

- WHEN the `<script>` elements and script assets in `dist/` are inspected
- THEN no animation library bundle is present, scripts are small and deferred/inline-essential only, and hydration components (if any) are justified by an interactive behavior that requires them.

### Requirement: Non-blocking font loading with stable fallbacks

Typography loading MUST NOT block primary content. If remote fonts are retained, loading must be non-blocking (e.g., preconnect/font-display strategy) and fallback metrics must remain acceptable — no long invisible-text period. A self-hostable strategy is preferred.

#### Scenario: Font strategy review

- WHEN the font loading markup in the built `<head>` and the loading behavior in a throttled-network preview are reviewed
- THEN text renders without a blocking invisible period, fallback fonts are metric-compatible or visually acceptable, and no render-blocking font stylesheet is fetched synchronously from a remote host without a mitigation.

### Requirement: Image sizing prevents layout shift

The headshot (and any content image) MUST declare explicit dimensions or aspect ratio and use responsive sources sized for their display contexts, so no layout shift occurs while images load. The 2400×3600 original is not the sole browser asset (see Player-Card Hero spec).

#### Scenario: Dimensions declared

- WHEN the hero image markup in the built output is inspected
- THEN width/height attributes or CSS aspect-ratio reserve the image's layout box, and responsive variants (`srcset`/`<picture>`) cover the display range without shipping the raw original as the only source.

### Requirement: Static delivery for cacheability and TTFB

The site MUST be delivered as prebuilt static HTML from Vercel's CDN (see Static Delivery spec): no per-request serverless rendering for the page, improving cacheability and TTFB.

#### Scenario: Static build verified

- WHEN `pnpm build` completes and the deployment output is inspected
- THEN the page is served from static HTML files with no serverless render function in the deployment output.

### Scenario-level verification note

Automated measurement tooling (Lighthouse/CI budgets) is not installed in this repository; performance scenarios above are verified by inspecting the production build output (`dist/`) and manual preview review under a slow-network mindset for the hero image and fonts, per the SDD config's verification rules.
