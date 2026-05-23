"use client";

import { useEffect, useState } from "react";
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

  // 👉 loading skeleton
  if (loading) {
    return (
      <div className="w-full h-[250px] sm:h-[320px] lg:h-[450px] bg-gray-200 animate-pulse rounded-[10px]" />
    );
  }

  return (
    <div className="wrap_slider">
      <div className="fixwidth">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

          {/* ================= LEFT SLIDER ================= */}
          <div className="lg:col-span-2 h-[250px] sm:h-[320px] lg:h-[400px] overflow-hidden rounded-[10px]">

            {!slider.length ? (
              <div className="aspect-[1200/450] flex items-center justify-center bg-gray-100 text-gray-400 rounded-[10px]">
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
              className="home-swiper w-full h-full rounded-[10px] overflow-hidden"
            >
                {slider.map((item, index) => (
                  <SwiperSlide key={index}>
                    <a
                      href={item.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      <img
                        src={item.image}
                        className="w-full h-full object-cover transition"
                        alt={`banner-${index}`}
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* ================= RIGHT BANNER ================= */}
         <div className="flex  lg:flex-col gap-3 h-[150px] sm:h-[200px] lg:h-[400px]">

  {/* TOP */}
  {banners.top.image ? (
    <a
      href={banners.top.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 lg:w-full overflow-hidden rounded-[10px]"
    >
      <img
        // src={banners.top.image}
        src="/assets/images/banner2.png"
        className="w-full h-full object-cover hover:scale-105 transition"
        alt="banner-top"
      />
    </a>
  ) : (
    <div className="w-1/2 lg:w-full flex-1 flex items-center justify-center bg-gray-100 text-gray-400 rounded-[10px]">
      Banner trên
    </div>
  )}

  {/* BOTTOM */}
  {banners.bottom.image ? (
    <a
      href={banners.bottom.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 lg:w-full overflow-hidden rounded-[10px]"
    >
      <img
        // src={banners.bottom.image}
        src="/assets/images/banner-top.png"
        className="w-full h-full object-cover hover:scale-105 transition"
        alt="banner-bottom"
      />
    </a>
  ) : (
    <div className="w-1/2 lg:w-full flex-1 flex items-center justify-center bg-gray-100 text-gray-400 rounded-[10px]">
      Banner dưới
    </div>
  )}

</div>

        </div>
      </div>
    </div>
  );
}