import React from "react";

const BulkUploadButton = ({ handleDownload }) => {
  return (
    <div className="text-center">
      <button
        className="bg-primary px-3 py-2 rounded-full text-white text-sm font-alegerya"
        onClick={() => handleDownload()}
      >
        Bulk Upload Template
      </button>
    </div>
  );
};

export default BulkUploadButton;
