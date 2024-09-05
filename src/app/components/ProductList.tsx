import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Product } from "../api/products"
import { useCart } from "../context/CartContext"

interface ProductListProps {
  products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addToCart } = useCart()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
        >
          <Link href={`/products/${product.id}`} className="block">
            <div className="relative h-48 bg-gray-200">
              <Image
                src={
                  product.image ||
                  `https://picsum.photos/seed/${product.id}/400/300`
                }
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 font-bold mb-2">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {product.description.substring(0, 100)}...
              </p>
            </div>
          </Link>
          <div className="px-4 pb-4">
            <button
              onClick={() => addToCart(product)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
