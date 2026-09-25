import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown, Check } from "lucide-react";
import "./MotionComponents.css";

/**
 * 15 — SCROLL REVEAL & REUSABLE <MotionReveal />
 * Uses IntersectionObserver to trigger once when entering viewport.
 */
export function MotionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up", // up, down, left, right, none
  distance = 30,
  duration = 450,
  threshold = 0.1,
  tag = "div",
  style = {}
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const Tag = tag;

  return (
    <Tag
      ref={domRef}
      className={`nexora-motion-reveal ${isVisible ? "is-revealed" : ""} ${className}`}
      style={{
        "--reveal-delay": `${delay}ms`,
        "--reveal-duration": `${duration}ms`,
        "--reveal-distance": `${distance}px`,
        ...style
      }}
      data-direction={direction}
    >
      {children}
    </Tag>
  );
}

/**
 * 16 — STAGGERED CARD REVEAL: <StaggerContainer /> & <StaggerItem />
 */
export function StaggerContainer({
  children,
  className = "",
  staggerInterval = 80,
  baseDelay = 0,
  tag = "div"
}) {
  const Tag = tag;
  const childrenArray = React.Children.toArray(children);

  return (
    <Tag className={`stagger-container ${className}`}>
      {childrenArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          style: {
            ...child.props.style,
            "--stagger-delay": `${baseDelay + index * staggerInterval}ms`
          }
        });
      })}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className = "",
  style = {},
  tag = "div"
}) {
  const Tag = tag;
  const [isRevealed, setIsRevealed] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={domRef}
      className={`stagger-item ${isRevealed ? "is-revealed" : ""} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

/**
 * 21 — BUTTON MAGNETIC MOTION: <MagneticButton />
 * Max movement: 4-8px, follows cursor smoothly, returns on leave, disabled on touch & reduced motion.
 */
export function MagneticButton({
  children,
  className = "",
  maxDisplacement = 6,
  as: Component = "div",
  onClick,
  ...props
}) {
  const btnRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    if (typeof window !== "undefined") {
      if (window.matchMedia("(pointer: coarse)").matches) return; // Touch device
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    }

    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setOffset({
      x: deltaX * maxDisplacement,
      y: deltaY * maxDisplacement
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <Component
      ref={btnRef}
      className={`magnetic-btn ${isHovered ? "is-hovered" : ""} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        ...props.style
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * 22 — BUTTON SHINE SWEEP: <ShineButton />
 * Soft light highlight travels LEFT -> RIGHT on hover (500-700ms).
 */
export function ShineButton({
  children,
  className = "",
  variant = "primary", // primary, ghost, outline
  as: Component = "button",
  onClick,
  ...props
}) {
  return (
    <Component
      className={`shine-button btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="shine-btn-content">{children}</span>
      <span className="shine-sweep-light" aria-hidden="true" />
    </Component>
  );
}

/**
 * 24 — DROPDOWN ANIMATION: <AnimatedDropdown />
 * opacity: 0 -> 1, translateY(-5px) -> translateY(0) in 200-300ms.
 */
export function AnimatedDropdown({
  label,
  options = [],
  value,
  onChange,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={dropdownRef} className={`animated-dropdown-wrapper ${className}`}>
      <button
        type="button"
        className="dropdown-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : label}</span>
        <ChevronDown size={14} className={`dropdown-chevron ${isOpen ? "is-open" : ""}`} />
      </button>

      <div className={`dropdown-menu-card ${isOpen ? "is-open" : ""}`} role="listbox">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`dropdown-item-btn ${value === opt.value ? "is-selected" : ""}`}
            onClick={() => {
              onChange(opt.value);
              setIsOpen(false);
            }}
          >
            <span>{opt.label}</span>
            {value === opt.value && <Check size={14} className="dropdown-check" />}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * 23 & 09 — ANIMATED DRAWER: <AnimatedDrawer />
 * Right-side or left-side drawer with smooth backdrop and sequential content entry.
 */
export function AnimatedDrawer({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  className = ""
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`animated-drawer-portal is-open ${className}`} role="dialog" aria-modal="true">
      <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className={`drawer-panel pos-${position}`}>
        <div className="drawer-header">
          {title && <h3 className="drawer-title">{title}</h3>}
          <button type="button" className="drawer-close-btn" onClick={onClose} aria-label="Close panel">
            <X size={18} />
          </button>
        </div>
        <div className="drawer-body">{children}</div>
      </aside>
    </div>
  );
}

/**
 * 25 — QUICK-VIEW MODAL: <AnimatedModal />
 * Overlay fade in, modal scale(0.96) -> scale(1), opacity: 0 -> 1 in 300-450ms.
 */
export function AnimatedModal({
  isOpen,
  onClose,
  title,
  children,
  className = ""
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`animated-modal-portal ${className}`} role="dialog" aria-modal="true">
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-container">
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
          {title && <h3 className="modal-title">{title}</h3>}
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * 28 — NUMBER COUNTER: <AnimatedCounter />
 * Animates 0 -> targetValue only once when entering viewport.
 */
export function AnimatedCounter({
  target = 5000,
  suffix = "+",
  prefix = "",
  duration = 1600,
  className = ""
}) {
  const [count, setCount] = useState(0);
  const domRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out quart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * target));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          window.requestAnimationFrame(step);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={domRef} className={`animated-counter-value ${className}`}>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/**
 * 31 — SKELETON SHIMMER: <SkeletonLoader />
 * Subtle shimmer from LEFT -> RIGHT without heavy animated gradients.
 */
export function SkeletonLoader({
  width = "100%",
  height = "20px",
  borderRadius = "8px",
  className = "",
  style = {}
}) {
  return (
    <div
      className={`skeleton-shimmer-box ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
      aria-hidden="true"
    />
  );
}

/**
 * 33 — ACCORDION REVEAL: <Accordion />
 * Smooth height & opacity reveal with accessible button controls.
 */
export function Accordion({ items = [], allowMultiple = false, className = "" }) {
  const [openIndices, setOpenIndices] = useState([0]);

  const toggleIndex = (index) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`nexora-accordion-group ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <div key={idx} className={`accordion-row ${isOpen ? "is-expanded" : ""}`}>
            <button
              type="button"
              className="accordion-header-btn"
              onClick={() => toggleIndex(idx)}
              aria-expanded={isOpen}
            >
              <span className="accordion-title">{item.title}</span>
              <ChevronDown size={16} className={`accordion-icon ${isOpen ? "is-open" : ""}`} />
            </button>
            <div
              className="accordion-collapse-panel"
              style={{
                maxHeight: isOpen ? "400px" : "0px",
                opacity: isOpen ? 1 : 0
              }}
            >
              <div className="accordion-body-text">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * 14 — HERO PARALLAX: <ParallaxSection />
 * Subtle multi-layer parallax: foreground small movement, background slightly larger movement.
 * Disabled for prefers-reduced-motion and touch screens.
 */
export function ParallaxSection({
  children,
  speed = 0.12,
  className = "",
  style = {}
}) {
  const sectionRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // Disable on touch

    let ticking = false;
    const handleScroll = () => {
      if (!ticking && sectionRef.current) {
        window.requestAnimationFrame(() => {
          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Calculate distance from screen center
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            const distanceFromCenter = rect.top + rect.height / 2 - windowHeight / 2;
            setOffsetY(distanceFromCenter * speed * -1);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={sectionRef}
      className={`parallax-section-wrapper ${className}`}
      style={{
        transform: `translate3d(0, ${offsetY}px, 0)`,
        ...style
      }}
    >
      {children}
    </div>
  );
}

/**
 * 27 — QUANTITY MICRO-MOTION: <QuantitySelector />
 * Number subtly scales (1 -> 1.08 -> 1) with tactile button states.
 */
export function QuantitySelector({
  value = 1,
  onChange,
  min = 1,
  max = 99,
  className = ""
}) {
  const [pulse, setPulse] = useState(false);

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (value > min) {
      triggerPulse();
      onChange(value - 1);
    }
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (value < max) {
      triggerPulse();
      onChange(value + 1);
    }
  };

  const triggerPulse = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 260);
  };

  return (
    <div className={`quantity-micro-selector ${className}`}>
      <button
        type="button"
        className="qty-btn qty-minus"
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={`qty-number ${pulse ? "is-pulsing" : ""}`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="qty-btn qty-plus"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

/**
 * 29 — CHECKOUT PROGRESS: <CheckoutProgress />
 * Cart -> Address -> Payment -> Confirmation with smooth indicator and checkmark animation.
 */
export function CheckoutProgress({ currentStep = 1 }) {
  const steps = [
    { num: 1, label: "Information" },
    { num: 2, label: "Delivery" },
    { num: 3, label: "Payment" },
    { num: 4, label: "Confirmation" }
  ];

  return (
    <div className="checkout-progress-stepper" aria-label="Checkout Progress">
      <div className="stepper-track-bg">
        <div
          className="stepper-track-fill"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      <div className="stepper-nodes">
        {steps.map((s) => {
          const isDone = currentStep > s.num;
          const isCurrent = currentStep === s.num;

          return (
            <div
              key={s.num}
              className={`stepper-node ${isDone ? "is-done" : ""} ${isCurrent ? "is-current" : ""}`}
            >
              <div className="node-circle">
                {isDone ? <Check size={14} className="node-check-icon" /> : s.num}
              </div>
              <span className="node-label">{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 30 — SUCCESS ANIMATION: <OrderSuccessCheckmark />
 * Elegant checkmark drawing animation with scale and gold ambient burst.
 */
export function OrderSuccessCheckmark() {
  return (
    <div className="order-success-animation-wrap">
      <div className="success-radial-burst" aria-hidden="true" />
      <svg className="success-checkmark-svg" viewBox="0 0 52 52">
        <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
        <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
    </div>
  );
}
