import Product from "./Product"

export default interface ProductImage {
    id: string
    product: Product | {id: string}
    imageUrl: string
}