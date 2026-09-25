/**
 * NEXORA Utility Helpers
 */

/** Format currency in INR or standard notation */
export function formatCurrency(amount) {
  if (amount === undefined || amount === null) return "₹0";
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

/** Calculate discount percentage */
export function calculateDiscount(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/** Truncate text with ellipsis */
export function truncateText(text, maxLength = 80) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "…";
}

/** Generate star array for ratings */
export function getStarRating(rating = 5) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  return { fullStars, hasHalfStar };
}

/** Smooth scroll to top */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
