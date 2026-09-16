import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Search,
  ShieldCheck,
  KeyRound,
  Headphones,
  MapPin,
  BedDouble,
  Bath
} from 'lucide-react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function Home() {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/property`)
      .then((response) => response.json())
      .then((data) => {
        setProperties(data.properties || [])
      })
      .catch((error) => {
        console.log('Error fetching properties:', error)
      })
  }, [])

  const featuredProperties = properties.slice(0, 3)

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="home-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="small-title">WELCOME TO LUXENEST</p>

            <h1>
              Find a Place
              <br />
              You Can Call Home.
            </h1>

            <p className="hero-text">
              Discover carefully selected properties for sale and rent.
              LuxeNest makes finding your next home simple, comfortable
              and convenient.
            </p>

            <div className="hero-buttons">
              <Link to="/properties" className="primary-btn">
                Explore Properties
                <ArrowRight size={18} />
              </Link>

              <Link to="/about" className="secondary-btn">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="home-intro">
        <div className="intro-text">
          <p className="small-title">YOUR PROPERTY JOURNEY STARTS HERE</p>

          <h2>Real Estate Made Simple</h2>

          <p>
            At LuxeNest, we believe finding a property should not be
            complicated. Our platform brings properties, property
            information and enquiries together in one convenient place.
          </p>

          <p>
            Whether you are looking for a family home, an apartment,
            a villa or an investment property, LuxeNest helps you
            explore your options with confidence.
          </p>

          <Link to="/properties" className="text-link">
            Browse our properties <ArrowRight size={17} />
          </Link>
        </div>

        <div className="intro-box">
          <Building2 size={45} />
          <h3>Quality Properties</h3>
          <p>
            Explore properties with clear information about their
            location, price, type and features.
          </p>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="featured-section">
        <div className="section-heading">
          <div>
            <p className="small-title">FEATURED PROPERTIES</p>
            <h2>Explore Our Properties</h2>
          </div>

          <Link to="/properties" className="view-all-link">
            View All <ArrowRight size={17} />
          </Link>
        </div>

        {featuredProperties.length > 0 ? (
          <div className="property-grid home-property-grid">
            {featuredProperties.map((property) => (
              <div className="property-card" key={property._id}>
                <img
                  src={property.image}
                  alt={property.title}
                />

                <div className="property-info">
                  <h2>{property.title}</h2>

                  <p className="location">
                    <MapPin size={16} />
                    {property.location}
                  </p>

                  <h3>
                    ₦{Number(property.price).toLocaleString()}
                    {property.listingType === 'For Rent' && ' / year'}
                  </h3>

                  <div className="property-features">
                    <span>
                      <BedDouble size={16} />
                      {property.bedrooms} Beds
                    </span>

                    <span>
                      <Bath size={16} />
                      {property.bathrooms} Baths
                    </span>
                  </div>

                  <Link
                    to={`/properties/${property._id}`}
                    className="view-btn"
                  >
                    View Property
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-home-properties">
            <p>
              Properties will appear here when they are added.
            </p>

            <Link to="/properties" className="text-link">
              Browse Properties <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </section>

      {/* WHY LUXENEST */}
      <section className="why-section">
        <div className="section-heading centered">
          <p className="small-title">WHY LUXENEST</p>
          <h2>A Better Way to Find Property</h2>
          <p>
            We make property discovery easier by giving you the
            information you need in one place.
          </p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <Search size={30} />
            <h3>Easy Property Search</h3>
            <p>
              Search properties by location and property type to
              quickly find options that match your needs.
            </p>
          </div>

          <div className="why-card">
            <ShieldCheck size={30} />
            <h3>Clear Information</h3>
            <p>
              View important property details including prices,
              bedrooms, bathrooms, location and availability.
            </p>
          </div>

          <div className="why-card">
            <Headphones size={30} />
            <h3>Simple Enquiries</h3>
            <p>
              Found something you like? Send an enquiry directly
              through the platform.
            </p>
          </div>

          <div className="why-card">
            <KeyRound size={30} />
            <h3>Find Your Next Home</h3>
            <p>
              Explore available homes and discover a property
              that fits your lifestyle and plans.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="steps-section">
        <div className="section-heading centered">
          <p className="small-title">HOW IT WORKS</p>
          <h2>Finding Your Property in Three Steps</h2>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Create an Account</h3>
            <p>
              Sign up for a LuxeNest account to access our property
              listings.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Explore Properties</h3>
            <p>
              Browse available properties and use our search and
              filter options to narrow your choices.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Send an Enquiry</h3>
            <p>
              Found a property you like? Send an enquiry and let
              us know what you are interested in.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stat-item">
          <h2>{properties.length}+</h2>
          <p>Properties Listed</p>
        </div>

        <div className="stat-item">
          <h2>24/7</h2>
          <p>Platform Access</p>
        </div>

        <div className="stat-item">
          <h2>3</h2>
          <p>Simple Steps</p>
        </div>

        <div className="stat-item">
          <h2>1</h2>
          <p>Easy Platform</p>
        </div>
      </section>

      {/* LOCATION */}
      <section className="location-section">
        <div className="location-content">
          <p className="small-title">OUR LOCATION</p>

          <h2>Find Us in Lagos</h2>

          <p>
            LuxeNest is designed to help people discover properties
            across Lagos and explore different residential options
            from one platform.
          </p>

          <div className="location-details">
            <MapPin size={20} />
            <span>Lagos, Nigeria</span>
          </div>

          <Link to="/contact" className="primary-btn">
            Contact Us
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="map-box">
          <iframe
            title="LuxeNest Lagos Location"
            src="https://www.google.com/maps?q=Lagos,Nigeria&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div>
          <p className="small-title">READY TO GET STARTED?</p>

          <h2>Your Next Home Could Be Here.</h2>

          <p>
            Explore our properties and start your search today.
          </p>
        </div>

        <Link to="/properties" className="primary-btn">
          Explore Properties
          <ArrowRight size={18} />
        </Link>
      </section>

      <Footer />
    </div>
  )
}

export default Home
