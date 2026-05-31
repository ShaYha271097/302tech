export default function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 animate-pulse">

      {/* IMAGE */}
      <div className="md:col-span-1 lg:col-span-4">
        <div className="bg-white p-2">
          <div className="aspect-square bg-gray-200 rounded" />
          <div className="grid grid-cols-4 gap-2 mt-2">
            <div className="aspect-square bg-gray-200 rounded" />
            <div className="aspect-square bg-gray-200 rounded" />
            <div className="aspect-square bg-gray-200 rounded" />
            <div className="aspect-square bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className="md:col-span-1 lg:col-span-4">
        <div className="bg-white p-4 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-10 bg-gray-200 rounded w-1/3" />

          <div className="h-8 bg-gray-200 rounded w-full mt-4" />
          <div className="h-8 bg-gray-200 rounded w-full" />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="md:col-span-2 lg:col-span-4">
        <div className="bg-white p-4 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
          <div className="h-4 bg-gray-200 rounded w-3/6" />
        </div>
      </div>

    </div>
  );
}