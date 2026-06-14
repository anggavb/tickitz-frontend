function Pagination({
  totalItems = 0,
  itemsPerPage = 4,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const goToPrev = () => currentPage > 1 && onPageChange(currentPage - 1);
  const goToNext = () => currentPage < totalPages && onPageChange(currentPage + 1);

  return (
    <div className="mt-10 flex items-center justify-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={goToPrev}
        disabled={currentPage <= 1}
        className="h-8 rounded-md px-3 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:px-4 sm:text-base border border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-8 w-8 rounded-md text-xs font-semibold transition sm:h-12 sm:w-12 sm:text-base ${
            page === currentPage
              ? "bg-primary text-white shadow-lg shadow-primary/30"
              : "border border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={goToNext}
        disabled={currentPage >= totalPages}
        className="h-8 rounded-md px-3 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:px-4 sm:text-base border border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
