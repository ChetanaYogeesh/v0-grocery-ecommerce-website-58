"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronRight, Star, Minus, Plus, ShoppingCart, Truck, RotateCcw, ShieldCheck, Check } from "lucide-react"
import { getProductBySlug, getProductsByCategory, products } from "@/lib/data"
import { useCart } from "@/lib/cart-context"
import { ProductCard } from "@/components/product-card"

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<"details" | "nutrition">("details")

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background">
        <p className="text-lg font-medium text-foreground">Product not found</p>
        <Link href="/" className="mt-4 text-sm text-primary hover:underline">Back to Home</Link>
      </div>
    )
  }

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  // Add more from the full catalog if not enough related
  const moreProducts = relatedProducts.length < 4
    ? [...relatedProducts, ...products.filter((p) => p.id !== product.id && !relatedProducts.find((r) => r.id === p.id)).slice(0, 4 - relatedProducts.length)]
    : relatedProducts

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="bg-background">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/category/${product.categorySlug}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary border border-border">
              {product.badge && (
                <span
                  className={`absolute left-3 top-3 z-10 rounded-md px-3 py-1 text-sm font-semibold ${
                    product.badge === "Sale"
                      ? "bg-primary text-primary-foreground"
                      : product.badge === "Organic"
                      ? "bg-accent text-accent-foreground"
                      : "bg-highlight text-highlight-foreground"
                  }`}
                >
                  {product.badge}
                  {discount && product.badge === "Sale" ? ` -${discount}%` : ""}
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/category/${product.categorySlug}`}
                className="text-xs font-medium uppercase tracking-wider text-primary hover:underline"
              >
                {product.category}
              </Link>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">{product.name}</h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(product.rating)
                        ? "fill-chart-5 text-chart-5"
                        : "fill-border text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discount && (
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-semibold text-primary">
                  Save {discount}%
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{product.unit}</p>

            {/* Description */}
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Quantity & Add to Cart */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center rounded-lg border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-12 w-12 items-center justify-center text-foreground hover:bg-secondary transition-colors rounded-l-lg"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex h-12 w-14 items-center justify-center border-x border-border text-sm font-medium text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-12 w-12 items-center justify-center text-foreground hover:bg-secondary transition-colors rounded-r-lg"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-6 h-12 text-sm font-semibold transition-colors ${
                  added
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Perks */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-xs text-foreground">Free delivery over $35</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                <RotateCcw className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-xs text-foreground">Easy returns</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-xs text-foreground">Freshness guaranteed</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-center gap-6 mb-4">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                    activeTab === "details"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Product Details
                </button>
                {product.nutrition && (
                  <button
                    onClick={() => setActiveTab("nutrition")}
                    className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                      activeTab === "nutrition"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Nutrition Facts
                  </button>
                )}
              </div>

              {activeTab === "details" && (
                <ul className="flex flex-col gap-2">
                  {product.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "nutrition" && product.nutrition && (
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Nutrient
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Per Serving
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(product.nutrition).map(([key, value]) => (
                        <tr key={key} className="border-t border-border">
                          <td className="px-4 py-2.5 capitalize text-foreground">{key}</td>
                          <td className="px-4 py-2.5 text-right text-muted-foreground">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {moreProducts.length > 0 && (
        <section className="bg-secondary py-10 lg:py-14">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {moreProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
