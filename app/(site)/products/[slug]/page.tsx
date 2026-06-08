import { getProductById } from "@/lib/getProduct";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import ProductDetailClient from "./ProductDetailClient";
import { getCheapestVariant } from "@/lib/format";
import { getSimilarProducts } from "@/lib/getSimilarProducts";

export default async function ProductDetail({
  params,
}: any) {
  const { slug } = await params;

  const id = slug.split("-").pop();
console.time("product");
  const product = await getProductById(id);
console.timeEnd("product");

console.time("similar");
  if (!product) {
    return notFound();
  }

 const selected =
  getCheapestVariant(product.variants);

 const similarProducts =
    await getSimilarProducts(
      product._id.toString(),
      selected.price
    );

console.timeEnd("similar");
  return (
     <ProductDetailClient
      product={JSON.parse(
        JSON.stringify(product)
      )}
      similarProducts={JSON.parse(
        JSON.stringify(similarProducts)
      )}
    />
  );
}