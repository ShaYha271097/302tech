
"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
export default function Breadcrumb({
  product,
  selected,
}: any) {
  const pathname = usePathname();
const searchParams = useSearchParams();
const category = searchParams.get("category") || "";
  const isDetail = product && selected;

  const categoryTitles: Record<string, string> = {
    "pc-may-bo": "PC / Máy bộ",
    "laptop-doanh-nhan": "Laptop doanh nhân",
    "laptop-van-phong": "Laptop văn phòng",
    "may-tram": "Máy trạm",
    "laptop-do-hoa": "Laptop đồ họa",
    "laptop-gaming": "Laptop Gaming",
  };

  const pageTitles: Record<string, string> = {
    "/warranty": "Chính sách bảo hành",
    "/contact": "Liên hệ",
    "/about": "Về chúng tôi",
  };

  const currentPageTitle = pageTitles[pathname];

const categorySlug = category || "";

const categoryTitle = categoryTitles[categorySlug];

const categoryHref = `/products?category=${encodeURIComponent(
  categorySlug
)}`;
  console.log("categoryTitle",categoryTitle)
  return (
    <ol className="flex items-center flex-wrap text-sm leading-7 text-gray-500 gap-1">
      {/* HOME */}
      <li>
        <Link href="/" className="hover:text-[#111827]">
          Trang chủ
        </Link>
      </li>

      <ChevronRight className="w-4 h-4 shrink-0" />

      {/* STATIC PAGES */}
      {currentPageTitle ? (
        <li className="text-[#111827] font-medium">
          {currentPageTitle}
        </li>
      ) : (
        <>
          {/* CATEGORY */}
          {categoryTitle && (
            <>
              <li>
                {isDetail ? (
                  <Link
                    href={categoryHref}
                    className="hover:text-[#111827]"
                  >
                    {categoryTitle}
                  </Link>
                ) : (
                  <span className="text-[#111827] font-medium">
                    {categoryTitle}
                  </span>
                )}
              </li>
            </>
          )}

          {/* PRODUCT */}
          {isDetail && (
            <>
              <ChevronRight className="w-4 h-4 shrink-0" />

              <li className="text-[#111827] font-medium">
                {product.name}
                {selected.cpu && ` - ${selected.cpu}`}
                {selected.ram && ` / ${selected.ram}`}
                {selected.ssd && ` / ${selected.ssd}`}
              </li>
            </>
          )}
        </>
      )}
    </ol>
  );
}
