import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import groceryCategory from "../data/grocery";

export default function Grocery() {
  return <CategoryPageLayout category={groceryCategory} />;
}
