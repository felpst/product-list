import { NextResponse } from "next/server"
import { products } from "../products"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")?.toLowerCase() || ""
  const category = searchParams.get("category") || ""
  const page = parseInt(searchParams.get("page") || "1")
  const limit = 10

  let filteredProducts = products

  if (query) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    )
  }

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    )
  }

  const totalPages = Math.ceil(filteredProducts.length / limit)
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedProducts = filteredProducts.slice(start, end)

  return NextResponse.json({
    products: paginatedProducts,
    totalPages,
    currentPage: page,
  })
}
