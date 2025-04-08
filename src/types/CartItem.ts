import { Product } from "./Product";

export interface CartItem extends Product {
  id: number;
  quantity: number;
}
