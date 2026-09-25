import React, { useRef, useState, useEffect } from "react";
import UniversalLink from "./UniversalLink";
import "./MotionButton.css";

/**
 * MotionButton
 * Premium animated button component for NEXORA.
 *
 * @param {string} variant - 'primary' | 'premium' | 'secondary' | 'outline' | 'icon'
 * @param {string} href - If provided, renders as a link
 * @param {boolean} magnetic - If true, internal glow follows mouse
 * @param {boolean} particles - If true, renders floating dust particles (auto true for premium)
 * @param {boolean} sweep - If true, adds the light ribbon sweep
 * @param {React.ReactNode} icon - Optional icon element
 */
export default function MotionButton({
  variant = "primary",
  children,
  href,
  onClick,
  className = "",
  magnetic = false,
  particles = false,
  sweep = false,
  icon,
  style = {},
  ...props
}) {
  const btnRef = useRef(null);
  const [pulsePos, setPulsePos] = useState(null);
  const [glowStyle, setGlowStyle] = useState({});

  // Auto-enable particles & sweep for premium variant
  const showParticles = particles || variant === "premium";
  const showSweep = sweep || variant === "premium";

  const handlePointerMove = (e) => {
    if (!magnetic || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Shift background glow slightly towards pointer
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    setGlowStyle({
      background: `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(212, 175, 55, 0.4) 0%, transparent 60%)`,
    });
  };

  const handlePointerLeave = () => {
    if (magnetic) {
      setGlowStyle({}); // Reset to center
    }
  };

  const handleClick = (e) => {
    // Pulse effect
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPulsePos({ x, y, id: Date.now() });
    }
    
    if (onClick) onClick(e);
  };

  const renderContent = () => (
    <>
      <div className="mb-bg-layer" />
      <div className="mb-gradient-layer" />
      
      {/* Magnetic Glow or static glow */}
      <div 
        className="mb-glow-layer" 
        style={Object.keys(glowStyle).length > 0 ? glowStyle : undefined} 
      />

      {showSweep && <div className="mb-ribbon-layer" />}
      
      {showParticles && (
        <div className="mb-particles-layer">
          {/* Render a few random particles */}
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="mb-particle"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `-${Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="mb-border-layer" />

      {pulsePos && (
        <div 
          key={pulsePos.id}
          className="mb-click-pulse" 
          style={{ left: pulsePos.x, top: pulsePos.y }} 
        />
      )}

      <div className="mb-content-layer">
        {children}
        {icon && <span className="mb-icon-arrow">{icon}</span>}
      </div>
    </>
  );

  const classes = `motion-btn mb-variant-${variant} ${className}`;

  if (href) {
    return (
      <UniversalLink 
        to={href} 
        className={classes}
        style={style}
        onClick={handleClick}
        {...props}
      >
        <span 
          ref={btnRef} 
          className="motion-btn-inner" 
          style={{ display: 'contents' }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {renderContent()}
        </span>
      </UniversalLink>
    );
  }

  return (
    <button
      ref={btnRef}
      className={classes}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={style}
      {...props}
    >
      {renderContent()}
    </button>
  );
}
