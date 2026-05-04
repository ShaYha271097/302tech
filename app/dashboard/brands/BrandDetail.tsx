
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import Topbar from "../components/TopBar";
import MobileSidebar from "../components/MobileSidebar";
import { useRouter, useSearchParams } from "next/navigation";
import AddPBrandDialog from "./AddPBrandDialog";
import { Suspense } from "react";
type Brand = {  
    _id: string
    name: string
    slug: string
    image:string
    createdAt: string
}

export default function BrandDetail() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get("search") || "";
    const [search, setSearch] = useState(initialSearch);
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [total, setTotal] = useState(0)
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [brands, setBrands] = useState<Brand[]>([]);
      const totalPages = Math.ceil(total / limit)
      const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)
    useEffect(() => {
        fetch("/api/brands")
            .then(res => res.json())
            .then(data => {
                console.log("data>>>", data)
                setBrands(data)
            });
    }, []);


  const fetchProducts = async (keyword: string) => {
    const res = await fetch(`/api/brands?search=${keyword}`);
    const data = await res.json();
    setBrands(data);
  };
 const handleBulkDelete = async () => {
    const ok = confirm(`Xóa ${selectedIds.length} thương hiệu ?`);
    if (!ok) return;

    await fetch("/api/brands/bulk-delete", {
      method: "POST",
      body: JSON.stringify({ ids: selectedIds }),
    });

    setBrands((prev) =>
      prev.filter((p) => !selectedIds.includes(p._id))
    );

    setSelectedIds([]);
  };


    return (
        <>
            {/* ================= HEADER TOP ================= */}
            <DashboardHeader onOpenSidebar={() => setOpenSidebar(true)} />
            {/* ================= TOPBAR ================= */}
            <Topbar title="Sản phẩm" showSearch showAdd 
            onAdd={() => {
                setEditingProduct(null);
                setOpen(true);
            }} 
            onSearch={(value) => {
                setSearch(value);
                router.push(`?search=${value}`);
            }} 
            selectedCount={selectedIds.length}
             onDelete={handleBulkDelete}
            />

            <div className="flex min-h-screen bg-gray-50">
                <section className="hidden md:block w-[70px] lg:w-[240px] bg-white border-r transition-all duration-300">
                    <Sidebar />
                </section>

                {/* MOBILE SIDEBAR */}
                {/* <MobileSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} /> */}
               
        <section className="flex-1 p-4 overflow-y-auto">
                    {/* ================= DESKTOP TABLE ================= */}
                   <div className="hidden md:block border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-blue-100 text-left">
                                <tr>
                                    <th className="p-2">
                                        <input
                                            type="checkbox"
                                            checked={
                                                brands.length > 0 &&
                                                selectedIds.length === brands.length
                                            }
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedIds(brands.map((p) => p._id));
                                                } else {
                                                    setSelectedIds([]);
                                                }
                                            }}
                                        />
                                    </th>
                                    <th className="p-2">Hình ảnh</th>
                                    <th className="p-2">Tên</th>
                                    <th className="p-2">Slug</th>
                                    <th className="p-2">Ngày Tạo</th>
                                    <th className="p-2">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brands.map((p) => {
                                    return (
                                        <React.Fragment key={p._id}>

                                            {/* ROW */}
                                            <tr className="border-b hover:bg-gray-200" style={{ borderBottom: "0.5px solid #d1d5db" }}>
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
                                                    <img
                                                          src={p.image || "https://via.placeholder.com/60"}
                                                        className="w-10 h-10 object-cover rounded"
                                                    />
                                                    </td>
                                                <td className="p-2 text-red-500">
                                                    {p.name}
                                                </td>

                                                <td className="p-2">
                                                    {p.slug}
                                                </td>

                                                <td className="p-2">
                                                    {new Date(p.createdAt).toLocaleDateString("vi-VN")}
                                                </td>

                                                <td className="p-2">
                                                    <button
                                                        className="px-2 py-1 text-blue-600 bg-blue-50 rounded"
                                                        onClick={() => {
                                                            setEditingProduct(p);
                                                            setOpen(true);
                                                        }}
                                                    >
                                                        Sửa
                                                    </button>
                                                </td>

                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                     {/* ================= PAGINATION ================= */}
                <div className="flex flex-col md:flex-row gap-3 items-center justify-between mt-4">

                    {/* LEFT */}
                    <div className="flex items-center gap-2">
                        <span>Hiển thị:</span>

                        <select
                            value={limit}
                            onChange={(e) => {
                                setLimit(Number(e.target.value));
                                setPage(1);
                            }}
                            className="border rounded px-2 py-1"
                        >
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    {/* CENTER */}
                    <div className="flex items-center gap-2">

              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                ⏮
              </button>

              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                ◀
              </button>

              <input
                type="number"
                value={page}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (val < 1) val = 1;
                  if (val > totalPages) val = totalPages || 1;
                  setPage(val);
                }}
                className="w-12 text-center border rounded"
              />

              <span>/ {totalPages}</span>

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                ▶
              </button>

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



            <AddPBrandDialog
        open={open}
        setOpen={setOpen}
        mode={editingProduct ? "edit" : "create"}
        brand={editingProduct}
        onSuccess={() => fetchProducts(search)}
      />
        </>
    )
}
