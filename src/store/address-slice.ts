import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Address } from "@/components/checkout/checkout-address-form";

interface InitialStateAddressSliceProps {
  address: Address;
}

const initialState: InitialStateAddressSliceProps = {
  address: {
    address: "",
    address2: "",
    city: "",
    country: "",
    lastNames: "",
    mobilePhone: "",
    names: "",
    saveForm: false,
    zipCode: "",
  },
};

export const addressSlice = createSlice({
  name: "addressSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAddress(
      state,
      action: PayloadAction<InitialStateAddressSliceProps["address"]>
    ) {
      state.address = action.payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;

export default addressSlice.reducer;
