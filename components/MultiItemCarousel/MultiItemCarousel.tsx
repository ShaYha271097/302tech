"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import Link from "next/link";
import BrandCarouselSkeleton from "../BrandCarouselSkeleton/BrandCarouselSkeleton";

type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  isActive: boolean;
};

const brandImages = [
  "/assets/images/anh1.jpg",
  "/assets/images/anh2.jpg",
  "/assets/images/anh3.jpg",
];

export default function MultiItemCarousel() {
  const [mounted, setMounted] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("/api/brands");
        const data = await res.json();

        setBrands(
          (data?.brands || []).filter(
            (brand: Brand) => !brand.isActive
          )
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (!mounted || loading) {
    return <BrandCarouselSkeleton />;
  }

  const loopBrands = [...brands, ...brands];

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
            {loopBrands.map((brand, index) => {
              const image =
                brandImages[index % brandImages.length];

              return (
                <SwiperSlide key={`${brand.slug}-${index}`}>
                  <Link href={`/products?brand=${brand.slug}`}>
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