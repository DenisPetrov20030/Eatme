import { useGetProductById } from '@/hooks/useProducts';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  productId: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ productId }) => {
  const navigate = useNavigate();
  const {data: product, isLoading} = useGetProductById(productId)
  if (!product || isLoading){
    return <>Loading...</>
  }
  const firstImageUrl = product.images.length > 0 ? product.images[0].imageUrl : 'https://placehold.co/600x400.png';

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
