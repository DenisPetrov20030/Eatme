import Layout from '@/components/Layout';
import ImageCarousel from '@/components/carousel/ImageCarousel';
import CommentSection from '@/components/ui/CommentSection';
import { useCreateCartItem, useGetCartsByUserId } from '@/hooks/useCart';
import { useCreateReview, useGetReviewsByProductId } from '@/hooks/useComment';
import { useGetProductById, useDeleteProduct } from '@/hooks/useProducts';
import { useAddToWishlist, useRemoveFromWishlist, useGetWishlistItemsByUserId } from '@/hooks/useWishlistItem';
import useUserStore from '@/store/UserStore';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: productLoading, isError } = useGetProductById(id);
  const { data: reviews, isLoading: reviewsLoading } = useGetReviewsByProductId(id);
  const createReview = useCreateReview();
  const { user, isAuth } = useUserStore();
  const { data: cart } = useGetCartsByUserId(user?.id);
  const deleteProduct = useDeleteProduct();

  const createCartItem = useCreateCartItem();
  const navigate = useNavigate();

  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const { data: wishlistItems } = useGetWishlistItemsByUserId(user?.id);

  const handleAddToCart = async () => {
    if (!isAuth) {
      navigate("/log-in");
      return;
    }
    if (product && isAuth && cart) {
      await createCartItem.mutateAsync({
        cart: { id: cart[0].id },
        product: { id: product.id },
        quantity: 1,
      });
    }
  };

  const handleAddToWishlist = async () => {
    if (!isAuth) {
      navigate("/log-in");
      return;
    }
    if (product && isAuth && user) {
      await addToWishlist.mutateAsync({ userId: user.id, productId: product.id });
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!isAuth) {
      navigate("/log-in");
      return;
    }
    if (product && isAuth && user) {
      await removeFromWishlist.mutateAsync({ userId: user.id, productId: product.id });
    }
  };

  const handleAddComment = async (text: string) => {
    if (!isAuth) {
      navigate("/log-in");
      return;
    }
    if (product && isAuth && user) {
      await createReview.mutateAsync({ productId: product.id, userId: user.id, rating: 0, comment: text });
    }
  };

  const handleDeleteProduct = async () => {
    if (product && user?.isAdmin) {
      await deleteProduct.mutateAsync(product.id);
      navigate("/"); 
    }
  };

  if (productLoading || reviewsLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !product) {
    return <div>Error loading product.</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <ImageCarousel images={product.images} />
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-gray-900 font-bold text-2xl mb-4">${product.price.toString()}</p>
        <button
          onClick={handleAddToCart}
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add to Cart
        </button>
        {isAuth && wishlistItems && wishlistItems.find(item => item.productId === product.id) ? (
          <button
            onClick={handleRemoveFromWishlist}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Remove from Wishlist
          </button>
        ) : (
          <button
            onClick={handleAddToWishlist}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Add to Wishlist
          </button>
        )}
        {user?.isAdmin && (
          <button
            onClick={handleDeleteProduct}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Delete Product
          </button>
        )}
        <CommentSection comments={reviews || []} onAddComment={handleAddComment} />
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
