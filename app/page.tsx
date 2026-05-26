"use client";
import BannerSlider from "@/components/BannerSlider/BannerSlider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MultiItemCarousel from "@/components/MultiItemCarousel/MultiItemCarousel";
import TopSellingSlider from "@/components/TopSellingSlider/TopSellingSlider";
import ProductSection from "@/components/ProductSection/ProductSection";
import { useEffect, useState } from "react";

export default  function Home() {

 const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await fetch("/api/home");

        const result = await res.json();

        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHome();
  }, []);

  return (
  <>
    <Header />

    <BannerSlider />

    <div className="wrap-home w-clear">
      <MultiItemCarousel />

      <TopSellingSlider />

      {!data ? (
        <div className="py-10 text-center">
          Loading...
        </div>
      ) : (
        <>
          <ProductSection
            title="Dell"
            slug="dell"
            products={data.dell.products}
          />

          <ProductSection
            title="Lenovo"
            slug="lenovo"
            products={data.lenovo.products}
          />
        </>
      )}
    </div>

    <Footer />
  </>
);
}
