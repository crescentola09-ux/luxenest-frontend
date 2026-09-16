import { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/AdminSidebar'
import { Link } from 'react-router-dom'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

  useEffect(() => {
    getUsers()
  }, [])

  async function getUsers() {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/users`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get users')
      }

      setUsers(data.users)
    } catch (error) {
      console.log('Error getting users:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter((user) => {
  const matchesSearch =
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())

  const matchesRole =
    roleFilter === '' || user.role === roleFilter

  return matchesSearch && matchesRole
})


  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="users-page">

        <div className="users-header">
          <p className="small-title">USER MANAGEMENT</p>

          <h1>Users</h1>

          <p>
            View the users who have registered on LuxeNest.
          </p>
        </div>

        <div className="users-summary">
          <div className="users-summary-card">
            <p>Total Users</p>
            <h2>{users.length}</h2>
          </div>

          <div className="users-summary-card">
            <p>Regular Users</p>
            <h2>
              {users.filter((user) => user.role === 'user').length}
            </h2>
          </div>

          <div className="users-summary-card">
            <p>Administrators</p>
            <h2>
              {users.filter((user) => user.role === 'admin').length}
            </h2>
          </div>
        </div>


        <div className="users-filter-area">

  <input
    type="text"
    placeholder="Search users by name or email..."
    value={search}
    onChange={(event) => setSearch(event.target.value)}
  />

  <select
    value={roleFilter}
    onChange={(event) => setRoleFilter(event.target.value)}
  >
    <option value="">All Roles</option>
    <option value="user">Users</option>
    <option value="admin">Administrators</option>
  </select>

</div>

        <div className="users-table-container">

          {loading ? (
            <div className="users-loading">
              Loading users...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="no-users">
                <h2>No users found</h2>

                <p>
                     {users.length === 0 ? 'There are currently no registered users.'
                    : 'Try changing your search or role filter.'}
                    </p>
                </div>
          ) : (
            <table className="users-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredUsers.map((user) => (
                  <tr key={user._id}>

                    <td>
                      <div className="user-table-name">
                        <div className="user-table-avatar">
                          {user.name ?.charAt(0).toUpperCase()}
                        </div>

                        <span>{user.name}</span>
                      </div>
                    </td>

                    <td>{user.email}</td>

                    <td>
                      {user.gender ? user.gender.charAt(0).toUpperCase() +  user.gender.slice(1) : 'Not provided'}
                    </td>

                    <td>
                      <span
                        className={  user.role === 'admin'   ? 'user-role admin' : 'user-role' }>
                        {user.role === 'admin' ? 'Administrator': 'User'}
                      </span>
                    </td>
                    <td>
                        {user.createdAt? new Date(user.createdAt).toLocaleDateString(): 'Not available'}
                    </td>
                    <td>
                    <Link to={`/users/${user._id}`} className="user-view-btn">View</Link>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
          )}

        </div>

      </main>

    </div>
  )
}

export default Users