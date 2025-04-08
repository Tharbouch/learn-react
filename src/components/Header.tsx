import { ShoppingCart } from "lucide-react";
const Header = ({ cartCount }: { cartCount: number }) => {
  return (
    <header className="bg-white shadow-md w-full px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-center py-4">
          My E-commerce Store
        </h1>
        <div className="flex items-center p-2 space-x-4">
          <a href="#" className="relative p-4 cursor-pointer">
            <ShoppingCart size={30} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold  rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </header>
  );
};
export default Header;
