import { useGetProductById } from '@/hooks/useProducts';
import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Props interface for the ProductCard component
 * @interface ProductCardProps
 * @property {string} productId - Unique identifier for the product to display
 */
interface ProductCardProps {
  productId: string;
}

/**
 * ProductCard component displays a product information in a card layout
 * 
 * @component
 * @param {ProductCardProps} props - Component props
 * @param {string} props.productId - ID of the product to fetch and display
 * @returns {JSX.Element} A card with product image, name, description and price
 */
const ProductCard: React.FC<ProductCardProps> = ({ productId }) => {
  const navigate = useNavigate();
  const {data: product, isLoading} = useGetProductById(productId)
  
  if (!product || isLoading){
    return <>Loading...</>
  }
  
  /**
   * Gets the first image URL from product images or returns a placeholder
   * @type {string}
   */
  const firstImageUrl = product.images.length > 0 ? product.images[0].imageUrl : 'https://placehold.co/600x400.png';

  /**
   * Handles card click event by navigating to product details page
   * @function
   * @returns {void}
   */
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border border-gray-300 rounded-lg p-4 cursor-pointer transform transition-transform hover:scale-105"
    >
      {firstImageUrl && (
        <img src={firstImageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
      )}
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-gray-900 font-bold">${product.price.toString()}</p>
    </div>
  );
};

export default ProductCard;
