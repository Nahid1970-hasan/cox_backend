/**
 * Vercel Serverless Function — all /api/* and /uploads/* traffic is rewritten here (see vercel.json).
 */
import { createApp } from '../server/src/createApp.js'

/** Reuse Express instance across warm invocations. */
let appPromise

async function getApp() {
  if (!appPromise) appPromise = createApp()
  return appPromise
}

export default async function handler(req, res) {
  const app = await getApp()
  return app(req, res)
}
