
"use client";

import { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import Breadcrumb from "./Breadcrumb";


function getCheapestVariant(variants: any[]) {
  return variants.reduce((min, v) =>
    v.price < min.price ? v : min
  );
}

export default function ProductDetailClient({ product }: any) {
      const [selected, setSelected] = useState(
    getCheapestVariant(product.variants)
  );

    return (
        <>
            
            <div className="wrap-main w-clear">
                <div className="fixwidth">
                    <div className="breadCrumbs_sp mt-3 mb-3">
                        <div className="breadCrumbs">
                            <div>
                                 <Breadcrumb product={product} selected={selected} />
                            </div>
                        </div>
                    </div>
                    <div className="clearfix">
                        <div className="grid-pro-detail w-clear">
                            <div className="left-pro-detail w-clear">
                                <ProductGallery mainImage={product.mainImage} gallery={product.gallery} />
                            </div>
                            <div className="right-pro-detail w-clear">
                                   <ProductInfo
                                    product={product}
                                    selected={selected}
                                    setSelected={setSelected}
                                    />
                            </div>
                            <div className="clear" />
                            <div className="tabs-pro-detail">
                                <ul className="ul-tabs-pro-detail w-clear">
                                    <li className="active transition" data-tabs="info-pro-detail">
                                        Thông tin sản phẩm
                                    </li>
                                </ul>
                                <div className="all_noidung_sp">
                                    <div
                                        className="content-tabs-pro-detail info-pro-detail active all_gioithieu_index more_noidung"
                                        style={{ maxHeight: "none" }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}