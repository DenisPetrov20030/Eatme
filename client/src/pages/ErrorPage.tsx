import Layout from '@/components/Layout';
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">The page you are looking for does not exist.</p>
        <Link to="/" className="text-gray-500 hover:text-black">Go back to Home</Link>
      </div>
    </Layout>

  );
};

export default ErrorPage;
