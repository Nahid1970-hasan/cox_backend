# Cox's Web Solutions

A modern React + JavaScript landing page for an IT solutions company, built to match the design from your reference image.

## Tech stack

- **React 18** with **Vite**
- **JavaScript** (no TypeScript)
- **CSS** with custom properties for colors and spacing

## Design

- **Colors:** Dark blue (`#1f3e72`), teal (`#00c7b0`), coral accent (`#ff6b5b`), white and grays
- **Sections:** Hero, Services grid, About, Feature + stats, Pricing, Portfolio, Service features, CTA banner, Testimonials, Blog, Contact form, Footer
- **Responsive:** Layouts adapt for desktop, tablet, and mobile

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

Build output is in the `dist` folder.

## Connecting to the API (login + dashboards)

The app calls a **Node/MySQL API** (`server/`). Set the base URL in `.env`:

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
2. **Local:** point at your running API (default port is `8000`):
   ```
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```
3. **Production:** use your deployed backend (no trailing slash), e.g.:
   ```
   VITE_API_BASE_URL=https://cox-solution-api.vercel.app
   ```

On **Vercel** (frontend), add `VITE_API_BASE_URL=https://cox-solution-api.vercel.app` under Project → Settings → Environment Variables and rebuild.

On **Vercel** (backend API), set `PUBLIC_BASE_URL=https://cox-solution-api.vercel.app`, `JWT_SECRET`, MySQL vars, and `FRONTEND_ORIGIN` to your live admin URL (e.g. `https://cox-solution-admin.vercel.app`) — see `server/.env.example`.

Restart the dev server after changing `.env`.

Use `apiUrl('/api/...')` from `src/config/env.js` for any API path so it uses this base URL.

### Legacy note

Older docs referenced Django — this repo expects the Express API under `server/`.
