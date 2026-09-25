import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import digitalProductsCategory from "../data/digitalProducts";

export default function DigitalProducts() {
  return <CategoryPageLayout category={digitalProductsCategory} />;
}
