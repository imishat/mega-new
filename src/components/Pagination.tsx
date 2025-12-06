import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPage, onPageChange }) => {
  const maxPagesToShow = 5; // How many pages to show in pagination controls (around the current page)

  // Generate page numbers to display with ellipses
  const generatePageNumbers = () => {
    const pages: number[] = [];
    const start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const end = Math.min(totalPage, currentPage + Math.floor(maxPagesToShow / 2));

    if (start > 1) {
      pages.push(1); // Add the first page
      if (start > 2) pages.push(-1); // Add ellipsis for skipped pages
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPage) {
      if (end < totalPage - 1) pages.push(-1); // Add ellipsis for skipped pages
      pages.push(totalPage); // Add the last page
    }

    return pages;
  };


  // Handle page click
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4">
      {/* Previous Page Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {generatePageNumbers().map((page, index) => (
          page === -1 ? (
            <span key={index} className="px-3 py-1 text-gray-500">...</span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      {/* Next Page Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
