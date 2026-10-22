import ProductsClient from "./ProductsClient";
import { getProducts } from "@/lib/getProduct";

export async function generateMetadata({ searchParams }: any) {
  const params = await searchParams;
  const category = params.category;

  const categoryMetadata: Record<
    string,
    { title: string; description: string }
  > = {
    "laptop-doanh-nhan": {
      title: "Laptop Doanh Nhân Cũ Cao Cấp, Giá Tốt | 302 Tech",
      description:
        "Laptop doanh nhân cũ thiết kế sang trọng, mỏng nhẹ, bền bỉ, phù hợp làm việc và di chuyển. Giá tốt tại 302 Tech.",
    },

    "pc-may-bo": {
      title: "PC Máy Bộ Cũ Chính Hãng, Giá Tốt | 302 Tech",
      description:
        "PC máy bộ cũ cấu hình đa dạng, vận hành ổn định, phù hợp văn phòng, học tập, làm việc và giải trí tại 302 Tech.",
    },

    "laptop-gaming": {
      title: "Laptop Gaming Cũ Giá Tốt, Hiệu Năng Cao | 302 Tech",
      description:
        "Laptop gaming cũ cấu hình mạnh, card đồ họa rời, phù hợp chơi game và giải trí. Nhiều lựa chọn giá tốt tại 302 Tech.",
    },

    "laptop-van-phong": {
      title: "Laptop Văn Phòng Cũ Giá Tốt, Bền Bỉ | 302 Tech",
      description:
        "Laptop văn phòng cũ phù hợp học tập, làm việc và kinh doanh. Nhiều mẫu máy bền bỉ, hiệu năng ổn định tại 302 Tech.",
    },

    "laptop-do-hoa": {
      title: "Laptop Đồ Họa Cũ Cấu Hình Mạnh, Giá Tốt | 302 Tech",
      description:
        "Laptop đồ họa cũ hiệu năng cao, phù hợp Photoshop, thiết kế, dựng video và công việc sáng tạo. Tham khảo giá tại 302 Tech.",
    },

    "may-tram": {
      title: "Laptop Máy Trạm Workstation Cũ Chính Hãng | 302 Tech",
      description:
        "Máy trạm workstation cũ cấu hình mạnh, phù hợp thiết kế 3D, CAD, dựng phim và các phần mềm kỹ thuật tại 302 Tech.",
    },
  };

  return (
    categoryMetadata[category || ""] || {
      title: "Laptop Cũ, PC Máy Bộ Giá Tốt | 302 Tech",
      description:
        "302 Tech cung cấp laptop cũ và PC máy bộ đa dạng cấu hình, phù hợp học tập, văn phòng, gaming, đồ họa và công việc chuyên nghiệp.",
    }
  );
}

export function toProductDTO(product: any) {
  return {
    ...product,
    _id: product._id.toString(),

    category: product.category
      ? {
        ...product.category,
        _id: product.category._id.toString(),
      }
      : null,

    categoryId: product.categoryId?.toString(),

    createdAt: product.createdAt?.toISOString?.(),
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    category?: string;
    price?: string | string[];
    ram?: string | string[];
    ssd?: string | string[];
    search?: string;
    brand?:string
  }>;
}) {
  const params = await searchParams;

  const page = Number(params.page || 1);

const result = await getProducts({
  page,
  category: params.category || "",
  brand: params.brand || "",
  price: params.price || "",
  ram: params.ram || "",
  ssd: params.ssd || "",
  search: params.search || "",
  limit: 12,
});

  const products = result.products.map(toProductDTO);

  return (
    <ProductsClient
      products={products}
      totalPages={result.totalPages}
    />
  );
}