import { useState, useEffect } from "react";
import ProductList from "@/components/ProductList";
import { Product } from "@/types/Product";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
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
    <div className="flex flex-col min-h-screen">
      <Header cartCount={cart.length} />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6 text-center">Our Products</h1>

          {error && <p className="text-red-500 text-center">Error: {error}</p>}

          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : (
            <ProductList products={products} onAddToCart={handleAddToCart} />
          )}
        </div>
        <Toaster position="bottom-right" richColors />
      </main>
    </div>
  );
}

export default App;
