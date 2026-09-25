"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Gem, Flame, Layers } from "lucide-react";
import { ALL_CATEGORIES } from "../../data";
import { MotionReveal, StaggerContainer, StaggerItem } from "../../components/MotionComponents";

const FEATURED_COLLECTIONS = [
  {
    title: "Monochrome Architectural",
    subtitle: "Spring / Summer 2026",
    desc: "Sculpted silhouettes and high-density Japanese cotton tailored for contemporary geometry.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
    category: "Fashion & Clothing"
  },
  {
    title: "Aerospace Titanium & Chrono",
    subtitle: "Precision Instrument Capsule",
    desc: "Grade-5 titanium cases, sapphire crystals, and exhibition casebacks designed for enduring performance.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
    category: "Watches"
  },
  {
    title: "Artisanal Footwear Series",
    subtitle: "Hand-finished Florentine Leather",
    desc: "Blake-stitched soles, hand-burnished calfskin, and ergonomically damped aero runners.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    category: "Shoes & Footwear"
  },
  {
    title: "Golden Hour Botanical Beauty",
    subtitle: "Clean Ritual Formulation",
    desc: "24-karat gold leaf, Bulgarian rose, and cold-pressed botanical squalane.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    category: "Beauty & Cosmetics"
  }
];

export default function CollectionsPage() {
  return (
    <main className="page" style={{ paddingTop: 100, maxWidth: 1200, margin: "0 auto", paddingBottom: 100 }}>
      <MotionReveal>
        <div className="pageHero" style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 60px" }}>
          <span className="eyebrow" style={{ letterSpacing: "3px", color: "#d4af37", fontWeight: 700 }}>
            CURATED CAPSULES • LIMITED EDITIONS
          </span>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 54px)", margin: "16px 0", color: "#fff" }}>
            The <i>Collections.</i>
          </h1>
          <p style={{ fontSize: 17, color: "#a1a1aa", lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>
            Thoughtfully grouped narratives uniting form, texture, and technical performance into unified luxury capsules.
          </p>
        </div>
      </MotionReveal>

      {/* Featured Collection Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 30 }}>
        {FEATURED_COLLECTIONS.map((col, idx) => (
          <div
            key={idx}
            style={{
              position: "relative",
              borderRadius: 22,
              overflow: "hidden",
              border: "1px solid rgba(212, 175, 55, 0.25)",
              background: "#141418",
              boxShadow: "0 20px 45px rgba(0,0,0,0.6)"
            }}
          >
            <div style={{ height: 260, overflow: "hidden" }}>
              <img
                src={col.image}
                alt={col.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>
            <div style={{ padding: "26px 28px" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: "#ffd875", textTransform: "uppercase" }}>
                {col.subtitle}
              </span>
              <h3 style={{ fontSize: 22, color: "#fff", margin: "8px 0 12px", fontWeight: 700 }}>{col.title}</h3>
              <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.6, marginBottom: 24 }}>{col.desc}</p>
              <Link
                href={`/shop?category=${encodeURIComponent(col.category)}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#ffd875",
                  textDecoration: "none"
                }}
              >
                Discover Collection <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
