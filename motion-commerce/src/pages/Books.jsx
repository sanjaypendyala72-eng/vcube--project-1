import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import booksCategory from "../data/books";

export default function Books() {
  return <CategoryPageLayout category={booksCategory} />;
}
