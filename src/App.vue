<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import { useCartStore } from './stores/cart';

const cartStore = useCartStore();
const showMobileMenu = ref(false);

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};
</script>

<template>
  <header class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        <div class="logo-container">
          <img src="/images/sun-logo.svg" alt="Òòrùn Logo" class="brand-logo" />
          <!-- <div class="brand-text">
            <span class="brand-name">Òòrùn</span>
            <span class="brand-subtitle">by OYE x DTY</span>
          </div> -->
        </div>
      </RouterLink>

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
            <ul class="dropdown-menu" aria-labelledby="shopDropdown">
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

  <main>
    <RouterView />
  </main>

  <footer class="bg-dark text-white py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4 mb-md-0">
          <h5 class="mb-4 brand-name">Òòrùn</h5>
          <p>Nigerian fashion brand focused on breathable, stylish, and versatile clothing for the country's growing heat.</p>
          <div class="social-icons">
            <a href="#" class="text-white me-3"><i class="bi bi-facebook"></i></a>
            <a href="#" class="text-white me-3"><i class="bi bi-instagram"></i></a>
            <a href="#" class="text-white"><i class="bi bi-twitter"></i></a>
          </div>
        </div>
        <div class="col-md-2 mb-4 mb-md-0">
          <h5 class="text-uppercase mb-4">Shop</h5>
          <ul class="list-unstyled">
            <li class="mb-2"><RouterLink to="/shop/men" class="text-white">Men</RouterLink></li>
            <li class="mb-2"><RouterLink to="/shop/women" class="text-white">Women</RouterLink></li>
            <li class="mb-2"><RouterLink to="/lookbook" class="text-white">Lookbook</RouterLink></li>
          </ul>
        </div>
        <div class="col-md-2 mb-4 mb-md-0">
          <h5 class="text-uppercase mb-4">Help</h5>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="#" class="text-white">FAQ</a></li>
            <li class="mb-2"><a href="#" class="text-white">Shipping</a></li>
            <li class="mb-2"><a href="#" class="text-white">Returns</a></li>
            <li class="mb-2"><a href="#" class="text-white">Contact Us</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5 class="text-uppercase mb-4">Subscribe to our newsletter</h5>
          <form>
            <div class="input-group mb-3">
              <input type="email" class="form-control" placeholder="Your email" aria-label="Your email" aria-describedby="subscribe-btn">
              <button class="btn btn-primary" type="button" id="subscribe-btn">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 text-center">
          <p class="mb-0">&copy; {{ new Date().getFullYear() }} Òòrùn by OYE x DTY. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');

.logo-container {
  display: flex;
  align-items: center;
  line-height: 1.2;
}

.brand-logo {
  height: 50px;
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

main {
  min-height: 70vh;
}

footer {
  background-color: var(--deep-indigo) !important;
}

.social-icons a {
  font-size: 1.2rem;
  transition: opacity 0.3s ease;
}

.social-icons a:hover {
  opacity: 0.8;
  text-decoration: none;
}
</style>
