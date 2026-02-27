export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  unit: string
  image: string
  category: string
  categorySlug: string
  description: string
  details: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  badge?: string
  nutrition?: {
    calories: string
    fat: string
    protein: string
    carbs: string
    fiber: string
  }
}

export interface Category {
  name: string
  slug: string
  image: string
  productCount: number
}

export interface Banner {
  id: string
  title: string
  subtitle: string
  cta: string
  image: string
  link: string
}

export const banners: Banner[] = [
  {
    id: "1",
    title: "Fresh Produce Delivered Daily",
    subtitle: "Farm-fresh fruits and vegetables at unbeatable prices. Shop our weekly specials.",
    cta: "Shop Produce",
    image: "/images/hero-fresh.jpg",
    link: "/category/fruits-vegetables",
  },
  {
    id: "2",
    title: "Weekly Deals & Savings",
    subtitle: "Save big on hundreds of items across every aisle. New deals every week.",
    cta: "View Deals",
    image: "/images/hero-deals.jpg",
    link: "/category/deals",
  },
  {
    id: "3",
    title: "Fresh From Our Bakery",
    subtitle: "Artisan breads, pastries, and cakes baked fresh in-store every morning.",
    cta: "Shop Bakery",
    image: "/images/hero-bakery.jpg",
    link: "/category/bakery",
  },
]

export const categories: Category[] = [
  { name: "Fruits & Vegetables", slug: "fruits-vegetables", image: "/images/cat-fruits.jpg", productCount: 156 },
  { name: "Dairy & Eggs", slug: "dairy-eggs", image: "/images/cat-dairy.jpg", productCount: 89 },
  { name: "Meat & Seafood", slug: "meat-seafood", image: "/images/cat-meat.jpg", productCount: 124 },
  { name: "Bakery", slug: "bakery", image: "/images/cat-bakery.jpg", productCount: 67 },
  { name: "Pantry Staples", slug: "pantry-staples", image: "/images/cat-pantry.jpg", productCount: 234 },
  { name: "Frozen Foods", slug: "frozen-foods", image: "/images/cat-frozen.jpg", productCount: 178 },
  { name: "Beverages", slug: "beverages", image: "/images/cat-beverages.jpg", productCount: 145 },
  { name: "Snacks", slug: "snacks", image: "/images/cat-snacks.jpg", productCount: 198 },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Bananas",
    slug: "organic-bananas",
    price: 0.69,
    unit: "per lb",
    image: "/images/products/organic-bananas.jpg",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    description: "Sweet and perfectly ripened organic bananas. Great source of potassium and natural energy. Certified USDA Organic.",
    details: ["USDA Certified Organic", "Naturally ripened", "Source of potassium & vitamin B6", "Perfect for smoothies, baking, or snacking"],
    rating: 4.7,
    reviewCount: 342,
    inStock: true,
    badge: "Organic",
    nutrition: { calories: "105", fat: "0.4g", protein: "1.3g", carbs: "27g", fiber: "3.1g" },
  },
  {
    id: "2",
    name: "Gala Apples",
    slug: "gala-apples",
    price: 1.49,
    originalPrice: 1.99,
    unit: "per lb",
    image: "/images/products/red-apples.jpg",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    description: "Crisp, sweet Gala apples with a distinctive red-orange skin. Perfect for snacking, salads, and baking.",
    details: ["Sweet and crispy", "Rich in fiber and vitamin C", "Locally sourced when available", "Great for lunchboxes"],
    rating: 4.5,
    reviewCount: 218,
    inStock: true,
    badge: "Sale",
    nutrition: { calories: "95", fat: "0.3g", protein: "0.5g", carbs: "25g", fiber: "4.4g" },
  },
  {
    id: "3",
    name: "Whole Milk - 1 Gallon",
    slug: "whole-milk-gallon",
    price: 3.99,
    unit: "each",
    image: "/images/products/whole-milk.jpg",
    category: "Dairy & Eggs",
    categorySlug: "dairy-eggs",
    description: "Farm-fresh whole milk with rich, creamy taste. Pasteurized and homogenized for quality and safety.",
    details: ["Vitamin D fortified", "Excellent source of calcium", "No artificial hormones", "Farm-fresh quality"],
    rating: 4.8,
    reviewCount: 567,
    inStock: true,
    nutrition: { calories: "150", fat: "8g", protein: "8g", carbs: "12g", fiber: "0g" },
  },
  {
    id: "4",
    name: "Artisan Sourdough Bread",
    slug: "artisan-sourdough-bread",
    price: 4.49,
    unit: "each",
    image: "/images/products/sourdough-bread.jpg",
    category: "Bakery",
    categorySlug: "bakery",
    description: "Freshly baked artisan sourdough bread with a crispy golden crust and soft, tangy interior. Made with natural starter.",
    details: ["Baked fresh daily", "Natural sourdough starter", "No preservatives", "Crispy crust, soft interior"],
    rating: 4.9,
    reviewCount: 423,
    inStock: true,
    badge: "Fresh",
    nutrition: { calories: "120", fat: "0.5g", protein: "4g", carbs: "24g", fiber: "1g" },
  },
  {
    id: "5",
    name: "Boneless Chicken Breast",
    slug: "boneless-chicken-breast",
    price: 5.99,
    originalPrice: 7.49,
    unit: "per lb",
    image: "/images/products/chicken-breast.jpg",
    category: "Meat & Seafood",
    categorySlug: "meat-seafood",
    description: "Premium boneless, skinless chicken breast. All-natural with no added hormones or antibiotics. Versatile and lean protein.",
    details: ["All natural, no hormones", "Lean protein source", "USDA inspected", "Individually packed for freshness"],
    rating: 4.6,
    reviewCount: 389,
    inStock: true,
    badge: "Sale",
    nutrition: { calories: "165", fat: "3.6g", protein: "31g", carbs: "0g", fiber: "0g" },
  },
  {
    id: "6",
    name: "Hass Avocados",
    slug: "hass-avocados",
    price: 1.29,
    unit: "each",
    image: "/images/products/avocados.jpg",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    description: "Ripe and ready-to-eat Hass avocados. Creamy texture, rich flavor. Perfect for guacamole, toast, and salads.",
    details: ["Ripe and ready to eat", "Rich in healthy fats", "Source of potassium & fiber", "Perfect for guacamole"],
    rating: 4.4,
    reviewCount: 276,
    inStock: true,
    nutrition: { calories: "240", fat: "22g", protein: "3g", carbs: "13g", fiber: "10g" },
  },
  {
    id: "7",
    name: "Fresh Orange Juice - 52oz",
    slug: "fresh-orange-juice",
    price: 4.99,
    unit: "each",
    image: "/images/products/orange-juice.jpg",
    category: "Beverages",
    categorySlug: "beverages",
    description: "100% pure squeezed orange juice with no added sugar. Not from concentrate. Rich in Vitamin C.",
    details: ["100% pure squeezed", "Not from concentrate", "No added sugars", "Excellent source of Vitamin C"],
    rating: 4.7,
    reviewCount: 198,
    inStock: true,
    nutrition: { calories: "110", fat: "0g", protein: "2g", carbs: "26g", fiber: "0g" },
  },
  {
    id: "8",
    name: "Free-Range Large Eggs - 12ct",
    slug: "free-range-eggs",
    price: 4.29,
    unit: "each",
    image: "/images/products/eggs.jpg",
    category: "Dairy & Eggs",
    categorySlug: "dairy-eggs",
    description: "Grade A large free-range eggs from cage-free hens. Rich golden yolks with superior taste.",
    details: ["Free-range, cage-free hens", "Grade A large eggs", "Rich golden yolks", "Excellent protein source"],
    rating: 4.8,
    reviewCount: 445,
    inStock: true,
    badge: "Free Range",
    nutrition: { calories: "70", fat: "5g", protein: "6g", carbs: "0g", fiber: "0g" },
  },
  {
    id: "9",
    name: "Fresh Strawberries - 1lb",
    slug: "fresh-strawberries",
    price: 3.49,
    originalPrice: 4.29,
    unit: "each",
    image: "/images/products/strawberries.jpg",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    description: "Plump, juicy fresh strawberries. Hand-selected for peak ripeness and flavor. Perfect for desserts and snacking.",
    details: ["Hand-selected for quality", "Peak ripeness", "Rich in Vitamin C", "1 pound container"],
    rating: 4.3,
    reviewCount: 312,
    inStock: true,
    badge: "Sale",
    nutrition: { calories: "50", fat: "0.5g", protein: "1g", carbs: "12g", fiber: "3g" },
  },
  {
    id: "10",
    name: "Greek Yogurt - Plain 32oz",
    slug: "greek-yogurt-plain",
    price: 5.49,
    unit: "each",
    image: "/images/products/greek-yogurt.jpg",
    category: "Dairy & Eggs",
    categorySlug: "dairy-eggs",
    description: "Thick and creamy plain Greek yogurt. High in protein, low in sugar. Perfect for breakfast, cooking, or as a healthy snack.",
    details: ["High protein - 15g per serving", "Live active cultures", "No added sugar", "Versatile for cooking and eating"],
    rating: 4.6,
    reviewCount: 287,
    inStock: true,
    nutrition: { calories: "100", fat: "0g", protein: "15g", carbs: "6g", fiber: "0g" },
  },
  {
    id: "11",
    name: "Penne Pasta - 16oz",
    slug: "penne-pasta",
    price: 1.79,
    unit: "each",
    image: "/images/products/pasta.jpg",
    category: "Pantry Staples",
    categorySlug: "pantry-staples",
    description: "Classic Italian penne pasta made from 100% durum wheat semolina. Al dente perfection every time.",
    details: ["100% durum wheat semolina", "Cooks in 11 minutes", "Classic Italian recipe", "Great with any sauce"],
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    nutrition: { calories: "200", fat: "1g", protein: "7g", carbs: "42g", fiber: "2g" },
  },
  {
    id: "12",
    name: "Ground Beef 80/20 - 1lb",
    slug: "ground-beef-80-20",
    price: 6.49,
    originalPrice: 7.99,
    unit: "each",
    image: "/images/products/ground-beef.jpg",
    category: "Meat & Seafood",
    categorySlug: "meat-seafood",
    description: "Premium 80% lean, 20% fat ground beef. Perfect for burgers, meatballs, tacos, and more. USDA Choice quality.",
    details: ["80% lean, 20% fat", "USDA Choice quality", "Perfect for burgers and tacos", "Fresh, never frozen"],
    rating: 4.5,
    reviewCount: 334,
    inStock: true,
    badge: "Sale",
    nutrition: { calories: "230", fat: "17g", protein: "22g", carbs: "0g", fiber: "0g" },
  },
]

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getDealProducts(): Product[] {
  return products.filter((p) => p.originalPrice)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.rating >= 4.6)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  )
}
