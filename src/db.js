import mysql from 'mysql2/promise'

/** Shared connection settings (also used before DB exists). */
export function getMysqlPoolOptions() {
  const port = parseInt(process.env.MYSQL_PORT || '3306', 10)
  return {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD ?? '',
    database: process.env.MYSQL_DATABASE || 'cox_solution',
  }
}

function mysqlSslOption() {
  if (process.env.MYSQL_SSL === '1' || process.env.MYSQL_SSL === 'true') {
    return { rejectUnauthorized: false }
  }
  return undefined
}

export function createPool() {
  const opts = getMysqlPoolOptions()
  return mysql.createPool({
    host: opts.host,
    port: opts.port,
    user: opts.user,
    password: opts.password,
    database: opts.database,
    waitForConnections: true,
    connectionLimit: 10,
    ssl: mysqlSslOption(),
  })
}
