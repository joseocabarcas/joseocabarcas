# Career Stats Specification

## Purpose

A scan-friendly grid of large, verified career facts with explanatory labels, presented as stats without converting ambiguous facts into misleading numbers.

## Requirements

### Requirement: Verified stats with explanatory labels

The Career Stats section MUST present the verified facts from the context document: 11+ years of experience (from October 2014); six employer chapters; teams of 5–7 engineers led at Elenas; the Elenas historical scale (3M+ app downloads, 200K+ daily active users); startup 24s → 7s on low-end devices and checkout 14s → 5s; approximately 30% bundle/build optimization reduction; approximately 25% faster test execution after Jest → Vitest; and two stores published (Google Play and App Store). Each stat card MUST include a label that explains what the number means.

#### Scenario: Every stat value traces to the source

- WHEN each numeric value in the Career Stats grid is compared against `Jose_Cabarcas_Portfolio_Context.md`
- THEN every value matches the document exactly (including the "approximately" framing for ~30% and ~25% figures), and no numeric value appears on the page that is absent from the document.

#### Scenario: Labels disambiguate employer vs. role counts

- WHEN the employer-count stat is rendered
- THEN its label distinguishes six employers from the roles held at them (e.g., "6 employers" with supporting text about the three-role progression at Elenas), so the number cannot be read as six roles or six teams led.

#### Scenario: Store publication stat is scoped correctly

- WHEN the "two stores published" stat is rendered
- THEN its label identifies it as publishing the Elenas app to Google Play and the App Store, not as two separate apps or José's personal apps.

### Requirement: Elenas scale presented as historical context

The Elenas scale figures (3M+ downloads, 200K+ DAU) MUST be explicitly presented as historical context from José's career — the company later shut down — and MUST NOT imply current, independently verifiable app-store status.

#### Scenario: Historical framing present

- WHEN the Elenas scale stat card is inspected in the built output
- THEN accompanying copy states or clearly implies that these are historical figures from the time José was there (by the time he left in 2024) and that the company later shut down.

### Requirement: No metric forced into the metaphor

A fact MUST NOT be converted into a number merely to fit the player-stat metaphor. Facts that cannot be labeled unambiguously MUST be omitted from the stat grid rather than displayed with a misleading label.

#### Scenario: No invented or re-derived metrics

- WHEN the stat grid is audited against the context document
- THEN every displayed metric is either taken directly from the document or clearly derived from it with an honest label, and no metric is fabricated, extrapolated, or given false precision (e.g., no percentile, ranking, or score figures).
