"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import Link from "next/link";
import BrandCarouselSkeleton from "../BrandCarouselSkeleton/BrandCarouselSkeleton";
import { ObjectId } from "mongodb";
 interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  isActive: boolean;
}

const brandImages = [
  "/assets/images/anh1.webp",
  "/assets/images/anh2.webp",
  "/assets/images/anh3.webp",
];
type Props = {
  brands: Brand[];
};
export default function MultiItemCarousel({
  brands,
}: Props) {
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <BrandCarouselSkeleton />;
}

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
            {brands.map((brand, index) => {
              const image =
                brandImages[index % brandImages.length];
               const isLaptopMenu = brand.slug === "laptop";
              return (
                <SwiperSlide key={`${brand.slug}-${index}`}>
                  <Link   href={{
                                pathname: "/products",
                                query: isLaptopMenu
                                    ? { category: "laptop" }
                                    : { category: "laptop", brand: brand.slug },
                            }}>

                  
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
                          src={image}
                          alt={brand.name}
                          className="
                            w-[58px]
                            h-[58px]
                            object-contain
                            transition-transform
                            duration-300
                            group-hover:scale-110
                          "
                        />
                      </div>

                      <div
                        className="
                          mt-3
                          text-[14px]
                          font-semibold
                          text-[#374151]
                          text-center
                          transition-colors
                          duration-300
                          group-hover:text-[#ff7a00]
                        "
                      >
                        {brand.name}
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