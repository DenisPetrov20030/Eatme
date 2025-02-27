import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import SearchInput from '@/components/input/SearchInput';
import ProductList from '@/components/list/ProductList';
import Layout from '@/components/Layout';
import { useSearchProducts } from '@/hooks/useProducts';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get('category');

  const params = categoryName ? { categoryName } : {};

  const { data, isLoading, isError } = useSearchProducts(params);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Search Results</h1>
      <ProductList params={params} />
    </div>
  );
};

export default SearchPage;
