import React from "react";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, Star, ArrowUpRight, Zap, Check, Sparkles, Clock, MapPin, Trash2 } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { formatCurrency, calculateDiscount } from "../../utils/helpers";
import "./ProductCard.css";

export default function ProductCard({ product, accentColor = "#d4af37", showDelete = false }) {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useStore();
  const wishlisted = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  // Determine appropriate action button label based on category type
  const getActionLabel = () => {
    const type = product.categoryType || product.category;
    if (type === "courses") return "Enroll Now";
    if (type === "services") return "Book Service";
    if (type === "tickets") return "Select Tickets";
    if (type === "software") return "Start Free Trial";
    if (type === "digital-products") return "Download";
    if (type === "food") return "Add to Order";
    return "Add to Bag";
  };

  // Category specific spec snippet
  const getCategorySpec = () => {
    if (product.specs?.ram) return product.specs.ram;
    if (product.specs?.carat) return product.specs.carat;
    if (product.duration) return product.duration;
    if (product.deliveryTime) return `⚡ ${product.deliveryTime}`;
    if (product.city && product.date) return `📍 ${product.city}`;
    if (product.material) return product.material;
    if (product.freeTrial) return "14-Day Trial";
    if (product.isOrganic) return "100% Organic";
    return null;
  };

  const specBadge = getCategorySpec();

  return (
    <article
      className="nexora-product-card"
      style={{ "--card-accent": accentColor }}
    >
      {/* Product Image & Badges */}
      <div className="card-media">
        <Link href={`/product/${product.id}`} className="card-image-link" tabIndex={-1}>
          <img
            src={product.image}
            alt={product.name || product.title}
            className="card-image"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="card-badges-top">
          {product.tag && <span className="card-tag">{product.tag}</span>}
          {discount > 0 && <span className="card-discount">-{discount}%</span>}
        </div>

        {/* Wishlist Button / Delete Button */}
        {showDelete ? (
          <button
            type="button"
            className="card-wishlist-btn"
            onClick={handleWishlist}
            aria-label="Remove from wishlist"
            title="Remove from wishlist"
          >
            <Trash2 size={16} color="#fff" />
          </button>
        ) : (
          <button
            type="button"
            className={`card-wishlist-btn ${wishlisted ? "is-wishlisted" : ""}`}
            onClick={handleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={16} fill={wishlisted ? "#e08285" : "none"} color={wishlisted ? "#e08285" : "#fff"} />
          </button>
        )}

        {/* Quick View Floating Button */}
        <button
          type="button"
          className="card-quick-view-btn"
          onClick={handleQuickView}
          aria-label="Quick view product details"
        >
          <Eye size={15} />
          <span>Quick View</span>
        </button>

        {/* Category Spec Pill */}
        {specBadge && (
          <div className="card-spec-pill">
            <span>{specBadge}</span>
          </div>
        )}
      </div>

      {/* Product Information Body */}
      <div className="card-content">
        <div className="card-meta-row">
          <span className="card-brand">
            {product.brand || product.provider || product.restaurant || product.author || "NEXORA"}
          </span>
          {product.rating && (
            <div className="card-rating">
              <Star size={12} fill="#d4af37" color="#d4af37" />
              <span>{product.rating}</span>
              {product.reviews && <small>({product.reviews})</small>}
            </div>
          )}
        </div>

        <h3 className="card-title">
          <Link href={`/product/${product.id}`}>{product.name || product.title}</Link>
        </h3>

        {/* Price Row */}
        <div className="card-price-row">
          <div className="card-prices">
            <strong className="current-price">{formatCurrency(product.price)}</strong>
            {product.billingCycle && <span className="billing-cycle">/{product.billingCycle}</span>}
            {product.originalPrice && product.originalPrice > product.price && (
              <del className="original-price">{formatCurrency(product.originalPrice)}</del>
            )}
          </div>

          {/* Quick Action Button */}
          <button
            type="button"
            className="card-add-btn"
            onClick={handleAdd}
            aria-label={getActionLabel()}
          >
            <span>{getActionLabel()}</span>
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
