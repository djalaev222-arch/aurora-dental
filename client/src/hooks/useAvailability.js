import { useEffect, useState } from 'react'
import { apiUrl } from '../lib/api.js'

export function useAvailability(doctorId, date) {
  const [slots, setSlots] = useState([])
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!doctorId || !date) {
      setSlots([])
      setStatus('idle')
      return undefined
    }

    const controller = new AbortController()
    setStatus('loading')

    const params = new URLSearchParams({ doctorId, date })

    fetch(apiUrl(`/availability?${params.toString()}`), { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('availability request failed')
        const contentType = res.headers.get('content-type') ?? ''
        if (!contentType.includes('application/json')) throw new Error('unexpected response')
        return res.json()
      })
      .then((data) => {
        setSlots(data.slots ?? [])
        setStatus('ready')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setSlots([])
        setStatus('error')
      })

    return () => controller.abort()
  }, [doctorId, date])

  return { slots, status }
}
