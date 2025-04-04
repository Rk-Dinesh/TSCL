import React from "react";

const PaginationLimit = ({
  Length,
  currentPage,
  totalPages,
  totalItems, // Add this prop
  paginate,
  hasNextPage,
}) => {
  // Calculate the first and last index of items being displayed
  const itemsPerPage = Math.ceil(totalItems / totalPages); // Calculate items per page if needed
  const firstIndex = (currentPage - 1) * itemsPerPage + 1;
  const lastIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center pt-4"
      aria-label="Table navigation"
    >
      {/* Display the range of items being shown */}
      <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya">
        Showing{" "}
        <span className="text-gray-700">
          {firstIndex} to {lastIndex}
        </span>{" "}
        of <span className="text-gray-900">{totalItems} entries</span>
      </span>

      {/* Pagination buttons */}
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 font-alegerya">
        {/* First Page Button */}
        <li>
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-s-lg hover:bg-paginate-bg hover:text-primary-hover"
          >
           &lt;&lt;
          </button>
        </li>

        {/* Previous Page Button */}
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover"
          >
            Back
          </button>
        </li>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(
            Math.max(0, currentPage - 2), // Show up to 2 pages before the current page
            Math.min(totalPages, currentPage + 1) // Show up to 1 page after the current page
          )
          .map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`flex items-center justify-center px-3 h-8 leading-tight border border-paginate-br hover:text-white hover:bg-primary ${
                  currentPage === number
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
              >
                {number}
              </button>
            </li>
          ))}

        {/* Next Page Button */}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={!hasNextPage}
            className="flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover"
          >
            Next
          </button>
        </li>

        {/* Last Page Button */}
        <li>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-e-lg hover:bg-paginate-bg hover:text-primary-hover"
          >
             &gt;&gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationLimit;