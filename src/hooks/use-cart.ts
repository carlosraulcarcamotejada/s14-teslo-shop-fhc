import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductInCart } from "@/interfaces/product-in-cart";
import {
  addProduct,
  clear,
  removeProduct,
  updateQuantity,
} from "@/store/cart-slice";

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cartStore.cart);

  const addProductToCart = (product: ProductInCart) => {
    dispatch(addProduct(product));
  };

  const updateCartProductQuantity = (
    id: string,
    selectedSize: string,
    quantity: number
  ) => {
    dispatch(updateQuantity({ id, selectedSize, quantity }));
  };

  const removeCartProduct = (productInCart: ProductInCart) => {
    dispatch(removeProduct(productInCart));
  };

  const clearCart = () => {
    dispatch(clear());
  };

  return {
    cart,
    addProductToCart,
    clearCart,
    removeCartProduct,
    updateCartProductQuantity,
  };
};
