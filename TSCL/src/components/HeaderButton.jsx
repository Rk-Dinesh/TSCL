import React from 'react';
import { FaPlus } from 'react-icons/fa';

const HeaderButton = ({
  title,
  hasCreatePermission,
  onClick,
}) => {
  return (
    <div className="flex flex-row gap-1 justify-between items-center my-1 mx-8 flex-wrap">
      <h1 className="md:text-xl text-lg font-medium whitespace-nowrap">
        {title}
      </h1>
      {hasCreatePermission && (
        <button
          className="flex flex-row gap-2 font-lexend items-center border bg-primary text-white rounded-full py-2 px-3 justify-between mb-2 md:text-base text-sm shadow-md"
          onClick={onClick}
        >
          <FaPlus className='text-sm' /> Add {title}
        </button>
      )}
    </div>
  );
};

export default HeaderButton;