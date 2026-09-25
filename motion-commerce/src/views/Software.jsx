import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import softwareCategory from "../data/software";

export default function Software() {
  return <CategoryPageLayout category={softwareCategory} />;
}
