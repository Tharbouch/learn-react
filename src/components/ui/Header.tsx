import { ShoppingCart, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { NavLink } from "react-router";

const Header = ({ cartCount }: { cartCount: number }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-700  shadow-md w-full px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-center py-4">
            My E-commerce Store
          </h1>
        </NavLink>
        <div className="flex items-center p-2 space-x-4">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
          >
            {theme === "light" ? (
              <Moon size={30} className="text-gray-800" />
            ) : (
              <Sun size={30} className="text-yellow-500" />
            )}
          </button>
          <NavLink to="/cart" className="relative p-4 cursor-pointer">
            <span className="sr-only">Shopping Cart</span>
            <ShoppingCart size={30} />
            {cartCount > 0 && (
              <span
                aria-label={`${cartCount} items in cart`}
                role="status"
                className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold  rounded-full px-2 py-1"
              >
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
export default Header;
