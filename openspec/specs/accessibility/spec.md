# Accessibility Specification

## Purpose

The rebuilt page is usable with keyboard, touch, and assistive technology: semantic landmarks, logical headings, visible focus, text-based meaning, reduced-motion support, and responsive layouts without hidden essentials or horizontal overflow.

## Requirements

### Requirement: Semantic landmarks and heading hierarchy

The page MUST use semantic landmarks (`header`, `nav`, `main`, `footer`) with meaningful `section` headings, a logical heading hierarchy (one `h1`, descending order without skipped levels), and useful anchor targets.

#### Scenario: Landmarks in built output

- WHEN `dist/index.html` is inspected
- THEN `header`, `nav`, `main`, and `footer` landmarks are present, exactly one `h1` exists (the page identity), and heading levels descend without skips.

#### Scenario: Sections have accessible names

- WHEN each major `section` is inspected
- THEN each Career Stats / Season Log / Attributes / Highlights / Game Log / Draft Me section has a heading that names it, matching the terms used in navigation.

### Requirement: Keyboard reachability, focus, and accessible names

All interactive elements MUST be keyboard reachable, have visible focus styles, and expose useful accessible names. No interactive element may depend on pointer-only activation.

#### Scenario: Keyboard pass

- GIVEN the built page in a browser
- WHEN every interactive element is traversed with Tab/Shift+Tab and activated with Enter/Space
- THEN each is reachable and operable, and each shows a visible focus indicator.

### Requirement: Descriptive headshot alt text; decorative visuals non-semantic

The headshot MUST have descriptive alt text (e.g., a professional portrait description, not empty and not keyword stuffing). Decorative textures and visuals MUST use empty `alt` or be rendered via CSS so they are ignored by assistive technology.

#### Scenario: Alt audit

- WHEN the `img` elements of the built page are enumerated
- THEN the headshot has a concise descriptive `alt`, every content image has meaningful `alt`, and every decorative image has `alt=""` or is a CSS background.

### Requirement: Meaning not carried by color, hover, motion, or metaphor alone

The page MUST NOT rely on color, hover, motion, or the basketball metaphor alone to communicate meaning. Attribute levels, timeline states, and stat meanings MUST be written as text.

#### Scenario: Grayscale comprehension check

- WHEN the page is viewed in grayscale during manual review
- THEN attribute levels, section identity, navigation state, and contact actions remain understandable from text and structure alone.

### Requirement: Reduced-motion support

The page MUST honor `prefers-reduced-motion: reduce`: smooth scrolling and nonessential transitions/reveals MUST be disabled, and anchor navigation MUST remain usable when smooth scrolling is off. Content comprehension MUST NOT depend on animation.

#### Scenario: Reduced-motion manual review

- GIVEN the OS/browser reduced-motion setting enabled
- WHEN the page is loaded and navigated via header anchors
- THEN nonessential animation and reveals are suppressed, anchor jumps still navigate to the correct sections, and no content is hidden behind an animation that never plays.

### Requirement: Responsive layouts without hidden essentials or overflow

Responsive layouts MUST NOT hide essential stats or contact actions at narrow widths and MUST NOT cause horizontal scrolling at common mobile widths.

#### Scenario: Narrow-viewport manual review

- GIVEN the built page viewed at 320–400px width
- WHEN the page is scrolled through all sections
- THEN no horizontal scrollbar/overflow occurs, and the key stats, navigation path, and contact actions remain visible or reachable (e.g., via the mobile menu) rather than clipped or hidden.
