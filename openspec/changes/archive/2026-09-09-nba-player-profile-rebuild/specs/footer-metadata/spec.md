# Footer and Metadata Specification

## Purpose

A truthful footer that repeats the real contact/navigation path, English document metadata that matches visible copy, and branded favicon/OG assets that replace stock Astro branding.

## Requirements

### Requirement: Footer with real destinations only

The footer MUST repeat the primary contact path (email, GitHub, LinkedIn — the confirmed links only) and/or navigation to the page anchors, without placeholder anchors (`href="#"`), placeholder social links, or dead links.

#### Scenario: Footer link audit

- WHEN every href in the footer of the built output is enumerated
- THEN each resolves either to an in-document anchor that exists or to one of the three confirmed contact URLs; no `href="#"` or placeholder social link remains.

### Requirement: English document language

The document MUST declare `<html lang="en">` (or an equivalent English language tag such as `en-US`).

#### Scenario: Language attribute set

- WHEN the `<html>` element of the built `dist/index.html` is inspected
- THEN its `lang` attribute is `en` (not `es`).

### Requirement: Metadata matches visible verified copy

The document MUST include a `title` and meta `description`, and SHOULD include canonical/social (Open Graph/Twitter) metadata and a branded favicon. Metadata claims MUST match the visible, verified page copy — the description must describe José as a frontend specialist (e.g., Frontend Staff Engineer) and MUST NOT repeat outdated or unsupported claims (nine years of experience, generic frontend/mobile title).

#### Scenario: Title and description present and truthful

- WHEN the `<head>` of the built output is inspected
- THEN a title and description exist, and each factual claim they make (role, experience span, specialization) is consistent with the context document and the visible page copy.

#### Scenario: Stock Astro branding removed

- WHEN `public/` and the built output are inspected
- THEN the stock Astro rocket favicon is replaced by a custom favicon consistent with the new visual system, and no Astro starter branding remains in the page.

#### Scenario: OG image consistent when included

- IF a social/OG image is included in the first slice
- THEN it references a real generated asset in the built output (no missing file, no placeholder image URL).

### Requirement: Content data extracted into a structured module

Site content MUST be extracted into a structured data module (or equivalent typed constants) — identity, stats, timeline, attributes, highlights, case studies, contact — rather than remaining as unrelated inline strings across page markup. `astro check` must pass with the module typed.

#### Scenario: Single content source in the code

- WHEN `src/` is inspected
- THEN the professional content (stats, timeline entries, attributes, highlights, projects, contact links) is defined in a dedicated typed data module consumed by the page/components, and `pnpm build` (astro check + astro build) passes.
