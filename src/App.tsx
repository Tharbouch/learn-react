import { RouterProvider } from "react-router";
import { CartProvider } from "@/context/CartProvider";
import router from "./routes";

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
