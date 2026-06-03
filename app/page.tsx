import BannerSlider from "@/components/BannerSlider/BannerSlider";
import MultiItemCarousel from "@/components/MultiItemCarousel/MultiItemCarousel";
import TopSellingSlider from "@/components/TopSellingSlider/TopSellingSlider";
import ProductSection from "@/components/ProductSection/ProductSection";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
 interface Brand {
  _id: ObjectId;
  name: string;
  slug: string;
  image: string;
  isActive: boolean;
}
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
async function getHomeData() {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

const [bannerData, brands, hotProducts] =
  await Promise.all([
    db.collection("homepage_banner")
      .findOne({ key: "main" }),

    db.collection<Brand>("brands")
      .find({ isActive: false })
      .toArray(),

    db.collection<Product>("products")
      .find({ isHot: true })
      .limit(18)
      .toArray(),
  ]);

  const sections = (
    await Promise.all(
      brands.map(async (brand) => {
        const products = await db
          .collection("products")
          .find({
            brandId: brand._id,
          })
          .limit(4)
          .toArray();

        return {
          brand,
          products,
        };
      })
    )
  ).filter((section) => section.products.length > 0);
  return {
    bannerData,
    brands,
    sections,
    hotProducts,
  };
}

export default async function Home() {
 const {
  bannerData,
  brands,
  sections,
  hotProducts,
} = await getHomeData();
  
  console.log("brands111",brands)
  return (
    <>
      <BannerSlider
        slider={bannerData?.slider || []}
        banners={
          bannerData?.banners || {
            top: { image: "", link: "" },
            bottom: { image: "", link: "" },
          }
        }
      />

      <div className="wrap-home w-clear">
       <MultiItemCarousel brands={brands} />

       <TopSellingSlider
        products={hotProducts}
      />

        {sections.map((section) => (
          <ProductSection
            key={section.brand._id.toString()}
            title={section.brand.name}
            slug={section.brand.slug}
            products={section.products}
          />
        ))}
      </div>
    </>
  );
}