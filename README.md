# Quiet Psychology

Premium behavioral intelligence publishing platform.

## Structure

- `frontend/` — React + TypeScript + Vite + TailwindCSS customer and admin experience
- `backend/` — Hono + TypeScript + SQLite REST API
- `database/` — SQL schema and seed data
- `packages/types/` — Shared TypeScript types

## Quick Start

```bash
npm install
npm run db:init
npm run db:seed
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:3001`.

## Environment

Copy `.env.example` to `.env` in `backend/` and `frontend/` and configure values.

## Production

```bash
npm run build
npm start
```
