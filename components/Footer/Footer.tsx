import Link from "next/link";


export default function Footer() {
    return (
        <div className="border-t border-[#F3F4F6] bg-white mt-10">
  <div className="fixwidth py-10">

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-8
      "
    >

      {/* INFO */}
      <div>

        <h3
          className="
            text-[18px]
            font-bold
            tracking-tight
            text-[#111827]
            mb-5
          "
        >
          Thông tin liên hệ
        </h3>

        <div className="space-y-3 text-sm leading-7 text-[#4B5563]">

          <p className="font-semibold text-[#111827]">
            HỘ KINH DOANH LAPTOP 302 TECH
          </p>

          <p>
            Cơ sở 1: 302 Nguyễn Văn Rốp,
            Khu phố 5, Tân Ninh, Tây Ninh
          </p>

          <p>
            Cơ sở 2: 1073A Đ. Nguyễn Ảnh Thủ,
            Tân Chánh Hiệp, Trung Mỹ Tây, Hồ Chí Minh
          </p>

          <p>
            Hotline:
            <span className="font-semibold text-[#ff7a00] ml-1">
              094 693 2067
            </span>
          </p>

          <p>
            Giờ làm việc:
            <span className="ml-1">
              9h - 20h (Thứ 2 - Chủ Nhật)
            </span>
          </p>

          <p>
            Email:
            <span className="ml-1">
              ddrduongqua1027@gmail.com
            </span>
          </p>

        </div>
      </div>

      {/* CATEGORY */}
      <div>

        <h3
          className="
            text-[18px]
            font-bold
            tracking-tight
            text-[#111827]
            mb-5
          "
        >
          Danh mục sản phẩm
        </h3>

        <div className="flex flex-col gap-3 text-sm leading-7 text-[#4B5563]">

          <Link
            href="/products?category=dienthoai"
            className="
              hover:text-[#ff7a00]
              hover:translate-x-1
              transition-all duration-300
            "
          >
            Điện thoại
          </Link>

          <Link
            href="/products?category=laptop"
            className="
              hover:text-[#ff7a00]
              hover:translate-x-1
              transition-all duration-300
            "
          >
            Laptop
          </Link>

          <Link
            href="/products?category=tablet"
            className="
              hover:text-[#ff7a00]
              hover:translate-x-1
              transition-all duration-300
            "
          >
            Tablet
          </Link>

          <Link
            href="/products?category=phukien"
            className="
              hover:text-[#ff7a00]
              hover:translate-x-1
              transition-all duration-300
            "
          >
            Phụ kiện
          </Link>

        </div>
      </div>

      {/* EXTRA */}
      <div>

        <h3
          className="
            text-[18px]
            font-bold
            tracking-tight
            text-[#111827]
            mb-5
          "
        >
          Thông tin bổ sung
        </h3>

        <div className="flex flex-col gap-3 text-sm leading-7 text-[#4B5563]">

          <Link
            href="/about"
            className="
              hover:text-[#ff7a00]
              hover:translate-x-1
              transition-all duration-300
            "
          >
            Về chúng tôi
          </Link>

          <Link
            href="/contact"
            className="
              hover:text-[#ff7a00]
              hover:translate-x-1
              transition-all duration-300
            "
          >
            Liên hệ
          </Link>

          <Link
            href="/warranty"
            className="
              hover:text-[#ff7a00]
              hover:translate-x-1
              transition-all duration-300
            "
          >
            Chính sách bảo hành
          </Link>

        </div>
      </div>

      {/* FANPAGE */}
      <div>

        <h3
          className="
            text-[18px]
            font-bold
            tracking-tight
            text-[#111827]
            mb-5
          "
        >
          Fanpage cửa hàng
        </h3>

        {/* SOCIAL */}
        <div className="flex items-center gap-3 mb-5">

          <a
            href="https://www.facebook.com/profile.php?id=61568759679115"
            target="_blank"
            className="
              w-11 h-11
              rounded-xl
              border border-[#E5E7EB]
              bg-[#FFF7ED]
              flex items-center justify-center
              transition-all duration-300
              hover:border-[#ff7a00]
              hover:bg-[#ff7a00]
              hover:shadow-[0_0_20px_rgba(255,122,0,0.15)]
            "
          >
            <img
              width={30}
              height={30}
              src="https://laptopgaming.com.vn/thumbs/30x30/photo/facebook2.png"
              alt="facebook"
              className="
                transition-all duration-300
                hover:scale-110
              "
            />
          </a>

        </div>

        {/* FANPAGE */}
        <div
          className="
            w-full
            overflow-hidden
            rounded-2xl
            border border-[#E5E7EB]
            shadow-sm
          "
        >
          <div className="aspect-[4/3]">

            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/profile.php?id=61568759679115&tabs=timeline&width=500&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              className="w-full h-full border-none"
              loading="lazy"
            />

          </div>
        </div>

        {/* BCT */}
        <div className="mt-5">

          <a
            href="http://online.gov.vn/Website/chi-tiet-138321"
            target="_blank"
          >
            <img
              src="/assets/images/logo-bo-cong-thuong.png"
              className="w-[160px] object-contain"
              alt="Laptop 302 Tech"
            />
          </a>

        </div>
      </div>

    </div>
  </div>


     <div
        className="
          border-t border-[#F3F4F6]
          bg-[#252525]
        "
      >
        <div
          className="
            fixwidth
            py-4
            text-center
            text-sm
            text-[#6B7280]
          "
        >
          © 2026 Laptop 302 Tech, Bản quyền thuộc về
          <span className="ml-1 text-[#ff7a00] font-medium">
            ddrduongqua1027@gmail.com
          </span>
        </div>
      </div>
           <div
  className="
    fixed
    right-4
    bottom-5
    z-50
  "
>

  <ul className="flex flex-col gap-3">

    {/* PHONE */}
    <li>
      <a
        href="tel:0946932067"
        target="_blank"
        className="
          group
          w-14 h-14
          rounded-2xl
          bg-white
          border border-[#E5E7EB]
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          flex items-center justify-center
          transition-all duration-300
          hover:-translate-y-1
          hover:border-[#FED7AA]
          hover:shadow-[0_10px_30px_rgba(255,122,0,0.15)]
        "
      >

        <img
          src="/assets/images/phone2.svg"
          className="
            w-7 h-7
            transition-transform duration-300
            group-hover:scale-110
          "
          alt="phone"
        />

      </a>
    </li>

    {/* ZALO */}
    <li>
      <a
        href="https://zalo.me/0946932067"
        target="_blank"
        className="
          group
          w-14 h-14
          rounded-2xl
          bg-white
          border border-[#E5E7EB]
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          flex items-center justify-center
          transition-all duration-300
          hover:-translate-y-1
          hover:border-[#FED7AA]
          hover:shadow-[0_10px_30px_rgba(255,122,0,0.15)]
        "
      >

        <img
          src="/assets/images/zalo2.svg"
          className="
            w-7 h-7
            transition-transform duration-300
            group-hover:scale-110
          "
          alt="zalo"
        />

      </a>
    </li>

    {/* MESSENGER */}
    <li>
      <a
        href="https://m.me/61568759679115"
        target="_blank"
        className="
          group
          w-14 h-14
          rounded-2xl
          bg-white
          border border-[#E5E7EB]
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          flex items-center justify-center
          transition-all duration-300
          hover:-translate-y-1
          hover:border-[#FED7AA]
          hover:shadow-[0_10px_30px_rgba(255,122,0,0.15)]
        "
      >

        <img
          src="/assets/images/messenger2.svg"
          className="
            w-7 h-7
            transition-transform duration-300
            group-hover:scale-110
          "
          alt="messenger"
        />

      </a>
    </li>

    {/* MAP */}
    <li>
      <a
        href="https://maps.app.goo.gl/LjjyW6V9h5o7zsi96"
        target="_blank"
        className="
          group
          w-14 h-14
          rounded-2xl
          bg-white
          border border-[#E5E7EB]
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          flex items-center justify-center
          transition-all duration-300
          hover:-translate-y-1
          hover:border-[#FED7AA]
          hover:shadow-[0_10px_30px_rgba(255,122,0,0.15)]
        "
      >

        <img
          src="/assets/images/map2.svg"
          className="
            w-7 h-7
            transition-transform duration-300
            group-hover:scale-110
          "
          alt="map"
        />

      </a>
    </li>

  </ul>

</div>

        </div>

    )
}