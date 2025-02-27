import AddCategoryLayer from '@/components/layers/AddCategoryLayer';
import AddProductLayer from '@/components/layers/AddProductLayer';
import AdminSidebar from '@/components/sidebar/AdminSidebar';
import React, { useState } from 'react';

const AdminDashboardPage: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState('addProduct');

  const renderActiveLayer = () => {
    switch (activeLayer) {
      case 'addProduct':
        return <AddProductLayer />;
      case 'addCategory':
        return <AddCategoryLayer />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex">
      <AdminSidebar setActiveLayer={setActiveLayer} />
      <div className="flex-grow p-4">
        {renderActiveLayer()}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
