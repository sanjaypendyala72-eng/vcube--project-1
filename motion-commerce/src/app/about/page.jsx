"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Award, Globe, ShieldCheck } from "lucide-react";
import { MotionReveal } from "../../components/MotionComponents";

export default function AboutPage() {
  return (
    <main className="page" style={{ paddingTop: 110, maxWidth: 1100, margin: "0 auto", paddingBottom: 100 }}>
      <MotionReveal>
        <div className="pageHero" style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 60px" }}>
          <span className="eyebrow" style={{ letterSpacing: "3px", color: "#d4af37", fontWeight: 700 }}>
            OUR STORY • PHILOSOPHY
          </span>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 54px)", margin: "16px 0", color: "#fff" }}>
            The Essence of <i>NEXORA.</i>
          </h1>
          <p style={{ fontSize: 18, color: "#a1a1aa", lineHeight: 1.7, maxWidth: 660, margin: "0 auto 30px" }}>
            Born from a desire to bring elegance and intentionality back to everyday objects.
            We curate and craft essentials spanning modern fashion, footwear, beauty, horology, and living.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/shop"
              className="btn primary"
              style={{
                background: "linear-gradient(135deg, #d4af37, #9e7512)",
                color: "#000",
                fontWeight: 700,
                padding: "14px 30px",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(212,175,55,0.3)"
              }}
            >
              Explore Collection <ArrowUpRight size={17} />
            </Link>
            <Link
              href="/categories"
              className="btn ghost"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 999,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center"
              }}
            >
              Browse 20+ Categories
            </Link>
          </div>
        </div>
      </MotionReveal>

      {/* 3 Pillars Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, margin: "50px 0" }}>
        {[
          {
            icon: Sparkles,
            title: "Uncompromising Design",
            desc: "Every silhouette, stitch, and finish is chosen for lasting architectural beauty and tactile delight."
          },
          {
            icon: ShieldCheck,
            title: "Ethical Craftsmanship",
            desc: "Sustainably sourced organic fibers, recycled precious metals, and fair artisan partnerships worldwide."
          },
          {
            icon: Globe,
            title: "Global Concierge",
            desc: "Complimentary insured express delivery and 24/7 dedicated personal shopping support in over 80 countries."
          }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              style={{
                background: "rgba(18, 18, 24, 0.65)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderRadius: 20,
                padding: "36px 30px",
                transition: "transform 0.3s ease, border-color 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(212, 175, 55, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffd875",
                  marginBottom: 20
                }}
              >
                <Icon size={22} />
              </div>
              <h3 style={{ fontSize: 20, color: "#fff", marginBottom: 12, fontWeight: 700 }}>{item.title}</h3>
              <p style={{ color: "#a1a1aa", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
