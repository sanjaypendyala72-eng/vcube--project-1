"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Package, User, Settings, MapPin, Search } from "lucide-react";

export default function AccountContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const querySection = searchParams.get("section");
  
  const [activeSection, setActiveSection] = useState("dashboard");

  // Sync state with URL
  useEffect(() => {
    if (querySection) {
      setActiveSection(querySection);
    } else {
      setActiveSection("dashboard");
    }
  }, [querySection]);

  const handleSelect = (id) => {
    setActiveSection(id);
    router.push(`/account?section=${id}`, { scroll: false });
  };

  return (
    <div className="account-layout">
      {/* Sidebar Navigation */}
      <aside className="account-sidebar">
        <nav className="account-nav-list">
          <button 
            className={`account-nav-btn ${activeSection === "dashboard" ? "active" : ""}`}
            onClick={() => handleSelect("dashboard")}
          >
            <User size={18} /> Profile Dashboard
          </button>
          <button 
            className={`account-nav-btn ${activeSection === "track" || activeSection === "orders" ? "active" : ""}`}
            onClick={() => handleSelect("track")}
          >
            <Package size={18} /> Track Orders
          </button>
          <button 
            className={`account-nav-btn ${activeSection === "addresses" ? "active" : ""}`}
            onClick={() => handleSelect("addresses")}
          >
            <MapPin size={18} /> Saved Addresses
          </button>
          <button 
            className={`account-nav-btn ${activeSection === "settings" ? "active" : ""}`}
            onClick={() => handleSelect("settings")}
          >
            <Settings size={18} /> Account Settings
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <section className="account-content-area">
        {activeSection === "dashboard" && (
          <div className="account-section">
            <h2>Overview</h2>
            <p>Welcome back to your NEXORA account. Here you can manage your personal information, view recent orders, and track active shipments.</p>
            <div className="dashboard-grid">
              <div className="dashboard-card" onClick={() => handleSelect("track")}>
                <Package size={24} />
                <h3>Recent Orders</h3>
                <p>View & track your recent purchases</p>
              </div>
              <div className="dashboard-card" onClick={() => handleSelect("settings")}>
                <Settings size={24} />
                <h3>Preferences</h3>
                <p>Update your personal information</p>
              </div>
            </div>
          </div>
        )}

        {(activeSection === "track" || activeSection === "orders") && (
          <div className="account-section">
            <h2>Track Order</h2>
            <p>Enter your order number to check the current shipping status of your package.</p>
            
            <div className="track-order-box">
              <div className="track-input-group">
                <input type="text" placeholder="e.g., ORD-NEX-883492" className="track-input" />
                <button className="btn primary track-btn">
                  <Search size={16} /> Track
                </button>
              </div>
            </div>

            <div className="recent-orders">
              <h3>Order History</h3>
              <div className="order-list">
                <div className="order-item">
                  <div className="order-header">
                    <span className="order-id">#ORD-NEX-10442</span>
                    <span className="order-status processing">Processing</span>
                  </div>
                  <div className="order-details">
                    <span>Placed on Sep 22, 2026</span>
                    <span>Total: $349.00</span>
                  </div>
                  <button className="order-action-btn">View Details</button>
                </div>
                
                <div className="order-item">
                  <div className="order-header">
                    <span className="order-id">#ORD-NEX-09931</span>
                    <span className="order-status delivered">Delivered</span>
                  </div>
                  <div className="order-details">
                    <span>Placed on Sep 10, 2026</span>
                    <span>Total: $1,250.00</span>
                  </div>
                  <button className="order-action-btn">View Details</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "addresses" && (
          <div className="account-section">
            <h2>Saved Addresses</h2>
            <p>Manage your shipping and billing addresses for faster checkout.</p>
            <div className="address-box">
              <h4>Home</h4>
              <p>123 Luxury Lane<br/>Apt 4B<br/>New York, NY 10001<br/>United States</p>
              <button className="order-action-btn">Edit Address</button>
            </div>
          </div>
        )}

        {activeSection === "settings" && (
          <div className="account-section">
            <h2>Account Settings</h2>
            <form className="settings-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" defaultValue="Alex Morgan" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" defaultValue="alex@example.com" />
              </div>
              <button type="button" className="btn primary">Save Changes</button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
