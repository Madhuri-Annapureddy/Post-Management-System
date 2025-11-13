function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange?.(page);
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => goToPage(page)}
          className={`rounded-md px-3 py-1 text-sm font-semibold transition ${
            currentPage === page
              ? "bg-brand text-white shadow"
              : "border border-slate-200 text-slate-600 hover:bg-slate-100"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;


