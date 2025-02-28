import React, { useState } from 'react';
import { CartItem } from '@/types/cart/CartItem';
import { useDeleteCartItem, useUpdateCartItem } from '@/hooks/useCart';
import { isProduct } from '@/utils/utils';

/**
 * Props interface for the CartItemCard component
 * @interface CartItemProps
 * @property {CartItem} item - The cart item to display
 */
interface CartItemProps {
  item: CartItem;
}

/**
 * CartItemCard component - Displays a single cart item with product details
 * and provides functionality to update quantity or remove the item
 * 
 * @component
 * @param {CartItemProps} props - Component props
 * @returns {JSX.Element} Rendered cart item card
 */
const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const deleteCartItem = useDeleteCartItem();
  const updateCartItem = useUpdateCartItem();

  /**
   * Handles the deletion of a cart item
   * 
   * @async
   * @function handleDelete
   * @returns {Promise<void>}
   */
  const handleDelete = async () => {
    await deleteCartItem.mutateAsync(item.id);
  };

  /**
   * Handles quantity changes for the cart item
   * Updates both local state and server data
   * 
   * @async
   * @function handleQuantityChange
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event from input
   * @returns {Promise<void>}
   */
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
