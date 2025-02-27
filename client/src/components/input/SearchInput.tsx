import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInput: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
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
