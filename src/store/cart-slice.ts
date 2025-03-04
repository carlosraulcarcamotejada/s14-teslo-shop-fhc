import { ProductInCart } from "@/interfaces/cart/product-in-cart";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateCartSliceProps {
  cart: ProductInCart[];
}

const initialState: InitialStateCartSliceProps = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductInCart>) {
      const product = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
      );

      if (!product) {
        state.cart.push(action.payload);
      } else {
        product.quantity += action.payload.quantity;
      }
    },
  },
});

export const { addProduct } = cartSlice.actions;

export default cartSlice.reducer;
