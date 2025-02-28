import { ProductImage } from '@/types/products/ProductImage';
import React from 'react';

/**
 * Props for the ImageCarousel component
 * @interface ImageCarouselProps
 * @property {ProductImage[]} images - Array of product images to display in the carousel
 */
interface ImageCarouselProps {
  images: ProductImage[];
}

/**
 * ImageCarousel component displays a set of product images in a carousel format
 * with navigation controls
 * 
 * @component
 * @param {ImageCarouselProps} props - Component props
 * @returns {JSX.Element} A carousel with product images and navigation buttons
 */
const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  /**
   * State to track the currently displayed image index
   * @type {number}
   */
  const [currentIndex, setCurrentIndex] = React.useState(0);

  /**
   * Advances to the next image in the carousel
   * @function
   * @returns {void}
   */
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  /**
   * Goes back to the previous image in the carousel
   * @function
   * @returns {void}
   */
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
