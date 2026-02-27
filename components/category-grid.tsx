import Image from "next/image"
import Link from "next/link"
import { categories } from "@/lib/data"

export function CategoryGrid() {
  return (
    <section className="py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
            <p className="mt-1 text-sm text-muted-foreground">Browse our wide selection of fresh groceries</p>
          </div>
          <Link href="/category/fruits-vegetables" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-xl aspect-[4/3]"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-background">{category.name}</h3>
                <p className="text-xs text-background/70">{category.productCount} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
