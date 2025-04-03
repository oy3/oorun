<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import { useProductStore } from "../stores/products";
import { useRouter } from "vue-router";
import ForgotPasswordModal from "../components/ForgotPasswordModal.vue";

const userStore = useUserStore();
const productStore = useProductStore();
const router = useRouter();

// Computed properties for user data
const user = computed(() => userStore.getUser);
const orders = computed(() => userStore.getUserOrders);
const wishlist = computed(() => userStore.getUserWishlist);
const isAuthenticated = computed(() => userStore.isAuthenticated);

// Form data for profile updates
const profileForm = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
});

// Form data for login
const loginForm = ref({
  email: "",
  password: "",
});

// Toggle password visibility
const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Form data for signup
const signupForm = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// Toggle between login and signup forms
const showSignupForm = ref(false);
const toggleForm = () => {
  showSignupForm.value = !showSignupForm.value;
};

// Signup function
const signup = () => {
  // Validate password match
  if (signupForm.value.password !== signupForm.value.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Simulate signup with mock data
  const userData = {
    name: signupForm.value.name,
    email: signupForm.value.email,
    phone: "",
    address: "",
  };
  userStore.login(userData);
};

// Forgot password modal state
const showForgotPasswordModal = ref(false);

// Forgot password function
const forgotPassword = () => {
  showForgotPasswordModal.value = true;
};

// Handle modal close
const handleModalClose = () => {
  showForgotPasswordModal.value = false;
};

// Login function
const login = () => {
  // Simulate login with mock data
  const userData = {
    name: "Demo User",
    email: loginForm.value.email,
    phone: "",
    address: "",
  };
  userStore.login(userData);
};

// Initialize form with user data if available
onMounted(() => {
  if (user.value) {
    profileForm.value = {
      name: user.value.name || "",
      email: user.value.email || "",
      phone: user.value.phone || "",
      address: user.value.address || "",
    };
  }
});

// Update profile information
const updateProfile = () => {
  userStore.updateProfile(profileForm.value);
  alert("Profile updated successfully!");
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

      <!-- Login/Signup forms for unauthenticated users -->
      <div v-if="!isAuthenticated" class="row justify-content-center mb-5">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <!-- Login Form -->
              <div v-if="!showSignupForm">
                <h3 class="card-title mb-4">Login to Your Account</h3>
                <form @submit.prevent="login">
                  <div class="mb-3">
                    <label for="login-email" class="form-label"
                      >Email Address</label
                    >
                    <input
                      type="email"
                      class="form-control rounded-0"
                      id="login-email"
                      v-model="loginForm.email"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="login-password" class="form-label"
                      >Password</label
                    >
                    <div class="input-group">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control rounded-0 border-end-0"
                        id="login-password"
                        v-model="loginForm.password"
                        required
                      />
                      <button
                        class="btn border border-start-0 rounded-0"
                        type="button"
                        @click="togglePasswordVisibility"
                      >
                        <i
                          :class="
                            showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
                          "
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end mb-3">
                    <a
                      href="#"
                      @click.prevent="forgotPassword"
                      class="text-decoration-none"
                      >Forgot Password?</a
                    >
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary rounded-0 w-100 mb-3"
                  >
                    Login
                  </button>
                  <div class="text-center">
                    <p>
                      Don't have an account?
                      <a
                        href="#"
                        @click.prevent="toggleForm"
                        class="text-decoration-none"
                        >Sign Up</a
                      >
                    </p>
                  </div>
                </form>
              </div>

              <!-- Signup Form -->
              <div v-else>
                <h3 class="card-title mb-4">Create an Account</h3>
                <form @submit.prevent="signup">
                  <div class="mb-3">
                    <label for="signup-name" class="form-label"
                      >Full Name</label
                    >
                    <input
                      type="text"
                      class="form-control rounded-0"
                      id="signup-name"
                      v-model="signupForm.name"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="signup-email" class="form-label"
                      >Email Address</label
                    >
                    <input
                      type="email"
                      class="form-control rounded-0"
                      id="signup-email"
                      v-model="signupForm.email"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="signup-password" class="form-label"
                      >Password</label
                    >
                    <div class="input-group">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control rounded-0"
                        id="signup-password"
                        v-model="signupForm.password"
                        required
                      />
                      <button
                        class="btn border border-start-0 rounded-0"
                        type="button"
                        @click="togglePasswordVisibility"
                      >
                        <i
                          :class="
                            showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
                          "
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="signup-confirm-password" class="form-label"
                      >Confirm Password</label
                    >
                    <div class="input-group">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control rounded-0"
                        id="signup-confirm-password"
                        v-model="signupForm.confirmPassword"
                        required
                      />
                      <button
                        class="btn border border-start-0 rounded-0"
                        type="button"
                        @click="togglePasswordVisibility"
                      >
                        <i
                          :class="
                            showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
                          "
                        ></i>
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary rounded-0 w-100 mb-3"
                  >
                    Sign Up
                  </button>
                  <div class="text-center">
                    <p>
                      Already have an account?
                      <a
                        href="#"
                        @click.prevent="toggleForm"
                        class="text-decoration-none"
                        >Login</a
                      >
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile tabs for authenticated users -->
      <div v-if="isAuthenticated">
        <!-- Profile tabs -->
        <ul class="nav nav-tabs mb-4" id="profileTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="account-tab"
              data-bs-toggle="tab"
              data-bs-target="#account"
              type="button"
              role="tab"
              aria-controls="account"
              aria-selected="true"
            >
              Account Information
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="orders-tab"
              data-bs-toggle="tab"
              data-bs-target="#orders"
              type="button"
              role="tab"
              aria-controls="orders"
              aria-selected="false"
            >
              Order History
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="wishlist-tab"
              data-bs-toggle="tab"
              data-bs-target="#wishlist"
              type="button"
              role="tab"
              aria-controls="wishlist"
              aria-selected="false"
            >
              Wishlist
            </button>
          </li>
        </ul>

        <!-- Tab content -->
        <div class="tab-content" id="profileTabsContent">
          <!-- Account Information Tab -->
          <div
            class="tab-pane fade show active"
            id="account"
            role="tabpanel"
            aria-labelledby="account-tab"
          >
            <div class="row">
              <div class="col-md-8">
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title mb-4">Personal Information</h3>
                    <form @submit.prevent="updateProfile">
                      <div class="mb-3">
                        <label for="name" class="form-label">Full Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          v-model="profileForm.name"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="email" class="form-label"
                          >Email Address</label
                        >
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          v-model="profileForm.email"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="phone" class="form-label"
                          >Phone Number</label
                        >
                        <input
                          type="tel"
                          class="form-control"
                          id="phone"
                          v-model="profileForm.phone"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="address" class="form-label"
                          >Shipping Address</label
                        >
                        <textarea
                          class="form-control"
                          id="address"
                          rows="3"
                          v-model="profileForm.address"
                        ></textarea>
                      </div>
                      <button type="submit" class="btn btn-primary rounded-0">
                        Update Profile
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title mb-4">Account Settings</h3>
                    <div class="d-grid gap-2">
                      <button
                        class="btn btn-outline-primary rounded-0"
                        @click="
                          userStore.logout();
                          router.push('/');
                        "
                      >
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
          <div
            class="tab-pane fade"
            id="orders"
            role="tabpanel"
            aria-labelledby="orders-tab"
          >
            <div class="card">
              <div class="card-body">
                <h3 class="card-title mb-4">Order History</h3>
                <div v-if="orders.length === 0" class="text-center py-5">
                  <p class="lead">You haven't placed any orders yet.</p>
                  <router-link to="/shop" class="btn btn-primary rounded-0"
                    >Start Shopping</router-link
                  >
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
                            <span
                              class="badge bg-success"
                              v-if="order.status === 'delivered'"
                              >Delivered</span
                            >
                            <span
                              class="badge bg-warning text-dark"
                              v-else-if="order.status === 'processing'"
                              >Processing</span
                            >
                            <span
                              class="badge bg-info text-dark"
                              v-else-if="order.status === 'shipped'"
                              >Shipped</span
                            >
                            <span class="badge bg-secondary" v-else>{{
                              order.status
                            }}</span>
                          </td>
                          <td>
                            <button
                              class="btn btn-sm btn-outline-primary rounded-0"
                            >
                              View Details
                            </button>
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
          <div
            class="tab-pane fade"
            id="wishlist"
            role="tabpanel"
            aria-labelledby="wishlist-tab"
          >
            <div class="card">
              <div class="card-body">
                <h3 class="card-title mb-4">My Wishlist</h3>
                <div v-if="wishlist.length === 0" class="text-center py-5">
                  <p class="lead">Your wishlist is empty.</p>
                  <router-link to="/shop" class="btn btn-primary rounded-0"
                    >Discover Products</router-link
                  >
                </div>
                <div v-else class="row g-4">
                  <div
                    v-for="productId in wishlist"
                    :key="productId"
                    class="col-md-3"
                  >
                    <div class="card product-card h-100">
                      <div class="position-absolute top-0 end-0 p-2">
                        <button
                          class="btn btn-sm btn-outline-danger rounded-circle"
                          @click="userStore.removeFromWishlist(productId)"
                        >
                          <i class="bi bi-x"></i>
                        </button>
                      </div>
                      <!-- Get product details using productStore.getProductById -->
                      <template v-if="productStore.getProductById(productId)">
                        <img
                          :src="
                            productStore.getProductById(productId).images[0]
                          "
                          class="card-img-top"
                          :alt="productStore.getProductById(productId).name"
                          onerror="this.src='/images/placeholder.jpeg'"
                        />
                        <div class="card-body">
                          <h5 class="card-title product-title">
                            {{ productStore.getProductById(productId).name }}
                          </h5>
                          <p class="product-price mb-2">
                            ₦{{
                              productStore
                                .getProductById(productId)
                                .price.toLocaleString()
                            }}
                          </p>
                          <router-link
                            :to="`/shop/${
                              productStore.getProductById(productId).category
                            }/${productId}`"
                            class="btn btn-primary w-100 rounded-0"
                          >
                            View Details
                          </router-link>
                        </div>
                      </template>
                      <template v-else>
                        <img
                          src="/images/placeholder.jpeg"
                          class="card-img-top"
                          alt="Product Image"
                        />
                        <div class="card-body">
                          <h5 class="card-title product-title">
                            Product not found
                          </h5>
                          <button
                            @click="userStore.removeFromWishlist(productId)"
                            class="btn btn-outline-danger w-100 rounded-0"
                          >
                            Remove
                          </button>
                        </div>
                      </template>
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
  <!-- Forgot Password Modal -->
  <ForgotPasswordModal
    :show="showForgotPasswordModal"
    :email="loginForm.email"
    @close="handleModalClose"
  />
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
