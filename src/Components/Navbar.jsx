import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setMenuOpen(false)
    navigate('/login')
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">

      <Link to="/" className="logo" onClick={closeMenu}>
        LuxeNest
      </Link>

      {/* Hamburger button */}
      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>

        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        {token && (
          <Link to="/properties" onClick={closeMenu}>
            Properties
          </Link>
        )}

        <Link to="/about" onClick={closeMenu}>
          About
        </Link>

        {token && (
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        )}

        {token && user?.role === 'admin' && (
          <Link to="/dashboard" onClick={closeMenu}>
            Admin Dashboard
          </Link>
        )}

        {!token ? (
          <>
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>

            <Link to="/signup" className="signup-btn" onClick={closeMenu}>
              Sign Up
            </Link>
          </>
        ) : (
          <button
            className="logout-nav-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  )
}

export default Navbar