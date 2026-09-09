# Draft Me Specification

## Purpose

A final contact call-to-action using only the three confirmed links, functional without JavaScript, with accessible link names and an obvious next action.

## Requirements

### Requirement: Confirmed links only

The Draft Me section MUST expose exactly the confirmed contact destinations from the context document:

- GitHub: `https://github.com/joseocabarcas`
- LinkedIn: `https://linkedin.com/in/jose-cabarcas`
- Email: `mailto:josecabarcas94@gmail.com`

No other social destination (YouTube, Twitch, or any unverified service) MAY appear anywhere on the page.

#### Scenario: Correct link targets

- WHEN the hrefs in the Draft Me section of the built output are enumerated
- THEN they are exactly the three confirmed URLs above (in any order or presentation), spelled exactly, including the `joseocabarcas` GitHub handle and the `jose-cabarcas` LinkedIn slug.

#### Scenario: No unverified social links anywhere

- WHEN all external links across the entire built page are enumerated
- THEN no YouTube, Twitch, or other social URL appears outside the three confirmed destinations.

### Requirement: Works without JavaScript

The Draft Me section MUST be fully functional with JavaScript disabled: the mailto action and external links must be plain anchors, and the section's content and calls to action must be present in the static HTML.

#### Scenario: Static HTML contains the contact path

- WHEN `dist/index.html` is inspected with JavaScript disabled in a browser
- THEN the Draft Me section renders and its email and profile links are clickable plain anchors.

### Requirement: Obvious next action and accessible names

The section MUST make the primary next action (email José) visually obvious, and every link MUST expose a useful accessible name (e.g., "Email José Cabarcas", "GitHub profile") rather than a bare icon or URL.

#### Scenario: Accessible link names

- WHEN the Draft Me links are inspected for their accessible names (text or aria-label)
- THEN each has a descriptive name, and icon-only links carry an aria-label or equivalent.

### Requirement: No contact form

The first slice MUST NOT include a contact form; the mailto action is the contact mechanism.

#### Scenario: No form elements in the section

- WHEN the Draft Me markup is inspected
- THEN no `form`, input, or submission handler exists; the section consists of anchors and copy.
