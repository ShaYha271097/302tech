"use client";

import Image from "next/image";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

type CartItem = {
  productId: string;
  name: string;
  slug: string;
  image: {
    url: string;
    publicId: string;
  };
  variant: {
    cpu: string;
    ram: string;
    ssd: string;
    price: number;
  };
  quantity: number;
};

type CartModalProps = {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onCheckout: () => void;
};

export default function CartModal({
  open,
  onClose,
  cartItems,
  onCheckout,
}: CartModalProps) {
  if (!open) return null;

const dispatch = useAppDispatch();

const handleIncrease = (item: CartItem) => {
  dispatch(
    increaseQuantity({
      productId: item.productId,
      cpu: item.variant.cpu,
      ram: item.variant.ram,
      ssd: item.variant.ssd,
    })
  );
};

const handleDecrease = (item: CartItem) => {
  dispatch(
    decreaseQuantity({
      productId: item.productId,
      cpu: item.variant.cpu,
      ram: item.variant.ram,
      ssd: item.variant.ssd,
    })
  );
};

const handleRemove = (item: CartItem) => {
  dispatch(
    removeFromCart({
      productId: item.productId,
      cpu: item.variant.cpu,
      ram: item.variant.ram,
      ssd: item.variant.ssd,
    })
  );
};

 const total = cartItems.reduce(
  (sum, item) => sum + item.variant.price * item.quantity,
  0
);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "₫";
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
     <div
  className="
    relative
    z-10
    flex
    w-full
    max-w-4xl
    max-h-[92vh]
    flex-col
    overflow-hidden
    rounded-2xl
    bg-white
    shadow-2xl
    md:max-h-[90vh]
    p-2
  "
>
        {/* HEADER */}
        <div
  className="
    flex
    shrink-0
    items-center
    justify-between
    border-b
    border-[#F3F4F6]
    px-4
    py-3
    md:px-6
    md:py-4
  "
>
          <div className="flex items-center gap-3">
            <div
  className="
    flex
    h-9
    w-9
    items-center
    justify-center
    rounded-xl
    bg-orange-50
    text-[#ff7a00]
    md:h-10
    md:w-10
  "
>
              <ShoppingCart size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Giỏ hàng của bạn
              </h2>

              <p className="text-xs text-gray-500">
                {cartItems.length} sản phẩm
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-gray-900
              cursor-pointer
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div
              className="
                flex
                min-h-[280px]
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-orange-50
                  text-[#ff7a00]
                "
              >
                <ShoppingCart size={28} />
              </div>

              <h3 className="font-semibold text-gray-900">
                Giỏ hàng đang trống
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Hãy chọn một sản phẩm để thêm vào giỏ hàng.
              </p>
            </div>
          ) : (
            <div className="px-5 py-4 md:px-6">
              {/* TABLE HEADER */}
              <div
                className="
                  hidden
                  grid-cols-[minmax(0,1fr)_140px_150px]
                  gap-4
                  border-b
                  border-[#F3F4F6]
                  pb-3
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-gray-500
                  md:grid
                "
              >
                <div>Sản phẩm</div>
                <div className="text-center">Số lượng</div>
                <div className="text-right">Thành tiền</div>
              </div>

              {/* ITEMS */}
             <div className="space-y-3 md:divide-y md:divide-[#F3F4F6] md:space-y-0">
  {cartItems.map((item) => (
    <div
      key={`${item.productId}-${item.variant.cpu}-${item.variant.ram}-${item.variant.ssd}`}
      className="
        relative
        rounded-xl
        border border-[#F3F4F6]
        p-3
        md:grid
        md:grid-cols-[minmax(0,1fr)_140px_150px]
        md:items-center
        md:gap-4
        md:rounded-none
        md:border-0
        md:border-b
        md:py-4
        md:px-0
      "
    >
      {/* TOP - PRODUCT */}
      <div className="flex min-w-0 items-start gap-3">
        <Image
          src={item.image.url}
          alt={item.name}
          width={72}
          height={72}
          className="
            h-[72px]
            w-[72px]
            shrink-0
            rounded-lg
            object-cover
            md:h-20
            md:w-20
          "
        />

        <div className="min-w-0 flex-1 pr-8 md:pr-0">
          <div className="line-clamp-2 text-sm font-semibold text-gray-900 md:text-base">
            {item.name}
          </div>

          <div className="mt-1 text-xs leading-5 text-gray-500 md:text-sm">
            {item.variant.cpu}
            <span className="mx-1">•</span>
            {item.variant.ram}
            <span className="mx-1">•</span>
            {item.variant.ssd}
          </div>
        </div>

        {/* DELETE - MOBILE */}
        <button
          onClick={() => handleRemove(item)}
          className="
            absolute
            right-3
            top-3
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-gray-400
            transition
            hover:bg-red-50
            hover:text-red-500
            cursor-pointer
            md:hidden
          "
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* BOTTOM - QUANTITY + PRICE */}
      <div
        className="
          mt-3
          flex
          items-center
          justify-between
          gap-3
          border-t
          border-[#F3F4F6]
          pt-3
          md:mt-0
          md:border-0
          md:pt-0
        "
      >
        {/* QUANTITY */}
        <div className="flex items-center">
          <button
            onClick={() => handleDecrease(item)}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-l-md
              border
              border-gray-200
              cursor-pointer
              hover:bg-gray-50
            "
          >
            <Minus className="h-4 w-4" />
          </button>

          <span
            className="
              flex
              h-8
              min-w-10
              items-center
              justify-center
              border-y
              border-gray-200
              text-sm
              font-medium
            "
          >
            {item.quantity}
          </span>

          <button
            onClick={() => handleIncrease(item)}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-r-md
              border
              border-gray-200
              cursor-pointer
              hover:bg-gray-50
            "
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* PRICE */}
        <div className="text-right">
          <div className="text-xs text-gray-400 md:hidden">
            Thành tiền
          </div>

          <div className="text-sm font-bold text-[#ff7a00] md:text-base">
            {formatPrice(item.variant.price * item.quantity)}
          </div>
        </div>
      </div>

      {/* DELETE - DESKTOP */}
      <button
        onClick={() => handleRemove(item)}
        className="
          hidden
          h-8
          w-8
          items-center
          justify-center
          justify-self-end
          rounded-md
          text-gray-400
          transition
          hover:bg-red-50
          hover:text-red-500
          cursor-pointer
          md:flex
        "
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  ))}
</div>

              {/* SUBTOTAL */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-t
                  border-[#E5E7EB]
                  pt-4
                "
              >
                <span className="text-sm font-medium text-gray-600">
                  Tạm tính
                </span>

                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div
            className="
              shrink-0
              border-t
              border-[#F3F4F6]
              bg-[#FAFAFA]
              px-5
              py-4
              md:px-6
            "
          >
            <div className="flex justify-end">
              <button
                onClick={onCheckout}
                className="
                  h-11
                  w-full
                  rounded-xl
                  bg-[#ff7a00]
                  px-6
                  text-sm
                  font-bold
                  text-white
                  shadow-md
                  transition-all
                  duration-200
                  hover:bg-[#e86f00]
                  hover:shadow-lg
                  cursor-pointer
                  md:w-auto
                "
              >
                Thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}