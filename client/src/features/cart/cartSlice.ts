import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ProductType } from "../products/productSlice";

export type CartItem = {
  product: ProductType;
  quantity: number;
};

type SliceState = {
  cartQuantity: number;
  cartItems: CartItem[];
  isOpen: boolean;
};

export const initialStateCreator: () => SliceState = () => {
  let cartItems: CartItem[] = [];
  if (localStorage.getItem("cart/cartItems") === null) {
    localStorage.setItem("cart/cartItems", JSON.stringify(cartItems));
  } else {
    cartItems = JSON.parse(localStorage.getItem("cart/cartItems") as string);
  }

  let cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  let isOpen = false;

  return { cartQuantity, cartItems, isOpen };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCreator(),
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    incrementItemQuantity: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload;
      let result = [];
      if (
        state.cartItems.find((item) => item.product.id === product.id) == null
      ) {
        result = [...state.cartItems, { product, quantity: 1 }];
      } else {
        result = state.cartItems.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
      state.cartItems = result;
      state.cartQuantity = result.reduce(
        (quantity, item) => item.quantity + quantity,
        0
      );
      localStorage.setItem("cart/cartItems", JSON.stringify(result));
    },
    decrementItemQuantity: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload;
      let result = [];
      if (
        state.cartItems.find((item) => item.product.id === product.id)
          ?.quantity === 1
      ) {
        result = state.cartItems.filter(
          (item) => item.product.id !== product.id
        );
      } else {
        result = state.cartItems.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
      state.cartItems = result;
      state.cartQuantity = result.reduce(
        (quantity, item) => item.quantity + quantity,
        0
      );
      localStorage.setItem("cart/cartItems", JSON.stringify(result));
    },
    removeFromCart: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload;
      const result = state.cartItems.filter(
        (item) => item.product.id !== product.id
      );
      state.cartItems = result;
      state.cartQuantity = result.reduce(
        (quantity, item) => item.quantity + quantity,
        0
      );
      localStorage.setItem("cart/cartItems", JSON.stringify(result));
    },
  },
});

const selectCartItems = (state: RootState) => state.cart.cartItems;
const selectCartQuantity = (state: RootState) => state.cart.cartQuantity;
const selectIsOpen = (state: RootState) => state.cart.isOpen;
const getItemQuantity = (product: ProductType) => (state: RootState) => {
  return (
    state.cart.cartItems.find((item) => item.product.id === product.id)
      ?.quantity || 0
  );
};
const {
  toggleCart,
  incrementItemQuantity,
  decrementItemQuantity,
  removeFromCart,
} = cartSlice.actions;

export const selectors = { selectCartItems, selectCartQuantity, selectIsOpen };
export const actions = {
  toggleCart,
  incrementItemQuantity,
  decrementItemQuantity,
  removeFromCart,
};
export const helpers = { getItemQuantity };

export default cartSlice.reducer;
