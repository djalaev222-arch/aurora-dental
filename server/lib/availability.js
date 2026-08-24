const DOCTOR_IDS = ['sokolova', 'beketov', 'litvinova', 'ogarkov']

function hashSeed(str) {
  let hash = 0
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function isWeekend(dateStr) {
  const day = new Date(`${dateStr}T00:00:00`).getUTCDay()
  return day === 0 || day === 6
}

function buildDaySlots(dateStr) {
  const weekend = isWeekend(dateStr)
  const startHour = weekend ? 10 : 9
  const endHour = weekend ? 18 : 21
  const slots = []
  for (let hour = startHour; hour < endHour; hour += 1) {
    slots.push(`${String(hour).padStart(2, '0')}:00`)
    slots.push(`${String(hour).padStart(2, '0')}:40`)
  }
  return slots
}

function getAvailability(doctorId, dateStr) {
  if (!DOCTOR_IDS.includes(doctorId)) {
    return null
  }
  const allSlots = buildDaySlots(dateStr)
  const seed = hashSeed(`${doctorId}-${dateStr}`)

  return allSlots.filter((_, index) => (seed + index * 7) % 5 !== 0)
}

module.exports = { getAvailability, DOCTOR_IDS }
