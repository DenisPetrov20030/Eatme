import { ApiError } from "../../utils/errors/ApiError";
import Comment from "../models/domain/Comment";
import { CommentCreate } from "../models/dto/comment/CommentCreate";
import { CommentUpdate } from "../models/dto/comment/CommentUpdate";
import { ICommentRepository } from "../repositories/ICommentRepository";

export class CommentService {
  constructor(private readonly commentRepository: ICommentRepository) {}

  async getReviewById(reviewId: string): Promise<Comment | null> {
    const review = await this.commentRepository.getReviewById(reviewId);
    if (!review) {
      throw ApiError.NotFound("Review not found");
    }
    return review;
  }

  async createReview(reviewData: CommentCreate): Promise<Comment> {
    return await this.commentRepository.createReview(reviewData);
  }

  async updateReview(
    reviewId: string,
    reviewData: CommentUpdate
  ): Promise<Comment | null> {
    const review = await this.commentRepository.getReviewById(reviewId);
    if (!review) {
      throw ApiError.NotFound("Review not found");
    }
    return await this.commentRepository.updateReview(reviewId, reviewData);
  }

  async deleteReview(reviewId: string): Promise<boolean> {
    const review = await this.commentRepository.getReviewById(reviewId);
    if (!review) {
      throw ApiError.NotFound("Review not found");
    }
    return await this.commentRepository.deleteReview(reviewId);
  }

  async getReviewsByProduct(productId: string): Promise<Comment[]> {
    return await this.commentRepository.getReviewsByProduct(productId);
  }
  async fetchAdditionalReviewsByProduct(
    productId: string,
    skip: number,
    take: number
  ): Promise<Comment[]> {
    return await this.commentRepository.fetchAdditionalReviewsByProduct(
      productId,
      skip,
      take
    );
  }
  async getReviewsByUser(userId: string): Promise<Comment[]> {
    return await this.commentRepository.getReviewsByUser(userId);
  }
}
