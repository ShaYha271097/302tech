




export default function ProductSection({ title, slug, products }: any) {



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
        <div className="wrap_bottom wrap_list">
            <div className="fixwidth">
                <div className="title_sp_bc">
                    <a href={slug}>
                        <div className="title_sp">{title}</div>
                    </a>

                    <div className="all_xemtatca">
                        <a href={slug}>
                            Xem tất cả <i className="fas fa-angle-double-right" />
                        </a>
                    </div>
                </div>

                <div className="paging-product-index">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {products?.map((p: any) => {
                            const cheapest = getCheapestVariant(p.variants);

                            return (
                                <div key={p._id} className="border rounded-lg p-2 sm:p-3 hover:shadow transition bg-white">

                                    {/* IMAGE */}
                                    <div className="img_sp_bc">
                                        <a href={p.slug}>
                                            <div>
                                                <img
                                                    loading="lazy"
                                                    src={p.mainImage}
                                                    alt={p.name}
                                                />
                                            </div>

                                            {/* {p.mainImage && (
                                            <div className="img_sp_2">
                                            <img
                                                loading="lazy"
                                                src={p.mainImage}
                                                alt={p.mainImage}
                                            />
                                            </div>
                                        )} */}
                                        </a>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="all_content_sp">
                                        <a href={p.slug}>
                                            <div className="name_sp text-split">
                                                {p.name} - {getVariantText(cheapest)}
                                            </div>
                                        </a>

                                        <div className="gia_sp">
                                            <span>
                                                {formatPrice(cheapest?.price)}
                                            </span>
                                        </div>

                                        <div className="cart-product">
                                            <a href={p.slug} className="muangay_sp">
                                                Mua ngay
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

