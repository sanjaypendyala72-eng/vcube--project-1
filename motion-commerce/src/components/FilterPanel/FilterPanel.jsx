import React from "react";
import { X, SlidersHorizontal, RotateCcw, Check } from "lucide-react";
import { formatCurrency } from "../../utils/helpers";
import "./FilterPanel.css";

export default function FilterPanel({
  category,
  selectedSubcategory,
  onSelectSubcategory,
  selectedPriceRange,
  onChangePriceRange,
  selectedRating,
  onChangeRating,
  selectedBrand,
  onSelectBrand,
  customFilters = {},
  onSelectCustomFilter,
  onResetFilters,
  isOpenMobile,
  onCloseMobile,
}) {
  const filterOptions = category.filterOptions || {};

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div className="filter-drawer-backdrop" onClick={onCloseMobile} aria-hidden="true" />
      )}

      <aside className={`nexora-filter-panel ${isOpenMobile ? "is-open-mobile" : ""}`}>
        {/* Header */}
        <div className="filter-panel-header">
          <div className="filter-header-title">
            <SlidersHorizontal size={16} />
            <span>Refine Search</span>
          </div>

          <button type="button" className="filter-reset-btn" onClick={onResetFilters}>
            <RotateCcw size={12} />
            <span>Reset All</span>
          </button>

          {/* Mobile close */}
          <button type="button" className="filter-mobile-close" onClick={onCloseMobile} aria-label="Close filters">
            <X size={18} />
          </button>
        </div>

        {/* Subcategories Facet */}
        {category.subcategories && category.subcategories.length > 1 && (
          <div className="filter-group">
            <h4 className="filter-group-title">Category World</h4>
            <div className="filter-list">
              {category.subcategories.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  className={`filter-item-btn ${selectedSubcategory === sub ? "is-active" : ""}`}
                  onClick={() => onSelectSubcategory(sub)}
                >
                  <span className="filter-item-text">{sub}</span>
                  {selectedSubcategory === sub && <Check size={14} className="filter-check" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price Slider / Ranges */}
        <div className="filter-group">
          <h4 className="filter-group-title">Price Range</h4>
          <div className="filter-price-slider">
            <input
              type="range"
              min="0"
              max="250000"
              step="1000"
              value={selectedPriceRange || 250000}
              onChange={(e) => onChangePriceRange(Number(e.target.value))}
              className="price-range-input"
            />
            <div className="price-labels-row">
              <span>Up to</span>
              <strong>{formatCurrency(selectedPriceRange || 250000)}</strong>
            </div>
          </div>
        </div>

        {/* Ratings Filter */}
        <div className="filter-group">
          <h4 className="filter-group-title">Minimum Rating</h4>
          <div className="filter-rating-options">
            {[4.8, 4.5, 4.0, 0].map((star) => (
              <button
                key={star}
                type="button"
                className={`rating-pill-btn ${selectedRating === star ? "is-active" : ""}`}
                onClick={() => onChangeRating(star)}
              >
                {star > 0 ? `★ ${star}+ Stars` : "All Ratings"}
              </button>
            ))}
          </div>
        </div>

        {/* Brands or Providers if present */}
        {filterOptions.brands && (
          <div className="filter-group">
            <h4 className="filter-group-title">Brand & Atelier</h4>
            <div className="filter-list">
              <button
                type="button"
                className={`filter-item-btn ${!selectedBrand ? "is-active" : ""}`}
                onClick={() => onSelectBrand(null)}
              >
                <span className="filter-item-text">All Brands</span>
                {!selectedBrand && <Check size={14} className="filter-check" />}
              </button>
              {filterOptions.brands.map((b) => (
                <button
                  key={b}
                  type="button"
                  className={`filter-item-btn ${selectedBrand === b ? "is-active" : ""}`}
                  onClick={() => onSelectBrand(b)}
                >
                  <span className="filter-item-text">{b}</span>
                  {selectedBrand === b && <Check size={14} className="filter-check" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Specific Custom Attributes */}
        {Object.entries(filterOptions).map(([key, options]) => {
          if (["brands"].includes(key) || !Array.isArray(options)) return null;
          const displayTitle = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

          return (
            <div key={key} className="filter-group">
              <h4 className="filter-group-title">{displayTitle}</h4>
              <div className="filter-chips-grid">
                {options.map((opt) => {
                  const isSelected = customFilters[key] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={`custom-chip-btn ${isSelected ? "is-active" : ""}`}
                      onClick={() => onSelectCustomFilter(key, isSelected ? null : opt)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Mobile Apply Button */}
        {isOpenMobile && (
          <div className="filter-mobile-apply-bar">
            <button type="button" className="filter-apply-btn" onClick={onCloseMobile}>
              Apply Filters
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
