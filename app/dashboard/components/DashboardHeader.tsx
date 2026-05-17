
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
                     src="/assets/images/logoB.png"
                />
            </div>

            {/* RIGHT */}
         <div className="relative" ref={menuRef}>
    {/* BUTTON */}
    <button
        onClick={() => setOpenMenu((prev) => !prev)}
        className="
            flex items-center gap-3
            px-3 py-2
            bg-white
            hover:border-[#ff7a00]
            hover:shadow-md
            transition-all duration-300
            rounded-xl
        "
    >
        {/* Avatar */}
        <div
            className="
                w-10 h-10
                rounded-full
                bg-[#FFF3E8]
                flex items-center justify-center
            "
        >
            <i className="fas fa-user text-[#ff7a00]" />
        </div>

        {/* Text */}
        <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-[15px] font-semibold text-[#111111]">
                Admin
            </span>

            <span className="text-[12px] text-[#6B7280]">
                Quản trị viên
            </span>
        </div>

        {/* Arrow */}
        <i
            className={`
                fas fa-chevron-down text-[12px]
                text-[#6B7280]
                transition-transform duration-300
                ${openMenu ? "rotate-180" : ""}
            `}
        />
    </button>

    {/* DROPDOWN */}
    {openMenu && (
        <div
            className="
                absolute right-0 mt-3
                w-52
                bg-white
                border border-[#E5E7EB]
                rounded-2xl
                shadow-xl
                overflow-hidden
                z-50
            "
        >
            <button
                onClick={async () => {
                    await fetch("/api/admin/logout", {
                        method: "POST",
                    });

                    setOpenMenu(false);

                    window.location.href = "/admin/login";
                }}
                className="
                    w-full
                    flex items-center gap-3
                    px-4 py-3
                    text-sm
                    text-[#111111]
                    hover:bg-[#FFF3E8]
                    hover:text-[#ff7a00]
                    transition-all duration-200
                "
            >
                <i className="fas fa-sign-out-alt" />
                Đăng xuất
            </button>
        </div>
    )}
</div>
        </div>
    )


}

