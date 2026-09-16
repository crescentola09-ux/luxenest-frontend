
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  RefreshCw,
  Building2
} from 'lucide-react'

import AdminSidebar from '../../Components/AdminSidebar'

function AdminProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [status, setStatus] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  async function fetchProperties() {
    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/property`)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch properties')
      }

      setProperties(data.properties || [])
    } catch (error) {
      console.log('Error fetching properties:', error)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this property?'
    )

    if (!confirmDelete) {
      return
    }

    setDeletingId(id)

    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/property/${id}`,
        {
          method: 'DELETE',
          headers: {
           Authorization: `Bearer ${token}`
               }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Failed to delete property')
        setDeletingId(null)
        return
      }

      setProperties(
        properties.filter((property) => property._id !== id)
      )

      alert('Property deleted successfully!')
    } catch (error) {
      console.log('Error deleting property:', error)
      alert('Something went wrong while deleting the property.')
    }

    setDeletingId(null)
  }

  const filteredProperties = properties.filter((property) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      property.title.toLowerCase().includes(searchText) ||
      property.location.toLowerCase().includes(searchText)

    const matchesType =
      propertyType === '' ||
      property.propertyType === propertyType

    const matchesStatus =
      status === '' ||
      property.status === status

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="dashboard-content">

        {/* PAGE HEADER */}
        <div className="dashboard-top">

          <div>
            <p className="small-title">PROPERTY MANAGEMENT</p>

            <h1>Properties</h1>

            <p>
              Manage all properties listed on LuxeNest.
            </p>
          </div>

          <Link
            to="/add-property"
            className="add-property-btn"
          >
            <Plus size={18} />
            Add Property
          </Link>

        </div>


        {/* PROPERTY SUMMARY */}
        <div className="property-summary">

          <div className="summary-card">

            <div className="summary-icon">
              <Building2 size={22} />
            </div>

            <div>
              <p>Total Properties</p>
              <h2>{properties.length}</h2>
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon">
              <Eye size={22} />
            </div>

            <div>
              <p>Available</p>
              <h2>
                {
                  properties.filter(
                    (property) => property.status === 'Available'
                  ).length
                }
              </h2>
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon">
              <Building2 size={22} />
            </div>

            <div>
              <p>Sold</p>
              <h2>
                {
                  properties.filter(
                    (property) => property.status === 'Sold'
                  ).length
                }
              </h2>
            </div>

          </div>

        </div>


        {/* SEARCH AND FILTERS */}
        <div className="property-tools">

          <div className="property-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search by property or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>


          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>


          <button
            type="button"
            className="refresh-btn"
            onClick={fetchProperties}
            title="Refresh properties"
          >
            <RefreshCw size={18} />
          </button>

        </div>


        {/* PROPERTY TABLE */}
        <div className="dashboard-section">

          <div className="section-header">

            <div>
              <h2>All Properties</h2>

              <p>
                Showing {filteredProperties.length} of{' '}
                {properties.length} properties
              </p>
            </div>

          </div>


          <div className="table-container">

            {loading ? (

              <div className="property-state">
                <RefreshCw size={25} className="loading-icon" />
                <p>Loading properties...</p>
              </div>

            ) : filteredProperties.length === 0 ? (

              <div className="property-state">

                <Building2 size={35} />

                <h3>No properties found</h3>

                <p>
                  Try changing your search or filters.
                </p>

                <Link
                  to="/add-property"
                  className="add-property-btn"
                >
                  <Plus size={18} />
                  Add Property
                </Link>

              </div>

            ) : (

              <table>

                <thead>

                  <tr>
                    <th>Property</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Bedrooms</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>

                </thead>


                <tbody>

                  {filteredProperties.map((property) => (

                    <tr key={property._id}>

                      <td>
                        <div className="admin-property-name">

                          {property.image ? (
                            <img
                              src={property.image}
                              alt={property.title}
                            />
                          ) : (
                            <div className="property-placeholder">
                              <Building2 size={18} />
                            </div>
                          )}

                          <strong>
                            {property.title}
                          </strong>

                        </div>
                      </td>


                      <td>
                        {property.location}
                      </td>


                      <td>
                        {property.propertyType}
                      </td>


                      <td>
                        <strong>
                          ₦{Number(property.price).toLocaleString()}
                        </strong>
                      </td>


                      <td>
                        {property.bedrooms}
                      </td>


                      <td>

                        <span
                          className={
                            property.status === 'Available'
                              ? 'status available'
                              : 'status sold'
                          }
                        >
                          {property.status}
                        </span>

                      </td>


                      <td>

                        <div className="property-actions">

                          <Link
                            to={`/admin/properties/${property._id}`}className="action-view"
                              title="View property">
                            <Eye size={16} />
                          </Link>


                          <Link
                            to={`/admin/properties/edit/${property._id}`}
                            className="action-edit"
                            title="Edit property"
                          >
                            <Pencil size={16} />
                          </Link>


                          <button
                            type="button"
                            className="action-delete"
                            onClick={() =>
                              handleDelete(property._id)
                            }
                            disabled={deletingId === property._id}
                            title="Delete property"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </main>

    </div>
  )
}

export default AdminProperties