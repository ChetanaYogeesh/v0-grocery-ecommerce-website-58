"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus, Star } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/data"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
      {/* Badge */}
      {product.badge && (
        <span
          className={`absolute left-2 top-2 z-10 rounded px-2 py-0.5 text-xs font-semibold ${
            product.badge === "Sale"
              ? "bg-primary text-primary-foreground"
              : product.badge === "Organic"
              ? "bg-accent text-accent-foreground"
              : "bg-highlight text-highlight-foreground"
          }`}
        >
          {product.badge}
        </span>
      )}

      {/* Image */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-chart-5 text-chart-5" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-2 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{product.unit}</span>
          </div>
          <button
            onClick={() => addItem(product)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
