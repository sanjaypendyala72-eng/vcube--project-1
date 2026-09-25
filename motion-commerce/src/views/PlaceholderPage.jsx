import React from "react";
import { usePathname } from "next/navigation";
import Link from "../components/UniversalLink";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

/**
 * PlaceholderPage — Premium placeholder for routes not yet fully built.
 * Shows page name, description, and navigation back.
 */

const PAGE_INFO = {
  "/about": {
    eyebrow: "OUR WORLD",
    title: "About",
    subtitle: "NEXORA",
    desc: "Discover the story behind NEXORA — a brand built on craftsmanship, curation, and a commitment to modern living.",
  },
  "/help": {
    eyebrow: "WE'RE HERE TO HELP",
    title: "Help",
    subtitle: "Center",
    desc: "Find answers to your questions, track orders, manage returns, and get in touch with our concierge team.",
  },
  "/contact": {
    eyebrow: "GET IN TOUCH",
    title: "Contact",
    subtitle: "Us",
    desc: "Have a question? Our concierge team is available to help you with anything you need.",
  },
  "/account": {
    eyebrow: "YOUR SPACE",
    title: "My",
    subtitle: "Account",
    desc: "Manage your profile, orders, saved items, and preferences all in one place.",
  },
  "/collections": {
    eyebrow: "CURATED WORLDS",
    title: "All",
    subtitle: "Collections",
    desc: "Explore seasonal drops, limited editions, and exclusive capsules curated by NEXORA.",
  },
  "/new-arrivals": {
    eyebrow: "JUST LANDED",
    title: "New",
    subtitle: "Arrivals",
    desc: "The latest additions to our collection — fresh styles, premium materials, everyday luxury.",
  },
};

export default function PlaceholderPage() {
  const pathname = usePathname();
  const path = pathname || (typeof window !== "undefined" ? window.location.pathname : "/");
  const info = PAGE_INFO[path] || {
    eyebrow: "NEXORA",
    title: "Coming",
    subtitle: "Soon",
    desc: "This page is currently being crafted. Check back soon for something beautiful.",
  };

  return (
    <main className="page" style={{ paddingTop: 100 }}>
      <div className="pageHero" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
        <span className="eyebrow" style={{ letterSpacing: "2.5px", color: "#d4af37" }}>
          {info.eyebrow}
        </span>
        <h1 style={{ marginBottom: 16 }}>
          {info.title} <i>{info.subtitle}</i>
        </h1>
        <p style={{ fontSize: 17, color: "#8e8e99", lineHeight: 1.6, margin: "0 auto 40px", maxWidth: 520 }}>
          {info.desc}
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn primary" to="/shop" style={{ background: "linear-gradient(135deg, #d4af37, #9e7512)", color: "#000", boxShadow: "0 8px 25px rgba(212,175,55,0.3)" }}>
            Shop Now <ArrowUpRight />
          </Link>
          <Link className="btn ghost" to="/menus">
            <ArrowLeft size={16} /> All Menus
          </Link>
        </div>
      </div>

      {/* Feature cards teaser */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        maxWidth: 800,
        margin: "80px auto 0",
        padding: "0 20px"
      }}>
        {[
          { label: "Track Your Order", icon: "📦", link: "/account?section=track" },
          { label: "Browse Collections", icon: "✨", link: "/collections" },
          { label: "Get Help", icon: "💬", link: "/help" },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.link}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "20px 22px",
              borderRadius: 14,
              background: "rgba(18, 18, 22, 0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#d4d4d8",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontSize: 24 }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
