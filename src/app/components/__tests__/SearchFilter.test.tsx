import { fireEvent, render } from "@testing-library/react"
import SearchFilter from "../SearchFilter"

describe("SearchFilter", () => {
  const mockSetQuery = jest.fn()
  const mockSetCategory = jest.fn()
  const categories = ["Electronics", "Clothing", "Books"]

  it("renders correctly", () => {
    const { getByPlaceholderText, getByRole } = render(
      <SearchFilter
        query=""
        setQuery={mockSetQuery}
        category=""
        setCategory={mockSetCategory}
        categories={categories}
      />
    )

    expect(getByPlaceholderText("Search products...")).toBeInTheDocument()
    expect(getByRole("combobox")).toBeInTheDocument()
  })

  it("calls setQuery when input changes", () => {
    const { getByPlaceholderText } = render(
      <SearchFilter
        query=""
        setQuery={mockSetQuery}
        category=""
        setCategory={mockSetCategory}
        categories={categories}
      />
    )

    fireEvent.change(getByPlaceholderText("Search products..."), {
      target: { value: "test" },
    })
    expect(mockSetQuery).toHaveBeenCalledWith("test")
  })

  it("calls setCategory when select changes", () => {
    const { getByRole } = render(
      <SearchFilter
        query=""
        setQuery={mockSetQuery}
        category=""
        setCategory={mockSetCategory}
        categories={categories}
      />
    )

    fireEvent.change(getByRole("combobox"), {
      target: { value: "Electronics" },
    })
    expect(mockSetCategory).toHaveBeenCalledWith("Electronics")
  })

  it("renders all categories", () => {
    const { getByRole } = render(
      <SearchFilter
        query=""
        setQuery={mockSetQuery}
        category=""
        setCategory={mockSetCategory}
        categories={categories}
      />
    )

    const select = getByRole("combobox")
    expect(select.children.length).toBe(categories.length + 1) // +1 for the "All Categories" option
  })
})
