
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import Topbar from "../components/TopBar";
import MobileSidebar from "../components/MobileSidebar";
import { useRouter, useSearchParams } from "next/navigation";
import AddPBrandDialog from "./AddPBrandDialog";
import { Suspense } from "react";
import DashboardPagination from "../components/DashboardPagination";
type Brand = {
    _id: string
    name: string
    slug: string
    image: string
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
                setBrands(data?.brands)
            });
    }, []);


    const fetchProducts = async (keyword: string) => {
        const res = await fetch(`/api/brands?search=${keyword}`);
        const dataBrands = await res.json();
        console.log("dataBrands", dataBrands)
        setBrands(dataBrands?.brands);
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
            <Topbar title="Quản lý thương hiệu" showSearch showAdd
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

                <section className="flex-1 px-4 py-2.5 overflow-y-auto">
                    {/* ================= DESKTOP TABLE ================= */}

                    <div className="hidden md:block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">

                        <table className="w-full text-sm  border-collapse">

                            {/* HEADER */}
                            <thead className=" !border-b !border-[#E5E7EB]">
                                <tr className="text-[#111111]">

                                    <th className="px-4 py-2.5 w-[50px] text-center align-middle">
                                        <input
                                            type="checkbox"
                                            className="accent-[#ff7a00] w-4 h-4 align-middle"
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

                                    <th className="px-4 py-2.5 text-left font-semibold">
                                        Hình ảnh
                                    </th>

                                    <th className="px-4 py-2.5 text-left font-semibold">
                                        Tên thương hiệu
                                    </th>

                                    <th className="px-4 py-2.5 text-left font-semibold">
                                        Slug
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
                                {brands.map((p) => {
                                    return (
                                        <tr
                                            key={p._id}
                                            className="
              !border-b !border-[#F3F4F6] 
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
                                                            setSelectedIds((prev) => [...prev, p._id]);
                                                        } else {
                                                            setSelectedIds((prev) =>
                                                                prev.filter((id) => id !== p._id)
                                                            );
                                                        }
                                                    }}
                                                />
                                            </td>

                                            {/* IMAGE */}
                                            <td className="px-4 py-2.5">
                                                <img
                                                    src={p.image || "https://via.placeholder.com/60"}
                                                    className="
                  w-12 h-12
                  object-cover
                  rounded-lg
                  border border-[#E5E7EB]
                "
                                                />
                                            </td>

                                            {/* NAME */}
                                            <td className="px-4 py-2.5">
                                                <p className="font-semibold text-[#111111] mb-0">
                                                    {p.name}
                                                </p>
                                            </td>

                                            {/* SLUG */}
                                            <td className="px-4 py-2.5">
                                                <span className="text-[#6B7280]">
                                                    {p.slug}
                                                </span>
                                            </td>

                                            {/* DATE */}
                                            <td className="px-4 py-2.5 text-[#6B7280]">
                                                {new Date(p.createdAt).toLocaleDateString("vi-VN")}
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
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>
                    {/* ================= PAGINATION ================= */}
                    <DashboardPagination
                        page={page}
                        setPage={setPage}
                        limit={limit}
                        setLimit={setLimit}
                        totalPages={totalPages}
                        start={start}
                        end={end}
                        total={total}
                        label="thương hiệu"
                    />
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
