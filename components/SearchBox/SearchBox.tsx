"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const value = keyword.trim();

    if (!value) return;

    // Ẩn bàn phím mobile
    inputRef.current?.blur();

    router.push(
      `/products?search=${encodeURIComponent(value)}`
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="frm_timkiem timkiem_header_mobile timkiem_header_des"
    >
      <input
        ref={inputRef}
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