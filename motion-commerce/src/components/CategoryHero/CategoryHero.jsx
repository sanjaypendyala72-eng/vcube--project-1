import React from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import "./CategoryHero.css";

export default function CategoryHero({ category }) {
  if (!category) return null;

  return (
    <section
      className={`nexora-category-hero category-theme-${category.slug}`}
      style={{
        "--hero-accent": category.accentColor,
        "--hero-glow": category.accentGlow || "rgba(212, 175, 55, 0.15)",
      }}
    >
      {/* Background Ambience Layer */}
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="atmosphere-orb orb-primary" />
        <div className="atmosphere-orb orb-secondary" />
        <div className="atmosphere-mesh" />
      </div>

      <div className="hero-container">
        {/* Breadcrumb */}
        <nav className="hero-breadcrumb" aria-label="Breadcrumbs">
          <Link href="/">Home</Link>
          <ChevronRight size={12} />
          <Link href="/menus">Categories</Link>
          <ChevronRight size={12} />
          <span className="current-crumb">{category.shortTitle || category.name}</span>
        </nav>

        {/* Hero Content Grid */}
        <div className="hero-grid">
          <div className="hero-text-col">
            <div className="hero-badge">
              <Sparkles size={13} className="hero-badge-icon" />
              <span>NEXORA EXCLUSIVE • {category.shortTitle || category.name}</span>
            </div>

            <h1 className="hero-title">
              {category.shortTitle || category.name}
            </h1>

            <div className="hero-accent-bar" />

            <p className="hero-subtitle">
              {category.subtitle}
            </p>

            <p className="hero-tagline">
              {category.tagline}
            </p>

            {/* Subcategories quick jump bar in hero */}
            {category.subcategories && (
              <div className="hero-subcats-scroller">
                <span className="subcats-label">Explore:</span>
                <div className="subcats-list">
                  {category.subcategories.slice(1, 6).map((sub) => (
                    <span key={sub} className="subcat-hero-pill">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hero Visual Card */}
          <div className="hero-visual-col">
            <div className="hero-visual-frame">
              <img
                src={category.heroImage}
                alt={category.name}
                className="hero-main-image"
              />
              <div className="hero-image-overlay" />
              <div className="hero-floating-glass-card">
                <span className="floating-card-label">CURATED COLLECTION</span>
                <strong>{category.products?.length || 12} Considered Items</strong>
                <span className="floating-card-badge">NEXORA 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
