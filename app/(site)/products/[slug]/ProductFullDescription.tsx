"use client";

type ProductFullDescriptionProps = {
  description?: string;
};

export default function ProductFullDescription({
  description,
}: ProductFullDescriptionProps) {
  if (!description?.trim()) {
    return null;
  }

  return (
    <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-7 w-1 rounded-full bg-[#ff7a00]" />

        <div>
          <h2 className="text-lg font-bold text-[#111827] sm:text-xl">
            Mô tả sản phẩm
          </h2>

          <p className="mt-0.5 text-sm text-[#6B7280]">
            Thông tin chi tiết về sản phẩm
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="
          product-description
          text-[15px]
          leading-7
          text-[#374151]

          [&_p]:mb-4
          [&_p:last-child]:mb-0

          [&_h2]:mb-4
          [&_h2]:mt-7
          [&_h2]:text-xl
          [&_h2]:font-bold
          [&_h2]:text-[#111827]

          [&_h3]:mb-3
          [&_h3]:mt-6
          [&_h3]:text-lg
          [&_h3]:font-bold
          [&_h3]:text-[#111827]

          [&_strong]:font-semibold
          [&_strong]:text-[#111827]

          [&_ul]:mb-4
          [&_ul]:ml-5
          [&_ul]:list-disc

          [&_ol]:mb-4
          [&_ol]:ml-5
          [&_ol]:list-decimal

          [&_li]:pl-1

          [&_a]:font-medium
          [&_a]:text-[#ff7a00]
          [&_a]:underline
          [&_a]:underline-offset-2

          [&_blockquote]:my-5
          [&_blockquote]:border-l-4
          [&_blockquote]:border-[#ff7a00]
          [&_blockquote]:bg-orange-50
          [&_blockquote]:px-4
          [&_blockquote]:py-3
          [&_blockquote]:text-[#4B5563]

          [&_img]:mx-auto
          [&_img]:my-6
          [&_img]:h-auto
          [&_img]:max-w-full
          [&_img]:rounded-xl
          [&_img]:border
          [&_img]:border-gray-200

          [&_hr]:my-6
          [&_hr]:border-gray-200
        "
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </section>
  );
}