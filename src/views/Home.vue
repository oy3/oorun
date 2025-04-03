<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '../stores/products';

const productStore = useProductStore();
const featuredProducts = ref([]);

onMounted(() => {
  featuredProducts.value = productStore.getFeaturedProducts;
});
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 hero-content">
            <h1 class="display-4 fw-bold">Find Your Style With Òòrùn</h1>
            <p class="lead">Breathable, stylish, and versatile clothing for Nigeria's growing heat.</p>
            <p class="mb-4">Made with traditional Nigerian fabrics such as linen, tie-dye, and Aso Oke.</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <router-link to="/shop" class="btn btn-primary btn-lg px-4 me-md-2 rounded-0">Shop Now</router-link>
              <router-link to="/lookbook" class="btn btn-outline-primary btn-lg px-4 rounded-0">View Lookbook</router-link>
            </div>
          </div>
          <div class="col-md-6 hero-image">
            <img src="/images/hero-image.png" alt="Òòrùn Fashion" class="img-fluid">
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="featured-categories py-5">
      <div class="container">
        <h2 class="text-center mb-5">Our Collections</h2>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="category-card position-relative">
              <img src="/images/men-category.jpg" alt="Men's Collection" class="img-fluid rounded">
              <div class="category-overlay rounded">
                <h3 class="category-title">Men's Collection</h3>
                <router-link to="/shop/men" class="btn btn-primary rounded-0">Shop Men</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="category-card position-relative">
              <img src="/images/women-category.jpg" alt="Women's Collection" class="img-fluid rounded">
              <div class="category-overlay rounded">
                <h3 class="category-title">Women's Collection</h3>
                <router-link to="/shop/women" class="btn btn-primary rounded-0">Shop Women</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5">Featured Products</h2>
        <div class="row g-4">
          <div v-for="product in featuredProducts" :key="product.id" class="col-md-3">
            <div class="card product-card h-100">
              <img :src="product.images[0]" class="card-img-top" :alt="product.name">
              <div class="card-body">
                <h5 class="card-title product-title">{{ product.name }}</h5>
                <p class="card-text product-price">₦{{ product.price.toLocaleString() }}</p>
                <div class="d-flex mb-3">
                  <div 
                    v-for="color in product.availableColors.slice(0, 4)" 
                    :key="color.hex"
                    class="color-option"
                    :style="{ backgroundColor: color.hex }"
                    :title="color.name"
                  ></div>
                </div>
                <router-link :to="`/shop/${product.category}/${product.id}`" class="btn btn-primary w-100 rounded-0">View Details</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Story -->
    <section class="brand-story py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 mb-4 mb-md-0">
            <img src="/images/brand-story.png" alt="Òòrùn Brand Story" class="img-fluid rounded shadow">
          </div>
          <div class="col-md-6">
            <h2 class="mb-4">Our Brand Story</h2>
            <p class="lead mb-4">The name Òòrùn (meaning Sun in Yoruba) symbolizes warmth, comfort, and effortless everyday style.</p>
            <p>With Nigeria's rising temperatures, Òòrùn by OYE x DTY was founded to provide lightweight, all-purpose outfits using traditional Nigerian fabrics such as linen, tie-dye, and Aso Oke, while blending modern, minimalist aesthetics.</p>
            <p>Designed for the everyday person, Òòrùn pieces ensure comfort whether at work, running errands, or attending casual events.</p>
            <router-link to="/lookbook" class="btn btn-outline-primary mt-3 rounded-0">Explore Our Lookbook</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Color Palette Showcase -->
    <section class="color-palette py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5">Our Earth-Tone Colors</h2>
        <p class="text-center mb-5">Inspired by the natural phases of the day, our color palette reflects the beauty of Nigerian landscapes.</p>
        
        <div class="row g-4">
          <div class="col-md-3 col-6 mb-4" v-for="(group, index) in productStore.getAllColorGroups.slice(0, 8)" :key="index">
            <div class="color-group-card">
              <h5 class="color-group-title">{{ group.name }}</h5>
              <div class="color-swatches">
                <div 
                  v-for="color in group.colors" 
                  :key="color.hex" 
                  class="color-swatch"
                  :style="{ backgroundColor: color.hex }"
                >
                  <span class="color-name">{{ color.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10 text-center">
            <h2 class="mb-4">Ready to experience comfort and style?</h2>
            <p class="lead mb-4">Explore our collection of breathable, stylish clothing designed for Nigeria's climate.</p>
            <router-link to="/shop" class="btn btn-primary btn-lg rounded-0">Shop Now</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  padding: 5rem 0;
  background-color: var(--warm-cream);
}

.hero-content {
  padding: 2rem 0;
}

.hero-image img {
  max-height: 500px;
  width: 100%;
  object-fit: cover;
  object-position: 90% 0%;
}

.category-card {
  overflow: hidden;
  height: 300px;
}

.category-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.category-card:hover img {
  transform: scale(1.05);
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.category-title {
  margin-bottom: 1rem;
  font-weight: 700;
}

.color-option {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
  border: 1px solid #ddd;
}

.color-group-card {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 100%;
}

.color-group-title {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.color-swatches {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.color-swatch {
  height: 40px;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.color-name {
  font-size: 0.7rem;
  color: white;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}

.cta {
  background-color: var(--muted-peach);
  padding: 4rem 0;
}
</style>