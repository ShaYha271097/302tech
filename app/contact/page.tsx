"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Breadcrumb from "../products/[slug]/Breadcrumb";

export default function ContactPage() {
    return (
        <>
            <Header />

       
                <div className="wrap-main w-clear">
                    <div className="fixwidth">
                        <div className="content-main w-clear">
                            <div className="breadCrumbs_sanpham mb-3 mt-3">
                                <div>
                                    <Breadcrumb />
                                </div>
                            </div>


                           {/* Content */}
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

  {/* background blur */}
  <div
    className="
      absolute top-0 right-0
      w-[260px] h-[260px]
      rounded-full
      bg-orange-100/60
      blur-3xl
      pointer-events-none
    "
  />

  <div className="relative z-10">

    {/* TITLE */}
    <div className="relative mb-14 text-center">

      {/* badge */}
      <div
        className="
          inline-flex items-center gap-2
          px-4 py-2
          rounded-full
          border border-orange-200
          bg-orange-50
          text-orange-600
          text-sm leading-7 font-semibold
          mb-5
        "
      >
        <span className="w-2 h-2 rounded-full bg-orange-500" />
        Hỗ trợ & tư vấn khách hàng
      </div>

      {/* title */}
      <h1
        className="
          text-4xl md:text-6xl
          font-black
          tracking-tight
          text-[#111827]
          leading-tight
        "
      >
        Liên Hệ{" "}
        <span
          className="
            bg-gradient-to-r
            from-[#ff7a00]
            to-orange-500
            bg-clip-text
            text-transparent
          "
        >
          302 Tech
        </span>
      </h1>

      {/* line */}
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

      {/* subtitle */}
      <p
        className="
          mt-5
          max-w-2xl
          mx-auto
          text-[15px] md:text-base
          leading-8
          text-[#6B7280]
          font-medium
        "
      >
        302 Tech luôn sẵn sàng hỗ trợ tư vấn laptop,
        giải đáp thắc mắc và đồng hành cùng khách hàng
        trong suốt quá trình sử dụng.
      </p>

    </div>

    {/* BODY */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      {/* LEFT */}
      <div className="space-y-6">

        {/* INFO CARD */}
        <div
          className="
            rounded-[28px]
            border border-orange-100
            bg-white/90
            p-6 md:p-8
            shadow-sm
          "
        >

          <div className="flex items-center gap-3 mb-7">

            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-orange-100
                flex items-center justify-center
                text-2xl
              "
            >
              📍
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#111827]">
                Thông tin cửa hàng
              </h2>

              <p className="text-[#6B7280] mt-1">
                Hệ thống cửa hàng & hỗ trợ khách hàng
              </p>
            </div>

          </div>

          <div className="space-y-5">

            {/* item */}
            <div
              className="
                rounded-2xl
                border border-orange-100
                bg-orange-50/50
                p-5
              "
            >
              <p className="font-extrabold text-[#111827] mb-2">
                📍 Cơ sở 1
              </p>

              <p className="text-[#6B7280] leading-7 font-medium">
                302 Nguyễn Văn Rốp, Khu phố 5,
                Tân Ninh, Tây Ninh
              </p>
            </div>

            {/* item */}
            <div
              className="
                rounded-2xl
                border border-orange-100
                bg-orange-50/50
                p-5
              "
            >
              <p className="font-extrabold text-[#111827] mb-2">
                📍 Cơ sở 2
              </p>

              <p className="text-[#6B7280] leading-7 font-medium">
                1073A Đ. Nguyễn Ảnh Thủ,
                Tân Chánh Hiệp, Trung Mỹ Tây,
                Hồ Chí Minh
              </p>
            </div>

            {/* hotline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div
                className="
                  rounded-2xl
                  border border-orange-100
                  bg-orange-50/50
                  p-5
                "
              >
                <p className="font-semibold text-[#111827] mb-2">
                  📞 Hotline
                </p>

                <p className="text-[#ff7a00] font-extrabold text-lg">
                  0946932067
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border border-orange-100
                  bg-orange-50/50
                  p-5
                "
              >
                <p className="font-semibold text-[#111827] mb-2">
                  🕒 Làm việc
                </p>

                <p className="text-[#6B7280] font-medium">
                  9h00 - 22h00
                </p>
              </div>

            </div>

            {/* email */}
            <div
              className="
                rounded-2xl
                border border-orange-100
                bg-orange-50/50
                p-5
              "
            >
              <p className="font-semibold text-[#111827] mb-2">
                📧 Email
              </p>

              <p className="text-[#6B7280] font-medium break-all">
                ddrduongqua1027@gmail.com
              </p>
            </div>

          </div>
        </div>

        {/* BOTTOM CARD */}
        <div
          className="
            relative overflow-hidden
            rounded-[28px]
            bg-gradient-to-r
            from-[#ff7a00]
            to-orange-500
            p-7
            text-white
            shadow-lg shadow-orange-200/60
          "
        >

          {/* glow */}
          <div
            className="
              absolute -top-10 -right-10
              w-40 h-40
              rounded-full
              bg-white/10
              blur-2xl
            "
          />

          <div className="relative z-10">

            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-white/15
                flex items-center justify-center
                text-3xl
                mb-5
              "
            >
              💻
            </div>

            <h3 className="text-3xl font-black mb-4">
              302 Tech
            </h3>

            <p className="leading-8 text-white/95 text-[15px] md:text-base font-medium">
              Chuyên laptop cũ chất lượng cao,
              hỗ trợ tận tâm, bảo hành rõ ràng và minh bạch.
              Cam kết test kỹ trước khi giao đến khách hàng.
            </p>

          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div
        className="
          rounded-[28px]
          border border-orange-100
          bg-white/90
          p-6 md:p-8
          shadow-sm
        "
      >

        <div className="flex items-center gap-3 mb-6">

          <div
            className="
              w-14 h-14
              rounded-2xl
              bg-orange-100
              flex items-center justify-center
              text-2xl
            "
          >
            🗺️
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#111827]">
              Bản đồ cửa hàng
            </h2>

            <p className="text-[#6B7280] mt-1">
              Tìm đường đến cửa hàng 302 Tech
            </p>
          </div>

        </div>

        <div
          className="
            overflow-hidden
            rounded-[24px]
            border border-orange-100
            shadow-sm
          "
        >
          <iframe
            src="https://www.google.com/maps?q=302%20Nguyen%20Van%20Rop%20Tan%20Ninh%20Tay%20Ninh&output=embed"
            width="100%"
            height="560"
            loading="lazy"
            allowFullScreen
            className="border-0 w-full"
          />
        </div>

      </div>

    </div>

  </div>

</div>

                        </div>
                    </div>
                </div>




            <Footer />
        </>
    );
}