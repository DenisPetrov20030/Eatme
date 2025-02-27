import React, { useState } from 'react';
import { UserDetail } from '@/types/users/UserDetail';
import { useGetUserById, useUpdateUser } from '@/hooks/useUser';
import useUserStore from '@/store/UserStore';

const ProfileInfoLayer: React.FC = () => {
    const {user} = useUserStore()
    const [formData, setFormData] = useState<Partial<UserDetail> | null>(null);
    const { data: userData } = useGetUserById(user?.id); 
  const updateUserMutation = useUpdateUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...(prevState || {}),
      [name]: value
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      await updateUserMutation.mutateAsync({
        id: user?.id || "",
        userData: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email
        }
      });
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" name="first_name" id="first_name" value={formData?.first_name || userData.first_name} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" name="last_name" id="last_name" value={formData?.last_name || userData.last_name} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" id="email" value={formData?.email || userData.email} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileInfoLayer;
