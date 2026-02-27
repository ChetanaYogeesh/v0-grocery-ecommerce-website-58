import { HeroBanner } from "@/components/hero-banner"
import { PromoBanner } from "@/components/promo-banner"
import { CategoryGrid } from "@/components/category-grid"
import { ProductRow } from "@/components/product-row"
import { getDealProducts, getFeaturedProducts } from "@/lib/data"

export default function HomePage() {
  const deals = getDealProducts()
  const featured = getFeaturedProducts()

  return (
    <>
      <HeroBanner />
      <PromoBanner />
      <ProductRow
        title="Weekly Deals"
        subtitle="Don't miss these limited-time savings"
        products={deals}
        viewAllLink="/category/deals"
      />
      <CategoryGrid />
      <div className="bg-secondary">
        <ProductRow
          title="Top Rated"
          subtitle="Customer favorites with the highest ratings"
          products={featured}
        />
      </div>

      {/* CTA Banner */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 sm:px-12 lg:px-16">
            <div className="relative z-10 max-w-lg">
              <h2 className="text-3xl font-bold text-primary-foreground text-balance">
                Get Fresh Groceries Delivered to Your Door
              </h2>
              <p className="mt-3 text-primary-foreground/80 leading-relaxed">
                Sign up for FreshMart delivery and get your first order delivered free. 
                Fresh produce, quality meats, and pantry staples - all at everyday low prices.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="rounded-lg bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-card/90 transition-colors">
                  Start Shopping
                </button>
                <button className="rounded-lg border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary-foreground/5" />
            <div className="absolute -bottom-8 right-20 h-48 w-48 rounded-full bg-primary-foreground/5" />
          </div>
        </div>
      </section>
    </>
  )
}
