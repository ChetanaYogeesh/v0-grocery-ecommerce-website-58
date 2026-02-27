"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, Search, Menu, X, User, MapPin, ChevronDown } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { categories } from "@/lib/data"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const { itemCount, subtotal } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCategories, setShowCategories] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-1.5 text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Delivery to</span> 78701
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:underline hidden sm:block">Store Locator</Link>
            <Link href="#" className="hover:underline hidden sm:block">Weekly Ad</Link>
            <Link href="#" className="flex items-center gap-1 hover:underline">
              <User className="h-3.5 w-3.5" />
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg font-sans">FM</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground leading-tight font-sans">FreshMart</h1>
                <p className="text-xs text-muted-foreground leading-none">Grocery & More</p>
              </div>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex">
            <div className="relative w-full flex">
              <input
                type="text"
                placeholder="Search for groceries, recipes, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-l-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="rounded-r-lg bg-primary px-4 text-primary-foreground hover:bg-primary/90 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Cart */}
          <Link
            href="/cart"
            className="ml-auto flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-sm">
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
          </Link>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="mt-3 md:hidden">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search for groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-l-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="rounded-r-lg bg-primary px-4 text-primary-foreground"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden lg:block border-t border-border">
        <div className="mx-auto max-w-7xl px-4">
          <ul className="flex items-center gap-1">
            <li className="relative">
              <button
                className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <Menu className="h-4 w-4" />
                Shop by Category
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {showCategories && (
                <div
                  className="absolute left-0 top-full z-50 w-64 rounded-b-lg border border-border bg-card shadow-lg"
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <li>
              <Link href="/category/deals" className="px-4 py-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors block">
                Weekly Deals
              </Link>
            </li>
            <li>
              <Link href="/category/fruits-vegetables" className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors block">
                Fresh Produce
              </Link>
            </li>
            <li>
              <Link href="/category/meat-seafood" className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors block">
                Meat & Seafood
              </Link>
            </li>
            <li>
              <Link href="/category/dairy-eggs" className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors block">
                Dairy & Eggs
              </Link>
            </li>
            <li>
              <Link href="/category/bakery" className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors block">
                Bakery
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="mx-auto max-w-7xl px-4 py-4">
            <ul className="flex flex-col gap-1">
              <li className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 py-2">Categories</li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
