import { useSearchProducts } from '@/hooks/useProducts';
import { Product } from '@/types/products/Product';
import React from 'react';
import ProductCard from '../card/ProductCard';

/**
 * Props interface for the ProductList component
 * @interface ProductListProps
 * @property {Object} params - Search parameters for filtering products
 * @property {string} [params.name] - Optional name filter for products
 * @property {string} [params.categoryName] - Optional category filter
 * @property {number} [params.minPrice] - Optional minimum price filter
 * @property {number} [params.maxPrice] - Optional maximum price filter
 * @property {number} [params.limit] - Optional limit for number of results
 * @property {number} [params.offset] - Optional pagination offset
 */
interface ProductListProps {
  params: {
    name?: string;
    categoryName?: string;
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
    offset?: number;
  };
}

/**
 * ProductList component displays a grid of product cards based on search parameters
 * 
 * @component
 * @param {ProductListProps} props - Component props
 * @param {Object} props.params - Search parameters for filtering products
 * @returns {JSX.Element} A responsive grid of product cards or loading/error states
 */
const ProductList: React.FC<ProductListProps> = ({ params }: ProductListProps): JSX.Element => {
  /**
   * Custom hook to fetch products based on search parameters
   * @type {Object} Result containing products data, loading and error states
   */
  const { data, isLoading, isError } = useSearchProducts(params);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map((product: Product) => (
        <ProductCard key={product.id} productId={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
