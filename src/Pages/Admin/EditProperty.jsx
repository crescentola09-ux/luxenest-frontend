import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminSidebar from '../../Components/AdminSidebar'

function EditProperty() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [property, setProperty] = useState({
    title: '',
    location: '',
    price: '',
    propertyType: 'House',
    listingType: 'For Sale',
    bedrooms: '',
    bathrooms: '',
    image: '',
    description: '',
    status: 'Available'
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Get the property from MongoDB
  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/property/${id}`)

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Property not found')
        }

        setProperty({
          title: data.property.title || '',
          location: data.property.location || '',
          price: data.property.price || '',
          propertyType: data.property.propertyType || 'House',
          listingType: data.property.listingType || 'For Sale',
          bedrooms: data.property.bedrooms || '',
          bathrooms: data.property.bathrooms || '',
          image: data.property.image || '',
          description: data.property.description || '',
          status: data.property.status || 'Available'
        })
      } catch (error) {
        console.log('Error fetching property:', error)
      }

      setLoading(false)
    }

    fetchProperty()
  }, [id])

function handleChange(event) {
    const { name, value } = event.target

    if (name === 'listingType') {
        setProperty({
            ...property,
            listingType: value,
            status: 'Available'
        })
        return
    }

    setProperty({
        ...property,
        [name]: value
    })
}

  async function handleSubmit(event) {
    event.preventDefault()

    setSaving(true)

    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/property/${id}`, 
        {
          method: 'PUT',
          headers: {
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
            image: property.image,
            description: property.description,
            status: property.status
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Failed to update property')
        setSaving(false)
        return
      }

      alert('Property updated successfully!')

      navigate('/admin/properties')
    } catch (error) {
      console.log('Error updating property:', error)
      alert('Something went wrong while updating the property.')
    }

    setSaving(false)
  }

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

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="dashboard-content">

        <div className="add-property-header">
          <p className="small-title">PROPERTY MANAGEMENT</p>

          <h1>Edit Property</h1>

          <p>
            Update the information for this property.
          </p>
        </div>


        <form
          className="property-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label htmlFor="title">
              Property Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              value={property.title}
              onChange={handleChange}
              required
            />

          </div>


          <div className="form-row">

            <div className="form-group">

              <label htmlFor="location">
                Location
              </label>

              <input
                id="location" type="text" name="location"
                value={property.location}
                onChange={handleChange}
                required/>

            </div>


            <div className="form-group">

              <label htmlFor="price">
                Price
              </label>

              <input id="price" type="number" name="price"
                value={property.price}
                onChange={handleChange}
                required/>

            </div>

          </div>


          <div className="form-row">

            <div className="form-group">

              <label htmlFor="propertyType">
                Property Type
              </label>

              <select
                id="propertyType"
                name="propertyType"
                value={property.propertyType}
                onChange={handleChange}
                required
              >
                <option value="House">
                  House
                </option>

                <option value="Apartment">
                  Apartment
                </option>

                <option value="Villa">
                  Villa
                </option>
              </select>

            </div>

         

            <div className="form-group">

              <label htmlFor="bedrooms">
                Bedrooms
              </label>

              <input id="bedrooms"  type="number"
                min="0"
                name="bedrooms"
                value={property.bedrooms}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="bathrooms">
                Bathrooms
              </label>

              <input
                id="bathrooms"
                type="number"
                min="0"
                name="bathrooms"
                value={property.bathrooms}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          <div className="form-group">

            <label htmlFor="status">
              Status
            </label>

           <select id="status"  name="status" value={property.status} onChange={handleChange}  required>
        <option value="Available">Available</option>

          {property.listingType === 'For Sale' ? (
        <option value="Sold">Sold</option>
          ) : (
        <option value="Rented">Rented</option>
    )}
</select>

          </div>


          <div className="form-group">

            <label htmlFor="image">
              Image URL
            </label>

            <input
              id="image"
              type="url"
              name="image"
              placeholder="Paste property image URL"
              value={property.image}
              onChange={handleChange}
            />

          </div>


          <div className="form-group">

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="6"
              value={property.description}
              onChange={handleChange}
              required
            ></textarea>

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
              disabled={saving}
            >
              {saving ? 'Saving Changes...' : 'Save Changes'}
            </button>

          </div>

        </form>

      </main>
    </div>
  )
}

export default EditProperty
