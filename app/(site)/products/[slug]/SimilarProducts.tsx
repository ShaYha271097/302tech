import Link from "next/link";
import {
  getCheapestVariant,
  getVariantText,
} from "@/lib/format";

type Props = {
  products: any[];
};

export default function SimilarProducts({
  products,
}: Props) {
  return (
    <>
      <div className="title_sp_cungloai text-2xl font-semibold text-center mt-8 mb-7">
        🔥 Sản phẩm tương tự
      </div>

      <div className="content-main w-clear">
        {products.length === 0 ? (
          <div className="w-full">
            <div className="w-full bg-gray-100 border border-gray-300 text-[#6B7280] px-4 py-3 text-center">
              <strong>Không tìm thấy kết quả</strong>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.slice(0, 4).map((item: any) => {
              const cheapest = getCheapestVariant(
                item.variants
              );

              return (
                <div
                  key={item._id}
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
                  <Link
                    href={`/products/${item.slug}-${item._id}`}
                  >
                    <div className="aspect-square overflow-hidden bg-[#FFF7ED] rounded-sm">
                      <img
                        src={item.mainImage.url}
                        alt={item.name}
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

                  <div className="py-3">
                    <Link
                      href={`/products/${item.slug}-${item._id}`}
                    >
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
                        {item.name} - {getVariantText(cheapest)}
                      </div>
                    </Link>

                    <div className="mt-3 text-[18px] font-black text-[#ff3b30]">
                      {cheapest?.price?.toLocaleString("vi-VN")}đ
                    </div>

                    <div className="mt-4">
                      <Link
                        href={`/products/${item.slug}-${item._id}`}
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
            })}
          </div>
        )}

        <div className="mb-6" />
      </div>
    </>
  );
}