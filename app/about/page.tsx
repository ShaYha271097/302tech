"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Breadcrumb from "../products/[slug]/Breadcrumb";

export default function AboutPage() {
    return (
        <>
            <Header />

            <div className="wrap-main w-clear">
                <div className="fixwidth">

                    <div className="content-main w-clear">

                        {/* Breadcrumb */}
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
  {/* TITLE */}
  <div className="text-center mb-14">

    <div
      className="
        inline-flex
        items-center
        gap-2
        px-4 py-2
        rounded-full
        bg-[#FFF7ED]
        text-[#ff7a00]
        text-sm
        font-semibold
        border border-[#FED7AA]
        mb-5
      "
    >
      ✨ Giới thiệu
    </div>

    <h1
      className="
        text-4xl md:text-5xl
        font-black
        tracking-tight
        text-[#111827]
      "
    >
      Về{" "}
      <span className="text-[#ff7a00]">
        302 Tech
      </span>
    </h1>

    <p
      className="
        mt-4
        text-[#6B7280]
        max-w-2xl
        mx-auto
        leading-8
      "
    >
      Đồng hành cùng khách hàng với những chiếc laptop chất lượng,
      dịch vụ tận tâm và mức giá hợp lý.
    </p>

  </div>

  {/* TOP */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

    {/* LEFT */}
    <div
      className="
        rounded-[28px]
        border border-[#F3F4F6]
        p-7 md:p-9
        bg-white
      "
    >

      <h2
        className="
          text-3xl
          font-black
          text-[#111827]
          mb-6
        "
      >
        302 Tech là ai?
      </h2>

      <div
        className="
          space-y-5
          text-[15px]
          leading-8
          text-[#4B5563]
        "
      >

        <p>
          302 Tech chuyên cung cấp laptop cũ chất lượng cao,
          tập trung vào các dòng doanh nhân, gaming,
          đồ họa và học tập với mức giá tốt.
        </p>

        <p>
          Chúng tôi ưu tiên sự minh bạch,
          kiểm tra kỹ sản phẩm trước khi bán
          và luôn hỗ trợ khách hàng tận tâm.
        </p>

        <p>
          Mỗi sản phẩm đều được test kỹ,
          vệ sinh sạch sẽ và hỗ trợ bảo hành rõ ràng.
        </p>

      </div>

      {/* COMMIT */}
      <div
        className="
          mt-8
          rounded-[24px]
          bg-[#FFF7ED]
          border border-[#FED7AA]
          p-6
        "
      >

        <h3
          className="
            text-2xl
            font-black
            text-[#ff7a00]
            mb-5
          "
        >
          Cam kết từ 302 Tech
        </h3>

        <div className="space-y-4">

          {[
            "Laptop đúng mô tả",
            "Kiểm tra kỹ trước khi giao",
            "Hỗ trợ nhanh chóng và tận tâm",
            "Chính sách bảo hành minh bạch",
          ].map((item) => (
            <div
              key={item}
              className="
                flex items-center gap-3
                text-[#374151]
                font-medium
              "
            >
              <div
                className="
                  w-7 h-7
                  rounded-full
                  bg-[#ff7a00]
                  text-white
                  flex items-center justify-center
                  text-sm
                "
              >
                ✓
              </div>

              {item}
            </div>
          ))}

        </div>

      </div>

    </div>

    {/* RIGHT */}
    <div
      className="
        rounded-[28px]
        bg-[#FFFBF8]
        border border-[#FDE7D8]
        p-7 md:p-9
        flex flex-col justify-between
      "
    >

      <div>

        <h2
          className="
            text-3xl
            font-black
            text-[#111827]
            mb-7
          "
        >
          Vì sao chọn 302 Tech?
        </h2>

        <div className="space-y-6">

          {[
            {
              icon: "💻",
              title: "Laptop chất lượng",
              desc: "Kiểm tra kỹ càng trước khi bán ra.",
            },
            {
              icon: "🛠️",
              title: "Hỗ trợ tận tâm",
              desc: "Hỗ trợ khách hàng nhanh chóng trong quá trình sử dụng.",
            },
            {
              icon: "🛡️",
              title: "Bảo hành rõ ràng",
              desc: "Chính sách minh bạch và xử lý nhanh khi phát sinh lỗi.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
                flex gap-4
                rounded-2xl
                bg-white
                border border-[#F3F4F6]
                p-5
              "
            >

              <div
                className="
                  w-12 h-12
                  rounded-2xl
                  bg-[#FFF7ED]
                  flex items-center justify-center
                  text-2xl
                  shrink-0
                "
              >
                {item.icon}
              </div>

              <div>

                <h3
                  className="
                    font-bold
                    text-[#111827]
                    mb-1
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    text-[#6B7280]
                    leading-7
                  "
                >
                  {item.desc}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* BOTTOM */}
      <div
        className="
          mt-8
          rounded-[24px]
          bg-[#ff7a00]
          p-7
          text-white
        "
      >

        <h3
          className="
            text-3xl
            font-black
            mb-3
          "
        >
          302 Tech
        </h3>

        <p className="leading-8 text-white/90">
          Đồng hành cùng khách hàng với những chiếc laptop
          chất lượng và dịch vụ tận tâm.
        </p>

      </div>

    </div>

  </div>

  {/* STATS */}
  <div
    className="
      grid
      grid-cols-2
      md:grid-cols-4
      gap-5
      mt-14
    "
  >

    {[
      {
        number: "1000+",
        text: "Khách hàng",
      },
      {
        number: "500+",
        text: "Laptop bán ra",
      },
      {
        number: "2",
        text: "Chi nhánh",
      },
      {
        number: "24/7",
        text: "Hỗ trợ khách hàng",
      },
    ].map((item) => (
      <div
        key={item.text}
        className="
          rounded-[24px]
          border border-[#F3F4F6]
          bg-white
          p-6
          text-center
          hover:-translate-y-1
          transition-all
        "
      >

        <h3
          className="
            text-4xl
            font-black
            text-[#ff7a00]
            mb-3
          "
        >
          {item.number}
        </h3>

        <p
          className="
            text-[#6B7280]
            font-medium
          "
        >
          {item.text}
        </p>

      </div>
    ))}

  </div>

</div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}