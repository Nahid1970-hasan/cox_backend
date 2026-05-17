import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import { createPool } from './db.js'
import { prepareDatabase } from './bootstrapDb.js'
import { stripTrailingSlash } from './middleware/stripTrailingSlash.js'
import { createApiRouter } from './routes/api.js'

const uploadRoot = path.join(process.cwd(), 'uploads')
fs.mkdirSync(uploadRoot, { recursive: true })

const app = express()
const port = parseInt(process.env.PORT || '8000', 10)

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
  console.info(`Seeded admin: username="${username}", email="${email}" (password from SEED_ADMIN_PASSWORD)`)
}

try {
  await prepareDatabase()
  const pool = createPool()
  await seedAdminIfEmpty(pool)
  app.use(createApiRouter(pool))
  app.listen(port, () => {
    console.info(`API listening on http://127.0.0.1:${port}`)
  })
} catch (e) {
  if (e.code === 'ECONNREFUSED') {
    console.error(
      'Cannot connect to MySQL. Start the MySQL service and check MYSQL_HOST / MYSQL_PORT in server/.env'
    )
  } else if (e.code === 'ER_ACCESS_DENIED_ERROR') {
    console.error(
      'MySQL access denied. Fix MYSQL_USER and MYSQL_PASSWORD in server/.env'
    )
  } else {
    console.error(e.message || e)
  }
  process.exit(1)
}
