# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:3000)
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Architecture

Single-page React + Vite analytics dashboard. No routing library — the sidebar nav is local state only (`activeNav` in `App.jsx`). All data is static mock data defined at the top of `App.jsx`; no API calls.

**Chart rendering** uses `react-chartjs-2` (wrapper around Chart.js). All four chart types (Line, Bar, Doughnut) share one `ChartJS.register(...)` call at the top of `App.jsx`. Chart options objects (`CHART_OPTS`, `DONUT_OPTS`) are module-level constants — edit them there to change axes, legend, or grid styling globally.

**Styling** is plain CSS in `src/index.css` using CSS custom properties (`--bg`, `--surface`, `--purple`, etc.). No CSS framework. Layout is sidebar-fixed + scrollable main content area.

**Data** — to swap in real data, replace the `TRAFFIC_DATA`, `REVENUE_DATA`, `DONUT_DATA`, `PAGES`, and `SOURCES` constants in `App.jsx`. The shapes match Chart.js dataset format directly.
