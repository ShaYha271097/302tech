import { getVariantText } from "@/lib/format";
import Link from "next/link";

export default function ProductCard({
  product,
}: any) {

  const cheapest = product?.variants?.[0];

  return (
    <div
      className="
        group
        bg-white
        border border-[#E8E8E8]
        rounded-sm
        p-4
        h-full
        transition-all duration-300
        hover:border-[#FED7AA]
        hover:shadow-[0_10px_30px_rgba(255,122,0,0.08)]
      "
    >

      {/* IMAGE */}
      <Link href={`/products/${product.slug}-${product._id}`}>

        <div
          className="
            aspect-square
            overflow-hidden
            bg-[#FFF7ED]
            rounded-sm
          "
        >

          <img
            src={product.mainImage}
            className="
              w-full
              h-full
              object-cover
              transition-transform duration-300
              group-hover:scale-105
            "
          />

        </div>

      </Link>

      {/* CONTENT */}
      <div className="py-3">

        {/* NAME */}
        <Link href={`/products/${product.slug}-${product._id}`}>

          <div
            className="
              text-[15px]
              font-semibold
              text-[#111827]
              leading-6
              line-clamp-2
              min-h-[48px]
              transition-colors
              group-hover:text-[#ff7a00]
            "
          >
            {product.name} - {getVariantText(cheapest)}
          </div>

        </Link>

        {/* PRICE */}
        <div
          className="
            mt-3
            text-[18px]
            font-black
            text-[#ff3b30]
          "
        >
          {cheapest?.price?.toLocaleString("vi-VN")}đ
        </div>

        {/* BUTTON */}
        <div className="mt-4">

          <Link
            href={`/products/${product.slug}-${product._id}`}
            className="
              h-10
              rounded-sm
              bg-[#ff7a00]
              text-white
              text-sm
              font-semibold
              flex items-center justify-center
              transition-all duration-300
              hover:bg-[#e86f00]
            "
          >
            Mua ngay
          </Link>

        </div>

      </div>

    </div>
  );
}