import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    checkout: {
      shipping: {},
      payment: {}
    }
  }),
  getters: {
    cartTotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    itemCount: (state) => {
      return state.items.reduce((count, item) => count + item.quantity, 0)
    }
  },
  actions: {
    addToCart(product, quantity = 1, selectedColor) {
      const existingItem = this.items.find(
        item => item.product.id === product.id && item.color === selectedColor
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          product,
          quantity,
          color: selectedColor
        })
      }
    },
    removeFromCart(itemId, color) {
      const index = this.items.findIndex(item => item.product.id === itemId && item.color === color)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
    updateQuantity(itemId, color, quantity) {
      const item = this.items.find(item => item.product.id === itemId && item.color === color)
      if (item) {
        item.quantity = quantity
      }
    },
    clearCart() {
      this.items = []
    },
    saveShippingInfo(shippingInfo) {
      this.checkout.shipping = shippingInfo
    },
    savePaymentInfo(paymentInfo) {
      this.checkout.payment = paymentInfo
    }
  }
})