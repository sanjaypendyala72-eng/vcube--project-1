import React, { useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function CartDrawer({
  isOpen,
  onClose,
  cart = []
}) {
  const { updateCartQuantity, removeFromCart } = useStore();
  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || item.qty || 1), 0);
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || item.qty || 1), 0);

  const updateQty = (id, delta) => {
    const item = cart.find(x => (x.cartItemId || x.id) === id);
    if (!item) return;
    const currentQty = item.quantity || item.qty || 1;
    updateCartQuantity(id, currentQty + delta);
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  return (
    <div
      className={`cart-drawer-portal ${isOpen ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      {/* Translucent Backdrop Overlay with Fade */}
      <div
        className="cart-drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer (translateX(100%) -> translateX(0)) */}
      <aside className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} className="text-gold" />
            <h3>Your Bag</h3>
            <span className="cart-count-tag">({itemCount})</span>
          </div>
          <button
            type="button"
            className="cart-drawer-close"
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            <X size={19} />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="cart-shipping-banner">
          <div className="shipping-info-text">
            {total >= 5000 ? (
              <span className="shipping-qualified">
                <Sparkles size={12} /> You've unlocked Complimentary Express Delivery!
              </span>
            ) : (
              <span>
                Add <b>₹{(5000 - total).toLocaleString("en-IN")}</b> more for Complimentary Express
              </span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div
              className="shipping-progress-fill"
              style={{ width: `${Math.min(100, (total / 5000) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-drawer-items">
          {cart.length === 0 ? (
            <div className="cart-empty-view">
              <div className="empty-icon-circle">
                <ShoppingBag size={36} />
              </div>
              <h4>Your bag is currently empty</h4>
              <p>Discover our newest curated essentials and iconic pieces.</p>
              <Link
                href="/shop"
                className="cart-empty-btn"
                onClick={onClose}
              >
                Explore Collection <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="cart-items-scroll">
              {cart.map((item) => (
                <div className="cart-drawer-item-card" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-thumbnail"
                  />
                  <div className="cart-item-info">
                    <span className="cart-item-brand">{item.brand}</span>
                    <h5 className="cart-item-name">{item.name}</h5>
                    <div className="cart-item-pricing">
                      <span className="cart-item-price">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="cart-item-actions">
                      <div className="cart-qty-pill">
                        <button
                          type="button"
                          onClick={() => updateQty(item.cartItemId || item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span>{item.quantity || item.qty || 1}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.cartItemId || item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-item-remove"
                        onClick={() => removeItem(item.cartItemId || item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Summary Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-footer-row">
              <span>Subtotal</span>
              <strong className="cart-total-value">
                ₹{total.toLocaleString("en-IN")}
              </strong>
            </div>
            <div className="cart-footer-note">
              <ShieldCheck size={13} />
              <span>Complimentary Returns & Authenticity Guaranteed</span>
            </div>

            <div className="cart-checkout-actions">
              <Link
                href="/checkout"
                className="cart-checkout-btn"
                onClick={onClose}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/cart"
                className="cart-viewbag-link"
                onClick={onClose}
              >
                View Full Bag Details
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
