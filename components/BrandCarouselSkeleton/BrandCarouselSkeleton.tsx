export default function BrandCarouselSkeleton() {
  return (
    <div className="all_list_noibat">
      <div className="wrap_bottom">
        <div className="fixwidth">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-4 animate-pulse">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="
                  bg-white
                  border border-[#E8E8E8]
                  rounded-2xl
                  p-3
                  flex flex-col items-center
                "
              >
                {/* IMAGE */}
                <div
                  className="
                    w-[72px]
                    h-[72px]
                    rounded-2xl
                    bg-gray-200
                  "
                />

                {/* NAME */}
                <div
                  className="
                    mt-3
                    h-4
                    w-14
                    rounded
                    bg-gray-200
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}