import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'

function PropertyDetails() {

  const { id } = useParams()

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  const [showInquiry, setShowInquiry] = useState(false)

  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/property/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProperty(data.property)
        setLoading(false)
      })
      .catch((error) => {
        console.log('Error fetching property:', error)
        setLoading(false)
      })
  }, [id])

  function handleChange(event) {
    setInquiry({
      ...inquiry,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setSending(true)

    const token = localStorage.getItem('token')

    const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/inquiry/new`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        message: inquiry.message,
        property: id
      })
    }
  )

  try{
      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Failed to send inquiry')
        setSending(false)
        return
      }

      alert('Your inquiry has been sent successfully!')

      setInquiry({
        name: '',
        email: '',
        phone: '',
        message: ''
      })

      setShowInquiry(false)

    } catch (error) {
      console.log('Error sending inquiry:', error)
      alert('Something went wrong. Make sure the backend is running.')
    }

    setSending(false)
  }

  if (loading) {
    return (
      <div>
        <Navbar />

        <main className="auth-page">
          <div className="auth-box">
            <p>Loading property...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!property) {
    return (
      <div>
        <Navbar />

        <main className="auth-page">
          <div className="auth-box">
            <h1>Property Not Found</h1>

            <p>
              We could not find this property.
            </p>

            <Link
              to="/properties"
              className="secondary-btn"
            >
              Back to Properties
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div>

      <Navbar />

      <main className="details-page">

        <Link
          to="/properties"
          className="back-btn"
        >
          ← Back to Properties
        </Link>

        <div className="details-container">

          <div className="details-image">
            <img
              src={property.image}
              alt={property.title}
            />
          </div>

          <div className="details-content">

            <p className="small-title">
              PROPERTY DETAILS
            </p>

            <h1>{property.title}</h1>

            <p className="location">
              📍 {property.location}
            </p>

            <h2 className="details-price">
              ₦{Number(property.price).toLocaleString()}
               {property.listingType === 'For Rent' && ' / year'}
            </h2>

                <div className="details-listing-info">
           <span>{property.listingType || 'For Sale'}</span>

           <span
            className={  property.status === 'Available' ? 'status available'  : 'status sold' }>
                {property.status}</span></div>


            <div className="details-features">

              <div>
                <strong>{property.bedrooms}</strong>
                <span>Bedrooms</span>
              </div>

              <div>
                <strong>{property.bathrooms}</strong>
                <span>Bathrooms</span>
              </div>

            </div>

            <div className="description">

              <h2>Description</h2>

              <p>
                {property.description}
              </p>

            </div>

            <div className="inquiry-box">

              <h2>Interested in this property?</h2>

              <p>
                Send us an inquiry and our team will get back to you.
              </p>

              {!showInquiry ? (
                <button
                  type="button"
                  onClick={() => setShowInquiry(true)}
                >
                  Send Inquiry
                </button>
              ) : (

                <form
                  className="inquiry-form"
                  onSubmit={handleSubmit}
                >

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={inquiry.name}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={inquiry.email}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={inquiry.phone}
                    onChange={handleChange}
                    required
                  />

                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={inquiry.message}
                    onChange={handleChange}
                    required
                  ></textarea>

                  <div className="inquiry-buttons">

                    <button
                      type="button"
                      onClick={() => setShowInquiry(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={sending}
                    >
                      {sending
                        ? 'Sending...'
                        : 'Send Inquiry'}
                    </button>

                  </div>

                </form>

              )}

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default PropertyDetails
