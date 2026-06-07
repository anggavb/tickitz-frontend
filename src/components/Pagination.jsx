function Pagination({
  totalItems = 0,
  itemsPerPage = 4,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-10 flex items-center justify-center gap-2 sm:gap-3">
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
    </div>
  );
}

export default Pagination;
