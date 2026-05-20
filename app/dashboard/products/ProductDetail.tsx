
"use client";
import React, { useState } from "react";
import Link from "next/link";
import AddProductDialog from "./AddProductDialog";
import { Pencil, Trash2 } from "lucide-react"
import { useEffect } from "react"
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import Topbar from "../components/TopBar";
import { useRouter, useSearchParams } from "next/navigation";
import MobileSidebar from "../components/MobileSidebar";
import DashboardPagination from "../components/DashboardPagination";
type Variant = {
  id: string;
  cpu: string;
  ram: string;
  ssd: string;
  gpu: string;
  price: number;
  screenSize: string;
  resolution: string;
  refreshRate: string;
};

type Product = {
  _id: string
  name: string
  mainImage: string
  gallery: string[]
  createdAt: string
  variants: Variant[]
  brand?: {
    name: string
  }
  isHot?: boolean
  isNew?: boolean
  isActive: boolean;
}

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const totalPages = Math.ceil(total / limit);

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const fetchProducts = async () => {
    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));

    if (search) {
      params.set("search", search);
    }

    const res = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();

    setProducts(data.products || []);
    setTotal(data.total || 0);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (search) {
        params.set("search", search);
      }

      router.push(`/dashboard/products?${params.toString()}`);

      fetchProducts();
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, page, limit]);

  const handleBulkDelete = async () => {
    const ok = confirm(`Xóa ${selectedIds.length} sản phẩm?`);
    if (!ok) return;

    await fetch("/api/products/bulk-delete", {
      method: "POST",
      body: JSON.stringify({ ids: selectedIds }),
    });

    setProducts((prev) =>
      prev.filter((p) => !selectedIds.includes(p._id))
    );

    setSelectedIds([]);
  };

  const toggleField = async (
    id: string,
    field: "isHot" | "isNew" | "isActive",
    api: string
  ) => {
    const res = await fetch(`/api/products/${id}/${api}`, {
      method: "PATCH",
    });

    if (!res.ok) return;

    setProducts((prev) =>
      prev.map((p) =>
        p._id === id
          ? { ...p, [field]: !p[field] }
          : p
      )
    );
  };
  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <>
      {/* ================= HEADER TOP ================= */}
      <DashboardHeader onOpenSidebar={() => setOpenSidebar(true)} />
      {/* ================= TOPBAR ================= */}
      <Topbar title="Quản lý sản phẩm" showSearch showAdd onAdd={() => {
        setEditingProduct(null);
        setOpen(true);
      }} onSearch={(value) => {
        setSearch(value);
        router.push(`?search=${value}`);
      }} selectedCount={selectedIds.length}
        onDelete={handleBulkDelete} />

      <div className="flex min-h-screen bg-gray-50">
        <section className="hidden md:block w-[70px] lg:w-[240px] bg-white border-r transition-all duration-300">
          <Sidebar />
        </section>

        {/* MOBILE SIDEBAR */}
        <MobileSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />


        <section className="flex-1 px-3 md:px-4 py-2.5 overflow-y-auto">

          {/* ================= MOBILE CARD ================= */}
          <div className="md:hidden space-y-3">

            {/* SELECT ALL */}
            {products.length > 0 && (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 flex items-center gap-3">
                <input
                  type="checkbox"
                  className="accent-[#ff7a00] w-4 h-4"
                  checked={
                    selectedIds.length === products.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(
                        products.map((p) => p._id)
                      );
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                />

                <span className="text-sm font-medium text-[#111111]">
                  Chọn tất cả
                </span>
              </div>
            )}

            {/* PRODUCT ITEM */}
            {products.map((p) => {
              const first = p.variants[0];
              const more = p.variants.length - 1;

              return (
                <div
                  key={p._id}
                  className="
                        bg-white
                        border border-[#E5E7EB]
                        rounded-xl
                        p-3
                        shadow-sm
                    "
                >
                  {/* TOP */}
                  <div className="flex gap-3">

                    {/* CHECKBOX */}
                    <input
                      type="checkbox"
                      className="accent-[#ff7a00] w-4 h-4 mt-1"
                      checked={selectedIds.includes(p._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds((prev) => [
                            ...prev,
                            p._id,
                          ]);
                        } else {
                          setSelectedIds((prev) =>
                            prev.filter(
                              (id) => id !== p._id
                            )
                          );
                        }
                      }}
                    />

                    {/* IMAGE */}
                    <img
                      src={
                        p.mainImage ||
                        "https://via.placeholder.com/60"
                      }
                      className="
                                w-20 h-20
                                object-cover
                                rounded-lg
                                border border-[#E5E7EB]
                            "
                    />

                    {/* INFO */}
                    <div className="flex-1 min-w-0">

                      <h3 className="font-semibold text-[#111111] line-clamp-2">
                        {p.name}
                      </h3>

                      <p className="text-[#ff7a00] font-semibold text-sm mt-1">
                        {first?.price?.toLocaleString() || 0} đ
                      </p>

                      <p className="text-xs text-[#6B7280] mt-1 line-clamp-1">
                        {first?.cpu} / {first?.ram} / {first?.ssd}
                        {more > 0 && ` (+${more})`}
                      </p>

                      <p className="text-xs text-[#9CA3AF] mt-2">
                        {new Date(
                          p.createdAt
                        ).toLocaleDateString("vi-VN")}
                      </p>

                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="flex items-center gap-3 mt-3">
                    {/* ACTIVE TOGGLE */}
                    <button
                      onClick={() => toggleField(p._id, "isActive", "toggle-active")}
                      className={`
                relative
                w-11 h-6
                rounded-full
                transition-all duration-300
                ${p.isActive
                          ? "bg-[#ff7a00]"
                          : "bg-[#E5E7EB]"
                        }
            `}
                      title={
                        p.isActive
                          ? "Đang bán"
                          : "Ngừng bán"
                      }
                    >
                      <div
                        className={`
                    absolute top-0.5
                    w-5 h-5
                    rounded-full
                    bg-white
                    shadow-sm
                    transition-all duration-300
                    ${p.isActive
                            ? "left-[22px]"
                            : "left-[2px]"
                          }
                `}
                      />
                    </button>
                    {/* HOT */}
                    <button
                      onClick={() => toggleField(p._id, "isHot", "toggle-hot")}
                      className="
                                flex items-center gap-1
                                px-2 py-1
                                rounded-lg
                                bg-[#FFF7ED]
                                text-[#ff7a00]
                                text-xs
                                font-medium
                            "
                    >
                      <i
                        className={
                          p.isHot
                            ? "fas fa-star text-yellow-500"
                            : "far fa-star"
                        }
                      />

                      Hot
                    </button>

                    {/* NEW */}
                    <button
                      onClick={() => toggleField(p._id, "isNew", "toggle-new")}
                      className="
                                flex items-center gap-1
                                px-2 py-1
                                rounded-lg
                                bg-[#ECFDF3]
                                text-green-600
                                text-xs
                                font-medium
                            "
                    >
                      <i
                        className={
                          p.isNew
                            ? "fas fa-bolt"
                            : "far fa-bolt"
                        }
                      />

                      New
                    </button>

                  </div>

                  {/* ACTION */}
                  <div className="flex justify-between items-center mt-4">

                    <button
                      onClick={() => toggleExpand(p._id)}
                      className="
                                text-sm
                                text-[#ff7a00]
                                font-medium
                            "
                    >
                      {expandedId === p._id
                        ? "Thu gọn"
                        : "Chi tiết"}
                    </button>

                    <button
                      className="
                                px-3 py-2
                                rounded-lg
                                bg-[#FFF3E8]
                                text-[#ff7a00]
                                font-medium
                                text-sm
                                hover:bg-[#ff7a00]
                                hover:text-white
                                transition-all duration-300
                            "
                      onClick={() => {
                        setEditingProduct(p);
                        setOpen(true);
                      }}
                    >
                      Sửa
                    </button>

                  </div>

                  {/* EXPAND */}
                  {expandedId === p._id && (
                    <div className="mt-4 border-t border-[#F3F4F6] pt-3">

                      {/* BRAND */}
                      <div className="mb-3">
                        <span className="text-xs text-[#6B7280]">
                          Thương hiệu:
                        </span>

                        <span
                          className="
                                        ml-2
                                        inline-flex
                                        px-2 py-1
                                        rounded-lg
                                        bg-[#F9FAFB]
                                        text-xs
                                        font-medium
                                    "
                        >
                          {p.brand?.name || "-"}
                        </span>
                      </div>

                      {/* VARIANTS */}
                      <div className="space-y-2">
                        {p.variants.map((v) => (
                          <div
                            key={v.id}
                            className="
                                            flex justify-between items-center
                                            border border-[#F3F4F6]
                                            rounded-lg
                                            px-3 py-2
                                        "
                          >
                            <div className="text-xs text-[#374151]">
                              {v.cpu} / {v.ram} / {v.ssd}
                            </div>

                            <div className="text-[#ff7a00] text-sm font-semibold">
                              {v.price.toLocaleString()} đ
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">

            <table className="w-full text-sm border-collapse">

              {/* HEADER */}
              <thead className="border-b border-[#E5E7EB]">
                <tr className="text-[#111111]">

                  <th className="px-4 py-2.5 w-[50px] text-center align-middle">
                    <input
                      type="checkbox"
                      className="accent-[#ff7a00] w-4 h-4 align-middle"
                      checked={
                        products.length > 0 &&
                        selectedIds.length === products.length
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds(
                            products.map((p) => p._id)
                          );
                        } else {
                          setSelectedIds([]);
                        }
                      }}
                    />
                  </th>

                  <th className="px-4 py-2.5 text-center font-semibold">
                    Trạng thái
                  </th>

                  <th className="px-4 py-2.5 text-left font-semibold">
                    Ảnh
                  </th>

                  <th className="px-4 py-2.5 text-left font-semibold">
                    Tên sản phẩm
                  </th>

                  <th className="px-4 py-2.5 text-left font-semibold">
                    Giá
                  </th>

                  <th className="px-4 py-2.5 text-left font-semibold">
                    Cấu hình
                  </th>

                  <th className="px-4 py-2.5 text-left font-semibold">
                    Ngày tạo
                  </th>

                  <th className="px-4 py-2.5 text-left font-semibold">
                    Hành động
                  </th>

                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {products.map((p) => {
                  const first = p.variants[0];
                  const more = p.variants.length - 1;

                  return (
                    <React.Fragment key={p._id}>

                      {/* ROW */}
                      <tr
                        className="
                                    border-b border-[#F3F4F6]
                                    hover:bg-[#FFF7ED]
                                    transition-all duration-200
                                "
                      >
                        {/* CHECKBOX */}
                        <td className="px-4 py-2.5">
                          <input
                            type="checkbox"
                            className="accent-[#ff7a00] w-4 h-4"
                            checked={selectedIds.includes(p._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds((prev) => [
                                  ...prev,
                                  p._id,
                                ]);
                              } else {
                                setSelectedIds((prev) =>
                                  prev.filter(
                                    (id) => id !== p._id
                                  )
                                );
                              }
                            }}
                          />
                        </td>

                        {/* STATUS */}
                        <td className="px-4 py-2.5">
                          <div className="flex items-center justify-center gap-2">

                            {/* ACTIVE TOGGLE */}
                            <button
                              onClick={() => toggleField(p._id, "isActive", "toggle-active")}
                              className={`
                relative
                w-11 h-6
                rounded-full
                transition-all duration-300
                ${p.isActive
                                  ? "bg-[#ff7a00]"
                                  : "bg-[#E5E7EB]"
                                }
            `}
                              title={
                                p.isActive
                                  ? "Đang bán"
                                  : "Ngừng bán"
                              }
                            >
                              <div
                                className={`
                    absolute top-0.5
                    w-5 h-5
                    rounded-full
                    bg-white
                    shadow-sm
                    transition-all duration-300
                    ${p.isActive
                                    ? "left-[22px]"
                                    : "left-[2px]"
                                  }
                `}
                              />
                            </button>

                            {/* HOT */}
                            <button
                              onClick={() => toggleField(p._id, "isHot", "toggle-hot")}
                              className={`
                w-8 h-8
                rounded-lg
                border
                flex items-center justify-center
                transition-all duration-300
                ${p.isHot
                                  ? "bg-[#FFF7ED] border-[#FED7AA] text-[#ff7a00]"
                                  : "bg-white border-[#E5E7EB] text-[#9CA3AF] hover:border-[#FED7AA] hover:text-[#ff7a00]"
                                }
            `}
                              title="Sản phẩm nổi bật"
                            >
                              <i className="fas fa-star text-[13px]" />
                            </button>

                            {/* NEW */}
                            <button
                              onClick={() => toggleField(p._id, "isNew", "toggle-new")}
                              className={`
                w-8 h-8
                rounded-lg
                border
                flex items-center justify-center
                transition-all duration-300
                ${p.isNew
                                  ? "bg-[#ECFDF3] border-[#BBF7D0] text-[#16A34A]"
                                  : "bg-white border-[#E5E7EB] text-[#9CA3AF] hover:border-[#BBF7D0] hover:text-[#16A34A]"
                                }
            `}
                              title="Hàng mới về"
                            >
                              <i className="fas fa-bolt text-[13px]" />
                            </button>

                          </div>
                        </td>
                        {/* IMAGE */}
                        <td className="px-4 py-2.5">
                          <img
                            src={
                              p.mainImage ||
                              "https://via.placeholder.com/60"
                            }
                            className="
                                            w-12 h-12
                                            object-cover
                                            rounded-lg
                                            border border-[#E5E7EB]
                                        "
                          />
                        </td>

                        {/* NAME */}
                        <td
                          className="
                                        px-4 py-2.5
                                        font-semibold
                                        text-[#111111]
                                        cursor-pointer
                                        hover:text-[#ff7a00]
                                    "
                          onClick={() => toggleExpand(p._id)}
                        >
                          {expandedId === p._id ? "▼" : "▶"} {p.name}
                        </td>

                        {/* PRICE */}
                        <td className="px-4 py-2.5 text-[#ff7a00] font-semibold">
                          {first?.price?.toLocaleString() || 0} đ
                        </td>

                        {/* CONFIG */}
                        <td className="px-4 py-2.5 text-[#6B7280]">
                          {first?.cpu} / {first?.ram} / {first?.ssd}
                          {more > 0 && ` (+${more})`}
                        </td>

                        {/* DATE */}
                        <td className="px-4 py-2.5 text-[#6B7280]">
                          {new Date(
                            p.createdAt
                          ).toLocaleDateString("vi-VN")}
                        </td>

                        {/* ACTION */}
                        <td className="px-4 py-2.5">
                          <button
                            className="
                                            px-3 py-2
                                            rounded-lg
                                            bg-[#FFF3E8]
                                            text-[#ff7a00]
                                            font-medium
                                            hover:bg-[#ff7a00]
                                            hover:text-white
                                            transition-all duration-300
                                        "
                            onClick={() => {
                              setEditingProduct(p);
                              setOpen(true);
                            }}
                          >
                            Sửa
                          </button>
                        </td>
                      </tr>

                      {/* EXPAND */}
                      {expandedId === p._id && (
                        <tr>
                          <td
                            colSpan={8}
                            className="bg-[#FFFDFB] px-6 py-5"
                          >
                            <div className="flex gap-6">

                              {/* IMAGE */}
                              <div className="w-48 h-48 flex-shrink-0">
                                <img
                                  src={
                                    p.mainImage ||
                                    "https://via.placeholder.com/150"
                                  }
                                  className="
                                                        w-full h-full
                                                        object-cover
                                                        rounded-xl
                                                        border border-[#E5E7EB]
                                                    "
                                />
                              </div>

                              {/* INFO */}
                              <div className="flex-1">

                                <h2 className="text-xl font-semibold text-[#111111] border-b border-[#F3F4F6] pb-3 mb-4">
                                  {p.name}
                                </h2>

                                <div className="mb-4">
                                  <span className="text-sm text-[#6B7280]">
                                    Thương hiệu:
                                  </span>

                                  <span
                                    className="
                                                            ml-2
                                                            inline-flex
                                                            px-2 py-1
                                                            rounded-lg
                                                            bg-[#F9FAFB]
                                                            text-sm
                                                            font-medium
                                                        "
                                  >
                                    {p.brand?.name || "-"}
                                  </span>
                                </div>

                                <p className="font-medium mb-3">
                                  Cấu hình:
                                </p>

                                <div className="space-y-2">
                                  {p.variants.map((v) => (
                                    <div
                                      key={v.id}
                                      className="
                                                                flex justify-between items-center
                                                                border border-[#F3F4F6]
                                                                rounded-lg
                                                                px-4 py-3
                                                            "
                                    >
                                      <span>
                                        {v.cpu} / {v.ram} / {v.ssd}
                                      </span>

                                      <span className="text-[#ff7a00] font-semibold">
                                        {v.price.toLocaleString()} đ
                                      </span>
                                    </div>
                                  ))}
                                </div>

                              </div>
                            </div>
                          </td>
                        </tr>
                      )}

                    </React.Fragment>
                  );
                })}
              </tbody>

            </table>
          </div>

          {/* ================= PAGINATION ================= */}
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
              label="sản phẩm"
            />
          </div>

        </section>
      </div>



      <AddProductDialog
        open={open}
        setOpen={setOpen}
        mode={editingProduct ? "edit" : "create"}
        product={editingProduct}
        onSuccess={() => fetchProducts()}
      />
    </>
  )
}


