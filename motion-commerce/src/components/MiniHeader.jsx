import React, { useState, useRef, useEffect } from "react";

/**
 * MiniHeader — Animated Brand Ticker
 * 
 * Features:
 * - Infinite seamless marquee: NEXORA ✦ NEXORA ✦ ... scrolling right-to-left
 * - Duplicated content for zero-gap looping via CSS translateX
 * - Hover: pauses/slows animation smoothly
 * - Subtle animated golden gradient glow behind ticker
 * - GPU-friendly: transform translateX only
 * - prefers-reduced-motion: stops or greatly reduces animation
 */
export default function MiniHeader({
  direction = "left",
  text = "NEXORA",
  separator = "✦",
  className = ""
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Build the ticker content — repeated enough to fill wide screens
  const tickerSegment = (
    <>
      <span className="ticker-word">{text}</span>
      <span className="ticker-separator" aria-hidden="true">{separator}</span>
    </>
  );

  // Create enough repetitions for seamless loop
  const repetitions = 12;
  const tickerContent = [];
  for (let i = 0; i < repetitions; i++) {
    tickerContent.push(
      <React.Fragment key={i}>
        {tickerSegment}
      </React.Fragment>
    );
  }

  const directionClass = direction === "right" ? "direction-right" : "direction-left";

  return (
    <div
      className={`mini-header ${directionClass} ${isHovered ? "is-hovered" : ""} ${reducedMotion ? "reduced-motion" : ""} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="marquee"
      aria-label={`${text} brand ticker`}
    >
      {/* Subtle animated golden glow background */}
      <div className="mini-header-glow" aria-hidden="true">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>

      {/* Ticker track — two identical strips side by side for infinite loop */}
      <div className="ticker-track" aria-hidden="false">
        <div className="ticker-strip ticker-strip-1">
          {tickerContent}
        </div>
        <div className="ticker-strip ticker-strip-2" aria-hidden="true">
          {tickerContent}
        </div>
      </div>

      {/* Top/bottom subtle border accents */}
      <div className="mini-header-border-top" aria-hidden="true" />
      <div className="mini-header-border-bottom" aria-hidden="true" />
    </div>
  );
}
