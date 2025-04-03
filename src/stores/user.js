import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    orders: [],
    wishlist: []
  }),
  getters: {
    getUser: (state) => state.user,
    getUserOrders: (state) => state.orders,
    getUserWishlist: (state) => state.wishlist
  },
  actions: {
    login(userData) {
      // In a real app, this would make an API call to authenticate
      this.user = userData
      this.isAuthenticated = true
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.orders = []
      this.wishlist = []
    },
    updateProfile(profileData) {
      this.user = { ...this.user, ...profileData }
    },
    addToWishlist(productId) {
      if (!this.wishlist.includes(productId)) {
        this.wishlist.push(productId)
      }
    },
    removeFromWishlist(productId) {
      const index = this.wishlist.indexOf(productId)
      if (index !== -1) {
        this.wishlist.splice(index, 1)
      }
    },
    addOrder(order) {
      this.orders.push(order)
    }
  }
})