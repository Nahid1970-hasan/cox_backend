import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'
import { getMysqlPoolOptions } from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function prepareDatabase() {
  const { host, port, user, password, database } = getMysqlPoolOptions()
  const dbSafe = String(database || 'cox_solution').replace(/[^a-zA-Z0-9_]/g, '')
  if (!dbSafe) {
    throw new Error('MYSQL_DATABASE is invalid')
  }

  const admin = await mysql.createConnection({
    host,
    port,
    user,
    password,
    multipleStatements: true,
  })

  await admin.query(
    `CREATE DATABASE IF NOT EXISTS \`${dbSafe}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  )
  await admin.end()

  const conn = await mysql.createConnection({
    host,
    port,
    user,
    password,
    database: dbSafe,
    multipleStatements: true,
  })

  const schemaPath = path.join(__dirname, '..', 'schema.sql')
  if (!fs.existsSync(schemaPath)) {
    await conn.end()
    throw new Error(`Missing schema file: ${schemaPath}`)
  }

  let sql = fs.readFileSync(schemaPath, 'utf8')
  sql = sql.replace(/^\s*--[^\r\n]*$/gm, '')
  sql = sql.replace(/CREATE DATABASE\s+[^;]+;/gi, '')
  sql = sql.replace(/USE\s+[^;]+;/gi, '')
  sql = sql.trim()

  if (sql.length > 0) {
    await conn.query(sql)
  }
  await conn.end()

  console.info(`MySQL ready: database "${dbSafe}" (tables ensured from schema.sql)`)
}
