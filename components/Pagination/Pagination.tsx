

export default function Pagination  ({ page, totalPages, onChange }: any) {
  const pages = [];

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
console.log("pages=>>",pages)
  return (
    <div className="flex items-center gap-2 mt-6 justify-center">

      {/* PREV */}
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
      >
        {"<"}
      </button>

      {/* FIRST */}
      {start > 1 && (
        <>
          <button
            onClick={() => onChange(1)}
            className="px-3 py-1 border rounded"
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
          className={`px-3 py-1 border rounded ${
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
            className="px-3 py-1 border rounded"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* NEXT */}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
      >
        {">"}
      </button>
    </div>
  );
};