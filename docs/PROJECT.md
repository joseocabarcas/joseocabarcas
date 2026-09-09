# Project docs — josecabarcas.dev

> Note: this repository's `README.md` is the public GitHub profile README, so project documentation lives here in `docs/PROJECT.md`.

Personal portfolio of **José Cabarcas** — Senior Software Engineer (frontend & mobile specialist, 11+ years), Barranquilla, Colombia.

**Live:** https://www.josecabarcas.dev

Built as a custom NBA player-profile experience: a compact player-card hero above the fold, then scroll sections styled like an athlete profile — Career Stats, Season Log (career timeline 2014→2026), Attributes (qualitative skill levels), Highlights, Game Log (project case studies), and Draft Me (contact).

## Stack

- **Astro 5** — `output: 'static'`, zero framework hydration
- **TypeScript** strict; typed content module (`src/data/profile.ts`) as the single source of professional claims
- **CSS custom properties** design system (dark stadium, one electric accent) in `src/styles/global.css`
- Progressive enhancement only (`src/scripts/site.ts`): accessible mobile menu + reduced-motion-gated reveals
- **Vercel** CDN deployment (Git integration; previews via CLI)

## Development

```sh
pnpm install
pnpm dev       # local dev server
pnpm build     # astro check && astro build — the mandatory verification gate
pnpm preview   # serve the production build locally
```

## Content discipline

Every professional claim on the site traces to the verified career context. Content lives exclusively in `src/data/profile.ts` — edit facts there, never in components. Historical metrics (e.g. Elenas 3M+ downloads / 200K+ DAU) are explicitly framed as historical context.

## Project history

This site was rebuilt from the Astro starter through a full Spec-Driven Development flow. The complete planning record — proposal, 13 domain specs, design, task breakdown, apply progress, and the envelope-validated verify report — lives under [`openspec/`](../openspec/), with the pre-rebuild state preserved at the `baseline-pre-nba-rebuild` git tag.
