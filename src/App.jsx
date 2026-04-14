import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const services = [
  {
    title: 'Soporte tecnico integral',
    text: 'Mantenimiento, diagnostico, formateo, optimizacion de PCs, laptops, impresoras y equipos de oficina.',
  },
  {
    title: 'Redes y conectividad',
    text: 'Instalacion y configuracion de redes LAN y Wi-Fi, cableado estructurado, routers, switches y puntos de acceso.',
  },
  {
    title: 'Desarrollo web y programacion',
    text: 'Creamos paginas web, sistemas internos, landing pages comerciales y soluciones digitales adaptadas a tu negocio.',
  },
  {
    title: 'Seguridad y respaldo',
    text: 'Protegemos tu informacion con configuracion de antivirus, respaldos, buenas practicas y revision preventiva.',
  },
  {
    title: 'Configuracion de servidores',
    text: 'Puesta en marcha de servicios locales, comparticion de archivos, usuarios y soporte para infraestructura pequena.',
  },
  {
    title: 'Atencion remota y presencial',
    text: 'Brindamos asistencia tecnica rapida por llamada, WhatsApp, escritorio remoto o visita programada.',
  },
]

const highlights = [
  'Atencion personalizada para hogares, negocios y emprendimientos',
  'Diagnostico claro antes de ejecutar cualquier trabajo',
  'Soluciones con enfoque comercial, tecnico y visual',
  'Acompanamiento despues de la entrega del servicio',
]

const processSteps = [
  {
    number: '01',
    title: 'Escuchamos tu necesidad',
    text: 'Recibimos tu consulta, entendemos el problema y te orientamos sobre la mejor solucion.',
  },
  {
    number: '02',
    title: 'Definimos una propuesta',
    text: 'Te explicamos el servicio, el alcance, el tiempo estimado y el canal de atencion mas conveniente.',
  },
  {
    number: '03',
    title: 'Ejecutamos con orden',
    text: 'Trabajamos con metodo, priorizando continuidad operativa, seguridad y una entrega profesional.',
  },
  {
    number: '04',
    title: 'Seguimos en contacto',
    text: 'Te dejamos canales abiertos para soporte, consultas y futuras mejoras.',
  },
]

const stats = [
  { value: '150+', label: 'Solicitudes atendidas' },
  { value: '3', label: 'Lineas de servicio' },
  { value: '24/7', label: 'Canal de contacto digital' },
  { value: '100%', label: 'Enfoque personalizado' },
]

const testimonials = [
  {
    name: 'Comercio minorista',
    role: 'Soporte y red local',
    quote:
      'Se reorganizo la conectividad interna y se mejoro el rendimiento de los equipos de trabajo con una intervencion ordenada.',
  },
  {
    name: 'Emprendimiento de servicios',
    role: 'Sitio web comercial',
    quote:
      'La presencia digital quedo mas clara y profesional, con una estructura orientada a generar consultas comerciales.',
  },
  {
    name: 'Cliente independiente',
    role: 'Atencion remota',
    quote:
      'La atencion fue clara, puntual y suficiente para dejar operativo el servicio sin interrumpir la actividad diaria.',
  },
]

const faqs = [
  {
    question: 'Que tipo de clientes atienden?',
    answer:
      'Atendemos hogares, pequenos negocios, emprendimientos y empresas que necesiten soporte tecnico, redes o desarrollo web.',
  },
  {
    question: 'Trabajan de forma remota?',
    answer:
      'Si. Podemos resolver muchas incidencias por llamada, videollamada, WhatsApp o acceso remoto, segun el caso.',
  },
  {
    question: 'Pueden desarrollar una pagina desde cero?',
    answer:
      'Si. Disenamos y programamos landing pages, webs corporativas y soluciones personalizadas con React y Node.js.',
  },
  {
    question: 'Como llega el contacto?',
    answer:
      'El formulario envia un correo a tu Gmail y, ademas, la web incluye accesos directos a WhatsApp y correo para facilitar las consultas.',
  },
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: 'Soporte tecnico',
  message: '',
}

function App() {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const whatsappMessage = encodeURIComponent(
    [
      'Hola, quiero informacion sobre sus servicios.',
      `Nombre: ${formData.name || 'No indicado'}`,
      `Correo: ${formData.email || 'No indicado'}`,
      `Telefono: ${formData.phone || 'No indicado'}`,
      `Servicio: ${formData.service || 'No indicado'}`,
      `Mensaje: ${formData.message || 'Solicito mas informacion.'}`,
    ].join('\n')
  )

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'No se pudo enviar el mensaje.')
      }

      setStatus({
        type: 'success',
        message:
          'Tu solicitud fue enviada correctamente. Revisa tu Gmail configurado para ver los mensajes entrantes.',
      })
      setFormData(initialForm)
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Ocurrio un error al enviar el formulario.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-shell">
      <a
        className="floating-whatsapp"
        href="https://wa.me/51986182856?text=Hola%2C%20quiero%20informacion%20sobre%20sus%20servicios%20de%20soporte%20tecnico%2C%20redes%20y%20programacion."
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <FaWhatsapp />
        <span>WhatsApp</span>
      </a>

      <header className="hero">
        <div className="hero-overlay" />

        <nav className="nav container">
          <a className="brand" href="#inicio">
            <span className="brand-mark">NT</span>
            <div>
              <strong>Nexa TI</strong>
              <small>Soporte, redes y programacion</small>
            </div>
          </a>

          <div className="nav-links">
            <a href="#servicios">Servicios</a>
            <a href="#proceso">Proceso</a>
            <a href="#ubicacion">Ubicacion</a>
            <a href="#contacto" className="nav-cta">
              Solicitar servicio
            </a>
          </div>
        </nav>

        <section id="inicio" className="hero-content container">
          <div className="hero-copy">
            <span className="eyebrow">Servicios de tecnologia para atencion profesional</span>
            <h1>Servicios de soporte tecnico, redes y desarrollo web con enfoque profesional.</h1>
            <p>
              Atendemos requerimientos operativos y comerciales con una propuesta clara: soporte
              tecnico, implementacion de redes y desarrollo con React y Node.js, respaldados por un
              contacto directo por correo y WhatsApp.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#contacto">
                Solicitar una cotizacion
              </a>
              <a
                className="btn btn-secondary"
                href="https://wa.me/51986182856"
                target="_blank"
                rel="noreferrer"
              >
                Hablar por WhatsApp
              </a>
            </div>

            <div className="hero-badges">
              <span>Atencion tecnica</span>
              <span>Infraestructura de red</span>
              <span>Desarrollo de soluciones web</span>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-card hero-card-main">
              <span className="panel-tag">Servicios especializados</span>
              <h2>Soporte operativo y desarrollo digital en una sola propuesta.</h2>
              <p>
                Atendemos incidencias, mejoras de infraestructura y proyectos web con una presentacion
                pensada para transmitir orden, confianza y capacidad tecnica.
              </p>
            </div>

            <div className="hero-card-grid">
              <article className="hero-card">
                <h3>Soporte operativo</h3>
                <p>Diagnostico, mantenimiento y solucion de incidencias con atencion organizada.</p>
              </article>

              <article className="hero-card">
                <h3>Infraestructura de red</h3>
                <p>Configuracion y optimizacion de conectividad para continuidad operativa.</p>
              </article>

              <article className="hero-card">
                <h3>Desarrollo web</h3>
                <p>Paginas comerciales y soluciones a medida con tecnologia actual.</p>
              </article>
            </div>
          </div>
        </section>
      </header>

      <main>
        <section className="stats container">
          {stats.map((item) => (
            <article key={item.label} className="stat-item">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </section>

        <section id="servicios" className="section container">
          <div className="section-heading">
            <span className="section-kicker">Servicios principales</span>
            <h2>Servicios orientados a operacion, presencia digital y continuidad.</h2>
            <p>
              La propuesta se presenta con estructura clara, lenguaje directo y un enfoque comercial
              pensado para facilitar solicitudes de atencion.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-accent">
          <div className="container value-grid">
            <div className="value-copy">
              <span className="section-kicker">Por que elegirnos</span>
              <h2>Una presentacion seria para un servicio que debe transmitir confianza.</h2>
              <p>
                Se prioriza una comunicacion sobria, una estructura comercial clara y una propuesta
                tecnica que ayude al cliente a entender el servicio desde el primer contacto.
              </p>

              <div className="value-list">
                {highlights.map((item) => (
                  <div className="value-item" key={item}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="value-box">
              <div>
                <strong>Respuesta ordenada</strong>
                <p>Canales directos por WhatsApp, correo y formulario web.</p>
              </div>
              <div>
                <strong>Gestion centralizada</strong>
                <p>Los mensajes del formulario se reciben en tu Gmail configurado desde Node.js.</p>
              </div>
              <div>
                <strong>Presencia profesional</strong>
                <p>Mapa integrado para reforzar confianza y cobertura de servicio.</p>
              </div>
            </aside>
          </div>
        </section>

        <section id="proceso" className="section container">
          <div className="section-heading align-left">
            <span className="section-kicker">Nuestro proceso</span>
            <h2>Metodologia de trabajo clara para atencion tecnica y proyectos web.</h2>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <article key={step.number} className="process-card">
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section testimonials-section">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">Casos de atencion</span>
              <h2>Referencias de intervenciones y proyectos realizados.</h2>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.name + testimonial.role}>
                  <p>{testimonial.quote}</p>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ubicacion" className="section container">
          <div className="location-grid">
            <div className="map-panel">
              <span className="section-kicker">Ubicacion referencial</span>
              <h2>Atencion en Lima, Peru y soporte remoto para consultas digitales.</h2>
              <p>
                El mapa refuerza presencia local y cobertura. Si luego deseas colocar una direccion
                exacta, se puede reemplazar esta ubicacion referencial por la real.
              </p>

              <div className="location-points">
                <div><span>Lima, Peru</span></div>
                <div><span>+51 986 182 856</span></div>
                <div><span>jordanpmrojasbazan@gmail.com</span></div>
              </div>
            </div>

            <div className="map-frame">
              <iframe
                title="Mapa de cobertura en Lima"
                src="https://www.google.com/maps?q=Lima%2C%20Peru&z=12&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-grid">
            <div className="section-heading align-left">
              <span className="section-kicker">Preguntas frecuentes</span>
              <h2>Informacion clave para facilitar la decision del cliente.</h2>
            </div>

            <div className="faq-list">
              {faqs.map((faq) => (
                <article className="faq-item" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-copy">
              <span className="section-kicker">Contacto directo</span>
              <h2>Canales directos para solicitudes de soporte, redes y desarrollo web.</h2>
              <p>
                El formulario se encuentra conectado a un backend en Node.js. Cuando un cliente envia
                su solicitud, el servidor genera un correo y lo remite a tu Gmail configurado.
              </p>

              <div className="contact-cards">
                <a href="https://wa.me/51901520012" target="_blank" rel="noreferrer">
                  <div>
                    <strong>WhatsApp</strong>
                    <span>+51 901 520 012</span>
                  </div>
                </a>
                <a href="mailto:jordanpmrojasbazan@gmail.com">
                  <div>
                    <strong>Correo</strong>
                    <span>jordanpmrojasbazan@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Nombre completo
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ejemplo: Carlos Mendoza"
                  required
                />
              </label>

              <label>
                Correo electronico
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="cliente@empresa.com"
                  required
                />
              </label>

              <label>
                Telefono o WhatsApp
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+51 999 999 999"
                  required
                />
              </label>

              <label>
                Servicio de interes
                <select name="service" value={formData.service} onChange={handleChange}>
                  <option>Soporte tecnico</option>
                  <option>Redes y conectividad</option>
                  <option>Programacion y pagina web</option>
                  <option>Seguridad y respaldo</option>
                  <option>Servidor o infraestructura</option>
                </select>
              </label>

              <label>
                Cuentanos que necesitas
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe el problema o el proyecto que deseas cotizar."
                  rows="5"
                  required
                />
              </label>

              <div className="form-actions">
                <button className="btn btn-primary submit-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
                </button>
                <a
                  className="btn btn-secondary submit-button"
                  href={`https://wa.me/51901520012?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Enviar por WhatsApp
                </a>
              </div>

              {status.message ? <p className={`form-status ${status.type}`}>{status.message}</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div>
            <strong>Nexa TI</strong>
            <p>Soporte tecnico, redes y programacion con una imagen profesional y lista para vender.</p>
          </div>

          <div className="footer-links">
            <a href="#servicios">Servicios</a>
            <a href="#ubicacion">Ubicacion</a>
            <a href="#contacto">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
