// components/SimilarProducts.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCheapestVariant,
  getVariantText,
  formatPrice,
} from "@/lib/format";
import ProductCardSkeleton from "@/components/ProductCardSkeleton/ProductCardSkeleton";

type Props = {
  productId: string;
  price: number;
};

export default function SimilarProducts({
  productId,
  price,
}: Props) {
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId || !price) return;

    const fetchSimilar = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/products/similar?productId=${productId}&price=${price}`
        );

        const data = await res.json();

        setSimilarProducts(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [productId, price]);

  return (
    <>
      <div className="title_sp_cungloai text-2xl font-semibold text-center mt-8 mb-7">
        🔥 Sản phẩm tương tự
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="content-main w-clear">
          {similarProducts.length === 0 ? (
            <div className="w-full">
              <div className="w-full bg-gray-100 border border-gray-300 text-[#6B7280] px-4 py-3 text-center">
                <strong>Không tìm thấy kết quả</strong>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {similarProducts.map((item: any) => {
                const cheapest = getCheapestVariant(
                  item.variants
                );

                return (
                  <div
                    key={item._id}
                    className="all_sp_banchay_index"
                  >
                    <div className="all_img_sp_bc">
                      <Link
                        href={`/products/${item.slug}-${item._id}`}
                      >
                        <div className="img_sp_bc">
                          <div>
                            <img
                              loading="lazy"
                              width={1276}
                              height={956}
                              src={item.mainImage}
                              alt={item.name}
                              className="1"
                            />
                          </div>

                          <div className="img_sp_2">
                            <img
                              loading="lazy"
                              width={1276}
                              height={956}
                              src="https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg"
                              alt={item.name}
                              className="1"
                            />
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="all_content_sp">
                      <Link
                        href={`/products/${item.slug}-${item._id}`}
                      >
                        <div className="name_sp text-split">
                          {item.name} -{" "}
                          {getVariantText(cheapest)}
                        </div>
                      </Link>

                      <div className="gia_sp">
                        <span>
                          {formatPrice(
                            cheapest?.price
                          )}
                        </span>
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
        </div>
      )}
    </>
  );
}