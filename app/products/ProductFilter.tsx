export default function ProductFilter({
    showTitle = true,
    selectedPrices,
    togglePrice,
    brand,
    searchParams,
    router,
    ramSelected,
    toggleRam,
    ssdSelected,
    toggleSSD
}: any) {
    return (
        <div className="w-64 bg-white  border shadow-sm p-4 space-y-5">

            {/* TITLE */}
            {showTitle && (
                <h2 className="font-semibold text-base border-b pb-2">
                    Bộ lọc
                </h2>
            )}

            {/* PRICE */}
            <div>
                <p className="text-sm font-medium mb-2">Giá</p>
                <div className="space-y-3 text-sm">
                    {[
                        { label: "Dưới 10 triệu", value: "0-10000000" },
                        { label: "10 - 20 triệu", value: "10000000-20000000" },
                        { label: "Trên 20 triệu", value: "20000000-999999999" },
                    ].map((item) => (
                        <label
                            key={item.value}
                            className="!flex items-center gap-3 cursor-pointer hover:text-red-500 transition"
                        >
                            <input
                                type="checkbox"
                                className="accent-red-500 w-4 h-4"
                                checked={selectedPrices.includes(item.value)} // ✅ đọc từ URL
                                onChange={() => togglePrice(item.value)} // 👈 đổi function
                            />
                            <span>{item.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <hr />

            {/* BRAND */}
            <div>
                <p className="text-sm font-medium mb-2">Hãng</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    {["Dell", "Lenovo", "HP", "Asus", "Acer", "MSI", "Macbook"].map((b) => {
                        const slug = b.toLowerCase();

                        return (
                            <label
                                key={b}
                                className="!flex items-center gap-2 cursor-pointer hover:text-red-500 transition"
                            >
                                <input
                                    type="checkbox"
                                    className="accent-red-500"
                                    checked={brand === slug}
                                    onChange={() => {
                                        const params = new URLSearchParams(searchParams.toString());

                                        if (slug === brand) {
                                            params.delete("brand"); // bỏ chọn
                                        } else {
                                            params.set("brand", slug); // đổi brand
                                        }

                                        router.push(`/products?${params.toString()}`);
                                    }}
                                    readOnly                   // 👈 tránh warning React
                                />
                                <span className="leading-5">{b}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            <hr />

            {/* RAM */}
            <div>
                <p className="text-sm font-medium mb-2">RAM</p>
                <div className="flex flex-wrap gap-2">
                    {["8GB", "16GB", "32GB"].map((ram) => {
                        const active = ramSelected.includes(ram);

                        return (
                            <button
                                key={ram}
                                onClick={() => toggleRam(ram)}
                                className={`px-3 py-1 border rounded-full text-xs transition
                                                        ${active
                                        ? "bg-red-500 text-white border-red-500"
                                        : "hover:border-red-500 hover:text-red-500"
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
                <p className="text-sm font-medium mb-2">SSD</p>
                <div className="flex flex-wrap gap-2">
                    {["256GB", "512GB", "1TB"].map((ssd) => {
                        const active = ssdSelected.includes(ssd);

                        return (
                            <button
                                key={ssd}
                                onClick={() => toggleSSD(ssd)}
                                className={`px-3 py-1 border rounded-full text-xs transition
          ${active
                                        ? "bg-red-500 text-white border-red-500"
                                        : "hover:border-red-500 hover:text-red-500"
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