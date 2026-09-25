import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import servicesCategory from "../data/services";

export default function Services() {
  return <CategoryPageLayout category={servicesCategory} />;
}
