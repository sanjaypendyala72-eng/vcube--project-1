import React, { useState, useRef, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, ArrowRight, Sparkles, Flame, Tag, Layers } from "lucide-react";
import UniversalLink from "./UniversalLink";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  {
    label: "Categories",
    path: "/categories",
    hasMegaMenu: true,
  },
  { label: "New Arrivals", path: "/new-arrivals" },
  { label: "Collections", path: "/collections" },
  { label: "All Menus", path: "/menus" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const CATEGORY_ITEMS = [
  {
    name: "Fashion & Clothing",
    badge: "Trending",
    desc: "Tailored silhouettes, organic textiles & suiting",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
    link: "/shop?category=Fashion%20%26%20Clothing"
  },
  {
    name: "Shoes & Footwear",
    badge: "Popular",
    desc: "Aero Runners, architectural heels & leather boots",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    link: "/shop?category=Shoes%20%26%20Footwear"
  },
  {
    name: "Beauty & Cosmetics",
    badge: "New",
    desc: "Gold-infused skincare, elixirs & luxury pigments",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    link: "/shop?category=Beauty%20%26%20Cosmetics"
  },
  {
    name: "Home & Furniture",
    badge: "Curated",
    desc: "Minimalist sculpture, marble fixtures & warm luminary",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
    link: "/shop?category=Home%20%26%20Furniture"
  }
];

export default function Navigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const megaMenuRef = useRef(null);
  const navContainerRef = useRef(null);

  // Active indicator position interpolation
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const updateActiveIndicator = () => {
    if (!navContainerRef.current) return;
    const activeLink = navContainerRef.current.querySelector(".nav-item-link.is-active");
    if (activeLink) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
        opacity: 1
      });
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  };

  useEffect(() => {
    // Delay slightly to account for font rendering/DOM layout
    const timer = setTimeout(updateActiveIndicator, 50);
    window.addEventListener("resize", updateActiveIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateActiveIndicator);
    };
  }, [pathname, searchParams]);

  const isCurrentActive = (item) => {
    const current = pathname || "/";
    if (item.path === "/") {
      return current === "/" || current === "";
    }
    if (item.path.includes("?")) {
      const [base, query] = item.path.split("?");
      return current === base && (searchParams?.toString() || "").includes(query);
    }
    return current === item.path || current.startsWith(`${item.path}/`);
  };

  return (
    <nav
      className="header-navigation"
      ref={navContainerRef}
      aria-label="Main Navigation"
    >
      {NAV_ITEMS.map((item, idx) => {
        const active = isCurrentActive(item);
        const staggerDelay = 300 + idx * 80; // 0.30s, 0.38s, 0.46s, etc.

        return (
          <div
            key={item.label}
            className={`nav-item-wrapper ${item.hasMegaMenu ? "has-mega" : ""}`}
            style={{ "--stagger-delay": `${staggerDelay}ms` }}
            onMouseEnter={() => item.hasMegaMenu && setMegaOpen(true)}
            onMouseLeave={() => item.hasMegaMenu && setMegaOpen(false)}
          >
            <UniversalLink
              to={item.path}
              className={`nav-item-link ${active ? "is-active" : ""}`}
              onClick={() => {
                setMegaOpen(false);
              }}
            >
              <span className="nav-item-text">{item.label}</span>
              {item.hasMegaMenu && (
                <ChevronDown
                  size={13}
                  className={`nav-chevron ${megaOpen ? "open" : ""}`}
                  aria-hidden="true"
                />
              )}
              {/* Animated underline expanding scaleX(0) -> scaleX(1) */}
              <span className="nav-item-hover-line" aria-hidden="true" />
            </UniversalLink>

            {/* Premium Categories Mega Menu Dropdown */}
            {item.hasMegaMenu && (
              <div
                className={`mega-dropdown-panel ${megaOpen ? "is-visible" : ""}`}
                ref={megaMenuRef}
              >
                <div className="mega-glass-shell">
                  <div className="mega-columns">
                    {/* Left Category List */}
                    <div className="mega-category-list">
                      <div className="mega-category-title">
                        <Layers size={13} className="text-gold" />
                        <span>Featured Curations</span>
                      </div>
                      {CATEGORY_ITEMS.map((cat, i) => (
                        <UniversalLink
                          key={cat.name}
                          to={cat.link}
                          className={`mega-cat-row ${activeTab === i ? "active-row" : ""}`}
                          onMouseEnter={() => setActiveTab(i)}
                          onClick={() => setMegaOpen(false)}
                        >
                          <div className="mega-cat-info">
                            <span className="mega-cat-name">{cat.name}</span>
                            <span className="mega-cat-desc">{cat.desc}</span>
                          </div>
                          <span className="mega-cat-badge">{cat.badge}</span>
                        </UniversalLink>
                      ))}
                    </div>

                    {/* Right Interactive Preview Card */}
                    <div className="mega-feature-preview">
                      <div className="mega-card-frame">
                        <img
                          src={CATEGORY_ITEMS[activeTab]?.image}
                          alt={CATEGORY_ITEMS[activeTab]?.name}
                          className="mega-preview-img"
                        />
                        <div className="mega-card-grad" />
                        <div className="mega-card-content">
                          <span className="mega-curated-tag">
                            <Sparkles size={11} /> LUXURY SELECTION
                          </span>
                          <h4>Elevate Your Everyday</h4>
                          <p>Hand-selected pieces finished in organic textures and champagne gold.</p>
                          <UniversalLink
                            to={CATEGORY_ITEMS[activeTab]?.link || "/shop"}
                            className="mega-explore-btn"
                            onClick={() => setMegaOpen(false)}
                          >
                            Explore Collection <ArrowRight size={13} />
                          </UniversalLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Floating Active Page Indicator moving seamlessly into position */}
      <span
        className="nav-active-floating-bar"
        style={{
          transform: `translateX(${indicatorStyle.left}px)`,
          width: `${indicatorStyle.width}px`,
          opacity: indicatorStyle.opacity
        }}
        aria-hidden="true"
      />
    </nav>
  );
}
