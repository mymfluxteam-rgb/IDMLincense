# Software Store

A React + Vite software store web app with an Express API server backend.

## Stack

- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui, Wouter (routing), TanStack Query
- **Backend**: Express (TypeScript), Drizzle ORM
- **Monorepo**: pnpm workspaces

## Artifacts

- `artifacts/software-store` — Frontend web app (Home, Pricing, Order License, How to Purchase, Contact)
- `artifacts/api-server` — Express API server (routes under `/api`)

## Running the app

The **Software Store** workflow starts the frontend dev server:

```
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/software-store run dev
```

To start the API server separately, run:

```
pnpm --filter @workspace/api-server run dev
```

## User preferences

<!-- Add user preferences here -->
