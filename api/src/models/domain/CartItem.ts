import Cart from "./Cart"
import Product from "./Product"

export default interface CartItem {
    id: string
    cart: Cart | {id: string}
    product: Product
    quantity: number
}