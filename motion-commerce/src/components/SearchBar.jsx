import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Clock, Flame, ArrowUpRight, Sparkles } from "lucide-react";

const RECENT_SEARCHES = [
  "men shoes",
  "women dress",
  "smart watch",
  "leather bag",
  "minimal chrono"
];

const TRENDING_KEYWORDS = [
  "Summer Collection",
  "New Arrivals",
  "Best Sellers",
  "Silk Essentials"
];

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const router = useRouter();

  const navigateTo = (url) => {
    router.push(url);
  };

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    }
  }, [isOpen]);

  // Handle outside click to close
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (!query.trim()) {
          setIsOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      navigateTo(`/shop?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleSelectQuery = (text) => {
    setQuery(text);
    navigateTo(`/shop?search=${encodeURIComponent(text)}`);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`search-motion-container ${isOpen ? "is-expanded" : ""} ${isHovered ? "is-hovered" : ""}`}
      style={{ "--stagger-delay": "800ms" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Aura ring on hover */}
      <div className="search-glow-aura" aria-hidden="true" />

      {/* Main Bar Form */}
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="search-trigger-btn"
          aria-label={isOpen ? "Execute search" : "Open product search"}
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true);
            } else if (query.trim()) {
              handleSubmit();
            }
          }}
        >
          <Search size={18} className="search-icon-svg" />
        </button>

        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="search-input-field"
            placeholder="Search products, brands & collections…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            aria-label="Search products, brands & collections"
          />
        </div>

        {/* Clear / Close Button */}
        {isOpen && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => {
              if (query) {
                setQuery("");
                inputRef.current?.focus();
              } else {
                setIsOpen(false);
              }
            }}
            aria-label="Close search"
          >
            <X size={15} />
          </button>
        )}
      </form>

      {/* Luxury Autocomplete / Recent Searches Dropdown Panel */}
      {isOpen && (
        <div className="search-results-dropdown">
          <div className="search-dropdown-inner">
            <div className="search-recent-section">
              <div className="search-sec-head">
                <span className="search-sec-title">
                  <Clock size={12} className="text-gold" /> RECENT SEARCHES
                </span>
                <button
                  type="button"
                  className="search-clear-all"
                  onClick={() => setQuery("")}
                >
                  Clear
                </button>
              </div>
              <ul className="search-recent-list">
                {RECENT_SEARCHES.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="search-suggestion-btn"
                      onClick={() => handleSelectQuery(item)}
                    >
                      <Clock size={13} className="suggestion-icon" />
                      <span>{item}</span>
                      <ArrowUpRight size={13} className="suggestion-arrow" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="search-trending-section">
              <div className="search-sec-head">
                <span className="search-sec-title">
                  <Flame size={12} className="text-gold" /> TRENDING NOW
                </span>
              </div>
              <div className="search-trending-chips">
                {TRENDING_KEYWORDS.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    className="trending-chip-btn"
                    onClick={() => handleSelectQuery(kw)}
                  >
                    <Sparkles size={11} className="chip-sparkle" />
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
