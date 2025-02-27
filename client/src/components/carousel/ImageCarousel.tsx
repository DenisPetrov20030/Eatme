import { ProductImage } from '@/types/products/ProductImage';
import React from 'react';

interface ImageCarouselProps {
  images: ProductImage[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {images.length > 0 && (
        <img
          src={images[currentIndex].imageUrl}
          alt={`Product image ${currentIndex + 1}`}
          className="w-full h-96 object-cover rounded-lg"
        />
      )}
      <button onClick={prevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full">‹</button>
      <button onClick={nextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full">›</button>
    </div>
  );
};

export default ImageCarousel;
