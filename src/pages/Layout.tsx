import { Outlet } from "react-router-dom";
import Header from "@/components/ui/Header";
import { Toaster } from "@/components/ui/sonner";

import { useCart } from "@/hooks/useCart";
const RootLayout = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-0 left-0 bg-white dark:bg-gray-900 text-black dark:text-white p-2 z-50"
      >
        Skip to content
      </a>
      <div
        id="main-content"
        className="flex flex-col min-h-screen dark:text-white dark:bg-gray-800 bg-gray-100 transform transition-colors duration-300"
      >
        <Header cartCount={cartCount} />

        <main className="flex-grow py-8">
          <Outlet />
        </main>
      </div>
      <Toaster
        position="bottom-right"
        richColors
        className="!text-base !leading-relaxed !font-medium"
      />
    </>
  );
};

export default RootLayout;
