import { getProducts } from "@/lib/getProduct";
import ProductDetail from "./ProductDetail";

export default async function Page() {
  const data = await getProducts({
    page: 1,
    limit: 10,
    sort: "date_desc",
  });
  console.log("data=>>>>>",data)
  return (
    <ProductDetail
      initialProducts={data.products}
      initialTotal={data.total}
    />
  );
}