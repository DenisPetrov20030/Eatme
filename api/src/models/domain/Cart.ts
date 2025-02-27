import CartItem from "./CartItem"
import User from "./User"

export default interface Cart {
    id: string
    items: CartItem[]
    user: User | {id: string}
    dateCreated: Date
}