import Link from "next/link";

export default function Breadcrumb({ product, selected }: any) {
    console.log('selected=>>>',selected)
  const title = `${product.name} - ${selected.cpu} / ${selected.ram} / ${selected.ssd}`;

  return (
    <ol className="flex gap-1 text-sm">
      <li><Link href="/">Trang chủ</Link> /</li>
      <li><Link href="/product">Laptop</Link> /</li>
      <li className="font-medium text-black">
        {title}
      </li>
    </ol>
  );
}