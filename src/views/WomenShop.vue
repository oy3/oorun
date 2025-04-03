<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from '../stores/products';
import { useCartStore } from '../stores/cart';

const productStore = useProductStore();
const cartStore = useCartStore();

const products = ref([]);
const selectedType = ref('');
const selectedColorGroup = ref('');

// Get women's products on component mount
onMounted(() => {
  products.value = productStore.getWomenProducts;
});

// Filter products based on selected type and color group
const filteredProducts = computed(() => {
  let filtered = products.value;
  
  // Filter by product type
  if (selectedType.value) {
    filtered = filtered.filter(product => product.type === selectedType.value);
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

// Get unique product types for filtering
const productTypes = computed(() => {
  const types = new Set();
  products.value.forEach(product => {
    types.add(product.type);
  });
  return Array.from(types);
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
</script>

<template>
  <div class="women-shop-page">
    <div class="container py-5">
      <h1 class="display-5 fw-bold text-center mb-5">Women's Collection</h1>
      
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="filter-section">
            <label class="form-label">Filter by Type:</label>
            <select v-model="selectedType" class="form-select">
              <option value="">All Types</option>
              <option v-for="type in productTypes" :key="type" :value="type">
                {{ type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="filter-section">
            <label class="form-label">Filter by Color Group:</label>
            <select v-model="selectedColorGroup" class="form-select">
              <option value="">All Colors</option>
              <option v-for="group in colorGroups" :key="group.name" :value="group.name">
                {{ group.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="row g-4">
        <div v-for="product in filteredProducts" :key="product.id" class="col-md-6 col-lg-4">
          <div class="card h-100 product-card">
            <div class="card-img-container">
              <img :src="product.images[0]" class="card-img-top" :alt="product.name" onerror="this.src='/images/placeholder.jpg'">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="price">₦{{ (product.price / 100).toLocaleString() }}</div>
                <button @click="addToCart(product)" class="btn btn-primary">Add to Cart</button>
              </div>
              <div class="color-options mt-3">
                <span class="me-2">Available Colors:</span>
                <div class="d-flex flex-wrap">
                  <div 
                    v-for="color in product.availableColors" 
                    :key="color.hex" 
                    class="color-swatch me-1 mb-1" 
                    :style="{ backgroundColor: color.hex }"
                    :title="color.name"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="filteredProducts.length === 0" class="col-12 text-center py-5">
          <p class="lead">No products found matching your filters.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.card-img-container {
  height: 250px;
  overflow: hidden;
}

.card-img-top {
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .card-img-top {
  transform: scale(1.05);
}

.color-swatch {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.price {
  font-weight: bold;
  font-size: 1.2rem;
}

.filter-section {
  margin-bottom: 1rem;
}
</style>