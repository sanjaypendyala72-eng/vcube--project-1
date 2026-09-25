import React, { useState, useEffect, useRef, useCallback } from "react";
import { AlertTriangle } from "lucide-react";
import UniversalLink from "./UniversalLink";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import WishlistButton from "./WishlistButton";
import CartButton from "./CartButton";
import AccountButton from "./AccountButton";
import MobileMenu from "./MobileMenu";
import MiniHeader from "./MiniHeader";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../AuthContext";
import "../components/MiniHeader.css";

/**
 * Nexora Premium Motion Header
 * Features:
 * 1. Desktop & Mobile responsive layout
 * 2. Subtle continuous particle/glow background ambient light
 * 3. Initial page load sequential stagger entrance (0.0s -> 1.04s)
 * 4. Header scroll animation (Transparent airy at top -> semi-transparent dark compact blurred surface with border & shadow)
 * 5. Smart header hide on scroll down, smooth return on scroll up
 * 6. Animated mobile hamburger icon (☰ -> X)
 * 7. Micro-interactions and full accessibility
 */
export default function Header({
  cartCount = 0,
  wishCount = 0,
  onOpenCart
}) {
  const { user, setAuthModalOpen, setAuthMode } = useAuth();

  // Scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // References for scroll calculation
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Detect scrolled state for height & blur transition (> 20px)
    if (currentScrollY > 25) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Smart Hide/Reveal:
    // Scroll down > 120px hides header, scroll up reveals it immediately
    if (currentScrollY > 120) {
      if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling down
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // Scrolling up
        setIsHidden(false);
      }
    } else {
      setIsHidden(false);
    }

    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {/* Top Animated Mini Header Brand Ticker (Right to Left) */}
      <MiniHeader direction="left" />

      {/* Security notice banner if user email is unverified */}
      {user && !user.isVerified && (
        <div className="global-security-banner">
          <AlertTriangle size={14} />
          <span>
            Security Notice: Your email <b>{user.email}</b> is unverified.
          </span>
          <button
            onClick={() => {
              setAuthMode("register");
              setAuthModalOpen(true);
            }}
          >
            Verify Email
          </button>
        </div>
      )}

      {/* Main Motion Header Container (placed in between) */}
      <header
        className={`nexora-motion-header ${isScrolled ? "is-scrolled" : "at-top"} ${
          isHidden ? "is-hidden" : ""
        }`}
        id="nexora-main-header"
      >
        {/* Subtle Ambient Background Motion Layer */}
        <div className="header-ambient-layer" aria-hidden="true">
          <div className="ambient-light-streak" />
          <div className="ambient-golden-glow" />
          <div className="ambient-mesh-grain" />
        </div>

        {/* Content Bar */}
        <div className="header-main-content">
          {/* LEFT: Nexora Animated Logo (0.15s) */}
          <div className="header-left-col">
            <UniversalLink to="/" className="header-logo-link" aria-label="NEXORA Homepage" style={{ display: "flex", alignItems: "center" }}>
              <img 
                src="/nexora/api/logo-wide" 
                alt="NEXORA" 
                className="animated-wide-logo"
                style={{ height: isScrolled ? "32px" : "42px" }} 
              />
            </UniversalLink>
          </div>

          {/* CENTER: Navigation Links (0.30s - 0.70s) */}
          <div className="header-center-col">
            <Navigation />
          </div>

          {/* RIGHT: Search, Wishlist, Account, Cart (0.80s - 1.04s) */}
          <div className="header-right-col">
            {/* Expanding Search Bar */}
            <SearchBar />

            {/* Dark / Light Mode Theme Toggle */}
            <ThemeToggle />

            {/* Wishlist Heart with controlled pulse */}
            <WishlistButton count={wishCount} />

            {/* User Account / Profile */}
            <AccountButton />

            {/* Cart Button with animated quantity badge */}
            <CartButton count={cartCount} onClick={onOpenCart} />

            {/* Mobile Animated Hamburger Button (☰ -> X) */}
            <button
              className={`mobile-hamburger-btn ${mobileMenuOpen ? "is-active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className="hamb-line hamb-line-1" />
              <span className="hamb-line hamb-line-2" />
              <span className="hamb-line hamb-line-3" />
            </button>
          </div>
        </div>

        {/* Bottom micro-border accent line with subtle traveling light */}
        <div className="header-bottom-accent-line" aria-hidden="true">
          <span className="accent-line-sheen" />
        </div>
      </header>

      {/* Bottom Animated Mini Header Brand Ticker (Left to Right) */}
      <MiniHeader direction="right" />

      {/* Full-screen / Side Mobile Navigation Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        wishCount={wishCount}
        cartCount={cartCount}
        onOpenSearch={() => {
          // Triggers search
          const searchInput = document.querySelector(".search-input-field");
          searchInput?.focus();
        }}
      />
    </>
  );
}
