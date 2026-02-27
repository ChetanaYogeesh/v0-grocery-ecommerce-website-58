"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight, ArrowLeft } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { getFeaturedProducts } from "@/lib/data"
import { ProductCard } from "@/components/product-card"

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart()

  const deliveryFee = subtotal >= 35 ? 0 : 5.99
  const tax = subtotal * 0.0825
  const total = subtotal + deliveryFee + tax

  const suggestedProducts = getFeaturedProducts().slice(0, 4)

  if (items.length === 0) {
    return (
      <div className="bg-background min-h-[60vh]">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-foreground">Your cart is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </Link>

          {/* Suggestions */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground mb-6">Popular Items</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {suggestedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Cart</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Shopping Cart <span className="text-muted-foreground font-normal text-lg">({itemCount} {itemCount === 1 ? "item" : "items"})</span>
        </h1>

        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.product.id}
                  className={`flex gap-4 p-4 sm:p-6 ${
                    index > 0 ? "border-t border-border" : ""
                  }`}
                >
                  {/* Image */}
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg bg-secondary"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.product.unit}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors p-1"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center rounded-md border border-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-foreground hover:bg-secondary transition-colors rounded-l-md"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="flex h-8 w-10 items-center justify-center border-x border-border text-sm font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-foreground hover:bg-secondary transition-colors rounded-r-md"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm sm:text-base font-semibold text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">${item.product.price.toFixed(2)} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="sticky top-40 rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground">Order Summary</h2>

              <div className="mt-4 flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                  <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={deliveryFee === 0 ? "text-accent font-medium" : "text-foreground font-medium"}>
                    {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-accent">
                    Add ${(35 - subtotal).toFixed(2)} more for free delivery
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Est. Tax</span>
                  <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-foreground">Estimated Total</span>
                  <span className="text-base font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Proceed to Checkout
              </Link>

              {/* Promo Code */}
              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
