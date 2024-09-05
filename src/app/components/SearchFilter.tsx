import React from "react"

interface SearchFilterProps {
  query: string
  setQuery: (query: string) => void
  category: string
  setCategory: (category: string) => void
  categories: string[]
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  query,
  setQuery,
  category,
  setCategory,
  categories,
}) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SearchFilter
