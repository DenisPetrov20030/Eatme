import React from 'react';
import useUserStore from '@/store/UserStore';
import SearchInput from '../input/SearchInput';
import './Navbar.css';
import { useGetCartItemsByCartId, useGetCartsByUserId } from '@/hooks/useCart';

const Navbar: React.FC = () => {
  const { user, isAuth } = useUserStore();

  const {data: cart} = useGetCartsByUserId(user?.id)
  const {data: cartItems} = useGetCartItemsByCartId(cart ? cart[0].id : "")
  const hasItemsInCart = cartItems ? cartItems?.length > 0: 0;

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Eatme Store</div>
        <ul className="flex space-x-4">
          <li><a href="/" className="text-white hover:text-gray-200">Home</a></li>
          <li><a href="/category" className="text-white hover:text-gray-200">Category</a></li>
          {user?.isAdmin && <li><a href="/dashboard" className="text-white hover:text-gray-200">Dashboard</a></li>}
          {isAuth && <li><a href="/profile/info" className="text-white hover:text-gray-200">Profile</a></li>}
          {isAuth && <li><a href="/wishlist" className="text-white hover:text-gray-200">Wishlist</a></li>}
          {isAuth && (
            <li>
              <a href="/cart" className="text-white hover:text-gray-200 relative">
                Cart
                {hasItemsInCart && <span className="cart-badge"></span>}
              </a>
            </li>
          )}
          {!isAuth && <li><a href="/log-in" className="text-white hover:text-gray-200">Log in</a></li>}
        </ul>
        <SearchInput />
      </div>
    </nav>
  );
};

export default Navbar;
