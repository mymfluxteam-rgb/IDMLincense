# SoftStore

A clean, static software download and licensing platform for IDM and WinRAR. Features IP-based auto language/currency switching (English ↔ Burmese, USD ↔ MMK) with manual override. Fully deployable to GitHub Pages.

## Run & Operate (Replit)

- `pnpm --filter @workspace/software-store run dev` — run the frontend (port from $PORT)
- `pnpm run typecheck` — full typecheck across all packages

## Deploy to GitHub Pages

### One-time setup

1. Create a GitHub repository (e.g. `software-store`)
2. In **Settings → Pages**, set **Source** to `gh-pages` branch, `/ (root)` folder

### Build and push

```bash
# Inside the Replit shell — run from the workspace root

# Build the static site (replace "software-store" with your actual repo name)
cd artifacts/software-store
GITHUB_REPO_NAME=software-store pnpm run build:github

# The output is in artifacts/software-store/dist-github/
# Push it to the gh-pages branch of your repo:
cd dist-github
git init
git add .
git commit -m "deploy"
git remote add origin https://github.com/YOUR_USERNAME/software-store.git
git push --force origin HEAD:gh-pages
```

Your site will be live at `https://YOUR_USERNAME.github.io/software-store/`

### Notes
- **User/Org pages** (e.g. `username.github.io`): leave `GITHUB_REPO_NAME` empty — the base will be `/`
- **Hash routing** is enabled automatically in the GitHub build so all nav links work on a static host
- **Language/currency** preferences are saved in `localStorage` — no backend needed
- The Vite config used for GitHub Pages is `artifacts/software-store/vite.github.config.ts` (separate from the Replit dev config)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
