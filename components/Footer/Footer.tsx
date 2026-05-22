import Link from "next/link";


export default function BannerSlider() {
    return (
        <div className="boxfooter_container ">
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
            text-[#111111]
            mb-4
          "
        >
          Thông tin liên hệ
        </h3>

        <div className="space-y-3 text-sm text-[#4B5563] leading-6">
          <p className="font-semibold text-[#111111]">
            HỘ KINH DOANH LAPTOP 302 TECH
          </p>

          <p>
            Cơ sở 1: 302 Nguyễn Văn Rốp, Khu phố 5,
            Tân Ninh, Tây Ninh
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
            text-[#111111]
            mb-4
          "
        >
          Danh mục sản phẩm
        </h3>

        <div className="flex flex-col gap-3 text-sm">
          <Link
            href="/products?category=dienthoai"
            className="hover:text-[#ff7a00] transition-all"
          >
            Điện thoại
          </Link>

          <Link
            href="/products?category=laptop"
            className="hover:text-[#ff7a00] transition-all"
          >
            Laptop
          </Link>

          <Link
            href="/products?category=tablet"
            className="hover:text-[#ff7a00] transition-all"
          >
            Tablet
          </Link>

          <Link
            href="/products?category=phukien"
            className="hover:text-[#ff7a00] transition-all"
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
            text-[#111111]
            mb-4
          "
        >
          Thông tin bổ sung
        </h3>

        <div className="flex flex-col gap-3 text-sm">
          <Link
            href="/about"
            className="hover:text-[#ff7a00] transition-all"
          >
            Về chúng tôi
          </Link>

          <Link
            href="/contact"
            className="hover:text-[#ff7a00] transition-all"
          >
            Liên hệ
          </Link>

          <Link
            href="/warranty"
            className="hover:text-[#ff7a00] transition-all"
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
            text-[#111111]
            mb-4
          "
        >
          Fanpage cửa hàng
        </h3>

        {/* SOCIAL */}
        <div className="flex items-center gap-3 mb-4">
          <a
            href="https://www.facebook.com/profile.php?id=61568759679115"
            target="_blank"
            className="
              w-10 h-10
              rounded-xl
              border border-[#E5E7EB]
              flex items-center justify-center
              hover:border-[#ff7a00]
              transition-all
            "
          >
            <img
              width={22}
              height={22}
              src="https://laptopgaming.com.vn/thumbs/30x30/photo/facebook2.png"
              alt="facebook"
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


            <div className="boxfooter_bottom">
                <div className="fixwidth">
                    <div className="left">
                        © 2026 Laptop 302 Tech , Bản quyền thuộc về
                        ddrduongqua1027@gmail.com
                    </div>
                </div>
            </div>
            <div className="section add_this-section">
                <ul className="add_this">
                    <li>
                        <a
                            className="add_this-inner ring_box_phone"
                            href="tel:0946932067"
                            target="_blank"
                            title=""
                        >
                            <img
                                src="/assets/images/phone2.svg"
                                className="ringring"
                                alt="Laptop 302 Tech "
                            />
                            {/* <span className="title">Hotline</span> */}
                        </a>
                    </li>
                    <li>
                        <a
                            className="add_this-inner ring_box_phone"
                            href="https://zalo.me/0946932067"
                            target="_blank"
                            title=""
                        >
                            <img
                                src="/assets/images/zalo2.svg"
                                className="ringring"
                                alt="Laptop 302 Tech "
                            />
                            {/* <span className="title">zalo</span> */}
                        </a>
                    </li>
                    <li>
                        <a
                            className="add_this-inner ring_box_phone"
                             href="https://m.me/61568759679115"
                            target="_blank"
                        >
                            <img
                                src="/assets/images/messenger2.svg"
                                className="ringring"
                                alt="Laptop 302 Tech "
                            />
                            {/* <span className="title">Chat facebook</span> */}
                        </a>
                    </li>
                    <li>
                        <a
                            className="add_this-inner ring_box_phone"
                            href="https://maps.app.goo.gl/LjjyW6V9h5o7zsi96"
                            target="_blank"
                        >
                            <img
                                src="/assets/images/map2.svg"
                                className="ringring"
                                alt="Laptop 302 Tech "
                            />
                            {/* <span className="title">Bản Đồ</span> */}
                        </a>
                    </li>
                </ul>
            </div>

        </div>

    )
}