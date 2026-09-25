import React, { useState, useMemo } from "react";
import { SlidersHorizontal, AlertCircle, Sparkles, Shield, RotateCcw, ArrowRight, Mail } from "lucide-react";
import CategoryHero from "../CategoryHero/CategoryHero";
import FilterPanel from "../FilterPanel/FilterPanel";
import SortDropdown from "../SortDropdown/SortDropdown";
import ProductCard from "../ProductCard/ProductCard";
import "./CategoryPageLayout.css";

export default function CategoryPageLayout({ category }) {
  // State for subcategories, sorting, price, rating, brand, custom filters
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [sortValue, setSortValue] = useState("featured");
  const [selectedPriceRange, setSelectedPriceRange] = useState(250000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [customFilters, setCustomFilters] = useState({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  // Subcategory handler
  const handleSelectSubcategory = (sub) => {
    setSelectedSubcategory(sub);
  };

  // Custom filter attribute handler
  const handleSelectCustomFilter = (key, value) => {
    setCustomFilters((prev) => {
      const updated = { ...prev };
      if (!value) {
        delete updated[key];
      } else {
        updated[key] = value;
      }
      return updated;
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedSubcategory("All");
    setSelectedPriceRange(250000);
    setSelectedRating(0);
    setSelectedBrand(null);
    setCustomFilters({});
    setSortValue("featured");
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...(category.products || [])];

    // 1. Subcategory filter
    if (selectedSubcategory && selectedSubcategory !== "All") {
      list = list.filter((p) => {
        if (p.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase()) return true;
        if (p.gender?.toLowerCase() === selectedSubcategory.toLowerCase()) return true;
        if (p.room?.toLowerCase() === selectedSubcategory.toLowerCase()) return true;
        if (p.city?.toLowerCase() === selectedSubcategory.toLowerCase()) return true;
        return false;
      });
    }

    // 2. Price filter
    if (selectedPriceRange) {
      list = list.filter((p) => p.price <= selectedPriceRange);
    }

    // 3. Rating filter
    if (selectedRating > 0) {
      list = list.filter((p) => (p.rating || 0) >= selectedRating);
    }

    // 4. Brand filter
    if (selectedBrand) {
      list = list.filter((p) => (p.brand || p.provider || p.restaurant || p.author) === selectedBrand);
    }

    // 5. Custom filters
    Object.entries(customFilters).forEach(([key, val]) => {
      if (!val) return;
      list = list.filter((p) => {
        if (p[key] === val) return true;
        if (p.specs?.[key] === val) return true;
        if (Array.isArray(p[key]) && p[key].includes(val)) return true;
        return false;
      });
    });

    // 6. Sorting
    if (sortValue === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortValue === "rating") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortValue === "reviews") {
      list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    return list;
  }, [category.products, selectedSubcategory, selectedPriceRange, selectedRating, selectedBrand, customFilters, sortValue]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSent(true);
    }
  };

  return (
    <main className="nexora-category-page">
      {/* 1. Category Hero */}
      <CategoryHero category={category} />

      {/* 2. Compliance / Regulatory Banner if required (e.g. Healthcare) */}
      {category.complianceNotice && (
        <div className="category-compliance-bar">
          <div className="compliance-content">
            <Shield size={16} className="compliance-icon" />
            <span>{category.complianceNotice}</span>
          </div>
        </div>
      )}

      {/* 3. Subcategory Horizontal Pills Scroller */}
      {category.subcategories && category.subcategories.length > 1 && (
        <section className="category-subnav-section" aria-label="Subcategories">
          <div className="category-page-container">
            <div className="subnav-pills-row">
              {category.subcategories.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  className={`subnav-pill ${selectedSubcategory === sub ? "is-selected" : ""}`}
                  onClick={() => handleSelectSubcategory(sub)}
                  style={{
                    "--pill-accent": category.accentColor,
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Main Product Catalog & Filter Layout */}
      <section className="category-catalog-section">
        <div className="category-page-container">
          {/* Controls Bar: Results Count + Mobile Filter Trigger + Sort Dropdown */}
          <div className="catalog-controls-bar">
            <div className="catalog-count-wrap">
              <span className="catalog-count-number">{filteredProducts.length}</span>
              <span className="catalog-count-label">Items Curated</span>
            </div>

            <div className="catalog-actions-group">
              {/* Mobile Filter Trigger Button */}
              <button
                type="button"
                className="catalog-mobile-filter-btn"
                onClick={() => setIsMobileFilterOpen(true)}
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
              </button>

              {/* Sort Dropdown */}
              <SortDropdown sortValue={sortValue} onChangeSort={setSortValue} />
            </div>
          </div>

          {/* Active Filter Pills Bar (if filters applied) */}
          {(selectedSubcategory !== "All" || selectedBrand || selectedRating > 0 || Object.keys(customFilters).length > 0) && (
            <div className="active-filters-bar">
              <span className="active-filters-label">Active Filters:</span>
              <div className="active-filter-tags">
                {selectedSubcategory !== "All" && (
                  <span className="filter-tag">
                    {selectedSubcategory}
                    <button onClick={() => setSelectedSubcategory("All")}>×</button>
                  </span>
                )}
                {selectedBrand && (
                  <span className="filter-tag">
                    {selectedBrand}
                    <button onClick={() => setSelectedBrand(null)}>×</button>
                  </span>
                )}
                {selectedRating > 0 && (
                  <span className="filter-tag">
                    {selectedRating}+ Stars
                    <button onClick={() => setSelectedRating(0)}>×</button>
                  </span>
                )}
                {Object.entries(customFilters).map(([k, v]) => (
                  <span key={k} className="filter-tag">
                    {v}
                    <button onClick={() => handleSelectCustomFilter(k, null)}>×</button>
                  </span>
                ))}
                <button className="clear-all-tags-btn" onClick={handleResetFilters}>
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* Main Layout: Left Sidebar + Right Products Grid */}
          <div className="catalog-main-layout">
            {/* Filter Sidebar */}
            <FilterPanel
              category={category}
              selectedSubcategory={selectedSubcategory}
              onSelectSubcategory={handleSelectSubcategory}
              selectedPriceRange={selectedPriceRange}
              onChangePriceRange={setSelectedPriceRange}
              selectedRating={selectedRating}
              onChangeRating={setSelectedRating}
              selectedBrand={selectedBrand}
              onSelectBrand={setSelectedBrand}
              customFilters={customFilters}
              onSelectCustomFilter={handleSelectCustomFilter}
              onResetFilters={handleResetFilters}
              isOpenMobile={isMobileFilterOpen}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />

            {/* Products Grid Area */}
            <div className="catalog-products-col">
              {filteredProducts.length === 0 ? (
                <div className="catalog-empty-state">
                  <AlertCircle size={44} className="empty-icon" />
                  <h3>No items match your active filters</h3>
                  <p>Try broadening your price range or clearing selected attributes.</p>
                  <button className="empty-reset-btn" onClick={handleResetFilters}>
                    <RotateCcw size={14} />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              ) : (
                <div className="catalog-product-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      accentColor={category.accentColor}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Category Editorial Promotional Banners */}
      {category.promotions && category.promotions.length > 0 && (
        <section className="category-promotions-section">
          <div className="category-page-container">
            <div className="promotions-grid">
              {category.promotions.map((promo, idx) => (
                <div key={idx} className="promo-banner-card">
                  <img src={promo.image} alt={promo.heading} className="promo-image" loading="lazy" />
                  <div className="promo-overlay" />
                  <div className="promo-content">
                    <span className="promo-eyebrow">{promo.title}</span>
                    <h3 className="promo-heading">{promo.heading}</h3>
                    <p className="promo-desc">{promo.desc}</p>
                    <span className="promo-cta-link">
                      {promo.cta} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. VIP Category Newsletter Box */}
      <section className="category-newsletter-section">
        <div className="category-page-container">
          <div className="category-newsletter-box">
            <div className="newsletter-text">
              <span className="newsletter-eyebrow">THE NEXORA DISPATCH</span>
              <h3>Never miss an exclusive {category.shortTitle || category.name} drop.</h3>
              <p>Receive private invitations, early seasonal allocations, and masterclass briefings.</p>
            </div>

            {newsletterSent ? (
              <div className="newsletter-success-msg">
                <Sparkles size={16} />
                <span>You are on the VIP allocation register. Thank you.</span>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-submit-btn">
                  <span>Subscribe</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
