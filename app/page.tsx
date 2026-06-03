import BannerSlider from "@/components/BannerSlider/BannerSlider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MultiItemCarousel from "@/components/MultiItemCarousel/MultiItemCarousel";
import TopSellingSlider from "@/components/TopSellingSlider/TopSellingSlider";
import ProductSection from "@/components/ProductSection/ProductSection";
import ProductSectionSkeleton from "@/components/ProductSectionSkeleton/ProductSectionSkeleton";
import clientPromise from "@/lib/mongodb";


 async function getHomepageBanner() {
  const client = await clientPromise;

  const db = client.db("laptop-shop");

   const bannerData = await db
    .collection("homepage_banner")
    .findOne({ key: "main" });

  return bannerData;
}

export default async function Home() {
   const bannerData = await getHomepageBanner();
  
  // const client = await clientPromise;
  // const db = client.db("laptop-shop");

//   const brands = await db
//     .collection("brands")
//     .find({ isActive: false })
//     .toArray();

// const sections = (
//   await Promise.all(
//     brands.map(async (brand) => {
//       const products = await db
//         .collection("products")
//         .find({
//           brandId: brand._id,
//         })
//         .limit(4)
//         .toArray();

//       return {
//         brand,
//         products,
//       };
//     })
//   )
// ).filter((section) => section.products.length > 0);
  return (
    <>

{/* 
      <BannerSlider

      /> */}

    <BannerSlider
      slider={bannerData?.slider || []}
      banners={
        bannerData?.banners || {
          top: { image: "", link: "" },
          bottom: { image: "", link: "" },
        }
      }
    />
      {/* <div className="wrap-home w-clear">
        <MultiItemCarousel/>
       
        

        <TopSellingSlider />
         {sections.map((section) => (
          <ProductSection
            key={section.brand._id.toString()}
            title={section.brand.name}
            slug={section.brand.slug}
            products={section.products}
          />
        ))}
      </div> */}

    </>
  );
}
