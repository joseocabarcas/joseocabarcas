# Header and Navigation Specification

## Purpose

A compact, accessible site header for the single-page player-profile portfolio: wordmark, anchor navigation to the six major sections, a visible contact action, and a mobile navigation that is fully operable.

## Requirements

### Requirement: Semantic header with wordmark and anchor navigation

The site MUST render a `header` landmark containing a brand/wordmark for José and a `nav` with links to the page anchors: Career Stats, Season Log, Attributes, Highlights, Game Log, and Draft Me. Each link MUST target an existing, in-document anchor id that corresponds to a real rendered section.

#### Scenario: All nav targets resolve

- GIVEN the built static HTML output in `dist/`
- WHEN each header navigation link's `href` is resolved against the same document
- THEN every `#anchor` target matches an element id that exists in the built page, and no link uses `href="#"`, `example.com`, or a dead placeholder.

#### Scenario: Semantic structure survives the build

- WHEN the built `dist/index.html` is inspected
- THEN the page contains exactly one `header` landmark, its navigation is inside a `nav` element, and `pnpm build` (astro check + astro build) passes.

### Requirement: Visible contact action in the header

The header MUST include a clearly visible contact action that either navigates to the Draft Me section anchor or links directly to `mailto:josecabarcas94@gmail.com`.

#### Scenario: Contact action is present and functional

- WHEN the header markup is inspected in the built output
- THEN a contact link or button exists whose href resolves to the Draft Me anchor or the confirmed email address, and its accessible name identifies the action (e.g., "Draft Me" or "Email").

### Requirement: Skip link

The page MUST include a skip-to-content link as the first focusable element, targeting the `main` landmark, and it MUST become visible when focused.

#### Scenario: Skip link is first and functional

- GIVEN the built page loaded in a browser
- WHEN the keyboard Tab key is pressed once
- THEN the skip link receives focus, becomes visible, and activating it moves focus to the main content area.

### Requirement: Operable mobile navigation

Mobile navigation (below the breakpoint where links are collapsed) MUST be operable with keyboard and touch. If a menu toggle control is rendered, it MUST have a working toggle handler that shows and hides the navigation; a dead or decorative menu button MUST NOT ship.

#### Scenario: No dead menu button

- WHEN the built page is reviewed at a narrow viewport (e.g., 360–767px)
- THEN the navigation links are either directly reachable, or a menu control exists whose activation reveals them; there is no visible menu control that does nothing.

#### Scenario: Keyboard operation

- GIVEN the mobile menu is collapsed
- WHEN the toggle is focused with the keyboard and activated
- THEN the menu opens, links inside are reachable by Tab, and the open/close state is understandable (including focus behavior when closing).

### Requirement: Visible focus states

All interactive header elements MUST have visible focus indicators that are not removed by the redesign (no `outline: none` without an equivalent replacement).

#### Scenario: Focus visible on all header controls

- WHEN each header link, toggle, and contact action is focused in turn via keyboard
- THEN a visually discernible focus indicator is present on each.
