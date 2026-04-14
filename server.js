import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 3001

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.join(__dirname, 'dist')

app.use(cors())
app.use(express.json())

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const buildTransport = () => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com'
  const portValue = Number(process.env.EMAIL_PORT || 587)
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  if (!user || !pass || pass === 'TU_APP_PASSWORD_DE_GMAIL') {
    throw new Error('Faltan EMAIL_USER o EMAIL_PASS en el archivo .env')
  }

  return nodemailer.createTransport({
    host,
    port: portValue,
    secure: portValue === 465,
    auth: {
      user,
      pass,
    },
  })
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true })
})

app.post('/api/contact', async (request, response) => {
  const { name, email, phone, service, message } = request.body ?? {}

  if (!name || !email || !phone || !service || !message) {
    return response.status(400).json({
      message: 'Completa todos los campos antes de enviar la solicitud.',
    })
  }

  try {
    const transporter = buildTransport()
    const targetEmail = process.env.EMAIL_TO || process.env.EMAIL_USER
    const replyEmail = process.env.REPLY_TO || email
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone)
    const safeService = escapeHtml(service)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')

    await transporter.sendMail({
      from: `"Nexa TI" <${process.env.EMAIL_USER}>`,
      to: targetEmail,
      replyTo: replyEmail,
      subject: `Nueva solicitud web: ${service}`,
      text: [
        'Nueva consulta recibida desde la pagina web.',
        '',
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Telefono: ${phone}`,
        `Servicio: ${service}`,
        '',
        'Mensaje:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
          <h2 style="margin-bottom: 12px;">Nueva consulta desde la pagina web</h2>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Correo:</strong> ${safeEmail}</p>
          <p><strong>Telefono:</strong> ${safePhone}</p>
          <p><strong>Servicio:</strong> ${safeService}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    })

    return response.json({
      message: 'Mensaje enviado correctamente.',
    })
  } catch (error) {
    console.error('Error enviando correo:', error)

    return response.status(500).json({
      message:
        'No se pudo enviar el correo. Revisa la configuracion SMTP en tu archivo .env antes de probar otra vez.',
    })
  }
})

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))

  app.get('/{*path}', (_request, response) => {
    response.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Servidor Node activo en http://localhost:${port}`)
})
