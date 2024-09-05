import { act, render, RenderResult } from "@testing-library/react"
import { Product } from "../../api/products"
import { CartProvider, useCart } from "../CartContext"

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0,
} as Storage

Object.defineProperty(window, "localStorage", { value: localStorageMock })

const TestComponent: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useCart()
  return (
    <div>
      <span data-testid="cart-size">{cart.length}</span>
      <button
        onClick={() =>
          addToCart({ id: 1, name: "Test Product", price: 10 } as Product)
        }
      >
        Add to Cart
      </button>
      <button onClick={() => removeFromCart(1)}>Remove from Cart</button>
    </div>
  )
}

describe("CartContext", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.clear()
  })

  it("provides cart functionality", () => {
    const { getByTestId, getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    expect(getByTestId("cart-size").textContent).toBe("0")

    act(() => {
      getByText("Add to Cart").click()
    })

    expect(getByTestId("cart-size").textContent).toBe("1")

    act(() => {
      getByText("Remove from Cart").click()
    })

    expect(getByTestId("cart-size").textContent).toBe("0")
  })

  it("loads cart from localStorage on mount", async () => {
    ;(localStorageMock.getItem as jest.Mock).mockReturnValueOnce(
      JSON.stringify([{ id: 1, name: "Saved Product", price: 20, quantity: 1 }])
    )

    const { getByTestId } = await act(async () =>
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )
    )

    expect(getByTestId("cart-size").textContent).toBe("1")
  })

  it("saves cart to localStorage when updated", async () => {
    let result: RenderResult
    await act(async () => {
      result = render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )
    })

    await act(async () => {
      result.getByText("Add to Cart").click()
    })

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([{ id: 1, name: "Test Product", price: 10, quantity: 1 }])
    )
  })
})
