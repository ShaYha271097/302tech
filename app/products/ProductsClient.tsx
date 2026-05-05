"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import Breadcrumb from "./[slug]/Breadcrumb";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice, getCheapestVariant, getVariantText } from "@/lib/format";

export default function ProductsClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {
        products,
        loading,
        page,
        totalPages,
        brand,
        selectedPrices,
        ramSelected,
        ssdSelected,
    } = useProducts();
    const [showFilter, setShowFilter] = useState(false);
    
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", String(newPage));

        router.push(`/products?${params.toString()}`);

        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const toggleSSD = (ssd: string) => {
        const params = new URLSearchParams(searchParams.toString());

        const current = params.getAll("ssd");

        if (current.includes(ssd)) {
            const updated = current.filter(v => v !== ssd);

            params.delete("ssd");
            updated.forEach(v => params.append("ssd", v));
        } else {
            params.append("ssd", ssd);
        }

        router.push(`/products?${params.toString()}`);
    };

    const toggleRam = (ram: string) => {
        const params = new URLSearchParams(searchParams.toString());

        const current = params.getAll("ram");

        if (current.includes(ram)) {
            const updated = current.filter(v => v !== ram);

            params.delete("ram");
            updated.forEach(v => params.append("ram", v));
        } else {
            params.append("ram", ram);
        }

        router.push(`/products?${params.toString()}`);
    };
    const togglePrice = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        let prices = params.getAll("price");

        if (prices.includes(value)) {
            prices = prices.filter((p) => p !== value);
        } else {
            prices.push(value);
        }

        params.delete("price");
        prices.forEach((p) => params.append("price", p));

        router.push(`/products?${params.toString()}`);
    };
  


 
    return (
        <div className="wrap-main w-clear">
            <div className="fixwidth">
                <input type="hidden" name="type" id="type" defaultValue="san-pham" />
                <div className="content-main w-clear">
                    <div className="breadCrumbs_sanpham mb-3 mt-3">
                        <div>
                            <Breadcrumb brand={brand} />
                        </div>
                    </div>

                    {/* MOBILE BUTTON */}
                    <div className="lg:hidden mb-3">
                        <button
                        onClick={() => setShowFilter(true)}
                        className="w-full border px-4 py-2 rounded bg-white shadow-sm"
                        >
                        Bộ lọc
                        </button>
                    </div>

                    <div className="site-content mb-6">
                        <div className="row-product">
                            <div className="col-product-left">
                                <div className="w-64 bg-white  border shadow-sm p-4 space-y-5">

                                    {/* TITLE */}
                                    <h2 className="font-semibold text-base border-b pb-2">Bộ lọc</h2>

                                    {/* PRICE */}
                                    <div>
                                        <p className="text-sm font-medium mb-2">Giá</p>
                                        <div className="space-y-3 text-sm">
                                            {[
                                                { label: "Dưới 10 triệu", value: "0-10000000" },
                                                { label: "10 - 20 triệu", value: "10000000-20000000" },
                                                { label: "Trên 20 triệu", value: "20000000-999999999" },
                                            ].map((item) => (
                                                <label
                                                    key={item.value}
                                                    className="!flex items-center gap-3 cursor-pointer hover:text-red-500 transition"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="accent-red-500 w-4 h-4"
                                                        checked={selectedPrices.includes(item.value)} // ✅ đọc từ URL
                                                        onChange={() => togglePrice(item.value)} // 👈 đổi function
                                                    />
                                                    <span>{item.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <hr />

                                    {/* BRAND */}
                                    <div>
                                        <p className="text-sm font-medium mb-2">Hãng</p>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            {["Dell", "Lenovo", "HP", "Asus", "Acer", "MSI", "Macbook"].map((b) => {
                                                const slug = b.toLowerCase();

                                                return (
                                                    <label
                                                        key={b}
                                                        className="!flex items-center gap-2 cursor-pointer hover:text-red-500 transition"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="accent-red-500"
                                                            checked={brand === slug}
                                                            onChange={() => {
                                                                const params = new URLSearchParams(searchParams.toString());

                                                                if (slug === brand) {
                                                                    params.delete("brand"); // bỏ chọn
                                                                } else {
                                                                    params.set("brand", slug); // đổi brand
                                                                }

                                                                router.push(`/products?${params.toString()}`);
                                                            }}
                                                            readOnly                   // 👈 tránh warning React
                                                        />
                                                        <span className="leading-5">{b}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <hr />

                                    {/* RAM */}
                                    <div>
                                        <p className="text-sm font-medium mb-2">RAM</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["8GB", "16GB", "32GB"].map((ram) => {
                                                const active = ramSelected.includes(ram);

                                                return (
                                                    <button
                                                        key={ram}
                                                        onClick={() => toggleRam(ram)}
                                                        className={`px-3 py-1 border rounded-full text-xs transition
                                                        ${active
                                                                ? "bg-red-500 text-white border-red-500"
                                                                : "hover:border-red-500 hover:text-red-500"
                                                            }`}
                                                    >
                                                        {ram}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <hr />

                                    {/* SSD */}
                                    <div>
                                        <p className="text-sm font-medium mb-2">SSD</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["256GB", "512GB", "1TB"].map((ssd) => {
                                                const active = ssdSelected.includes(ssd);

                                                return (
                                                    <button
                                                        key={ssd}
                                                        onClick={() => toggleSSD(ssd)}
                                                        className={`px-3 py-1 border rounded-full text-xs transition
          ${active
                                                                ? "bg-red-500 text-white border-red-500"
                                                                : "hover:border-red-500 hover:text-red-500"
                                                            }`}
                                                    >
                                                        {ssd}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-product-right">
                                <div className="all_sp_search">

                                    {loading ? (
                                        <div className="w-full py-6 text-center text-gray-500">
                                            Đang tải sản phẩm...
                                        </div>
                                    ) : products.length === 0 ? (
                                        <div className="w-full ">
                                            <div className="w-full bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 text-center">
                                                <strong>Không tìm thấy kết quả</strong>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="loadkhung_product1 mainkhung_product">
                                            {products.map((item: any) => {
                                                const cheapest = getCheapestVariant(item.variants);

                                                return (
                                                    <div key={item._id} className="all_sp_banchay_index">
                                                        <div className="all_img_sp_bc">
                                                            <Link href={`/products/${item.slug}-${item._id}`}>
                                                                <div className="img_sp_bc">
                                                                    <div>
                                                                        <img
                                                                            loading="lazy"
                                                                            width={1276}
                                                                            height={956}
                                                                            src={item.mainImage}
                                                                            className="1"
                                                                            alt="Laptop Tèo Em - Cần Thơ"
                                                                            decoding="async"
                                                                        />
                                                                    </div>
                                                                    <div className="img_sp_2">
                                                                        <img
                                                                            loading="lazy"
                                                                            width={1276}
                                                                            height={956}
                                                                            src="https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg"
                                                                            className="1"
                                                                            alt="Laptop Tèo Em - Cần Thơ"
                                                                            decoding="async"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>

                                                        <div className="all_content_sp">
                                                            <Link href={`/products/${item.slug}-${item._id}`}>
                                                                <div className="name_sp text-split">
                                                                    {item.name} - {getVariantText(cheapest)}
                                                                </div>
                                                            </Link>

                                                            <div className="gia_sp">
                                                                <span>{formatPrice(cheapest?.price)}</span>
                                                            </div>

                                                            <div className="cart-product">
                                                                <Link
                                                                    href={`/products/${item.slug}-${item._id}`}
                                                                    className="muangay_sp"
                                                                >
                                                                    Mua ngay
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* 👉 Pagination chỉ hiện khi có data */}
                                    {!loading && products.length > 0 && (
                                        <Pagination
                                            page={page}
                                            totalPages={totalPages}
                                            onChange={handlePageChange}
                                        />
                                    )}

                                </div>

                                <div className="clear" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}