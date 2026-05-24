"use client";

export default function ProductInfo({ product, selected, setSelected }: any) {
  const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN") + "đ";

  return (
   <div className="space-y-4">

  {/* TITLE */}

    <h4
      className="
        text-xl
        font-semibold
        leading-snug
        text-[#111827]
      "
    >
      {product.name}  {selected.cpu} / {selected.ram} / {selected.ssd}
    </h4>

  {/* STATUS */}
  <div className="flex flex-wrap items-center gap-2 text-sm leading-7">

    <div
      className="
        flex items-center gap-2
        rounded-full
        border border-green-200
        bg-green-50
        px-3 py-1
      "
    >
      <div className="w-2 h-2 rounded-full bg-green-500" />

      <span className="font-medium text-green-700">
        Like New
      </span>
    </div>

    <div
      className="
        flex items-center gap-2
        rounded-full
        border border-orange-200
        bg-orange-50
        px-3 py-1
      "
    >
      <div className="w-2 h-2 rounded-full bg-[#ff7a00]" />

      <span className="font-medium text-[#ff7a00]">
        Còn hàng
      </span>
    </div>

  </div>

  {/* PRICE */}
  <div
    className="
      rounded-2xl
      border border-orange-100
      bg-white
      p-4
    "
  >

    <p className="text-sm leading-7 text-[#6B7280] mb-1">
      Giá bán
    </p>

    <div className="flex items-end gap-2 flex-wrap">

      <span
        className="
          text-3xl
          font-extrabold
          text-[#ff7a00]
          leading-none
        "
      >
        {formatPrice(selected.price)}
      </span>

      <span className="text-xs text-[#6B7280]">
        Đã bao gồm VAT
      </span>

    </div>

  </div>

  {/* CONFIG */}
  <div
    className="
      rounded-2xl
      border border-orange-100
      bg-white
      p-4
    "
  >

    <div className="flex flex-wrap gap-2">

      {product.variants.map((v: any) => {
        const isActive = v === selected;

        return (
          <button
            key={v.id}
            onClick={() => setSelected(v)}
            className={`
              relative
              rounded-xl
              border
              px-3 py-2
              text-left
              transition-all duration-200

              ${
                isActive
                  ? `
                    border-[#ff7a00]
                    bg-orange-50
                  `
                  : `
                    border-[#E5E7EB]
                    bg-white
                    hover:border-orange-300
                  `
              }
            `}
          >

            {isActive && (
              <div
                className="
                  absolute top-2 right-2
                  w-2 h-2
                  rounded-full
                  bg-[#ff7a00]
                "
              />
            )}

            <p
              className={`
                text-sm leading-7 font-semibold
                ${
                  isActive
                    ? "text-[#ff7a00]"
                    : "text-[#111827]"
                }
              `}
            >
              {v.cpu}
            </p>

            <p
              className="
                mt-0.5
                text-xs
                text-[#6B7280]
              "
            >
              {v.ram} / {v.ssd}
            </p>

          </button>
        );
      })}

    </div>

  </div>

  {/* PROMOTION */}
 <div
  className="
    relative
    rounded-2xl
    border border-orange-200
    bg-gradient-to-br from-white to-orange-50
    p-4 pt-6
  "
>

  {/* LABEL */}
  <div
    className="
      absolute
      -top-3 left-4

      inline-flex
      items-center gap-2

      rounded-full
      bg-gradient-to-r
      from-[#ff7a00]
      to-orange-500

      px-3 py-1.5

      text-white
      text-sm leading-7
      font-semibold

      shadow-md shadow-orange-200
    "
  >

    <span>🎁</span>

    <span>Khuyến mãi</span>

  </div>

    {/* CONTENT */}
    <div className="mt-4 space-y-3">

      {[
        <>
          Bảo hành 3-6 tháng,{" "}
          <span className="font-semibold text-[#111827]">
            1 đổi 1 trong 7 ngày đầu
          </span>
        </>,

        <>
          <span className="font-semibold text-[#ff7a00]">
            Giảm thêm 300.000đ
          </span>{" "}
          cho sinh viên
        </>,

        <>
          <span className="font-semibold text-[#ff7a00]">
            Giảm thêm 200.000đ
          </span>{" "}
          cho khách đã mua hàng
        </>,

        <>
          Giao hàng COD,{" "}
          <span className="font-semibold text-[#111827]">
            miễn phí toàn quốc
          </span>
        </>,
      ].map((item, index) => (
        <div
          key={index}
          className="
            flex gap-3
          "
        >

          <div
            className="
              w-6 h-6
              rounded-full
              bg-orange-100
              flex items-center justify-center
              text-[#ff7a00]
              text-xs
              shrink-0
            "
          >
            ✓
          </div>

          <p
            className="
              text-sm leading-7
              leading-6
              text-[#374151]
            "
          >
            {item}
          </p>

        </div>
      ))}

    </div>

  </div>

</div>
  );
}
