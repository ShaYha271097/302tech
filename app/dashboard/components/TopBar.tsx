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
  const [openSearch, setOpenSearch] = useState(false)
  const handleSearch = () => {
    onSearch?.(value.trim());
  };

  return (
    <div className="bg-blue-600 text-white px-3 lg:px-4 py-3 flex items-center gap-2">

      {/* TITLE */}
        <h5 className="text-lg font-semibold w-[200px] lg:w-[240px]">
        {title}
      </h5>

      {/* SEARCH */}
      {showSearch && (
       <div className="flex-1 flex justify-start">
  <div className="
    flex items-center bg-white rounded overflow-hidden
    
  ">
    <input
      type="text"
      value={value}
      placeholder="Tìm kiếm..."
      className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-black outline-none w-full"
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSearch();
      }}
    />

    <button
      onClick={handleSearch}
      className="px-2 sm:px-3 text-black hover:text-gray-700"
    >
      <i className="fas fa-search" />
    </button>
  </div>
</div>
      )}

      {/* ACTIONS */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">

        {/* ADD */}
        {selectedCount === 0 && showAdd && (
          <button
            onClick={onAdd}
            className="bg-white text-blue-600 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-gray-100"
          >
            <span className="sm:hidden">+</span>
            <span className="hidden sm:inline">+ Thêm</span>
          </button>
        )}

        {/* DELETE */}
        {selectedCount > 0 && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-600"
          >
            Xóa ({selectedCount})
          </button>
        )}
      </div>

    </div>
  );
}