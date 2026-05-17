/**
 * Vercel Serverless — see vercel.json rewrites.
 * Never throw uncaught: return JSON so the dashboard shows a message instead of a blank 500.
 */
import { createApp } from '../src/createApp.js'

let appPromise

async function getApp() {
  if (!appPromise) {
    appPromise = createApp().catch((err) => {
      appPromise = null
      throw err
    })
  }
  return appPromise
}

export default async function handler(req, res) {
  try {
    const app = await getApp()
    return app(req, res)
  } catch (err) {
    console.error('[api] createApp failed:', err)
    const safe =
      process.env.VERCEL_ENV === 'production' && !process.env.API_DEBUG_ERRORS
        ? 'Server failed to start. Check Vercel logs and MySQL env vars (MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_SSL).'
        : err.message || String(err)
    if (!res.headersSent) {
      return res.status(503).json({
        detail: safe,
        code: err.code || undefined,
        hint:
          'Use a hosted MySQL (PlanetScale, Railway, Aiven). On Vercel, MYSQL_HOST cannot be 127.0.0.1. Try MYSQL_SSL=1.',
      })
    }
  }
}
