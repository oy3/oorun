<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/products';
import { useCartStore } from '../stores/cart';
import { useUserStore } from '../stores/user';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();
const userStore = useUserStore();

// Get product ID from route params
const productId = computed(() => route.params.id);
const category = computed(() => route.params.category);

// Product data
const product = ref(null);
const selectedColor = ref('');
const quantity = ref(1);
const activeImageIndex = ref(0);

// Fetch product data on component mount
onMounted(() => {
  // Get product by ID
  const foundProduct = productStore.getProductById(productId.value);
  
  if (foundProduct) {
    product.value = foundProduct;
    // Set default selected color to first available color
    if (foundProduct.availableColors && foundProduct.availableColors.length > 0) {
      selectedColor.value = foundProduct.availableColors[0].hex;
    }
  } else {
    // Product not found, redirect to shop
    router.push('/shop');
  }
});

// Update quantity
const updateQuantity = (value) => {
  const newQuantity = quantity.value + value;
  if (newQuantity >= 1) {
    quantity.value = newQuantity;
  }
};

// Add to cart
const addToCart = () => {
  if (product.value && selectedColor.value) {
    cartStore.addToCart(product.value, quantity.value, selectedColor.value);
    alert(`${product.value.name} added to cart!`);
  }
};

// Get color name by hex
const getColorName = (hex) => {
  if (!product.value) return '';
  const color = product.value.availableColors.find(c => c.hex === hex);
  return color ? color.name : '';
};

// Change active image
const setActiveImage = (index) => {
  activeImageIndex.value = index;
};

// Toggle product in wishlist
const toggleWishlist = () => {
  if (product.value) {
    if (isInWishlist(product.value.id)) {
      userStore.removeFromWishlist(product.value.id);
    } else {
      userStore.addToWishlist(product.value.id);
    }
  }
};

// Check if product is in wishlist
const isInWishlist = (productId) => {
  return userStore.getUserWishlist.includes(productId);
};
</script>

<template>
  <div class="product-detail-page">
    <div class="container py-5" v-if="product">
      <div class="row">
        <!-- Product Images -->
        <div class="col-md-6 mb-4">
          <div class="product-images">
            <div class="main-image mb-3">
              <img 
                :src="product.images[activeImageIndex] || product.images[0]" 
                :alt="product.name"
                class="img-fluid"
                onerror="this.src='/images/placeholder.jpg'"
              >
            </div>
            <div class="image-thumbnails d-flex" v-if="product.images.length > 1">
              <div 
                v-for="(image, index) in product.images" 
                :key="index"
                class="thumbnail me-2"
                :class="{ 'active': index === activeImageIndex }"
                @click="setActiveImage(index)"
              >
                <img 
                  :src="image" 
                  :alt="`${product.name} - Image ${index + 1}`"
                  class="img-fluid"
                  onerror="this.src='/images/placeholder.jpg'"
                >
              </div>
            </div>
          </div>
        </div>
        
        <!-- Product Info -->
        <div class="col-md-6">
          <nav aria-label="breadcrumb" class="mb-3">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/shop">Shop</router-link></li>
              <li class="breadcrumb-item">
                <router-link :to="`/shop/${category}`">
                  {{ category === 'men' ? 'Men' : 'Women' }}
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{ product.name }}</li>
            </ol>
          </nav>
          
          <h1 class="mb-2">{{ product.name }}</h1>
          <p class="product-category mb-2">
            {{ product.category === 'men' ? 'Men\'s' : 'Women\'s' }} {{ product.type.replace(/-/g, ' ') }}
          </p>
          <p class="product-price mb-3">₦{{ product.price.toLocaleString() }}</p>
          <p class="product-fabric mb-3">{{ product.fabric }}</p>
          
          <div class="product-description mb-4">
            <p>{{ product.description }}</p>
          </div>
          
          <!-- Color Selection -->
          <div class="color-selection mb-4">
            <h5 class="mb-2">Color: <span class="selected-color-name">{{ getColorName(selectedColor) }}</span></h5>
            <div class="d-flex flex-wrap">
              <div 
                v-for="color in product.availableColors" 
                :key="color.hex"
                class="color-option me-2 mb-2"
                :class="{ 'active': selectedColor === color.hex }"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
                @click="selectedColor = color.hex"
              ></div>
            </div>
          </div>
          
          <!-- Quantity Selection -->
          <div class="quantity-selection mb-4">
            <h5 class="mb-2">Quantity:</h5>
            <div class="d-flex align-items-center">
              <button @click="updateQuantity(-1)" class="btn btn-sm btn-outline-secondary" :disabled="quantity <= 1">-</button>
              <span class="mx-3">{{ quantity }}</span>
              <button @click="updateQuantity(1)" class="btn btn-sm btn-outline-secondary">+</button>
            </div>
          </div>
          
          <!-- Add to Cart and Wishlist Buttons -->
          <div class="d-grid gap-2 mb-3">
            <button @click="addToCart" class="btn btn-primary btn-lg">Add to Cart</button>
          </div>
          <div class="d-flex justify-content-center">
            <button 
              @click="toggleWishlist" 
              class="btn btn-lg" 
              :class="isInWishlist(product.id) ? 'btn-danger' : 'btn-outline-danger'">
              <i class="bi" :class="isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
              {{ isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Loading or Not Found State -->
    <div class="container py-5 text-center" v-else>
      <div class="spinner-border text-primary" role="status" v-if="!product">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-page {
  min-height: 80vh;
}

.main-image {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  overflow: hidden;
}

.main-image img {
  max-height: 100%;
  object-fit: contain;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.thumbnail.active {
  border-color: var(--primary);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.product-category {
  color: #6c757d;
  text-transform: capitalize;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #dee2e6;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: var(--primary);
  transform: scale(1.1);
}

.selected-color-name {
  font-weight: normal;
  color: #6c757d;
}
</style>