
"use client";

import { Suspense } from "react";
import Link from "next/link";
import Breadcrumb from "../products/[slug]/Breadcrumb";

const sellingBenefits = [
  "Laptop được kiểm tra kỹ trước khi giao",
  "Thông tin cấu hình và tình trạng rõ ràng",
  "Đa dạng thương hiệu, phân khúc và nhu cầu",
  "Chính sách bảo hành minh bạch",
];

const buyingBenefits = [
  "Thu mua laptop cũ nhiều thương hiệu",
  "Định giá dựa trên tình trạng thực tế",
  "Hỗ trợ kiểm tra và giao dịch nhanh chóng",
  "Thanh toán nhanh sau khi thống nhất giá",
];

const reasons = [
  {
    icon: "🔍",
    title: "Kiểm tra kỹ lưỡng",
    desc: "Mỗi sản phẩm đều được kiểm tra tình trạng và chức năng trước khi giao dịch.",
  },
  {
    icon: "💰",
    title: "Giá cả hợp lý",
    desc: "Thông tin giá bán và định giá thu mua rõ ràng, phù hợp với tình trạng máy.",
  },
  {
    icon: "🛡️",
    title: "Giao dịch minh bạch",
    desc: "Tư vấn trung thực, thông tin sản phẩm rõ ràng, chính sách bảo hành cụ thể.",
  },
  {
    icon: "🤝",
    title: "Hỗ trợ tận tâm",
    desc: "Đồng hành cùng khách hàng từ lúc tư vấn đến sau khi hoàn tất giao dịch.",
  },
];

const process = [
  {
    number: "01",
    icon: "💬",
    title: "Tiếp nhận nhu cầu",
    desc: "Tư vấn lựa chọn laptop hoặc tiếp nhận thông tin máy khách hàng cần bán.",
  },
  {
    number: "02",
    icon: "🔍",
    title: "Kiểm tra & định giá",
    desc: "Kiểm tra tình trạng thực tế, tư vấn cấu hình và mức giá phù hợp.",
  },
  {
    number: "03",
    icon: "🤝",
    title: "Hoàn tất giao dịch",
    desc: "Thống nhất giá, tiến hành giao nhận và hỗ trợ khách hàng chu đáo.",
  },
];

export default function AboutPage() {
  return (
    <div className="wrap-main w-clear">
      <div className="fixwidth">
        <div className="content-main w-clear">

          {/* BREADCRUMB */}
          <div className="breadCrumbs_sanpham mb-3 mt-3">
            <div>
              <Suspense fallback={null}>
                <Breadcrumb />
              </Suspense>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <main className="relative mb-10 overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_10px_40px_rgba(255,122,0,0.07)]">

            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/60 to-white px-5 py-14 text-center md:px-12 md:py-20">

              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-100/50 blur-3xl" />
              <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-orange-100/40 blur-3xl" />

              <div className="relative z-10">

                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2 text-sm font-bold text-[#ff7900] shadow-sm">
                  💻 302 TECH
                </div>

                <h1 className="text-3xl font-black leading-tight tracking-tight text-[#14243b] md:text-5xl lg:text-6xl">
                  Thu mua & Bán
                  <span className="text-[#ff7900]"> Laptop</span>
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 md:text-lg md:leading-8">
                  Chuyên mua bán laptop cũ chất lượng.
                  Thu mua nhanh chóng, định giá hợp lý,
                  kiểm tra kỹ lưỡng và giao dịch minh bạch.
                </p>

                <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-[#ff7900]" />

              </div>
            </section>

            {/* TWO SERVICES */}
            <section className="grid grid-cols-1 gap-6 px-5 pb-10 md:grid-cols-2 md:px-10">

              {/* SELL LAPTOP */}
              <div className="group flex flex-col overflow-hidden rounded-[26px] border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">

                <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-orange-50 md:min-h-[220px]">
                  <div className="absolute h-44 w-44 rounded-full bg-orange-100/70 blur-2xl" />

                  <div className="relative text-center">
                    <div className="text-7xl transition-transform duration-300 group-hover:scale-110 md:text-8xl">
                      💻
                    </div>
                    <p className="mt-3 text-sm font-semibold tracking-widest text-gray-500">
                      LAPTOP CHẤT LƯỢNG
                    </p>
                  </div>

                  <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#ff7900] shadow-sm">
                    DỊCH VỤ 01
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">

                  <h2 className="text-2xl font-black text-[#14243b] md:text-3xl">
                    BÁN <span className="text-[#ff7900]">LAPTOP</span>
                  </h2>

                  <p className="mt-3 leading-7 text-gray-600">
                    Cung cấp đa dạng các dòng laptop cũ chất lượng,
                    từ văn phòng, doanh nhân đến đồ họa và gaming.
                    Đáp ứng nhiều nhu cầu sử dụng với mức giá hợp lý.
                  </p>

                  <div className="my-6 space-y-3">
                    {sellingBenefits.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-700">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BUY LAPTOP */}
              <div className="group flex flex-col overflow-hidden rounded-[26px] border border-orange-200 bg-[#FFFBF7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100/60 md:min-h-[220px]">

                  <div className="absolute h-44 w-44 rounded-full bg-orange-200/60 blur-2xl" />

                  <div className="relative text-center">
                    <div className="text-7xl transition-transform duration-300 group-hover:scale-110 md:text-8xl">
                      🤝
                    </div>
                    <p className="mt-3 text-sm font-semibold tracking-widest text-gray-500">
                      THU MUA LAPTOP CŨ
                    </p>
                  </div>

                  <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#ff7900] shadow-sm">
                    DỊCH VỤ 02
                  </div>

                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">

                  <h2 className="text-2xl font-black text-[#14243b] md:text-3xl">
                    THU MUA <span className="text-[#ff7900]">LAPTOP</span>
                  </h2>

                  <p className="mt-3 leading-7 text-gray-600">
                    Nhận thu mua laptop cũ nhiều thương hiệu,
                    nhiều cấu hình và tình trạng khác nhau.
                    Định giá dựa trên thực tế, hỗ trợ giao dịch nhanh chóng.
                  </p>

                  <div className="my-6 space-y-3">
                    {buyingBenefits.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-700">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </section>

         

         

          </main>

        </div>
      </div>
    </div>
  );
}
