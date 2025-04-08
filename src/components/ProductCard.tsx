import { Product } from "@/types/Product";
import { CartItem } from "@/types/CartItem";
const ProductCard = ({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: CartItem) => void;
}) => {
  return (
    <div className="h-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-2">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-700 text-ellipsis overflow-hidden whitespace-nowrap">
          {product.description}
        </p>
        <p className="text-lg font-bold">${product.price}</p>
      </div>
      <div className="flex justify-between items-center p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => onAddToCart({ ...product, quantity: 1 })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
