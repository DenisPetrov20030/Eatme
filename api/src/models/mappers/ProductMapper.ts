import Product from '../domain/Product'
import { ProductImageEntity } from '../entity/ProductImageEntity'
import { CategoryEntity } from '../entity/CategoryEntity'
import { CategoryMapper } from './CategoryMapper'
import { ImageMapper } from './ImageMapper'
import { CommentEntity } from '../entity/CommentEntity'
import { ProductEntity } from '../entity/ProductEntity'
import { CommentMapper } from './CommentMapper'
import ProductCreate from '../dto/product/ProductCreate'
import ProductUpdate from '../dto/product/ProductUpdate'

export class ProductMapper {
    static fromProductEntityToProduct(entity: ProductEntity): Product {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            price: entity.price,
            quantity: entity.quantity,
            images: entity.images ? entity.images.map(imageEntity => ImageMapper.fromImageEntityToImage(imageEntity)) : [],
            categories: entity.categories ? entity.categories.map(ent => CategoryMapper.fromCategoryEntityToCategory(ent)): [],
            comments: entity.comments ? entity.comments.map(entity => CommentMapper.fromCommentToCommentEntity(entity)) : []
        }
    }

    static toProductCreateDto(product: Product): ProductCreate {
        return {
            name: product.name,
            description: product.description,
            price: product.price,
            categories: product.categories,
            quantity: product.quantity,
            images: product.images
        }
    }

    static toProductUpdateDto(product: Product): ProductUpdate {
        return {
            name: product.name,
            description: product.description,
            price: product.price,
            categories: product.categories,
            quantity: product.quantity,
            images: product.images
        }
    }
}
