import { api } from "@/api";
import { CommentCreate } from "@/types/comments/CommentCreate";
import Comment from "@/types/comments/Comment";

class CommentService {
    private ROUTE_PREFIX = 'api/comments';

    async getReviewsByProductId(productId: string): Promise<Comment[]> {
        const reviews = (await api.get<Comment[]>(`${this.ROUTE_PREFIX}/product/${productId}`)).data;
        return reviews;
    }

    async createReview(reviewData: CommentCreate): Promise<Comment> {
        const review = (await api.post<Comment>(this.ROUTE_PREFIX, reviewData)).data;
        return review;
    }

    async deleteReview(reviewId: string): Promise<void> {
        await api.delete(`${this.ROUTE_PREFIX}/${reviewId}`);
    }

    async fetchAdditionalReviewsByProduct(productId: string, skip: number, take: number): Promise<Comment[]> {
        const reviews = (await api.get<Comment[]>(`${this.ROUTE_PREFIX}/product/${productId}/additional?skip=${skip}&take=${take}`)).data;
        return reviews;
    }
}

export default new CommentService();