import Layout from '@/components/Layout';
import ProductList from '@/components/list/ProductList';
import React from 'react';
const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Eatme Store</h1>
      <ProductList params={{}} />
    </div>
    </Layout>
    
  );
};

export default HomePage;
