import Link from "next/link"
import { Truck, Clock, ShieldCheck, Tag } from "lucide-react"

export function PromoBanner() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Free Delivery</p>
              <p className="text-xs text-muted-foreground">Orders over $35</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Same-Day Pickup</p>
              <p className="text-xs text-muted-foreground">Ready in 2 hours</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Freshness Guarantee</p>
              <p className="text-xs text-muted-foreground">100% satisfaction</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Weekly Savings</p>
              <p className="text-xs text-muted-foreground">
                <Link href="/category/deals" className="text-primary hover:underline">View deals</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
