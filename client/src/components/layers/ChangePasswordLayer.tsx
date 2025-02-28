import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/UserStore';
import { useChangePassword } from '@/hooks/useUser';

/**
 * ChangePasswordLayer component provides a form for users to change their account password
 * with validation and error handling
 * 
 * @component
 * @returns {JSX.Element} A form with inputs for password change
 */
const ChangePasswordLayer: React.FC = () => {
  /**
   * State for the user's current password
   * @type {string}
   */
  const [currentPassword, setCurrentPassword] = useState('');
  
  /**
   * State for the user's new password
   * @type {string}
   */
  const [newPassword, setNewPassword] = useState('');
  
  /**
   * State for the password confirmation
   * @type {string}
   */
  const [confirmPassword, setConfirmPassword] = useState('');
  
  /**
   * State for error messages
   * @type {string}
   */
  const [errorMessage, setErrorMessage] = useState('');
  
  /**
   * Navigation hook for redirecting after password change
   */
  const navigate = useNavigate();
  
  /**
   * User data from global store
   */
  const { user } = useUserStore();
  
  /**
   * Custom hook that provides mutation function to change user password
   */
  const changePasswordMutation = useChangePassword();

  /**
   * Handles the password change form submission
   * Validates inputs and sends request to update password
   * 
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password must match.');
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        id: user?.id || '',
        currentPassword,
        newPassword,
      });
      setErrorMessage('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      navigate('/profile');
    } catch (error) {
      setErrorMessage('Failed to change password. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div className="mb-4">
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          className="mt-1 p-2 w-full border rounded-md"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          className="mt-1 p-2 w-full border rounded-md"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="mt-1 p-2 w-full border rounded-md"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleChangePassword} className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800">
        Change Password
      </button>
    </div>
  );
};

export default ChangePasswordLayer;
