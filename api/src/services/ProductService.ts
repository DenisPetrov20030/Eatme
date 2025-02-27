import { Params } from "../../utils/Params";
import { ApiError } from "../../utils/errors/ApiError";
import Product from "../models/domain/Product";
import ProductUpdate from "../models/dto/product/ProductUpdate";
import { IProductRepository } from "../repositories/IProductRepository";
export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async getProductById(productId: string): Promise<Product | null> {
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      throw ApiError.NotFound("Product not found");
    }
    return product;
  }

  async createProduct(productData: Product): Promise<Product> {
    return await this.productRepository.createProduct(productData);
  }

  async updateProduct(
    productId: string,
    productData: Partial<ProductUpdate>
  ): Promise<Product | null> {
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      throw ApiError.NotFound("Product not found");
    }
    return await this.productRepository.updateProduct(productId, productData);
  }

  async deleteProduct(productId: string): Promise<boolean> {
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      throw ApiError.NotFound("Product not found");
    }
    return await this.productRepository.deleteProduct(productId);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.getAllProducts();
  }

  async searchProducts(params: Params): Promise<Product[]> {
    return await this.productRepository.searchProducts(params);
  }
}
