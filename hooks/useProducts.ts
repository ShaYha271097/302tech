import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useProducts = () => {
  const searchParams = useSearchParams();

  // ✅ lấy trực tiếp từ URL
  const category = searchParams.get("category") || "laptop";
  const brand = searchParams.get("brand") || "";
  const selectedPrices = searchParams.getAll("price");
  const ramSelected = searchParams.getAll("ram");
  const ssdSelected = searchParams.getAll("ssd");
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);

    const params = new URLSearchParams();

    params.append("category", category);

    if (brand) params.append("brand", brand);
    selectedPrices.forEach((p) => params.append("price", p));
    ramSelected.forEach((r) => params.append("ram", r));
    ssdSelected.forEach((s) => params.append("ssd", s));

    params.append("page", String(page));
    params.append("limit", "5");

    if (search) params.append("search", search);

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();

      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Fetch error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams.toString()]);



  return {
    products,
    totalPages,
    loading,
    page,

    // 👉 expose luôn filter nếu cần UI
    category,
    brand,
    selectedPrices,
    ramSelected,
    ssdSelected,
  };
};