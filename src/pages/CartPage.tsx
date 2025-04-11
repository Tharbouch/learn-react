import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  MinusCircle,
  PlusCircle,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      // Could redirect to a success page here
    }, 2000);
  };

  // Empty cart view
  if (cart.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      <div className="mb-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b dark:border-gray-700 py-4"
          >
            <div className="flex items-center gap-4">
              {item.imageUrl && (
                <div className="w-16 h-16 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button
                  disabled={item.quantity <= 1}
                  onClick={() =>
                    updateQuantity(Number(item.id), item.quantity - 1)
                  }
                  aria-label="Decrease quantity"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <MinusCircle size={18} />
                </button>

                <span className="w-8 text-center">{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(Number(item.id), item.quantity + 1)
                  }
                  aria-label="Increase quantity"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <PlusCircle size={18} />
                </button>
              </div>

              <div className="text-right w-20 font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => removeFromCart(Number(item.id))}
                aria-label="Remove item"
                className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-start md:items-center">
        <button
          onClick={clearCart}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
        >
          <Trash2 size={16} />
          Clear Cart
        </button>

        <div className="md:text-right">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Subtotal:
              </span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to="/"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-blue-700 hover:text-white dark:hover:bg-gray-700 transition"
            >
              Continue Shopping
            </Link>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition ${
                isCheckingOut ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
