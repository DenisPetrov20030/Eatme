import OrderItem from "./OrderItem"
import OrderStatus from "./OrderStatus"
import User from "./User"

export default interface Order {
    id: string
    user: User | {id: string}
    orderStatus: OrderStatus
    createdAt: Date
    orderItems?: OrderItem[]
}