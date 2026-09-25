"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Trash2, ArrowUpRight } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { QuantitySelector, ShineButton } from "../../components/MotionComponents";

export default function CartPage() {
  const { cart, setCart, removeFromCart, updateQuantity } = useStore();

  const total = (cart || []).reduce(
    (s, x) => s + (x.price || 0) * (x.quantity || x.qty || 1),
    0
  );
  const totalCount = (cart || []).reduce(
    (s, x) => s + (x.quantity || x.qty || 1),
    0
  );

  return (
    <main className="page">
      <div className="pageHero small">
        <span className="eyebrow">YOUR BAG</span>
        <h1>Cart <i>({totalCount})</i></h1>
      </div>

      {!cart || cart.length === 0 ? (
        <div className="empty">
          <ShoppingBag size={45} />
          <h2>Your cart is empty.</h2>
          <p>Discover products you'll love from our curated atelier collections.</p>
          <Link className="btn primary" href="/shop">Start shopping</Link>
        </div>
      ) : (
        <div className="cartLayout">
          <div className="cartItems">
            {cart.map((x) => {
              const itemQty = x.quantity || x.qty || 1;
              return (
                <div className="cartItem" key={x.cartItemId || x.id}>
                  <img src={x.image} alt={x.name} />
                  <div>
                    <small>{x.brand || "NEXORA"}</small>
                    <h3>{x.name}</h3>
                    <span>₹{x.price?.toLocaleString("en-IN")}</span>
                    <QuantitySelector
                      value={itemQty}
                      onChange={(newQty) => {
                        if (updateQuantity) {
                          updateQuantity(x.cartItemId || x.id, newQty);
                        } else {
                          setCart(
                            cart.map((y) =>
                              (y.cartItemId || y.id) === (x.cartItemId || x.id)
                                ? { ...y, quantity: newQty, qty: newQty }
                                : y
                            )
                          );
                        }
                      }}
                      min={1}
                    />
                  </div>
                  <button
                    className="remove"
                    onClick={() => {
                      if (removeFromCart) {
                        removeFromCart(x.cartItemId || x.id);
                      } else {
                        setCart(cart.filter((y) => (y.cartItemId || y.id) !== (x.cartItemId || x.id)));
                      }
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>

          <aside className="summary">
            <span className="eyebrow">SUMMARY</span>
            <h2>Ready when you are.</h2>
            <div><span>Subtotal</span><b>₹{total.toLocaleString("en-IN")}</b></div>
            <div><span>Shipping</span><b>Free Complimentary</b></div>
            <div className="total"><span>Total</span><b>₹{total.toLocaleString("en-IN")}</b></div>
            <Link href="/checkout" style={{ textDecoration: "none", display: "block", marginTop: "16px" }}>
              <ShineButton as="span" variant="primary" style={{ width: "100%" }}>
                Proceed to checkout <ArrowUpRight size={16} />
              </ShineButton>
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
