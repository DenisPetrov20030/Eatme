import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types/category/Category';
import { useGetAllCategories, useDeleteCategory } from '@/hooks/useCategory';
import useUserStore from '@/store/UserStore';
import { TrashIcon } from '@heroicons/react/24/solid';

const CategoryPage: React.FC = () => {
  const { data: categories, isLoading, isError } = useGetAllCategories();
  const deleteCategory = useDeleteCategory(); 
  const { user } = useUserStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories.</div>;
  }

  const handleDeleteCategory = async (categoryId: number) => {
    if (user?.isAdmin) {
      await deleteCategory.mutateAsync(categoryId);
    }
  };

  const renderCategoryCard = (category: Category) => {
    return (
      <div key={category.id} className="relative max-w-sm rounded overflow-hidden shadow-lg">
        <Link to={`/search?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-800">
          {category.imageUrl && <img className="w-full" src={category.imageUrl} alt={category.name} />}
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{category.name}</div>
            {category.parentCategory && (
              <p className="text-gray-700 text-base">
                Parent Category: {category.parentCategory.name}
              </p>
            )}
          </div>
        </Link>
        {user?.isAdmin && (
          <button
            onClick={() => handleDeleteCategory(category.id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        )}
      </div>
    );
  };

  const rootCategories = categories?.filter(category => !category.parentCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rootCategories?.map(category => renderCategoryCard(category))}
      </div>
    </div>
  );
};

export default CategoryPage;
