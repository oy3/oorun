<script setup>
import { RouterLink } from 'vue-router';

// Get current year for copyright notice
const currentYear = new Date().getFullYear();
</script>

<template>
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
              <button class="btn btn-secondary" type="button" id="subscribe-btn">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 text-center">
          <p class="mb-0">&copy; {{ currentYear }} Òòrùn by OYE x DTY. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--burnt-yellow);
}

footer {
  background-color: var(--rust-brown) !important;
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