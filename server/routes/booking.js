const express = require('express')
const validator = require('validator')
const { getAvailability, DOCTOR_IDS } = require('../lib/availability')
const { saveBooking } = require('../lib/store')
const { sendBookingNotification } = require('../lib/mailer')
const { SERVICES, DOCTORS } = require('../lib/catalog')

const router = express.Router()

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const TIME_PATTERN = /^\d{2}:\d{2}$/

router.get('/availability', (req, res) => {
  const { doctorId, date } = req.query

  if (!doctorId || !DOCTOR_IDS.includes(doctorId)) {
    return res.status(400).json({ error: 'Некорректный врач' })
  }
  if (!date || !DATE_PATTERN.test(date)) {
    return res.status(400).json({ error: 'Некорректная дата' })
  }

  const slots = getAvailability(doctorId, date)
  return res.json({ slots })
})

router.post('/booking', async (req, res) => {
  const { name, phone, serviceId, doctorId, date, time, comment, consent } = req.body ?? {}

  const errors = {}

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Укажите имя (минимум 2 символа)'
  }
  const normalizedPhone = phone ? String(phone).replace(/[\s()-]/g, '') : ''
  if (!normalizedPhone || !validator.isMobilePhone(normalizedPhone, 'ru-RU')) {
    errors.phone = 'Укажите корректный номер телефона'
  }
  if (!serviceId || !SERVICES[serviceId]) {
    errors.serviceId = 'Выберите услугу'
  }
  if (!doctorId || !DOCTORS[doctorId]) {
    errors.doctorId = 'Выберите врача'
  }
  if (!date || !DATE_PATTERN.test(date)) {
    errors.date = 'Выберите дату'
  }
  if (!time || !TIME_PATTERN.test(time)) {
    errors.time = 'Выберите время'
  }
  if (!consent) {
    errors.consent = 'Требуется согласие на обработку данных'
  }
  if (comment && String(comment).length > 500) {
    errors.comment = 'Комментарий слишком длинный'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ errors })
  }

  const booking = {
    id: `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: validator.escape(name.trim()),
    phone: String(phone).trim(),
    serviceId,
    serviceLabel: SERVICES[serviceId],
    doctorId,
    doctorLabel: DOCTORS[doctorId],
    date,
    time,
    comment: comment ? validator.escape(String(comment).trim()) : '',
    createdAt: new Date().toISOString(),
  }

  try {
    saveBooking(booking)
  } catch (err) {
    console.error('[booking] failed to persist booking', err)
    return res.status(500).json({ error: 'Не удалось сохранить запись, попробуйте ещё раз' })
  }

  try {
    await sendBookingNotification(booking)
  } catch (err) {
    console.error('[booking] failed to send notification email', err)
  }

  return res.status(201).json({ ok: true, id: booking.id })
})

module.exports = router
