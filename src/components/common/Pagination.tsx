import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdFirstPage, MdLastPage } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handleFirst = () => onPageChange(1);
  const handlePrevious = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));
  const handleLast = () => onPageChange(totalPages);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 mr-2">
        Record <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>

      <button
        onClick={handleFirst}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        aria-label="First page"
      >
        <MdFirstPage className="text-lg" />
      </button>

      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        aria-label="Previous page"
      >
        <IoChevronBack className="text-lg" />
      </button>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-700 rounded hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed transition"
        aria-label="Next page"
      >
        <IoChevronForward className="text-lg" />
      </button>

      <button
        onClick={handleLast}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-700 rounded hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed transition"
        aria-label="Last page"
      >
        <MdLastPage className="text-lg" />
      </button>
    </div>
  );
}
