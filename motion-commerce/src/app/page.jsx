"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Heart, Trash2 } from "lucide-react";
import { ALL_PRODUCTS, ALL_CATEGORIES } from "../data";
import { useStore } from "../context/StoreContext";
import {
  MotionReveal,
  StaggerContainer,
  StaggerItem,
  MagneticButton,
  ShineButton,
  AnimatedCounter,
  Accordion,
  ParallaxSection,
} from "../components/MotionComponents";
import HeroProductShowcase from "../components/HeroProductShowcase";
import MotionButton from "../components/MotionButton";

const products = (ALL_PRODUCTS && ALL_PRODUCTS.length > 0 ? ALL_PRODUCTS : []).map(p => ({
  ...p,
  old: p.originalPrice || p.old || Math.round(p.price * 1.25)
}));

const cats = (ALL_CATEGORIES && ALL_CATEGORIES.length > 0 ? ALL_CATEGORIES : []).map(c => [
  c.name,
  c.heroImage || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  c.slug
]);

function ProductCard({ p, wish, onWish, onAdd }) {
  return (
    <article className="card">
      <div className="pimage">
        <img loading="lazy" src={p.image} alt={p.name} />
        <span className="tag">{p.tag || "Luxury"}</span>
        <button
          type="button"
          className={"heart " + (wish ? "liked" : "")}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onWish(p.id);
          }}
          aria-label={wish ? "Remove from wishlist" : "Add to wishlist"}
          title={wish ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart size={17} fill={wish ? "#ff4b72" : "none"} color={wish ? "#ff4b72" : "#ffffff"} strokeWidth={2.2} />
        </button>
        <Link className="quick" href={`/product/${p.id}`}>
          Quick view <ArrowUpRight size={15} />
        </Link>
      </div>
      <div className="pbody">
        <small>{p.brand} · {p.categoryName || p.category}</small>
        <h3>{p.name}</h3>
        <div className="rating">★★★★★ <span>{p.rating || 4.9} ({p.reviews || 84})</span></div>
        <div className="price">
          <strong>₹{p.price?.toLocaleString("en-IN")}</strong>
          <del>₹{p.old?.toLocaleString("en-IN")}</del>
          <em>{Math.round((1 - p.price / p.old) * 100)}% OFF</em>
        </div>
        <button className="add" onClick={() => onAdd(p)}>
          Add to Cart <Plus size={17} />
        </button>
      </div>
    </article>
  );
}

export default function HomePage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const faqItems = [
    {
      title: "What makes NEXORA's luxury curation unique?",
      content:
        "Every piece in the NEXORA catalog is vetted by world-class ateliers for artisanal craftsmanship, verifiable provenance, and enduring design integrity.",
    },
    {
      title: "What are your shipping and express delivery options?",
      content:
        "We offer complimentary express delivery across India on orders over ₹4,999. All packages are insured and tracked with white-glove security.",
    },
    {
      title: "How does the 30-day effortless return guarantee work?",
      content:
        "If you're not completely satisfied, request a return within 30 days from your account portal for a prompt, complimentary doorstep pickup.",
    },
  ];

  return (
    <main>
      <div className="ambient-bg-motion-container" aria-hidden="true">
        <div
          className="ambient-motion-orb"
          style={{
            top: "10%",
            left: "15%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%)",
          }}
        />
        <div
          className="ambient-motion-orb"
          style={{
            top: "45%",
            right: "10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(245,215,127,0.15), transparent 70%)",
            animationDelay: "-6s",
          }}
        />
      </div>

      <section className="hero">
        <div className="heroGlow"></div>
        <div className="heroText">
          <MotionReveal delay={60} direction="up" distance={20}>
            <span className="eyebrow" style={{ letterSpacing: "2.5px", color: "#d4af37" }}>
              NEW COLLECTION
            </span>
          </MotionReveal>
          <MotionReveal delay={140} direction="up" distance={30}>
            <h1>
              Style<br />
              <i>Moves Forward</i>
            </h1>
          </MotionReveal>
          <MotionReveal delay={220} direction="up" distance={25}>
            <p>Discover premium fashion, accessories and lifestyle essentials crafted for a brighter you.</p>
          </MotionReveal>
          <MotionReveal delay={300} direction="up" distance={20}>
            <div className="heroBtns" style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
              <MotionButton 
                variant="premium" 
                href="/shop" 
                magnetic 
                sweep 
                particles
              >
                Shop Collection <ArrowUpRight size={16} />
              </MotionButton>
              <Link className="btn ghost" href="/categories">
                Explore Categories
              </Link>
            </div>
          </MotionReveal>

          <div
            className="hero-trust-metrics"
            style={{
              display: "flex",
              gap: "36px",
              marginTop: "48px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div>
              <strong style={{ display: "block", fontSize: "22px", fontWeight: "800", color: "#fff" }}>
                <AnimatedCounter target={5000} suffix="+" />
              </strong>
              <small style={{ fontSize: "11px", color: "#8e8e99" }}>Happy Customers</small>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "22px", fontWeight: "800", color: "#fff" }}>
                <AnimatedCounter target={100} suffix="+" />
              </strong>
              <small style={{ fontSize: "11px", color: "#8e8e99" }}>Premium Brands</small>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "22px", fontWeight: "800", color: "#fff" }}>
                <AnimatedCounter target={50} suffix="+" />
              </strong>
              <small style={{ fontSize: "11px", color: "#8e8e99" }}>Categories</small>
            </div>
          </div>
        </div>

        <ParallaxSection speed={0.08} className="heroProduct">
          <MotionReveal delay={200} direction="none">
            <HeroProductShowcase products={products} />
          </MotionReveal>
        </ParallaxSection>
      </section>

      <section className="section">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">SHOP BY WORLD</span>
            <h2>Find your <i>next</i> favorite.</h2>
          </div>
          <Link href="/categories">View all <ArrowUpRight /></Link>
        </div>
        <StaggerContainer className="catGrid" staggerInterval={75}>
          {cats.slice(0, 6).map((c) => (
            <StaggerItem key={c[0]}>
              <Link href={"/shop?category=" + c[0]} className="cat">
                <img src={c[1]} alt={c[0]} />
                <div><span>{c[0]}</span><ArrowUpRight /></div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="section dark">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">THE EDIT</span>
            <h2>Featured <i>now.</i></h2>
          </div>
          <Link href="/shop">Shop all <ArrowUpRight /></Link>
        </div>
        <StaggerContainer className="products" staggerInterval={90}>
          {products.slice(0, 4).map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard
                p={p}
                wish={(wishlist || []).includes(p.id)}
                onWish={toggleWishlist}
                onAdd={addToCart}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="section" style={{ position: "relative", padding: "80px 20px" }}>
        {/* Background Isolation / Readability Layer */}
        <div className="readability-overlay" style={{ background: "rgba(0, 0, 0, 0.62)" }} />
        
        {/* Isolated Content Layer */}
        <div className="content-layer" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="sectionHead" style={{ textAlign: "center", marginBottom: "40px", display: "block" }}>
            <span className="eyebrow">EFFORTLESS ASSURANCE</span>
            <h2>Frequently Asked <i>Questions</i></h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>

      <section className="statement">
        <MotionReveal delay={80}>
          <span className="eyebrow">NEXORA / 2026</span>
          <h2>Objects with a point<br /><i>of view.</i></h2>
          <p>Thoughtful products. Considered materials. A shopping experience that moves at your pace.</p>
          <MagneticButton maxDisplacement={5}>
            <Link href="/shop" style={{ textDecoration: "none" }}>
              <ShineButton as="span" variant="primary">
                Discover the edit <ArrowUpRight size={16} />
              </ShineButton>
            </Link>
          </MagneticButton>
        </MotionReveal>
      </section>
    </main>
  );
}
