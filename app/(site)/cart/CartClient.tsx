"use client";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

import {
increaseQuantity,
decreaseQuantity,
removeFromCart,
} from "@/store/slices/cartSlice";


export default function CartClient() {
const dispatch = useAppDispatch();

const items = useAppSelector(
(state) => state.cart.items
);

const total = items.reduce(
(sum, item) =>
sum +
item.variant.price * item.quantity,
0
);

const formatPrice = (price: number) =>
price.toLocaleString("vi-VN") + "đ";

return ( <div className="container mx-auto max-w-7xl px-4 py-6">

  <div className="grid lg:grid-cols-3 gap-6">

    {/* LEFT */}
    <div className="lg:col-span-2">

      <div
        className="
          rounded-2xl
          overflow-hidden

          bg-white

          border
          border-orange-100
        "
      >

        <div
          className="
            px-5 py-4

            bg-orange-50

            border-b
            border-orange-100
          "
        >
          <h2
            className="
              text-lg
              font-bold
              text-[#ff7a00]
            "
          >
            🛒 GIỎ HÀNG CỦA BẠN
          </h2>
        </div>

        {items.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500">
              Giỏ hàng đang trống
            </p>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div
                key={
                  item.productId +
                  item.variant.cpu +
                  item.variant.ram +
                  item.variant.ssd
                }
                className="
                  p-5

                  border-b
                  border-orange-100
                "
              >
                <div className="flex gap-4">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-24
                      h-24

                      rounded-xl

                      object-cover

                      border
                      border-orange-100
                    "
                  />

                  <div className="flex-1">

                    <h3
                      className="
                        font-semibold
                        text-[#111827]
                      "
                    >
                      {item.name}
                    </h3>

                    <p
                      className="
                        text-sm
                        text-gray-500
                        mt-1
                      "
                    >
                      {item.variant.cpu} /{" "}
                      {item.variant.ram} /{" "}
                      {item.variant.ssd}
                    </p>

                    <div
                      className="
                        mt-2

                        text-xl
                        font-bold

                        text-[#ff7a00]
                      "
                    >
                      {formatPrice(
                        item.variant.price
                      )}
                    </div>

                    <div
                      className="
                        mt-4

                        flex
                        flex-wrap

                        items-center
                        justify-between

                        gap-3
                      "
                    >

                      {/* QUANTITY */}
                      <div
                        className="
                          flex
                          items-center

                          overflow-hidden

                          rounded-xl

                          border
                          border-orange-200
                        "
                      >

                        <button
                          className="
                            w-10
                            h-10
                            bg-orange-50
                            cursor-pointer
                          "
                          onClick={() =>
                            dispatch(
                              decreaseQuantity({
                                productId:
                                  item.productId,
                                cpu:
                                  item.variant.cpu,
                                ram:
                                  item.variant.ram,
                                ssd:
                                  item.variant.ssd,
                              })
                            )
                          }
                        >
                          -
                        </button>

                        <div
                          className="
                            w-12
                            text-center
                          "
                        >
                          {item.quantity}
                        </div>

                        <button
                          className="
                            w-10
                            h-10

                            bg-orange-50
                             cursor-pointer
                          "
                          onClick={() =>
                            dispatch(
                              increaseQuantity({
                                productId:
                                  item.productId,
                                cpu:
                                  item.variant.cpu,
                                ram:
                                  item.variant.ram,
                                ssd:
                                  item.variant.ssd,
                              })
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                      <button
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              productId:
                                item.productId,
                              cpu:
                                item.variant.cpu,
                              ram:
                                item.variant.ram,
                              ssd:
                                item.variant.ssd,
                            })
                          )
                        }
                        className="
                          text-red-500
                          text-sm
                          cursor-pointer
                        "
                      >
                        Xóa sản phẩm
                      </button>

                    </div>

                  </div>

                </div>
              </div>
            ))}

            <div
              className="
                flex
                justify-between

                px-5
                py-5

                bg-orange-50
              "
            >
              <span
                className="
                  font-medium
                "
              >
                Tổng tiền
              </span>

              <span
                className="
                  text-2xl
                  font-bold
                  text-[#ff7a00]
                "
              >
                {formatPrice(total)}
              </span>

            </div>

          </>
        )}

      </div>

    </div>

    {/* RIGHT */}
    <div>

      <div
  className="
    sticky
    top-4
    rounded-2xl
    bg-white
    border
    border-orange-100
    p-5
  "
>
  <h2
    className="
      text-lg
      font-bold
      text-[#ff7a00]
      mb-4
    "
  >
    📦 THÔNG TIN ĐẶT HÀNG
  </h2>

  <div className="text-sm text-gray-500 mb-4">
    Liên hệ Zalo để đặt hàng nhanh. Shop sẽ tư vấn và xác nhận đơn ngay.
  </div>

  <div
    className="
      flex
      justify-between
      mb-4
      text-sm
    "
  >
    <span>Tạm tính</span>

    <span
      className="
        font-bold
        text-[#ff7a00]
      "
    >
      {formatPrice(total)}
    </span>
  </div>

  <button
    onClick={() =>
      window.open(
        "https://zalo.me/0946932067?text=Tôi%20muốn%20mua%20sản%20phẩm%20này",
        "_blank"
      )
    }
    className="
      mt-2
      w-full
      h-14
      rounded-xl
      bg-[#ff7a00]
      text-white
      font-bold
      hover:opacity-90
      active:scale-95
      transition
      cursor-pointer
    "
  >
    💬 LIÊN HỆ ZALO ĐẶT HÀNG
  </button>
</div>
    </div>

  </div>

</div>


);
}
