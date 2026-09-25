"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";
import { AuthProvider } from "../AuthContext";
import AuthModal from "../AuthModal";
import NexoraCinematicAnimation from "../NexoraCinematicAnimation";
import { ThemeProvider } from "../context/ThemeContext";
import { StoreProvider, useStore } from "../context/StoreContext";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", textAlign: "center", color: "#fff", background: "#09090b", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2 style={{ color: "#d4af37", marginBottom: "16px" }}>Something went wrong.</h2>
          <p style={{ color: "#a1a1aa", maxWidth: "500px", marginBottom: "24px" }}>
            {this.state.error?.message || "An unexpected error occurred while rendering this section."}
          </p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = "/"; }}
            style={{ padding: "10px 24px", background: "linear-gradient(135deg, #d4af37, #9e7512)", border: "none", borderRadius: "99px", color: "#000", fontWeight: "700", cursor: "pointer" }}
          >
            Return to Homepage
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function InnerLayoutContent({ children }) {
  const [cinemaMode, setCinemaMode] = useState(false);
  const { cart, isCartOpen, openCart, closeCart, wishlist } = useStore();

  const cartCount = (cart || []).reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0);
  const wishCount = (wishlist || []).length;

  return (
    <>
      {/* Persistent Luxury Background Logo (Subtle Watermark) */}
      <div className="site-bg-logo pos-center">
        <div className="bg-logo-halo" />
        <img src="/nexora/api/logo" alt="NEXORA Background" className="bg-logo-img" />
      </div>

      <NexoraCinematicAnimation isBackground={!cinemaMode} />
      <div className="cinema-mode-toggle">
        <button
          onClick={() => setCinemaMode(!cinemaMode)}
          className={cinemaMode ? "active" : ""}
        >
          {cinemaMode ? "✦ Return to Store" : "✦ Watch Full Cinematic Logo Animation"}
        </button>
      </div>

      <Header
        cartCount={cartCount}
        wishCount={wishCount}
        onOpenCart={openCart}
      />

      <div
        style={{
          opacity: cinemaMode ? 0 : 1,
          pointerEvents: cinemaMode ? "none" : "auto",
          transition: "opacity 0.6s ease",
        }}
      >
        {children}
        <Footer />
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cart={cart}
      />
      <AuthModal />
    </>
  );
}

export default function ClientAppWrapper({ children }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <StoreProvider>
            <InnerLayoutContent>{children}</InnerLayoutContent>
          </StoreProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
