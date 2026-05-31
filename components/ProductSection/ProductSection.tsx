
import { formatPrice, getCheapestVariant, getVariantText } from "@/lib/format";
import Link from "next/link";
import ProductCard from "../ProductCard/ProductCard";



export default function ProductSection({ title, slug, products }: any) {


   
    return (
        <div className="wrap_bottom wrap_list">
            <div className="fixwidth">
                <div className="title_sp_bc">
                    <Link href={`/products?brand=${slug}`}>
                        <div className="title_sp">{title}</div>
                    </Link>

                    <div className="all_xemtatca">
                        <Link href={`/products?brand=${slug}`}>
                            Xem tất cả <i className="fas fa-angle-double-right" />
                        </Link>
                    </div>
                </div>

                <div className="paging-product-index">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {products?.map((p: any) => {
                            return (
                                 <ProductCard    key={p._id} product={p} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

