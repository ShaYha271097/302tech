"use client";

type Props = {
    page: number;
    setPage: (page: number | ((prev: number) => number)) => void;

    limit: number;
    setLimit: (limit: number) => void;

    totalPages: number;

    start: number;
    end: number;
    total: number;

    label?: string;
};

export default function DashboardPagination({
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    start,
    end,
    total,
    label = "dữ liệu",
}: Props) {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-3">

            {/* LEFT */}
            <div className="flex items-center gap-2 text-sm leading-7">

                <span className="text-[#6B7280]">
                    Hiển thị:
                </span>

                <select
                    value={limit}
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPage(1);
                    }}
                                    className="
                                    cursor-pointer
                        h-9
                        px-3
                        border border-[#E5E7EB]
                        rounded-lg
                        bg-white
                        text-[#111111]
                        outline-none
                        focus:border-[#ff7a00]
                    "
                >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>

            </div>

            {/* CENTER */}
            <div className="flex items-center gap-2">

                {/* FIRST */}
                <button
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                    className="
                    w-9 h-9
                    border border-[#E5E7EB]
                    rounded-lg
                    bg-white
                    text-[#9CA3AF]
                    hover:border-[#ff7a00]
                    hover:text-[#ff7a00]
                    disabled:opacity-40
                    transition-all duration-300
                    cursor-pointer
                    "
                >
                    «
                </button>

                {/* PREV */}
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="
      w-9 h-9
      border border-[#E5E7EB]
      rounded-lg
      bg-white
      text-[#9CA3AF]
      hover:border-[#ff7a00]
      hover:text-[#ff7a00]
      disabled:opacity-40
      transition-all duration-300
      cursor-pointer
    "
                >
                    ‹
                </button>

                {/* PAGE LIST */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
                    <button
                        key={item}
                        onClick={() => setPage(item)}
                        className={`
        w-9 h-9
        rounded-lg
        border
        text-sm leading-7
        transition-all duration-300

        ${page === item
                                ? `
              bg-[#FFF3E8]
              border-[#FFE0BF]
              text-[#ff7a00]
              font-semibold
            `
                                : `
              bg-white
              border-[#E5E7EB]
              text-[#6B7280]
              hover:border-[#ff7a00]
              hover:text-[#ff7a00]
              cursor-pointer
            `
                            }
      `}
                    >
                        {item}
                    </button>
                ))}

                {/* NEXT */}
                <button
                    onClick={() =>
                        setPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={page === totalPages}
                    className="
      w-9 h-9
      border border-[#E5E7EB]
      rounded-lg
      bg-white
      text-[#9CA3AF]
      hover:border-[#ff7a00]
      hover:text-[#ff7a00]
      disabled:opacity-40
      transition-all duration-300
      cursor-pointer
    "
                >
                    ›
                </button>

                {/* LAST */}
                <button
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                    className="
      w-9 h-9
      border border-[#E5E7EB]
      rounded-lg
      bg-white
      text-[#9CA3AF]
                hover:border-[#ff7a00]
                hover:text-[#ff7a00]
                disabled:opacity-40
                transition-all duration-300
                cursor-pointer
                "
                >
                    »
                </button>

            </div>

            {/* RIGHT */}
            <div className="text-sm leading-7 text-[#6B7280]">
                {start}-{end} trong {total} sản phẩm
            </div>

        </div>
    );
}