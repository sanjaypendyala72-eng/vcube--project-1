import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import beautyCategory from "../data/beauty";

export default function Beauty() {
  return <CategoryPageLayout category={beautyCategory} />;
}
