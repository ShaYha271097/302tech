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
      href: "/dashboard/products",
      icon: "fas fa-list",
    },
    {
      name: "Thuộc tính",
      href: "/dashboard/products",
      icon: "fas fa-sliders-h",
    },
  ];

  return (
    <aside className="w-[240px] h-screen bg-white border-r flex flex-col">

      {/* HEADER */}
      {/* <div className="p-4 border-b font-semibold text-lg">
        Dashboard
      </div> */}

      {/* MENU */}
      <div className="flex-1 p-2 space-y-1">
        {menu.map((item,index) => {
          const active = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
                ${active
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <i className={`${item.icon} w-4`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="p-3 border-t text-xs text-gray-400">
        © Admin Panel
      </div>

    </aside>
  );
}