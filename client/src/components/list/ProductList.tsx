import { useSearchProducts } from '@/hooks/useProducts';
import { Product } from '@/types/products/Product';
import React from 'react';
import ProductCard from '../card/ProductCard';

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

const ProductList: React.FC<ProductListProps> = ({ params }) => {
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
