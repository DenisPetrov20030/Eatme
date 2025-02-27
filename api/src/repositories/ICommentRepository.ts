import Comment from "../models/domain/Comment"
import { CommentCreate } from "../models/dto/comment/CommentCreate"
import { CommentUpdate } from "../models/dto/comment/CommentUpdate"

export interface ICommentRepository {
    getReviewById(reviewId: string): Promise<Comment | null>
    createReview(reviewData: CommentCreate): Promise<Comment>
    updateReview(reviewId: string, reviewData: CommentUpdate): Promise<Comment | null>
    deleteReview(reviewId: string): Promise<boolean>
    getReviewsByProduct(productId: string): Promise<Comment[]>
    getReviewsByUser(userId: string): Promise<Comment[]>
    fetchAdditionalReviewsByProduct(productId: string, skip: number, take: number): Promise<Comment[]>
}