import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import clientPromise from "@/lib/mongodb";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
      const client = await clientPromise;
  const db = client.db("laptop-shop");

  const brands = await db
    .collection("brands")
    .find({ isActive: false })
    .toArray();



  return (
    <>
       <Header brands={JSON.parse(JSON.stringify(brands))} />
        {children}
        <Footer />
    </>
  );
}