"use client";

import { useEffect, useState } from "react";

export function useSimilarProducts(productId: string, price: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId || !price) return;

    const fetchSimilar = async () => {
      setLoading(true);

      const res = await fetch(
        `/api/products/similar?productId=${productId}&price=${price}`
      );

      const json = await res.json();
      setData(json);

      setLoading(false);
    };

    fetchSimilar();
  }, [productId, price]);

  return { data, loading };
}