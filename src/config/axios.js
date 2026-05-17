import axios from 'axios'
import { API_BASE_URL } from './env'

/** For fetch() calls (e.g. multipart upload) that cannot use axios defaults. */
export function uploadAuthHeaders() {
  const token = localStorage.getItem('authToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/**
 * Axios instance for backend API. Base URL from env; auth token added per request.
 */
const coreAxios = axios.create({
  baseURL: API_BASE_URL.replace(/\/$/, ''),
  headers: { 'Content-Type': 'application/json' },
})

coreAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

coreAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    if (status === 401 && localStorage.getItem('authToken')) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userRole')
      const path = window.location.pathname || ''
      if (path.startsWith('/admin')) {
        window.location.replace('/')
      }
    }
    return Promise.reject(error)
  }
)

export { coreAxios }
