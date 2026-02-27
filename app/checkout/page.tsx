"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, Lock, CreditCard, Truck, MapPin, Check } from "lucide-react"
import { useCart } from "@/lib/cart-context"

type Step = "delivery" | "payment" | "review"

export default function CheckoutPage() {
  const { items, subtotal, itemCount, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>("delivery")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [delivery, setDelivery] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apt: "",
    city: "",
    state: "TX",
    zip: "",
    instructions: "",
  })

  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery")

  const [payment, setPayment] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  })

  const deliveryFee = subtotal >= 35 ? 0 : 5.99
  const tax = subtotal * 0.0825
  const total = subtotal + (deliveryMethod === "delivery" ? deliveryFee : 0) + tax

  const steps: { key: Step; label: string }[] = [
    { key: "delivery", label: "Delivery" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" },
  ]

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    clearCart()
  }

  if (items.length === 0 && !orderPlaced) {
    router.push("/cart")
    return null
  }

  if (orderPlaced) {
    return (
      <div className="bg-background min-h-[60vh]">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent">
            <Check className="h-10 w-10 text-accent-foreground" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-foreground">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your order. Your order number is <span className="font-semibold text-foreground">#FM-{Math.floor(100000 + Math.random() * 900000)}</span>
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {deliveryMethod === "delivery"
              ? "Your groceries will be delivered within 2 hours. We'll send you a confirmation email with tracking details."
              : "Your order will be ready for pickup in about 2 hours. We'll notify you when it's ready."}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </Link>
            <button className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
              Track Order
            </button>
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
          <Link href="/cart" className="hover:text-foreground transition-colors">Cart</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Checkout</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Checkout</h1>

        {/* Step Indicator */}
        <div className="mt-6 flex items-center gap-2">
          {steps.map((step, index) => {
            const isActive = step.key === currentStep
            const stepIndex = steps.findIndex((s) => s.key === currentStep)
            const isPast = index < stepIndex

            return (
              <div key={step.key} className="flex items-center gap-2">
                {index > 0 && <div className={`h-px w-8 sm:w-12 ${isPast || isActive ? "bg-primary" : "bg-border"}`} />}
                <button
                  onClick={() => {
                    if (isPast) setCurrentStep(step.key)
                  }}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isPast
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-xs">
                    {isPast ? <Check className="h-3.5 w-3.5" /> : index + 1}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="flex-1">
            {/* Delivery Step */}
            {currentStep === "delivery" && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Delivery Information
                </h2>

                {/* Delivery Method Toggle */}
                <div className="mt-4 flex rounded-lg border border-border overflow-hidden">
                  <button
                    onClick={() => setDeliveryMethod("delivery")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                      deliveryMethod === "delivery"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Truck className="h-4 w-4" />
                    Delivery
                  </button>
                  <button
                    onClick={() => setDeliveryMethod("pickup")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                      deliveryMethod === "pickup"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    <MapPin className="h-4 w-4" />
                    Store Pickup
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">First Name</label>
                    <input
                      type="text"
                      value={delivery.firstName}
                      onChange={(e) => setDelivery({ ...delivery, firstName: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Last Name</label>
                    <input
                      type="text"
                      value={delivery.lastName}
                      onChange={(e) => setDelivery({ ...delivery, lastName: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                    <input
                      type="email"
                      value={delivery.email}
                      onChange={(e) => setDelivery({ ...delivery, email: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={delivery.phone}
                      onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="(512) 555-0123"
                    />
                  </div>
                </div>

                {deliveryMethod === "delivery" && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Street Address</label>
                      <input
                        type="text"
                        value={delivery.address}
                        onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Apt / Suite (optional)</label>
                      <input
                        type="text"
                        value={delivery.apt}
                        onChange={(e) => setDelivery({ ...delivery, apt: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Apt 4B"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">City</label>
                      <input
                        type="text"
                        value={delivery.city}
                        onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Austin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">State</label>
                      <select
                        value={delivery.state}
                        onChange={(e) => setDelivery({ ...delivery, state: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="TX">Texas</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="FL">Florida</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">ZIP Code</label>
                      <input
                        type="text"
                        value={delivery.zip}
                        onChange={(e) => setDelivery({ ...delivery, zip: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="78701"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Delivery Instructions (optional)</label>
                      <textarea
                        value={delivery.instructions}
                        onChange={(e) => setDelivery({ ...delivery, instructions: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                        placeholder="Leave at front door, ring bell, etc."
                      />
                    </div>
                  </div>
                )}

                {deliveryMethod === "pickup" && (
                  <div className="mt-4 rounded-lg bg-secondary p-4">
                    <p className="text-sm font-medium text-foreground">Pickup Location</p>
                    <p className="mt-1 text-sm text-muted-foreground">FreshMart - Downtown Austin</p>
                    <p className="text-sm text-muted-foreground">123 Market St, Austin, TX 78701</p>
                    <p className="mt-2 text-xs text-accent font-medium">Ready in approximately 2 hours</p>
                  </div>
                )}

                <button
                  onClick={() => setCurrentStep("payment")}
                  className="mt-6 w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === "payment" && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Method
                </h2>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Card Number</label>
                    <input
                      type="text"
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Name on Card</label>
                    <input
                      type="text"
                      value={payment.nameOnCard}
                      onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Expiry Date</label>
                    <input
                      type="text"
                      value={payment.expiry}
                      onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">CVV</label>
                    <input
                      type="text"
                      value={payment.cvv}
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-lg bg-secondary p-3">
                  <Lock className="h-4 w-4 text-accent flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setCurrentStep("delivery")}
                    className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep("review")}
                    className="flex-1 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Review Step */}
            {currentStep === "review" && (
              <div className="flex flex-col gap-6">
                {/* Delivery Info */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">Delivery Details</h2>
                    <button
                      onClick={() => setCurrentStep("delivery")}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">
                    <p className="text-foreground font-medium">{delivery.firstName} {delivery.lastName}</p>
                    {deliveryMethod === "delivery" ? (
                      <>
                        <p>{delivery.address}{delivery.apt ? `, ${delivery.apt}` : ""}</p>
                        <p>{delivery.city}, {delivery.state} {delivery.zip}</p>
                      </>
                    ) : (
                      <p>Store Pickup - Downtown Austin</p>
                    )}
                    <p>{delivery.email}</p>
                    <p>{delivery.phone}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-bold text-foreground">Order Items ({itemCount})</h2>
                  <div className="mt-4 flex flex-col gap-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep("payment")}
                    className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Place Order - ${total.toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96">
            <div className="sticky top-40 rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground">Order Summary</h2>

              {/* Item Preview */}
              <div className="mt-4 flex flex-col gap-2 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground line-clamp-1 flex-1">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="text-foreground font-medium ml-2">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-border pt-4 flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {deliveryMethod === "delivery" ? "Delivery" : "Pickup"}
                  </span>
                  <span className={deliveryMethod === "delivery" && deliveryFee === 0 ? "text-accent font-medium" : "text-foreground font-medium"}>
                    {deliveryMethod === "pickup" ? "FREE" : deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Est. Tax</span>
                  <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-foreground">Total</span>
                  <span className="text-base font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
