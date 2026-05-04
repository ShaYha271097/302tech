"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice, getVariantText } from "@/lib/format";

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


  const getCheapestVariant = (variants: any[]) => {
    if (!variants?.length) return null;

    return variants.reduce((min, v) =>
      v.price < min.price ? v : min
    );
  };

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
            {products?.map((p, index) => {
              const cheapest = getCheapestVariant(p.variants);
              return (
                <SwiperSlide key={index}>
                  <div className="all_sp_banchay_index">

                    <div className="all_img_sp_bc">
                        <Link href={`/products/${p.slug}-${p._id}`}>
                        <div className="img_sp_bc">
                          <div>
                            <img src={p.mainImage} className="w-full h-auto" />
                          </div>
                          {/* <div className="img_sp_2">
                <img src={p.img2} className="w-full h-auto" />
              </div> */}
                        </div>
                      </Link>
                    </div>

                    <div className="all_content_sp">
                      <Link href={`/products/${p.slug}-${p._id}`}>
                        <div className="name_sp text-split">
                          {p.name} - {getVariantText(cheapest)}
                        </div>
                      </Link>

                      <div className="gia_sp">
                        <span>
                          {formatPrice(cheapest?.price)}
                        </span>
                      </div>

                      <div className="cart-product">
                        <Link href={`/products/${p.slug}-${p._id}`} className="muangay_sp">
                          Mua ngay
                        </Link>
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}