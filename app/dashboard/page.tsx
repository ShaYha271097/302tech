
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

export default function HomePageBanner() {

  return (
    <>
      <DashboardHeader />
      <Topbar title="Dashboard" />
      <div className="flex min-h-screen bg-gray-50">
        {/* SIDEBAR */}
         <section className="w-[70px] lg:w-[240px] bg-white border-r transition-all duration-300">
          <Sidebar />
          </section>
        {/* CONTENT */}
        <section className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4">

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

