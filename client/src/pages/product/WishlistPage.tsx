import Layout from '@/components/Layout';
import ProductCard from '@/components/card/ProductCard';
import { useGetWishlistItemsByUserId } from '@/hooks/useWishlistItem';
import useUserStore from '@/store/UserStore';
import React from 'react';

const WishlistPage: React.FC = () => {
  const { user } = useUserStore();
  const { data: wishlistItems, isLoading, isError } = useGetWishlistItemsByUserId(user?.id);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !wishlistItems) {
    return <div>Error loading wishlist items.</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistItems.map(wishlistItem => (
            <ProductCard key={wishlistItem.productId} productId={wishlistItem.productId} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
