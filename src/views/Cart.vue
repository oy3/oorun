<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const router = useRouter();

// Get cart items from store
const cartItems = computed(() => cartStore.items);

// Calculate total price
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
});

// Calculate total items
const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});

// Update quantity of an item
const updateQuantity = (item, newQuantity) => {
  if (newQuantity < 1) return;
  cartStore.updateQuantity(item.product.id, item.color, newQuantity);
};

// Remove item from cart
const removeItem = (item) => {
  cartStore.removeFromCart(item.product.id, item.color);
};

// Proceed to checkout
const proceedToCheckout = () => {
  router.push("/checkout");
};
</script>

<template>
  <div class="cart-page">
    <div class="container py-5">
      <h1 class="display-5 fw-bold text-center mb-5">Your Shopping Cart</h1>

      <div v-if="cartItems.length > 0" class="row">
        <div class="col-lg-8">
          <!-- Cart Items -->

          <div class="card mb-4">
            <div class="card-body">
              <div
                v-for="item in cartItems"
                :key="item.product.id"
                class="cart-item py-4 border-bottom"
              >
                <div class="row align-items-center mx-0">
                  <div class="col-md-2">
                    <img
                      :src="item.product.images[0]"
                      :alt="item.product.name"
                      class="img-fluid rounded"
                      onerror="this.src='/images/placeholder.jpg'"
                      style="
                        height: 100px !important;
                        width: 100%;
                        object-fit: cover;
                      "
                    />
                  </div>
                  <div class="col-md-4">
                    <h5 class="mb-1">{{ item.product.name }}</h5>
                    <p class="text-muted mb-1">
                      {{
                        item.product.category === "men" ? "Men's" : "Women's"
                      }}
                    </p>
                    <p class="mb-0">
                      <span class="me-2">Color:</span>
                      <span
                        class="color-swatch"
                        :style="{ backgroundColor: item.color }"
                        :title="
                          item.product.availableColors.find(
                            (c) => c.hex === item.color
                          )?.name || ''
                        "
                      ></span>
                    </p>
                  </div>
                  <div class="col-md-3">
                    <div class="d-flex align-items-center mt-2">
                      <div class="d-flex">
                        <div class="p-2 pe-0">
                          <button
                            @click="updateQuantity(item, item.quantity - 1)"
                            class="btn btn-sm btn-light border bg-white rounded-0 border-end-0 p-2"
                            :disabled="item.quantity <= 1"
                          >
                            -
                          </button>
                        </div>
                        <div class="px-4 py-2 flex-grow-1 my-auto border-top border-bottom">
                          {{ item.quantity }}
                        </div>
                        <div class="p-2 ps-0">
                          <button
                            @click="updateQuantity(item, item.quantity + 1)"
                            class="btn btn-sm btn-light border bg-white rounded-0 border-start-0 p-2"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        @click="removeItem(item)"
                        class="btn btn-sm text-danger"
                      >
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-2 text-end">
                    <div class="price mb-2">
                      ₦{{
                        (item.product.price * item.quantity).toLocaleString()
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <!-- Order Summary -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-4">Order Summary</h5>
              <div class="d-flex justify-content-between mb-2">
                <span>Items ({{ totalItems }}):</span>
                <span>₦{{ totalPrice.toLocaleString() }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div class="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong>₦{{ totalPrice.toLocaleString() }}</strong>
              </div>
              <button @click="proceedToCheckout" class="btn btn-primary w-100">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="text-center py-5">
        <div class="mb-4">
          <i class="bi bi-cart" style="font-size: 4rem"></i>
        </div>
        <h2 class="mb-3">Your cart is empty</h2>
        <p class="mb-4">
          Looks like you haven't added any items to your cart yet.
        </p>
        <router-link to="/shop" class="btn btn-primary"
          >Continue Shopping</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background-color: #f8f9fa;
}

.color-swatch {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ddd;
  vertical-align: middle;
}

.quantity-control {
  width: fit-content;
}

.price {
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
