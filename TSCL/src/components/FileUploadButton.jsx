import React from 'react';
import { FaPlus } from 'react-icons/fa';

const FileUploadButton = ({
  onChange,
  buttonText,
  accept,
  onClick,
  fileupload
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
        className={`flex items-center gap-2 justify-center border-primary border-2 font-normal text-base w-36 py-1.5 rounded-full ${
          fileupload
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "text-primary hover:text-white hover:bg-primary"
        }`}
        onClick={fileupload ? null : onClick}
        disabled={fileupload}
      >
        {fileupload ? (
          <span className="animate-pulse">Uploading...</span>
        ) : (
          <>
            <FaPlus className="text-sm" />
            {buttonText}
          </>
        )}
      </button>
    </div>
  );
};

export default FileUploadButton;