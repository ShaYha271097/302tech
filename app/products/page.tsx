"use client"
import Header from "@/components/Header/Header";
import ProductsClient from "./ProductsClient";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer/Footer";

export default function ProductsPage() {
  return (
    <>
      <Header />
      <ProductsClient />
      <Footer />
    </>
  );
}