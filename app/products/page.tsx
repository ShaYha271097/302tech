"use client"
import Header from "@/components/Header/Header";
import ProductsClient from "./ProductsClient";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <>
      <Header />
       <Suspense fallback={<div>Loading...</div>}>
        <ProductsClient />
      </Suspense>
      <Footer />

    </>
  );
}