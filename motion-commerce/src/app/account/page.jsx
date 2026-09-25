import React, { Suspense } from "react";
import AccountContent from "./AccountContent";
import "./AccountPage.css";

export const metadata = {
  title: "My Account & Orders - NEXORA",
  description: "Track your orders, manage your profile, and view your order history.",
};

export default function AccountPage() {
  return (
    <main className="account-page-container">
      <div className="account-hero">
        <span className="account-eyebrow">MY ACCOUNT</span>
        <h1>Welcome Back</h1>
      </div>
      <Suspense fallback={<div className="account-loading">Loading account details...</div>}>
        <AccountContent />
      </Suspense>
    </main>
  );
}
