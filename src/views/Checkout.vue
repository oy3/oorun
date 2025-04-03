<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  paymentMethod: 'card'
});

// Form validation
const errors = ref({});

// Get cart items from store
const cartItems = computed(() => cartStore.items);

// Calculate total price
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
});

// Calculate total items
const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});

// Validate form
const validateForm = () => {
  errors.value = {};
  
  if (!form.value.firstName) errors.value.firstName = 'First name is required';
  if (!form.value.lastName) errors.value.lastName = 'Last name is required';
  if (!form.value.email) errors.value.email = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) errors.value.email = 'Email is invalid';
  if (!form.value.phone) errors.value.phone = 'Phone number is required';
  if (!form.value.address) errors.value.address = 'Address is required';
  if (!form.value.city) errors.value.city = 'City is required';
  if (!form.value.state) errors.value.state = 'State is required';
  if (!form.value.zipCode) errors.value.zipCode = 'Zip code is required';
  
  return Object.keys(errors.value).length === 0;
};

// Submit order
const submitOrder = () => {
  if (!validateForm()) return;
  
  // In a real app, you would send the order to a backend API
  // For now, we'll just simulate a successful order
  
  // Clear cart
  cartStore.$reset();
  
  // Show success message
  alert('Order placed successfully! Thank you for shopping with us.');
  
  // Redirect to home page
  router.push('/');
};
</script>

<template>
  <div class="checkout-page">
    <div class="container py-5">
      <h1 class="display-5 fw-bold text-center mb-5">Checkout</h1>
      
      <div v-if="cartItems.length > 0" class="row">
        <div class="col-lg-8">
          <!-- Checkout Form -->
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title mb-4">Shipping Information</h5>
              
              <form @submit.prevent="submitOrder">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="firstName" class="form-label">First Name</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="firstName" 
                      v-model="form.firstName"
                      :class="{ 'is-invalid': errors.firstName }"
                    >
                    <div v-if="errors.firstName" class="invalid-feedback">{{ errors.firstName }}</div>
                  </div>
                  <div class="col-md-6">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="lastName" 
                      v-model="form.lastName"
                      :class="{ 'is-invalid': errors.lastName }"
                    >
                    <div v-if="errors.lastName" class="invalid-feedback">{{ errors.lastName }}</div>
                  </div>
                </div>
                
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="email" class="form-label">Email</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      id="email" 
                      v-model="form.email"
                      :class="{ 'is-invalid': errors.email }"
                    >
                    <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
                  </div>
                  <div class="col-md-6">
                    <label for="phone" class="form-label">Phone</label>
                    <input 
                      type="tel" 
                      class="form-control" 
                      id="phone" 
                      v-model="form.phone"
                      :class="{ 'is-invalid': errors.phone }"
                    >
                    <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="address" class="form-label">Address</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="address" 
                    v-model="form.address"
                    :class="{ 'is-invalid': errors.address }"
                  >
                  <div v-if="errors.address" class="invalid-feedback">{{ errors.address }}</div>
                </div>
                
                <div class="row mb-3">
                  <div class="col-md-4">
                    <label for="city" class="form-label">City</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="city" 
                      v-model="form.city"
                      :class="{ 'is-invalid': errors.city }"
                    >
                    <div v-if="errors.city" class="invalid-feedback">{{ errors.city }}</div>
                  </div>
                  <div class="col-md-4">
                    <label for="state" class="form-label">State</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="state" 
                      v-model="form.state"
                      :class="{ 'is-invalid': errors.state }"
                    >
                    <div v-if="errors.state" class="invalid-feedback">{{ errors.state }}</div>
                  </div>
                  <div class="col-md-4">
                    <label for="zipCode" class="form-label">Zip Code</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="zipCode" 
                      v-model="form.zipCode"
                      :class="{ 'is-invalid': errors.zipCode }"
                    >
                    <div v-if="errors.zipCode" class="invalid-feedback">{{ errors.zipCode }}</div>
                  </div>
                </div>
                
                <h5 class="mt-4 mb-3">Payment Method</h5>
                
                <div class="mb-3">
                  <div class="form-check mb-2">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      name="paymentMethod" 
                      id="card" 
                      value="card" 
                      v-model="form.paymentMethod"
                    >
                    <label class="form-check-label" for="card">
                      Credit/Debit Card
                    </label>
                  </div>
                  <div class="form-check mb-2">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      name="paymentMethod" 
                      id="transfer" 
                      value="transfer" 
                      v-model="form.paymentMethod"
                    >
                    <label class="form-check-label" for="transfer">
                      Bank Transfer
                    </label>
                  </div>
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      name="paymentMethod" 
                      id="payOnDelivery" 
                      value="payOnDelivery" 
                      v-model="form.paymentMethod"
                    >
                    <label class="form-check-label" for="payOnDelivery">
                      Pay on Delivery
                    </label>
                  </div>
                </div>
                
                <div class="d-grid mt-4">
                  <button type="submit" class="btn btn-primary btn-lg">Place Order</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div class="col-lg-4">
          <!-- Order Summary -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-4">Order Summary</h5>
              
              <div class="order-items mb-3">
                <div v-for="item in cartItems" :key="item.product.id" class="d-flex justify-content-between mb-2">
                  <span>{{ item.product.name }} × {{ item.quantity }}</span>
                  <span>₦{{ ((item.product.price * item.quantity)).toLocaleString() }}</span>
                </div>
              </div>
  
              <hr>
              
              <div class="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₦{{ (totalPrice).toLocaleString() }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>₦0</span>
              </div>
              
              <hr>
              
              <div class="d-flex justify-content-between mb-0">
                <strong>Total:</strong>
                <strong>₦{{ (totalPrice).toLocaleString() }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty Cart -->
      <div v-else class="text-center py-5">
        <div class="mb-4">
          <i class="bi bi-cart" style="font-size: 4rem;"></i>
        </div>
        <h2 class="mb-3">Your cart is empty</h2>
        <p class="mb-4">You need to add items to your cart before checkout.</p>
        <router-link to="/shop" class="btn btn-primary">Continue Shopping</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.card {
  border: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}

.order-items {
  max-height: 200px;
  overflow-y: auto;
}
</style>