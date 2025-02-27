import { Category } from "../category/Category"
import Comment from "../comments/Comment"
import { ProductImage } from "./ProductImage"

export interface Product {
    id: string
    name: string
    description: string
    price: number
    categories: Category[]
    quantity: number
    images: ProductImage[]
    comments: Comment[]
}