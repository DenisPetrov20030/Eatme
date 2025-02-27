import Category from "./Category"
import Comment from "./Comment"
import ProductImage from "./Image"

export default interface Product {
    id: string
    name: string
    description: string
    price: number
    quantity: number
    categories: Category[]
    images: ProductImage[]
    comments: Comment[]
}