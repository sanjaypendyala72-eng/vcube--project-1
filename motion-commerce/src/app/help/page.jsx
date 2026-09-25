import React, { Suspense } from "react";
import HelpContent from "./HelpContent";
import "./HelpPage.css";

export const metadata = {
  title: "Help Center & Legal - NEXORA",
  description: "Customer support, shipping information, returns, and legal documentation for NEXORA.",
};

export default function HelpPage() {
  return (
    <main className="help-page-container">
      <div className="help-hero">
        <span className="help-eyebrow">SUPPORT & LEGAL</span>
        <h1>How can we help?</h1>
      </div>
      <Suspense fallback={<div className="help-loading">Loading support center...</div>}>
        <HelpContent />
      </Suspense>
    </main>
  );
}
