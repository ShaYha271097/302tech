"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { RootState } from "@/store/store";
import { closeCartModal } from "@/store/slices/cartSlice";
import CartModal from "./CartModal";



export default function GlobalCartModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { items, isCartModalOpen } = useSelector(
    (state: RootState) => state.cart
  );


  console.log("isCartModalOpen",isCartModalOpen)
  return (
     <CartModal
      open={isCartModalOpen}
      onClose={() => dispatch(closeCartModal())}
      cartItems={items}
      onCheckout={() => {
        dispatch(closeCartModal());
        router.push("/cart");
      }}
    />
  );
}