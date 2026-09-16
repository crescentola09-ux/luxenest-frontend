import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const navigate = useNavigate()

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  )

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="navbar">

      <div className="logo">
        LuxeNest
      </div>

      <div className="nav-links">
       <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/properties">Properties</Link>
       <Link to="/contact">Contact</Link>

        {user ? (
          <button
            type="button"
            className="logout-nav-btn"
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : (
          <>
            <Link to="/login">
              Log In
            </Link>

            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar