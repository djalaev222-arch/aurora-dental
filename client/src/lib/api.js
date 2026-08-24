const API_BASE = import.meta.env.VITE_API_URL || '/api'

export function apiUrl(path) {
  return `${API_BASE}${path}`
}

export const hasConfiguredApi = Boolean(import.meta.env.VITE_API_URL) || import.meta.env.DEV
