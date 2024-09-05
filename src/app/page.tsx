"use client"

import { useCallback, useEffect, useState } from "react"
import { Product } from "./api/products"
import ProductList from "./components/ProductList"
import SearchFilter from "./components/SearchFilter"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState<string[]>([])

  const fetchProducts = useCallback(async () => {
    const res = await fetch(
      `/api/products?query=${query}&category=${category}&page=${page}`
    )
    const data = await res.json()
    setProducts(data.products)
    setTotalPages(data.totalPages)

    if (categories.length === 0) {
      const uniqueCategories = Array.from(
        new Set(data.products.map((p: Product) => p.category))
      )
      setCategories(
        uniqueCategories.filter((cat): cat is string => typeof cat === "string")
      )
    }
  }, [query, category, page, categories.length])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
      <SearchFilter
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />
      <ProductList products={products} />
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </main>
  )
}
