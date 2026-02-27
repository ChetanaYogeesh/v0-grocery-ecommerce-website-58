# FreshMart – Grocery & More

**Live Site:** [https://v0-grocery-ecommerce-website-58.vercel.app/](https://v0-grocery-ecommerce-website-58.vercel.app/)

A full-featured, HEB-inspired grocery ecommerce website built with Next.js and deployed on Vercel. FreshMart covers the complete customer journey — from browsing the homepage to checking out.

<img width="1863" height="865" alt="Screenshot 2026-02-27 at 11 27 47 AM" src="https://github.com/user-attachments/assets/eb1d66b9-110d-477d-ab88-640a5a45e896" />
<img width="1317" height="976" alt="Screenshot 2026-02-27 at 11 28 19 AM" src="https://github.com/user-attachments/assets/d26d0ee2-0ae7-4fb9-bcc9-c452ee9e54fe" />

## Features

### Pages & User Journey

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero banner carousel, category grid, weekly deals, top-rated products, delivery CTA |
| Category / PLP | `/category/[slug]` | Filterable product grid with sort, grid/list toggle, category hero banner, breadcrumbs |
| Deals | `/category/deals` | Dedicated sale items listing |
| Search | `/search` | Search results page |
| Product Detail | `/product/[slug]` | Large image, ratings, quantity selector, add-to-cart, nutrition/details tabs, related products |
| Cart | `/cart` | Quantity controls, item removal, promo code input, order summary with tax & delivery calc |
| Checkout | `/checkout` | Multi-step flow: Delivery → Payment → Review → Confirmation |

### Homepage Sections
- **Hero Banner Carousel** — Auto-rotating banners for Fresh Produce, Weekly Deals, and Bakery
- **Perks Bar** — Free delivery (orders over $35), same-day pickup, freshness guarantee, weekly savings
- **Weekly Deals Row** — Highlighted sale products
- **Category Grid** — 8 categories: Fruits & Vegetables, Dairy & Eggs, Meat & Seafood, Bakery, Pantry Staples, Frozen Foods, Beverages, Snacks
- **Top Rated Products** — Customer favorites sorted by rating
- **Delivery CTA Banner** — First-order free delivery sign-up prompt

### Product Categories

| Category | Items |
|----------|-------|
| Fruits & Vegetables | 156 |
| Dairy & Eggs | 89 |
| Meat & Seafood | 124 |
| Bakery | 67 |
| Pantry Staples | 234 |
| Frozen Foods | 178 |
| Beverages | 145 |
| Snacks | 198 |

### Product Badges
Products support the following label badges: `Sale`, `Organic`, `Free Range`, `Fresh`

### Cart & Checkout
- Real-time subtotal, tax, and delivery fee calculation
- Free delivery threshold messaging (orders over $35)
- Promo code input field
- Delivery vs. Pickup toggle
- Address form and credit card form
- Order review step before confirmation
- Order confirmation page with order number

---

## Sample Products

| Product | Price | Notes |
|---------|-------|-------|
| Hass Avocados | $1.29/each | — |
| Fresh Orange Juice – 52oz | $4.99/each | — |
| Free-Range Large Eggs – 12ct | $4.29/each | Free Range badge |
| Fresh Strawberries – 1lb | $3.49/each | Sale (was $4.29) |
| Greek Yogurt – Plain 32oz | $5.49/each | — |
| Penne Pasta – 16oz | $1.79/each | — |
| Ground Beef 80/20 – 1lb | $6.49/each | Sale (was $7.99) |
| Organic Bananas | $0.69/lb | Organic badge |
| Gala Apples | $1.49/lb | Sale (was $1.99) |
| Whole Milk – 1 Gallon | $3.99/each | — |
| Artisan Sourdough Bread | $4.49/each | Fresh badge |
| Boneless Chicken Breast | $5.99/lb | Sale (was $7.49) |

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS with custom theme tokens
- **State Management:** React Context (Cart)
- **Deployment:** Vercel
- **Images:** AI-generated product and category images

---

## Store Info

> FreshMart — Your neighborhood grocery store, delivering fresh quality products right to your door since 1952.

- **Address:** 123 Market St, Austin, TX 78701
- **Phone:** (512) 555-0123
- **Email:** help@freshmart.com
- **Delivery Area:** 78701 and surrounding zip codes

---

## Navigation

**Header:** Shop by Category · Weekly Deals · Fresh Produce · Meat & Seafood · Dairy & Eggs · Bakery · Search · Cart · Sign In

**Footer Links:**
- Shop by Category
- Customer Service (Help Center, Track Your Order, Delivery & Pickup, Return Policy, Contact Us)
- About FreshMart (Our Story, Careers, Community, Sustainability, Gift Cards)

---

*© 2026 FreshMart Grocery. All rights reserved.*
