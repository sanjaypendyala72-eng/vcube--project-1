"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Heart } from "lucide-react";
import { ALL_PRODUCTS } from "../../data";
import { useStore } from "../../context/StoreContext";
import { MotionReveal, StaggerContainer, StaggerItem } from "../../components/MotionComponents";

export default function NewArrivalsPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  // Curate latest drops / newly added luxury arrivals
  const newArrivals = useMemo(() => {
    return (ALL_PRODUCTS || []).slice(0, 16).map(p => ({
      ...p,
      badge: "JUST DROPPED"
    }));
  }, []);

  return (
    <main className="page" style={{ paddingTop: 100, maxWidth: 1280, margin: "0 auto", paddingBottom: 100 }}>
      <MotionReveal>
        <div className="pageHero" style={{ textAlign: "center", maxWidth: 740, margin: "0 auto 50px" }}>
          <span className="eyebrow" style={{ letterSpacing: "3px", color: "#d4af37", fontWeight: 700 }}>
            LATEST DROPS • 2026 CAPSULE
          </span>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 54px)", margin: "16px 0", color: "#fff" }}>
            New <i>Arrivals.</i>
          </h1>
          <p style={{ fontSize: 17, color: "#a1a1aa", lineHeight: 1.6, maxWidth: 580, margin: "0 auto" }}>
            Fresh expressions of craft, texture, and technical sophistication. Hand-selected additions to the NEXORA collection.
          </p>
        </div>
      </MotionReveal>

      {/* Grid of New Arrival Items */}
      <StaggerContainer className="products shopgrid" staggerInterval={50}>
        {newArrivals.map((product) => {
          const isWish = (wishlist || []).some(w => (w.id || w) === product.id);
          return (
            <StaggerItem key={product.id}>
              <article className="card">
                <div className="pimage">
                  <img loading="lazy" src={product.image} alt={product.name} />
                  <span className="tag" style={{ background: "rgba(10, 10, 14, 0.85)", border: "1px solid rgba(212,175,55,0.4)", color: "#ffd875" }}>
                    <Sparkles size={11} /> {product.badge}
                  </span>
                  <button
                    type="button"
                    className={"heart " + (isWish ? "liked" : "")}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    aria-label={isWish ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart size={17} fill={isWish ? "#ff4b72" : "none"} color={isWish ? "#ff4b72" : "#ffffff"} strokeWidth={2.2} />
                  </button>
                  <Link className="quick" href={`/product/${product.id}`}>
                    Quick view <ArrowUpRight size={15} />
                  </Link>
                </div>
                <div className="pbody">
                  <small>{product.brand || "NEXORA"} · {product.categoryName || product.category}</small>
                  <h3>{product.name}</h3>
                  <div className="rating">★★★★★ <span>{product.rating || "4.9"} ({product.reviews || 88})</span></div>
                  <div style={{ marginTop: 12 }}>
                    <button
                      className="add"
                      onClick={() => addToCart(product, 1)}
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      Add to Collection
                    </button>
                  </div>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </main>
  );
}
