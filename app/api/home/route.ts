import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const limit = 8;

  const brands = await db
    .collection("brands")
    .find({ isActive: false }) // chỉ lấy brand hiển thị
    .toArray();

  const productPromises = brands.map(async (brand) => {
    const products = await db
      .collection("products")
      .find({
        brandId: brand._id,
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return {
      slug: brand.slug,
      products,
    };
  });

  const results = await Promise.all(productPromises);

 const response = Object.fromEntries(
  results.map((item) => [
    item.slug,
    {
      products: item.products,
    },
  ])
);

return Response.json(response);
}