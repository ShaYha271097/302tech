"use client";

export default function ProductInfo({ product, selected, setSelected }: any) {
  const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN") + "đ";

  return (
    <div className="space-y-4">
      {/* 🔥 TÊN (dynamic luôn nếu muốn) */}
      <h4 className="text-xl font-bold text-black">
        {product.name} - {selected.cpu} / {selected.ram} / {selected.ssd}
      </h4>
      {/* STATUS */}
      <div className="flex flex-wrap items-center gap-3 text-sm">

        <div className="flex items-center gap-2">
          <span className="text-gray-600">
            Tình trạng:
          </span>

          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
            Like New
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600">
            Trong kho:
          </span>

          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
            Còn hàng
          </span>
        </div>

      </div>
      {/* 🔥 Giá */}
      <div className="text-2xl font-bold">
        <span >Giá :</span>{" "}
        <span className="text-red-600">
          {formatPrice(selected.price)}
        </span>
      </div>

      {/* 🔥 Options */}
   <div>
    
    <p className="font-medium text-sm text-gray-700 mb-1">
    Cấu hình
</p>

    <div className="flex flex-wrap gap-2">
        {product.variants.map((v: any) => {
            const isActive = v === selected;

            return (
                <button
                    key={v.id}
                    onClick={() => setSelected(v)}
                    className={`border px-3 py-2 rounded text-sm transition
                    ${isActive
                            ? "border-red-500 bg-red-50 text-red-600"
                            : "border-gray-300 hover:border-red-400"
                        }
                    `}
                >
                    {v.cpu} / {v.ram} / {v.ssd}
                </button>
            );
        })}
    </div>

</div>
      <div className="relative border border-red-200 rounded-2xl p-3 mt-4">

        {/* LABEL */}
        <div className="absolute -top-3 left-4 bg-white px-3 flex items-center gap-2 text-red-600 font-semibold text-sm">

          <span className="text-lg">🎁</span>

          <span>Khuyến mãi</span>
        </div>

        {/* CONTENT */}
        <div className="space-y-3 text-sm text-gray-700">

          <div className="flex gap-2">
            <span>✔</span>
            <span>
              Bảo hành 3-6 tháng,{" "}
              <strong className="font-semibold text-black">
                1 Đổi 1 trong 7 ngày đầu
              </strong>
            </span>
          </div>

          <div className="flex gap-2">
            <span>✔</span>
            <span>
              <strong className="font-semibold text-black">Giảm thêm 300.000đ </strong>{" "}
              cho sinh viên
            </span>
          </div>

          <div className="flex gap-2">
            <span>✔</span>
            <span>
              <strong className="font-semibold text-black">Giảm thêm 200.000đ </strong>{" "}
              cho khách đã mua hàng
            </span>
          </div>

          <div className="flex gap-2">
            <span>✔</span>
            <span>
              Giao hàng COD,{" "}
              <strong className="font-semibold text-black">
                miễn phí giao hàng toàn quốc
              </strong>
            </span>
          </div>

        </div>
      </div>
      {/* 🔥 Specs */}
      {/* <div className="border rounded-lg p-4 space-y-2 text-sm">
        <Spec label="CPU" value={selected.cpu} />
        <Spec label="RAM" value={selected.ram} />
        <Spec label="Ổ cứng" value={`SSD ${selected.ssd}`} />
        <Spec label="Card đồ hoạ" value="NVIDIA RTX 4060" />
        <Spec label="Màn hình" value="15.6″ FullHD IPS 144Hz" />
        <Spec label="Tình trạng" value="New 100%" />
      </div> */}
    </div>
  );
}

function Spec({ label, value }: any) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-green-500">✔</span>
      <span>
        <b>{label}:</b> {value}
      </span>
    </div>
  );
}