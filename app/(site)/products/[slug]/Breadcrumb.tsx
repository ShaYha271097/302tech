import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
export default function Breadcrumb({ product, selected, brand }: any) {
  const pathname = usePathname();

  const isDetail = product && selected;
  const pageTitles: Record<string, string> = {
    "/warranty": "Chính sách bảo hành",
    "/contact": "Liên hệ",
     "/about": "Về chúng tôi",
};

const currentPageTitle = pageTitles[pathname];

  return (
    <ol className="flex items-center flex-wrap text-sm leading-7 text-gray-500 gap-1">

      {/* HOME */}
      <li>
        <Link href="/" className="hover:text-[#111827]">
          Trang chủ
        </Link>
      </li>

      <ChevronRight className="w-4 h-4" />

      {/* CATEGORY */}
      {currentPageTitle  ? (
        <li className="text-[#111827] font-medium">
          {currentPageTitle}
        </li>
      ) : (
        <li>
          <Link href="/products?category=laptop" className="hover:text-[#111827]">
            Laptop
          </Link>
        </li>
      )}

      {/* BRAND */}
      {(brand || product?.brand) && (
        <>
          <ChevronRight className="w-4 h-4" />

          {/* 👉 nếu là trang detail → brand vẫn click */}
          {isDetail ? (
            <li>
              <Link
                href={`/products?category=laptop&brand=${product.brand.slug}`}
                className="hover:text-[#111827]"
              >
                {product.brand.name}
              </Link>
            </li>
          ) : (
            // 👉 nếu đang ở trang brand → KHÔNG click
            <li className="text-[#111827] font-medium">
              {brand}
            </li>
          )}
        </>
      )}

      {/* PRODUCT (luôn là cuối → không click) */}
      {isDetail && (
        <>
          <ChevronRight className="w-4 h-4" />
          <li className="text-[#111827] font-medium">
            {product.name} - {selected.cpu} / {selected.ram} / {selected.ssd}
          </li>
        </>
      )}

    </ol>
  );
}