import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ product, selected, brand }: any) {

  const isDetail = product && selected;

  return (
    <ol className="flex items-center flex-wrap text-sm text-gray-500 gap-1">

      {/* HOME */}
      <li>
        <Link href="/" className="hover:text-black">
          Trang chủ
        </Link>
      </li>

      <ChevronRight className="w-4 h-4" />

      {/* CATEGORY */}
      <li>
        <Link href="/products?category=laptop" className="hover:text-black">
          Laptop
        </Link>
      </li>

      {/* BRAND */}
      {(brand || product?.brand) && (
        <>
          <ChevronRight className="w-4 h-4" />

          {/* 👉 nếu là trang detail → brand vẫn click */}
          {isDetail ? (
            <li>
              <Link
                href={`/products?category=laptop&brand=${product.brand.slug}`}
                className="hover:text-black"
              >
                {product.brand.name}
              </Link>
            </li>
          ) : (
            // 👉 nếu đang ở trang brand → KHÔNG click
            <li className="text-black font-medium">
              {brand}
            </li>
          )}
        </>
      )}

      {/* PRODUCT (luôn là cuối → không click) */}
      {isDetail && (
        <>
          <ChevronRight className="w-4 h-4" />
          <li className="text-black font-medium">
            {product.name} - {selected.cpu} / {selected.ram} / {selected.ssd}
          </li>
        </>
      )}

    </ol>
  );
}