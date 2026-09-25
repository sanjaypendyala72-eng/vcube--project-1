"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Heart, Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ALL_PRODUCTS, ALL_CATEGORIES } from "../../data";
import { useStore } from "../../context/StoreContext";
import {
  MotionReveal,
  StaggerContainer,
  StaggerItem,
  AnimatedDropdown,
} from "../../components/MotionComponents";

const products = (ALL_PRODUCTS && ALL_PRODUCTS.length > 0 ? ALL_PRODUCTS : []).map(p => ({
  ...p,
  old: p.originalPrice || p.old || Math.round(p.price * 1.25)
}));

const cats = (ALL_CATEGORIES && ALL_CATEGORIES.length > 0 ? ALL_CATEGORIES : []).map(c => c.name);

function ShopContent() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [q, setQ] = useState("");
  const { wishlist, toggleWishlist, addToCart } = useStore();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setFilter(cat);
    }
  }, [searchParams]);

  const sortOptions = [
    { value: "Featured", label: "Featured Curation" },
    { value: "Price: Low → High", label: "Price: Low → High" },
    { value: "Price: High → Low", label: "Price: High → Low" },
    { value: "Top Rated", label: "Top Rated (★)" }
  ];

  const filtered = useMemo(() => {
    let a = products.filter((p) => {
      const matchCat =
        filter === "All" ||
        (p.categoryName && p.categoryName.toLowerCase() === filter.toLowerCase()) ||
        (p.category && p.category.toLowerCase() === filter.toLowerCase()) ||
        (p.categorySlug && p.categorySlug.toLowerCase() === filter.toLowerCase());

      const query = q.trim().toLowerCase();
      const matchQuery =
        !query ||
        (p.name && p.name.toLowerCase().includes(query)) ||
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(query)) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(query));

      return matchCat && matchQuery;
    });

    if (sort === "Price: Low → High") a.sort((x, y) => x.price - y.price);
    if (sort === "Price: High → Low") a.sort((x, y) => y.price - x.price);
    if (sort === "Top Rated") a.sort((x, y) => (y.rating || 0) - (x.rating || 0));
    return a;
  }, [filter, sort, q]);

  return (
    <main className="page">
      <MotionReveal>
        <div className="pageHero">
          <span className="eyebrow">THE COLLECTION</span>
          <h1>Shop the <i>edit.</i></h1>
          <p>Curated luxury and everyday essentials selected for thoughtful living.</p>
        </div>
      </MotionReveal>

      <div className="shopbar">
        <div className="filters">
          {["All", ...cats].map((x) => (
            <button
              className={filter === x ? "sel" : ""}
              onClick={() => setFilter(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="shopbar-actions">
          <div className="shop-search-wrapper">
            <Search size={16} className="shop-search-icon" />
            <input
              type="text"
              placeholder="Search products, brands, tags..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="shop-search-input"
            />
            {q && (
              <button
                type="button"
                className="shop-search-clear"
                onClick={() => setQ("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <AnimatedDropdown
            label="Sort by"
            options={sortOptions}
            value={sort}
            onChange={(val) => setSort(val)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#a1a1aa" }}>
          <p style={{ fontSize: "18px", color: "#e4e4e7", marginBottom: "8px" }}>No items found</p>
          <p style={{ fontSize: "14px" }}>
            No products match the selected category "{filter}" or search term "{q}".
          </p>
          <button
            onClick={() => { setFilter("All"); setQ(""); }}
            style={{
              marginTop: "16px",
              padding: "8px 20px",
              borderRadius: "99px",
              background: "linear-gradient(135deg, #d4af37, #9e7512)",
              color: "#000",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer"
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <StaggerContainer className="products shopgrid" staggerInterval={70}>
          {filtered.map((p) => {
            const isWish = (wishlist || []).includes(p.id);
            return (
              <StaggerItem key={p.id}>
                <article className="card">
                  <div className="pimage">
                    <img loading="lazy" src={p.image} alt={p.name} />
                    <span className="tag">{p.tag || "Luxury"}</span>
                    <button
                      type="button"
                      className={"heart " + (isWish ? "liked" : "")}
                      onClick={() => toggleWishlist(p.id)}
                      aria-label="Wishlist"
                    >
                      <Heart
                        size={17}
                        fill={isWish ? "#ff4b72" : "none"}
                        color={isWish ? "#ff4b72" : "#ffffff"}
                        strokeWidth={2.2}
                      />
                    </button>
                    <Link className="quick" href={`/product/${p.id}`}>
                      Quick view <ArrowUpRight size={15} />
                    </Link>
                  </div>
                  <div className="pbody">
                    <small>{p.brand} · {p.categoryName || p.category}</small>
                    <h3>{p.name}</h3>
                    <div className="rating">★★★★★ <span>{p.rating || 4.9} ({p.reviews || 95})</span></div>
                    <div className="price">
                      <strong>₹{p.price.toLocaleString("en-IN")}</strong>
                      <del>₹{p.old.toLocaleString("en-IN")}</del>
                      <em>{Math.round((1 - p.price / p.old) * 100)}% OFF</em>
                    </div>
                    <button className="add" onClick={() => addToCart(p)}>
                      Add to Cart <Plus size={17} />
                    </button>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: "120px 20px", textAlign: "center", color: "#d4af37" }}>Loading shop collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
