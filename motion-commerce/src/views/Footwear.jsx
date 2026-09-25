import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import footwearCategory from "../data/footwear";

export default function Footwear() {
  return <CategoryPageLayout category={footwearCategory} />;
}
