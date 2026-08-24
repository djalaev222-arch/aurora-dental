require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const bookingRouter = require('./routes/booking')

const app = express()
const PORT = process.env.PORT || 4000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(helmet())
app.use(cors({ origin: CLIENT_ORIGIN }))
app.use(express.json({ limit: '20kb' }))

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', apiLimiter)

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api', bookingRouter)

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[server] unhandled error', err)
  res.status(500).json({ error: 'Внутренняя ошибка сервера' })
})

app.listen(PORT, () => {
  console.log(`Aurora Dental API listening on http://localhost:${PORT}`)
})
