import Header from "@/components/Header/Header";
import ProductsClient from "./ProductsClient";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
import { getProducts } from "@/lib/getProduct";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    brand?: string;
    price?: string | string[];
    ram?: string | string[];
    ssd?: string | string[];
  }>;
}) {
  const params = await searchParams;

  const page = Number(params.page || 1);

  const result = await getProducts({
    page,
    brand: params.brand || "",
    // truyền thêm price, ram, ssd...
  });

  return (
  <ProductsClient
  products={result.products}
  totalPages={result.totalPages}
/>
  );
}