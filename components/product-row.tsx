"use client"

import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/data"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function ProductRow({
  title,
  subtitle,
  products,
  viewAllLink,
}: {
  title: string
  subtitle?: string
  products: Product[]
  viewAllLink?: string
}) {
  return (
    <section className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
