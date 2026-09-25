import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import automotiveCategory from "../data/automotive";

export default function Automotive() {
  return <CategoryPageLayout category={automotiveCategory} />;
}
