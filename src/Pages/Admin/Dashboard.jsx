import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  CheckCircle,
  Home,
  Plus,
  RefreshCw,
  MessageSquare,
  User,
  KeyRound
} from 'lucide-react'

import AdminSidebar from '../../Components/AdminSidebar'

function Dashboard() {
  const [properties, setProperties] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchDashboardData() {
   
    setLoading(true)
     const token = localStorage.getItem('token')

    //  console.log('API URL:', import.meta.env.VITE_API_URL)
      // console.log('TOKEN EXISTS:', !!token)

    try {
      const propertyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/property`)

      // console.log('PROPERTY URL:', propertyResponse.url)
      // console.log('PROPERTY STATUS:', propertyResponse.status)
      const propertyData = await propertyResponse.json()

      if (!propertyResponse.ok) {
        throw new Error(
          propertyData.message || 'Failed to fetch properties'
        )
      }

      setProperties(propertyData.properties || [])

         const inquiryResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/inquiry`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json'
        }
      }
    )

    console.log('INQUIRY URL:', inquiryResponse.url)
    console.log('INQUIRY STATUS:', inquiryResponse.status)
      const inquiryData = await inquiryResponse.json()

      if (!inquiryResponse.ok) {
        throw new Error(
          inquiryData.message || 'Failed to fetch inquiries'
        )
      }

      setInquiries(inquiryData.inquiries || [])
    } catch (error) {
      console.log('Error fetching dashboard data:', error)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // Property statistics
  const totalProperties = properties.length

  const saleProperties = properties.filter(
    (property) => property.listingType === 'For Sale'
  ).length

  const rentProperties = properties.filter(
    (property) => property.listingType === 'For Rent'
  ).length

  const salePercentage = totalProperties === 0 ? 0: (saleProperties / totalProperties) * 100

  const availableProperties = properties.filter(
    (property) => property.status === 'Available'
  ).length

  const soldProperties = properties.filter(
    (property) => property.status === 'Sold'
  ).length

  const rentedProperties = properties.filter(
    (property) => property.status === 'Rented'
  ).length

  const totalInquiries = inquiries.length

  // Sale vs Rent chart data
  const listingChartData = [
    {
      name: 'For Sale',
      value: saleProperties
    },
    {
      name: 'For Rent',
      value: rentProperties
    }
  ]

  // Property type chart data
  const propertyTypes = [
    'House',
    'Apartment',
    'Duplex',
    'Bungalow',
    'Villa',
    'Townhouse',
    'Penthouse',
    'Land'
  ]

  const propertyTypeData = propertyTypes
    .map((type) => ({
      name: type,
      value: properties.filter(
        (property) => property.propertyType === type
      ).length
    }))
    .filter((type) => type.value > 0)

  const recentProperties = properties
    .slice(-5)
    .reverse()

  const recentInquiries = inquiries.slice(0, 5)

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="dashboard-content">

        {/* Dashboard Header */}

        <div className="dashboard-top">
          <div>
            <p className="small-title">ADMIN DASHBOARD</p>

            <h1>Dashboard</h1>

            <p>
              Welcome back. Here is an overview of your properties.
            </p>
          </div>

          <button
            type="button"
            className="refresh-btn"
            onClick={fetchDashboardData}
            title="Refresh dashboard"
          >
            <RefreshCw size={18} />
          </button>
        </div>


        {/* Statistics */}

        <div className="property-summary">

          <div className="summary-card">
            <div className="summary-icon">
              <Building2 size={22} />
            </div>

            <div>
              <p>Total Properties</p>

              <h2>
                {loading ? '...' : totalProperties}
              </h2>
            </div>
          </div>


          <div className="summary-card">
            <div className="summary-icon">
              <Home size={22} />
            </div>

            <div>
              <p>For Sale</p>

              <h2>
                {loading ? '...' : saleProperties}
              </h2>
            </div>
          </div>


          <div className="summary-card">
            <div className="summary-icon">
              <KeyRound size={22} />
            </div>

            <div>
              <p>For Rent</p>

              <h2>
                {loading ? '...' : rentProperties}
              </h2>
            </div>
          </div>


          <div className="summary-card">
            <div className="summary-icon">
              <MessageSquare size={22} />
            </div>

            <div>
              <p>Inquiries</p>

              <h2>
                {loading ? '...' : totalInquiries}
              </h2>
            </div>
          </div>

        </div>


        {/* Property Status */}

        <div className="dashboard-status-row">

          <div className="mini-stat">
            <div className="mini-stat-icon">
              <CheckCircle size={19} />
            </div>

            <div>
              <span>Available</span>
              <strong>{loading ? '...' : availableProperties}</strong>
            </div>
          </div>


          <div className="mini-stat">
            <div className="mini-stat-icon">
              <Home size={19} />
            </div>

            <div>
              <span>Sold</span>
              <strong>{loading ? '...' : soldProperties}</strong>
            </div>
          </div>


          <div className="mini-stat">
            <div className="mini-stat-icon">
              <KeyRound size={19} />
            </div>

            <div>
              <span>Rented</span>
              <strong>{loading ? '...' : rentedProperties}</strong>
            </div>
          </div>

        </div>


        {/* Analytics */}

        <div className="dashboard-section">

          <div className="section-header">
            <div>
              <h2>Property Analytics</h2>

              <p>
                Overview of your property listings.
              </p>
            </div>
          </div>


          <div className="analytics-grid">

            {/* Sale vs Rent */}

            <div className="analytics-card">

              <div className="analytics-card-header">
                <div>
                  <h3>Listing Type</h3>

                  <p>Sale vs rental properties</p>
                </div>
              </div>


              {loading ? (
                <div className="analytics-empty">
                  <RefreshCw
                    size={25}
                    className="loading-icon"
                  />
                  <p>Loading analytics...</p>
                </div>
              ) : totalProperties === 0 ? (
                <div className="analytics-empty">
                  <Building2 size={35} />
                  <p>No property data yet.</p>
                </div>
              ) : (
                <div className="listing-chart">

                  <div className="chart-circle" style={{
                     background: `conic-gradient(
                       #222 0% ${salePercentage}%,     #d1d1d1 ${salePercentage}% 100%  )` }}>
                    <div>
                    <strong>{totalProperties}</strong>
                      <span>Properties</span></div>
                            </div>

                  <div className="chart-legend">

                    <div>
                      <span className="legend-dot sale-dot"></span>

                      <span>For Sale</span>

                      <strong>{saleProperties}</strong>
                    </div>

                    <div>
                      <span className="legend-dot rent-dot"></span>

                      <span>For Rent</span>

                      <strong>{rentProperties}</strong>
                    </div>

                  </div>

                </div>
              )}

            </div>


            {/* Property Types */}

            <div className="analytics-card">

              <div className="analytics-card-header">
                <div>
                  <h3>Property Types</h3>

                  <p>Distribution of your properties</p>
                </div>
              </div>


              {loading ? (
                <div className="analytics-empty">
                  <RefreshCw
                    size={25}
                    className="loading-icon"
                  />
                  <p>Loading analytics...</p>
                </div>
              ) : propertyTypeData.length === 0 ? (
                <div className="analytics-empty">
                  <Building2 size={35} />
                  <p>No property types yet.</p>
                </div>
              ) : (
                <div className="type-chart">

                  {propertyTypeData.map((type) => (
                    <div
                      className="type-chart-row"
                      key={type.name}
                    >
                      <div className="type-chart-label">
                        <span>{type.name}</span>

                        <strong>{type.value}</strong>
                      </div>

                      <div className="type-chart-bar">
                        <div
                          className="type-chart-fill"
                          style={{
                            width: `${Math.max(
                              (type.value / totalProperties) * 100,
                              8
                            )}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>

          </div>

        </div>


        {/* Quick Actions */}

        <div className="dashboard-section">

          <div className="section-header">
            <div>
              <h2>Quick Actions</h2>

              <p>
                Manage your properties quickly.
              </p>
            </div>
          </div>


          <div className="quick-actions">

            <Link
              to="/add-property"
              className="quick-action"
            >
              <Plus size={20} />

              <span>Add Property</span>
            </Link>


            <Link
              to="/admin/properties"
              className="quick-action"
            >
              <Building2 size={20} />

              <span>Manage Properties</span>
            </Link>


            <Link
              to="/inquiries"
              className="quick-action"
            >
              <MessageSquare size={20} />

              <span>View Inquiries</span>
            </Link>

          </div>

        </div>


        {/* Recent Properties */}

        <div className="dashboard-section">

          <div className="section-header">

            <div>
              <h2>Recent Properties</h2>

              <p>
                Your latest properties.
              </p>
            </div>

            <Link to="/admin/properties">
              View All
            </Link>

          </div>


          <div className="table-container">

            {loading ? (

              <div className="property-state">

                <RefreshCw
                  size={25}
                  className="loading-icon"
                />

                <p>Loading properties...</p>

              </div>

            ) : recentProperties.length === 0 ? (

              <div className="property-state">

                <Building2 size={35} />

                <h3>No properties yet</h3>

                <p>
                  Add your first property to see it here.
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
                    <th>Listing</th>
                    <th>Status</th>
                  </tr>

                </thead>


                <tbody>

                  {recentProperties.map(
                    (property) => (

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
                            ₦{Number(
                              property.price
                            ).toLocaleString()}
                            {property.listingType === 'For Rent' &&
                              ' / year'}
                          </strong>
                        </td>


                        <td>
                          <span className="listing-badge">
                            {property.listingType || 'For Sale'}
                          </span>
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

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            )}

          </div>

        </div>


        {/* Recent Inquiries */}

        <div className="dashboard-section">

          <div className="section-header">

            <div>
              <h2>Recent Inquiries</h2>

              <p>
                Latest messages from customers.
              </p>
            </div>

            <Link to="/inquiries">
              View All
            </Link>

          </div>


          <div className="recent-inquiries">

            {loading ? (

              <div className="property-state">

                <RefreshCw
                  size={25}
                  className="loading-icon"
                />

                <p>Loading inquiries...</p>

              </div>

            ) : recentInquiries.length === 0 ? (

              <div className="property-state">

                <MessageSquare size={35} />

                <h3>No inquiries yet</h3>

                <p>
                  Customer inquiries will appear here.
                </p>

              </div>

            ) : (

              recentInquiries.map(
                (inquiry) => (

                  <div
                    className="recent-inquiry"
                    key={inquiry._id}
                  >

                    <div className="inquiry-avatar">
                      <User size={18} />
                    </div>


                    <div className="recent-inquiry-info">

                      <strong>
                        {inquiry.name}
                      </strong>

                      <p>
                        {inquiry.message}
                      </p>

                      <small>
                        Interested in:{' '}

                        <strong>
                          {inquiry.property?.title ||
                            'Property'}
                        </strong>
                      </small>

                    </div>


                    <span
                      className={
                        inquiry.status === 'New'
                          ? 'status available'
                          : 'status sold'
                      }
                    >
                      {inquiry.status}
                    </span>

                  </div>

                )
              )

            )}

          </div>

        </div>

      </main>
    </div>
  )
}

export default Dashboard