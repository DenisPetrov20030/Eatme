import { Product } from "@/types/products/Product"
import { Cart } from "./Cart"

export interface CartItem {
    id: string
    cart?: Cart | {
        id: string
    }
    product: Product | {
        id : string
    }
    quantity: number
}
