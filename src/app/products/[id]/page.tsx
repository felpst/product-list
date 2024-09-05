"use client"

import { Product } from "@/app/api/products"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useCart } from "../../context/CartContext"

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null)
  const params = useParams()
  const { id } = params
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`)
      const data = await res.json()
      setProduct(data)
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 relative aspect-square">
          <Image
            src={
              product.image ||
              `https://picsum.photos/seed/${product.id}/500/500`
            }
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            Category: {product.category}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
