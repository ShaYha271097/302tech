"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import Breadcrumb from "./[slug]/Breadcrumb";
import { formatPrice, getCheapestVariant, getVariantText } from "@/lib/format";
import ProductFilter from "./ProductFilter";
import { SlidersHorizontal } from "lucide-react";

type Props = {
  products: any[];
  totalPages: number;
   brands: any;
};
export default function ProductsClient({
  products,
  totalPages,
  brands
}: Props) {

    const router = useRouter();
    const searchParams = useSearchParams();
 
    const [showFilter, setShowFilter] = useState(false);

    const page = Number(
    searchParams.get("page") || 1
     );

    const category =
        searchParams.get("category") || "";

    const selectedPrices =
        searchParams.getAll("price");

    const ramSelected =
        searchParams.getAll("ram");

    const ssdSelected =
        searchParams.getAll("ssd");

  const handlePageChange = (newPage: number) => {
  const params = new URLSearchParams(searchParams.toString());

  params.set("page", String(newPage));

  router.push(`/products?${params.toString()}`, {
    scroll: true,
  });
};
   const toggleQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const currentValues = params.getAll(key);

    const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

    params.delete(key);

    updatedValues.forEach((v) => {
        params.append(key, v);
    });
    router.push(`/products?${params.toString()}`);
    };

    const toggleSSD = (ssd: string) => {
        toggleQueryParam("ssd", ssd);
    };

    const toggleRam = (ram: string) => {
        toggleQueryParam("ram", ram);
    };

    const togglePrice = (price: string) => {
        toggleQueryParam("price", price);
    };
    return (
        <div className="wrap-main w-clear">
            <div className="fixwidth">
                <input type="hidden" name="type" id="type" defaultValue="san-pham" />
                <div className="content-main w-clear">
                    <div className="breadCrumbs_sanpham mb-3 mt-3">
                        <div>
                            <Breadcrumb  category={category} />
                        </div>
                    </div>
                                      <div className="lg:hidden mb-3">
                    <button
                        onClick={() => setShowFilter(true)}
                        className="w-full border px-4 py-3 rounded-xl bg-white shadow-sm flex items-center justify-center gap-2"
                      >
                        <SlidersHorizontal size={18} />
                        <span>Bộ lọc</span>
                      </button>
                  </div>
                    <div className="site-content mb-6">
                        <div className="row-product">
                            <div className="hidden lg:block col-product-left">
                                <ProductFilter
                                    selectedPrices={selectedPrices}
                                    togglePrice={togglePrice}
                                    brands={brands}
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

                                    {
                                    // loading ? (
                                    //     <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                                    //     {Array.from({ length: 8 }).map((_, i) => (
                                    //          <ProductCardSkeleton key={i} />
                                    //     ))}
                                    // </div>
                                    // ) :
                                     products.length === 0 ? (
                                        <div className="w-full ">
                                            <div className="w-full bg-gray-100 border border-gray-300 text-[#6B7280] px-4 py-3 text-center">
                                                <strong>Không tìm thấy kết quả</strong>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="loadkhung_product1 mainkhung_product !grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                                            {products.map((item: any) => {
                                                const cheapest = getCheapestVariant(item.variants);

                                                  return (
                <div
                  key={item._id}
                  className="
                    group
                    bg-white
                    border border-[#E8E8E8]
                    rounded-sm
                    p-4
                    h-full
                    transition-all duration-300
                    hover:border-[#FED7AA]
                    hover:shadow-[0_10px_30px_rgba(255,122,0,0.08)]
                  "
                >
                   {/* IMAGE */}
      <Link href={`/products/${item.slug}-${item._id}?category=${category}`}>
        <div
          className="
        group/image
        relative
        aspect-square
        overflow-hidden
        bg-[#FFF7ED]
        rounded-sm
      "
        >
          {/* Ảnh chính */}
          <img
            src={item.mainImage.url}
            alt={item.name}
            className="
          absolute inset-0
          w-full
          h-full
          object-cover
          opacity-100
          transition-opacity duration-500 ease-in-out
          group-hover/image:opacity-0
        "
          />

          {/* Ảnh phụ: hiện dần khi hover */}
          {item.gallery?.[0]?.url && (
            <img
              src={item.gallery[0].url}
              alt={`${item.name} - ảnh phụ`}
              className="
            absolute inset-0
            w-full
            h-full
            object-cover
            opacity-0
            transition-opacity duration-500 ease-in-out
            group-hover/image:opacity-100
          "
            />
          )}
        </div>
      </Link>

                  <div className="py-3">
                    <Link
                      href={`/products/${item.slug}-${item._id}?category=${category}`}
                    >
                      <div
                        className="
                          text-[15px]
                          font-semibold
                          text-[#111827]
                          leading-6
                          line-clamp-2
                          min-h-[48px]
                          transition-colors
                          group-hover:text-[#ff7a00]
                        "
                      >
                        {item.name} - {getVariantText(cheapest)}
                      </div>
                    </Link>

                    <div className="mt-3 text-[18px] font-black text-[#ff3b30]">
                         Còn hàng
                      {/* {cheapest?.price?.toLocaleString("vi-VN")}đ */}
                    </div>

                    <div className="mt-4">
                      <Link
                        href={`/products/${item.slug}-${item._id}?category=${category}`}
                        className="
                          h-10
                          rounded-sm
                          bg-[#ff7a00]
                          text-white
                          text-sm
                          font-semibold
                          flex items-center justify-center
                          transition-all duration-300
                          hover:bg-[#e86f00]
                        "
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
                                    {
                                    // !loading &&
                                     products.length > 0 && (
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
                brands={brands}
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