import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import SearchBar from '../Components/Searchbar'
import { MapPin, BedDouble, Bath } from 'lucide-react'

function Properties() {

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
const [propertyType, setPropertyType] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/property`)
      .then((response) => response.json())
      .then((data) => {
        setProperties(data.properties)
        setLoading(false)
      })
      .catch((error) => {
        console.log('Error fetching properties:', error)
        setLoading(false)
      })
  }, [])

  const filteredProperties = properties.filter((property) => {
  const matchesSearch = property.location
    .toLowerCase()
    .includes(search.toLowerCase())

  const matchesType =
    propertyType === '' ||
    property.propertyType.toLowerCase() === propertyType.toLowerCase()

  return matchesSearch && matchesType
})

  return (
    <div>

      <Navbar />

      <main className="properties-page">

        <div className="properties-header">
          <p className="small-title">OUR PROPERTIES</p>

          <h1>Find Your Perfect Property</h1>

          <p>
            Explore our collection of properties and find a place
            that feels like home.
          </p>
        </div>

        <SearchBar
        search={search}
        setSearch={setSearch}
        propertyType={propertyType}
        setPropertyType={setPropertyType}/>

        {loading ? (
            <p>Loading properties...</p>
          ) : filteredProperties.length === 0 ? (
              <div className="no-properties">
             <h2>No properties found</h2>
            <p>
                Try changing your search or property type.
              </p>
              </div>
        ) : (

          <div className="property-grid">

            {filteredProperties.map((property) => (

              <div className="property-card" key={property._id}>

                <img src={property.image} alt={property.title}
                />

                <div className="property-info">

                  <h2>{property.title}</h2>

                  <p className="location">
                    <MapPin size={16}/> {property.location}
                  </p>

              <h3>
                   ₦{Number(property.price).toLocaleString()}
                  {property.listingType === 'For Rent' && ' / year'}
              </h3>
              <div className="property-listing-info">
                    <span>{property.listingType || 'For Sale'}</span>

                    <span className={ property.status === 'Available'  ? 'status available' : 'status sold' } >
                          {property.status}
                            </span> </div>

                  <div className="property-features">
                    <span> <BedDouble size={16} />{property.bedrooms} Beds</span>
                    <span><Bath size={16} /> {property.bathrooms} Baths</span>
                  </div>

                  <Link
                    to={`/properties/${property._id}`}
                    className="view-btn"
                  >
                    View Property
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  )
}

export default Properties
