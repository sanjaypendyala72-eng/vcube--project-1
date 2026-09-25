/**
 * NEXORA MASTER MOTION SYSTEM & MOTION TOKENS
 * SHOP • STYLE • LIVE BETTER
 * 
 * Standardized easing, timings, stagger intervals and media query checks.
 */

export const MOTION_TOKENS = {
  // Durations
  FAST: 180,       // 150-200ms
  NORMAL: 320,     // 250-400ms
  MEDIUM: 500,     // 400-600ms
  SLOW: 750,       // 600-900ms
  CINEMATIC: 1100, // 900-1400ms
  STAGGER: 80,     // 60-120ms

  // Easings
  PRIMARY_EASING: "cubic-bezier(0.22, 1, 0.36, 1)",
  SMOOTH: "cubic-bezier(0.4, 0, 0.2, 1)",
  EXIT: "cubic-bezier(0.4, 0, 1, 1)",
  CINEMATIC_EASING: "cubic-bezier(0.16, 1, 0.3, 1)",
};

/**
 * Hook to detect prefers-reduced-motion
 */
export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return reducedMotion;
}
