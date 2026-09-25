import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";

export default function CartButton({ count = 0, onClick }) {
  const [pulsing, setPulsing] = useState(false);
  const [prevCount, setPrevCount] = useState(count);

  useEffect(() => {
    if (count > prevCount && count > 0) {
      setPulsing(true);
      const timer = setTimeout(() => setPulsing(false), 750);
      setPrevCount(count);
      return () => clearTimeout(timer);
    }
    setPrevCount(count);
  }, [count, prevCount]);

  return (
    <button
      className={`header-action-btn cart-motion-btn ${pulsing ? "is-pulsing" : ""}`}
      onClick={onClick}
      aria-label={`Open Shopping Cart, ${count} items`}
      style={{ "--stagger-delay": "1040ms" }}
    >
      <div className="btn-icon-wrapper">
        <ShoppingBag size={19} className="cart-icon-svg" />
        <span className="cart-pulse-ring" aria-hidden="true" />
      </div>

      {count > 0 && (
        <span className="header-badge cart-badge" aria-hidden="true">
          {count}
        </span>
      )}
    </button>
  );
}
