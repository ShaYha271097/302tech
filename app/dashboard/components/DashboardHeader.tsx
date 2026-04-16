


export default function DashboardHeader() {
    return (
        <div className="bg-white border-b px-4 py-2 flex items-center justify-between">

            {/* LEFT - LOGO */}
            <div className="flex items-center gap-3">

                {/* mobile menu */}
                <button className="lg:hidden text-xl">
                    ☰
                </button>

                {/* logo */}
                <img

                    alt="Phần mềm quản lý bán hàng"
                    className="h-8 max-w-[120px] object-contain"
                    title="Phần mềm quản lý bán hàng"
                    src="https://logo.kiotviet.vn/KiotViet-Logo-Horizontal.svg"
                />
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
                <ul className="kv-navbar-list">
                    <li
                        className="kv-navbar-item kv-navbar-user ng-scope dropdown"
                    >
                        <a
                            className="kv-btn kv-btn-icon-only kv-btn-light-primary dropdown-toggle"
                            title="qua"
                        >
                            <i className="fas fa-user icon-btn" />
                        </a>
                        <div
                            className="dropdown-content show-left dropdown-menu"
                            id="account-main"
                        />
                    </li>
                </ul>
            </div>
        </div>
    )


}

