import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import furnitureCategory from "../data/furniture";

export default function HomeFurniture() {
  return <CategoryPageLayout category={furnitureCategory} />;
}
