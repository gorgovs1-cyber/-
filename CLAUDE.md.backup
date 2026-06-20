# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server → http://localhost:3000 (Hebrew RTL finance app)
npm run build        # production build → dist/
npm run preview      # serve production build locally
npx gh-pages -d dist -b gh-pages   # deploy to GitHub Pages
```

## Architecture

Single-page React + Vite personal finance app in Hebrew (RTL). No router — tab navigation is pure React state in `App.jsx`. All data persists in **localStorage** under two keys: `pf_transactions` and `pf_goals`.

**State lives in `App.jsx`** and flows down as props. No context, no external state library. The four views (`Dashboard`, `Transactions`, `Summary`, `Goals`) are swapped by `activeTab` state.

### Data model

```js
// Transaction
{ id, type: 'income'|'expense', amount: number, category: string, description: string, date: 'YYYY-MM-DD' }

// Goal
{ id, name, icon, target: number, saved: number, color: string, deadline: 'YYYY-MM-DD' }
```

### Key files

| File | Role |
|------|------|
| `src/constants.js` | Category definitions, `fmt()`, `byMonth()`, date helpers |
| `src/index.css` | Full design system via CSS custom properties (`--gold`, `--rose`, `--mint`, etc.) |
| `src/App.jsx` | Root state, localStorage persistence, view routing |
| `src/components/Dashboard.jsx` | Home: balance card, category spending, recent transactions |
| `src/components/AddTransaction.jsx` | Bottom-sheet modal for adding income/expense |
| `src/components/Transactions.jsx` | Filterable, searchable transaction list |
| `src/components/Summary.jsx` | Monthly summary with Doughnut + Bar charts (Chart.js) |
| `src/components/Goals.jsx` | Savings goals with progress and "add savings" inline flow |

### Design tokens (CSS custom properties)

Primary colour scale: `--gold` / `--gold-dk` / `--gold-lt`. Semantic colours: `--rose` (expense/negative), `--mint` (income/positive). All spacing and radii use `--r-s` / `--r` / `--r-l` / `--r-xl`. Safe-area insets for iPhone notch/home-bar via `--safe-top` / `--safe-bottom`.

### Charts

`Summary.jsx` registers Chart.js elements once at module level (`ChartJS.register(...)`). Adding a new chart type requires importing and registering its element (e.g. `LineElement`) there.

### Deployment

The `gh-pages` branch is the live deployment target. After building, run:
```bash
npx gh-pages -d dist -b gh-pages
```
GitHub Pages must be enabled in repo Settings → Pages → Source: `gh-pages` branch / `(root)`.
Live URL: `https://gorgovs1-cyber.github.io/-/`
