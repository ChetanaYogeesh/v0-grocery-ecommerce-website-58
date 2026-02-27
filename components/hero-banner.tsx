"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { banners } from "@/lib/data"

export function HeroBanner() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative overflow-hidden" aria-label="Featured promotions">
      <div className="relative h-[320px] sm:h-[400px] lg:h-[480px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto max-w-7xl px-4 w-full">
                <div className="max-w-lg">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-background leading-tight text-balance">
                    {banner.title}
                  </h2>
                  <p className="mt-3 text-base sm:text-lg text-background/85 leading-relaxed text-pretty">
                    {banner.subtitle}
                  </p>
                  <Link
                    href={banner.link}
                    className="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {banner.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground backdrop-blur-sm hover:bg-card transition-colors"
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground backdrop-blur-sm hover:bg-card transition-colors"
        aria-label="Next banner"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === current ? "w-8 bg-primary" : "w-2.5 bg-card/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
