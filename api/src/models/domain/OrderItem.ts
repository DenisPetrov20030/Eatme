import Order from "./Order"
import Product from "./Product"

export default interface OrderItem {
    id: string
    product: Product | {id: string}
    order: Order | {id: string}
    price: number
    quantity: number
}