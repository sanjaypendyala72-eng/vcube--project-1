import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import gamingCategory from "../data/gaming";

export default function Gaming() {
  return <CategoryPageLayout category={gamingCategory} />;
}
