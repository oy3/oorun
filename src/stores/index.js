import { createPinia } from 'pinia'

export const pinia = createPinia()

// Export all stores for easy imports
export * from './cart'
export * from './products'
export * from './user'