import { Params } from "../../utils/Params"
import Product from "../models/domain/Product"

export interface IProductRepository {
    getProductById(productId: string): Promise<Product | null>
    createProduct(productData: Product): Promise<Product>
    updateProduct(productId: string, productData: Partial<Product>): Promise<Product | null>
    deleteProduct(productId: string): Promise<boolean>
    getAllProducts(): Promise<Product[]>
    searchProducts(params: Params): Promise<Product[]>
}
