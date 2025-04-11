import { useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

import { CartContext } from "@/hooks/useCart";
import { CartItem } from "@/types/CartItem";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : []
  );

  const addToCart = (product: CartItem) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (!existingItem) {
      setCart((prev) => [...prev, product]);

      toast.success(`${product.name} added to cart!`, {
        description: "Go to checkout to complete your purchase",
        duration: 2000,
      });
    } else {
      const previousQuantity = existingItem.quantity;
      updateQuantity(Number(product.id), previousQuantity + 1);
      toast.info(
        `${product.name} is increased to ${previousQuantity + 1} in cart!`,
        {
          description: "View your cart to modify quantities",
          duration: 2000,
        }
      );
    }
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => Number(item.id) !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        Number(item.id) === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
