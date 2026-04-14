

import Link from "next/link";


export default function BannerSlider() {

    const brands = [
        {
            name: "HP",
            slug: "hp",
            img: "https://laptopgaming.com.vn/upload/product/download-4.png",
        },
        {
            name: "Asus",
            slug: "asus",
            img: "https://laptopgaming.com.vn/upload/product/download-4.png",
        },
        {
            name: "Acer",
            slug: "acer",
            img: "https://laptopgaming.com.vn/upload/product/download-4.png",
        },
        {
            name: "Lenovo",
            slug: "lenovo",
            img: "https://laptopgaming.com.vn/upload/2024/download-4.png",
        },
        {
            name: "Dell",
            slug: "dell",
            img: "https://laptopgaming.com.vn/upload/product/download-4.png",
        },
        {
            name: "MSI",
            slug: "msi",
            img: "https://laptopgaming.com.vn/upload/product/download-4.png",
        },
        {
            name: "Macbook",
            slug: "macbook",
            img: "https://laptopgaming.com.vn/upload/product/download-4.png",
        },
        {
            name: "GIGABYTE",
            slug: "gigabyte",
            img: "https://laptopgaming.com.vn/upload/product/download-4.png",
        },
    ];

    return (
        <>
            <div className="header-cachtop">
                <div className="hidden lg:block top_header">
                    <div className="all_hotline_mxh">
                        <img
                            loading="lazy"
                            width={1920}
                            height={127}
                            src="https://laptopgaming.com.vn/upload/17r5/y/grey-black-new-arrival-mobile-banner-ad.png"
                            className={'1'}
                            alt="Laptop Tèo Em - Cần Thơ "
                            decoding="async"
                        />{" "}
                    </div>
                </div>
                <div className="hidden lg:block header">
                    <div className="all_menu_top">
                        <div className="fixwidth menu_top d-flex justify-content-between flex-wrap align-items-center">

                            <a className="header_logo" href="">
                                <img
                                    loading="lazy"
                                    width={2239}
                                    height={1952}
                                    src="https://laptopgaming.com.vn/upload/product/logo_teo_em.png"
                                    alt="Laptop Tèo Em - Cần Thơ "
                                    decoding="async"
                                />
                            </a>
                            <div className="frm_timkiem timkiem_header timkiem_header_des">
                                <input
                                    type="text"
                                    className="input"
                                    id="keyword2"
                                    placeholder="Nhập từ khóa cần tìm..."
                                />
                                <button
                                    type="submit"
                                    // value=""
                                    className="nut_tim"
                                >
                                    <i className="fas fa-search" />
                                </button>
                            </div>
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
                                                        alt="Laptop Tèo Em - Cần Thơ "
                                                        decoding="async"
                                                        srcSet="https://dienmaygiakho.com.vn/wp-content/uploads/2022/05/24x7-service1-100.png 100w, https://dienmaygiakho.com.vn/wp-content/uploads/2022/05/24x7-service1-100-24x24.png 24w, https://dienmaygiakho.com.vn/wp-content/uploads/2022/05/24x7-service1-100-36x36.png 36w, https://dienmaygiakho.com.vn/wp-content/uploads/2022/05/24x7-service1-100-48x48.png 48w"
                                                        sizes="(max-width: 100px) 100vw, 100px"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="icon-box-text last-reset">
                                            <p>Hotline Bảo hành 24/7</p>
                                            <a href="tel:05696565650383225889" target="_blank" title="">
                                                056 965 6565 - 0383 225 889{" "}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart">
                                    <a href="gio-hang">
                                        <i className="fas fa-shopping-bag" />
                                        <span className="cart-icon image-icon">
                                            <strong className="total_cart">0 </strong>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:hidden">

                    {/* ROW 1 */}
                    <div className="flex items-center justify-between px-3 py-2 border-b">

                        {/* MENU ICON */}
                        <button className="text-2xl font-semibold tracking-wide">
                            ☰
                        </button>

                        {/* LOGO */}
                        <img
                             width={90}
                                    height={90}
                            src="https://laptopgaming.com.vn/upload/product/logo_teo_em.png"
                            // className="h-8 object-contain"
                        />

                        {/* RIGHT */}
                        <div className="flex items-center gap-3">

                            {/* HOTLINE */}
                            <a href="tel:0569656565" className="text-xs">
                                📞
                            </a>

                            {/* CART */}
                            <div className="relative">
                                🛒
                                <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white rounded-full px-1">
                                    0
                                </span>
                            </div>


        

                        </div>
                    </div>

                    {/* ROW 2 - SEARCH */}
                    <div className="px-3 py-2 border-b">
                            <div className="frm_timkiem timkiem_header_mobile  timkiem_header_des">
                                <input
                                    type="text"
                                    className="input"
                                    id="keyword2"
                                    placeholder="Nhập từ khóa cần tìm..."
                                />
                                <button
                                    type="submit"
                                    // value=""
                                    className="nut_tim"
                                >
                                    <i className="fas fa-search" />
                                </button>
                            </div>


                    </div>

                </div>
            </div>
            <div className="hidden lg:block  header-height">
                <div id="menu_top">
                    <div className="clearfix fixwidth">
                        <div className="menu">
                            <ul className="menu_cap_cha d-flex justify-content-between">
                                {brands.map((brand) => (
                                    <li key={brand.slug} className="menulicha">
                                        <Link
                                            href={{
                                                pathname: "/product",
                                                query: { brand: brand.slug },
                                            }}
                                            title={brand.name}
                                        >
                                            <img
                                                loading="lazy"
                                                width={32}
                                                height={32}
                                                src={brand.img}
                                                alt={brand.name}
                                            />
                                            {' '}
                                            {brand.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}