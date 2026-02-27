'use server'

import { stripe } from '@/lib/stripe'
import { products } from '@/lib/data'

export interface CheckoutItem {
  productId: string
  quantity: number
}

export async function createCheckoutSession(cartItems: CheckoutItem[]) {
  if (!cartItems.length) {
    throw new Error('Cart is empty')
  }

  // Build line items with server-side price validation
  const lineItems = cartItems.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId)
    if (!product) {
      throw new Error(`Product with id "${cartItem.productId}" not found`)
    }

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: Math.round(product.price * 100), // Convert dollars to cents
      },
      quantity: cartItem.quantity,
    }
  })

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    line_items: lineItems,
    mode: 'payment',
  })

  return session.client_secret
}
