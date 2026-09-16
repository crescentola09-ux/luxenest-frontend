import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Plus,
  MessageSquare,
  Users,
  Settings,
  LogOut
} from 'lucide-react'

const navigationClass = ({ isActive }) =>
  `sidebar-link${isActive ? ' active' : ''}`

function AdminSidebar() {
  const navigate = useNavigate()

function handleLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  navigate('/login')
}

  return (
    <aside className="admin-sidebar">

      <div className="sidebar-logo">
        LuxeNest
      </div>

      <nav className="sidebar-menu" aria-label="Admin navigation">

        <p className="menu-title">MAIN MENU</p>

        <NavLink to="/dashboard" className={navigationClass}>
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/properties" className={navigationClass}>
          <Building2 size={19} />
          <span>Properties</span>
        </NavLink>

        <NavLink to="/add-property" className={navigationClass}>
          <Plus size={19} />
          <span>Add Property</span>
        </NavLink>

        <NavLink to="/inquiries" className={navigationClass}>
          <MessageSquare size={19} />
          <span>Inquiries</span>
        </NavLink>

        <p className="menu-title">USER MANAGEMENT</p>

      <NavLink to="/users" className={navigationClass}>
       <Users size={19} />
        <span>Users</span>
        </NavLink>

        <NavLink to="/settings" className={navigationClass}>
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>

      </nav>

      <div className="sidebar-bottom">

        <button type="button" className="logout-btn" onClick={handleLogout}>
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  )
}

export default AdminSidebar