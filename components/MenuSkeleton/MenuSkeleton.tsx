export default function MenuSkeleton() {
  return (
    <div className="hidden lg:block header-height animate-pulse">
      <div id="menu_top">
        <div className="clearfix fixwidth">
          <div className="menu">
            <ul className="menu_cap_cha d-flex justify-content-between p-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="flex items-center gap-2 px-3 py-2">
                  <div className="w-8 h-8 bg-gray-200 rounded" />
                  <div className="w-20 h-4 bg-gray-200 rounded" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}