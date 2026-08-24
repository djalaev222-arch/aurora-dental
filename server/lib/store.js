const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', 'data')
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json')

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, '[]', 'utf-8')
  }
}

function saveBooking(booking) {
  ensureStore()
  const raw = fs.readFileSync(BOOKINGS_FILE, 'utf-8')
  const bookings = JSON.parse(raw)
  bookings.push(booking)
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8')
}

module.exports = { saveBooking }
