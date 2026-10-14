import CategoryDetail from "./CategoryDetail";
import { getCategories } from "@/lib/categories";

export default async function Page() {
  const data = await getCategories({
    page: 1,
    limit: 10,
  });

  return (
      <CategoryDetail
        initialCategories={data.categories}
        initialTotal={data.total}
      />
  );
}