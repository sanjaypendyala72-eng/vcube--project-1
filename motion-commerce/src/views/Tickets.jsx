import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout/CategoryPageLayout";
import ticketsCategory from "../data/tickets";

export default function Tickets() {
  return <CategoryPageLayout category={ticketsCategory} />;
}
