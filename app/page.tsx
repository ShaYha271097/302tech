import BannerSlider from "@/components/BannerSlider/BannerSlider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MultiItemCarousel from "@/components/MultiItemCarousel/MultiItemCarousel";
import TopSellingSlider from "@/components/TopSellingSlider/TopSellingSlider";
import ProductSection from "@/components/ProductSection/ProductSection";

export default async function Home() {



  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/home`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();



  console.log("data=>>>>>>>>>>>", data)
  return (
    <>
    
      <Header />
      <BannerSlider />
      <div className="wrap-home w-clear">
        <MultiItemCarousel />
        <TopSellingSlider />
        {/* <ProductSection
              title="HP"
              slug="hp"
              products={data.hp.products}
            /> */}
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
      </div>
      <Footer />



    </>
  );
}
