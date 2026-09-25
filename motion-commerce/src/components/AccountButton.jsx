import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, ShieldCheck, Settings, Package, ChevronDown } from "lucide-react";
import { useAuth } from "../AuthContext";

export default function AccountButton() {
  const { user, logout, setAuthModalOpen, setAuthMode } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="account-motion-wrapper"
      style={{ "--stagger-delay": "960ms" }}
    >
      {user ? (
        <button
          className="header-user-btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
          aria-label={`User profile menu for ${user.name}`}
        >
          <span className="user-avatar-gold">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </span>
          <span className="user-firstname-text">
            {user.name ? user.name.split(" ")[0] : "Account"}
          </span>
          <ChevronDown
            size={12}
            className={`user-chevron ${dropdownOpen ? "open" : ""}`}
            aria-hidden="true"
          />
        </button>
      ) : (
        <button
          className="header-action-btn account-login-btn"
          onClick={() => {
            setAuthMode("login");
            setAuthModalOpen(true);
          }}
          aria-label="Sign in to your account"
        >
          <div className="btn-icon-wrapper">
            <User size={19} className="account-icon-svg" />
          </div>
        </button>
      )}

      {/* Account Dropdown Menu */}
      {user && dropdownOpen && (
        <div className="account-dropdown-menu">
          <div className="account-dropdown-header">
            <div className="user-info-name">{user.name}</div>
            <div className="user-info-email">{user.email}</div>
            <div
              className={`user-security-badge ${
                user.isVerified ? "is-verified" : "is-unverified"
              }`}
            >
              <ShieldCheck size={12} />
              <span>{user.isVerified ? "Verified Account" : "Unverified"}</span>
            </div>
          </div>

          <div className="account-dropdown-links">
            <button
              className="account-menu-item"
              onClick={() => {
                setDropdownOpen(false);
                router.push("/cart");
              }}
            >
              <Package size={14} />
              <span>Orders & Bag</span>
            </button>
            <button
              className="account-menu-item"
              onClick={() => {
                setDropdownOpen(false);
                setAuthMode("register");
                setAuthModalOpen(true);
              }}
            >
              <Settings size={14} />
              <span>Account Security</span>
            </button>
            <button
              className="account-menu-item text-danger"
              onClick={() => {
                setDropdownOpen(false);
                logout();
              }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
