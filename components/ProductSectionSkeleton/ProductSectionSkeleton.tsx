export default function ProductSectionSkeleton() {
  return (
    <div className="wrap_bottom wrap_list animate-pulse">
      <div className="fixwidth">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-8 w-40 rounded bg-gray-200" />
          <div className="h-5 w-24 rounded bg-gray-200" />
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-2xl
                border
                border-gray-100
                overflow-hidden
              "
            >
              <div className="aspect-square bg-gray-200" />

              <div className="p-3">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
                <div className="h-5 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}