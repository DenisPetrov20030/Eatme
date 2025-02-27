import React, { useState } from 'react';
import { CartItem } from '@/types/cart/CartItem';
import { useDeleteCartItem, useUpdateCartItem } from '@/hooks/useCart';
import { isProduct } from '@/utils/utils';

interface CartItemProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const deleteCartItem = useDeleteCartItem();
  const updateCartItem = useUpdateCartItem();

  const handleDelete = async () => {
    await deleteCartItem.mutateAsync(item.id);
  };

  const handleQuantityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      await updateCartItem.mutateAsync({ cartItemId: item.id, cartItemData: { quantity: newQuantity } }); 
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div>
        {isProduct(item.product) && <h3 className="font-semibold text-lg">{item.product.name}</h3>}
        {isProduct(item.product) && <p className="text-gray-500">Price: ${item.product.price}</p>}
      </div>
      <div className="flex items-center">
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="border w-16 p-1 text-center"
        />
        <button
          onClick={handleDelete}
          className="ml-4 text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
