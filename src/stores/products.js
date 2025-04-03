import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      // Men's Collection
      {
        id: 'm1',
        name: 'Long-Sleeve Shirt',
        category: 'men',
        type: 'long-sleeve-shirts',
        price: 12500, // Price in Naira
        description: 'Relaxed and airy long-sleeve shirt made from breathable linen fabric.',
        images: [
          '/images/products/men/long-sleeve-1.jpg',
        ],
        availableColors: [
          { name: 'Misty Blue', hex: '#C5D8E1', group: 'Afẹmọ́jú (Dawn)' },
          { name: 'Warm Cream', hex: '#F8E9C1', group: 'Òwúrọ̀ (Morning)' },
          { name: 'Bright Gold', hex: '#FFD54F', group: 'Ìyàlètà (Noon)' },
          { name: 'Deep Indigo', hex: '#2C3057', group: 'Àlẹ́ (Night)' }
        ],
        fabric: 'Linen',
        featured: true
      },
      {
        id: 'm2',
        name: 'Slit T-Shirt',
        category: 'men',
        type: 'slit-t-shirts',
        price: 8500,
        description: 'Modern, stylish, and breathable slit t-shirt perfect for hot weather.',
        images: [
          '/images/products/men/slit-tshirt-1.JPG',
        ],
        availableColors: [
          { name: 'Muted Lavender', hex: '#D8C3E2', group: 'Afẹmọ́jú (Dawn)' },
          { name: 'Sky Blue', hex: '#B7DFF5', group: 'Òwúrọ̀ (Morning)' },
          { name: 'Muted Peach', hex: '#F4C395', group: 'Ìyàlètà (Noon)' },
          { name: 'Rust Brown', hex: '#9E5E45', group: 'Àṣalẹ́ (Evening)' }
        ],
        fabric: 'Linen',
        featured: false
      },
      {
        id: 'm3',
        name: 'Revere Collar Shirt',
        category: 'men',
        type: 'revere-collar-shirts',
        price: 11000,
        description: 'A timeless, casual fit revere collar shirt for everyday comfort.',
        images: [
          '/images/products/men/revere-collar-1.jpg',
        ],
        availableColors: [
          { name: 'Ash Gray', hex: '#B0AFAF', group: 'Afẹmọ́jú (Dawn)' },
          { name: 'Pale Lemon', hex: '#F4DA70', group: 'Òwúrọ̀ (Morning)' },
          { name: 'Warm Sand', hex: '#E3C77F', group: 'Ìyàlètà (Noon)' },
          { name: 'Twilight Purple', hex: '#5B4B8A', group: 'Àṣalẹ́ (Evening)' }
        ],
        fabric: 'Linen',
        featured: true
      },
      {
        id: 'm4',
        name: 'Baggy Flared Trousers',
        category: 'men',
        type: 'baggy-flared-trousers',
        price: 14500,
        description: 'Flowy and easy to wear baggy flared trousers for maximum comfort.',
        images: [
          '/images/products/men/baggy-trousers-1.jpg',
        ],
        availableColors: [
          { name: 'Burnt Yellow', hex: '#E6A540', group: 'Òṣán (Early Afternoon)' },
          { name: 'Rich Ochre', hex: '#C68B41', group: 'Òṣán Gangan (Late Afternoon)' },
          { name: 'Deep Coral', hex: '#E6735D', group: 'Ìrọ̀lẹ́ (Sunset)' },
          { name: 'Cool Charcoal', hex: '#3B3C47', group: 'Àlẹ́ (Night)' }
        ],
        fabric: 'Linen',
        featured: false
      },
      {
        id: 'm5',
        name: 'Shorts',
        category: 'men',
        type: 'shorts',
        price: 7500,
        description: 'Lightweight and versatile shorts for the hottest days.',
        images: [
          '/images/products/men/shorts-1.jpg',
        ],
        availableColors: [
          { name: 'Golden Beige', hex: '#F2E3B3', group: 'Òṣán (Early Afternoon)' },
          { name: 'Muted Olive', hex: '#8A9970', group: 'Òṣán Gangan (Late Afternoon)' },
          { name: 'Sunset Orange', hex: '#FF8C42', group: 'Ìrọ̀lẹ́ (Sunset)' },
          { name: 'Deep Teal', hex: '#487A89', group: 'Àṣalẹ́ (Evening)' }
        ],
        fabric: 'Linen',
        featured: false
      },
      {
        id: 'm6',
        name: 'Vest',
        category: 'men',
        type: 'vests',
        price: 6500,
        description: 'Layered and breathable vest for a stylish casual look.',
        images: [
          '/images/products/men/vest-1.jpg',
        ],
        availableColors: [
          { name: 'Crisp White', hex: '#FFFFFF', group: 'Òṣán (Early Afternoon)' },
          { name: 'Golden Brown', hex: '#D9A55B', group: 'Òṣán Gangan (Late Afternoon)' },
          { name: 'Muted Red Clay', hex: '#B55239', group: 'Ìrọ̀lẹ́ (Sunset)' },
          { name: 'Deep Indigo', hex: '#2C3057', group: 'Àlẹ́ (Night)' }
        ],
        fabric: 'Asooke',
        featured: false
      },
      
      // Women's Collection
      {
        id: 'w1',
        name: 'Crop Top',
        category: 'women',
        type: 'crop-tops',
        price: 7000,
        description: 'Simple, everyday essential crop top for a casual stylish look.',
        images: [
          '/images/products/women/crop-top-1.jpg',
        ],
        availableColors: [
          { name: 'Misty Blue', hex: '#C5D8E1', group: 'Afẹmọ́jú (Dawn)' },
          { name: 'Warm Cream', hex: '#F8E9C1', group: 'Òwúrọ̀ (Morning)' },
          { name: 'Bright Gold', hex: '#FFD54F', group: 'Ìyàlètà (Noon)' },
          { name: 'Sunset Orange', hex: '#FF8C42', group: 'Ìrọ̀lẹ́ (Sunset)' }
        ],
        fabric: 'Linen',
        featured: true
      },
      {
        id: 'w2',
        name: 'Crop Shirt',
        category: 'women',
        type: 'crop-shirts',
        price: 9500,
        description: 'Relaxed but stylish crop shirt for a comfortable everyday look.',
        images: [
          '/images/products/women/crop-shirt-1.jpg',
        ],
        availableColors: [
          { name: 'Muted Lavender', hex: '#D8C3E2', group: 'Afẹmọ́jú (Dawn)' },
          { name: 'Pale Lemon', hex: '#F4DA70', group: 'Òwúrọ̀ (Morning)' },
          { name: 'Muted Peach', hex: '#F4C395', group: 'Ìyàlètà (Noon)' },
          { name: 'Deep Coral', hex: '#E6735D', group: 'Ìrọ̀lẹ́ (Sunset)' }
        ],
        fabric: 'Linen',
        featured: false
      },
      {
        id: 'w3',
        name: 'Oversized Shirt',
        category: 'women',
        type: 'oversized-shirts',
        price: 11000,
        description: 'Airy, effortless, and trendy oversized shirt for maximum comfort.',
        images: [
          '/images/products/women/oversized-shirt-1.jpg',
        ],
        availableColors: [
          { name: 'Ash Gray', hex: '#B0AFAF', group: 'Afẹmọ́jú (Dawn)' },
          { name: 'Sky Blue', hex: '#B7DFF5', group: 'Òwúrọ̀ (Morning)' },
          { name: 'Warm Sand', hex: '#E3C77F', group: 'Ìyàlètà (Noon)' },
          { name: 'Rust Brown', hex: '#9E5E45', group: 'Àṣalẹ́ (Evening)' }
        ],
        fabric: 'Linen',
        featured: true
      },
      {
        id: 'w4',
        name: 'Crop Vest',
        category: 'women',
        type: 'crop-vests',
        price: 6500,
        description: 'Light layering option crop vest for a stylish casual look.',
        images: [
          '/images/products/women/crop-vest-1.jpg',
        ],
        availableColors: [
          { name: 'Crisp White', hex: '#FFFFFF', group: 'Òṣán (Early Afternoon)' },
          { name: 'Burnt Yellow', hex: '#E6A540', group: 'Òṣán (Early Afternoon)' },
          { name: 'Rich Ochre', hex: '#C68B41', group: 'Òṣán Gangan (Late Afternoon)' },
          { name: 'Twilight Purple', hex: '#5B4B8A', group: 'Àṣalẹ́ (Evening)' }
        ],
        fabric: 'Linen',
        featured: false
      }
    ],
    colorGroups: [
      {
        name: 'Afẹmọ́jú (Dawn)',
        colors: [
          { name: 'Misty Blue', hex: '#C5D8E1' },
          { name: 'Muted Lavender', hex: '#D8C3E2' },
          { name: 'Ash Gray', hex: '#B0AFAF' }
        ]
      },
      {
        name: 'Òwúrọ̀ (Morning)',
        colors: [
          { name: 'Warm Cream', hex: '#F8E9C1' },
          { name: 'Pale Lemon', hex: '#F4DA70' },
          { name: 'Sky Blue', hex: '#B7DFF5' }
        ]
      },
      {
        name: 'Ìyàlètà (Noon)',
        colors: [
          { name: 'Bright Gold', hex: '#FFD54F' },
          { name: 'Muted Peach', hex: '#F4C395' },
          { name: 'Warm Sand', hex: '#E3C77F' }
        ]
      },
      {
        name: 'Òṣán (Early Afternoon)',
        colors: [
          { name: 'Burnt Yellow', hex: '#E6A540' },
          { name: 'Golden Beige', hex: '#F2E3B3' },
          { name: 'Crisp White', hex: '#FFFFFF' }
        ]
      },
      {
        name: 'Òṣán Gangan (Late Afternoon)',
        colors: [
          { name: 'Rich Ochre', hex: '#C68B41' },
          { name: 'Muted Olive', hex: '#8A9970' },
          { name: 'Golden Brown', hex: '#D9A55B' }
        ]
      },
      {
        name: 'Ìrọ̀lẹ́ (Sunset)',
        colors: [
          { name: 'Sunset Orange', hex: '#FF8C42' },
          { name: 'Muted Red Clay', hex: '#B55239' },
          { name: 'Deep Coral', hex: '#E6735D' }
        ]
      },
      {
        name: 'Àṣalẹ́ (Evening)',
        colors: [
          { name: 'Rust Brown', hex: '#9E5E45' },
          { name: 'Twilight Purple', hex: '#5B4B8A' },
          { name: 'Deep Teal', hex: '#487A89' }
        ]
      },
      {
        name: 'Àlẹ́ (Night)',
        colors: [
          { name: 'Deep Indigo', hex: '#2C3057' },
          { name: 'Cool Charcoal', hex: '#3B3C47' },
          { name: 'Midnight Blue', hex: '#191F36' }
        ]
      }
    ]
  }),
  getters: {
    getMenProducts: (state) => {
      return state.products.filter(product => product.category === 'men')
    },
    getWomenProducts: (state) => {
      return state.products.filter(product => product.category === 'women')
    },
    getFeaturedProducts: (state) => {
      return state.products.filter(product => product.featured)
    },
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    },
    getProductsByType: (state) => (type) => {
      return state.products.filter(product => product.type === type)
    },
    getAllColorGroups: (state) => {
      return state.colorGroups
    }
  }
})