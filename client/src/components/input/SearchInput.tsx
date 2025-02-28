import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * SearchInput component provides a search form with input field and submit button
 * 
 * @component
 * @returns {JSX.Element} A search input field with a magnifying glass icon button
 */
const SearchInput: React.FC = (): JSX.Element => {
  /**
   * State to track the current search term entered by the user
   * @type {string}
   */
  const [searchTerm, setSearchTerm] = useState('');
  
  /**
   * Navigation hook to redirect user after search submission
   */
  const navigate = useNavigate();

  /**
   * Handles form submission by navigating to search results page with query parameter
   * 
   * @param {React.FormEvent} e - Form submission event
   * @returns {void}
   */
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative text-gray-600">
      <input
        type="text"
        className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <MagnifyingGlassIcon className="h-4 w-4 text-gray-600" />
      </button>
    </form>
  );
};

export default SearchInput;
