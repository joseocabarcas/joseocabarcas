# Game Log Specification

## Purpose

Project case studies presented as box-score-inspired cards with a consistent data shape — context, role, stack, and verified outcome or responsibility — using real project names and no placeholder URLs or invented metrics.

## Requirements

### Requirement: Five documented case studies

The Game Log section MUST present the five real projects from the context document:

1. **Monokera-Core** — shared services, components, utilities, and design system in a Turborepo/pnpm monorepo; libraries published/stored in JFrog.
2. **Mi Banco** — insurance management and sales platform; component/service reuse as the foundation for the core platform's first phase.
3. **Sales Builder** — Ruby on Rails microservice managing components for an assisted insurance-sales micro-frontend.
4. **Stories Feature** — native Kotlin Android module bridged into React Native/Expo for short videos/photos and product discovery.
5. **Mobile CI/CD pipeline** — Expo tooling and later EAS pipeline enabling OTA updates without full store resubmission.

#### Scenario: Case studies match the source

- WHEN each Game Log card is compared against the Projects section (and relevant role sections) of `Jose_Cabarcas_Portfolio_Context.md`
- THEN project names, stack claims, and role descriptions match the document, and all five projects are present.

### Requirement: Consistent card data shape

Every Game Log card MUST expose the same fields: context, role, stack, and outcome or responsibility. When the source does not support a metric for a project, the outcome field MUST state the documented responsibility instead, and a metric MUST NOT be invented.

#### Scenario: Uniform field structure

- WHEN the Game Log cards are inspected in the built output
- THEN each card renders the same labeled fields (context, role, stack, outcome/responsibility), and no card contains a numeric metric absent from the context document.

### Requirement: No placeholder links or fake demos

Game Log cards MUST NOT include placeholder URLs (`example.com`, `github.com/example`), fake GitHub links, or unsupported live demos. If no real link exists for a project, no link is rendered.

#### Scenario: Placeholder-free project links

- WHEN all hrefs inside the Game Log section of the built output are enumerated
- THEN none points to `example.com`, `github.com/example`, `#`, or any URL not confirmed in the context document or the confirmed contact links; cards without a real destination contain no anchor.

### Requirement: Box-score styling does not fabricate statistics

Box-score-inspired presentation MUST NOT attach fake game statistics (points, rebounds, invented scores) to projects. Any numeric-looking stat in a card MUST be a real, labeled fact from the context document.

#### Scenario: No fake box-score numbers

- WHEN numeric values in Game Log cards are audited
- THEN each is a real figure from the context document (e.g., performance deltas where documented) with an honest label, and no decorative invented statistics appear.
