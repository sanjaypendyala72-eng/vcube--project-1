import React from "react";
import { MotionReveal, StaggerContainer, StaggerItem } from "./MotionComponents";
import UniversalLink from "./UniversalLink";
import "./Footer.css";

const FOOTER_LINKS = {
  shop: [
    { label: "Shop All", path: "/shop" },
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Best Sellers", path: "/shop?sort=best" },
    { label: "Collections", path: "/collections" },
  ],
  categories: [
    { label: "Fashion", path: "/shop?category=Fashion" },
    { label: "Accessories", path: "/shop?category=Accessories" },
    { label: "Shoes", path: "/shop?category=Shoes" },
    { label: "Bags", path: "/shop?category=bags" },
    { label: "Watches", path: "/shop?category=watches" },
    { label: "Beauty", path: "/shop?category=Beauty" },
  ],
  support: [
    { label: "Help Center", path: "/help" },
    { label: "Track Order", path: "/account?section=track" },
    { label: "Returns", path: "/help?topic=returns" },
    { label: "Shipping", path: "/help?topic=shipping" },
    { label: "FAQs", path: "/help?topic=faq" },
    { label: "Contact", path: "/contact" },
  ],
  company: [
    { label: "About", path: "/about" },
    { label: "Our Story", path: "/about?section=story" },
    { label: "Sustainability", path: "/help?topic=sustainability" },
    { label: "Careers", path: "/about?section=careers" },
  ],
  legal: [
    { label: "Privacy Policy", path: "/help?topic=privacy" },
    { label: "Terms", path: "/help?topic=terms" },
    { label: "Cookies", path: "/help?topic=cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="nexora-footer">
      <div className="footer-inner">
        {/* Top Row — Logo & Columns */}
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand-column">
            <UniversalLink to="/" className="footer-logo" aria-label="NEXORA Homepage">
              <img 
                src="/nexora/api/logo-wide" 
                alt="NEXORA" 
                className="animated-wide-logo footer-animated"
              />
            </UniversalLink>
            <p className="footer-brand-desc">
              Curated luxury fashion, fine craftsmanship, and elevated lifestyle essentials designed to inspire modern living.
            </p>

            {/* Social Icons moved directly underneath the brand description */}
            <div className="footer-brand-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="social-icon-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a4 4 0 1 1 8 0c0 2.5-1.5 5-4 6.5"/><path d="M12 2a10 10 0 1 0 4 19.17"/><path d="M9.5 14.6L8 22"/></svg>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          <div className="footer-columns">
            <div className="footer-col">
              <h4>SHOP</h4>
              {FOOTER_LINKS.shop.map((l) => (
                <UniversalLink key={l.label} to={l.path}>{l.label}</UniversalLink>
              ))}
            </div>
            <div className="footer-col">
              <h4>CATEGORIES</h4>
              {FOOTER_LINKS.categories.map((l) => (
                <UniversalLink key={l.label} to={l.path}>{l.label}</UniversalLink>
              ))}
            </div>
            <div className="footer-col">
              <h4>SUPPORT</h4>
              {FOOTER_LINKS.support.map((l) => (
                <UniversalLink key={l.label} to={l.path}>{l.label}</UniversalLink>
              ))}
            </div>
            <div className="footer-col">
              <h4>COMPANY</h4>
              {FOOTER_LINKS.company.map((l) => (
                <UniversalLink key={l.label} to={l.path}>{l.label}</UniversalLink>
              ))}
            </div>
            <div className="footer-col">
              <h4>LEGAL</h4>
              {FOOTER_LINKS.legal.map((l) => (
                <UniversalLink key={l.label} to={l.path}>{l.label}</UniversalLink>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span className="footer-copyright">© 2026 NEXORA. All rights reserved.</span>
          <span className="footer-bottom-tagline">SHOP • STYLE • LIVE BETTER</span>
        </div>
      </div>
    </footer>
  );
}
