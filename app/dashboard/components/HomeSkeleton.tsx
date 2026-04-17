export function HomeSkeleton() {
  return (
    <section className="p-4 space-y-4">

      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

        {Array(3).fill(0).map((_, i) => (
          <div
            key={i}
            className="bg-white border rounded-lg p-4 space-y-3"
          >
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}

      </div>

    </section>
  );
}