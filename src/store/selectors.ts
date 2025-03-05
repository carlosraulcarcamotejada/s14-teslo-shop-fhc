import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectCart = (state: RootState) => state.cart.cart;

export const selectTotalItems = createSelector(selectCart, (cart) =>
  cart.reduce((accum, currVal) => accum + currVal.quantity, 0)
);
