"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronRight, SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { categories, getProductsByCategory, getDealProducts, products } from "@/lib/data"

type SortOption = "featured" | "price-low" | "price-high" | "rating"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [gridView, setGridView] = useState(true)

  const category = categories.find((c) => c.slug === slug)
  const isDeals = slug === "deals"

  const categoryProducts = isDeals ? getDealProducts() : getProductsByCategory(slug)

  // If category not found and not deals, show all products
  const displayProducts =
    categoryProducts.length > 0 ? categoryProducts : products

  const sortedProducts = [...displayProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const title = isDeals ? "Weekly Deals" : category?.name || "All Products"
  const description = isDeals
    ? "Save big on hundreds of items this week"
    : `Browse our selection of ${title.toLowerCase()}`

  return (
    <div className="bg-background">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">{title}</span>
        </nav>
      </div>

      {/* Hero */}
      {category && (
        <div className="relative mx-auto max-w-7xl px-4 mt-4">
          <div className="relative h-40 sm:h-52 overflow-hidden rounded-xl">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-foreground/20" />
            <div className="absolute inset-0 flex items-center px-6 sm:px-10">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-background">{category.name}</h1>
                <p className="mt-1 text-sm text-background/80">{category.productCount} items available</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeals && (
        <div className="mx-auto max-w-7xl px-4 mt-4">
          <div className="rounded-xl bg-primary px-6 py-8 sm:px-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">Weekly Deals</h1>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Save big on hundreds of items this week. New deals every Monday.
            </p>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => setGridView(true)}
                className={`rounded-md p-2 ${gridView ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"} transition-colors`}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setGridView(false)}
                className={`rounded-md p-2 ${!gridView ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"} transition-colors`}
                aria-label="List view"
              >
                <LayoutList className="h-4 w-4" />
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-12">
        <div className={gridView
          ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          : "grid grid-cols-1 sm:grid-cols-2 gap-4"
        }>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg font-medium text-foreground">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">Check back soon for new items in this category.</p>
            <Link href="/" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
