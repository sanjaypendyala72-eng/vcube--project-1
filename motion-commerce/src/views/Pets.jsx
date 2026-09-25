import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import petsCategory from "../data/pets";

export default function Pets() {
  return <CategoryPageLayout category={petsCategory} />;
}
