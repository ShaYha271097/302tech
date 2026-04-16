
import { useState, useRef, useEffect } from "react";



type Props = {
  onOpenSidebar: (open: boolean) => void;
};


export default function DashboardHeader({ onOpenSidebar }: Props) {
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className="bg-white border-b px-4 py-2 flex items-center justify-between">

            {/* LEFT - LOGO */}
            <div className="flex items-center gap-3">

                {/* mobile menu */}
                <button className="lg:hidden text-xl"
                     onClick={()=>onOpenSidebar(true)}
                >
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
            <div className="relative" ref={menuRef}>
                {/* BUTTON */}
                <button
                    onClick={() => setOpenMenu((prev) => !prev)}
                     className=" w-9 h-9  p-2  bg-[rgb(230,241,254)] hover:bg-[rgb(210,230,250)]"
                     style={{'borderRadius':'12px'}}
                >
                   <i className="fas fa-user text-blue-500" />
                </button>

                {/* DROPDOWN */}
                {openMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                        <button
                            onClick={() => {
                                console.log("logout");
                                setOpenMenu(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                            Đăng xuất
                        </button>
                    </div>
                )}
            </div>
        </div>
    )


}

