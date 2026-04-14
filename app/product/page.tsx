import Header from "@/components/Header/Header";
import ProductsClient from "./ProductsClient";

export default function ProductsPage({ searchParams }: any) {
  return (
    <>
      <Header />
      <ProductsClient brand={searchParams.brand} />
    </>
  );
}