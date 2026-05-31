export default function TopSellingSkeleton() {
  return (
    <div className="wrap_bottom wrap_flashsale">
      <div className="fixwidth">
        <div className="box-deal">
          {/* TITLE */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* PRODUCTS */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="
                  bg-white
                  border
                  border-gray-100
                  rounded-2xl
                  overflow-hidden
                "
              >
                {/* IMAGE */}
                <div className="aspect-square bg-gray-200 animate-pulse" />

                {/* CONTENT */}
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />

                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />

                  <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}