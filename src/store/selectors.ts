import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectCart = (state: RootState) => state.cart.cart;

export const selectTotalItems = createSelector(selectCart, (cart) =>
  cart.reduce((accum, currVal) => accum + currVal.quantity, 0)
);

export const selectSumaryInfomation = createSelector(selectCart, (cart) => {
  const subTotal = cart.reduce(
    (accum, currVal) => accum + currVal.quantity * currVal.price,
    0
  );
  const tax = subTotal * 0.15;
  const total = subTotal + tax;
  return { subTotal, tax, total };
});
