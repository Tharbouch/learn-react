import { Product } from "@/types/Product";
import { CartItem } from "@/types/CartItem";

import ProductCard from "./ProductCard";

const ProductList = ({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (product: CartItem) => void;
}) => {
  return (
    <>
      {products.length === 0 ? (
        <div
          data-testid="no-products-message"
          className="w-full text-center py-8"
        >
          <p className="text-lg text-gray-500">No products found</p>
        </div>
      ) : (
        <div
          data-testid="product-list-container"
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
