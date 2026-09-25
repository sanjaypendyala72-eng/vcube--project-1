import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import electronicsCategory from "../data/electronics";

export default function Electronics() {
  return <CategoryPageLayout category={electronicsCategory} />;
}
