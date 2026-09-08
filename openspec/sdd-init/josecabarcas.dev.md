# SDD Init — josecabarcas.dev

**Topic key:** `sdd-init/josecabarcas.dev` · **Type:** architecture · **Date:** 2026-09-08

## Project context

- **Project:** josecabarcas.dev — personal portfolio of José Cabarcas, Frontend Staff Engineer (11+ yrs; React, React Native, Next.js, TypeScript).
- **Stack:** Astro 5.8, TypeScript (strict preset), pnpm, deployed to Vercel via `@astrojs/vercel/serverless` with `output: 'server'`.
- **Structure:** Single-page site. `src/pages/index.astro` composed from components in `src/components/` (Header, Hero, About, Skills, Projects, CodeWindow, Contact, Footer, Section) with a shared `src/layouts/Layout.astro`. Static assets in `public/`.
- **Verification capability:** `pnpm build` runs `astro check && astro build` — type checking + build is the only automated gate. **No unit test runner is installed.**

## Session SDD preflight (resolved)

| Setting | Value |
| --- | --- |
| execution | auto |
| artifact store | openspec |
| delivery strategy | ask-on-risk |
| review budget | 400 |

## Conventions observed

- `type: module` package; scripts are plain Astro CLI commands.
- `tsconfig.json` extends `astro/tsconfigs/strict`; excludes `dist`.
- Commit/deploy flow targets Vercel (`.vercel/` present).

## Phase rules derived

1. `pnpm build` (astro check) is the mandatory pre-completion gate for every phase.
2. No unit tests for `.astro` components until a runner (e.g. Vitest) is installed — raise as a risk rather than writing unverified tests.
3. All SDD phase artifacts persist under `openspec/` keyed by their topic.

## Risks noted at init

- **No unit test runner:** strict TDD cannot be enforced; type-check + build + manual preview review (`pnpm preview`) is the fallback verification stack.
- **Parent brief vs. repo mismatch:** the injected facts say "static output," but `astro.config.mjs` declares `output: 'server'` with the serverless Vercel adapter. Config was written from the actual repo state; flag for confirmation if static output was intended.
