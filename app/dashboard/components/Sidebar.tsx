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
      name: "Danh mục",
      href: "/dashboard/brands",
      icon: "fas fa-list",
    },
  
  ];

  return (

    <aside className="h-screen bg-white flex flex-col">
      {/* MENU */}
      <div className="flex-1 p-2 space-y-1">
        {menu.map((item, index) => {
          const active = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center justify-center justify-start gap-3 px-3 py-2 rounded-md text-sm transition w-full overflow-hidden
    ${active
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <i className={`${item.icon} w-5 text-center shrink-0`} />

              <span className="inline md:hidden lg:inline truncate">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="p-3 border-t text-xs text-gray-400 hidden lg:block">
        © Admin Panel
      </div>
    </aside>

  );
}