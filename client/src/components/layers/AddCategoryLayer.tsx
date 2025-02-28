import React, { useState } from 'react';
import { useGetAllCategories, useCreateCategory } from '@/hooks/useCategory';
import { Category } from '@/types/category/Category';

/**
 * AddCategoryLayer component provides a form for creating new product categories
 * with options for name, image URL, and parent category selection
 * 
 * @component
 * @returns {JSX.Element} A form with inputs for category creation
 */
const AddCategoryLayer: React.FC = (): JSX.Element => {
  /**
   * State for the new category name
   * @type {string}
   */
  const [categoryName, setCategoryName] = useState('');
  
  /**
   * State for the new category image URL
   * @type {string}
   */
  const [imageUrl, setImageUrl] = useState('');
  
  /**
   * State for the selected parent category ID
   * @type {number|null}
   */
  const [parentCategoryId, setParentCategoryId] = useState<number | null>(null);
  
  /**
   * Custom hook to fetch all available categories for parent selection
   * @type {Object} Result containing categories data
   */
  const { data: categories } = useGetAllCategories();
  
  /**
   * Custom hook that provides mutation function to create a new category
   */
  const createCategory = useCreateCategory();

  /**
   * Handles the submission of the new category form
   * Creates a new category with the provided data and resets form fields
   * 
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleAddCategory = async (): Promise<void> => {
    const parentCategory = categories?.find(cat => cat.id === parentCategoryId) || undefined;

    await createCategory.mutateAsync({
      name: categoryName,
      imageUrl: imageUrl,
      parentCategory: parentCategory,
    });

    setCategoryName('');
    setImageUrl('');
    setParentCategoryId(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Parent Category</label>
        <select
          className="mt-1 p-2 w-full border rounded-md"
          value={parentCategoryId ?? ''}
          onChange={(e) => setParentCategoryId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">None</option>
          {categories?.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddCategory} className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800">
        Add Category
      </button>
    </div>
  );
};

export default AddCategoryLayer;
