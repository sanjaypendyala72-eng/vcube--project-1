import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import coursesCategory from "../data/courses";

export default function OnlineCourses() {
  return <CategoryPageLayout category={coursesCategory} />;
}
