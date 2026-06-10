import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadCart = () => {
  if (typeof window === "undefined") return [];

  try {
    const cart = localStorage.getItem("cart");

    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const saveCart = (items: any[]) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    "cart",
    JSON.stringify(items)
  );
};

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  image: string;

  variant: {
    cpu: string;
    ram: string;
    ssd: string;
    price: number;
  };

  quantity: number;
}

interface CartState {
  items: CartItem[];
}



const initialState: CartState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
    const item = action.payload;

    const existing = state.items.find(
      (i) =>
        i.productId === item.productId &&
        i.variant.cpu === item.variant.cpu &&
        i.variant.ram === item.variant.ram &&
        i.variant.ssd === item.variant.ssd
      );

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }

      saveCart(state.items);
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: string;
        cpu: string;
        ram: string;
        ssd: string;
      }>
    ) => {
      state.items = state.items.filter(
        (i) =>
          !(
            i.productId === action.payload.productId &&
            i.variant.cpu === action.payload.cpu &&
            i.variant.ram === action.payload.ram &&
            i.variant.ssd === action.payload.ssd
          )
      );
       saveCart(state.items);
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        cpu: string;
        ram: string;
        ssd: string;
      }>
    ) => {
      const item = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.variant.cpu === action.payload.cpu &&
          i.variant.ram === action.payload.ram &&
          i.variant.ssd === action.payload.ssd
      );

      if (item) {
        item.quantity += 1;
      }
       saveCart(state.items);
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        cpu: string;
        ram: string;
        ssd: string;
      }>
    ) => {
      const item = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.variant.cpu === action.payload.cpu &&
          i.variant.ram === action.payload.ram &&
          i.variant.ssd === action.payload.ssd
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
       saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
       saveCart([]);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;