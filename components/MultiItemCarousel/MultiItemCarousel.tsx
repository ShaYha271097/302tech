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
  <div className="wrap_bottom">
    <div className="fixwidth">

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={500}
        breakpoints={{
          0: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 8,
          },
        }}
      >

        {loopBrands.map((item, index) => {
          return (
            <SwiperSlide key={index}>

              <Link href={`/products?brand=${item.slug}`}>

                <div
                  className="
                    group
                    bg-white
                    border border-[#E8E8E8]
                    rounded-2xl
                    p-3
                    flex flex-col items-center justify-center
                    transition-all duration-300
                    hover:border-[#FED7AA]
                    hover:shadow-[0_8px_25px_rgba(255,122,0,0.08)]
                  "
                >

                  {/* IMAGE */}
                  <div
                    className="
                      w-[72px]
                      h-[72px]
                      rounded-2xl
                      flex items-center justify-center
                      overflow-hidden
                    "
                  >

                    <img
                      src={item.img}
                      alt={item.name}
                      className="
                        w-[58px]
                        h-[58px]
                        object-contain
                        transition-transform duration-300
                        group-hover:scale-110
                      "
                    />

                  </div>

                  {/* NAME */}
                  <div
                    className="
                      mt-3
                      text-[14px]
                      font-semibold
                      text-[#374151]
                      text-center
                      transition-colors duration-300
                      group-hover:text-[#ff7a00]
                    "
                  >
                    {item.name}
                  </div>

                </div>

              </Link>

            </SwiperSlide>
          );
        })}

      </Swiper>

    </div>
  </div>
</div>
  );
}