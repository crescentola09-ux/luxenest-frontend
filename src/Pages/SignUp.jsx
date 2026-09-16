import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'

function SignUp() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/signup`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            dob,
            gender,
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Failed to create account')
        setLoading(false)
        return
      }

      alert('Account created successfully!')

      navigate('/login')

    } catch (error) {
      console.log('Signup error:', error)
      alert('Something went wrong. Make sure the backend is running.')
    }

    setLoading(false)
  }

  return (
    <div>

      <Navbar />

      <div className="auth-page">

        <div className="auth-box">

          <h1>Create an Account</h1>

          <p>Sign up to find your perfect property.</p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <input
              type="date"
              value={dob}
              onChange={(event) => setDob(event.target.value)}
            />

            <select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default SignUp