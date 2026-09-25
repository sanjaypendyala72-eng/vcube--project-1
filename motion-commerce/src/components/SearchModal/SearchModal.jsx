import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight, Sparkles, ShoppingBag } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { searchProducts } from "../../data";
import { formatCurrency } from "../../utils/helpers";
import "./SearchModal.css";

export default function SearchModal() {
  const { isSearchOpen, closeSearch, addToCart } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else {
          // Open search from store
          const event = new CustomEvent("open-global-search");
          window.dispatchEvent(event);
        }
      }
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const results = searchProducts(query);

  const popularSearches = [
    "Running Shoes", "Trench Coat", "Python Course", "Wagyu Burger", "4K Dashcam",
    "Tourbillon Watch", "Mechanical Keyboard", "Figma Design System", "A2 Ghee", "OLED Monitor"
  ];

  return (
    <div className="search-modal-backdrop" onClick={closeSearch} role="dialog" aria-modal="true">
      <div className="search-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={20} className="search-icon-lens" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search across all 20 categories (e.g. 'laptop', 'running shoes', 'python course')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-main-input"
          />
          {query && (
            <button className="search-clear-btn" onClick={() => setQuery("")} aria-label="Clear query">
              <X size={16} />
            </button>
          )}
          <button className="search-close-key" onClick={closeSearch}>
            ESC
          </button>
        </div>

        {/* Popular searches suggestions if query is empty */}
        {!query.trim() && (
          <div className="search-suggestions-box">
            <span className="suggestions-title">Trending Across NEXORA</span>
            <div className="popular-tags-row">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="popular-tag-pill"
                  onClick={() => setQuery(tag)}
                >
                  <Sparkles size={11} />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() && (
          <div className="search-results-container">
            <div className="search-results-meta">
              <span>{results.length} results found for "{query}"</span>
            </div>

            {results.length === 0 ? (
              <div className="search-empty-state">
                <p>No products found matching "{query}" across any category.</p>
                <small>Try searching for brand names, materials, specs, or broader terms.</small>
              </div>
            ) : (
              <div className="search-results-list">
                {results.slice(0, 10).map((product) => (
                  <div key={product.id} className="search-result-item">
                    <Link
                      href={`/product/${product.id}`}
                      className="search-item-link"
                      onClick={closeSearch}
                    >
                      <img src={product.image} alt={product.name || product.title} className="search-item-thumb" />
                      <div className="search-item-info">
                        <div className="search-item-cat-badge">
                          {product.categoryName} {product.subcategory && `› ${product.subcategory}`}
                        </div>
                        <h4 className="search-item-name">{product.name || product.title}</h4>
                        <span className="search-item-brand">{product.brand || product.provider || product.restaurant || product.author}</span>
                      </div>
                    </Link>

                    <div className="search-item-action">
                      <strong className="search-item-price">{formatCurrency(product.price)}</strong>
                      <button
                        type="button"
                        className="search-item-add"
                        onClick={() => {
                          addToCart(product, 1);
                          closeSearch();
                        }}
                        aria-label="Add to bag"
                      >
                        <ShoppingBag size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
