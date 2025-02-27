import { Repository, Like, Between, ILike } from 'typeorm'
import { IProductRepository } from '../../repositories/IProductRepository'
import { AppDataSource } from '../../../app-data-source'
import { ApiError } from '../../../utils/errors/ApiError'
import Product from '../../models/domain/Product'
import { ProductEntity } from '../../models/entity/ProductEntity'
import { ProductMapper } from '../../models/mappers/ProductMapper'
import { ProductImageEntity } from '../../models/entity/ProductImageEntity'
import ProductCreate from '../../models/dto/product/ProductCreate'
import ProductUpdate from '../../models/dto/product/ProductUpdate'
import { Params } from '../../../utils/Params'





export class PgProductRepository implements IProductRepository {
    
    private readonly productRepository: Repository<ProductEntity>
    private readonly imageRepository: Repository<ProductImageEntity>

    constructor() {
        this.productRepository = AppDataSource.getRepository(ProductEntity)
        this.imageRepository = AppDataSource.getRepository(ProductImageEntity)
    }

    async getProductById(productId: string): Promise<Product | null> {
        const product = await this.productRepository.findOne({ where : { id: productId }, relations: ['images', 'categories', 'comments', 'comments.user', 'comments.product', 'images.product']})
        return product ? ProductMapper.fromProductEntityToProduct(product) : null
    }

    async createProduct(productData: ProductCreate): Promise<Product> {
        const newProduct = this.productRepository.create(productData)
        const savedProduct = await this.productRepository.save(newProduct)
        return ProductMapper.fromProductEntityToProduct(savedProduct)
    }

    async updateProduct(productId: string, productData: Partial<ProductUpdate>): Promise<Product | null> {
        try {
            const product = await this.productRepository.findOne({ where: { id: productId } })
            if (!product) throw ApiError.NotFound('Product not found')

            Object.assign(product, productData)
            await this.productRepository.save(product)
            return ProductMapper.fromProductEntityToProduct(product)
        } catch (error: any) {
            throw ApiError.InternalServerError('Failed to update product', error)
        }
    }

    async deleteProduct(productId: string): Promise<boolean> {
        try {
            const product = await this.productRepository.findOne({ where: { id: productId } });
            if (!product) throw ApiError.NotFound('Product not found');
            await this.imageRepository.delete({ product: product });
            await this.productRepository.remove(product);
            
            return true;
        } catch (error: any) {
            throw ApiError.InternalServerError('Failed to delete product', error);
        }
    }
    
    async getAllProducts(): Promise<Product[]> {
        const products = await this.productRepository.find({
            relations: ['images', 'categories', 'comments', 'comments.user', 'comments.product', 'images.product']
        })

        return products.map(product => ProductMapper.fromProductEntityToProduct(product))
    }

    async searchProducts(params: Params): Promise<Product[]> {
        const { name, categoryName, minPrice, maxPrice, limit, offset } = params;
        const query: any = { 
            relations: ['images', 'categories', 'comments', 'comments.user', 'comments.product', 'images.product'] 
        };
        let whereClause: any = {};
    
        if (name) {
            whereClause.name = ILike(`%${name}%`);
        }
        if (categoryName) {
            whereClause.categories = { name: ILike(`%${categoryName}%`) };
        }
        if (minPrice !== undefined && maxPrice !== undefined) {
            whereClause.price = Between(minPrice, maxPrice);
        }
    
        query.where = whereClause;
    
        query.order = { name: 'ASC' };
    
        const products = await this.productRepository.find({
            ...query,
            take: limit,
            skip: offset,
        });
    
        return products.map(product => ProductMapper.fromProductEntityToProduct(product));
    }
    
    
    
    
    
    
}
