import React from 'react';
import { IoMdSearch } from 'react-icons/io';

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex items-center gap-3 bg-white py-2 px-3 rounded-full">
      <IoMdSearch className="text-xl" />
      <input
        type="search"
        className="outline-none bg-transparent text-base"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;