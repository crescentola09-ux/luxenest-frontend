import { Search } from 'lucide-react'

function SearchBar({ search, setSearch, propertyType, setPropertyType }) {
  return (
    <div className="search-area">

      <div className="search-input">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search by location..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <select
        value={propertyType}
        onChange={(event) => setPropertyType(event.target.value)}
      >
        <option value="">Property Type</option>
        <option value="House">House</option>
        <option value="Apartment">Apartment</option>
        <option value="Villa">Villa</option>
      </select>

      <button type="button">
        Search
      </button>

    </div>
  )
}

export default SearchBar