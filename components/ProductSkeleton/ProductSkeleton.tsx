

export default function ProductSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array(8).fill(0).map((_, i) => (
                <div
                    key={i}
                    className="border rounded-lg p-2 sm:p-3 bg-white space-y-2"
                >
                    {/* IMAGE */}
                    <div className="w-full h-[150px] sm:h-[180px] bg-gray-200 animate-pulse rounded" />

                    {/* NAME */}
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />

                    {/* PRICE */}
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3" />

                    {/* BUTTON */}
                    <div className="h-8 bg-gray-200 animate-pulse rounded" />
                </div>
            ))}
        </div>
    )
}