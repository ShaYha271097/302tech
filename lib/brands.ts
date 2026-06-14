// lib/brands.ts

import clientPromise from "@/lib/mongodb";

type GetBrandsParams = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
};

export async function getBrands({
  page = 1,
  limit = 10,
  search = "",
  sort = "date_asc",
}: GetBrandsParams = {}) {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const skip = (page - 1) * limit;

  const filter: any = {};

  if (search.trim()) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  let sortOption: any = {};

  switch (sort) {
    case "name_asc":
      sortOption = { name: 1 };
      break;

    case "name_desc":
      sortOption = { name: -1 };
      break;

    case "date_desc":
      sortOption = { createdAt: -1 };
      break;

    case "date_asc":
      sortOption = { createdAt: 1 };
      break;

    default:
      sortOption = { name: 1 };
  }

  const [total, brands] = await Promise.all([
    db.collection("brands").countDocuments(filter),
    db
      .collection("brands")
      .find(filter)
      .sort(sortOption)
      .collation({
        locale: "vi",
        strength: 2,
      })
      .skip(skip)
      .limit(limit)
      .toArray(),
  ]);

  return {
    brands: JSON.parse(JSON.stringify(brands)),
    total,
    totalPages: Math.ceil(total / limit),
    page,
    limit,
  };
}