import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

export default function WishlistButton({ count = 0 }) {
  const [pulsing, setPulsing] = useState(false);
  const [prevCount, setPrevCount] = useState(count);
  const router = useRouter();

  // Trigger one subtle pulse and ring ripple when count increases
  useEffect(() => {
    if (count > prevCount && count > 0) {
      setPulsing(true);
      const timer = setTimeout(() => setPulsing(false), 800);
      setPrevCount(count);
      return () => clearTimeout(timer);
    }
    setPrevCount(count);
  }, [count, prevCount]);

  const handleClick = () => {
    router.push("/wishlist");
  };

  return (
    <button
      className={`header-action-btn wishlist-motion-btn ${pulsing ? "is-pulsing" : ""}`}
      onClick={handleClick}
      aria-label={`View Wishlist, ${count} saved items`}
      style={{ "--stagger-delay": "880ms" }}
    >
      <div className="btn-icon-wrapper">
        <Heart
          size={19}
          className={`wishlist-heart-svg ${count > 0 ? "has-items" : ""}`}
        />
        {/* Particle/Ring ripple aura on product add */}
        <span className="heart-ripple-ring" aria-hidden="true" />
      </div>

      {count > 0 && (
        <span className="header-badge wishlist-badge" aria-hidden="true">
          {count}
        </span>
      )}
    </button>
  );
}
