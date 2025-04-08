import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductList from "../components/ProductList";
import { Product } from "../types/Product";
import { ThemeProvider } from "@/context/ThemProvider";

beforeAll(() => {
  // Create mock for window.matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("ProductList Component", () => {
  // Mock product data
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      price: 19.99,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Product 2",
      description: "Description 2",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Product 3",
      description: "Description 3",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  // Mock function for onAddToCart prop
  const mockOnAddToCart = vi.fn();

  it("renders a list of products correctly", () => {
    renderWithTheme(
      <ProductList products={mockProducts} onAddToCart={mockOnAddToCart} />
    );

    // Check if all product names are rendered
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();

    // Check if all prices are rendered
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("$39.99")).toBeInTheDocument();

    // Check if all images are rendered
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
  });

  it("displays a message when no products are available", () => {
    renderWithTheme(
      <ProductList products={[]} onAddToCart={mockOnAddToCart} />
    );

    // Check if empty state message is displayed
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it("renders a grid layout for products", () => {
    renderWithTheme(
      <ProductList products={mockProducts} onAddToCart={mockOnAddToCart} />
    );

    // Check if the container has the appropriate grid classes
    const container = screen.getByTestId("product-list-container");
    expect(container).toHaveClass("grid");

    // Check if we have the correct number of product cards
    const productCards = container.children;
    expect(productCards.length).toBe(3);
  });
});
