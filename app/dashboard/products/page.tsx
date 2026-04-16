
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
type Variant = {
  id: string
  cpu: string
  ram: string
  ssd: string
  price: number
}

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
}

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const router = useRouter();

  const [openUser, setOpenUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);



  const totalPages = Math.ceil(total / limit)

  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  // debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (search) {
        params.set("search", search);
      }

      router.push(`/dashboard/products?${params.toString()}`);

      fetchProducts(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const fetchProducts = async (keyword: string) => {
    const res = await fetch(`/api/products?search=${keyword}`);
    const data = await res.json();
    setProducts(data.products);
  };






  useEffect(() => {
    fetch(`/api/products?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setTotal(data.total)
      })
  }, [page, limit])

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }


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


  return (
    <>
      {/* ================= HEADER TOP ================= */}
      <DashboardHeader />
      {/* ================= TOPBAR ================= */}
      <Topbar title="Sản phẩm" showSearch showAdd onAdd={() => setOpen(true)} onSearch={(value) => {
        setSearch(value);
        router.push(`?search=${value}`);
      }} selectedCount={selectedIds.length}
        onDelete={handleBulkDelete} />

      <div className="flex min-h-screen bg-gray-50">
        <section className="w-[240px] bg-white border-r">
          <Sidebar />
        </section>
        <section className="flex-1 p-4 overflow-y-auto">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-blue-100 text-left" >
                <tr>
                  <th className="p-2"><input
                    type="checkbox"
                    checked={
                      products.length > 0 &&
                      selectedIds.length === products.length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(products.map((p) => p._id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                  /></th>
                  <th className="p-2">
                    <button>
                      <i className="far fa-star" />
                    </button>
                  </th>
                  <th className="p-2">Ảnh</th>
                  <th className="p-2">Tên</th>
                  <th className="p-2">Giá</th>
                  <th className="p-2">Cấu hình</th>
                  <th className="p-2">Ngày</th>
                  <th className="p-2">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {
                  products.map((p) => {
                    const first = p.variants[0];
                    const more = p.variants.length - 1;

                    return (
                      <React.Fragment key={p._id}>

                        {/* ROW */}
                        <tr className="border-b border-gray-200 hover:bg-gray-200 cursor-pointer table-row-custom">
                          <td className="p-2">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(p._id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedIds((prev) => [...prev, p._id]);
                                } else {
                                  setSelectedIds((prev) =>
                                    prev.filter((id) => id !== p._id)
                                  );
                                }
                              }}
                            />
                          </td>

                          <td className="p-2">
                            <button>
                              <i className="far fa-star" />
                            </button>
                          </td>

                          <td className="p-2">
                            <img
                              src={p.mainImage || "https://via.placeholder.com/60"}
                              className="w-12 h-12 object-cover rounded"
                            />
                          </td>

                          <td
                            className="p-2 font-medium cursor-pointer hover:text-blue-600"
                            onClick={() => toggleExpand(p._id)}
                          >
                            {expandedId === p._id ? "▼" : "▶"}
                            {p.name}
                          </td>

                          <td className="p-2 text-red-500">
                            {first?.price?.toLocaleString() || 0} đ
                          </td>

                          <td className="p-2">
                            {first
                              ? `${first.cpu} / ${first.ram} / ${first.ssd}`
                              : "Không có"}
                            {more > 0 && ` (+${more})`}
                          </td>

                          <td className="p-2">
                            {new Date(p.createdAt).toLocaleDateString("vi-VN")}
                          </td>

                          <td className="p-2">
                            <div className="flex gap-2 items-center justify-center">
                              <button className="px-2 py-1 text-blue-600 bg-blue-50 rounded" onClick={() => {
                                setEditingProduct(p);
                                setOpen(true)
                                }} >
                                Sửa
                              </button>
                              {/* 
                              <button className="px-2 py-1 text-red-600 bg-red-50 rounded">
                                Xóa
                              </button> */}
                            </div>
                          </td>
                        </tr>

                        {/* EXPAND */}
                        {/* EXPAND */}
                        {expandedId === p._id && (
                          <tr>
                            <td colSpan={8} className="p-4 bg-gray-100">
                              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">

                                <div className="flex gap-6">

                                  {/* IMAGE */}
                                  <div className="w-48 h-48 flex-shrink-0">
                                    <img
                                      src={p.mainImage || "https://via.placeholder.com/150"}
                                      className="w-full h-full object-cover rounded-md border"
                                    />
                                  </div>

                                  {/* INFO */}
                                  <div className="flex-1">

                                    {/* NAME */}
                                    <h2 className="text-xl font-semibold pb-2 mb-2 border-b border-gray-200">
                                      {p.name}
                                    </h2>

                                    {/* BRAND */}
                                    <div className="mb-3">
                                      <span className="text-sm text-gray-500">Thương hiệu:</span>{" "}
                                      <span className="inline-block text-sm bg-gray-100 px-2 py-1 rounded font-medium">
                                        {p.brand?.name || "-"}
                                      </span>
                                    </div>

                                    {/* CONFIG TITLE */}
                                    <p className="font-medium mb-2">Cấu hình:</p>

                                    {/* VARIANTS */}
                                    <div className="space-y-2">
                                      {p.variants.map((v) => (
                                        <div
                                          key={v.id}
                                          className="flex justify-between items-center border-b border-gray-100 pb-1"
                                        >
                                          <span>
                                            • {v.cpu} / {v.ram} / {v.ssd}
                                          </span>

                                          <span className="text-red-500 font-medium">
                                            {v.price.toLocaleString()} đ
                                          </span>
                                        </div>
                                      ))}
                                    </div>

                                  </div>
                                </div>

                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                }
              </tbody>
            </table>

          </div>
          <div className="flex items-center justify-between mt-4">

            {/* LEFT */}
            <div className="flex items-center gap-2">
              <span>Hiển thị:</span>

              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value))
                  setPage(1)
                }}
                className="border rounded px-2 py-1"
              >
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            {/* CENTER */}
            <div className="flex items-center gap-2">

              {/* về đầu */}
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                ⏮
              </button>

              {/* prev */}
              <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                ◀
              </button>

              {/* input page */}
              <input
                type="number"
                value={page}
                onChange={(e) => {
                  let val = Number(e.target.value)
                  if (val < 1) val = 1
                  if (val > totalPages) val = totalPages || 1
                  setPage(val)
                }}
                className="w-12 text-center border rounded"
              />

              <span>/ {totalPages}</span>

              {/* next */}
              <button
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                ▶
              </button>

              {/* về cuối */}
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                ⏭
              </button>

            </div>

            {/* RIGHT */}
            <div>
              {start}-{end} trong {total} laptop
            </div>

          </div>
        </section>
      </div>


      <AddProductDialog open={open} setOpen={setOpen} mode="create"   onSuccess={() => fetchProducts(search)}/>
      <AddProductDialog open={open} setOpen={setOpen} mode="edit"  product={editingProduct}   onSuccess={() => fetchProducts(search)} />            
    </>
  )
}
