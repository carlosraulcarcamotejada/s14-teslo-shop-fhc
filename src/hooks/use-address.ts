import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clear, setAddress } from "@/store/address-slice";
import { Address } from "@/interfaces/address";

export const useAddress = () => {
  const dispatch = useDispatch();
  const address: Address = useSelector(
    (state: RootState) => state.addressStore.address
  );

  const clearAddress = () => {
    dispatch(clear());
  };

  const setCheckoutAddress = (address: Address) => {
    dispatch(setAddress(address));
  };

  return {
    address,
    clearAddress,
    setCheckoutAddress,
  };
};
