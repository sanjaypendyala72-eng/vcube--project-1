import React, { useEffect, useRef, useState } from "react";
import "./NexoraCinematicAnimation.css";

/**
 * NEXORA CINEMATIC MOTION LOGO ANIMATION
 * 6-Phase Seamless Infinite Loop:
 * 1. Particle Descent (Top -> Down flow of gold embers and light)
 * 2. Ribbon Formation (Particles weave into metallic champagne-gold bezier trails)
 * 3. Step-by-Step "N" Sculpt (Trails trace and form the luxury 3D "N" stem and curve)
 * 4. N Full Reveal & Shimmer (Metallic champagne sheen with moving reflections)
 * 5. Letter-by-Letter "N E X O R A" Reveal (Left to right glow typography)
 * 6. "SHOP • STYLE • LIVE BETTER" reveal & subtle floating breathing state
 * -> Seamless Dissolution & Descent to Bottom: ribbons dissolve downward returning seamlessly to Phase 1.
 */

export default function NexoraCinematicAnimation({ isBackground = true, onToggleExpand }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState(1); // 1 to 6
  const [letterIndex, setLetterIndex] = useState(0);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  const letters = ["N", "E", "X", "O", "R", "A"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 1920);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 1080);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 1920;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 1080;
    };
    window.addEventListener("resize", handleResize);

    // Particle System
    const particleCount = 180;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * -height * 0.5,
      vx: (Math.random() - 0.5) * 1.2,
      vy: Math.random() * 2.2 + 1.2,
      size: Math.random() * 2.5 + 0.8,
      alpha: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      targetN: Math.random() > 0.45 // particles attracted to N shape
    }));

    // Light trails system
    const ribbonTrails = Array.from({ length: 7 }, (_, i) => ({
      offset: i * 0.45,
      speed: 0.008 + i * 0.002,
      amplitude: 60 + i * 15,
      phase: i,
      color: i % 2 === 0 ? "rgba(245, 215, 127, " : "rgba(212, 175, 55, "
    }));

    let startTime = performance.now();
    const CYCLE_DURATION = 13000; // 13 seconds complete infinite cycle

    const render = (now) => {
      const elapsed = (now - startTime) % CYCLE_DURATION;
      const progress = elapsed / CYCLE_DURATION; // 0.0 to 1.0

      // Map progress into 6 distinct cinematic steps
      // 0.00 - 0.18: Phase 1 (Particle Descent)
      // 0.18 - 0.35: Phase 2 (Light Ribbon Formation)
      // 0.35 - 0.52: Phase 3 (Shaping Letter N from top down)
      // 0.52 - 0.70: Phase 4 (N Reveal & Metallic Sheen)
      // 0.70 - 0.84: Phase 5 (Letter-by-Letter NEXORA & Tagline)
      // 0.84 - 1.00: Phase 6 (Dissolution & Downward Flow back to Top)

      let currentPhase = 1;
      if (progress < 0.18) currentPhase = 1;
      else if (progress < 0.35) currentPhase = 2;
      else if (progress < 0.52) currentPhase = 3;
      else if (progress < 0.70) currentPhase = 4;
      else if (progress < 0.85) currentPhase = 5;
      else currentPhase = 6;

      setPhase(currentPhase);

      // Letter-by-letter reveal timing
      if (progress >= 0.68 && progress < 0.88) {
        const letterProgress = (progress - 0.68) / 0.12; // 0 to 1
        const activeLetters = Math.min(6, Math.floor(letterProgress * 6) + 1);
        setLetterIndex(activeLetters);
      } else if (progress >= 0.88) {
        setLetterIndex(6);
      } else {
        setLetterIndex(0);
      }

      setTaglineVisible(progress >= 0.74 && progress < 0.94);

      // Clear with subtle trail retention for cinematic motion blur
      ctx.fillStyle = "rgba(9, 9, 11, 0.28)";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.44;

      // 1. Draw Moving Ambient Ribbon Trails
      ctx.lineWidth = 2.2 * window.devicePixelRatio;
      ribbonTrails.forEach((r, idx) => {
        ctx.beginPath();
        const ribbonProgress = (now * r.speed) % (Math.PI * 2);
        const yStart = 0;
        const yEnd = height;
        
        ctx.moveTo(centerX + Math.sin(ribbonProgress) * r.amplitude, 0);

        for (let y = 0; y < height; y += 40) {
          const wave = Math.sin(y * 0.005 + ribbonProgress + r.offset) * r.amplitude;
          const curveX = centerX + wave;
          ctx.lineTo(curveX, y);
        }

        let ribbonAlpha = 0.18;
        if (currentPhase === 2 || currentPhase === 3) ribbonAlpha = 0.45;
        if (currentPhase === 6) ribbonAlpha = 0.35;

        ctx.strokeStyle = r.color + ribbonAlpha + ")";
        ctx.shadowColor = "rgba(245, 215, 127, 0.6)";
        ctx.shadowBlur = 15;
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      // 2. Draw Flowing Particles Top -> Center -> Bottom
      particles.forEach((p) => {
        p.y += p.vy * (currentPhase === 1 || currentPhase === 6 ? 1.6 : 1.0);
        p.x += p.vx;
        p.pulse += 0.04;

        // Reset seamlessly when flowing past the bottom
        if (p.y > height + 20) {
          p.y = -20 - Math.random() * 50;
          p.x = Math.random() * width;
        }

        // Particle attraction to N logo during formation phases (2, 3, 4)
        if (p.targetN && (currentPhase >= 2 && currentPhase <= 5)) {
          const dx = centerX - p.x;
          p.x += dx * 0.015;
        }

        const currentAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);
        ctx.fillStyle = `rgba(245, 220, 140, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (window.devicePixelRatio * 0.8), 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Central Energy Halo & Champagne Glow
      let haloAlpha = 0.15;
      let haloRadius = 220 * window.devicePixelRatio;
      if (currentPhase >= 3 && currentPhase <= 5) {
        haloAlpha = 0.45;
        haloRadius = 260 * window.devicePixelRatio;
      }
      const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, haloRadius);
      grad.addColorStop(0, `rgba(245, 215, 127, ${haloAlpha})`);
      grad.addColorStop(0.45, `rgba(212, 175, 55, ${haloAlpha * 0.4})`);
      grad.addColorStop(1, "rgba(9, 9, 11, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, haloRadius, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`nexora-cinematic-container ${isBackground ? "mode-bg" : "mode-spotlight"}`}>
      {/* Dynamic 4K Canvas for Light Trails & Particles */}
      <canvas ref={canvasRef} className="nexora-canvas-layer" />

      {/* Cinematic Logo Construction Overlay */}
      <div className={`nexora-motion-stage phase-${phase}`}>
        
        {/* Top Particle Descent & Forming Stream */}
        <div className="flow-light-stream"></div>

        {/* The 3D Sculpted 'N' Monogram */}
        <div className="n-sculpt-wrapper">
          <div className="n-ribbon-trace left-stem"></div>
          <div className="n-ribbon-trace diagonal-swoop"></div>
          <div className="n-ribbon-trace right-stem"></div>
          <div className="n-halo-ring"></div>
          
          {/* Main Metallic Monogram Image */}
          <img
            src="/nexora/api/logo"
            alt="NEXORA Cinematic 3D Monogram"
            className="nexora-master-emblem"
          />
          <div className="n-metallic-sheen"></div>
        </div>

        {/* Phase Indicator & Progress */}
        <div className="cinematic-timeline-badge">
          <span className="live-dot"></span>
          <span className="step-name">
            {phase === 1 && "01 / PARTICLE DESCENT (TOP → CENTER)"}
            {phase === 2 && "02 / GOLDEN RIBBON FORMATION"}
            {phase === 3 && "03 / SCULPTING LETTER 'N' STEP-BY-STEP"}
            {phase === 4 && "04 / METALLIC SHEEN & LOGO REVEAL"}
            {phase === 5 && "05 / BRAND LOCKUP (NEXORA)"}
            {phase === 6 && "06 / CONTINUOUS RETURN DISSOLVE"}
          </span>
        </div>

        {/* Letter-by-Letter Brand Name Reveal */}
        <div className="nexora-brand-lockup">
          <div className="nexora-letters">
            {letters.map((char, idx) => (
              <span
                key={idx}
                className={`letter ${idx < letterIndex ? "revealed" : ""} char-${idx}`}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Tagline Reveal with Elegant Upward Motion */}
          <div className={`nexora-tagline ${taglineVisible ? "revealed" : ""}`}>
            <span>SHOP</span>
            <span className="sep">•</span>
            <span>STYLE</span>
            <span className="sep">•</span>
            <span>LIVE BETTER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
