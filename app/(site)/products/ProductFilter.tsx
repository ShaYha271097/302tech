import { SlidersHorizontal } from "lucide-react";


export default function ProductFilter({
  showTitle = true,
  selectedPrices,
  togglePrice,
  brands = [],
  searchParams,
  router,
  ramSelected,
  toggleRam,
  ssdSelected,
  toggleSSD,
}: any) {
  const brand = searchParams.get("brand") || "";

const brandList = Array.isArray(brands)
  ? brands.filter((b: any) => b.isActive === false)
  : [];


  return (
    <div className="w-64 bg-white border shadow-sm p-4 space-y-5">
      {/* TITLE */}
      {showTitle && (
      <h2 className="font-semibold text-base border-b pb-2 flex items-center gap-2">
  <SlidersHorizontal size={18} />
  Bộ lọc
</h2>
      )}

      {/* BRAND */}
      <div>
        <p className="text-sm leading-7 font-medium mb-2">Hãng</p>

        <div className="grid grid-cols-2 gap-2 px-2 text-sm leading-7">
          {brandList.map((b: any) => {
            const slug = b.slug;
        
            return (
              <label
                key={b._id}
                className="!flex items-center gap-2 cursor-pointer hover:text-[#ff7a00] transition"
              >
                <input
                  type="checkbox"
                  className="accent-[#ff7a00]"
                  checked={brand === slug}
                  onChange={() => {
                    const params = new URLSearchParams(
                      searchParams.toString()
                    );

                    if (slug === brand) {
                      params.delete("brand");
                    } else {
                      params.set("brand", slug);
                    }

                    params.delete("page");

                    router.push(`/products?${params.toString()}`);
                  }}
                />

                <span className="leading-5 text-[13px]">
                  {b.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <hr />

      {/* RAM */}
      <div>
        <p className="text-sm leading-7 font-medium mb-2">RAM</p>

        <div className="flex flex-wrap gap-2">
          {["8GB","12GB","24GB", "16GB", "32GB","64GB"].map((ram) => {
            const active = ramSelected.includes(ram);

            return (
              <button
                key={ram}
                onClick={() => toggleRam(ram)}
                className={`px-3 py-1 border rounded-full text-xs transition ${
                  active
                    ? "bg-[#ff7a00] text-white border-[#ff7a00]"
                    : "hover:border-[#ff7a00] hover:text-[#ff7a00]"
                }`}
              >
                {ram}
              </button>
            );
          })}
        </div>
      </div>

      <hr />

      {/* SSD */}
      <div>
        <p className="text-sm leading-7 font-medium mb-2">SSD</p>

        <div className="flex flex-wrap gap-2">
          {["128GB","256GB", "512GB", "1TB","2TB",].map((ssd) => {
            const active = ssdSelected.includes(ssd);

            return (
              <button
                key={ssd}
                onClick={() => toggleSSD(ssd)}
                className={`px-3 py-1 border rounded-full text-xs transition ${
                  active
                    ? "bg-[#ff7a00] text-white border-[#ff7a00]"
                    : "hover:border-[#ff7a00] hover:text-[#ff7a00]"
                }`}
              >
                {ssd}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
