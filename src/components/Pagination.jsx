function Pagination({
  totalItems = 0,
  itemsPerPage = 4,
  currentPage,
  onPageChange,
  disabled = false,
  isLoading = false,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1 && !isLoading) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const goToPrev = () => currentPage > 1 && !disabled && onPageChange(currentPage - 1);
  const goToNext = () => currentPage < totalPages && !disabled && onPageChange(currentPage + 1);

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>Loading...</span>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={goToPrev}
            disabled={disabled || currentPage <= 1}
            className="h-8 rounded-md px-3 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:px-4 sm:text-base border border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary"
          >
            Prev
          </button>

          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => !disabled && onPageChange(page)}
              disabled={disabled}
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
            disabled={disabled || currentPage >= totalPages}
            className="h-8 rounded-md px-3 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:px-4 sm:text-base border border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Pagination;
