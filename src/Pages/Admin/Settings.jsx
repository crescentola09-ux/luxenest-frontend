import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../../Components/AdminSidebar'

function Settings() {
  const user = JSON.parse(localStorage.getItem('user'))

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [message, setMessage] = useState('')

  async function handleSave(event) {
  event.preventDefault()

  try {
    const token = localStorage.getItem('token')

    const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/v1/auth/profile`, 
        {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile')
    }

    localStorage.setItem(
      'user',
      JSON.stringify(data.user)
    )

    setMessage('Settings saved successfully.')
  } catch (error) {
    console.log('Update settings error:', error)
    setMessage(error.message)
  }
}

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="settings-page">

        <div className="settings-header">
          <p className="small-title">ACCOUNT SETTINGS</p>

          <h1>Settings</h1>

          <p>
            Manage your LuxeNest account information.
          </p>
        </div>

        <div className="settings-container">

          <div className="settings-card">

            <h2>Profile Information</h2>

            <p className="settings-description">
              Update the information connected to your
              LuxeNest account.
            </p>

            <form onSubmit={handleSave}>

              <div className="settings-form-group">
                <label>Name</label>

                <input type="text" value={name} onChange={(event) =>
                    setName(event.target.value)
                  }
                />
              </div>

              <div className="settings-form-group">
                <label>Email</label>

                <input type="email" value={email}  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                />
              </div>

              <div className="settings-form-group">
                <label>Role</label>

                <input type="text" value={ user?.role === 'admin' ? 'Administrator'  : 'User'
                  }
                  disabled
                />
              </div>

              <button
                type="submit"
                className="settings-save-btn"
              >
                Save Changes
              </button>

              {message && (
                <p className="settings-success">
                  {message}
                </p>
              )}

            </form>

          </div>


          <div className="settings-card">

            <h2>Account</h2>

            <p className="settings-description">
              Quick access to your LuxeNest account.
            </p>
{/* 
            <Link
              to="/profile"
              className="settings-link"
            >
              View Profile →
            </Link> */}

            <Link to="/dashboard"  className="settings-link" >
              Back to Dashboard →
            </Link>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Settings