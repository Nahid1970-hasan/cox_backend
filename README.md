# Cox Solution API

Node.js (**Express**) + **MySQL** REST API — **backend only**. Frontend / admin SPA lives in a separate repo.

## Requirements

- **Node.js 18+**
- **MySQL** (local dev) or a **hosted MySQL** (PlanetScale-compatible, Railway, AWS RDS, etc.) for production

## Setup

```bash
npm install
cp .env.example .env
# Edit .env — especially MYSQL_* and JWT_SECRET
npm run dev
```

API listens on `http://127.0.0.1:8000` unless `PORT` is set.

## Endpoints overview

Routes are mounted with an `/api/...` prefix (see `src/routes/api.js`). Examples:

- `GET /` — short JSON pointing to health + login URLs (also wired on Vercel via `vercel.json`)
- `GET /api/ping` — health
- `POST /api/users/login/` — JWT login (`username`, `password` as JSON body)
- `GET /api/users/me/` — current user (requires `Authorization: Bearer <token>`)

## Vercel

- `api/index.js` runs the Express app as a Serverless Function.
- `vercel.json` sends `/api/*` and `/uploads/*` to that handler.

Configure in Vercel:

- **`PUBLIC_BASE_URL`** — e.g. `https://cox-backend.vercel.app` (your deployment URL)
- **`MYSQL_*`**, **`JWT_SECRET`**, **`FRONTEND_ORIGIN`** — see `.env.example`
- Hosted MySQL hostname must be reachable from Vercel (not `127.0.0.1`).

On first cold start (and locally), **`schema.sql`** is applied automatically and an admin seed user is created when the `users` table is empty (`SEED_ADMIN_*` in `.env`).

## Frontend (separate project)

Your React/Vercel SPA should point at this API via its own env (e.g. `VITE_API_BASE_URL=https://your-api.vercel.app`) — **that is not configured in this repository**.
