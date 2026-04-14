"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

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

export default function BannerSlider() {
  const [slider, setSlider] = useState<SliderItem[]>([]);
  const [banners, setBanners] = useState<{
    top: Banner;
    bottom: Banner;
  }>({
    top: { image: "", link: "" },
    bottom: { image: "", link: "" },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/homepage-banner")
      .then((res) => res.json())
      .then((data) => {
        if (data?.slider) setSlider(data.slider);
        if (data?.banners) setBanners(data.banners);
      })
      .finally(() => setLoading(false));
  }, []);

  // 👉 loading
  if (loading) {
    return (
      <div className="w-full h-full object-cover rounded bg-gray-200 animate-pulse rounded-[10px]" />
    );
  }

  return (
    <div className="wrap_slider">
      <div className="fixwidth">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

          {/* SLIDER */}
          <div className="lg:col-span-2">
            {!slider.length ? (
              <div className="w-full h-full object-cover rounded bg-gray-100 flex items-center justify-center rounded text-gray-400">
                Không có banner
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop={slider.length > 1}
                className="w-full h-full object-cover rounded rounded-[10px]"
              >
                {slider.map((item, index) => (
                  <SwiperSlide key={index}>
                    <a href={item.link || "#"} target="_blank" rel="noopener noreferrer">
                      <img
                        src={item.image}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        alt={`banner-${index}`}
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
            
          {/* SIDE BANNER */}
          <div className="flex flex-col gap-3 sm:gap-4">

            {/* TOP */}
            {banners.top.image ? (
              <a href={banners.top.link || "#"} target="_blank" rel="noopener noreferrer">
                <img
                  src={banners.top.image}
                  className="w-full h-full object-cover rounded"
                  alt="banner-top"
                />
              </a>
            ) : (
              <div className="w-full h-full object-cover rounded flex items-center justify-center bg-gray-100 text-gray-400 rounded">
                Banner trên
              </div>
            )}

            {/* BOTTOM */}
            {banners.bottom.image ? (
              <a href={banners.bottom.link || "#"} target="_blank" rel="noopener noreferrer">
                <img
                  src={banners.bottom.image}
                  className="w-full h-full object-cover rounded"
                  alt="banner-bottom"
                />
              </a>
            ) : (
              <div className="w-full h-full object-cover rounded flex items-center justify-center bg-gray-100 text-gray-400 rounded">
                Banner dưới
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}