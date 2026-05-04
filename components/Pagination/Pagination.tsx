export default function Pagination({ page, totalPages, onChange }: any) {
  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center gap-2 mt-6 mb-6 justify-center">

      {/* PREV */}
      <button
        disabled={page === 1}
        onClick={() => page > 1 && onChange(page - 1)}
        className="px-3 py-1 border rounded min-w-[36px] hover:bg-gray-100 disabled:opacity-40"
      >
        {"<"}
      </button>

      {/* FIRST */}
      {start > 1 && (
        <>
          <button
            onClick={() => onChange(1)}
            className="px-3 py-1 border rounded min-w-[36px]"
          >
            1
          </button>
          <span>...</span>
        </>
      )}

      {/* PAGES */}
      {pages.map((p: number) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 border rounded min-w-[36px] ${
            p === page ? "bg-red-500 text-white" : "hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      {/* LAST */}
      {end < totalPages && (
        <>
          <span>...</span>
          <button
            onClick={() => onChange(totalPages)}
            className="px-3 py-1 border rounded min-w-[36px]"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* NEXT */}
      <button
        disabled={page === totalPages}
        onClick={() => page < totalPages && onChange(page + 1)}
        className="px-3 py-1 border rounded min-w-[36px] hover:bg-gray-100 disabled:opacity-40"
      >
        {">"}
      </button>
    </div>
  );
}