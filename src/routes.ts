import { createBrowserRouter } from "react-router-dom";
import ProductsPage from "@/pages/ProductsPage";
import CartPage from "@/pages/CartPage";
import RootLayout from "@/pages/Layout";
const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: ProductsPage,
      },
      {
        path: "/cart",
        Component: CartPage,
      },
    ],
  },
]);

export default router;
