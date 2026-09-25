import fashionCategory from "./fashion";
import footwearCategory from "./footwear";
import beautyCategory from "./beauty";
import electronicsCategory from "./electronics";
import furnitureCategory from "./furniture";
import groceryCategory from "./grocery";
import healthcareCategory from "./healthcare";
import jewelryCategory from "./jewelry";
import booksCategory from "./books";
import gamingCategory from "./gaming";
import automotiveCategory from "./automotive";
import agricultureCategory from "./agriculture";
import petsCategory from "./pets";
import travelCategory from "./travel";
import ticketsCategory from "./tickets";
import digitalProductsCategory from "./digitalProducts";
import softwareCategory from "./software";
import coursesCategory from "./courses";
import foodCategory from "./food";
import servicesCategory from "./services";

const prefixImage = (img) => {
  if (!img || !img.startsWith('/')) return img;
  if (img.startsWith('/nexora/')) return img;
  return `/nexora${img}`;
};

export const ALL_CATEGORIES = [
  fashionCategory,
  footwearCategory,
  beautyCategory,
  electronicsCategory,
  furnitureCategory,
  groceryCategory,
  healthcareCategory,
  jewelryCategory,
  booksCategory,
  gamingCategory,
  automotiveCategory,
  agricultureCategory,
  petsCategory,
  travelCategory,
  ticketsCategory,
  digitalProductsCategory,
  softwareCategory,
  coursesCategory,
  foodCategory,
  servicesCategory,
].map(cat => ({
  ...cat,
  heroImage: prefixImage(cat.heroImage),
  products: cat.products?.map(p => ({
    ...p,
    image: prefixImage(p.image),
    images: p.images?.map(prefixImage)
  }))
}));

export const CATEGORY_MAP = ALL_CATEGORIES.reduce((acc, cat) => {
  acc[cat.slug] = cat;
  return acc;
}, {});

// Flatten all products across 20 categories
export const ALL_PRODUCTS = ALL_CATEGORIES.flatMap((cat) =>
  cat.products.map((product) => ({
    ...product,
    categorySlug: cat.slug,
    categoryName: cat.name,
    categoryType: cat.slug,
    accentColor: cat.accentColor,
  }))
);

/** Get a category by its slug */
export function getCategory(slug) {
  return CATEGORY_MAP[slug] || null;
}

/** Get a single product by its unique ID across all 20 categories */
export function getProduct(id) {
  const numId = typeof id === "string" ? Number(id) : id;
  return ALL_PRODUCTS.find((p) => p.id === numId || p.id === id) || null;
}

/** Global search across all 20 categories */
export function searchProducts(query) {
  if (!query || query.trim() === "") return [];
  const cleanQuery = query.toLowerCase().trim();

  return ALL_PRODUCTS.filter((product) => {
    const nameMatch = (product.name || product.title || "").toLowerCase().includes(cleanQuery);
    const brandMatch = (product.brand || product.provider || product.restaurant || product.instructor || product.author || "").toLowerCase().includes(cleanQuery);
    const catMatch = (product.categoryName || "").toLowerCase().includes(cleanQuery);
    const subMatch = (product.subcategory || "").toLowerCase().includes(cleanQuery);
    const descMatch = (product.description || "").toLowerCase().includes(cleanQuery);
    return nameMatch || brandMatch || catMatch || subMatch || descMatch;
  });
}

export {
  fashionCategory,
  footwearCategory,
  beautyCategory,
  electronicsCategory,
  furnitureCategory,
  groceryCategory,
  healthcareCategory,
  jewelryCategory,
  booksCategory,
  gamingCategory,
  automotiveCategory,
  agricultureCategory,
  petsCategory,
  travelCategory,
  ticketsCategory,
  digitalProductsCategory,
  softwareCategory,
  coursesCategory,
  foodCategory,
  servicesCategory,
};

export default ALL_CATEGORIES;
