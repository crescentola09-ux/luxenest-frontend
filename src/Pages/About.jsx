import {
  Building2,
  ShieldCheck,
  Users,
  Target,
  ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function About() {
  return (
    <div>
      <Navbar />

      <section className="inner-page-hero">
        <div>
          <p className="small-title">ABOUT LUXENEST</p>
          <h1>Making Property Search Simpler</h1>
          <p>
            A modern real estate platform created to make discovering
            and managing property information easier.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div>
          <p className="small-title">OUR STORY</p>
          <h2>Built Around a Simpler Property Experience</h2>

          <p>
            LuxeNest was created with a simple idea: property
            discovery should be straightforward and convenient.
          </p>

          <p>
            Instead of searching through scattered information,
            users can explore properties, view important details,
            check availability and send enquiries through one
            platform.
          </p>

          <p>
            Our goal is to create a digital space where property
            seekers can explore their options while property
            managers can keep their listings organised.
          </p>
        </div>

        <div className="about-highlight">
          <Building2 size={50} />
          <h3>Property Management Made Easier</h3>
          <p>
            LuxeNest brings property listings and enquiries into
            one organised system.
          </p>
        </div>
      </section>

      <section className="mission-section">
        <div className="mission-card">
          <Target size={35} />
          <h3>Our Mission</h3>
          <p>
            To provide a simple and accessible platform that helps
            people discover properties and connect with property
            managers.
          </p>
        </div>

        <div className="mission-card">
          <Users size={35} />
          <h3>Our Users</h3>
          <p>
            LuxeNest is designed for property seekers, tenants,
            buyers and property administrators.
          </p>
        </div>

        <div className="mission-card">
          <ShieldCheck size={35} />
          <h3>Our Approach</h3>
          <p>
            We focus on clear property information, simple
            navigation and an organised experience.
          </p>
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to Explore?</h2>

        <p>
          Take a look at the properties available on LuxeNest.
        </p>

        <Link to="/properties" className="primary-btn">
          Explore Properties
          <ArrowRight size={18} />
        </Link>
      </section>

      <Footer />
    </div>
  )
}

export default About