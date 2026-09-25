import React from "react";
import { ArrowUpDown } from "lucide-react";

export default function SortDropdown({ sortValue, onChangeSort }) {
  return (
    <div className="nexora-sort-dropdown" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <ArrowUpDown size={14} color="#8e8e99" />
      <select
        value={sortValue}
        onChange={(e) => onChangeSort(e.target.value)}
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "6px",
          color: "#f5f5f7",
          padding: "8px 12px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "12px",
          fontWeight: "600",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <option value="featured" style={{ background: "#111", color: "#fff" }}>Featured Curation</option>
        <option value="price-low" style={{ background: "#111", color: "#fff" }}>Price: Low → High</option>
        <option value="price-high" style={{ background: "#111", color: "#fff" }}>Price: High → Low</option>
        <option value="rating" style={{ background: "#111", color: "#fff" }}>Highest Rated (★)</option>
        <option value="reviews" style={{ background: "#111", color: "#fff" }}>Most Popular</option>
      </select>
    </div>
  );
}
