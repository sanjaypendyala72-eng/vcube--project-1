"use client";

import React from "react";
import Link from "next/link";
import { Heart, Trash2, ArrowUpRight, Plus } from "lucide-react";
import { ALL_PRODUCTS } from "../../data";
import { useStore } from "../../context/StoreContext";
import { StaggerContainer, StaggerItem } from "../../components/MotionComponents";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, clearWishlist } = useStore();
  const savedItems = ALL_PRODUCTS.filter((p) => (wishlist || []).includes(p.id));

  return (
    <main className="page">
      <div
        className="pageHero small"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <span className="eyebrow">SAVED FOR LATER</span>
          <h1>Your <i>wishlist ({savedItems.length})</i></h1>
          <p>Your curated shortlist of favorite luxury pieces and everyday essentials.</p>
        </div>
        {savedItems.length > 0 && (
          <button
            type="button"
            className="wishlist-clear-btn"
            onClick={() => {
              if (window.confirm("Remove all saved items from wishlist?")) {
                if (clearWishlist) clearWishlist();
                else savedItems.forEach((x) => toggleWishlist(x));
              }
            }}
            title="Clear all saved items"
          >
            <Trash2 size={16} />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {savedItems.length ? (
        <StaggerContainer className="products" staggerInterval={75}>
          {savedItems.map((p) => (
            <StaggerItem key={p.id}>
              <div className="wishlist-card-wrapper">
                <ProductCard product={p} showDelete={true} />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="empty">
          <Heart size={48} color="#d4af37" />
          <h2>Your wishlist is empty.</h2>
          <p>Tap the heart icon on any product to save your favorites here.</p>
          <Link className="btn primary" href="/shop">
            Explore Collection <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </main>
  );
}
