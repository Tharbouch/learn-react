import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";
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

describe("ProductCard Component", () => {
  // Mock product data
  const mockProduct: Product = {
    id: "1",
    name: "Test Product",
    description: "This is a test product description",
    price: 29.99,
    imageUrl: "https://via.placeholder.com/150",
  };

  // Mock function for onAddToCart prop
  const mockOnAddToCart = vi.fn();

  it("renders the product information correctly", () => {
    renderWithTheme(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    // Check if product name is rendered
    expect(screen.getByText("Test Product")).toBeInTheDocument();

    // Check if price is formatted correctly
    expect(screen.getByText("$29.99")).toBeInTheDocument();

    // Check if description is rendered
    expect(
      screen.getByText("This is a test product description")
    ).toBeInTheDocument();

    // Check if image is rendered with correct alt text
    const image = screen.getByAltText("Test Product");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/150");
  });

  it("calls onAddToCart when the Add to Cart button is clicked", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    // Find the button
    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });
    expect(addToCartButton).toBeInTheDocument();

    // Click the button
    await user.click(addToCartButton);

    // Verify the onAddToCart function was called with the correct product
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("renders the ShoppingCart icon", () => {
    renderWithTheme(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    // Since Lucide icons might be hard to test directly, we can check if the button
    // contains an SVG element (the icon)
    const button = screen.getByRole("button", { name: /add to cart/i });
    const svg = button.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
