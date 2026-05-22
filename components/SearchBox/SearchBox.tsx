"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    router.push(`/products?search=${encodeURIComponent(keyword.trim())}`);
  };


  return (
    <form
      onSubmit={handleSearch}
      className="frm_timkiem timkiem_header "
    >
      <input
        type="text"
        className="input"
        placeholder="Nhập từ khóa cần tìm..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button type="submit" className="nut_tim">
        <i className="fas fa-search" />
      </button>
    </form>
  );
}