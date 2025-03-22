import { ProductInCart } from "@/interfaces/product-in-cart";
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
      const productFound = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
      );

      if (!productFound) {
        state.cart.push(action.payload);
      } else {
        productFound.quantity += action.payload.quantity;
      }
    },

    updateQuantity(
      state,
      action: PayloadAction<{
        id: string;
        selectedSize: string;
        quantity: number;
      }>
    ) {
      const { id, selectedSize, quantity } = action.payload;

      const productFound = state.cart.find(
        (itemCart: ProductInCart) =>
          itemCart.id === id && itemCart.selectedSize === selectedSize
      );

      if (productFound) {
        // Reemplazar la cantidad en lugar de sumarla nuevamente
        productFound.quantity = quantity > 0 ? quantity : 0;
      }
    },
    removeProduct(state, action: PayloadAction<ProductInCart>) {
      const { id, selectedSize } = action.payload;
      state.cart = state.cart.filter(
        (itemCart: ProductInCart) =>
          !(itemCart.id === id && itemCart.selectedSize === selectedSize)
      );
    },
    clear(state) {
      state.cart = [];
    },
  },
});

export const { addProduct, clear, removeProduct, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
