# Highlights Specification

## Purpose

Career achievement cards with concise moment / challenge / result framing, scoped strictly to the context document — no ownership overstatement and no merged achievements.

## Requirements

### Requirement: Highlight set covers the documented achievements

The Highlights section MUST present the achievements documented in the context document, including: the App Store/Google compliance rescue (outdated Segment SDK and Google Play Services deadline); the Expo Classic Updates → EAS pipeline and OTA release workflow; the Expo 47 → Expo 51 migration under breaking changes; the Clean Architecture mobile redesign (data/domain/presentation separation); the CRA v3 → Vite internal dashboard migration; the Ruby on Rails Sales Builder microservice built for a concrete product need; the performance work achieving startup 24s → 7s and checkout 14s → 5s; and SDD/AI-assisted development as a current working method (define criteria, generate a first pass, validate layer by layer, describe failures precisely for correction).

#### Scenario: Each highlight traces to the source

- WHEN each highlight card's claim set is compared against `Jose_Cabarcas_Portfolio_Context.md`
- THEN each card's moment, challenge, and result are supported by the corresponding context section, including the exact performance figures where cited.

#### Scenario: SDD presented as a working method, not buzzwords

- WHEN the SDD/AI-assisted development highlight is inspected
- THEN it describes the actual workflow (acceptance criteria first, AI-generated first pass, layer-by-layer validation, precise failure description) and avoids generic AI marketing language and unsupported claims about outcomes attributable to AI.

### Requirement: Scoped ownership and outcome claims

Highlight cards MUST NOT imply ownership beyond the context document and MUST NOT combine separate achievements into a single unsupported claim. Where the document attributes work to a role or team context, the card wording MUST preserve that scope.

#### Scenario: No merged or inflated claims

- WHEN highlight cards are audited against the context document
- THEN no card attributes to José alone an outcome the document describes as team or shared work, and no card fuses two distinct achievements into one claim (e.g., the store-compliance rescue and the EAS pipeline remain distinct).

### Requirement: Moment / challenge / result framing

Each highlight card MUST present its achievement with a concise structure that identifies the situation/challenge and the result, so a scanning reader understands what was at stake and what changed.

#### Scenario: Scannable framing

- WHEN a highlight card is read
- THEN its structure distinguishes the challenge from the result without requiring the reader to open other sections, and omitted metrics are simply absent rather than approximated.
