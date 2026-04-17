
"use client";
import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react"
import { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DashboardHeader from "./components/DashboardHeader";
import Topbar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import { HomeSkeleton } from "./components/HomeSkeleton";

export default function HomePageBanner() {
  const [openSidebar, setOpenSidebar] = useState(false);
   const stats = [
    { label: "Sản phẩm", value: 120, icon: "fas fa-box" },
    { label: "Banner", value: 5, icon: "fas fa-images" },
    { label: "Danh mục", value: 8, icon: "fas fa-list" },
  ];

  // if (loading) {
  //   return <HomeSkeleton />;
  // }

  return (
    <>
      {/* ================= HEADER TOP ================= */}
      <DashboardHeader onOpenSidebar={() => setOpenSidebar(true)} />
      <Topbar title="Dashboard" />
      <div className="flex min-h-screen bg-gray-50">
        {/* SIDEBAR */}
        <section className="w-[70px] lg:w-[240px] bg-white border-r transition-all duration-300">
          <Sidebar />
        </section>

        {/* MOBILE SIDEBAR */}
        <MobileSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        {/* CONTENT */}
        <section className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <div className="bg-white p-4 rounded border">
              <p className="text-sm text-gray-500">Sản phẩm</p>
              <h2 className="text-xl font-bold">120</h2>
            </div>

            <div className="bg-white p-4 rounded border">
              <p className="text-sm text-gray-500">Banner</p>
              <h2 className="text-xl font-bold">5</h2>
            </div>

            <div className="bg-white p-4 rounded border">
              <p className="text-sm text-gray-500">Danh mục</p>
              <h2 className="text-xl font-bold">8</h2>
            </div>

          </div>
        </section>
      </div>
    </>
  )
}

