# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/resume website for Hector Luis Alamo — a single-page React application showcasing professional experience, projects, skills, and credentials.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build (outputs to `dist/`)
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint

No test framework is configured.

## Architecture

This is a minimal static SPA with no routing, no API calls, and no database.

**Single-file design:** The entire application lives in `src/App.jsx` (~366 lines). It contains:
- Color constants and a themed palette (lines 3-10)
- Static data arrays: `skills`, `projects`, `experience`, `education` (lines 12-149)
- A custom `useInView()` hook using Intersection Observer for scroll-triggered animations
- Small presentational components: `FadeIn`, `Pill`, `StatBadge`, `ProjectCard`, `NavDot`, `SL`, `ST`
- The main `Resume` component with six sections: Hero, Skills, Projects, Experience, Education, Contact

**Styling:** 100% inline React style objects — no CSS classes, no CSS-in-JS library. Color values are defined as constants at the top of `App.jsx`. Global styles in `index.css` are minimal (smooth scroll, base resets). `App.css` is vestigial from the Vite template and unused.

**Fonts:** Google Fonts (DM Sans, Space Grotesk, JetBrains Mono) loaded via `<link>` tags in both `index.html` and dynamically in the Resume component.

**Responsiveness:** `clamp()` for fluid typography, CSS Grid/Flexbox for layout, side navigation hidden at ≤768px via media query.

## Tech Stack

- React 19 + Vite 7 (JavaScript/JSX, no TypeScript)
- ESLint 9 flat config with react-hooks and react-refresh plugins
- No external UI libraries, animation libraries, or state management
