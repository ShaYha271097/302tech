
import ProductSection from "@/components/ProductSection/ProductSection";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import Link from "next/link";
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
    <>
      <div className="wrap_slider">
        <div className="fixwidth py-2 md:px-0 md:py-3">
          {/* BANNER HỖ TRỢ TRẢ GÓP - DESKTOP + MOBILE */}
          <Link
            href="tel:0946932067"
            aria-label="Liên hệ tư vấn hỗ trợ trả góp"
            className="
                group flex w-full items-center
                gap-3 sm:gap-4
                rounded-xl border border-orange-200
                bg-gradient-to-r from-orange-50 via-white to-orange-50
                px-3 py-3 sm:px-5 sm:py-4
                no-underline
                transition-colors duration-200
            "
          >
            {/* ICON */}
            <div
              className="
                    flex h-10 w-10 sm:h-14 sm:w-14
                    shrink-0 items-center justify-center
                    rounded-xl bg-white
                    text-2xl sm:text-3xl shadow-sm
                    animate-[wiggle_1.5s_ease-in-out_infinite]
                "
            >
              💳
            </div>

            {/* CONTENT */}
            <div className="min-w-0 flex-1">
              <div
                className="
                        text-sm sm:text-lg font-extrabold
                        tracking-wide text-[#e96816]
                        transition-colors duration-200
                        group-hover:text-[#ff8a00]
                    "
              >
                HỖ TRỢ TRẢ GÓP LAPTOP
              </div>

              <p
                className="
                        mt-1 text-[11px] sm:text-sm
                        leading-snug text-gray-600
                        transition-colors duration-200
                        group-hover:text-[#e96816]
                    "
              >
                Tư vấn nhanh · Thủ tục đơn giản
              </p>
            </div>

            {/* CTA */}
            <div
              className="
                    flex shrink-0 items-center justify-center
                    gap-1 sm:gap-2
                    rounded-lg bg-[#f58220]
                    px-2.5 py-2 sm:px-5 sm:py-3
                    text-xs sm:text-sm font-bold text-white
                    transition-colors duration-200
                    group-hover:bg-[#e96816]
                "
            >
              <span className="whitespace-nowrap">
                <span className="sm:hidden">Tư vấn</span>
                <span className="hidden sm:inline">LIÊN HỆ NGAY</span>
              </span>

              <span className="text-base sm:text-xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        </div>
      </div>


      <div className="wrap-home w-clear">
        {/* Banner hỗ trợ trả góp */}

        {sections.map((section) => (
          <ProductSection
            key={section.category._id.toString()}
            title={section.category.name}
            slug={section.category.slug}
            products={section.products}
          />
        ))}
      </div>
    </>
  );
}
