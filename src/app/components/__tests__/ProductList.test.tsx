// src/app/components/__tests__/ProductList.test.tsx
import { fireEvent, render } from "@testing-library/react"
import { Product } from "../../api/products"
import { CartProvider } from "../../context/CartContext"
import ProductList from "../ProductList"

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />
  },
}))

// Mock the next/link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href}>{children}</a>,
}))

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Test Product",
    price: 10,
    description: "This is a test product",
    category: "Test Category",
    image: "https://example.com/image.jpg",
  },
]

describe("ProductList", () => {
  it("renders products correctly", () => {
    const { getByText, getByAltText } = render(
      <CartProvider>
        <ProductList products={mockProducts} />
      </CartProvider>
    )

    expect(getByText("Test Product")).toBeInTheDocument()
    expect(getByText("$10.00")).toBeInTheDocument()
    expect(getByText("This is a test product...")).toBeInTheDocument()
    expect(getByAltText("Test Product")).toBeInTheDocument()
  })

  it('calls addToCart when "Add to Cart" button is clicked', () => {
    const { getByText } = render(
      <CartProvider>
        <ProductList products={mockProducts} />
      </CartProvider>
    )

    fireEvent.click(getByText("Add to Cart"))
  })

  it("renders placeholder image when product image is not provided", () => {
    const productsWithoutImage = [{ ...mockProducts[0], image: "" }]
    const { getByAltText } = render(
      <CartProvider>
        <ProductList products={productsWithoutImage} />
      </CartProvider>
    )

    const img = getByAltText("Test Product")
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("https://picsum.photos/seed/1/400/300")
    )
  })

  it("truncates long product descriptions", () => {
    const longDescription =
      "This is a very long product description that should be truncated in the UI"
    const productsWithLongDescription = [
      { ...mockProducts[0], description: longDescription },
    ]
    const { getByText } = render(
      <CartProvider>
        <ProductList products={productsWithLongDescription} />
      </CartProvider>
    )

    expect(
      getByText(`${longDescription.substring(0, 100)}...`)
    ).toBeInTheDocument()
  })
})
