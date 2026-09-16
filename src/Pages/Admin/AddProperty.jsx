import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../Components/AdminSidebar'

function AddProperty() {
  const navigate = useNavigate()

  const [property, setProperty] = useState({
    title: '',
    location: '',
    price: '',
    listingType: 'For Sale',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    image: ''
  })

  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setProperty({
      ...property,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)

    try {
      const token = localStorage.getItem('token')

const response = awaitfetch(`${import.meta.env.VITE_API_URL}/api/v1/property`,
   {
    method: 'POST',
    headers: 
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title: property.title,
      location: property.location,
      price: Number(property.price),
      propertyType: property.propertyType,
      listingType: property.listingType,
      bedrooms: Number(property.bedrooms),
      bathrooms: Number(property.bathrooms),
      description: property.description,
      image: property.image
    })
  }
)

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Failed to add property')
        setLoading(false)
        return
      }

      alert('Property added successfully!')

      navigate('/admin/properties')

    } catch (error) {
      console.log('Error adding property:', error)
      alert('Something went wrong. Make sure the backend is running.')
    }

    setLoading(false)
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="dashboard-content">

        <div className="dashboard-top">
          <div>
            <p className="small-title">PROPERTY MANAGEMENT</p>
            <h1>Add Property</h1>
            <p>Add a new property to LuxeNest.</p>
          </div>
        </div>

        <div className="property-form-container">

          <form onSubmit={handleSubmit} className="property-form">

            <div className="form-group">
              <label>Property Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Modern Family House"
                value={property.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Lagos, Nigeria"
                value={property.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="45000000"
                  value={property.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Property Type</label>
                <select
                name="propertyType"value={property.propertyType}onChange={handleChange}required>
              <option value="">Select Property Type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Duplex">Duplex</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Villa">Villa</option>
               <option value="Townhouse">Townhouse</option>
              <option value="Penthouse">Penthouse</option>
                <option value="Land">Land</option>
            </select>
              </div>
                <div className="form-group">
    <label htmlFor="listingType">Listing Type</label>

        <select id="listingType" name="listingType" value={property.listingType} onChange={handleChange}
        required >
        <option value="For Sale">For Sale</option>
        <option value="For Rent">For Rent</option>
      </select>
</div>


       </div>

        <div className="form-row">

          <div className="form-group">
                <label>Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  placeholder="4"
                  value={property.bedrooms}
                  onChange={handleChange}
                  required
                />
          </div>

              <div className="form-group">
                <label>Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  placeholder="3"
                  value={property.bathrooms}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Describe the property..."
                value={property.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                placeholder="https://..."
                value={property.image}
                onChange={handleChange}
              />
            </div>

            <div className="edit-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate('/admin/properties')}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-property-btn"
                disabled={loading}
              >
                {loading ? 'Adding Property...' : 'Add Property'}
              </button>

            </div>

          </form>

        </div>

      </main>
    </div>
  )
}

export default AddProperty
