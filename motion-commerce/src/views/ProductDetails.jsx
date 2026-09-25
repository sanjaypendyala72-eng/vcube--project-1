import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { getProduct, ALL_PRODUCTS } from "../data";
import { useStore } from "../context/StoreContext";
import { formatCurrency, calculateDiscount } from "../utils/helpers";
import ProductCard from "../components/ProductCard/ProductCard";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id: rawId } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const numericId = Number(rawId);
  const product = getProduct(isNaN(numericId) ? rawId : numericId) || ALL_PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-not-found-wrap">
        <h2>Product not found</h2>
        <Link to="/menus" className="btn-back">Browse All Menus</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.originalPrice);

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      size: selectedSize,
      color: selectedColor,
    });
  };

  // Related products from the same category
  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  return (
    <main className="nexora-product-details-page">
      <div className="product-details-container">
        {/* Breadcrumb */}
        <nav className="pdp-breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/${product.categorySlug}`}>{product.categoryName || "Category"}</Link>
          <span>/</span>
          <span className="current">{product.name || product.title}</span>
        </nav>

        {/* Main Grid */}
        <div className="pdp-main-grid">
          {/* Left: Gallery */}
          <div className="pdp-gallery-col">
            <div className="pdp-main-image-frame">
              <img src={selectedImage || product.image} alt={product.name || product.title} className="pdp-hero-image" />
              {product.tag && <span className="pdp-floating-tag">{product.tag}</span>}
              {discount > 0 && <span className="pdp-floating-discount">{discount}% OFF</span>}
            </div>

            {imagesList.length > 1 && (
              <div className="pdp-thumbnails-strip">
                {imagesList.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`pdp-thumb-btn ${selectedImage === img ? "is-active" : ""}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="pdp-info-col">
            <div className="pdp-brand-row">
              <span className="pdp-brand-title">{product.brand || product.provider || product.restaurant || product.author || "NEXORA"}</span>
              {product.rating && (
                <div className="pdp-rating-badge">
                  <Star size={14} fill="#d4af37" color="#d4af37" />
                  <strong>{product.rating}</strong>
                  <span>({product.reviews || 84} reviews)</span>
                </div>
              )}
            </div>

            <h1 className="pdp-title">{product.name || product.title}</h1>

            <div className="pdp-price-row">
              <strong className="pdp-price">{formatCurrency(product.price)}</strong>
              {product.billingCycle && <span className="pdp-billing">/{product.billingCycle}</span>}
              {product.originalPrice && product.originalPrice > product.price && (
                <del className="pdp-original-price">{formatCurrency(product.originalPrice)}</del>
              )}
              {discount > 0 && <span className="pdp-discount-badge">{discount}% OFF</span>}
            </div>

            <p className="pdp-description">{product.description}</p>

            {/* Size Selector */}
            {product.sizes && (
              <div className="pdp-option-section">
                <div className="option-title-row">
                  <label>Select Size / Option</label>
                </div>
                <div className="pdp-sizes-list">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`pdp-size-btn ${selectedSize === s ? "is-selected" : ""}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && (
              <div className="pdp-option-section">
                <div className="option-title-row">
                  <label>Colorway</label>
                  <small>{selectedColor || product.colors[0]}</small>
                </div>
                <div className="pdp-colors-list">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`pdp-color-chip ${selectedColor === c ? "is-selected" : ""}`}
                      onClick={() => setSelectedColor(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Seat Tiers for Tickets */}
            {product.seatTiers && (
              <div className="pdp-option-section">
                <label>Select Experience Tier</label>
                <div className="pdp-tiers-list">
                  {product.seatTiers.map((t) => (
                    <div key={t.tier} className="pdp-tier-card">
                      <div>
                        <strong>{t.tier}</strong>
                        <span className="tier-price">{formatCurrency(t.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pdp-actions-row">
              <div className="pdp-qty-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button type="button" className="pdp-add-to-bag-btn" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                <span>Add to Bag • {formatCurrency(product.price * quantity)}</span>
              </button>

              <button
                type="button"
                className={`pdp-wishlist-action ${wishlisted ? "is-wishlisted" : ""}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
              >
                <Heart size={20} fill={wishlisted ? "#e08285" : "none"} color={wishlisted ? "#e08285" : "#fff"} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pdp-trust-strip">
              <div className="trust-item">
                <Truck size={18} className="trust-icon" />
                <div>
                  <strong>Complimentary Express Delivery</strong>
                  <p>On all orders above ₹4,999</p>
                </div>
              </div>
              <div className="trust-item">
                <ShieldCheck size={18} className="trust-icon" />
                <div>
                  <strong>Authenticity & Warranty Guaranteed</strong>
                  <p>100% verified original merchandise</p>
                </div>
              </div>
              <div className="trust-item">
                <RotateCcw size={18} className="trust-icon" />
                <div>
                  <strong>Hassle-Free Returns</strong>
                  <p>30-day effortless return window</p>
                </div>
              </div>
            </div>

            {/* Specifications Details Table */}
            {product.specs && (
              <div className="pdp-specs-section">
                <h3 className="specs-heading">Technical Specifications & Details</h3>
                <div className="specs-table">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="specs-table-row">
                      <span className="spec-label">{key.replace(/([A-Z])/g, " $1").toUpperCase()}</span>
                      <span className="spec-value">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pdp-related-section">
            <div className="related-header">
              <span className="related-eyebrow">CURATED RECOMMENDATIONS</span>
              <h2>Complete Your Experience</h2>
            </div>
            <div className="related-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
