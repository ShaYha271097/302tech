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
    isActive: boolean;
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
    const handleToggleActive = async (
        id: string,
    ) => {
        try {
            const res = await fetch(`/api/brands/${id}/toggle-active`, {
                method: "PATCH",
            });

            const data = await res.json();

            if (data.success) {
                fetchBrands();
            }
        } catch (err) {
            console.log(err);
        }
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
            // onDelete={handleBulkDelete}
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
                                            <div className="flex items-center gap-2">

                                                {/* EDIT */}
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

                                                {/* HIDE / SHOW */}
                                                <button
                                                    className={`
    px-3 py-2
    rounded-lg
    font-medium
    flex items-center gap-2
    transition-all duration-300
    ${p.isActive
                                                            ? `
          bg-red-50
          text-red-500
          hover:bg-red-500
          hover:text-white
        `
                                                            : `
          bg-green-50
          text-green-600
          hover:bg-green-600
          hover:text-white
        `
                                                        }
  `}
                                                    onClick={() => handleToggleActive(p._id)}
                                                >
                                                    <i
                                                        className={`fas ${p.isActive
                                                                ? "fa-eye-slash"
                                                                : "fa-eye"
                                                            } text-[13px]`}
                                                    />

                                                    {p.isActive ? "Ẩn" : "Hiện"}
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ================= MOBILE LIST ================= */}
                    <div className="md:hidden space-y-3">

                       
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
                                <div className="mt-3 flex justify-end gap-2">
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
                                       {/* HIDE / SHOW */}
                                                <button
                                                    className={`
    px-3 py-2
    rounded-lg
    font-medium
    flex items-center gap-2
    transition-all duration-300
    ${p.isActive
                                                            ? `
          bg-red-50
          text-red-500
          hover:bg-red-500
          hover:text-white
        `
                                                            : `
          bg-green-50
          text-green-600
          hover:bg-green-600
          hover:text-white
        `
                                                        }
  `}
                                                    onClick={() => handleToggleActive(p._id)}
                                                >
                                                    <i
                                                        className={`fas ${p.isActive
                                                                ? "fa-eye-slash"
                                                                : "fa-eye"
                                                            } text-[13px]`}
                                                    />

                                                    {p.isActive ? "Ẩn" : "Hiện"}
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