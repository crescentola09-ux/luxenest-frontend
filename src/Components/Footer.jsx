import { Link } from 'react-router-dom'
import {
  Camera,
  Users,
  MessageCircle,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>LuxeNest</h2>

          <p>
            Your simple and convenient platform for discovering
            properties, exploring homes and connecting with
            property managers.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <Camera size={18} />
            </a>

            <a href="#" aria-label="Facebook">
              <Users size={18} />
            </a>

            <a href="#" aria-label="Twitter">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* SERVICES */}
        <div className="footer-column">
          <h3>Explore</h3>

          <Link to="/properties">Properties for Sale</Link>
          <Link to="/properties">Properties for Rent</Link>
          <Link to="/signup">Create an Account</Link>
          <Link to="/login">Login</Link>
        </div>

        {/* CONTACT */}
        <div className="footer-column footer-contact">
          <h3>Contact Us</h3>

          <p>
            <MapPin size={17} />
            Lagos, Nigeria
          </p>

          <p>
            <Mail size={17} />
            crescent.ola09@gmail.com
          </p>

          <p>
            <Phone size={17} />
            +234 902 242 8044
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © 2026 LuxeNest. All rights reserved.
        </p>

        <div className="footer-bottom-links">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
        </div>
      </div>

    </footer>
  )
}

export default Footer
