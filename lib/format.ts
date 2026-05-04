

export const formatPrice = (price?: number) => {
  if (!price) return "0đ";
  return price.toLocaleString("vi-VN") + "đ";
};


export  const getVariantText = (variant: any) => {
    if (!variant) return "";

    return `${variant.cpu}, RAM ${variant.ram}, SSD ${variant.ssd}`;
  };