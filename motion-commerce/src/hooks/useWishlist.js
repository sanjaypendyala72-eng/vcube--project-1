import { useStore } from "../context/StoreContext";

export function useWishlist() {
  const { wishlist, toggleWishlist, isInWishlist } = useStore();

  return {
    wishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount: wishlist.length,
  };
}

export default useWishlist;
