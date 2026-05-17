"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      name: "Tổng quan",
      href: "/dashboard",
      icon: "fas fa-chart-line",
    },
    {
      name: "Banner",
      href: "/dashboard/homepage-banner",
      icon: "fas fa-images",
    },
    {
      name: "Sản phẩm",
      href: "/dashboard/products",
      icon: "fas fa-box",
    },
    {
      name: "Thương hiệu",
      href: "/dashboard/brands",
      icon: "fas fa-list",
    },
  
  ];

  return (
<aside className="h-screen bg-[#FFFFFF] border-r border-[#E5E7EB] flex flex-col">
  {/* MENU */}
  <div className="flex-1 p-3 space-y-1">
    {menu.map((item, index) => {
      const active = pathname === item.href;

      return (
        <Link
          key={index}
          href={item.href}
          className={`
            flex items-center justify-start gap-3
            px-3 py-3
            rounded-lg
            text-sm
            transition-all duration-300
            w-full overflow-hidden

            ${
              active
                ? `
                  bg-[#FFF3E8]
                  !text-[#ff7a00]
                  font-semibold
                  shadow-sm
                `
                : `
                  !text-[#6B7280]
                  hover:bg-[#F9FAFB]
                  hover:text-[#ff7a00]
                `
            }
          `}
        >
          <i
            className={`
              ${item.icon}
              w-5 text-center shrink-0
            `}
          />

          <span className="inline md:hidden lg:inline truncate">
            {item.name}
          </span>
        </Link>
      );
    })}
  </div>

  {/* FOOTER */}
  <div className="p-4 border-t border-[#E5E7EB] hidden lg:block">
    <p className="text-xs text-[#9CA3AF]">
      © 302tech Admin Panel
    </p>
  </div>
</aside>

  );
}