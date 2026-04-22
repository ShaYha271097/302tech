"use client"
import Header from "@/components/Header/Header";
import ProductsClient from "./ProductsClient";
import { useSearchParams } from "next/navigation";


export default function ProductsPage() {
  return (
    <>
      <Header />
      <ProductsClient />
    </>
  );
}