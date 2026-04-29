"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import Link from "next/link";
// import "swiper/css";

const brands = [
  { name: "Microsoft",slug:'microsoft', img: "https://laptopgaming.com.vn/upload/product/mba13-midnight-select-202402-4597.jpg" },
  { name: "Asus",slug:'asus', img: "https://laptopgaming.com.vn/upload/product/g614ju-n3135w058071f16f6c4e70a19c84aaf23dddfemaster-7914.jpg" },
  { name: "Dell",slug:'dell', img: "https://laptopgaming.com.vn/upload/product/mba13-midnight-select-202402-4597.jpg" },
  { name: "Lenovo",slug:'lenovo', img: "https://laptopgaming.com.vn/upload/product/g614ju-n3135w058071f16f6c4e70a19c84aaf23dddfemaster-7914.jpg" },
  { name: "Gaming",slug:'gaming', img: "https://laptopgaming.com.vn/upload/product/g614ju-n3135w058071f16f6c4e70a19c84aaf23dddfemaster-7914.jpg" },
  { name: "HP",slug:'hp', img: "https://laptopgaming.com.vn/upload/product/mba13-midnight-select-202402-4597.jpg" },
  { name: "Acer",slug:'acer', img: "https://laptopgaming.com.vn/upload/product/mba13-midnight-select-202402-4597.jpg" },
  { name: "MSI",slug:'msi', img: "https://laptopgaming.com.vn/upload/product/g614ju-n3135w058071f16f6c4e70a19c84aaf23dddfemaster-7914.jpg" },
];
const loopBrands = [...brands, ...brands];


export default function MultiItemCarousel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;


  return (
    <div className="all_list_noibat">
      <div className="wrap_bottom ">
        <div className="fixwidth">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            loop={true}
            autoplay={{
              delay: 2000, // 👈 2s
              disableOnInteraction: false,
            }}
            speed={500}
            breakpoints={{
              0: {
                slidesPerView: 3, // mobile
              },
              640: {
                slidesPerView: 5, // tablet
              },
              1024: {
                slidesPerView: 8, // desktop
              },
            }}
          >
            {loopBrands.map((item, index) => {
              return (
              <SwiperSlide key={index}>
                <Link href={`/products?brand=${item.slug}`}>
                  <div className="list_noibat">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-[70px] h-[70px] "
                    />
                    <div className="mt-2 text-sm font-medium text-gray-700">
                      {item.name}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
            })}
          </Swiper>
        </div>
      </div>
    </div >
  );
}