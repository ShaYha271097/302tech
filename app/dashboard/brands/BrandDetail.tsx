"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar";
import { useRouter } from "next/navigation";
import AddPBrandDialog from "./AddPBrandDialog";
import DashboardPagination from "../components/DashboardPagination";
import MobileSidebar from "../components/MobileSidebar";

type Brand = {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
};

export default function BrandDetail() {
    const router = useRouter();

    const [openSidebar, setOpenSidebar] = useState(false);

const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [brands, setBrands] = useState<Brand[]>([]);
    const [total, setTotal] = useState(0);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

    const totalPages = Math.ceil(total / limit);
    const start = total === 0 ? 0 : (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);


    const [sort, setSort] = useState("name_asc");

    const fetchBrands = async (keyword = search) => {

        const res = await fetch(
            `/api/brands?search=${keyword}&page=${page}&limit=${limit}&sort=${sort}`
        );

        const data = await res.json();

        setBrands(data.brands || []);
        setTotal(data.total || 0);
    };
    useEffect(() => {
        fetchBrands();
    }, [page, limit, sort]);
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
            <Topbar
                title="Quản lý thương hiệu"
                showSearch
                showAdd
                onAdd={() => {
                    setEditingBrand(null);
                    setOpen(true);
                }}
                onSearch={(value) => {
                    setSearch(value);
                    router.push(`?search=${value}`);
                    fetchBrands(value);
                }}
                selectedCount={selectedIds.length}
                onDelete={handleBulkDelete}
            />

            <div className="flex min-h-screen bg-gray-50">
                {/* SIDEBAR DESKTOP */}
                <section className="hidden md:block w-[70px] lg:w-[240px] bg-white border-r transition-all duration-300">
                    <Sidebar />
                </section>
                {/* MOBILE SIDEBAR */}
                <MobileSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

                {/* CONTENT */}
                <section className="flex-1 px-3 md:px-4 py-2.5 overflow-y-auto">

                    {/* ================= DESKTOP TABLE ================= */}
                    <div className="hidden md:block bg-white !border border-[#E5E7EB] rounded-xl overflow-hidden">
                        <table className="w-full text-sm leading-7 border-collapse">

                            {/* HEADER */}
                            <thead className="!border-b border-[#E5E7EB]">
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
                                                    setSelectedIds(
                                                        brands.map((p) => p._id)
                                                    );
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
                                        <button
                                            onClick={() =>
                                                setSort((prev) =>
                                                    prev === "name_asc"
                                                        ? "name_desc"
                                                        : "name_asc"
                                                )
                                            }
                                            className="flex items-center gap-1"
                                        >
                                            Tên thương hiệu

                                            <i
                                                className={`fas ${sort === "name_asc"
                                                        ? "fa-chevron-up"
                                                        : "fa-chevron-down"
                                                    } text-[11px]
      cursor-pointer
    `}

                                            />
                                        </button>
                                    </th>

                                    <th className="px-4 py-2.5 text-left font-semibold">
                                        Slug
                                    </th>

                                    <th className="px-4 py-2.5 text-left font-semibold">
                                        <button
                                            onClick={() =>
                                                setSort((prev) =>
                                                    prev === "date_desc"
                                                        ? "date_asc"
                                                        : "date_desc"
                                                )
                                            }
                                            className="flex items-center gap-1"
                                        >
                                            Ngày tạo
                                            <i
                                                className={`fas ${sort === "date_desc"
                                                        ? "fa-chevron-up"
                                                        : "fa-chevron-down"
                                                    } text-[11px]
                                  cursor-pointer
                                `}

                                            />
                                        </button>
                                    </th>

                                    <th className="px-4 py-2.5 text-left font-semibold">
                                        Hành động
                                    </th>

                                </tr>
                            </thead>

                            {/* BODY */}
                            <tbody>
                                {brands.map((p) => (
                                    <tr
                                        key={p._id}
                                        className="
                                !border-b border-[#F3F4F6]
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

                                        {/* IMAGE */}
                                        <td className="px-4 py-2.5">
                                            <img
                                                src={
                                                    p.image ||
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
                                        <td className="px-4 py-2.5">
                                            <p className="font-semibold text-[#111111]">
                                                {p.name}
                                            </p>
                                        </td>

                                        {/* SLUG */}
                                        <td className="px-4 py-2.5 text-[#6B7280]">
                                            {p.slug}
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
                                                    setEditingBrand(p);
                                                    setOpen(true);
                                                }}
                                            >
                                                Sửa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ================= MOBILE LIST ================= */}
                    <div className="md:hidden space-y-3">

                        {/* SELECT ALL */}
                        {brands.length > 0 && (
                            <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="accent-[#ff7a00] w-4 h-4"
                                    checked={
                                        selectedIds.length === brands.length
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedIds(
                                                brands.map((p) => p._id)
                                            );
                                        } else {
                                            setSelectedIds([]);
                                        }
                                    }}
                                />

                                <span className="text-sm leading-7 font-medium text-[#111111]">
                                    Chọn tất cả
                                </span>
                            </div>
                        )}

                        {/* BRAND ITEM */}
                        {brands.map((p) => (
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
                                <div className="flex items-start gap-3">

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
                                            p.image ||
                                            "https://via.placeholder.com/60"
                                        }
                                        className="
                                w-16 h-16
                                object-cover
                                rounded-lg
                                border border-[#E5E7EB]
                            "
                                    />

                                    {/* INFO */}
                                    <div className="flex-1 min-w-0">

                                        <h3 className="font-semibold text-[#111111] truncate">
                                            {p.name}
                                        </h3>

                                        <p className="text-sm leading-7 text-[#6B7280] truncate mt-1">
                                            {p.slug}
                                        </p>

                                        <p className="text-xs text-[#9CA3AF] mt-2">
                                            {new Date(
                                                p.createdAt
                                            ).toLocaleDateString("vi-VN")}
                                        </p>

                                    </div>
                                </div>

                                {/* ACTION */}
                                <div className="mt-3 flex justify-end">
                                    <button
                                        className="
                                px-3 py-2
                                rounded-lg
                                bg-[#FFF3E8]
                                text-[#ff7a00]
                                font-medium
                                text-sm leading-7
                                hover:bg-[#ff7a00]
                                hover:text-white
                                transition-all duration-300
                            "
                                        onClick={() => {
                                            setEditingBrand(p);
                                            setOpen(true);
                                        }}
                                    >
                                        Sửa
                                    </button>
                                </div>
                            </div>
                        ))}
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
                            label="thương hiệu"
                        />
                    </div>

                </section>
            </div>

            <AddPBrandDialog
                open={open}
                setOpen={setOpen}
                mode={editingBrand ? "edit" : "create"}
                brand={editingBrand}
                onSuccess={() => fetchBrands()}
            />
        </>
    );
}