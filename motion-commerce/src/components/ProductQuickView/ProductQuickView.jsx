import React, { useState } from "react";
import Link from "next/link";
import { X, Heart, ShoppingBag, Star, ShieldCheck, Truck, ArrowRight, Check } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { formatCurrency, calculateDiscount } from "../../utils/helpers";
import "./ProductQuickView.css";

export default function ProductQuickView() {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      size: selectedSize || product.sizes?.[0],
      color: selectedColor || product.colors?.[0],
    });
    closeQuickView();
  };

  return (
    <div className="quickview-backdrop" onClick={closeQuickView} role="dialog" aria-modal="true">
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="quickview-close-btn" onClick={closeQuickView} aria-label="Close dialog">
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Left Media */}
          <div className="quickview-image-container">
            <img src={product.image} alt={product.name || product.title} className="quickview-image" />
            {product.tag && <span className="quickview-tag">{product.tag}</span>}
          </div>

          {/* Right Details */}
          <div className="quickview-body">
            <div className="quickview-brand-row">
              <span className="quickview-brand">{product.brand || product.provider || product.restaurant || "NEXORA"}</span>
              {product.rating && (
                <div className="quickview-rating">
                  <Star size={14} fill="#d4af37" color="#d4af37" />
                  <span>{product.rating}</span>
                  <small>({product.reviews || 48} reviews)</small>
                </div>
              )}
            </div>

            <h2 className="quickview-title">{product.name || product.title}</h2>

            <div className="quickview-price-box">
              <span className="quickview-price">{formatCurrency(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <del className="quickview-original">{formatCurrency(product.originalPrice)}</del>
              )}
              {discount > 0 && <span className="quickview-discount">{discount}% OFF</span>}
            </div>

            <p className="quickview-desc">{product.description}</p>

            {/* Sizes Selection if available */}
            {product.sizes && (
              <div className="quickview-option-group">
                <label className="quickview-option-label">Select Size</label>
                <div className="quickview-size-pills">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`size-pill ${(selectedSize || product.sizes[0]) === s ? "is-selected" : ""}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors Selection if available */}
            {product.colors && (
              <div className="quickview-option-group">
                <label className="quickview-option-label">Available Colorways</label>
                <div className="quickview-color-chips">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`color-chip ${(selectedColor || product.colors[0]) === c ? "is-selected" : ""}`}
                      onClick={() => setSelectedColor(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Specs if present */}
            {product.specs && (
              <div className="quickview-specs-box">
                {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                  <div key={key} className="spec-row">
                    <span className="spec-key">{key.toUpperCase()}:</span>
                    <strong className="spec-val">{val}</strong>
                  </div>
                ))}
              </div>
            )}

            {/* Actions: Quantity + Add + Wishlist */}
            <div className="quickview-actions">
              <div className="quickview-qty-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button className="quickview-add-btn" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                <span>Add to Bag • {formatCurrency(product.price * quantity)}</span>
              </button>

              <button
                className={`quickview-wish-btn ${wishlisted ? "is-wishlisted" : ""}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Save to Wishlist"
              >
                <Heart size={20} fill={wishlisted ? "#e08285" : "none"} color={wishlisted ? "#e08285" : "#fff"} />
              </button>
            </div>

            <div className="quickview-footer-link">
              <Link href={`/product/${product.id}`} onClick={closeQuickView}>
                View Complete Product Details <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
