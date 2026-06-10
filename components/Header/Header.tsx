
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import MenuSkeleton from "../MenuSkeleton/MenuSkeleton";
import { useAppSelector } from "@/hooks/useAppSelector";


type Props = {
    brands: any[];
    //   loadingBrands: boolean;
};

export default function Header({
    brands,
    //   loadingBrands,
}: Props) {
    const [openMenu, setOpenMenu] = useState(false);


    const activeBrands = (brands || []).filter(
        (b) => !b.isActive
    );

    const visibleBrands =
        activeBrands.length > 7
            ? activeBrands.slice(0, 7)
            : activeBrands;

    const hiddenBrands =
        activeBrands.length > 7
            ? activeBrands.slice(7)
            : [];
    const totalItems = useAppSelector(
    (state) =>
        state.cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
        )
    );


    return (
        <>
            <div className="header-cachtop">
                <div className="hidden lg:block top_header">
                    <div className="all_hotline_mxh">
                        <img
                            loading="lazy"
                            width={1920}
                            height={127}
                            src="/assets/images/header-top.png"
                            className={'1'}
                            alt="302 Tech"
                            decoding="async"
                        />{" "}
                    </div>
                </div>
                <div className="hidden lg:block header">
                    <div className="all_menu_top">
                        <div className="fixwidth menu_top d-flex justify-content-between flex-wrap align-items-center">

                            <Link href="/" className="header_logo cursor-pointer">
                                <img

                                    loading="lazy"

                                    src="/assets/images/logoB.png"
                                    alt="302 Tech"
                                    decoding="async"
                                />
                            </Link>

                            <SearchBox />
                            <div className="all_search_cart">
                                <div className="header-block-block-1">
                                    <div className="icon-box featured-box icon-box-left text-left">
                                        <div className="icon-box-img" style={{ width: 40 }}>
                                            <div className="icon">
                                                <div className="icon-inner">
                                                    <img
                                                        width={100}
                                                        height={100}
                                                        src="./assets/images/hotline_icon.png"
                                                        className="attachment-medium size-medium ring_flas"
                                                        alt="302 Tech"
                                                        decoding="async"
                                                        srcSet="https://dienmaygiakho.com.vn/wp-content/uploads/2022/05/24x7-service1-100.png 100w, https://dienmaygiakho.com.vn/wp-content/uploads/2022/05/24x7-service1-100-24x24.png 24w, https://dienmaygiakho.com.vn/wp-content/uploads/2022/05/24x7-service1-100-36x36.png 36w, https://dienmaygiakho.com.vn/wp-content/uploads/2022/05/24x7-service1-100-48x48.png 48w"
                                                        sizes="(max-width: 100px) 100vw, 100px"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="icon-box-text last-reset">
                                            <p>Hotline Bảo hành 24/7</p>
                                            <Link href="tel:0946932067" target="_blank" title="">
                                                0946932067{" "}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart">
                                    <Link
                                        href="/cart"
                                        className="
                                                relative
                                                flex
                                                items-center
                                                justify-center

                                                w-11 h-11

                                                rounded-xl
                                                border border-orange-100
                                                bg-white

                                                shadow-sm

                                                transition-all
                                                duration-300

                                                hover:border-orange-300
                                                hover:bg-orange-50
                                                "
                                    >
                                        <i
                                            className="
                                                fas fa-shopping-bag
                                                text-lg
                                                text-[#ff7a00]
                                            "
                                        />

                                        <span
                                            className="
                                                absolute
                                                -top-2
                                                -right-2

                                                flex
                                                items-center
                                                justify-center

                                                min-w-[20px]
                                                h-5
                                                px-1

                                                rounded-full

                                                bg-[#ff7a00]

                                                text-[11px]
                                                font-bold
                                                text-white
                                            "
                                        >
                                          {totalItems}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:hidden header_mobile">

                    {/* ROW 1 */}
                    <div className="flex items-center justify-between px-3 py-2 border-b">

                        {/* MENU ICON */}
                        <button
                            onClick={() => setOpenMenu(true)}
                            className="text-2xl font-semibold tracking-wide   cursor-pointer"
                        >
                            ☰
                        </button>

                        {/* LOGO */}
                        <Link href="/" className="header_logo cursor-pointer">
                            <img

                                loading="lazy"

                                src="/assets/images/logoB.png"
                                alt="302 Tech"
                                decoding="async"
                            />
                        </Link>
                        {/* RIGHT */}
                        <div className="flex items-center gap-3">

                            {/* HOTLINE */}
                            {/* <Link
                                href="tel:0946932067"
                                title="Gọi ngay 0946 932 067"
                                className="block"
                            >
                                <div
                                    className="icon-box-img"
                                    style={{ width: 28 }}
                                >
                                    <div className="icon">
                                        <div className="icon-inner">
                                            <img
                                                width={100}
                                                height={100}
                                                src="./assets/images/hotline_icon.png"
                                                className="attachment-medium size-medium ring_flas"
                                                alt="302 Tech"
                                                decoding="async"
                                                srcSet="https://dienmaygiakho.com.vn/wp-content/uploads/2022/05/24x7-service1-100.png 100w, https://dienmaygiakho.com.vn/wp-content/uploads/2022/05/24x7-service1-100-24x24.png 24w, https://dienmaygiakho.com.vn/wp-content/uploads/2022/05/24x7-service1-100-36x36.png 36w, https://dienmaygiakho.com.vn/wp-content/uploads/2022/05/24x7-service1-100-48x48.png 48w"
                                                sizes="(max-width: 100px) 100vw, 100px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link> */}

                            {/* CART */}
                                <div className="cart">
                                    <Link
                                        href="/cart"
                                        className="
                                                relative
                                                flex
                                                items-center
                                                justify-center

                                                w-11 h-11

                                                rounded-xl
                                                border border-orange-100
                                                bg-white

                                                shadow-sm

                                                transition-all
                                                duration-300

                                                hover:border-orange-300
                                                hover:bg-orange-50
                                                "
                                    >
                                        <i
                                            className="
                                                fas fa-shopping-bag
                                                text-lg
                                                text-[#ff7a00]
                                            "
                                        />

                                        <span
                                            className="
                                                absolute
                                                -top-2
                                                -right-2

                                                flex
                                                items-center
                                                justify-center

                                                min-w-[20px]
                                                h-5
                                                px-1

                                                rounded-full

                                                bg-[#ff7a00]

                                                text-[11px]
                                                font-bold
                                                text-white
                                            "
                                        >
                                          {totalItems}
                                        </span>
                                    </Link>
                                </div>




                        </div>
                    </div>

                    {/* ROW 2 - SEARCH */}
                    <div className="px-3 py-2 border-b">
                        <SearchBox />
                    </div>


                </div>
            </div>
            {/* {loadingBrands ? <MenuSkeleton /> : */}
            <div className="hidden lg:block  header-height">
                <div id="menu_top">
                    <div className="clearfix fixwidth">
                        <div className="menu">
                            <ul className="menu_cap_cha d-flex justify-content-between p-0">
                                {visibleBrands.map((brand) => {
                                    const isLaptopMenu = brand.slug === "laptop";

                                    return (
                                        <li key={brand.slug} className="menulicha">
                                            <Link
                                                href={{
                                                    pathname: "/products",
                                                    query: isLaptopMenu
                                                        ? { category: "laptop" }
                                                        : { category: "laptop", brand: brand.slug },
                                                }}
                                            >
                                                <img
                                                    loading="lazy"
                                                    src={brand.image}
                                                    alt={brand.name}
                                                    className="!w-8 !h-8 "
                                                />{" "}
                                                {brand.name}
                                            </Link>
                                        </li>
                                    );
                                })}

                                {hiddenBrands.length > 0 && (
                                    <li className="menulicha relative group">
                                        <span
                                            className="
                                                    flex items-center gap-1
                                                    h-[50px] px-5
                                                    text-[14px] font-semibold uppercase
                                                    cursor-pointer
                                                "
                                        >
                                            Khác
                                            <i className="fas fa-chevron-down text-[10px] transition-transform duration-200 group-hover:rotate-180" />
                                        </span>

                                        <ul
                                            className="
                                                    absolute
                                                    top-full
                                                    left-0
                                                    min-w-[180px]
                                                    bg-white
                                                    shadow-lg
                                                    z-50

                                                    opacity-0
                                                    invisible
                                                    translate-y-2

                                                    transition-all
                                                    duration-200

                                                    group-hover:opacity-100
                                                    group-hover:visible
                                                    group-hover:translate-y-0
                                                    "
                                        >
                                            {hiddenBrands.map((brand) => (
                                                <li key={brand.slug}>
                                                    <Link
                                                        href={{
                                                            pathname: "/products",
                                                            query: {
                                                                category: "laptop",
                                                                brand: brand.slug,
                                                            },
                                                        }}
                                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        <img
                                                            loading="lazy"
                                                            width={24}
                                                            height={24}
                                                            src={brand.image}
                                                            alt={brand.name}
                                                            className="w-6 h-6 object-contain"
                                                        />

                                                        <span>{brand.name}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* OVERLAY */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${openMenu ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setOpenMenu(false)}
            />

            {/* SIDEBAR */}
            <div
                className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 shadow-lg transform transition-transform duration-300 ${openMenu ? "translate-x-0" : "-translate-x-full"
                    }`}
            >

                {/* HEADER */}
                <div className="flex items-center justify-between p-3 border-b">
                    <span className="font-semibold">Danh mục</span>

                    <button
                        onClick={() => setOpenMenu(false)}
                        className="text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* MENU LIST */}
                <div className="p-3 space-y-3">



                    {brands.map((brand) => {
                        const isLaptopMenu = brand.slug === "laptop";
                        return (
                            <Link
                                key={brand.slug}
                                href={{
                                    pathname: "/products",
                                    query: isLaptopMenu
                                        ? { category: "laptop" }
                                        : { category: "laptop", brand: brand.slug },
                                }}
                                onClick={() => setOpenMenu(false)}
                                className="flex items-center gap-3 py-2 border-b"
                            >
                                <img
                                    src={brand.image}
                                    className="w-6 h-6 object-contain"
                                />
                                <span>{brand.name}</span>
                            </Link>
                        )
                    })}
                </div>

            </div>

        </>
    )

}