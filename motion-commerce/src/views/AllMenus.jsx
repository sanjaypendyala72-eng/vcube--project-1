import React, { useState } from "react";
import Link from "../components/UniversalLink";
import {
  ArrowRight, Sparkles, ShoppingBag, Layers, Cpu, Home as HomeIcon,
  Apple, HeartPulse, Gem, BookOpen, Gamepad2, Car, Sprout,
  Dog, Plane, Ticket, FileCode2, Cloud, GraduationCap, Utensils,
  Wrench, ChevronRight, Search
} from "lucide-react";
import { ALL_CATEGORIES } from "../data";
import "./AllMenus.css";

// Map slugs to icons
const CATEGORY_ICONS = {
  fashion: ShoppingBag,
  footwear: Sparkles,
  beauty: Sparkles,
  electronics: Cpu,
  "home-furniture": HomeIcon,
  grocery: Apple,
  healthcare: HeartPulse,
  jewelry: Gem,
  books: BookOpen,
  gaming: Gamepad2,
  automotive: Car,
  agriculture: Sprout,
  pets: Dog,
  travel: Plane,
  tickets: Ticket,
  "digital-products": FileCode2,
  software: Cloud,
  courses: GraduationCap,
  food: Utensils,
  services: Wrench,
};

const SECTORS = [
  { id: "all", label: "All 20 Categories" },
  { id: "luxury", label: "Fashion & Luxury", slugs: ["fashion", "footwear", "beauty", "jewelry"] },
  { id: "tech", label: "Technology & Gaming", slugs: ["electronics", "gaming", "automotive", "software", "digital-products"] },
  { id: "living", label: "Living & Wellness", slugs: ["home-furniture", "grocery", "healthcare", "agriculture", "pets"] },
  { id: "experiences", label: "Services & Experiences", slugs: ["travel", "tickets", "food", "services", "courses", "books"] }
];

export default function AllMenus() {
  const [activeSector, setActiveSector] = useState("all");
  const [filterQuery, setFilterQuery] = useState("");

  const displayedCategories = ALL_CATEGORIES.filter((cat) => {
    // Sector filter
    if (activeSector !== "all") {
      const currentSector = SECTORS.find((s) => s.id === activeSector);
      if (currentSector && !currentSector.slugs.includes(cat.slug)) return false;
    }
    // Search query filter
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      const matchName = cat.name.toLowerCase().includes(q);
      const matchDesc = cat.subtitle.toLowerCase().includes(q) || cat.tagline.toLowerCase().includes(q);
      const matchSubs = cat.subcategories?.some((s) => s.toLowerCase().includes(q));
      return matchName || matchDesc || matchSubs;
    }
    return true;
  });

  return (
    <main className="nexora-all-menus-page">
      {/* Cinematic Hero */}
      <section className="all-menus-hero">
        <div className="menus-hero-atmosphere" aria-hidden="true">
          <div className="menus-glow-orb glow-1" />
          <div className="menus-glow-orb glow-2" />
        </div>

        <div className="menus-hero-container">
          <nav className="menus-breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span className="current">All Categories</span>
          </nav>

          <span className="menus-eyebrow">THE COMPLETE NEXORA ECOSYSTEM</span>
          <h1 className="menus-title">Explore 20 Dedicated Worlds</h1>
          <p className="menus-subtitle">
            From haute couture and Swiss horology to neural SaaS and artisanal dining — discover every corner of the NEXORA universe.
          </p>

          {/* Quick Filter Search Bar */}
          <div className="menus-search-filter-wrap">
            <Search size={18} className="search-filter-icon" />
            <input
              type="text"
              placeholder="Filter categories or subcategories (e.g. 'watches', 'sneakers', 'courses')..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="menus-search-input"
            />
          </div>

          {/* Sector Tabs */}
          <div className="menus-sector-tabs">
            {SECTORS.map((sector) => (
              <button
                key={sector.id}
                type="button"
                className={`sector-tab-btn ${activeSector === sector.id ? "is-active" : ""}`}
                onClick={() => setActiveSector(sector.id)}
              >
                {sector.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 20 Categories Grid */}
      <section className="menus-grid-section">
        <div className="menus-grid-container">
          <div className="all-menus-cards-grid">
            {displayedCategories.map((cat, idx) => {
              const IconComponent = CATEGORY_ICONS[cat.slug] || Sparkles;

              return (
                <article
                  key={cat.slug}
                  className="all-menus-card"
                  style={{
                    "--card-accent": cat.accentColor,
                    "--card-delay": `${(idx % 6) * 60}ms`,
                  }}
                >
                  <Link to={`/${cat.slug}`} className="card-top-media-link">
                    <img src={cat.heroImage} alt={cat.name} className="menu-card-img" loading="lazy" />
                    <div className="menu-card-overlay" />
                    <div className="menu-card-top-row">
                      <span className="menu-cat-num">0{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                      <div className="menu-icon-pill">
                        <IconComponent size={16} />
                      </div>
                    </div>
                  </Link>

                  <div className="menu-card-info">
                    <h3 className="menu-card-heading">
                      <Link to={`/${cat.slug}`}>{cat.name}</Link>
                    </h3>

                    <p className="menu-card-subtitle">{cat.subtitle}</p>

                    {/* Subcategories tags preview */}
                    <div className="menu-subcats-chips">
                      {cat.subcategories?.slice(1, 5).map((sub) => (
                        <span key={sub} className="subcat-chip">
                          {sub}
                        </span>
                      ))}
                      {cat.subcategories && cat.subcategories.length > 5 && (
                        <span className="subcat-chip more">+{cat.subcategories.length - 5}</span>
                      )}
                    </div>

                    <div className="menu-card-footer">
                      <span className="items-count-badge">{cat.products?.length || 12} Items</span>
                      <Link to={`/${cat.slug}`} className="menu-card-cta">
                        <span>Enter World</span>
                        <ArrowRight size={14} className="cta-arrow" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
