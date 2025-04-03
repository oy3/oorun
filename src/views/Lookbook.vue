<script setup>
import { ref } from 'vue';
import { useProductStore } from '../stores/products';

const productStore = useProductStore();

// Get featured products for the lookbook
const featuredProducts = ref(productStore.getFeaturedProducts);

// Lookbook sections with titles and descriptions
const lookbookSections = ref([
  {
    id: 'section1',
    title: 'Afẹmọ́jú (Dawn) Collection',
    description: 'Inspired by the soft, muted colors of dawn, this collection embodies the peaceful transition from night to day.',
    colorGroup: 'Afẹmọ́jú (Dawn)'
  },
  {
    id: 'section2',
    title: 'Òwúrọ̀ (Morning) Collection',
    description: 'Bright and refreshing pieces that capture the energy and optimism of a new day.',
    colorGroup: 'Òwúrọ̀ (Morning)'
  },
  {
    id: 'section3',
    title: 'Ìyàlètà (Noon) Collection',
    description: 'Bold and vibrant designs reflecting the intensity and clarity of midday light.',
    colorGroup: 'Ìyàlètà (Noon)'
  },
  {
    id: 'section4',
    title: 'Àṣalẹ́ (Evening) Collection',
    description: 'Elegant and sophisticated pieces inspired by the rich, warm tones of evening.',
    colorGroup: 'Àṣalẹ́ (Evening)'
  }
]);
</script>

<template>
  <div class="lookbook-page">
    <div class="container py-5">
      <h1 class="display-4 fw-bold text-center mb-5">Lookbook</h1>
      
      <p class="lead text-center mb-5">
        Explore our seasonal collections inspired by the colors and moods of the day.
        Each piece tells a story of Nigerian heritage through modern, sustainable fashion.
      </p>
      
      <!-- Lookbook Sections -->
      <div v-for="section in lookbookSections" :key="section.id" class="lookbook-section mb-5">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <div class="section-info p-4">
              <h2 class="section-title">{{ section.title }}</h2>
              <p class="section-description">{{ section.description }}</p>
            </div>
          </div>
          
          <div class="col-lg-8">
            <div class="row g-4">
              <!-- Filter products by the color group of this section -->
              <div 
                v-for="product in featuredProducts.filter(p => 
                  p.availableColors.some(c => c.group === section.colorGroup)
                ).slice(0, 3)" 
                :key="product.id" 
                class="col-md-4"
              >
                <div class="lookbook-item">
                  <div class="lookbook-image">
                    <img 
                      :src="product.images[0]" 
                      :alt="product.name" 
                      class="img-fluid" 
                      onerror="this.src='/images/placeholder.jpg'"
                    >
                  </div>
                  <div class="lookbook-caption">
                    <h5>{{ product.name }}</h5>
                    <p>{{ product.category === 'men' ? 'Men\'s Collection' : 'Women\'s Collection' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Inspiration Section -->
      <div class="inspiration-section text-center py-5">
        <h2 class="mb-4">Our Inspiration</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title">Nigerian Heritage</h3>
                <p class="card-text">Our designs draw from the rich cultural heritage of Nigeria, incorporating traditional elements with modern aesthetics.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title">Sustainable Fashion</h3>
                <p class="card-text">We're committed to sustainable practices, using eco-friendly materials and ethical production methods.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title">Timeless Design</h3>
                <p class="card-text">Our pieces are designed to transcend seasonal trends, offering timeless style that lasts for years to come.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lookbook-section {
  margin-bottom: 6rem;
}

.section-info {
  background-color: #f8f9fa;
  border-radius: 8px;
  height: 100%;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.lookbook-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.lookbook-item:hover {
  transform: translateY(-5px);
}

.lookbook-image {
  height: 300px;
  overflow: hidden;
}

.lookbook-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.lookbook-item:hover .lookbook-image img {
  transform: scale(1.05);
}

.lookbook-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  text-align: center;
}

.inspiration-section {
  margin-top: 4rem;
  background-color: #f8f9fa;
  padding: 3rem;
  border-radius: 8px;
}

.card {
  border: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}
</style>