import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductInCart } from "@/interfaces/cart/product-in-cart";
import { addProduct } from "@/store/cart-slice";

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const addProductToCart = (product: ProductInCart) => {
    dispatch(addProduct(product));
  };

  return {
    cart,
    addProductToCart,
  };
};
