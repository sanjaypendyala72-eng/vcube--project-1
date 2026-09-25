import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${className}`}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className={`theme-toggle-inner ${isDark ? "is-dark" : "is-light"}`}>
        <span className="theme-icon sun-icon">
          <Sun size={17} strokeWidth={2.2} />
        </span>
        <span className="theme-icon moon-icon">
          <Moon size={16} strokeWidth={2.2} />
        </span>
      </div>
      <span className="theme-toggle-glow" aria-hidden="true" />
    </button>
  );
}
