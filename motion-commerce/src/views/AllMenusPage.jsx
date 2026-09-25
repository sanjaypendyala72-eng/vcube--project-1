import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "../components/UniversalLink";
import {
  ShoppingBag, Grid3X3, Layers, User, HelpCircle,
  ArrowRight, ArrowUpRight, Sparkles, Heart, Package,
  MapPin, CreditCard, Star, Bell, Settings, LogOut,
  Headphones, RotateCcw, Truck, Ruler, FileText,
  MessageCircle, Shield, Leaf, AlertCircle, Clock,
  Tag, Flame, Gift, Gem, BookOpen, TrendingUp,
  Snowflake, Sun, Award, Briefcase, Plane, Dumbbell,
  ShieldCheck, Users, RefreshCw, Lock, ChevronRight,
  UserPlus
} from "lucide-react";
import { useAuth } from "../AuthContext";
import "./AllMenusPage.css";

/* =========================================================================
   DATA — Menu cards content
   ========================================================================= */
const MENU_CARDS = [
  {
    id: "shop",
    title: "SHOP",
    description: "Explore our curated collection of premium products handpicked for modern living.",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80",
    cta: "View All Products",
    ctaLink: "/shop",
    items: [
      { label: "Shop All", icon: Grid3X3, link: "/shop" },
      { label: "New Arrivals", icon: Sparkles, link: "/new-arrivals" },
      { label: "Best Sellers", icon: TrendingUp, link: "/shop?sort=best" },
      { label: "Trending Now", icon: Flame, link: "/shop?sort=trending" },
      { label: "Deals & Offers", icon: Tag, link: "/shop?filter=deals" },
      { label: "Premium Collection", icon: Gem, link: "/collections?type=premium" },
      { label: "Editor's Picks", icon: BookOpen, link: "/shop?filter=editors" },
      { label: "Gift Cards", icon: Gift, link: "/shop?filter=gifts" },
    ],
  },
  {
    id: "categories",
    title: "CATEGORIES",
    description: "Browse across every world we curate — from fashion to fitness, lifestyle to luxury.",
    icon: Grid3X3,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    cta: "View All Categories",
    ctaLink: "/categories",
    items: [
      { label: "Fashion", icon: Sparkles, link: "/shop?category=Fashion" },
      { label: "Accessories", icon: Gem, link: "/shop?category=Accessories" },
      { label: "Shoes", icon: Package, link: "/shop?category=Shoes" },
      { label: "Bags", icon: ShoppingBag, link: "/shop?category=bags" },
      { label: "Watches", icon: Clock, link: "/shop?category=watches" },
      { label: "Beauty", icon: Heart, link: "/shop?category=Beauty" },
      { label: "Lifestyle", icon: Star, link: "/shop?category=lifestyle" },
      { label: "Home & Living", icon: Layers, link: "/shop?category=Home" },
      { label: "Fitness", icon: Dumbbell, link: "/shop?category=fitness" },
      { label: "Travel", icon: Plane, link: "/shop?category=travel" },
      { label: "Gadgets", icon: Settings, link: "/shop?category=Electronics" },
    ],
  },
  {
    id: "collections",
    title: "COLLECTIONS",
    description: "Seasonal drops, limited editions, and exclusive capsules curated by NEXORA.",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
    cta: "View All Collections",
    ctaLink: "/collections",
    items: [
      { label: "Summer Collection", icon: Sun, link: "/collections?type=summer" },
      { label: "Winter Collection", icon: Snowflake, link: "/collections?type=winter" },
      { label: "Festive Collection", icon: Sparkles, link: "/collections?type=festive" },
      { label: "Premium Collection", icon: Gem, link: "/collections?type=premium" },
      { label: "Limited Edition", icon: Award, link: "/collections?type=limited" },
      { label: "Sustainable Collection", icon: Leaf, link: "/collections?type=sustainable" },
      { label: "Work Essentials", icon: Briefcase, link: "/collections?type=work" },
      { label: "Travel Essentials", icon: Plane, link: "/collections?type=travel" },
      { label: "Active Lifestyle", icon: Dumbbell, link: "/collections?type=active" },
      { label: "Luxury Picks", icon: Star, link: "/collections?type=luxury" },
      { label: "NEXORA Exclusives", icon: ShieldCheck, link: "/collections?type=exclusives" },
    ],
  },
  {
    id: "account",
    title: "ACCOUNT",
    description: "Manage your profile, orders, preferences, and everything NEXORA.",
    icon: User,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    cta: null,
    ctaLink: "/account",
    authRequired: true,
    items: [
      { label: "My Profile", icon: User, link: "/account" },
      { label: "My Orders", icon: Package, link: "/account?section=orders" },
      { label: "Wishlist", icon: Heart, link: "/wishlist" },
      { label: "Saved Addresses", icon: MapPin, link: "/account?section=addresses" },
      { label: "Payment Methods", icon: CreditCard, link: "/account?section=payments" },
      { label: "My Reviews", icon: Star, link: "/account?section=reviews" },
      { label: "Notifications", icon: Bell, link: "/account?section=notifications" },
      { label: "Settings", icon: Settings, link: "/account?section=settings" },
      { label: "Track Order", icon: Truck, link: "/account?section=track" },
      { label: "Help Center", icon: HelpCircle, link: "/help" },
      { label: "Logout", icon: LogOut, link: null, action: "logout" },
    ],
    unauthItems: [
      { label: "Login", icon: User, link: null, action: "login" },
      { label: "Create Account", icon: UserPlus, link: null, action: "register" },
    ],
  },
  {
    id: "help",
    title: "HELP & SUPPORT",
    description: "Get answers, track shipments, manage returns, and reach our concierge team.",
    icon: HelpCircle,
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    cta: "Contact Support",
    ctaLink: "/contact",
    items: [
      { label: "Help Center", icon: HelpCircle, link: "/help" },
      { label: "Track Order", icon: Truck, link: "/account?section=track" },
      { label: "Returns & Refunds", icon: RotateCcw, link: "/help?topic=returns" },
      { label: "Shipping Information", icon: Package, link: "/help?topic=shipping" },
      { label: "Size Guide", icon: Ruler, link: "/help?topic=size-guide" },
      { label: "Payment Information", icon: CreditCard, link: "/help?topic=payments" },
      { label: "FAQs", icon: MessageCircle, link: "/help?topic=faq" },
      { label: "Contact Us", icon: Headphones, link: "/contact" },
      { label: "Terms & Conditions", icon: FileText, link: "/help?topic=terms" },
      { label: "Privacy Policy", icon: Shield, link: "/help?topic=privacy" },
      { label: "Sustainability", icon: Leaf, link: "/help?topic=sustainability" },
      { label: "Report an Issue", icon: AlertCircle, link: "/help?topic=report" },
    ],
  },
];



const PROMO_CARDS = [
  {
    title: "New Arrivals",
    heading: "Fresh Styles",
    sub: "Every Season",
    cta: "Shop Now",
    link: "/new-arrivals",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Premium Bags",
    heading: "Carry Elegance",
    sub: "",
    cta: "Explore",
    link: "/shop?category=bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Luxury Watches",
    heading: "Time Reimagined",
    sub: "",
    cta: "Discover",
    link: "/shop?category=watches",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sustainable Choices",
    heading: "A Better Tomorrow",
    sub: "",
    cta: "Learn More",
    link: "/collections?type=sustainable",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  },
];

const QUICK_ACCESS = [
  { label: "Shop All", link: "/shop" },
  { label: "New Arrivals", link: "/new-arrivals" },
  { label: "Best Sellers", link: "/shop?sort=best" },
  { label: "Trending", link: "/shop?sort=trending" },
  { label: "Collections", link: "/collections" },
  { label: "Wishlist", link: "/wishlist" },
  { label: "Track Order", link: "/account?section=track" },
  { label: "Help Center", link: "/help" },
];

const TRUST_ITEMS = [
  { value: 5000, suffix: "+", label: "Happy Customers", icon: Users },
  { value: 100, suffix: "+", label: "Premium Brands", icon: Award },
  { value: null, label: "Easy Returns", sub: "Hassle Free", icon: RefreshCw },
  { value: null, label: "Secure Payments", sub: "100% Safe", icon: Lock },
  { value: null, label: "Sustainable Choices", sub: "For a Better Tomorrow", icon: Leaf },
];

/* =========================================================================
   HOOKS
   ========================================================================= */

/** IntersectionObserver-based scroll reveal hook */
function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: options.threshold || 0.1, rootMargin: options.rootMargin || "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/** Animated counter hook for trust section */
function useAnimatedCounter(target, isVisible, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible || target === null) return;

    let start = 0;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return count;
}

/* =========================================================================
   SUB-COMPONENTS
   ========================================================================= */

function MenuCard({ card, index, isVisible }) {
  const { user, setAuthModalOpen, setAuthMode, logout } = useAuth();
  const isAuthenticated = !!user;
  const isAccountCard = card.authRequired;
  const items = isAccountCard && !isAuthenticated ? card.unauthItems : card.items;
  const Icon = card.icon;

  const handleAction = (action) => {
    if (action === "logout") {
      logout();
    } else if (action === "login") {
      setAuthMode("login");
      setAuthModalOpen(true);
    } else if (action === "register") {
      setAuthMode("register");
      setAuthModalOpen(true);
    }
  };

  return (
    <div
      className={`menu-card ${isVisible ? "is-revealed" : ""}`}
      style={{ "--card-index": index, "--card-delay": `${index * 100}ms` }}
    >
      {/* Card Image */}
      <div className="menu-card-image-wrap">
        <img
          src={card.image}
          alt={card.title}
          className="menu-card-image"
          loading="lazy"
        />
        <div className="menu-card-image-overlay" />
        <div className="menu-card-image-sheen" />
      </div>

      {/* Card Header */}
      <div className="menu-card-header">
        <div className="menu-card-title-row">
          <h3 className="menu-card-title">{card.title}</h3>
          <Link to={card.ctaLink || "#"} className="menu-card-arrow-btn" aria-label={`Go to ${card.title}`}>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Menu Items List */}
      <div className="menu-card-items">
        {items.map((item, idx) => {
          const ItemIcon = item.icon;
          const content = (
            <>
              <div className="menu-item-left">
                <ItemIcon size={14} className="menu-item-icon" />
                <span className="menu-item-label">{item.label}</span>
              </div>
              <ChevronRight size={13} className="menu-item-arrow" />
              <span className="menu-item-underline" />
            </>
          );

          if (item.action) {
            return (
              <button
                key={item.label}
                className="menu-item-link menu-item-button"
                onClick={() => handleAction(item.action)}
                style={{ "--item-idx": idx }}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.link}
              className="menu-item-link"
              style={{ "--item-idx": idx }}
            >
              {content}
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      {card.cta && (
        <div className="menu-card-cta-wrap">
          <Link to={card.ctaLink} className="menu-card-cta">
            {card.cta}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}

function PromoCard({ promo, index, isVisible }) {
  return (
    <Link
      to={promo.link}
      className={`promo-card ${isVisible ? "is-revealed" : ""}`}
      style={{ "--promo-index": index, "--promo-delay": `${index * 100}ms` }}
    >
      <img src={promo.image} alt={promo.title} className="promo-card-image" loading="lazy" />
      <div className="promo-card-overlay" />
      <div className="promo-card-content">
        <span className="promo-card-eyebrow">{promo.title}</span>
        <h3 className="promo-card-heading">
          <i>{promo.heading}</i>
          {promo.sub && <><br />{promo.sub}</>}
        </h3>
        <span className="promo-card-cta">
          {promo.cta} <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

function TrustItem({ item, isVisible }) {
  const count = useAnimatedCounter(item.value, isVisible);
  const Icon = item.icon;

  return (
    <div className={`trust-item ${isVisible ? "is-revealed" : ""}`}>
      <div className="trust-icon-wrap">
        <Icon size={22} />
      </div>
      <div className="trust-content">
        {item.value !== null ? (
          <strong className="trust-value">{count.toLocaleString()}{item.suffix}</strong>
        ) : (
          <strong className="trust-value">{item.label}</strong>
        )}
        {item.value !== null ? (
          <span className="trust-label">{item.label}</span>
        ) : (
          <span className="trust-label">{item.sub}</span>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN PAGE COMPONENT
   ========================================================================= */
export default function AllMenusPage() {
  const [heroRef, heroVisible] = useScrollReveal({ threshold: 0.15 });
  const [cardsRef, cardsVisible] = useScrollReveal({ threshold: 0.05 });
  const [promoRef, promoVisible] = useScrollReveal({ threshold: 0.1 });
  const [quickRef, quickVisible] = useScrollReveal({ threshold: 0.1 });
  const [trustRef, trustVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <main className="all-menus-page">
      {/* ============= BREADCRUMB ============= */}
      <div className="menus-breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <span>All Menus</span>
      </div>

      {/* ============= HERO SECTION ============= */}
      <section className={`menus-hero ${heroVisible ? "is-revealed" : ""}`} ref={heroRef}>
        <div className="menus-hero-content">
          <div className="menus-hero-left">
            <span className="menus-hero-eyebrow">E X P L O R E &nbsp; E V E R Y T H I N G</span>
            <h1 className="menus-hero-title">All Menus</h1>
            <div className="menus-hero-accent-line" />
            <p className="menus-hero-subtitle">Navigate your style, your way.</p>
            <p className="menus-hero-desc">Discover everything NEXORA has to offer in one place.</p>
            <Link to="/shop" className="menus-hero-cta">
              EXPLORE SHOP <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="menus-hero-right">
            <div className="menus-hero-image-container">
              <img
                src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=900&q=85"
                alt="NEXORA Premium Fashion"
                className="menus-hero-image"
              />
              <div className="hero-image-glow" />
              <div className="hero-floating-badge">
                <Sparkles size={14} />
                <span>FASHION • STYLE • LIFESTYLE</span>
              </div>
            </div>
            {/* Decorative particles */}
            <div className="hero-particles" aria-hidden="true">
              <span className="particle p1" />
              <span className="particle p2" />
              <span className="particle p3" />
              <span className="particle p4" />
            </div>
          </div>
        </div>
        {/* Golden light trail */}
        <div className="hero-light-trail" aria-hidden="true" />
      </section>

      {/* ============= MENU CARDS SECTION ============= */}
      <section className="menus-cards-section" ref={cardsRef}>
        <div className="menus-cards-grid">
          {MENU_CARDS.map((card, i) => (
            <MenuCard key={card.id} card={card} index={i} isVisible={cardsVisible} />
          ))}
        </div>
      </section>

      {/* ============= PROMOTIONAL SECTION ============= */}
      <section className="menus-promo-section" ref={promoRef}>
        <div className="menus-promo-grid">
          {PROMO_CARDS.map((promo, i) => (
            <PromoCard key={promo.title} promo={promo} index={i} isVisible={promoVisible} />
          ))}
        </div>
      </section>

      {/* ============= QUICK ACCESS SECTION ============= */}
      <section className={`menus-quick-section ${quickVisible ? "is-revealed" : ""}`} ref={quickRef}>
        <h2 className="section-heading">QUICK ACCESS</h2>
        <div className="quick-access-grid">
          {QUICK_ACCESS.map((item, i) => (
            <Link
              key={item.label}
              to={item.link}
              className="quick-access-btn"
              style={{ "--qa-index": i, "--qa-delay": `${i * 60}ms` }}
            >
              {item.label}
              <ArrowRight size={14} className="qa-arrow" />
            </Link>
          ))}
        </div>
      </section>

      {/* ============= TRUST SECTION ============= */}
      <section className={`menus-trust-section ${trustVisible ? "is-revealed" : ""}`} ref={trustRef}>
        <div className="trust-grid">
          {TRUST_ITEMS.map((item, i) => (
            <TrustItem key={item.label} item={item} isVisible={trustVisible} />
          ))}
        </div>
      </section>
    </main>
  );
}
