import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import fashionCategory from "../data/fashion";

export default function Fashion() {
  return <CategoryPageLayout category={fashionCategory} />;
}
