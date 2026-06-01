"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Breadcrumb from "../products/[slug]/Breadcrumb";

export default function WarrantyPage() {
    return (
        <>
                <div className="wrap-main w-clear">
                    <div className="fixwidth">
                        <div className="content-main w-clear">
                            <div className="breadCrumbs_sanpham mb-3 mt-3">
                                <div>
                                    <Breadcrumb />
                                </div>
                            </div>


                            <div
                                className="
     relative
    overflow-hidden
    rounded-[32px]
    border border-orange-100
    bg-gradient-to-br from-white via-orange-50/30 to-white
    shadow-[0_10px_40px_rgba(255,122,0,0.08)]
    p-6 md:p-10
      mb-10
  "
                            >

                                {/* blur background */}
                                <div
                                    className="
      absolute top-0 right-0
      w-[260px] h-[260px]
      bg-orange-100/50
      rounded-full
      blur-3xl
      pointer-events-none
    "
                                />

                                <div className="relative z-10">

                                    {/* TITLE */}
                                    <div className="mb-12 text-center">

                                        <div
                                            className="
          inline-flex items-center gap-2
          px-4 py-2
          rounded-full
          bg-orange-50
          border border-orange-200
          text-[#ff7a00]
          font-semibold
          text-sm leading-7
          mb-5
        "
                                        >
                                            <span className="w-2 h-2 rounded-full bg-[#ff7a00]" />
                                            Hỗ trợ tận tâm & minh bạch
                                        </div>

                                        <h2
                                            className="
          text-4xl md:text-5xl
          font-black
          tracking-tight
          text-[#111827]
        "
                                        >
                                            Chính Sách{" "}
                                            <span
                                                className="
            bg-gradient-to-r
            from-[#ff7a00]
            to-orange-500
            bg-clip-text
            text-transparent
          "
                                            >
                                                Bảo Hành
                                            </span>
                                        </h2>

                                        <div className="flex justify-center mt-5">
                                            <div
                                                className="
            w-28 h-1.5
            rounded-full
            bg-gradient-to-r
            from-[#ff7a00]
            to-orange-400
          "
                                            />
                                        </div>

                                    </div>

                                    {/* CONTENT */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        {/* ITEM */}
                                        <section
                                            className="
          rounded-3xl
          border border-orange-100
          bg-white/90
          p-6
          hover:shadow-lg
          transition-all
        "
                                        >
                                            <div className="flex items-center gap-3 mb-5">
                                                <div
                                                    className="
              w-12 h-12
              rounded-2xl
              bg-orange-100
              flex items-center justify-center
              text-2xl
            "
                                                >
                                                    ⏱️
                                                </div>

                                                <h4 className="text-xl font-extrabold text-[#111827]">
                                                    1. Thời gian bảo hành
                                                </h4>
                                            </div>

                                            <ul className="space-y-3 text-[#6B7280] leading-7 font-medium">
                                                <li>✔️ Laptop dưới 10 triệu: Bảo hành 3 tháng</li>
                                                <li>✔️ Laptop từ 10 triệu trở lên: Bảo hành 6 tháng</li>
                                                <li>✔️ Bao test đổi trả 7 ngày nếu lỗi phần cứng</li>
                                            </ul>
                                        </section>

                                        {/* ITEM */}
                                        <section
                                            className="
          rounded-3xl
          border border-orange-100
          bg-white/90
          p-6
          hover:shadow-lg
          transition-all
        "
                                        >
                                            <div className="flex items-center gap-3 mb-5">
                                                <div
                                                    className="
              w-12 h-12
              rounded-2xl
              bg-orange-100
              flex items-center justify-center
              text-2xl
            "
                                                >
                                                    🛠️
                                                </div>

                                                <h4 className="text-xl font-extrabold text-[#111827]">
                                                    2. Phạm vi bảo hành
                                                </h4>
                                            </div>

                                            <ul className="space-y-3 text-[#6B7280] leading-7 font-medium">
                                                <li>✔️ Phần cứng máy</li>
                                                <li>✔️ Mainboard</li>
                                                <li>✔️ Màn hình</li>
                                                <li>✔️ Nguồn / sạc theo máy</li>
                                                <li>✔️ Lỗi phần mềm cơ bản</li>
                                            </ul>
                                        </section>

                                        {/* ITEM */}
                                        <section
                                            className="
          rounded-3xl
          border border-orange-100
          bg-white/90
          p-6
          hover:shadow-lg
          transition-all
        "
                                        >
                                            <div className="flex items-center gap-3 mb-5">
                                                <div
                                                    className="
              w-12 h-12
              rounded-2xl
              bg-orange-100
              flex items-center justify-center
              text-2xl
            "
                                                >
                                                    🔒
                                                </div>

                                                <h4 className="text-xl font-extrabold text-[#111827]">
                                                    3. Điều kiện được bảo hành
                                                </h4>
                                            </div>

                                            <ul className="space-y-3 text-[#6B7280] leading-7 font-medium">
                                                <li>✔️ Máy còn thời hạn bảo hành</li>
                                                <li>✔️ Tem bảo hành còn nguyên vẹn</li>
                                                <li>✔️ Lỗi do phần cứng hoặc nhà sản xuất</li>
                                                <li>✔️ Không rơi vỡ, vào nước hoặc va đập mạnh</li>
                                                <li>✔️ Sử dụng đúng sạc phù hợp</li>
                                            </ul>
                                        </section>

                                        {/* ITEM */}
                                        <section
                                            className="
          rounded-3xl
          border border-orange-100
          bg-white/90
          p-6
          hover:shadow-lg
          transition-all
        "
                                        >
                                            <div className="flex items-center gap-3 mb-5">
                                                <div
                                                    className="
              w-12 h-12
              rounded-2xl
              bg-orange-100
              flex items-center justify-center
              text-2xl
            "
                                                >
                                                    ❌
                                                </div>

                                                <h4 className="text-xl font-extrabold text-[#111827]">
                                                    4. Trường hợp không bảo hành
                                                </h4>
                                            </div>

                                            <ul className="space-y-3 text-[#6B7280] leading-7 font-medium">
                                                <li>❌ Máy hết thời hạn bảo hành</li>
                                                <li>❌ Tem bảo hành bị rách hoặc mất</li>
                                                <li>❌ Máy rơi, móp méo hoặc vào nước</li>
                                                <li>❌ Màn hình bể, sọc do va đập</li>
                                                <li>❌ Tự ý sửa chữa phần cứng</li>
                                                <li>❌ Pin hao mòn theo thời gian</li>
                                            </ul>
                                        </section>

                                    </div>

                                    {/* NOTE */}
                                    <section
                                        className="
        mt-6
        rounded-3xl
        border border-orange-200
        bg-gradient-to-r from-[#ff7a00] to-orange-500
        p-7
        text-white
        shadow-lg shadow-orange-200/50
      "
                                    >

                                        <div className="flex items-start gap-4">

                                            <div
                                                className="
            w-14 h-14
            rounded-2xl
            bg-white/20
            flex items-center justify-center
            text-2xl
            shrink-0
          "
                                            >
                                                💡
                                            </div>

                                            <div>
                                                <h4 className="text-2xl font-black mb-2">
                                                    5. Lưu ý quan trọng
                                                </h4>

                                                <ul className="space-y-2 leading-7 text-white/95 font-medium">
                                                    <li>✔️ Kiểm tra kỹ máy trước khi rời cửa hàng</li>
                                                    <li>✔️ Nên quay video khi mở hàng để đảm bảo quyền lợi</li>
                                                    <li>✔️ Mang theo phụ kiện khi bảo hành</li>
                                                </ul>
                                            </div>

                                        </div>

                                    </section>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>




        </>
    );
}