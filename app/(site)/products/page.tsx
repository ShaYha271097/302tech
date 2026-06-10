import Header from "@/components/Header/Header";
import ProductsClient from "./ProductsClient";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
import { getProducts } from "@/lib/getProduct";


export async function generateMetadata({
  searchParams,
}: any) {
  const params = await searchParams;

  const brand = params.brand;

  if (brand) {
    return {
      title: `Laptop ${brand.toUpperCase()} Cũ Chính Hãng`,
      description: `Các mẫu laptop ${brand.toUpperCase()} giá tốt tại 302 Tech`,
    };
  }

  return {
    title: "Laptop Cũ Chính Hãng",
    description:
      "ThinkPad, Dell Latitude, HP EliteBook, Laptop Gaming",
  };
}

export function toProductDTO(product: any) {
  return {
    ...product,
    _id: product._id.toString(),

    brand: product.brand
      ? {
          ...product.brand,
          _id: product.brand._id.toString(),
        }
      : null,

    brandId: product.brandId?.toString(),
    createdAt:
      product.createdAt?.toISOString?.(),
  };
}
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    brand?: string;
    price?: string | string[];
    ram?: string | string[];
    ssd?: string | string[];
    search?: string ;
  }>;
}) {
  const params = await searchParams;

  const page = Number(params.page || 1);

  const result = await getProducts({
    page,
    brand: params.brand || "",
    price: params.price || "",
    ram: params.ram || "",
    ssd: params.ssd || "",
    search: params.search || "",
    limit:12,
  });

  const products = result.products.map(
  toProductDTO
);
  return (
  <ProductsClient
  products={products}
  totalPages={result.totalPages}
/>
  );
}