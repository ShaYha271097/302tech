import { getProductById } from "@/lib/getProduct";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import ProductDetailClient from "./ProductDetailClient";
import { getCheapestVariant } from "@/lib/format";
import { getSimilarProducts } from "@/lib/getSimilarProducts";


export async function generateMetadata({
  params,
}: any) {
  const { slug } = await params;

  const id = slug.split("-").pop();

  const product =
    await getProductById(id);

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm",
    };
  }

  return {
    title: product.name,

    description:
      `${product.name} giá tốt tại 302 Tech. Bảo hành uy tín, giao hàng toàn quốc.`,

    openGraph: {
      title: product.name,

      description:
        `${product.name} giá tốt tại 302 Tech.`,

      images: [
        {
          url: product.mainImage,
        },
      ],
    },
  };
}

export default async function ProductDetail({
  params,
}: any) {
  const { slug } = await params;

  const id = slug.split("-").pop();
console.time("TOTAL");
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }



console.timeEnd("TOTAL");
  return (
     <ProductDetailClient
      product={JSON.parse(JSON.stringify(product))}
    />
  );
}

//  const selected =
//   getCheapestVariant(product.variants);

//  const similarProducts =
//     await getSimilarProducts(
//       product._id.toString(),
//       selected.price
//     );