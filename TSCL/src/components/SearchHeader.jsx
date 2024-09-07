import React from 'react';
import { IoMdSearch } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';

const SearchHeader = ({
  title,
  hasCreatePermission,
  onClick,
  searchValue,
  setSearchValue,
}) => {
  return (
    <div className="flex justify-between items-center my-2 mx-8 flex-wrap gap-3">
      <h1 className="md:text-xl text-lg font-medium">{title}</h1>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-full">
          <IoMdSearch className="text-xl" />
          <input
            type="search"
            className="outline-none bg-transparent text-base"
            placeholder={`Search ${title}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        {hasCreatePermission && (
          <button
            className="flex flex-row gap-2 font-lexend items-center border-2 bg-blue-500 text-white rounded-full py-1.5 w-fit justify-between px-3 md:text-base text-sm"
            onClick={onClick}
          >
            <FaPlus /> Add {title}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;