# Attributes Specification

## Purpose

Skills grouped by meaningful capability with sober qualitative levels — Primary, Strong, Working/Applied — never numeric ratings or invented precision.

## Requirements

### Requirement: Qualitative levels only

Attributes MUST use qualitative level labels (Primary, Strong, Working/Applied) and MUST NOT present numeric scores, ratings, percentiles, years-per-skill claims, endorsements, or certifications. The levels MUST be written as text, not communicated by color, size, or icon alone.

#### Scenario: No numeric attribute values

- WHEN the Attributes section markup in the built output is inspected
- THEN every attribute level is expressed as a text label (Primary/Strong/Working or equivalents), and no element in the section renders a numeric rating, score, or percentile for a skill.

#### Scenario: Level meaning not color-dependent

- WHEN the Attributes section is viewed with color disabled or with the accent color removed
- THEN each attribute's level remains determinable from its text label.

### Requirement: Traceable, conservative grouping

Attribute groupings MUST be conservative and traceable to the context document. The Primary group MUST cover React, React Native, Next.js, TypeScript, Expo, frontend architecture, design systems, monorepos/micro-frontends, and technical leadership; the Strong group MUST cover the context-documented Strong items (e.g., Zustand, TanStack Query, GraphQL, Node.js, Go, Ruby on Rails, Python, Kotlin/Android modules, Playwright, Vitest, Storybook, AWS Lambda/CloudFront/S3, observability tooling, CI/CD); the Working/Applied group MUST contain only adjacent technologies and practices evidenced in the context document.

#### Scenario: Every attribute appears in the context document

- WHEN each attribute name in the section is compared against `Jose_Cabarcas_Portfolio_Context.md`
- THEN each is present in the document's technology list or detailed role sections; no skill absent from the document is displayed.

#### Scenario: Grouping matches production depth

- WHEN an attribute's assigned level is compared against its treatment in the context document
- THEN core frontend/mobile/leadership items from production roles are Primary, context-supported secondary items are Strong or Working, and no attribute is elevated to Primary without production-role evidence in the document.

### Requirement: Learning topics labeled as learning

Learning-only topics — including WatermelonDB/MMKV and CQRS/Event Sourcing — MUST, if included, be labeled as learning/exploration and MUST NOT be presented as production experience.

#### Scenario: Learning separated from production

- WHEN WatermelonDB, MMKV, CQRS, or Event Sourcing appear in the Attributes section
- THEN they are visually and textually labeled as learning/exploration, and they do not appear in the Primary or Strong production groups.

### Requirement: Grouped by capability, not a keyword wall

Attributes MUST be organized into meaningful capability groups (e.g., frontend/mobile, state and data, backend, architecture, testing, observability, tooling) rather than a flat keyword list.

#### Scenario: Grouped structure in markup

- WHEN the Attributes section is inspected
- THEN attributes are nested under labeled capability groups, and the section is not a single undifferentiated tag wall.
