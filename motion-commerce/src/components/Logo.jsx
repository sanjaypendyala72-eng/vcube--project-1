import React, { useState, useEffect } from "react";
import LogoCinematicBackground from "./LogoCinematicMotion";
import UniversalLink from "./UniversalLink";

export default function Logo({ isScrolled = false }) {
  const [hovered, setHovered] = useState(false);
  const [animStage, setAnimStage] = useState(0); // 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 (settled)

  const letters = ["N", "E", "X", "O", "R", "A"];

  useEffect(() => {
    // Exact timed sequence synchronized with background (0.0s -> 1.4s)
    const t1 = setTimeout(() => setAnimStage(1), 50);    // Particle appears
    const t2 = setTimeout(() => setAnimStage(2), 220);   // Radial glow & trail begin
    const t3 = setTimeout(() => setAnimStage(3), 450);   // N monogram & text reveal begins
    const t4 = setTimeout(() => setAnimStage(4), 750);   // Monogram completes with shine
    const t5 = setTimeout(() => setAnimStage(5), 980);   // Wordmark fully revealed
    const t6 = setTimeout(() => setAnimStage(6), 1180);  // Tagline appears & background enters ambient idle motion

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  return (
    <UniversalLink
      to="/"
      className={`nexora-logo-wrap stage-${animStage} ${hovered ? "is-hovered" : ""} ${isScrolled ? "is-scrolled" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="NEXORA Homepage"
    >
      {/* 10-Layer Cinematic Background Motion System (Behind Logo, z-index: 0) */}
      <LogoCinematicBackground
        isHovered={hovered}
        isScrolled={isScrolled}
        animStage={animStage}
      />
      {/* 1 & 2: Dynamic Glowing Particle & Curved Light Trail */}
      <div className="header-logo-spark-track" aria-hidden="true">
        <svg className="header-trail-svg" viewBox="0 0 160 60" fill="none">
          <defs>
            <linearGradient id="trailGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor="rgba(255, 245, 200, 0.95)" />
              <stop offset="70%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
            </linearGradient>
            <filter id="trailBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            className="trail-curved-path"
            d="M 5,45 C 30,10 50,50 80,18 S 120,40 155,20"
            stroke="url(#trailGlowGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#trailBlur)"
          />
        </svg>
        <span className="golden-lead-particle" />
      </div>

      {/* 3 & 4: 3D Sculpted Monogram Symbol 'N' */}
      <div className="logo-symbol-container" aria-hidden="true">
        {/* Monogram image with rich 3D gold lighting */}
        <div className="logo-symbol-emblem-frame">
          <img
            src="/api/logo"
            alt="NEXORA Monogram"
            className="logo-emblem-img"
          />
          {/* Radiant Corner Sparkle Flare */}
          <div className="monogram-corner-sparkle" />
          {/* Luminous Inner Reflection Sheen */}
          <div className="monogram-sheen-overlay" />
        </div>
        <div className="symbol-radial-aura" />
      </div>

      {/* 5 & 6: Wordmark & Letter-by-Letter Typography Reveal */}
      <div className="logo-brand-block">
        <div className="logo-wordmark">
          {letters.map((char, index) => (
            <span
              key={index}
              className="logo-letter"
              style={{ "--letter-idx": index }}
            >
              {char}
            </span>
          ))}
          <span className="logo-period">.</span>
        </div>
        <div className="logo-tagline">
          <span>SHOP</span>
          <span className="bullet">•</span>
          <span>STYLE</span>
          <span className="bullet">•</span>
          <span>LIVE BETTER</span>
        </div>
      </div>

      {/* 7: Final Settle Light Sweep on Hover */}
      <div className="logo-hover-sheen-sweep" aria-hidden="true" />
    </UniversalLink>
  );
}
