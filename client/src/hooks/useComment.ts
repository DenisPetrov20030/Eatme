import CommentService from '@/services/CommentService';
import { CommentCreate } from '@/types/comments/CommentCreate';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useGetReviewsByProductId = (productId: string | undefined | null) => useQuery({
    queryKey: ['reviews-by-product-id', productId],
    queryFn: () => CommentService.getReviewsByProductId(productId || ''),
    enabled: !!productId,
});

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-review'],
        mutationFn: (reviewData: CommentCreate) => CommentService.createReview(reviewData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews-by-product-id'] });
        }
    });
};

export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['delete-review'],
        mutationFn: (reviewId: string) => CommentService.deleteReview(reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews-by-product-id'] });
        }
    });
};


export const useFetchAdditionalReviewsByProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['fetch-additional-reviews'],
        mutationFn: ({ productId, skip, take }: { productId: string, skip: number, take: number }) => CommentService.fetchAdditionalReviewsByProduct(productId, skip, take),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews-by-product-id'] });
        }
    });
};