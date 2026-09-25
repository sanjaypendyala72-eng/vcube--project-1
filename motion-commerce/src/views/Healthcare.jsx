import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import healthcareCategory from "../data/healthcare";

export default function Healthcare() {
  return <CategoryPageLayout category={healthcareCategory} />;
}
