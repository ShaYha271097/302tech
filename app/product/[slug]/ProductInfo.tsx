"use client";

export default function ProductInfo({ product, selected, setSelected }: any) {
  const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN") + "đ";

  return (
    <div className="space-y-4">
      {/* 🔥 TÊN (dynamic luôn nếu muốn) */}
      {/* <h1 className="text-xl font-semibold">
        {product.name} - {selected.cpu} / {selected.ram} / {selected.ssd}
      </h1> */}

      {/* 🔥 Giá */}
      <div className="text-2xl font-bold text-red-600">
        {formatPrice(selected.price)}
      </div>

      {/* 🔥 Options */}
      <div className="flex flex-wrap gap-2">
        {product.variants.map((v: any) => {
          const isActive = v === selected;

          return (
            <button
              key={v.id}
              onClick={() => setSelected(v)}
              className={`border px-3 py-2 rounded text-sm transition
                ${
                  isActive
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

      {/* 🔥 Specs */}
      <div className="border rounded-lg p-4 space-y-2 text-sm">
        <Spec label="CPU" value={selected.cpu} />
        <Spec label="RAM" value={selected.ram} />
        <Spec label="Ổ cứng" value={`SSD ${selected.ssd}`} />
        <Spec label="Card đồ hoạ" value="NVIDIA RTX 4060" />
        <Spec label="Màn hình" value="15.6″ FullHD IPS 144Hz" />
        <Spec label="Tình trạng" value="New 100%" />
      </div>
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