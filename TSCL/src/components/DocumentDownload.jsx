import React from 'react';
import { HiOutlineDocument } from 'react-icons/hi';
import { PiFileCsvLight, PiFilePdfDuotone } from 'react-icons/pi';

const DocumentDownload = ({
  selectedDoc,
  onChange,
  exportData,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <form>
        <select
          className="block w-full py-1.5 px-2 text-sm border-2 text-gray-400 border-gray-300 rounded-full bg-gray-50 outline-none"
          onChange={onChange}
        >
          <option hidden>Download</option>

          <option value="csv">CSV</option>
          <option value="pdf">PDF</option>
        </select>
      </form>
      {selectedDoc === null && (
        <HiOutlineDocument className="text-2xl text-gray-500" />
      )}
      {selectedDoc === "csv" && (
        <PiFileCsvLight
          className="text-3xl text-gray-500"
          onClick={() => exportData("csv")}
        />
      )}
      {selectedDoc === "pdf" && (
        <PiFilePdfDuotone
          className="text-3xl text-gray-500"
          onClick={() => exportData("pdf")}
        />
      )}
    </div>
  );
};

export default DocumentDownload;