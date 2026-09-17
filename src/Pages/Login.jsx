import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    // console.log('API URL:', import.meta.env.VITE_API_URL)

    setLoading(true)

    try {
      const response = await fetch( `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
         {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Login failed')
        setLoading(false)
        return
      }

      // Save the login information
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      alert('Login successful!')

      // Send admin to dashboard
      if (data.user.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/properties')
      }

    } catch (error) {
      console.log('Login error:', error)
      alert('Something went wrong. Make sure the backend is running.')
    }

    setLoading(false)
  }

  return (
    <div>

      <Navbar />

      <div className="auth-page">

        <div className="auth-box">

          <h1>Welcome Back</h1>

          <p>Login to your account to continue.</p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Login