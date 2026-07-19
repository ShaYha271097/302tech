import { getBrands } from "@/lib/brands";
import BrandDetail from "./BrandDetail";

export default async function Page() {
  const data = await getBrands({
    page: 1,
    limit: 10,
  });

  return (
      <BrandDetail
        initialBrands={data.brands}
        initialTotal={data.total}
      />
  );
}