import Product from "./Product"
import User from "./User"

export default interface Comment {
    id: string
    user: User | {id: string}
    product: Product | {id: string}
    comment: string
    rating: number
    datePosted: Date
}