import http from 'http'
import { createApp } from './createApp.js'

const preferredPort = parseInt(process.env.PORT || '8000', 10)
const maxAttempts = 10

try {
  const app = await createApp()
  const server = http.createServer(app)

  const tryListen = (p, attemptNum) => {
    if (attemptNum > maxAttempts) {
      console.error(
        `No free port between ${preferredPort} and ${preferredPort + maxAttempts - 1}. Stop other listeners or set PORT in .env.`
      )
      process.exit(1)
    }

    const onErr = (err) => {
      server.removeListener('error', onErr)
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${p} busy, trying ${p + 1}…`)
        server.close(() => tryListen(p + 1, attemptNum + 1))
      } else {
        console.error(err)
        process.exit(1)
      }
    }

    server.once('error', onErr)
    server.listen(p, '127.0.0.1', () => {
      server.removeListener('error', onErr)
      console.info(`API listening on http://127.0.0.1:${p}`)
    })
  }

  tryListen(preferredPort, 1)
} catch (e) {
  if (e.code === 'ECONNREFUSED') {
    console.error(
      'Cannot connect to MySQL. Start the MySQL service and check MYSQL_HOST / MYSQL_PORT in .env'
    )
  } else if (e.code === 'ER_ACCESS_DENIED_ERROR') {
    console.error(
      'MySQL access denied. Fix MYSQL_USER and MYSQL_PASSWORD in .env'
    )
  } else {
    console.error(e.message || e)
  }
  process.exit(1)
}
