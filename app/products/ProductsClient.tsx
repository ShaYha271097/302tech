"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import Breadcrumb from "./[slug]/Breadcrumb";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice, getCheapestVariant, getVariantText } from "@/lib/format";
import ProductFilter from "./ProductFilter";

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
                    <div className="lg:hidden mb-3">
                        <button
                            onClick={() => setShowFilter(true)}
                            className="w-full border px-4 py-3 rounded-xl bg-white shadow-sm"
                        >
                            Bộ lọc
                        </button>
                    </div>
                    <div className="site-content mb-6">
                        <div className="row-product">
                            <div className="hidden lg:block col-product-left">
                                <ProductFilter
                                    selectedPrices={selectedPrices}
                                    togglePrice={togglePrice}
                                    brand={brand}
                                    searchParams={searchParams}
                                    router={router}
                                    ramSelected={ramSelected}
                                    toggleRam={toggleRam}
                                    ssdSelected={ssdSelected}
                                    toggleSSD={toggleSSD}
                                />
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
                                        <div className="loadkhung_product1 mainkhung_product !grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                                            {products.map((item: any) => {
                                                const cheapest = getCheapestVariant(item.variants);

                                                return (
                                                    <div key={item._id} className="all_sp_banchay_index !w-full">
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

                {/* MOBILE FILTER */}
         
                  <>
    {/* OVERLAY */}
    <div
        onClick={() => setShowFilter(false)}
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300
        ${showFilter
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}
    />

    {/* SIDEBAR */}
    <div
        className={`fixed top-0 left-0 h-full w-[300px] max-w-sm bg-white z-50 overflow-y-auto lg:hidden shadow-lg
        transform transition-transform duration-300
        ${showFilter
                ? "translate-x-0"
                : "-translate-x-full"
            }`}
    >

        {/* HEADER */}
        <div className="flex items-center justify-between p-3 border-b">
                    <span className="font-semibold">Bộ lọc</span>

                    <button
                         onClick={() => setShowFilter(false)}
                        className="text-xl"
                    >
                        ✕
                    </button>
                </div>

        {/* CONTENT */}
        <div className="w-full mx-auto p-4">

            <ProductFilter
            showTitle={false}
                selectedPrices={selectedPrices}
                togglePrice={togglePrice}
                brand={brand}
                searchParams={searchParams}
                router={router}
                ramSelected={ramSelected}
                toggleRam={toggleRam}
                ssdSelected={ssdSelected}
                toggleSSD={toggleSSD}
            />

        </div>
    </div>
</>
            </div>
        </div>
    );
}