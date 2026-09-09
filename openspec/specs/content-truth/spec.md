# Content Truth Specification

## Purpose

Source discipline for every displayed claim: the context document (`Jose_Cabarcas_Portfolio_Context.md`) is the single content truth source; nothing is invented, nothing is a placeholder, production and learning are never conflated, and the document language is English.

## Requirements

### Requirement: Every claim traces to the context document

Every metric, role, technology claim, project, achievement, employer, and date displayed on the page MUST be supported by a section of the context document. No claim may be carried over from the current site that the context document does not support (notably: the Angular/Laravel/Java early-career bio claim, the "9 years of experience" figure, and the generic "Frontend & Mobile Developer" title).

#### Scenario: Full-page traceability audit

- WHEN each factual claim in the built page (hero, stats, timeline, attributes, highlights, game log, footer, metadata) is compared against `Jose_Cabarcas_Portfolio_Context.md`
- THEN each claim maps to a specific section of the document, and no unsupported claim from the legacy site survives.

#### Scenario: No invented metrics

- WHEN all numeric values displayed on the page are enumerated
- THEN each is either a documented value or an honest restatement of one; none is fabricated, extrapolated, or given false precision.

### Requirement: No placeholder URLs anywhere

The built page MUST contain no placeholder links of any kind: no `example.com`, no `github.com/example`, no `href="#"` interactive anchors, no unverified YouTube/Twitch/social links. External links are limited to the three confirmed contact URLs.

#### Scenario: Global href audit

- WHEN every `href` in the built `dist/index.html` is enumerated
- THEN each is an in-document anchor that exists, one of the three confirmed contact URLs (GitHub `joseocabarcas`, LinkedIn `jose-cabarcas`, `mailto:josecabarcas94@gmail.com`), or a real asset path — nothing else.

### Requirement: Production versus learning distinction

Production experience and learning/exploration MUST NOT be conflated. Learning-only topics (WatermelonDB/MMKV, CQRS/Event Sourcing, and any similar item) MUST be labeled as learning/exploration wherever they appear, and MUST NOT be presented as production experience in any section.

#### Scenario: Learning labels present

- WHEN learning-only topics appear in any section
- THEN they carry a learning/exploration label and never appear among production experience claims (timeline roles, Primary/Strong attributes, highlights, or case studies).

### Requirement: Frontend-specialist positioning

All positioning copy MUST present José as a frontend specialist first — with credible, deliberate backend experience when the problem requires it — and MUST NOT describe him as a generic full-stack engineer.

#### Scenario: Positioning language audit

- WHEN hero, bio, metadata description, and footer copy are inspected
- THEN the specialist-first framing is consistent, and no copy uses generic "full-stack developer/engineering generalist" as José's identity.

### Requirement: Qualitative attributes only, English document language

Attribute capability levels MUST be qualitative (Primary/Strong/Working) — never numeric ratings or invented 2K-style scores (see Attributes spec). The document MUST declare `lang="en"` and all visible copy MUST be English.

#### Scenario: Language consistency

- WHEN the built page is inspected
- THEN `<html lang="en">` is set and all user-visible copy (including aria-labels, alt text, and metadata) is in English.

### Requirement: Education as supporting fact only

If education is included, it MUST appear as a small supporting fact (B.S. Systems Engineering and Software Engineering Diploma, Universidad Simón Bolívar, 2011–2016) — not as a new primary section in the first slice.

#### Scenario: Education scoped correctly

- WHEN the built page is inspected for education content
- THEN it is either absent or presented as a compact supporting fact matching the context document's education section exactly.
