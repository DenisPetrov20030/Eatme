import React, { useState } from 'react';
import { useGetAllCategories, useCreateCategory } from '@/hooks/useCategory';
import { Category } from '@/types/category/Category';

const AddCategoryLayer: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState<number | null>(null);
  const { data: categories } = useGetAllCategories();
  const createCategory = useCreateCategory();

  const handleAddCategory = async () => {
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
