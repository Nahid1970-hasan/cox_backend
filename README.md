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

Locally the API listens on `http://127.0.0.1:8000` unless `PORT` is set. On **Render**, `RENDER=true` is injected and the server binds **`0.0.0.0`** on `PORT` (required for routing). Override with **`LISTEN_HOST`** if needed.

## Endpoints overview

Routes are mounted with an `/api/...` prefix (see `src/routes/api.js`). Examples:

- `GET /` — short JSON pointing to health + login URLs (also wired on Vercel via `vercel.json`)
- `GET /api/ping` — health
- `POST /api/users/login/` — JWT login (`username`, `password` as JSON body)
- `GET /api/users/me/` — current user (requires `Authorization: Bearer <token>`)

## Vercel

- `api/index.js` runs the Express app as a Serverless Function (with a try/catch so startup failures return **503 JSON** instead of crashing the function).
- `vercel.json` rewrites `/`, `/api/*`, and `/uploads/*` to that handler.
- **`schema.sql`** is bundled with the function via `includeFiles` so table creation can run on cold start.

Configure in Vercel (Project → Settings → Environment Variables):

| Variable | Notes |
|----------|--------|
| `MYSQL_HOST` | **Required** — hostname of a **public** MySQL (never `127.0.0.1` / `localhost` on Vercel) |
| `MYSQL_PORT` | Usually `3306` |
| `MYSQL_USER` | |
| `MYSQL_PASSWORD` | |
| `MYSQL_DATABASE` | Existing database name (**`CREATE DATABASE` is skipped on Vercel / Render**) |
| `MYSQL_SSL` | Usually leave unset hosted (TLS defaults on); set **`1`/`0`** explicitly if needed |
| `JWT_SECRET` | Long random string |
| `PUBLIC_BASE_URL` | e.g. `https://cox-backend.vercel.app` (no trailing slash) |
| `FRONTEND_ORIGIN` | Your admin SPA origin(s), comma-separated |

Optional:

| Variable | Meaning |
|----------|--------|
| `SKIP_DB_BOOTSTRAP=true` | Do not run `schema.sql` on startup (tables must already exist). |
| `API_DEBUG_ERRORS=1` | Return real error messages in the 503 body (debug only). |
| `LISTEN_HOST` | Bind address (Docker / custom); Render uses **`0.0.0.0`** automatically when `RENDER=true`. |

On first boot (unless `SKIP_DB_BOOTSTRAP=true`), **`schema.sql`** is applied and an admin is seeded when `users` is empty (`SEED_ADMIN_*`).

## Render

- Optional **`render.yaml`** blueprint (`npm install` → `npm start`, health **`/api/ping`**).
- Use **hosted MySQL** — prefer **`DATABASE_URL`**. Database must already exist (no `CREATE DATABASE` on Render, same pattern as Vercel).
- Set **`JWT_SECRET`**, **`PUBLIC_BASE_URL`** (`https://your-service.onrender.com`), **`FRONTEND_ORIGIN`** (your SPA).
- **`RENDER=true`** enables **MySQL TLS** by default; use **`MYSQL_SSL=0`** only if your provider has no TLS.
- Same optional env as above (`SKIP_DB_BOOTSTRAP`, `API_DEBUG_ERRORS`, `LISTEN_HOST`).

## Frontend (separate project)

Point your SPA at this API (`VITE_API_BASE_URL=https://your-api.vercel.app` or your Render URL) — **configured only in the frontend repo**.
