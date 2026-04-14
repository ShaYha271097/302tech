"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
// import "swiper/css";



const products = [
  {
    name: "Alienware M16",
    price: "28.900.000đ",
    slug: "/san-pham/alienware-m16",
    img1: "https://laptopgaming.com.vn/upload/2tr9/z7091979192162_9cfb787c0286cad8d8b1d4fdc2734205.jpg",
    img2: "https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg",
  },
  {
    name: "Alienware M16",
    price: "28.900.000đ",
    slug: "/san-pham/alienware-m16",
    img1: "https://laptopgaming.com.vn/upload/2tr9/z7091979192162_9cfb787c0286cad8d8b1d4fdc2734205.jpg",
    img2: "https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg",
  },
  {
    name: "Alienware M16",
    price: "28.900.000đ",
    slug: "/san-pham/alienware-m16",
    img1: "https://laptopgaming.com.vn/upload/2tr9/z7091979192162_9cfb787c0286cad8d8b1d4fdc2734205.jpg",
    img2: "https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg",
  },
  {
    name: "Alienware M16",
    price: "28.900.000đ",
    slug: "/san-pham/alienware-m16",
    img1: "https://laptopgaming.com.vn/upload/2tr9/z7091979192162_9cfb787c0286cad8d8b1d4fdc2734205.jpg",
    img2: "https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg",
  },
  {
    name: "Alienware M16",
    price: "28.900.000đ",
    slug: "/san-pham/alienware-m16",
    img1: "https://laptopgaming.com.vn/upload/2tr9/z7091979192162_9cfb787c0286cad8d8b1d4fdc2734205.jpg",
    img2: "https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg",
  },
  {
    name: "Alienware M16",
    price: "28.900.000đ",
    slug: "/san-pham/alienware-m16",
    img1: "https://laptopgaming.com.vn/upload/2tr9/z7091979192162_9cfb787c0286cad8d8b1d4fdc2734205.jpg",
    img2: "https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg",
  },
  {
    name: "Alienware M16",
    price: "28.900.000đ",
    slug: "/san-pham/alienware-m16",
    img1: "https://laptopgaming.com.vn/upload/2tr9/z7091979192162_9cfb787c0286cad8d8b1d4fdc2734205.jpg",
    img2: "https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg",
  },
  {
    name: "Alienware M16",
    price: "28.900.000đ",
    slug: "/san-pham/alienware-m16",
    img1: "https://laptopgaming.com.vn/upload/2tr9/z7091979192162_9cfb787c0286cad8d8b1d4fdc2734205.jpg",
    img2: "https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg",
  },
  {
    name: "Alienware M16",
    price: "28.900.000đ",
    slug: "/san-pham/alienware-m16",
    img1: "https://laptopgaming.com.vn/upload/2tr9/z7091979192162_9cfb787c0286cad8d8b1d4fdc2734205.jpg",
    img2: "https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg",
  },
  {
    name: "Alienware M16",
    price: "28.900.000đ",
    slug: "/san-pham/alienware-m16",
    img1: "https://laptopgaming.com.vn/upload/2tr9/z7091979192162_9cfb787c0286cad8d8b1d4fdc2734205.jpg",
    img2: "https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg",
  },
  {
    name: "Alienware M16",
    price: "28.900.000đ",
    slug: "/san-pham/alienware-m16",
    img1: "https://laptopgaming.com.vn/upload/2tr9/z7091979192162_9cfb787c0286cad8d8b1d4fdc2734205.jpg",
    img2: "https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg",
  },
  // thêm 40 cái cũng OK 😎
];
export default function TopSellingSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;


  return (
    <div className="wrap_bottom wrap_flashsale">
      <div className="fixwidth">
        <div className="box-deal">
          <div className="all_time_box">
            <h2 className="title_flash">
              TOP SẢN PHẨM BÁN CHẠY
            </h2>
          </div>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={5}
            spaceBetween={16}
            loop={true}
            autoplay={false}
            breakpoints={{
              0: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="all_sp_banchay_index">

                  <div className="all_img_sp_bc">
                    <a href={item.slug}>
                      <div className="img_sp_bc">
                        <div>
                          <img src={item.img1} className="w-full h-auto" />
                        </div>
                        {/* <div className="img_sp_2">
                <img src={item.img2} className="w-full h-auto" />
              </div> */}
                      </div>
                    </a>
                  </div>

                  <div className="all_content_sp">
                    <a href={item.slug}>
                      <div className="name_sp">
                        {item.name}
                      </div>
                    </a>

                    <div className="gia_sp">
                      <span>{item.price}</span>
                    </div>

                    <div className="cart-product">
                      <a href={item.slug} className="muangay_sp">
                        Mua ngay
                      </a>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}