import { useState } from "react";

type Props = {
  title: string;
  showSearch?: boolean;
  showAdd?: boolean;
  onAdd?: () => void;
  onSearch?: (value: string) => void;
  selectedCount?: number;
  onDelete?: () => void;
};

export default function Topbar({
  title,
  showSearch,
  showAdd,
  onAdd,
  onSearch,
  selectedCount = 0,
  onDelete,
}: Props) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    onSearch?.(value.trim());
  };

  return (
    <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">

      {/* LEFT - TITLE */}
      <h4 className="text-lg font-semibold w-[240px]">
        {title}
      </h4>

      {/* RIGHT */}
      <div className="flex flex-1 justify-between items-center">

        {/* SEARCH */}
        {showSearch ? (
          <div className="flex items-center bg-white rounded overflow-hidden">
            <input
              type="text"
              value={value}
              placeholder="Tìm kiếm..."
              className="px-3 py-1 text-sm text-black outline-none"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />

            <button
              onClick={handleSearch}
              className="px-3 text-black hover:text-gray-700"
            >
              <i className="fas fa-search" />
            </button>
          </div>
        ) : <div />}

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          {/* ADD */}
          {selectedCount === 0 && showAdd && (
            <button
              onClick={onAdd}
              className="bg-white text-blue-600 px-3 py-1.5 rounded text-sm hover:bg-gray-100"
            >
              + Thêm
            </button>
          )}

          {/* DELETE */}
          {selectedCount > 0 && (
            <button
              onClick={onDelete}
              className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600"
            >
              Xóa ({selectedCount})
            </button>
          )}

        </div>
      </div>
    </div>
  );
}