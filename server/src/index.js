import { createApp } from './createApp.js'

const port = parseInt(process.env.PORT || '8000', 10)

try {
  const app = await createApp()
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
