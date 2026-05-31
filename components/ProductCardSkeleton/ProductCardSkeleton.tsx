export default function ProductCardSkeleton() {
  return (
    <div className="all_sp_banchay_index !w-full animate-pulse">
      {/* IMAGE */}
      <div className="all_img_sp_bc">
        <div className="img_sp_bc bg-gray-200 aspect-[4/3]" />
        <div className="img_sp_2 bg-gray-200 aspect-[4/3] mt-1" />
      </div>

      {/* CONTENT */}
      <div className="all_content_sp p-2 space-y-2">
        {/* name */}
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />

        {/* price */}
        <div className="h-5 bg-gray-200 rounded w-1/3 mt-2" />

        {/* button */}
        <div className="h-8 bg-gray-200 rounded w-24 mt-3" />
      </div>
    </div>
  );
}