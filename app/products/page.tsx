"use client"
import Header from "@/components/Header/Header";
import ProductsClient from "./ProductsClient";
import { useSearchParams } from "next/navigation";
<<<<<<< HEAD
import Footer from "@/components/Footer/Footer";
=======
import { Suspense } from "react";

>>>>>>> 1b24725a63b9ef367b14557e55fb1d9a5d6a37fc

export default function ProductsPage() {
  return (
    <>
      <Header />
<<<<<<< HEAD
      <ProductsClient />
      <Footer />
=======
       <Suspense fallback={<div>Loading...</div>}>
        <ProductsClient />
      </Suspense>
>>>>>>> 1b24725a63b9ef367b14557e55fb1d9a5d6a37fc
    </>
  );
}