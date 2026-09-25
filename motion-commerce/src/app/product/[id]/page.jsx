"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import { ALL_PRODUCTS } from "../../../data";
import { useStore } from "../../../context/StoreContext";
import {
  MotionReveal,
  QuantitySelector,
  ShineButton,
} from "../../../components/MotionComponents";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;
  const p = ALL_PRODUCTS.find((x) => String(x.id) === String(id)) || ALL_PRODUCTS[0];

  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(p?.image);
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const isWish = p ? (wishlist || []).includes(p.id) : false;
  const oldPrice = p?.originalPrice || p?.old || Math.round((p?.price || 1000) * 1.25);

  if (!p) {
    return (
      <main className="page">
        <div className="empty">
          <h2>Product not found.</h2>
          <Link className="btn primary" href="/shop">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const images = p.images && p.images.length > 0 ? p.images : [p.image];

  return (
    <main className="page">
      <div className="detail">
        <MotionReveal className="gallery" direction="none">
          <div className="mainimg" style={{ overflow: "hidden", position: "relative" }}>
            <img
              key={img}
              src={img || p.image}
              alt={p.name}
              style={{
                transition: "transform 400ms var(--ease-smooth)",
              }}
            />
          </div>
          <div className="thumbs">
            {images.slice(0, 4).map((x, i) => (
              <button
                className={(img || p.image) === x ? "active" : ""}
                onClick={() => setImg(x)}
                key={i}
              >
                <img src={x} alt="" />
              </button>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal className="detailInfo" delay={80} direction="up" distance={25}>
          <span className="eyebrow">{p.brand} / {p.categoryName || p.category}</span>
          <h1>{p.name}</h1>
          <div className="rating">★★★★★ <span>{p.rating || 4.9} · {p.reviews || 84} reviews</span></div>
          <div className="bigprice">
            ₹{p.price?.toLocaleString("en-IN")}{" "}
            <del>₹{oldPrice.toLocaleString("en-IN")}</del>
          </div>
          <p className="desc">
            {p.description ||
              "A refined everyday essential with thoughtful details, premium materials and a silhouette designed to stay relevant beyond the season."}
          </p>

          <div className="buyrow">
            <QuantitySelector value={qty} onChange={setQty} min={1} max={10} />
            <ShineButton
              variant="primary"
              className="wide"
              onClick={() => addToCart(p, qty)}
            >
              Add to cart <ShoppingBag size={18} />
            </ShineButton>
            <button
              type="button"
              className={`wishBig ${isWish ? "liked is-active" : ""}`}
              onClick={() => toggleWishlist(p.id)}
              aria-label="Wishlist"
            >
              <Heart
                size={21}
                fill={isWish ? "#ff4b72" : "none"}
                color={isWish ? "#ff4b72" : "currentColor"}
                strokeWidth={2.2}
              />
            </button>
          </div>

          <div className="detailsList">
            <div><span>Delivery</span><b>Free express courier · 2–4 days</b></div>
            <div><span>Returns</span><b>30-day effortless doorstep return</b></div>
            <div><span>Authentication</span><b>100% atelier verified</b></div>
          </div>
        </MotionReveal>
      </div>
    </main>
  );
}
