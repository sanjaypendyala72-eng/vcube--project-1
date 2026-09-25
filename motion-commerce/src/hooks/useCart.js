import { useStore } from "../context/StoreContext";

export function useCart() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSummary,
    isCartOpen,
    openCart,
    closeCart,
  } = useStore();

  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSummary,
    isCartOpen,
    openCart,
    closeCart,
  };
}

export default useCart;
