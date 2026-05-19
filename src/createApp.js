import 'dotenv/config'
import fs from 'fs'
import express from 'express'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import { createPool } from './db.js'
import { prepareDatabase } from './bootstrapDb.js'
import { stripTrailingSlash } from './middleware/stripTrailingSlash.js'
import { createApiRouter, createUploadRoot } from './routes/api.js'

async function seedAdminIfEmpty(pool) {
  const [[row]] = await pool.execute('SELECT COUNT(*) AS n FROM users')
  if (row.n > 0) return
  const pwd = process.env.SEED_ADMIN_PASSWORD || 'admin123'
  const hash = await bcrypt.hash(pwd, 10)
  const username = process.env.SEED_ADMIN_USERNAME || 'admin'
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  await pool.execute(
    `INSERT INTO users (username, email, password_hash, name, role, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [username, email, hash, 'Administrator', 'superadmin', 'active']
  )
  console.info(
    `Seeded admin: username="${username}", email="${email}" (password from SEED_ADMIN_PASSWORD)`
  )
}

/** Single Express instance for local server + Vercel serverless + Render Node web service. */
export async function createApp() {
  await prepareDatabase()
  const pool = createPool()
  await seedAdminIfEmpty(pool)

  const uploadRoot = createUploadRoot()
  fs.mkdirSync(uploadRoot, { recursive: true })

  const app = express()

  app.disable('x-powered-by')
  app.use(stripTrailingSlash)

  const defaultDevOrigins = ['http://127.0.0.1:5173', 'http://localhost:5173']
  const envOrigins = (process.env.FRONTEND_ORIGIN || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const allowedOrigins = [...new Set([...defaultDevOrigins, ...envOrigins])]

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) return callback(null, true)
        if (allowedOrigins.includes(origin)) return callback(null, true)
        callback(null, false)
      },
      credentials: true,
    })
  )

  app.use(express.json({ limit: '2mb' }))
  app.use('/uploads', express.static(uploadRoot))

  app.get('/', (_req, res) => {
    res.json({
      ok: true,
      service: 'cox-solution-api',
      ping: '/api/ping',
      login: '/api/users/login/',
    })
  })

  app.use(createApiRouter(pool))

  app.use((err, _req, res, _next) => {
    console.error(err)
    if (res.headersSent) return
    res.status(500).json({ detail: err.message || 'Server error.' })
  })

  return app
}
