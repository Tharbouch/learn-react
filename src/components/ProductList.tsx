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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
