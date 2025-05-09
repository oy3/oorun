<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from '../stores/products';
import { useCartStore } from '../stores/cart';
import { useUserStore } from '../stores/user';

const productStore = useProductStore();
const cartStore = useCartStore();
const userStore = useUserStore();

const products = ref([]);
const selectedCategory = ref('all');
const selectedColorGroup = ref('');

// Get all products on component mount
onMounted(() => {
  products.value = productStore.products;
});

// Filter products based on selected category and color group
const filteredProducts = computed(() => {
  let filtered = products.value;
  
  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(product => product.category === selectedCategory.value);
  }
  
  // Filter by color group if selected
  if (selectedColorGroup.value) {
    filtered = filtered.filter(product => {
      return product.availableColors.some(color => 
        color.group === selectedColorGroup.value
      );
    });
  }
  
  return filtered;
});

// Get all color groups for filtering
const colorGroups = computed(() => {
  return productStore.getAllColorGroups;
});

// Function to add product to cart
const addToCart = (product) => {
  // Default to first color if available
  const defaultColor = product.availableColors[0]?.hex || '';
  cartStore.addToCart(product, 1, defaultColor);
  alert(`${product.name} added to cart!`);
};

// Function to toggle product in wishlist
const toggleWishlist = (productId) => {
  if (isInWishlist(productId)) {
    userStore.removeFromWishlist(productId);
  } else {
    userStore.addToWishlist(productId);
  }
};

// Function to check if product is in wishlist
const isInWishlist = (productId) => {
  return userStore.getUserWishlist.includes(productId);
};
</script>

<template>
  <div class="shop-page">
    <div class="container py-5">
      <h1 class="mb-4">Shop Our Collection</h1>
      
      <!-- Filters -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="categoryFilter" class="form-label">Filter by Category</label>
            <select id="categoryFilter" class="form-select" v-model="selectedCategory">
              <option value="all">All Categories</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label for="colorFilter" class="form-label">Filter by Color Group</label>
            <select id="colorFilter" class="form-select" v-model="selectedColorGroup">
              <option value="">All Colors</option>
              <option v-for="group in colorGroups" :key="group.name" :value="group.name">
                {{ group.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Products Grid -->
      <div class="row g-4">
        <div v-for="product in filteredProducts" :key="product.id" class="col-md-3 mb-4">
          <div class="card product-card h-100">
            <img :src="product.images[0]" class="card-img-top" :alt="product.name">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title product-title">{{ product.name }}</h5>
              <p class="card-text product-price mb-2">₦{{ product.price.toLocaleString() }}</p>
              <p class="card-text small mb-3">{{ product.fabric }}</p>
              
              <!-- Color Options -->
              <div class="d-flex mb-3">
                <div 
                  v-for="color in product.availableColors.slice(0, 4)" 
                  :key="color.hex"
                  class="color-option"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                ></div>
                <span v-if="product.availableColors.length > 4" class="ms-2 small">+{{ product.availableColors.length - 4 }} more</span>
              </div>
              
              <div class="mt-auto d-flex">
                <router-link :to="`/shop/${product.category}/${product.id}`" class="btn btn-outline-primary flex-grow-1 me-2">
                  View Details
                </router-link>
                <button @click="addToCart(product)" class="btn btn-primary me-2">
                  <i class="bi bi-cart-plus"></i>
                </button>
                <button 
                  @click="toggleWishlist(product.id)" 
                  class="btn" 
                  :class="isInWishlist(product.id) ? 'btn-danger' : 'btn-outline-danger'">
                  <i class="bi" :class="isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty state if no products match filters -->
        <div v-if="filteredProducts.length === 0" class="col-12 text-center py-5">
          <p class="lead">No products found matching your filters.</p>
          <button @click="selectedCategory = 'all'; selectedColorGroup = ''" class="btn btn-outline-primary">
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-card img {
  height: 250px;
  object-fit: cover;
}

.product-title {
  font-weight: 600;
  font-size: 1rem;
}

.product-price {
  font-weight: 700;
  color: var(--primary);
}

.color-option {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
  border: 1px solid #ddd;
  cursor: pointer;
}

@media (max-width: 768px) {
  .product-card img {
    height: 200px;
  }
}
</style>