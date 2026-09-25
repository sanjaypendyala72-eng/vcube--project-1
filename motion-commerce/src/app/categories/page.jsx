"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ALL_CATEGORIES } from "../../data";
import { MotionReveal, StaggerContainer, StaggerItem } from "../../components/MotionComponents";

export default function CategoriesPage() {
  return (
    <main className="page">
      <MotionReveal>
        <div className="pageHero">
          <span className="eyebrow">WORLD OF NEXORA</span>
          <h1>Explore <i>Categories.</i></h1>
          <p>Discover hand-crafted goods across 20 premium worlds of design and utility.</p>
        </div>
      </MotionReveal>

      <StaggerContainer className="catGrid" staggerInterval={60}>
        {ALL_CATEGORIES.map((cat) => (
          <StaggerItem key={cat.slug || cat.id}>
            <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} className="cat">
              <img
                src={cat.heroImage || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"}
                alt={cat.name}
              />
              <div>
                <span>{cat.name}</span>
                <ArrowUpRight />
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </main>
  );
}
