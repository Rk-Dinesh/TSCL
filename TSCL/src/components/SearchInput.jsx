import React from 'react';
import { IoMdSearch } from 'react-icons/io';

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex items-center gap-2 bg-white py-1.5 px-2 rounded-full shadow">
      <IoMdSearch className="text-xl" />
      <input
        type="search"
        className="outline-none bg-transparent text-base w-44"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;