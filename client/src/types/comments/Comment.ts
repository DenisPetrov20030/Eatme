import { Product } from "../products/Product"
import { UserShort } from "../users/UserShort"

export default interface Comment {
    id: string
    user: UserShort
    product: Product
    rating: number
    comment: string
    datePosted: Date
}