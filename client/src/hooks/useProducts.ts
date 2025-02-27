import ProductService from '@/services/ProductService'
import { ProductCreate } from '@/types/products/ProductCreate';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetProducts = () =>  useQuery({
    queryKey: ['products'],
    queryFn: () => ProductService.getProducts()
})
export const useGetProductById = (productId: string | undefined | null) => useQuery({
    queryKey: ['product-by-id', productId],
    queryFn: () => ProductService.getProductById(productId || ''),
    enabled: !!productId,
})

export const useSearchProducts = (params: { name?: string; categoryName?: string; minPrice?: number; maxPrice?: number; limit?: number; offset?: number }) => useQuery({
    queryKey: ['search-products', params],
    queryFn: () => ProductService.searchProducts(params),
    enabled: true,
});

export const useCreateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['create-product'],
        mutationFn: (inputProduct: ProductCreate) => ProductService.createProduct(inputProduct),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]});
        }
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['delete-product'],
        mutationFn: (productId: string) => ProductService.deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });
}