<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

// Computed properties for user data
const user = computed(() => userStore.getUser);
const orders = computed(() => userStore.getUserOrders);
const wishlist = computed(() => userStore.getUserWishlist);
const isAuthenticated = computed(() => userStore.isAuthenticated);

// Form data for profile updates
const profileForm = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
});

// Form data for login
const loginForm = ref({
  email: '',
  password: ''
});

// Login function
const login = () => {
  // Simulate login with mock data
  const userData = {
    name: 'Demo User',
    email: loginForm.value.email,
    phone: '',
    address: ''
  };
  userStore.login(userData);
};

// Initialize form with user data if available
onMounted(() => {
  if (user.value) {
    profileForm.value = {
      name: user.value.name || '',
      email: user.value.email || '',
      phone: user.value.phone || '',
      address: user.value.address || ''
    };
  }
});

// Update profile information
const updateProfile = () => {
  userStore.updateProfile(profileForm.value);
  alert('Profile updated successfully!');
};

// Format date for order history
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};
</script>

<template>
  <div class="profile-page py-5">
    <div class="container">
      <h1 class="mb-5">My Profile</h1>
      
      <!-- Login form for unauthenticated users -->
      <div v-if="!isAuthenticated" class="row justify-content-center mb-5">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title mb-4">Login to Your Account</h3>
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="login-email" class="form-label">Email Address</label>
                  <input type="email" class="form-control" id="login-email" v-model="loginForm.email" required>
                </div>
                <div class="mb-3">
                  <label for="login-password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="login-password" v-model="loginForm.password" required>
                </div>
                <button type="submit" class="btn btn-primary rounded-0 w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Profile tabs for authenticated users -->
      <div v-if="isAuthenticated">
      <!-- Profile tabs -->
      <ul class="nav nav-tabs mb-4" id="profileTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="account-tab" data-bs-toggle="tab" data-bs-target="#account" 
                  type="button" role="tab" aria-controls="account" aria-selected="true">
            Account Information
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" 
                  type="button" role="tab" aria-controls="orders" aria-selected="false">
            Order History
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="wishlist-tab" data-bs-toggle="tab" data-bs-target="#wishlist" 
                  type="button" role="tab" aria-controls="wishlist" aria-selected="false">
            Wishlist
          </button>
        </li>
      </ul>
      
      <!-- Tab content -->
      <div class="tab-content" id="profileTabsContent">
        <!-- Account Information Tab -->
        <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
          <div class="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title mb-4">Personal Information</h3>
                  <form @submit.prevent="updateProfile">
                    <div class="mb-3">
                      <label for="name" class="form-label">Full Name</label>
                      <input type="text" class="form-control" id="name" v-model="profileForm.name">
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email Address</label>
                      <input type="email" class="form-control" id="email" v-model="profileForm.email">
                    </div>
                    <div class="mb-3">
                      <label for="phone" class="form-label">Phone Number</label>
                      <input type="tel" class="form-control" id="phone" v-model="profileForm.phone">
                    </div>
                    <div class="mb-3">
                      <label for="address" class="form-label">Shipping Address</label>
                      <textarea class="form-control" id="address" rows="3" v-model="profileForm.address"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary rounded-0">Update Profile</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title mb-4">Account Settings</h3>
                  <div class="d-grid gap-2">
                    <button class="btn btn-outline-primary rounded-0" @click="userStore.logout(); router.push('/')">
                      Logout
                    </button>
                    <button class="btn btn-outline-danger rounded-0">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Order History Tab -->
        <div class="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="orders-tab">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title mb-4">Order History</h3>
              <div v-if="orders.length === 0" class="text-center py-5">
                <p class="lead">You haven't placed any orders yet.</p>
                <router-link to="/shop" class="btn btn-primary rounded-0">Start Shopping</router-link>
              </div>
              <div v-else>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="order in orders" :key="order.id">
                        <td>{{ order.id }}</td>
                        <td>{{ formatDate(order.date) }}</td>
                        <td>{{ order.items.length }} items</td>
                        <td>₦{{ order.total.toLocaleString() }}</td>
                        <td>
                          <span class="badge bg-success" v-if="order.status === 'delivered'">Delivered</span>
                          <span class="badge bg-warning text-dark" v-else-if="order.status === 'processing'">Processing</span>
                          <span class="badge bg-info text-dark" v-else-if="order.status === 'shipped'">Shipped</span>
                          <span class="badge bg-secondary" v-else>{{ order.status }}</span>
                        </td>
                        <td>
                          <button class="btn btn-sm btn-outline-primary rounded-0">View Details</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Wishlist Tab -->
        <div class="tab-pane fade" id="wishlist" role="tabpanel" aria-labelledby="wishlist-tab">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title mb-4">My Wishlist</h3>
              <div v-if="wishlist.length === 0" class="text-center py-5">
                <p class="lead">Your wishlist is empty.</p>
                <router-link to="/shop" class="btn btn-primary rounded-0">Discover Products</router-link>
              </div>
              <div v-else class="row g-4">
                <div v-for="productId in wishlist" :key="productId" class="col-md-3">
                  <div class="card product-card h-100">
                    <div class="position-absolute top-0 end-0 p-2">
                      <button class="btn btn-sm btn-outline-danger rounded-circle" 
                              @click="userStore.removeFromWishlist(productId)">
                        <i class="bi bi-x"></i>
                      </button>
                    </div>
                    <img src="https://placehold.co/400" class="card-img-top" alt="Product Image">
                    <div class="card-body">
                      <h5 class="card-title product-title">Product {{ productId }}</h5>
                      <router-link :to="`/shop/category/${productId}`" class="btn btn-primary w-100 rounded-0">
                        View Details
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 80vh;
}

.nav-tabs .nav-link {
  color: #333;
  border-radius: 0;
  padding: 0.75rem 1.5rem;
}

.nav-tabs .nav-link.active {
  font-weight: 600;
  border-bottom: 2px solid #0d6efd;
}

.card {
  border-radius: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.product-card {
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-title {
  font-size: 1rem;
  font-weight: 500;
}
</style>