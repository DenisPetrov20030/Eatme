import React from 'react';

interface AdminSidebarProps {
  setActiveLayer: (layer: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ setActiveLayer }) => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <ul>
        <li className="mb-2">
          <button
            className="w-full text-left p-2 bg-gray-700 hover:bg-gray-600 rounded"
            onClick={() => setActiveLayer('addProduct')}
          >
            Add Product
          </button>
        </li>
        <li className="mb-2">
          <button
            className="w-full text-left p-2 bg-gray-700 hover:bg-gray-600 rounded"
            onClick={() => setActiveLayer('addCategory')}
          >
            Add Category
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
