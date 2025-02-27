import { NextFunction, Request, Response } from 'express'
import { CommentService } from '../services/CommentService'
import { ApiError } from '../../utils/errors/ApiError'
import { CommentCreate } from '../models/dto/comment/CommentCreate'
import { CommentUpdate } from '../models/dto/comment/CommentUpdate'

export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    async getReviewById(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.id as string

            const review = await this.commentService.getReviewById(reviewId)
            if (!review) {
                return next(ApiError.NotFound('Review not found'))
            }
            res.json(review)
        } catch (error) {
            next(error)
        }
    }

    async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewData: CommentCreate = req.body

            const review = await this.commentService.createReview(reviewData)
            res.json(review)
        } catch (error) {
            next(error)
        }
    }

    async updateReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.id as string
            const reviewData: CommentUpdate = req.body
            const updatedReview = await this.commentService.updateReview(reviewId, reviewData)
            if (!updatedReview) {
                return next(ApiError.NotFound('Review not found'))
            }
            res.json(updatedReview)
        } catch (error) {
            next(error)
        }
    }

    async deleteReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.id as string
            const result = await this.commentService.deleteReview(reviewId)
            res.json({ success: result })
        } catch (error) {
            next(error)
        }
    }

    async getReviewsByProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId as string
            const reviews = await this.commentService.getReviewsByProduct(productId)
            res.json(reviews)
        } catch (error) {
            next(error)
        }
    }
    
    async fetchAdditionalReviewsByProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId as string
            const skip = parseInt(req.query.skip as string) || 0;
            const take = parseInt(req.query.take as string) || 20;
            const reviews = await this.commentService.fetchAdditionalReviewsByProduct(productId, skip, take);
            res.json(reviews)
        } catch (error) {
            next(error)
        }
    }
    
    async getReviewsByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string
            const reviews = await this.commentService.getReviewsByUser(userId)
            res.json(reviews)
        } catch (error) {
            next(error)
        }
    }
}