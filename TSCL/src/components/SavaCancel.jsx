import React from 'react';

const SaveCancel = ({
  onCancel,
  onSave,
  isLoading
}) => {
  return (
    <div className="flex justify-end  mx-10  gap-5">
      <div
        className="border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5 shadow-md"
        onClick={onCancel}
      >
        Cancel
      </div>
      <button
        className="text-white bg-primary font-lexend rounded-3xl px-5 py-1.5 shadow-lg"
        type="submit"
        // onClick={onSave}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default SaveCancel;