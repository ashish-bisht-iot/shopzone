import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // In a real app, you'd POST to an API here
    console.log('Form submitted:', form)
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="page page-enter">
      <div className="container">
        <div className="contact-page">
          <h1>Get in touch.</h1>
          <p className="sub">
            Questions about an order, a product, or just want to say hi?
            Fill out the form and we'll get back to you within 24 hours.
          </p>

          <div className="form-field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ashish Bisht"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ashish@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Order inquiry, product question..."
              value={form.subject}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us what's on your mind..."
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          {submitted && (
            <div className="form-success">
              ✓ Message sent! We'll be in touch shortly.
            </div>
          )}

          <button
            className="btn-primary"
            style={{ marginTop: 24 }}
            onClick={handleSubmit}
            type="button"
          >
            Send Message →
          </button>
        </div>
      </div>
    </div>
  )
}
