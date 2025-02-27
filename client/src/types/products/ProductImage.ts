import { Product } from "./Product"

export interface ProductImage {
    id: string
    product: Product | {id: string}
    imageUrl: string
}
export interface ProductImageCreate {
    product: {id: string}
    imageUrl: string
}
export interface ProductImageUpdate {
    product: {id: string}
    imageUrl: string
}