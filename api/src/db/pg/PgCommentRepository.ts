import { Repository } from "typeorm"
import { ICommentRepository } from "../../repositories/ICommentRepository"
import { CommentEntity } from "../../models/entity/CommentEntity"
import { AppDataSource } from "../../../app-data-source"
import Comment from "../../models/domain/Comment"
import { CommentCreate } from "../../models/dto/comment/CommentCreate"
import { ProductEntity } from "../../models/entity/ProductEntity"
import { UserEntity } from "../../models/entity/UserEntity"
import { CommentMapper } from "../../models/mappers/CommentMapper"
import { ApiError } from "../../../utils/errors/ApiError"
import { CommentUpdate } from "../../models/dto/comment/CommentUpdate"

export class PgCommentRepository implements ICommentRepository {
    
    private readonly commentRepository: Repository<CommentEntity>

    constructor() {
        this.commentRepository = AppDataSource.getRepository(CommentEntity)
    }

    async getReviewById(reviewId: string): Promise<Comment | null> {
        const review = await this.commentRepository.findOne(
            {
                where: {
                    id: reviewId
                }, relations: ['product', 'user']
            }
        )
        return review ? CommentMapper.fromCommentToCommentEntity(review) : null
    }

    async createReview(reviewData: CommentCreate): Promise<Comment> {
        const productRepository = AppDataSource.getRepository(ProductEntity)
        const userRepository = AppDataSource.getRepository(UserEntity)
    
        const product = await productRepository.findOne({where: {id: reviewData.productId}})
        const user = await userRepository.findOne({where: {
            id: reviewData.userId
        }})
    
        if (!product) {
            throw new Error('Product not found')
        }
    
        if (!user) {
            throw new Error('User not found')
        }
        const newReview = new CommentEntity()
        newReview.product = product
        newReview.user = user
        newReview.rating = reviewData.rating
        newReview.comment = reviewData.comment
        const savedReview = await this.commentRepository.save(newReview)
    
        return CommentMapper.fromCommentToCommentEntity(savedReview)
    }

    async updateReview(reviewId: string, reviewData: CommentUpdate): Promise<Comment | null> {
        try {
            const review = await this.commentRepository.findOne({
                where: {
                    id: reviewId
                }, relations: ['product', 'user']
            })
            if (!review) throw ApiError.NotFound('Review not found')

            Object.assign(review, reviewData)
            await this.commentRepository.save(review)
            return CommentMapper.fromCommentToCommentEntity(review)
        } catch (error: any) {
            throw ApiError.InternalServerError('Failed to update review', error)
        }
    }

    async deleteReview(reviewId: string): Promise<boolean> {
        try {
            const review = await this.commentRepository.findOne({
                where: {
                    id: reviewId
                }, relations: ['product', 'user']
            })
            if (!review) throw ApiError.NotFound('Review not found')

            await this.commentRepository.remove(review)
            return true
        } catch (error: any) {
            throw ApiError.InternalServerError('Failed to delete review', error)
        }
    }

    async getReviewsByProduct(productId: string): Promise<Comment[]> {
        const reviews = await this.commentRepository.find({ where: { 
            product: {
                id: productId
            }
         }, relations: ['product', 'user'] })
        return reviews.map(review => CommentMapper.fromCommentToCommentEntity(review))
    }
    async fetchAdditionalReviewsByProduct(productId: string, skip: number, take: number): Promise<Comment[]> {
        const additionalReviews = await this.commentRepository.find({
            where: {
                product: {
                    id: productId
                }
            },
            skip: skip,
            take: take,
            relations: ['product', 'user']
        });
        return additionalReviews.map(review => CommentMapper.fromCommentToCommentEntity(review));
    }
    

    async getReviewsByUser(userId: string): Promise<Comment[]> {
        const reviews = await this.commentRepository.find({
            where: {
                user: {
                    id: userId
                }
            }, relations: ['product', 'user']
        })
        
        return reviews.map(review => CommentMapper.fromCommentToCommentEntity(review))
    }
}