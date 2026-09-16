import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function Contact() {
  // This stores everything the user types into the form.
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  // This controls the success message.
  const [sent, setSent] = useState(false)

  // This controls the error message if something goes wrong.
  const [error, setError] = useState('')

  // This controls the button while the message is being sent.
  const [loading, setLoading] = useState(false)

  // This runs whenever the user types into an input.
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })

    // Remove old messages when the user starts typing again.
    setSent(false)
    setError('')
  }

  // This sends the form data to the backend.
  async function handleSubmit(event) {
    // Stop the browser from refreshing the page.
    event.preventDefault()

    // Show loading state.
    setLoading(true)

    // Clear previous messages.
    setSent(false)
    setError('')

    try {
      // Send the form information to your inquiry API.
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/inquiry/new`, 
        {
          method: 'POST',

          // Tell the backend that we are sending JSON.
          headers: {
            'Content-Type': 'application/json'
          },

          // Convert the form object into JSON.
          body: JSON.stringify(form)
        }
      )

      // Convert the backend response into JavaScript.
      const data = await response.json()

      // If the backend returns an error, show it.
      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to send message'
        )
      }

      // Show the success message.
      setSent(true)

      // Clear the form after successful submission.
      setForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (error) {
      // Show the error if the request fails.
      console.log('Error sending message:', error)
      setError(error.message)
    } finally {
      // Stop the loading state whether the request succeeds or fails.
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />

      <section className="inner-page-hero">
        <div>
          <p className="small-title">GET IN TOUCH</p>

          <h1>Contact LuxeNest</h1>

          <p>
            Have a question about a property or need more
            information? We would love to hear from you.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-info">
          <p className="small-title">CONTACT US</p>

          <h2>We Are Here to Help</h2>

          <p>
            Whether you have a question about a property, want to
            make an enquiry or simply need more information, you
            can reach us using the details below.
          </p>

          {/* Email */}
          <div className="contact-item">
            <div className="contact-icon">
              <Mail size={21} />
            </div>

            <div>
              <h3>Email</h3>
              <p>crescent.ola09@gmail.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="contact-item">
            <div className="contact-icon">
              <Phone size={21} />
            </div>

            <div>
              <h3>Phone</h3>
              <p>09022428044</p>
            </div>
          </div>

          {/* Location */}
          <div className="contact-item">
            <div className="contact-icon">
              <MapPin size={21} />
            </div>

            <div>
              <h3>Location</h3>
              <p>Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        <div className="contact-form-box">
          <h2>Send Us a Message</h2>

          {/* Show this when the message was successfully sent. */}
          {sent && (
            <div className="success-message">
              Your message has been sent successfully.
              Thank you for contacting LuxeNest.
            </div>
          )}

          {/* Show this if something goes wrong. */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div>
                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                />
              </div>
            </div>

            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              required
            />

            <label>Message</label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows="6"
              required
            ></textarea>

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {/* Change the button text while sending. */}
              {loading ? 'Sending...' : 'Send Message'}

              {/* Keep the send icon on the button. */}
              {!loading && <Send size={17} />}
            </button>
          </form>
        </div>
      </section>

      <section className="contact-map-section">
        <div>
          <p className="small-title">FIND US</p>

          <h2>Our Location</h2>

          <p>Lagos, Nigeria</p>
        </div>

        <div className="map-box">
          <iframe
            title="LuxeNest Location"
            src="https://www.google.com/maps?q=Lagos,Nigeria&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contact