import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatCurrency } from "../utils/helpers";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, cartSummary } = useStore();

  if (cart.length === 0) {
    return (
      <main className="nexora-cart-page">
        <div className="cart-page-container">
          <div className="cart-empty-box">
            <ShoppingBag size={56} className="cart-empty-icon" />
            <h1>Your Shopping Bag is Empty</h1>
            <p>Explore our 20 curated category worlds to find something exceptional.</p>
            <Link to="/menus" className="cart-explore-btn">
              <span>Explore All Categories</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="nexora-cart-page">
      <div className="cart-page-container">
        <div className="cart-header">
          <span className="cart-eyebrow">YOUR SELECTIONS</span>
          <h1>Shopping Bag <i>({cartSummary.itemCount})</i></h1>
        </div>

        <div className="cart-layout-grid">
          {/* Left: Cart Items List */}
          <div className="cart-items-column">
            {cart.map((item) => (
              <div key={item.cartItemId || item.id} className="cart-item-card">
                <Link to={`/product/${item.id}`} className="cart-item-img-link">
                  <img src={item.image} alt={item.name || item.title} className="cart-item-img" />
                </Link>

                <div className="cart-item-details">
                  <div className="cart-item-top">
                    <span className="cart-item-brand">{item.brand || item.provider || item.restaurant || "NEXORA"}</span>
                    <button
                      type="button"
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.cartItemId || item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h3 className="cart-item-title">
                    <Link to={`/product/${item.id}`}>{item.name || item.title}</Link>
                  </h3>

                  {item.options && (
                    <div className="cart-item-options">
                      {item.options.size && <span>Size: <b>{item.options.size}</b></span>}
                      {item.options.color && <span>Color: <b>{item.options.color}</b></span>}
                    </div>
                  )}

                  <div className="cart-item-bottom">
                    <div className="cart-qty-stepper">
                      <button onClick={() => updateCartQuantity(item.cartItemId || item.id, item.quantity - 1)}>
                        <Minus size={13} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.cartItemId || item.id, item.quantity + 1)}>
                        <Plus size={13} />
                      </button>
                    </div>

                    <div className="cart-item-price-col">
                      <strong>{formatCurrency(item.price * item.quantity)}</strong>
                      {item.quantity > 1 && (
                        <small>{formatCurrency(item.price)} each</small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary Aside */}
          <aside className="cart-summary-aside">
            <div className="cart-summary-card">
              <span className="summary-eyebrow">ORDER SUMMARY</span>
              <h3>Order Total</h3>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <strong>{formatCurrency(cartSummary.subtotal)}</strong>
                </div>

                <div className="summary-row">
                  <span>Estimated Shipping</span>
                  {cartSummary.shipping === 0 ? (
                    <strong className="text-gold">COMPLIMENTARY</strong>
                  ) : (
                    <strong>{formatCurrency(cartSummary.shipping)}</strong>
                  )}
                </div>

                <div className="summary-row">
                  <span>Estimated GST (12%)</span>
                  <strong>{formatCurrency(cartSummary.tax)}</strong>
                </div>

                <div className="summary-divider" />

                <div className="summary-row total-row">
                  <span>Estimated Total</span>
                  <strong className="total-amount">{formatCurrency(cartSummary.total)}</strong>
                </div>
              </div>

              {cartSummary.subtotal < 4999 && (
                <div className="free-shipping-progress">
                  <span>Add <b>{formatCurrency(4999 - cartSummary.subtotal)}</b> more for Free Express Delivery</span>
                  <div className="progress-track">
                    <div className="progress-bar" style={{ width: `${Math.min(100, (cartSummary.subtotal / 4999) * 100)}%` }} />
                  </div>
                </div>
              )}

              <Link to="/checkout" className="cart-checkout-btn">
                <span>Proceed to Adaptive Checkout</span>
                <ArrowRight size={16} />
              </Link>

              <div className="cart-security-badge">
                <ShieldCheck size={16} />
                <span>256-Bit SSL Encrypted & Secure Checkout</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
