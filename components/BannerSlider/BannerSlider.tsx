"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type SliderItem = {
  image: string;
  link: string;
};

type Banner = {
  image: string;
  link: string;
};

type Props = {
  slider: SliderItem[];
  banners: {
    top: Banner;
    bottom: Banner;
  };
};

export default function BannerSlider({
  slider,
  banners,
}: Props) {
  console.log("slider",slider)
  return (
    <div className="wrap_slider mt-3 mb-3">
      <div className="fixwidth">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 h-[250px] sm:h-[320px] lg:h-[400px] overflow-hidden rounded-[10px]">
            {!slider.length ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 rounded-[10px]">
                Không có banner
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={slider.length > 1}
                className="home-swiper w-full h-full rounded-[10px]"
              >
                {slider.map((item, index) => (
                  <SwiperSlide key={index}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative w-full h-full"
                    >
                      <Image
                        src={item.image}
                        alt={`banner-${index}`}
                        fill
                        priority={index === 0}
                        sizes="(max-width:1024px) 100vw, 66vw"
                        className="object-fill"
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <div className="flex lg:flex-col gap-3 h-[150px] sm:h-[200px] lg:h-[400px]">
            <a
              href={banners.top.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 lg:w-full relative overflow-hidden rounded-[10px]"
            >
              <Image
                src={banners.top.image}
                alt="banner-top"
                fill
                sizes="(max-width:1024px) 50vw, 33vw"
                className="object-fill"
              />
            </a>

            <a
              href={banners.bottom.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 lg:w-full relative overflow-hidden rounded-[10px]"
            >
              <Image
                src={banners.bottom.image}
                alt="banner-bottom"
                fill
                sizes="(max-width:1024px) 50vw, 33vw"
                className="object-fill"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}