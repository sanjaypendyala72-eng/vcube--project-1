import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import foodCategory from "../data/food";

export default function FoodDelivery() {
  return <CategoryPageLayout category={foodCategory} />;
}
