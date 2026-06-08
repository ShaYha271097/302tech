
"use client";

import { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import Breadcrumb from "./Breadcrumb";
import Link from "next/link";
import { useSimilarProducts } from "@/hooks/useSimilarProducts";
import { formatPrice, getCheapestVariant, getVariantText } from "@/lib/format";
import ProductDescription from "./ProductDescription";
import ProductCardSkeleton from "@/components/ProductCardSkeleton/ProductCardSkeleton";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton/ProductDetailSkeleton";



export default function ProductDetailClient({
  product,
  similarProducts,
}: any) {
 const [selected, setSelected] = useState(
    getCheapestVariant(product.variants)
  );

  return (
    <>
      <div className="wrap-main w-clear">
        <div className="fixwidth">
          <div className="breadCrumbs_sp mt-3 mb-3">
            <div className="breadCrumbs">
              <div>
                <Breadcrumb product={product} selected={selected} />
              </div>
            </div>
          </div>
          <div className="clearfix">
            {/* {loading ? <ProductDetailSkeleton /> : */}
              {/* ( */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

                {/* IMAGE */}
                <div className="md:col-span-1 lg:col-span-4">
                  <div className="bg-white p-1 h-full">
                    <ProductGallery
                      mainImage={product.mainImage}
                      gallery={product.gallery}
                    />
                  </div>
                </div>

                {/* INFO */}
                <div className="md:col-span-1 lg:col-span-4">
                  <div className="bg-white p-1 h-full sticky top-4">

                    <ProductInfo
                      product={product}
                      selected={selected}
                      setSelected={setSelected}
                    />

                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="md:col-span-2 lg:col-span-4">
                  <ProductDescription selected={selected} />
                </div>

              </div>
              {/* ) */}
          {/* } */}
          </div>
          <div className="title_sp_cungloai text-2xl font-semibold text-center mt-8 mb-7">
            🔥 Sản phẩm tương tự
          </div>
          {/* {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {Array.from({ length:4 }).map((_, i) => (
                      <ProductCardSkeleton key={i} />
                  ))}
            </div>
          ) : ( */}
            {/* <div className="content-main w-clear">
              {similarProducts.length === 0 ? (
                <div className="w-full ">
                  <div className="w-full bg-gray-100 border border-gray-300 text-[#6B7280] px-4 py-3 text-center">
                    <strong>Không tìm thấy kết quả</strong>
                  </div>
                </div>
              ) : (
                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {similarProducts.map((item: any) => {
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
                                  className={'1'}
                                  alt="Laptop Tèo Em - Cần Thơ"
                                />
                              </div>
                              <div className="img_sp_2">
                                <img
                                  loading="lazy"
                                  width={1276}
                                  height={956}
                                  src="https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg"
                                  className={'1'}
                                  alt="Laptop Tèo Em - Cần Thơ"
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

              <div className="mb-6"></div>
            </div> */}
          {/* )} */}
        </div>

      </div>
    </>
  );
}