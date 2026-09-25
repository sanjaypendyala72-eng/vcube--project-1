import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import travelCategory from "../data/travel";

export default function Travel() {
  return <CategoryPageLayout category={travelCategory} />;
}
