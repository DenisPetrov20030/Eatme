import Layout from '@/components/Layout';
import CartItemCard from '@/components/card/CartItemCard';
import { useGetCartItemsByCartId, useGetCartsByUserId } from '@/hooks/useCart';
import useUserStore from '@/store/UserStore';
import { isProduct } from '@/utils/utils';
import React from 'react';

const CartPage: React.FC = () => {
    const {user, isLoading} = useUserStore()
    const {data: cart} = useGetCartsByUserId(user?.id)
    const { data: cartItems, isError } = useGetCartItemsByCartId(cart ? cart[0].id: "");

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong...</div>;
    }

    const totalAmount = cartItems?.reduce((sum, item) => {
        if (isProduct(item.product)) {
          return sum + item.product.price * item.quantity;
        } else {
          return sum;
        }
      }, 0) ?? 0;
    return (
        <Layout>
             <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
        {cartItems?.length ? (
            <>
            <div className="bg-white shadow-md rounded-lg">
                {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
                ))}
            </div>
            <div className="mt-6 p-4 border-t border-gray-200 flex justify-end">
                <h2 className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</h2>
            </div>
            <div className="mt-6 flex justify-end">
                <button className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                Checkout
                </button>
            </div>
            </>
        ) : (
            <div>Your cart is empty.</div>
        )}
        </div>
        </Layout>
       
    );
};

export default CartPage;
