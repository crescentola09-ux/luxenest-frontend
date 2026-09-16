import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminSidebar from '../../Components/AdminSidebar'

function UserDetails() {
  const { id } = useParams()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUser()
  }, [id])

  async function getUser() {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/users/${id}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user')
      }

      setUser(data.user)
    } catch (error) {
      console.log('Error getting user:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar />

        <main className="user-details-page">
          <p>Loading user...</p>
        </main>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="admin-layout">
        <AdminSidebar />

        <main className="user-details-page">
          <h1>User not found</h1>

          <Link to="/users" className="user-back-btn">
            ← Back to Users
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="user-details-page">

        <Link to="/users" className="user-back-btn">
          ← Back to Users
        </Link>

        <div className="user-details-header">
          <div className="user-details-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="small-title">USER INFORMATION</p>

            <h1>{user.name}</h1>

            <p>{user.email}</p>
          </div>
        </div>

        <div className="user-details-card">

          <h2>Account Information</h2>

          <div className="user-details-grid">

            <div className="user-detail-item">
              <span>Full Name</span>
              <strong>{user.name}</strong>
            </div>

            <div className="user-detail-item">
              <span>Email Address</span>
              <strong>{user.email}</strong>
            </div>

            <div className="user-detail-item">
              <span>Gender</span>
              <strong>
                {user.gender
                  ? user.gender.charAt(0).toUpperCase() +
                    user.gender.slice(1)
                  : 'Not provided'}
              </strong>
            </div>

            <div className="user-detail-item">
              <span>Date of Birth</span>
              <strong>
                {user.dob
                  ? new Date(user.dob).toLocaleDateString()
                  : 'Not provided'}
              </strong>
            </div>

            <div className="user-detail-item">
              <span>Role</span>
              <strong>
                {user.role === 'admin'
                  ? 'Administrator'
                  : 'User'}
              </strong>
            </div>

            <div className="user-detail-item">
              <span>Joined</span>
              <strong>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'Not available'}
              </strong>
            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default UserDetails