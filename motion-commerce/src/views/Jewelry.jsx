import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import jewelryCategory from "../data/jewelry";

export default function Jewelry() {
  return <CategoryPageLayout category={jewelryCategory} />;
}
