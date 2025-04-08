import { useState, useEffect } from "react";
import { toast } from "sonner";

import ProductList from "@/components/ProductList";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

import { Product } from "@/types/Product";
import { CartItem } from "@/types/CartItem";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: CartItem) => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart((prevCart) => [...prevCart, product]);
      toast.success(`${product.name} added to cart!`, {
        description: "Go to checkout to complete your purchase",
        duration: 2000,
      });
    } else {
      const previousProductQuantity =
        cart.find((item) => item.id === product.id)?.quantity || 0;
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      toast.info(
        `${product.name} is increased to ${
          previousProductQuantity + 1
        } in cart!`,
        {
          description: "View your cart to modify quantities",
          duration: 2000,
        }
      );
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/products");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching products"
        );
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-0 left-0 bg-white dark:bg-gray-900 text-black dark:text-white p-2 z-50"
      >
        Skip to content
      </a>
      <div
        id="main-content"
        className="flex flex-col min-h-screen dark:text-white dark:bg-gray-800 bg-gray-100"
      >
        <Header cartCount={cart.length} />

        <main className="flex-grow py-8">
          <section
            aria-labelledby="products-heading"
            className="container mx-auto px-4"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Our Products
            </h2>

            {error && (
              <p className="text-red-500 text-center">Error: {error}</p>
            )}

            {loading ? (
              <p className="text-center" role="status" aria-live="polite">
                Loading products...
              </p>
            ) : (
              <ProductList products={products} onAddToCart={handleAddToCart} />
            )}
          </section>
          <Toaster
            position="bottom-right"
            richColors
            className="!text-base !leading-relaxed !font-medium"
          />
        </main>
      </div>
    </>
  );
}

export default App;
