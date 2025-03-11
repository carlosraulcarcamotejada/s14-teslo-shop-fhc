import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductInCart } from "@/interfaces/cart/product-in-cart";
import { addProduct, removeProduct, updateQuantity } from "@/store/cart-slice";

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

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

  return {
    cart,
    addProductToCart,
    removeCartProduct,
    updateCartProductQuantity,
  };
};
