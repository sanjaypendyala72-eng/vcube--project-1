import React, { useEffect, useRef, useState } from "react";
import "./LogoCinematicMotion.css";

/**
 * NEXORA HEADER LOGO — CINEMATIC BACKGROUND MOTION SYSTEM
 * 
 * Implements the 22-point luxury specification:
 * - 10-Layer visual depth architecture behind the logo (z-index: 0 to 2)
 * - 3-4 delicate champagne-gold silk light trails with curved paths & core brightness
 * - Micro golden dust & floating embers (translateY -10px to -40px, 4-10s duration)
 * - Occasional sparse star-like sparkle highlights (1 at a time, 600-1200ms)
 * - Breathing soft golden radial glow & aurora waves
 * - Periodic cinematic light sweep (every 9s, LEFT -> CENTER -> RIGHT)
 * - Interactive pointer parallax (subtle 2-8px drift, keeping logo stable)
 * - Synchronized initial timeline (0.0s dark -> 0.15s spark -> 0.25s glow -> 0.45s text -> 1.15s tagline -> 1.4s settle)
 * - Responsive & reduced-motion compliant (pure GPU CSS transforms & opacity)
 */
export default function LogoCinematicBackground({
  isHovered = false,
  isScrolled = false,
  animStage = 6
}) {
  const containerRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activeSparkle, setActiveSparkle] = useState({ id: 0, x: 50, y: 50, visible: false });

  // 12 — MOUSE / POINTER LOW-INTENSITY PARALLAX (2px to 6px subtle shift)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      if (typeof window !== "undefined") {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Clamped subtle parallax (max 5px)
      const clampedX = Math.max(-1, Math.min(1, relX)) * 5;
      const clampedY = Math.max(-1, Math.min(1, relY)) * 4;

      setMouseOffset({ x: clampedX, y: clampedY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 6 — OCCASIONAL EXPENSIVE SPARKLE EFFECT (Sparse, never simultaneous, 600-1200ms)
  useEffect(() => {
    let sparkleTimer;
    let hideTimer;

    const triggerSparkle = () => {
      // Pick elegant random coordinates surrounding the logo
      const spots = [
        { x: 18, y: 22 },
        { x: 38, y: 65 },
        { x: 72, y: 28 },
        { x: 86, y: 70 },
        { x: 52, y: 15 },
        { x: 92, y: 35 }
      ];
      const spot = spots[Math.floor(Math.random() * spots.length)];

      setActiveSparkle({
        id: Date.now(),
        x: spot.x,
        y: spot.y,
        visible: true
      });

      // Disappear after 850ms
      hideTimer = setTimeout(() => {
        setActiveSparkle((prev) => ({ ...prev, visible: false }));
      }, 850);

      // Next sparkle after random delay between 4.5s and 8.5s
      const nextDelay = 4500 + Math.random() * 4000;
      sparkleTimer = setTimeout(triggerSparkle, nextDelay);
    };

    sparkleTimer = setTimeout(triggerSparkle, 3000);

    return () => {
      clearTimeout(sparkleTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`nexora-logo-cinematic-bg stage-${animStage} ${
        isHovered ? "is-hovered" : ""
      } ${isScrolled ? "is-scrolled" : ""}`}
      aria-hidden="true"
      style={{
        "--parallax-x": `${mouseOffset.x}px`,
        "--parallax-y": `${mouseOffset.y}px`
      }}
    >
      {/* LAYER 1: Deep Black / Charcoal Soft Backdrop */}
      <div className="bg-layer layer-charcoal-base" />

      {/* LAYER 2: Soft Radial Breathing Golden Glow (6-10s duration) */}
      <div className="bg-layer layer-breathing-radial-glow" />

      {/* LAYER 3: Aurora-like Golden Light Waves */}
      <div className="bg-layer layer-aurora-waves" />

      {/* LAYER 4: 3 Ultra-thin Silk Golden Light Trails */}
      <svg className="bg-layer layer-light-trails" viewBox="0 0 320 120" preserveAspectRatio="none">
        <defs>
          {/* Core high-intensity gradient with soft champagne falloff */}
          <linearGradient id="silkTrail1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 0)" />
            <stop offset="25%" stopColor="rgba(212, 175, 55, 0.18)" />
            <stop offset="50%" stopColor="rgba(255, 247, 230, 0.7)" />
            <stop offset="75%" stopColor="rgba(212, 175, 55, 0.25)" />
            <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
          </linearGradient>

          <linearGradient id="silkTrail2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(245, 230, 179, 0)" />
            <stop offset="35%" stopColor="rgba(212, 175, 55, 0.22)" />
            <stop offset="55%" stopColor="rgba(255, 255, 255, 0.6)" />
            <stop offset="80%" stopColor="rgba(212, 175, 55, 0.12)" />
            <stop offset="100%" stopColor="rgba(245, 230, 179, 0)" />
          </linearGradient>

          <linearGradient id="silkTrail3" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 0)" />
            <stop offset="45%" stopColor="rgba(245, 230, 179, 0.35)" />
            <stop offset="55%" stopColor="rgba(255, 247, 230, 0.65)" />
            <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
          </linearGradient>

          <filter id="silkGlowBlur1" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur1" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="silkGlowBlur2" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Trail 1: Top-left to bottom-right elegant curve */}
        <path
          className="silk-trail trail-1"
          d="M -30,25 C 60,-10 140,85 240,40 S 330,85 360,20"
          stroke="url(#silkTrail1)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          filter="url(#silkGlowBlur1)"
        />

        {/* Trail 2: Bottom-left weaving upward behind wordmark */}
        <path
          className="silk-trail trail-2"
          d="M -20,95 C 70,120 120,25 210,75 S 290,15 350,90"
          stroke="url(#silkTrail2)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          filter="url(#silkGlowBlur2)"
        />

        {/* Trail 3: Whisper-thin horizontal wavy filament */}
        <path
          className="silk-trail trail-3"
          d="M -10,55 C 80,42 160,68 250,50 S 320,60 360,48"
          stroke="url(#silkTrail3)"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* LAYER 5 & 6: Controlled Floating Micro Gold Dust Particles */}
      <div className="bg-layer layer-micro-particles">
        <span className="gold-particle p1" style={{ top: "35%", left: "12%" }} />
        <span className="gold-particle p2" style={{ top: "68%", left: "26%" }} />
        <span className="gold-particle p3" style={{ top: "22%", left: "54%" }} />
        <span className="gold-particle p4" style={{ top: "72%", left: "75%" }} />
        <span className="gold-particle p5" style={{ top: "45%", left: "88%" }} />
        <span className="gold-particle p6" style={{ top: "18%", left: "93%" }} />
      </div>

      {/* LAYER 7: Occasional Golden Sparkle Star Highlight */}
      {activeSparkle.visible && (
        <div
          className="bg-layer layer-single-sparkle"
          style={{
            left: `${activeSparkle.x}%`,
            top: `${activeSparkle.y}%`
          }}
        >
          <div className="sparkle-diamond" />
          <div className="sparkle-flare-h" />
          <div className="sparkle-flare-v" />
        </div>
      )}

      {/* LAYER 8: Periodic Cinematic Light Sweep (every 9s or hover) */}
      <div className="bg-layer layer-cinematic-sweep" />
    </div>
  );
}
