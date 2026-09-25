import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  X,
  ArrowRight,
  Heart,
  User,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Compass,
  PhoneCall,
  Search
} from "lucide-react";
import { useAuth } from "../AuthContext";
import ThemeToggle from "./ThemeToggle";
import UniversalLink from "./UniversalLink";

const MOBILE_NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Categories", path: "/categories" },
  { label: "New Arrivals", path: "/new-arrivals" },
  { label: "Collections", path: "/collections" },
  { label: "All Menus", path: "/menus" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function MobileMenu({
  isOpen,
  onClose,
  wishCount = 0,
  cartCount = 0,
  onOpenSearch
}) {
  const pathname = usePathname();
  const { user, setAuthModalOpen, setAuthMode, logout } = useAuth();

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="mobile-menu-portal" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
      {/* Dark Translucent Backdrop */}
      <div className="mobile-menu-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Slide-out Menu Panel */}
      <div className="mobile-menu-drawer">
        {/* Animated Background Canvas / Gradient mesh */}
        <div className="mobile-menu-bg-mesh" aria-hidden="true">
          <div className="mobile-ambient-orb orb-1" />
          <div className="mobile-ambient-orb orb-2" />
          <div className="mobile-grid-lines" />
        </div>

        {/* Header bar in drawer */}
        <div className="mobile-drawer-header">
          <div className="mobile-brand-tag">
            <span className="gold-sparkle-dot" />
            <span className="brand-text">NEXORA MENU</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ThemeToggle />
            <button
              className="mobile-close-btn"
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Quick Search Action */}
        <div className="mobile-search-quickbar">
          <button
            type="button"
            className="mobile-search-btn"
            onClick={() => {
              onClose();
              onOpenSearch?.();
            }}
          >
            <Search size={16} />
            <span>Search products, brands…</span>
          </button>
        </div>

        {/* Staggered Navigation Items */}
        <nav className="mobile-nav-list" aria-label="Mobile Links">
          {MOBILE_NAV_ITEMS.map((item, idx) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <div
                key={item.label}
                className="mobile-nav-item"
                style={{ "--item-index": idx }}
              >
                <UniversalLink
                  to={item.path}
                  className={`mobile-nav-link ${isActive ? "is-active" : ""}`}
                  onClick={onClose}
                >
                  <span className="mobile-link-number">0{idx + 1}</span>
                  <span className="mobile-link-text">{item.label}</span>
                  <ArrowRight size={15} className="mobile-link-arrow" />
                </UniversalLink>
              </div>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mobile-menu-divider" />

        {/* User Account / Secondary Actions */}
        <div className="mobile-secondary-actions">
          <UniversalLink
            to="/wishlist"
            className="mobile-action-row"
            onClick={onClose}
            style={{ "--item-index": 7 }}
          >
            <div className="row-left">
              <Heart size={18} className="text-gold" />
              <span>Wishlist</span>
            </div>
            {wishCount > 0 && <span className="mobile-badge">{wishCount}</span>}
          </UniversalLink>

          <UniversalLink
            to="/account?section=track"
            className="mobile-action-row"
            onClick={onClose}
            style={{ "--item-index": 8 }}
          >
            <div className="row-left">
              <Compass size={18} className="text-gold" />
              <span>Track Order</span>
            </div>
            <ArrowRight size={16} />
          </UniversalLink>

          <UniversalLink
            to="/help"
            className="mobile-action-row"
            onClick={onClose}
            style={{ "--item-index": 9 }}
          >
            <div className="row-left">
              <PhoneCall size={18} className="text-gold" />
              <span>Help</span>
            </div>
            <ArrowRight size={16} />
          </UniversalLink>

          {user ? (
            <div className="mobile-user-card" style={{ "--item-index": 7 }}>
              <div className="mobile-user-row">
                <div className="mobile-user-avatar">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div className="mobile-user-details">
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                </div>
              </div>
              <button
                className="mobile-logout-btn"
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              className="mobile-action-row"
              onClick={() => {
                onClose();
                setAuthMode("login");
                setAuthModalOpen(true);
              }}
              style={{ "--item-index": 7 }}
            >
              <div className="row-left">
                <User size={18} className="text-gold" />
                <span>Sign In / Account</span>
              </div>
              <ArrowRight size={16} />
            </button>
          )}
        </div>

        {/* Footer tagline inside mobile menu */}
        <div className="mobile-drawer-footer">
          <div className="mobile-footer-tagline">
            SHOP • STYLE • LIVE BETTER
          </div>
          <p>© 2026 NEXORA COMMERCE. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </div>
  );
}
