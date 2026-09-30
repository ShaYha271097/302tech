"use client";

type ProductSortDescriptionProps = {
  content?: string;
};

export default function ProductSortDescription({
  content,
}: ProductSortDescriptionProps) {
  if (!content) return null;

  const textContent = content
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  if (!textContent) return null;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
        <div className="h-5 w-1 rounded-full bg-[#ff7a00]" />

        <div>
          <h2 className="text-base font-bold text-gray-900">
            Thông tin nổi bật
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            Thông tin chi tiết của sản phẩm
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="
    short-description
    px-5 py-5
    text-[14px]
    leading-7
    text-gray-700

    [&_p]:m-0
    [&_p+p]:mt-1.5

    [&_ul]:my-1
    [&_ul]:list-disc
    [&_ul]:pl-5

    [&_ol]:my-1
    [&_ol]:list-decimal
    [&_ol]:pl-5

    [&_li]:pl-1
    [&_li]:my-1
    [&_li]:marker:text-[#ff7a00]
    [&_li]:marker:font-bold

    [&_strong]:font-semibold
    [&_strong]:text-gray-900

    [&_a]:font-medium
    [&_a]:text-[#ff7a00]
    [&_a]:underline
    [&_a]:underline-offset-2

    [&_h2]:mb-2
    [&_h2]:mt-4
    [&_h2]:text-lg
    [&_h2]:font-bold
    [&_h2]:text-gray-900

    [&_h3]:mb-2
    [&_h3]:mt-3
    [&_h3]:text-base
    [&_h3]:font-semibold
    [&_h3]:text-gray-900
  "
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </section>
  );
}