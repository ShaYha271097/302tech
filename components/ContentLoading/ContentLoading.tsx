export default function ContentLoading() {
  return (
    <div className="p-5">

      {/* TOP */}
      <div className="flex items-center justify-between mb-6">

        <div className="h-10 w-52 rounded-xl bg-orange-100 animate-pulse" />

        <div className="h-10 w-32 rounded-xl bg-orange-100 animate-pulse" />

      </div>

      {/* FILTER */}
      <div
        className="
          h-14
          rounded-2xl
          bg-white
          border border-[#E5E7EB]
          animate-pulse
          mb-6
        "
      />

      {/* TABLE */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border border-[#E5E7EB]
          bg-white
        "
      >

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="
              grid grid-cols-6
              gap-4
              px-5 py-5
              border-b border-[#F3F4F6]
            "
          >
            {[...Array(6)].map((_, j) => (
              <div
                key={j}
                className="
                  h-4
                  rounded-lg
                  bg-orange-100
                  animate-pulse
                "
              />
            ))}
          </div>
        ))}

      </div>

    </div>
  );
}