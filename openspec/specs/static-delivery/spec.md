# Static Delivery Specification

## Purpose

Ship the portfolio as prebuilt static HTML served through Vercel's CDN: `output: 'static'`, no serverless adapter, generated output free of render functions, with deployment artifact hygiene.

## Requirements

### Requirement: Static output configuration

`astro.config.mjs` MUST set `output: 'static'` and MUST NOT import or configure `@astrojs/vercel/serverless` or any other runtime adapter.

#### Scenario: Config inspected

- WHEN `astro.config.mjs` is read
- THEN it configures `output: 'static'` and contains no adapter import or `adapter` property.

#### Scenario: Build produces static output with no render function

- WHEN `pnpm build` runs
- THEN the command completes successfully (`astro check` and `astro build` both pass), `dist/` contains the prebuilt HTML for the page, and no serverless render function (e.g., `_render.func` or equivalent) is generated for page delivery.

### Requirement: Serverless adapter dependency removed

The `@astrojs/vercel` adapter dependency MUST be removed from `package.json` if no remaining package uses it, and `pnpm-lock.yaml` MUST be refreshed accordingly. Vercel remains the deployment platform serving the static `dist/` output through its CDN via the existing CLI/project integration.

#### Scenario: Dependency audit after removal

- WHEN `package.json` and `pnpm-lock.yaml` are inspected after the change
- THEN `@astrojs/vercel` is absent from dependencies (or its retention is justified by a remaining use), the lockfile reflects the removal, and `pnpm build` still passes.

#### Scenario: No gratuitous vercel.json

- WHEN the repository root is inspected
- THEN no `vercel.json` was added unless the actual deployment demonstrably required an explicit build/output override; the default Astro static output is used.

### Requirement: Deployment artifact hygiene

`.vercel/` MUST be added to `.gitignore` so generated deployment artifacts stay out of source control, while any project-link metadata needed for CLI deployment (e.g., `.vercel/project.json`) is deliberately preserved locally if the deployment path requires it.

#### Scenario: .vercel ignored but deployable

- WHEN `.gitignore` and the working tree are inspected
- THEN `.vercel/` is ignored by git, no stale `.vercel/output/` serverless artifacts are committed, and the CLI deployment path still functions (verified by a Vercel preview/deployment before release).

### Requirement: Rollback baseline verified before destructive replacement

Before replacing `src/`, the implementation MUST verify the existing git state (working tree cleanliness and history) and confirm the `baseline-pre-nba-rebuild` tag/rollback point exists and is a real, safe restore state, rather than assuming it.

#### Scenario: Baseline confirmed before source replacement

- WHEN the implementation phase begins destructive work
- THEN `git status` and `git log` have been run, any uncommitted state is committed, and the `baseline-pre-nba-rebuild` tag points to a recoverable pre-rebuild commit (or the discrepancy is escalated per the ask-on-risk delivery strategy).
