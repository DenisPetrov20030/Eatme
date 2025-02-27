import React, { useState } from 'react';
import { Category } from '@/types/category/Category';
import { useGetAllCategories } from '@/hooks/useCategory';
import { useCreateProduct } from '@/hooks/useProducts';
import { fileToDataURL } from '@/utils/utils';

const AddProductLayer: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [productDescription, setProductDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [productQuantity, setProductQuantity] = useState(0);
    const { data: categories } = useGetAllCategories();
    const createProduct = useCreateProduct();
    
    const formattedCategories = selectedCategories.map(category => ({
        id: category.id.toString(),
    }));
    
    const handleAddProduct = async () => {
        try {
            let base64String = imageUrl;
            if (selectedFile) {
                base64String = await fileToDataURL(selectedFile);
            }
            
           if (base64String && imageUrl) {
            await createProduct.mutateAsync({
              name: productName,
              price: productPrice,
              imageUrl: base64String,
              description: productDescription,
              categories: formattedCategories,
              quantity: productQuantity,
          });

          setProductName('');
          setProductPrice(0);
          setProductDescription('');
          setSelectedCategories([]);
          setProductQuantity(0);
          setImageUrl('');
          setSelectedFile(null);
           }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
  
    const handleCategoryChange = (category: Category) => {
        setSelectedCategories(prev => {
            if (prev.find(cat => cat.id === category.id)) {
                return prev.filter(cat => cat.id !== category.id);
            } else {
                return [...prev, category];
            }
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try {
                const base64String = await fileToDataURL(file);
                setImageUrl(base64String);
                setSelectedFile(file);
                console.log(imageUrl)
            } catch (error) {
                console.error("Error converting file to base64:", error);
            }
        }
    };
      
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                    type="text"
                    className="mt-1 p-2 w-full border rounded-md"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Product Price</label>
                <input
                    type="number"
                    className="mt-1 p-2 w-full border rounded-md"
                    value={productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Product Description</label>
                <textarea
                    className="mt-1 p-2 w-full border rounded-md"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Categories</label>
                <div className="grid grid-cols-2 gap-4">
                    {categories?.map((category: Category) => (
                        <label key={category.id} className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                            {category.name}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Product Quantity</label>
                <input
                    type="number"
                    className="mt-1 p-2 w-full border rounded-md"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(Number(e.target.value))}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                <input
                    type="file"
                    className="mt-1 p-2 w-full border rounded-md"
                    onChange={handleFileChange}
                />
            </div>
            {imageUrl && <img src={imageUrl} alt="Product Preview" className="mb-4" />}
            <button onClick={handleAddProduct} className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800">
                Add Product
            </button>
        </div>
    );
};

export default AddProductLayer;
