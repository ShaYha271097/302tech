import { getProductById } from "@/lib/getProduct";
import { getSimilarProducts } from "@/lib/getSimilarProducts";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { getCheapestVariant } from "@/lib/format";

export async function generateMetadata({
  params,
}: any) {
  const { slug } = await params;

  const id = slug.split("-").pop();

  const product = await getProductById(id);

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
          url: product.mainImage.url,
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

  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  const cheapest = getCheapestVariant(product.variants);

  const similarProducts = await getSimilarProducts(
    product._id,
    cheapest.price
  );

  return (
    <ProductDetailClient
      product={JSON.parse(JSON.stringify(product))}
      similarProducts={JSON.parse(JSON.stringify(similarProducts))}
    />
  );
}