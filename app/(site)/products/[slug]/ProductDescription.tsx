"use client";

export default function ProductDescription({ selected }: any) {
    return (
        <div
  className="
    h-full
    rounded-2xl
    border border-orange-100
    bg-white
    overflow-hidden
    shadow-[0_4px_20px_rgba(255,122,0,0.06)]
  "
>

  {/* HEADER */}
  <div
    className="
      flex items-center gap-2
      border-b border-orange-100
      bg-gradient-to-r
      from-orange-50
      to-white
      px-5 py-4
    "
  >

    <div
      className="
        w-8 h-8
        rounded-xl
        bg-orange-100
        flex items-center justify-center
        text-[#ff7a00]
      "
    >
      <i className="fas fa-microchip text-sm leading-7" />
    </div>

    <h3
      className="
        text-[16px]
        font-semibold
        text-[#111827]
      "
    >
      Mô tả ngắn
    </h3>

  </div>

  {/* CONTENT */}
  <div className="space-y-3 p-5">

    {[
      {
        label: "CPU",
        value: selected?.cpu,
      },
      {
        label: "RAM",
        value: selected?.ram,
      },
      {
        label: "SSD",
        value: selected?.ssd,
      },
      {
        label: "VGA",
        value: selected?.gpu,
      },
     {
      label: "Màn hình",
        value: [
          selected?.screenSize && `${selected.screenSize}"`,
          selected?.resolution,
          selected?.refreshRate && `${selected.refreshRate}Hz`,
        ]
          .filter(Boolean)
          .join(" "),
      },
    ].map((item, index) => (
      <div
        key={index}
        className="
          flex items-center justify-between gap-3
          rounded-xl
        "
      >

        {/* LEFT */}
        <div className="flex items-center gap-3">

          <div
            className="
              w-2 h-2
              rounded-full
              bg-[#ff7a00]
            "
          />

          <span
            className="
              text-sm leading-7
              font-semibold
              text-[#111827]
            "
          >
            {item.label}
          </span>

        </div>

        {/* RIGHT */}
        <span
          className="
            text-sm leading-7
            font-medium
            text-[#4B5563]
            text-right
          "
        >
          {item.value || "Đang cập nhật"}
        </span>

      </div>
    ))}

  </div>

</div>
    );
}

