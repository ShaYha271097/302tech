export default function BannerSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 animate-pulse">
      {/* LEFT */}
      <div className="lg:col-span-2 h-[250px] sm:h-[320px] lg:h-[400px] rounded-[10px] overflow-hidden bg-gray-100 p-3">
        <div className="w-full h-full rounded-[10px] bg-gray-200" />
      </div>

      {/* RIGHT */}
      <div className="flex lg:flex-col gap-3 h-[150px] sm:h-[200px] lg:h-[400px]">
        <div className="flex-1 rounded-[10px] overflow-hidden bg-gray-100 p-3">
          <div className="w-full h-full rounded-[10px] bg-gray-200" />
        </div>

        <div className="flex-1 rounded-[10px] overflow-hidden bg-gray-100 p-3">
          <div className="w-full h-full rounded-[10px] bg-gray-200" />
        </div>
      </div>
    </div>
  );
}