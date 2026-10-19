
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import clientPromise from "@/lib/mongodb";
import GlobalCartModal from "./products/[slug]/GlobalCartModal";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const categories = await db
    .collection("categories")
    .find({ isActive: true })
    .sort({ sortOrder: 1, name: 1 })
    .toArray();

  return (
    <>
      <Header categories={JSON.parse(JSON.stringify(categories))} />
      {children}
      <GlobalCartModal />
      <Footer />
    </>
  );
}


