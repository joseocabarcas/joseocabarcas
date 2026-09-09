# Season Log Specification

## Purpose

A chronological employer timeline covering October 2014 through July 2026, readable as plain document content, with lightweight and accessible interactions only.

## Requirements

### Requirement: Complete and accurate employer timeline

The Season Log MUST present all six employers in chronological order with the context-document dates and scope:

1. Janus IT — Oct 2014–Feb 2016 — broad back-end, front-end, and mobile-testing exposure; origin of the UX interest.
2. Joonik — Mar 2016–Mar 2019 — legacy web app migration to Vue.js.
3. Merqueo — Mar 2019–Sep 2019 — backend-heavy order-rating microservices (Node.js, Go, DynamoDB) plus Vue.js ratings UI.
4. Picap — Oct 2019–Apr 2020 — Firebase/Firestore communication patterns, driver-customer chat, live order tracking, video chat for an online medical appointments vertical.
5. Elenas — May 2020–Oct 2024 — three roles: Senior Frontend Developer, Tech Lead, Frontend Staff Engineer; mobile architecture, EAS, leadership, performance, web migration, production scale.
6. Monokera — Oct 2024–Jul 2026 — Senior Frontend Developer; micro-frontends/monorepo architecture, design-system components, testing and build optimization, Sales Builder Rails service, Datadog-backed production work.

#### Scenario: Timeline facts match the source

- WHEN each timeline entry (employer, date range, role title, and summary) is compared against `Jose_Cabarcas_Portfolio_Context.md`
- THEN employers, dates, role titles, and technology/responsibility claims match the document, including the Merqueo role title (Full Stack Developer) and the Merqueo/Picap locations (Bogotá) where shown.

#### Scenario: Elenas role progression is explicit

- WHEN the Elenas timeline entry is rendered
- THEN it shows the three roles (Senior Frontend Developer → Tech Lead → Frontend Staff Engineer) with their date boundaries or an equivalent explicit progression presentation, so the growth is unambiguous.

### Requirement: Chronology works as plain document content

The Season Log MUST be fully readable as plain document content: every employer, date range, and role must be present in the static HTML without requiring hover, JavaScript state, or progressive disclosure to reveal core facts.

#### Scenario: Static output contains full chronology

- WHEN `dist/index.html` (the built static output) is inspected without executing JavaScript
- THEN all six employers, their date ranges, and the Elenas role progression are present as text in the rendered HTML.

#### Scenario: Hover/focus detail is enhancement only

- IF a timeline entry uses hover, focus, or progressive-disclosure detail
- THEN the entry's core facts (employer, dates, role) remain visible in the default state, and the detail is reachable by focus (not hover-only) and works with JavaScript disabled.

### Requirement: Anchorable timeline entries

Timeline entries SHOULD be individually addressable via anchor ids where interactions reference them, and any such anchors MUST resolve.

#### Scenario: Entry anchors resolve

- WHEN anchor hrefs referencing timeline entries are resolved against the built document
- THEN each referenced entry id exists in the built output.
