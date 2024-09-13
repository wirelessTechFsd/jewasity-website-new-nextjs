import React, { useEffect, useState } from "react";

const Pagination = ({ totalPages, selectedPage, onPageChange }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    setPageNumbers(pages);
  }, [totalPages]);

  const handleNext = () => {
    if (selectedPage < totalPages) {
      onPageChange(selectedPage + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedPage > 1) {
      onPageChange(selectedPage - 1);
    }
  };

  const startIndex = Math.max(selectedPage - 3, 0);
  const visiblePages = pageNumbers.slice(startIndex, startIndex + 3);

  return (
    <div className="flex justify-end items-center gap-[12px]">
      <div
        className={`h-[36px] w-[36px] cursor-pointer flex items-center justify-center rounded-[11px] border-[1px] ${
          selectedPage === 1
            ? "border-grey-light text-grey-light cursor-not-allowed"
            : "border-grey-dark text-grey-dark"
        }`}
        onClick={selectedPage > 1 ? handlePrevious : null}
      >
        {"<"}
      </div>

      {visiblePages.map((item) => (
        <div
          key={item}
          className={`h-[36px] w-[36px] cursor-pointer flex items-center justify-center rounded-[11px] border-[1px] ${
            item === selectedPage
              ? "border-primary text-primary"
              : "border-grey-dark text-grey-dark"
          }`}
          onClick={() => onPageChange(item)}
        >
          {item}
        </div>
      ))}

      <div
        className={`h-[36px] w-[36px] cursor-pointer flex items-center justify-center rounded-[11px] border-[1px] ${
          selectedPage === totalPages
            ? "border-grey-light text-grey-light cursor-not-allowed"
            : "border-grey-dark text-grey-dark"
        }`}
        onClick={selectedPage < totalPages ? handleNext : null}
      >
        {">"}
      </div>
    </div>
  );
};

export default Pagination;
