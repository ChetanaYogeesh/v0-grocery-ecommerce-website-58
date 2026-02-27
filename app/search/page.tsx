"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronRight, SearchX } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { searchProducts } from "@/lib/data"
import { Suspense } from "react"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const results = searchProducts(query)

  return (
    <div className="bg-background min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Search</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground">
          {results.length > 0
            ? `Results for "${query}"`
            : `No results for "${query}"`}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "product" : "products"} found
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12">
        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <SearchX className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 text-lg font-medium text-foreground">No products match your search</p>
            <p className="mt-1 text-sm text-muted-foreground">Try different keywords or browse our categories.</p>
            <Link href="/" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}
