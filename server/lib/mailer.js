const nodemailer = require('nodemailer')

function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

async function sendBookingNotification(booking) {
  if (!isMailConfigured()) {
    console.log('[mailer] SMTP is not configured, skipping email. Booking:', booking)
    return { sent: false }
  }

  const transport = getTransport()
  const to = process.env.CLINIC_NOTIFY_EMAIL || process.env.SMTP_USER

  await transport.sendMail({
    from: `"Аврора Дентал — сайт" <${process.env.SMTP_USER}>`,
    to,
    subject: `Новая запись: ${booking.name} — ${booking.date} ${booking.time}`,
    text: [
      `Имя: ${booking.name}`,
      `Телефон: ${booking.phone}`,
      `Услуга: ${booking.serviceLabel}`,
      `Врач: ${booking.doctorLabel}`,
      `Дата и время: ${booking.date} ${booking.time}`,
      booking.comment ? `Комментарий: ${booking.comment}` : null,
    ]
      .filter(Boolean)
      .join('\n'),
  })

  return { sent: true }
}

module.exports = { sendBookingNotification, isMailConfigured }
