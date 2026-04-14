"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsClient({ brand }: { brand?: string }) {
  const [products, setProducts] = useState([]);

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
    <div className="mainkhung_product">
      {products.map((item: any) => {
        const cheapest = getCheapestVariant(item.variants);

        return (
          <div key={item._id}>
            <Link href={`/product/${item.slug}-${item._id}`}>
              {item.name}
            </Link>
            <div>{getVariantText(cheapest)}</div>
            <div>{formatPrice(cheapest?.price)}</div>
          </div>
        );
      })}
    </div>
  );
}