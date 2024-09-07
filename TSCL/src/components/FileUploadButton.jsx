import React from 'react';
import { FaPlus } from 'react-icons/fa';

const FileUploadButton = ({
  onChange,
  buttonText,
  accept,
  onClick,
}) => {
  return (
    <div className="relative text-center hover:text-white py-1.5 rounded-full">
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={onChange}
        accept={accept}
      />

      <button
        className="flex items-center gap-2 justify-center border-primary border-2 font-normal text-base w-36 py-1.5 rounded-full text-primary hover:text-white hover:bg-primary"
        onClick={onClick}
      >
        <FaPlus className='text-sm'/>
        {buttonText}
      </button>
    </div>
  );
};

export default FileUploadButton;