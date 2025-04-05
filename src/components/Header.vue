<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { useThemeStore } from '../stores/theme';

const cartStore = useCartStore();
const themeStore = useThemeStore();
const showMobileMenu = ref(false);

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const toggleTheme = () => {
  themeStore.toggleTheme();
  themeStore.saveThemePreference();
};

onMounted(() => {
  themeStore.initTheme();
});
</script>

<template>
  <header class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <a href="#" class="navbar-brand" @click.prevent="toggleTheme">
        <div class="logo-container">
          <img 
            :src="themeStore.isDarkMode ? '/images/moon-logo.svg' : '/images/sun-logo.svg'" 
            :alt="themeStore.isDarkMode ? 'Dark Mode' : 'Light Mode'" 
            class="brand-logo" 
          />
        </div>
      </a>

      <button 
        class="navbar-toggler" 
        type="button" 
        @click="toggleMobileMenu"
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div 
        class="collapse navbar-collapse" 
        :class="{ 'show': showMobileMenu }" 
        id="navbarNav"
      >
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/" active-class="active">Home</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="shopDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Shop
            </a>
            <ul class="dropdown-menu rounded-0" aria-labelledby="shopDropdown">
              <li><RouterLink class="dropdown-item" to="/shop/men">Men</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/shop/women">Women</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/shop">All Products</RouterLink></li>
            </ul>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/lookbook" active-class="active">Lookbook</RouterLink>
          </li>
        </ul>
        <div class="d-flex">
          <RouterLink to="/cart" class="position-relative me-4">
            <i class="bi bi-bag fs-3"></i>
            <span v-if="cartStore.itemCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
              {{ cartStore.itemCount }}
            </span>
          </RouterLink>
          <RouterLink to="/profile" class="">
            <i class="bi bi-person fs-3"></i>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.logo-container {
  width: 100px;
  display: flex;
  align-items: center;
  line-height: 1.2;
}

.brand-logo {
  height: 40px;
  width: auto;
  margin-right: 10px;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.brand-subtitle {
  font-size: 0.8rem;
  color: var(--dark-gray);
}

.navbar {
  padding: 1rem 0;
}

.nav-link {
  font-weight: 500;
  color: var(--dark-gray);
  margin: 0 0.5rem;
}

.nav-link.active {
  color: var(--primary);
}
</style>