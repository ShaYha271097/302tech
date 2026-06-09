
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
import SimilarProducts from "./SimilarProducts";



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
         <SimilarProducts
  productId={product._id}
  price={selected.price}
/>
        </div>

      </div>
    </>
  );
}