import Link from "next/link";



type Props = {
  product:any,
  selected?:any
}

export default function Breadcrumb({ product, selected }: any) {

  const title = `${product.name} - ${selected.cpu} / ${selected.ram} / ${selected.ssd}`;
    console.log("ssss",product)
  return (
    <ol className="flex gap-1 text-sm">
      <li><Link href="/">Trang chủ</Link> /</li>
      <li><Link href="/products?category=laptop">Laptop</Link> /</li>
       <li><Link href={`/products?category=laptop&brand=${product.brand.slug}`}>{product.brand.name}</Link> /</li>
      <li className="font-medium text-black">
        {title}
      </li>
    </ol>
  );
}