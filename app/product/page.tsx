"use client"
import Header from "@/components/Header/Header";
import ProductsClient from "./ProductsClient";
import { useSearchParams } from "next/navigation";


export default function ProductsPage() {
     const searchParams = useSearchParams();
    const brand :any = searchParams.get("brand");
    console.log("brand",brand)
  return (
    <>
      <Header />
      <ProductsClient brand={brand} />
    </>
  );
}