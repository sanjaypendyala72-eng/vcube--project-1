import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ArrowUpRight } from "lucide-react";
import "./HeroProductShowcase.css";

// 7 Diverse Hero Showcase Transition Styles
const TRANSITION_STYLES = [
  "style-cinematic-zoom",
  "style-3d-flip",
  "style-cube-rotate",
  "style-particle-dissolve",
  "style-glitch-sheen",
  "style-perspective-tilt",
  "style-liquid-blur"
];

export default function HeroProductShowcase({ products = [] }) {
  // Use curated products spanning across 20+ distinct categories
  const showcaseList = (products && products.length > 0 ? products : []).slice(0, 24);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [transitionStyle, setTransitionStyle] = useState(TRANSITION_STYLES[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("next"); // 'next' | 'prev'

  const currentItem = showcaseList[currentIndex] || {
    id: "aero-01",
    name: "Aero Runner X1",
    categoryName: "Shoes & Footwear",
    price: 4999,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
    tag: "FEATURED ESSENTIAL"
  };

  const prevItem = prevIndex !== null ? showcaseList[prevIndex] : null;

  const triggerChange = (newIndex, dir = "next") => {
    if (isAnimating || newIndex === currentIndex || showcaseList.length === 0) return;
    setIsAnimating(true);
    setDirection(dir);
    setPrevIndex(currentIndex);
    setCurrentIndex(newIndex);
    
    // Cycle through multiple transition effects
    const nextStyle = TRANSITION_STYLES[newIndex % TRANSITION_STYLES.length];
    setTransitionStyle(nextStyle);

    setTimeout(() => {
      setIsAnimating(false);
      setPrevIndex(null);
    }, 750);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % showcaseList.length;
    triggerChange(nextIdx, "next");
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + showcaseList.length) % showcaseList.length;
    triggerChange(prevIdx, "prev");
  };

  // Auto-play timer: transitions automatically every 3.8s with smooth consuming time motion
  useEffect(() => {
    if (isPaused || showcaseList.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3800);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, showcaseList.length]);

  return (
    <div
      className="hero-showcase-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Depth Card Viewport */}
      <div className={`hero-showcase-stage ${transitionStyle} dir-${direction} ${isAnimating ? "animating" : ""}`}>
        
        {/* Outgoing product during animated transition */}
        {prevItem && (
          <div className="showcase-card showcase-card-prev" key={`prev-${prevItem.id}`}>
            <img
              src={prevItem.image}
              alt={prevItem.name}
              className="showcase-img"
            />
            <div className="showcase-badge-glass">
              <span className="showcase-cat-tag">
                <Sparkles size={11} /> {prevItem.categoryName || prevItem.category || "ESSENTIAL"}
              </span>
              <strong className="showcase-name">{prevItem.name}</strong>
            </div>
          </div>
        )}

        {/* Incoming / Active Product */}
        <div className="showcase-card showcase-card-active" key={`curr-${currentItem.id}`}>
          <div className="showcase-glare" />
          <img
            src={currentItem.image}
            alt={currentItem.name}
            className="showcase-img"
          />

        </div>



        {/* Dynamic Light Rays / Sheen Flash during transition */}
        <div className="showcase-light-sweep" />
      </div>

      {/* Navigation Controls & Micro-Thumbnails */}
      <div className="showcase-controls-bar">
        {/* Left / Right arrow triggers */}
        <div className="showcase-nav-btns">
          <button
            type="button"
            className="showcase-arrow-btn"
            onClick={handlePrev}
            aria-label="Previous product"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="showcase-counter">
            <b>{String(currentIndex + 1).padStart(2, "0")}</b> / {String(showcaseList.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="showcase-arrow-btn"
            onClick={handleNext}
            aria-label="Next product"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Auto Transition Motion Timer Indicator Bar */}
        <div className="showcase-timer-bar" title={isPaused ? "Paused on hover" : "Auto-transition active"}>
          <div
            key={`timer-${currentIndex}-${isPaused}`}
            className={`showcase-timer-fill ${isPaused ? "paused" : ""}`}
            style={{ animationDuration: "3.8s" }}
          />
        </div>

        {/* Interactive Progress Indicator Dots (20+ categories showcase) */}
        <div className="showcase-dots-track">
          {showcaseList.slice(0, 12).map((prod, idx) => (
            <button
              key={prod.id || idx}
              type="button"
              className={`showcase-dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => triggerChange(idx, idx > currentIndex ? "next" : "prev")}
              title={prod.name}
              aria-label={`Go to ${prod.name}`}
            />
          ))}
          {showcaseList.length > 12 && (
            <span className="showcase-more-indicator">+{showcaseList.length - 12}</span>
          )}
        </div>
      </div>
    </div>
  );
}
