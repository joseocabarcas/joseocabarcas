# Player-Card Hero Specification

## Purpose

A compact above-the-fold player card that answers "who is this, what does he do, why keep reading" in the first viewport: optimized real headshot, identity, verified key stats, positioning statement, bio, scroll CTA, and contact access.

## Requirements

### Requirement: Optimized real headshot asset

The site MUST serve the confirmed headshot (source: `Jose Omar Cabarcas Gutíerrez_A9A3905.jpg` from Downloads) from a web-safe public path such as `public/images/jose-cabarcas.jpg`. The 2400×3600 original MUST NOT be shipped as the only browser asset: the shipped asset(s) MUST be appropriately sized (responsive variants and/or modern formats such as WebP/AVIF), with explicit dimensions or aspect ratio to prevent layout shift.

#### Scenario: Web-safe asset present in the build

- WHEN the `public/` directory and built `dist/` output are inspected
- THEN a web-safe-named headshot asset (no spaces or accented characters in the path) is committed under `public/images/` (or an equivalent web-safe path) and is emitted into the built output.

#### Scenario: Original is not the only shipped asset

- WHEN the image files shipped in `dist/` are inspected
- THEN the hero references sized, web-optimized variants (and/or a modern-format source), not solely a byte-for-byte 2400×3600 original; the hero markup declares width/height or an aspect ratio so the image reserves its layout box before load.

#### Scenario: Layout shift check

- GIVEN the built page opened in a browser
- WHEN the page loads without a warm cache
- THEN the hero image does not cause a visible layout reflow (its space is reserved by markup/CSS).

### Requirement: Hero identity content

The hero MUST present: the name "José Cabarcas"; the primary role "Frontend Staff Engineer"; the current/recent context (Senior Frontend Developer at Monokera through July 2026) if a current-role line is shown; the location "Barranquilla, Colombia"; and a positioning statement centered on frontend specialization, technical leadership, and taking on backend work when the problem requires it. The hero MUST NOT describe José as a generic full-stack engineer.

#### Scenario: Identity fields rendered truthfully

- WHEN the hero markup in the built output is inspected
- THEN name, role, and location match the context document values verbatim where factual (name, city, role titles), and the positioning copy is frontend-specialist-first rather than generic full-stack language.

### Requirement: Verified key stat row

The hero stat row MUST use only values verified in the context document — e.g., 11+ years of experience, teams of 5–7 led at Elenas, and the Elenas historical scale — each with an unambiguous label. Ambiguous facts (e.g., employer count vs. role count) MUST NOT be compressed into misleading sports-statistic labels.

#### Scenario: Every hero stat value traces to the source

- WHEN each numeric value displayed in the hero is compared against `Jose_Cabarcas_Portfolio_Context.md`
- THEN each value appears in the context document or is a direct restatement of one (e.g., "11+" from "11+ years of experience"), and each stat label makes its meaning unambiguous.

#### Scenario: Elenas scale labeled as historical

- WHEN the Elenas 3M+ downloads / 200K+ DAU figures appear in the hero
- THEN they are accompanied by wording that presents them as historical context (the company later shut down), not as currently verifiable figures.

### Requirement: Short specific bio card

The hero MUST include a short bio card with a specific narrative grounded in the context document (early broad exposure → frontend/mobile specialization → technical leadership → deliberate backend adaptability → SDD workflow), and MUST NOT use generic "passionate developer" template language.

#### Scenario: Bio claims are specific and traceable

- WHEN the bio text is compared against the context document
- THEN every claim in the bio maps to a section of the context document, and no template filler phrases ("passionate about technology", "love what I do") are present.

### Requirement: Scroll CTA and contact access

The hero MUST provide a scroll CTA targeting Career Stats or the Season Log anchor, and direct contact access (email link and/or a link to the Draft Me anchor).

#### Scenario: Hero CTAs resolve

- WHEN the hero's scroll CTA and contact link hrefs are resolved against the built document
- THEN both resolve to existing anchors or the confirmed email address, and no hero CTA is a placeholder.

### Requirement: Compact card exposes following content

The hero MUST be a compact player card rather than a full-screen generic hero: on common desktop and mobile viewports, the beginning of the next content section MUST be visible without scrolling, while the portrait treatment remains readable and the hierarchy clear.

#### Scenario: Manual viewport review

- GIVEN the built page viewed at representative desktop (e.g., 1280×800) and mobile (e.g., 390×844) viewports
- WHEN the page first loads
- THEN the hero card fits within the viewport with the start of the following section visible, and no essential hero element (name, role, contact action, primary stats) is clipped or hidden.
