import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import agricultureCategory from "../data/agriculture";

export default function Agriculture() {
  return <CategoryPageLayout category={agricultureCategory} />;
}
