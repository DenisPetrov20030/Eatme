import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


type ProfileSidebarProps = {
  navigate: string
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({navigate}) => {
  const navigateDom = useNavigate()
  return (
    <div className="bg-gray-200 h-full w-48 p-4">
      <h2 className="text-xl font-semibold mb-4">Profile Menu</h2>
      <ul>
        <li className="mb-2"><Link to="/profile/info">Edit Info</Link></li>
        <li className="mb-2"><Link to="/profile/password">Change Password</Link></li>
        <li className="mb-2"><Link to="/profile/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
