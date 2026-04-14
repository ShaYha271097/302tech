"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsClient({ brand }: { brand?: string }) {
  const [products, setProducts] = useState([]);
  console.log("brand",brand)
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/products?brand=${brand || ""}&limit=10`
      );
      const data = await res.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, [brand]);

  const getVariantText = (variant: any) => {
    if (!variant) return "";
    return `${variant.cpu}, RAM ${variant.ram}, SSD ${variant.ssd}`;
  };

  const getCheapestVariant = (variants: any[]) => {
    if (!variants?.length) return null;
    return variants.reduce((min, v) =>
      v.price < min.price ? v : min
    );
  };

  const formatPrice = (price: number) => {
    return price?.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="wrap-main w-clear">
                <div className="fixwidth">
                    <input type="hidden" name="type" id="type" defaultValue="san-pham" />
                    <div className="content-main w-clear">
                        <div className="breadCrumbs_sanpham mb-3 mt-3">
                            <div>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a
                                            className="text-decoration-none"
                                            href="https://laptopgaming.com.vn/"
                                        >
                                            <span>Trang chủ</span>
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item ">
                                        <a
                                            className="text-decoration-none"
                                            href="https://laptopgaming.com.vn/san-pham"
                                        >
                                            <span>Sản phẩm</span>
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item ">
                                        <a
                                            className="text-decoration-none"
                                            href="https://laptopgaming.com.vn/laptop"
                                        >
                                            <span>Laptop</span>
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <a
                                            className="text-decoration-none"
                                            href="https://laptopgaming.com.vn/dell"
                                        >
                                            <span>Dell</span>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="site-content">
                            <div className="row-product">
                                <div className="col-product-left">
                                    <div className="all_title_danhmuc_sanpham_right all_title_danhmuc_sanpham_right_desk mb-4">
                                        <div className="title_dm_sanpham_right">Bộ lọc</div>
                                        <div className="select_diemden select_dm">
                                            <div className="form-khoangia">
                                                <label>Giá sản phẩm:</label>
                                                <span className="irs irs--flat js-irs-0">
                                                    <span className="irs">
                                                        <span className="irs-line" tabIndex={0} />
                                                        <span className="irs-min" style={{ visibility: "hidden" }}>
                                                            1 đ
                                                        </span>
                                                        <span className="irs-max" style={{ visibility: "hidden" }}>
                                                            140 000 000 đ
                                                        </span>
                                                        <span
                                                            className="irs-from"
                                                            style={{ visibility: "visible", left: "-1.49254%" }}
                                                        >
                                                            1 đ
                                                        </span>
                                                        <span
                                                            className="irs-to"
                                                            style={{ visibility: "visible", left: "83.209%" }}
                                                        >
                                                            140 000 000 đ
                                                        </span>
                                                        <span
                                                            className="irs-single"
                                                            style={{ visibility: "hidden", left: "35.4478%" }}
                                                        >
                                                            1 đ — 140 000 000 đ
                                                        </span>
                                                    </span>
                                                    <span className="irs-grid" />
                                                    <span
                                                        className="irs-bar"
                                                        style={{ left: "2.98507%", width: "94.0299%" }}
                                                    />
                                                    <span
                                                        className="irs-shadow shadow-from"
                                                        style={{ display: "none" }}
                                                    />
                                                    <span
                                                        className="irs-shadow shadow-to"
                                                        style={{ display: "none" }}
                                                    />
                                                    <span className="irs-handle from" style={{ left: "0%" }}>
                                                        <i />
                                                        <i />
                                                        <i />
                                                    </span>
                                                    <span className="irs-handle to" style={{ left: "94.0299%" }}>
                                                        <i />
                                                        <i />
                                                        <i />
                                                    </span>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="primary irs-hidden-input"
                                                    id="khoanggia"
                                                    name="khoanggia"
                                                    tabIndex={-1}
                                                />
                                            </div>
                                            <div className="all_danhmuctour">
                                                <label htmlFor="Danhmuc">Danh mục sản phẩm</label>
                                                <div
                                                    className="check_danhmuc menu_danhmuc_sp"
                                                    data-idcat={103}
                                                    data-slug="ram-va-ssd"
                                                >
                                                    <div className="icon_check">
                                                        <i className="far fa-square" />
                                                    </div>
                                                    <span>Ram Và SSD</span>
                                                </div>
                                                <div
                                                    className="check_danhmuc menu_danhmuc_sp"
                                                    data-idcat={102}
                                                    data-slug="razer"
                                                >
                                                    <div className="icon_check">
                                                        <i className="far fa-square" />
                                                    </div>
                                                    <span>Razer</span>
                                                </div>
                                                <div
                                                    className="check_danhmuc menu_danhmuc_sp"
                                                    data-idcat={99}
                                                    data-slug="laptop-gaming"
                                                >
                                                    <div className="icon_check">
                                                        <i className="far fa-square" />
                                                    </div>
                                                    <span>Laptop gaming</span>
                                                </div>
                                                <div
                                                    className="check_danhmuc menu_danhmuc_sp"
                                                    data-idcat={98}
                                                    data-slug="hp"
                                                >
                                                    <div className="icon_check">
                                                        <i className="far fa-square" />
                                                    </div>
                                                    <span>HP</span>
                                                </div>
                                                <div
                                                    className="check_danhmuc menu_danhmuc_sp"
                                                    data-idcat={97}
                                                    data-slug="microsoft"
                                                >
                                                    <div className="icon_check">
                                                        <i className="far fa-square" />
                                                    </div>
                                                    <span>Microsoft</span>
                                                </div>
                                                <div
                                                    className="check_danhmuc menu_danhmuc_sp"
                                                    data-idcat={96}
                                                    data-slug="asus"
                                                >
                                                    <div className="icon_check">
                                                        <i className="far fa-square" />
                                                    </div>
                                                    <span>Asus</span>
                                                </div>
                                                <div
                                                    className="check_danhmuc menu_danhmuc_sp"
                                                    data-idcat={95}
                                                    data-slug="acer"
                                                >
                                                    <div className="icon_check">
                                                        <i className="far fa-square" />
                                                    </div>
                                                    <span>Acer</span>
                                                </div>
                                                <div
                                                    className="check_danhmuc menu_danhmuc_sp"
                                                    data-idcat={94}
                                                    data-slug="lenovo"
                                                >
                                                    <div className="icon_check">
                                                        <i className="far fa-square" />
                                                    </div>
                                                    <span>Lenovo</span>
                                                </div>
                                                <div
                                                    className="check_danhmuc menu_danhmuc_sp"
                                                    data-idcat={93}
                                                    data-slug="dell"
                                                >
                                                    <div className="icon_check">
                                                        <i className="far fa-square" />
                                                    </div>
                                                    <span>Dell</span>
                                                </div>
                                                <div
                                                    className="check_danhmuc menu_danhmuc_sp"
                                                    data-idcat={92}
                                                    data-slug="msi"
                                                >
                                                    <div className="icon_check">
                                                        <i className="far fa-square" />
                                                    </div>
                                                    <span>MSI</span>
                                                </div>
                                                <div
                                                    className="check_danhmuc menu_danhmuc_sp"
                                                    data-idcat={91}
                                                    data-slug="macbook"
                                                >
                                                    <div className="icon_check">
                                                        <i className="far fa-square" />
                                                    </div>
                                                    <span>Macbook</span>
                                                </div>
                                                <div
                                                    className="check_danhmuc menu_danhmuc_sp"
                                                    data-idcat={90}
                                                    data-slug="gigabyte"
                                                >
                                                    <div className="icon_check">
                                                        <i className="far fa-square" />
                                                    </div>
                                                    <span>GIGABYTE</span>
                                                </div>
                                            </div>
                                            <div className="bocho_tatca check_boloc">
                                                <span>Lọc sản phẩm</span>
                                            </div>
                                        </div>
                                    </div>{" "}
                                </div>
                                <div className="col-product-right">
                                    <div className="all_sp_search">
                                        <div className="loadkhung_product1 mainkhung_product ">
                                            {products.map((item: any) => {
                                                 const cheapest = getCheapestVariant(item.variants);
                                                console.log('item',item)
                                                return (
                                                    <div key={item._id} className="all_sp_banchay_index">
                                                        <div className="all_img_sp_bc">
                                                          <Link href={`/product/${item.slug}-${item._id}`}>
                                                                <div className="img_sp_bc">
                                                                    <div>
                                                                        <img
                                                                            loading="lazy"
                                                                            width={1276}
                                                                            height={956}
                                                                            src={item.mainImage}
                                                                            className={'1'}
                                                                            alt="Laptop Tèo Em - Cần Thơ "
                                                                            decoding="async"
                                                                        />{" "}
                                                                    </div>
                                                                    <div className="img_sp_2">
                                                                        <img
                                                                            loading="lazy"
                                                                            width={1276}
                                                                            height={956}
                                                                            src="https://laptopgaming.com.vn/upload/2tr9/z7091979203318_3fa05743fb3591027b992c73476e1979.jpg"
                                                                            className={'1'}
                                                                            alt="Laptop Tèo Em - Cần Thơ "
                                                                            decoding="async"
                                                                        />{" "}
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className="all_content_sp">
                                                            <a href="dell-alienware-m16-r2-ultra-7-155h16g512g16-inch-25k-240hz-100-dci-p3rtx-4050-6g-135wled-rgb-prekey">
                                                                <div className="name_sp text-split">
                                                                    {" "}
                                                                    {item.name} - {getVariantText(cheapest)}
                                                                </div>
                                                            </a>
                                                            <div className="gia_sp">
                                                                <span> {formatPrice(cheapest?.price)}</span>
                                                            </div>
                                                            <div className="cart-product">
                                                                <a
                                                                    href="dell-alienware-m16-r2-ultra-7-155h16g512g16-inch-25k-240hz-100-dci-p3rtx-4050-6g-135wled-rgb-prekey"
                                                                    className="muangay_sp"
                                                                >
                                                                    Mua ngay
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            })}



                                        </div>
                                    </div>
                                    <div className="clear" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
  );
}