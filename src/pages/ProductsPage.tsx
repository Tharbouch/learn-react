import { useState, useEffect } from "react";

import ProductList from "@/components/ProductList";
import CardSkeleton from "@/components/ui/cardSkeleton";

import { Product } from "@/types/Product";

import { useCart } from "@/hooks/useCart";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

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
    <section
      aria-labelledby="products-heading"
      className="container mx-auto px-4"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>

      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }, (_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <ProductList products={products} onAddToCart={addToCart} />
      )}
    </section>
  );
};
export default ProductsPage;
