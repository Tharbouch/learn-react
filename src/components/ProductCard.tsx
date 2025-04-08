import { Product } from "@/types/Product";
import { CartItem } from "@/types/CartItem";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: CartItem) => void;
}) => {
  return (
    <article
      className="h-full min-h-96 bg-white dark:bg-gray-600 rounded-lg shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-2"
      aria-label={`Product card for ${product.name}`}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-700 dark:text-gray-200 text-ellipsis overflow-hidden whitespace-nowrap">
          {product.description}
        </p>
        <p className="text-lg font-bold">${product.price}</p>
      </div>
      <div className="flex justify-between items-center p-4">
        <button
          className="bg-blue-500 dark:bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors duration-300"
          onClick={() => onAddToCart({ ...product, quantity: 1 })}
        >
          <ShoppingCart className="inline mr-2" size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
