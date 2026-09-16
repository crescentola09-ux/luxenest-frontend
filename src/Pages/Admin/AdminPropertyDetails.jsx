import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Pencil,
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Tag
} from 'lucide-react'

import AdminSidebar from '../../Components/AdminSidebar'

function AdminPropertyDetails() {
  const { id } = useParams()

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/property/${id}`)

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Property not found')
        }

        setProperty(data.property)
      } catch (error) {
        console.log('Error fetching property:', error)
      }

      setLoading(false)
    }

    fetchProperty()
  }, [id])

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar />

        <main className="dashboard-content">
          <div className="property-state">
            <p>Loading property...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="admin-layout">
        <AdminSidebar />

        <main className="dashboard-content">

          <div className="property-state">

            <Building2 size={40} />

            <h2>Property Not Found</h2>

            <p>
              We could not find this property.
            </p>

            <Link
              to="/admin/properties"
              className="add-property-btn"
            >
              <ArrowLeft size={18} />
              Back to Properties
            </Link>

          </div>

        </main>
      </div>
    )
  }

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="dashboard-content">

        <Link
          to="/admin/properties"
          className="back-btn"
        >
          <ArrowLeft size={17} />
          Back to Properties
        </Link>


        <div className="admin-details-header">

          <div>

            <p className="small-title">
              PROPERTY DETAILS
            </p>

            <h1>{property.title}</h1>

            <p className="admin-details-location">
              <MapPin size={16} />
              {property.location}
            </p>

          </div>


          <Link
            to={`/admin/properties/edit/${property._id}`}
            className="add-property-btn"
          >
            <Pencil size={17} />
            Edit Property
          </Link>

        </div>


        <div className="admin-details-container">

          <div className="admin-details-image">

            {property.image ? (
              <img
                src={property.image}
                alt={property.title}
              />
            ) : (
              <div className="admin-details-placeholder">
                <Building2 size={50} />
                <p>No image available</p>
              </div>
            )}

          </div>


          <div className="admin-details-content">

            <div className="admin-details-price">
              ₦{Number(property.price).toLocaleString()}
            </div>


            <div className="admin-details-status">

              <span
                className={
                  property.status === 'Available'
                    ? 'status available'
                    : 'status sold'
                }
              >
                {property.status}
              </span>

            </div>


            <div className="admin-details-features">

              <div>
                <BedDouble size={21} />
                <strong>{property.bedrooms}</strong>
                <span>Bedrooms</span>
              </div>

              <div>
                <Bath size={21} />
                <strong>{property.bathrooms}</strong>
                <span>Bathrooms</span>
              </div>

              <div>
                <Tag size={21} />
                <strong>{property.propertyType}</strong>
                <span>Type</span>
              </div>

            </div>


            <div className="admin-details-description">

              <h2>Description</h2>

              <p>
                {property.description}
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default AdminPropertyDetails