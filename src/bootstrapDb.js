import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'
import { getMysqlPoolOptions, getMysqlSsl } from './db.js'

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

function isHostedPlatformDeploy() {
  return (
    process.env.VERCEL === '1' ||
    process.env.RENDER === 'true' ||
    process.env.RENDER === '1'
  )
}

/**
 * Ensure database + tables exist.
 * On Vercel / Render, skip CREATE DATABASE (managed DBs usually disallow creating DBs).
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
    throw new Error('MYSQL_DATABASE / database name in DATABASE_URL is invalid')
  }

  const hostedDeploy = isHostedPlatformDeploy()

  if (
    hostedDeploy &&
    (host === '127.0.0.1' || host === 'localhost' || !host)
  ) {
    throw new Error(
      'On Vercel/Render use a cloud database (not localhost). Set DATABASE_URL or MYSQL_HOST to your provider hostname. Example: DATABASE_URL=mysql://user:pass@db.example.com:3306/mydb'
    )
  }

  const ssl = getMysqlSsl()

  if (!hostedDeploy) {
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

  let conn
  try {
    conn = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database: dbSafe,
      multipleStatements: true,
      ssl,
    })
  } catch (e) {
    const extra =
      e.code === 'ECONNREFUSED'
        ? ' Connection refused — check MYSQL_HOST/MYSQL_PORT and that the DB allows inbound from the internet.'
        : e.code === 'ER_ACCESS_DENIED_ERROR'
          ? ' Access denied — wrong MYSQL_USER/MYSQL_PASSWORD or user not allowed from this IP.'
          : e.code === 'ENOTFOUND'
            ? ' Host not found — check MYSQL_HOST / DATABASE_URL hostname.'
            : e.code === 'WRONG_VERSION' || String(e.message || '').includes('SSL')
              ? ' Try MYSQL_SSL=1 or MYSQL_SSL=0 (hosted deploys enable TLS unless MYSQL_SSL=0).'
              : ''
    throw new Error(`${e.message || e.code || 'MySQL connect failed'}${extra}`)
  }

  const schemaPath = findSchemaSqlPath()
  if (!schemaPath) {
    await conn.end()
    const hint = hostedDeploy
      ? 'Include schema.sql in the deploy artifact (e.g. Vercel includeFiles) or set SKIP_DB_BOOTSTRAP=true if tables already exist.'
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
      throw new Error(
        `schema.sql failed: ${e.message || e.code}. If tables already exist, set SKIP_DB_BOOTSTRAP=true.`
      )
    }
  }
  await conn.end()

  console.info(`MySQL ready: database "${dbSafe}" (tables ensured from schema.sql)`)
}
