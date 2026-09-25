import React, { createContext, useContext, useState, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // Cart state persisted to localStorage
  const [cart, setCart] = useLocalStorage("nexora-cart", []);
  
  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useLocalStorage("nexora-wish", []);

  // UI Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3200);
  };

  // Cart operations
  const addToCart = (product, quantity = 1, options = {}) => {
    setCart((prevCart) => {
      const itemKey = `${product.id}-${JSON.stringify(options)}`;
      const existingIndex = prevCart.findIndex(
        (item) => item.cartItemId === itemKey || (item.id === product.id && JSON.stringify(item.options || {}) === JSON.stringify(options))
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prevCart,
        {
          ...product,
          cartItemId: itemKey,
          quantity,
          options,
          addedAt: new Date().toISOString(),
        },
      ];
    });

    showToast(`Added "${product.name || product.title}" to bag`, "success");
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => (item.cartItemId || item.id) !== cartItemId));
    showToast("Item removed from bag", "info");
  };

  const updateCartQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.cartItemId || item.id) === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const id = product.id;
    const exists = wishlist.some((item) => (typeof item === "object" ? item.id === id : item === id));

    if (exists) {
      setWishlist((prev) => prev.filter((item) => (typeof item === "object" ? item.id !== id : item !== id)));
      showToast(`Removed from saved items`, "info");
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name || product.title}" to wishlist`, "success");
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => (typeof item === "object" ? item.id === productId : item === productId));
  };

  // Cart calculations
  const cartSummary = useMemo(() => {
    const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const subtotal = cart.reduce((total, item) => {
      const price = item.price || 0;
      return total + price * (item.quantity || 1);
    }, 0);

    // Free shipping threshold ₹4,999
    const isFreeShipping = subtotal >= 4999 || subtotal === 0;
    const shipping = isFreeShipping ? 0 : 250;
    const tax = Math.round(subtotal * 0.12); // 12% GST representation
    const total = subtotal + shipping + tax;

    // Detect item types in cart for adaptive checkout
    const hasPhysical = cart.some((i) => !["courses", "software", "digital-products", "services", "tickets", "food"].includes(i.categoryType || i.category));
    const hasDigital = cart.some((i) => ["digital-products", "software"].includes(i.categoryType || i.category));
    const hasCourses = cart.some((i) => (i.categoryType || i.category) === "courses");
    const hasServices = cart.some((i) => (i.categoryType || i.category) === "services");
    const hasTickets = cart.some((i) => (i.categoryType || i.category) === "tickets");
    const hasFood = cart.some((i) => (i.categoryType || i.category) === "food");

    return {
      itemCount,
      subtotal,
      shipping,
      tax,
      total,
      isFreeShipping,
      hasPhysical,
      hasDigital,
      hasCourses,
      hasServices,
      hasTickets,
      hasFood,
    };
  }, [cart]);

  // Quick view handlers
  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  // Search modal handlers
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  // Cart drawer handlers
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartSummary,
        isCartOpen,
        openCart,
        closeCart,
        isSearchOpen,
        openSearch,
        closeSearch,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        toast,
        showToast,
      }}
    >
      {children}
      {/* Toast notification component */}
      {toast && (
        <div className={`nexora-toast nexora-toast-${toast.type}`} role="status">
          <span className="toast-dot" />
          <span className="toast-message">{toast.message}</span>
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}

export default StoreContext;
