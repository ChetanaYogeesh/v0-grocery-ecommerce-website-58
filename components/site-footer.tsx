import Link from "next/link"
import { categories } from "@/lib/data"
import { MapPin, Phone, Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg font-sans">FM</span>
              </div>
              <div>
                <h2 className="text-lg font-bold leading-tight font-sans">FreshMart</h2>
                <p className="text-xs text-background/60 leading-none">Grocery & More</p>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed mb-4">
              Your neighborhood grocery store, delivering fresh quality products right to your door since 1952.
            </p>
            <div className="flex flex-col gap-2 text-sm text-background/70">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Market St, Austin, TX 78701</span>
              <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> (512) 555-0123</span>
              <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> help@freshmart.com</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Shop by Category</h3>
            <ul className="flex flex-col gap-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-sm text-background/70 hover:text-background transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Customer Service</h3>
            <ul className="flex flex-col gap-2 text-sm text-background/70">
              <li><Link href="#" className="hover:text-background transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Track Your Order</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Delivery & Pickup</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Return Policy</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">About FreshMart</h3>
            <ul className="flex flex-col gap-2 text-sm text-background/70">
              <li><Link href="#" className="hover:text-background transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Community</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Gift Cards</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-background/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">
            &copy; 2026 FreshMart Grocery. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-background/50">
            <Link href="#" className="hover:text-background transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-background transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-background transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
