import React from "react";

const Pagination = ({
  Length,
  currentPage,
  totalPages,
  paginate,
  hasNextPage,
  firstIndex,
  lastIndex,
}) => {
  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya">
        Showing{" "}
        <span className="text-gray-700">
          {firstIndex + 1} to {Math.min(lastIndex, Length)}
        </span>{" "}
        of <span className="text-gray-900">{Length} entries</span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 font-alegerya">
        <li>
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-s-lg hover:bg-paginate-bg hover:text-primary-hover"
          >
            &lt;&lt;
          </button>
        </li>

        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover"
          >
            Back
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(
            Math.max(0, currentPage - 2),
            Math.min(totalPages, currentPage + 1)
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

        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={hasNextPage}
            className="flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover"
          >
            Next
          </button>
        </li>

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

export default Pagination;
