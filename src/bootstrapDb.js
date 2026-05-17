import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'
import { getMysqlPoolOptions } from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function findSchemaSqlPath() {
  const roots = [
    path.join(__dirname, '..'), // repo root (local)
    process.cwd(),
    path.join(process.cwd(), '..'),
  ]
  const seen = new Set()
  for (const root of roots) {
    const p = path.join(root, 'schema.sql')
    if (seen.has(p)) continue
    seen.add(p)
    if (fs.existsSync(p)) return p
  }
  return null
}

/**
 * Ensure database + tables exist. On Vercel, skip CREATE DATABASE (managed DBs disallow it).
 * Set SKIP_DB_BOOTSTRAP=true to skip entirely (tables must already exist).
 */
export async function prepareDatabase() {
  if (process.env.SKIP_DB_BOOTSTRAP === 'true') {
    console.info('SKIP_DB_BOOTSTRAP: skipping schema sync')
    return
  }

  const { host, port, user, password, database } = getMysqlPoolOptions()
  const dbSafe = String(database || 'cox_solution').replace(/[^a-zA-Z0-9_]/g, '')
  if (!dbSafe) {
    throw new Error('MYSQL_DATABASE is invalid')
  }

  const onVercel = process.env.VERCEL === '1'

  if (
    onVercel &&
    (host === '127.0.0.1' || host === 'localhost' || !host)
  ) {
    throw new Error(
      'On Vercel, MYSQL_HOST must be your cloud database hostname (not localhost/127.0.0.1). Set MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, and MYSQL_SSL=1 if required.'
    )
  }

  const ssl =
    process.env.MYSQL_SSL === '1' || process.env.MYSQL_SSL === 'true'
      ? { rejectUnauthorized: false }
      : undefined

  if (!onVercel) {
    const admin = await mysql.createConnection({
      host,
      port,
      user,
      password,
      multipleStatements: true,
      ssl,
    })

    await admin.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbSafe}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    )
    await admin.end()
  }

  const conn = await mysql.createConnection({
    host,
    port,
    user,
    password,
    database: dbSafe,
    multipleStatements: true,
    ssl,
  })

  const schemaPath = findSchemaSqlPath()
  if (!schemaPath) {
    await conn.end()
    const hint =
      onVercel
        ? 'Bundle schema.sql (see vercel.json includeFiles) or set SKIP_DB_BOOTSTRAP=true if DB is pre-migrated.'
        : 'Place schema.sql at project root.'
    throw new Error(`Missing schema.sql. ${hint}`)
  }

  let sql = fs.readFileSync(schemaPath, 'utf8')
  sql = sql.replace(/^\s*--[^\r\n]*$/gm, '')
  sql = sql.replace(/CREATE DATABASE\s+[^;]+;/gi, '')
  sql = sql.replace(/USE\s+[^;]+;/gi, '')
  sql = sql.trim()

  if (sql.length > 0) {
    try {
      await conn.query(sql)
    } catch (e) {
      await conn.end()
      if (e.code === 'ER_ACCESS_DENIED_ERROR' || e.code === 'ECONNREFUSED') {
        throw new Error(
          `MySQL connection failed (${e.code}). On Vercel set MYSQL_HOST to a public host (not 127.0.0.1), correct user/password, and MYSQL_SSL=1 if your provider requires SSL.`
        )
      }
      throw e
    }
  }
  await conn.end()

  console.info(`MySQL ready: database "${dbSafe}" (tables ensured from schema.sql)`)
}
