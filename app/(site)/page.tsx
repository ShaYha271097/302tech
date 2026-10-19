
import ProductSection from "@/components/ProductSection/ProductSection";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

type Category = {
  _id: ObjectId;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder?: number;
};

type Variant = {
  cpu: string;
  ram: string;
  ssd: string;
  price: number;
  screenSize: string;
  resolution: string;
  refreshRate: string;
};

type Product = {
  _id: ObjectId;
  brandId: ObjectId;
  categoryIds: ObjectId[];
  name: string;
  slug: string;
  mainImage: string;
  gallery: string[];
  variants: Variant[];
  createdAt: Date;
  isHot: boolean;
  isNew: boolean;
  isActive: boolean;
};

async function getHomeData() {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const categories = await db
    .collection<Category>("categories")
    .find({ isActive: true })
    .sort({ sortOrder: 1, name: 1 })
    .toArray();

  const sections = await Promise.all(
    categories.map(async (category) => {
      const products = await db
        .collection<Product>("products")
        .find({
          categoryIds: category._id,
          isActive: true,
        })
        .sort({ createdAt: -1 })
        .limit(4)
        .toArray();

      return {
        category,
        products,
      };
    })
  );

  return sections.filter(
    (section) => section.products.length > 0
  );
}

export default async function Home() {
  const sections = await getHomeData();

  return (
    <div className="wrap-home w-clear">
      {sections.map((section) => (
        <ProductSection
          key={section.category._id.toString()}
          title={section.category.name}
          slug={section.category.slug}
          products={section.products}
        />
      ))}
    </div>
  );
}
