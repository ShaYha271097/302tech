import { getProductById } from "@/lib/getProduct";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import ProductDetailClient from "./ProductDetailClient";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
export default async function ProductDetail({ params }: any) {
    const { slug } = await params;

    const id = slug.split("-").pop();

    if (!ObjectId.isValid(id)) {
        return notFound();
    }

    const product = await getProductById(id);

    if (!product) {
        return notFound();
    }

    return (
        <>
            <Header />
            <ProductDetailClient product={product} />
             <Footer /> 
        </>);
}

