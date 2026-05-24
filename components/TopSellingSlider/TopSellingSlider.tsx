"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice, getCheapestVariant, getVariantText } from "@/lib/format";
import ProductCard from "../ProductCard/ProductCard";

// import "swiper/css";


type Variant = {
  cpu: string
  ram: string
  ssd: string
  price: number
  screenSize: string;
  resolution: string;
  refreshRate: string;
}
type Product = {
  _id: string
  name: string
  slug: string
  mainImage: string
  gallery: string[]
  variants: Variant[]
  createdAt: Date
  isHot: boolean;
  isNew: boolean;
}

export default function TopSellingSlider() {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products?isHot=true&limit=18")
      .then(res => res.json())
      .then(data => {
        console.log("data?.products",data?.products)
        setProducts(data?.products)
      });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;



  return (
    <div className="wrap_bottom wrap_flashsale">
      <div className="fixwidth">
        <div className="box-deal">
           {/* TITLE */}
          <div className="flex items-center justify-center mb-6">

            <h2
              className="
                text-[24px]
                md:text-[28px]
                font-black
                tracking-tight
                text-[#111827]
              "
            >
              TOP SẢN PHẨM{" "}
              <span className="text-[#ff7a00]">
                BÁN CHẠY
              </span>
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
            {products?.map((p, index) => {
              const cheapest = getCheapestVariant(p.variants);
              return (
                <SwiperSlide key={index}>
                    <ProductCard   key={p._id} product={p} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
