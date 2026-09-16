import { useEffect, useState } from 'react'
import {
  MessageSquare,
  RefreshCw,
  User,
  Mail,
  Phone,
  Building2
} from 'lucide-react'

import AdminSidebar from '../../Components/AdminSidebar'

function Inquiries() {

  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchInquiries() {
    setLoading(true)


        const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/inquiry/new`, 
        {
            headers: {
            Authorization: `Bearer ${token}`
                  }
        }
            )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to fetch inquiries'
        )
      }

      setInquiries(data.inquiries || [])

    } catch (error) {
      console.log('Error fetching inquiries:', error)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="dashboard-content">

        {/* Header */}

        <div className="dashboard-top">

          <div>
            <p className="small-title">
              CUSTOMER COMMUNICATION
            </p>

            <h1>Inquiries</h1>

            <p>
              View and manage inquiries from potential customers.
            </p>
          </div>

          <button
            type="button"
            className="refresh-btn"
            onClick={fetchInquiries}
            title="Refresh inquiries"
          >
            <RefreshCw size={18} />
          </button>

        </div>

        {/* Summary */}

        <div className="property-summary">

          <div className="summary-card">

            <div className="summary-icon">
              <MessageSquare size={22} />
            </div>

            <div>
              <p>Total Inquiries</p>
              <h2>
                {loading ? '...' : inquiries.length}
              </h2>
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon">
              <MessageSquare size={22} />
            </div>

            <div>
              <p>New Inquiries</p>

              <h2>
                {loading
                  ? '...'
                  : inquiries.filter(
                      (inquiry) => inquiry.status === 'New'
                    ).length}
              </h2>
            </div>

          </div>

        </div>

        {/* Inquiry List */}

        <div className="dashboard-section">

          <div className="section-header">

            <div>
              <h2>Customer Inquiries</h2>

              <p>
                Messages from people interested in your properties.
              </p>
            </div>

          </div>

          <div className="inquiries-list">

            {loading ? (

              <div className="property-state">

                <RefreshCw
                  size={25}
                  className="loading-icon"
                />

                <p>Loading inquiries...</p>

              </div>

            ) : inquiries.length === 0 ? (

              <div className="property-state">

                <MessageSquare size={40} />

                <h3>No inquiries yet</h3>

                <p>
                  Customer inquiries will appear here.
                </p>

              </div>

            ) : (

              inquiries.map((inquiry) => (

                <div
                  className="inquiry-card"
                  key={inquiry._id}
                >

                  <div className="inquiry-card-header">

                    <div>
                      <h3>{inquiry.name}</h3>

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

                    <small>
                      {new Date(
                        inquiry.createdAt
                      ).toLocaleDateString()}
                    </small>

                  </div>

                  <div className="inquiry-contact">

                    <span>
                      <Mail size={16} />
                      {inquiry.email}
                    </span>

                    <span>
                      <Phone size={16} />
                      {inquiry.phone}
                    </span>

                  </div>

                  <div className="inquiry-property">

                    <Building2 size={18} />

                    <div>
                      <strong>
                        {inquiry.property?.title ||
                          'Property information unavailable'}
                      </strong>

                      <p>
                        {inquiry.property?.location || ''}
                      </p>
                    </div>

                  </div>

                  <div className="inquiry-message">

                    <p>
                      {inquiry.message}
                    </p>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </main>

    </div>
  )
}

export default Inquiries