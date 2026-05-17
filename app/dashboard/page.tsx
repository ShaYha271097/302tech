"use client";

import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import DashboardHeader from "./components/DashboardHeader";
import Topbar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";

export default function HomePageBanner() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const [stats, setStats] = useState([
    {
      title: "Tổng sản phẩm",
      value: 0,
      icon: "fas fa-laptop",
    },
    {
      title: "Tổng banner",
      value: 5,
      icon: "fas fa-images",
    },
    {
      title: "Thương hiệu",
      value: 0,
      icon: "fas fa-tags",
    },
  ]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [productsRes, brandsRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/brands"),
        ]);
        const productsData = await productsRes.json();
        const brandsData = await brandsRes.json();
        console.log("brandsData",brandsData,productsData)
        setStats([
          {
            title: "Tổng sản phẩm",
            value:productsData?.total || 0,
            icon: "fas fa-laptop",
          },
          {
            title: "Tổng banner",
            value: 5,
            icon: "fas fa-images",
          },
          {
            title: "Thương hiệu",
            value: brandsData?.total || 0,
            icon: "fas fa-tags",
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
      {/* HEADER */}
      <DashboardHeader onOpenSidebar={() => setOpenSidebar(true)} />

      <Topbar title="Tổng quan" />

      <div className="flex min-h-screen bg-[#F9FAFB]">

        {/* SIDEBAR */}
        <section className="w-[70px] lg:w-[240px] bg-white border-r border-[#E5E7EB] transition-all duration-300">
          <Sidebar />
        </section>

        {/* MOBILE SIDEBAR */}
        <MobileSidebar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />

        {/* CONTENT */}
        <section className="flex-1 p-4 overflow-y-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {stats.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white
                  border border-[#E5E7EB]
                  rounded-lg
                  px-4 py-4
                  flex items-center justify-between
                  hover:shadow-md
                  transition-all duration-300
                "
              >
                {/* LEFT */}
                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-11 h-11
                      rounded-lg
                      bg-[#FFF3E8]
                      flex items-center justify-center
                    "
                  >
                    <i
                      className={`${item.icon} text-[#ff7a00] text-[18px]`}
                    />
                  </div>

                  <div>
                    <p className="text-[13px] text-[#6B7280]">
                      {item.title}
                    </p>

                    <h2 className="text-[24px] font-bold text-[#111111] leading-tight">
                      {item.value}
                    </h2>
                  </div>

                </div>

                {/* RIGHT */}
                <i className="fas fa-arrow-up text-[#22C55E] text-sm" />
              </div>
            ))}

          </div>

        </section>
      </div>
    </>
  );
}