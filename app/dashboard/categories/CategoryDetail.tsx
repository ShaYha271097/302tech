
"use client";

import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar";
import { useRouter } from "next/navigation";
import AddCategoryDialog from "./AddCategoryDialog";
import DashboardPagination from "../components/DashboardPagination";
import MobileSidebar from "../components/MobileSidebar";
import { CloudinaryImage } from "@/types/image";

type Category = {
  _id: string;
  name: string;
  slug: string;
  image: CloudinaryImage | null;
  description?: string;
  sortOrder: number;
  createdAt: string;
  isActive: boolean;
};

type Props = {
  initialCategories: Category[];
  initialTotal: number;
};

export default function CategoryDetail({
  initialCategories,
  initialTotal,
}: Props) {
  const router = useRouter();

  const [openSidebar, setOpenSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [categories, setCategories] = useState(initialCategories);
  const [total, setTotal] = useState(initialTotal);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [sort, setSort] = useState("sortOrder_asc");
  const firstRender = useRef(true);

  const totalPages = Math.ceil(total / limit);
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const fetchCategories = async (keyword = search) => {
    try {
      const params = new URLSearchParams({
        search: keyword,
        page: String(page),
        limit: String(limit),
        sort,
      });

      const res = await fetch(`/api/categories?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Không thể tải danh mục");
      }

      const data = await res.json();

      setCategories(data.categories || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Lỗi tải danh mục:", error);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    fetchCategories();
  }, [page, limit, sort]);

  const handleToggleActive = async (id: string) => {
    try {
      const res = await fetch(
        `/api/categories/${id}/toggle-active`,
        { method: "PATCH" }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        await fetchCategories();
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái danh mục:", error);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    router.push(
      `/dashboard/categories?search=${encodeURIComponent(value)}`
    );

    // Tải trực tiếp với từ khóa mới, không phụ thuộc state search
    const params = new URLSearchParams({
      search: value,
      page: "1",
      limit: String(limit),
      sort,
    });

    fetch(`/api/categories?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tìm danh mục");
        return res.json();
      })
      .then((data) => {
        setCategories(data.categories || []);
        setTotal(data.total || 0);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Topbar
        title="Quản lý danh mục"
        showSearch
        showAdd
        onAdd={() => {
          setEditingCategory(null);
          setOpen(true);
        }}
        onSearch={handleSearch}
        selectedCount={selectedIds.length}
      />

      <div className="flex min-h-screen bg-gray-50">
        {/* SIDEBAR DESKTOP */}
        <section className="w-[70px] lg:w-[240px] bg-white border-r border-[#E5E7EB] transition-all duration-300">
          <Sidebar />
        </section>

        {/* MOBILE SIDEBAR */}
        <MobileSidebar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />

        {/* CONTENT */}
        <section className="flex-1 min-w-0 px-3 md:px-4 py-2.5 overflow-y-auto">
          {/* DESKTOP TABLE */}
          <div className="hidden md:block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
            <table className="w-full text-sm leading-7 border-collapse">
              <thead className="border-b border-[#E5E7EB]">
                <tr className="text-[#111111]">
                  <th className="px-4 py-2.5 text-left font-semibold">
                    Hình ảnh
                  </th>

                  <th className="px-4 py-2.5 text-left font-semibold">
                    <button
                      onClick={() =>
                        setSort((prev) =>
                          prev === "name_asc" ? "name_desc" : "name_asc"
                        )
                      }
                      className="flex items-center gap-1"
                    >
                      Tên danh mục
                      <i
                        className={`fas ${
                          sort === "name_asc"
                            ? "fa-chevron-up"
                            : "fa-chevron-down"
                        } text-[11px]`}
                      />
                    </button>
                  </th>

                  <th className="px-4 py-2.5 text-left font-semibold">
                    Slug
                  </th>

                  {/* <th className="px-4 py-2.5 text-left font-semibold">
                    Thứ tự
                  </th> */}

                  <th className="px-4 py-2.5 text-left font-semibold">
                    <button
                      onClick={() =>
                        setSort((prev) =>
                          prev === "date_desc" ? "date_asc" : "date_desc"
                        )
                      }
                      className="flex items-center gap-1"
                    >
                      Ngày tạo
                      <i
                        className={`fas ${
                          sort === "date_desc"
                            ? "fa-chevron-up"
                            : "fa-chevron-down"
                        } text-[11px]`}
                      />
                    </button>
                  </th>

                  <th className="px-4 py-2.5 text-left font-semibold">
                    Hành động
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="border-b border-[#F3F4F6] hover:bg-[#FFF7ED] transition-all duration-200"
                  >
                    {/* IMAGE */}
                    <td className="px-4 py-2.5">
                      <img
                        src={
                          category.image?.url ||
                          "https://placehold.co/60x60?text=No+Image"
                        }
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded-lg border border-[#E5E7EB]"
                      />
                    </td>

                    {/* NAME */}
                    <td className="px-4 py-2.5">
                      <p className="font-semibold text-[#111111]">
                        {category.name}
                      </p>
                    </td>

                    {/* SLUG */}
                    <td className="px-4 py-2.5 text-[#6B7280]">
                      {category.slug}
                    </td>

                    {/* SORT ORDER */}
                    {/* <td className="px-4 py-2.5 text-[#6B7280]">
                      {category.sortOrder ?? 0}
                    </td> */}

                    {/* DATE */}
                    <td className="px-4 py-2.5 text-[#6B7280]">
                      {new Date(category.createdAt).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <button
                          className="cursor-pointer px-3 py-2 rounded-lg bg-[#FFF3E8] text-[#ff7a00] font-medium hover:bg-[#ff7a00] hover:text-white transition-all duration-300"
                          onClick={() => {
                            setEditingCategory(category);
                            setOpen(true);
                          }}
                        >
                          Sửa
                        </button>

                        <button
                          className={`cursor-pointer px-3 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 hover:text-white ${
                            category.isActive
                              ? "bg-red-50 text-red-500 hover:bg-red-500"
                              : "bg-green-50 text-green-600 hover:bg-green-600"
                          }`}
                          onClick={() =>
                            handleToggleActive(category._id)
                          }
                        >
                          <i
                            className={`fas ${
                              category.isActive
                                ? "fa-eye-slash"
                                : "fa-eye"
                            } text-[13px]`}
                          />
                          {category.isActive ? "Ẩn" : "Hiện"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      Chưa có danh mục nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE LIST */}
          <div className="md:hidden space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                Sắp xếp:
              </span>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="flex-1 h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm"
              >
                <option value="sortOrder_asc">Thứ tự hiển thị</option>
                <option value="name_asc">Tên A → Z</option>
                <option value="name_desc">Tên Z → A</option>
                <option value="date_desc">Ngày tạo mới nhất</option>
                <option value="date_asc">Ngày tạo cũ nhất</option>
              </select>
            </div>

            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-white border border-[#E5E7EB] rounded-xl p-3 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={
                      category.image?.url ||
                      "https://placehold.co/60x60?text=No+Image"
                    }
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-lg border border-[#E5E7EB]"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#111111] truncate">
                      {category.name}
                    </h3>

                    <p className="text-sm leading-7 text-[#6B7280] truncate mt-1">
                      {category.slug}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Thứ tự: {category.sortOrder ?? 0}
                    </p>

                    <p className="text-xs text-[#9CA3AF] mt-1">
                      {new Date(category.createdAt).toLocaleDateString(
                        "vi-VN"
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <button
                    className="px-3 py-2 rounded-lg bg-[#FFF3E8] text-[#ff7a00] font-medium text-sm hover:bg-[#ff7a00] hover:text-white transition-all duration-300"
                    onClick={() => {
                      setEditingCategory(category);
                      setOpen(true);
                    }}
                  >
                    Sửa
                  </button>

                  <button
                    className={`px-3 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all duration-300 hover:text-white ${
                      category.isActive
                        ? "bg-red-50 text-red-500 hover:bg-red-500"
                        : "bg-green-50 text-green-600 hover:bg-green-600"
                    }`}
                    onClick={() =>
                      handleToggleActive(category._id)
                    }
                  >
                    <i
                      className={`fas ${
                        category.isActive
                          ? "fa-eye-slash"
                          : "fa-eye"
                      } text-[13px]`}
                    />
                    {category.isActive ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>
            ))}

            {categories.length === 0 && (
              <div className="bg-white border rounded-xl p-6 text-center text-gray-500">
                Chưa có danh mục nào.
              </div>
            )}
          </div>

          {/* PAGINATION */}
          <div className="mt-4">
            <DashboardPagination
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              totalPages={totalPages}
              start={start}
              end={end}
              total={total}
              label="danh mục"
            />
          </div>
        </section>
      </div>

      <AddCategoryDialog
        open={open}
        setOpen={setOpen}
        mode={editingCategory ? "edit" : "create"}
        category={editingCategory}
        onSuccess={() => fetchCategories()}
      />
    </>
  );
}
