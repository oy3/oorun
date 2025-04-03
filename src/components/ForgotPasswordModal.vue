<script setup>
import { ref } from 'vue';

const props = defineProps({
  show: Boolean,
  email: String
});

const emit = defineEmits(['close', 'submit']);

const emailInput = ref(props.email || '');
const isSubmitting = ref(false);
const resetSent = ref(false);

const submitForm = async () => {
  if (!emailInput.value) {
    alert('Please enter your email address');
    return;
  }
  
  isSubmitting.value = true;
  
  // Simulate API call with timeout
  setTimeout(() => {
    resetSent.value = true;
    isSubmitting.value = false;
  }, 1500);
};

const closeModal = () => {
  resetSent.value = false;
  emit('close');
};
</script>

<template>
  <div v-if="show" class="modal-backdrop" @click="closeModal"></div>
  <div v-if="show" class="modal show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Reset Password</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="!resetSent">
            <p>Enter your email address and we'll send you a link to reset your password.</p>
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="reset-email" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  class="form-control rounded-0" 
                  id="reset-email" 
                  v-model="emailInput" 
                  required
                  placeholder="johndoe@mail.com"
                >
              </div>
              <div class="d-grid">
                <button 
                  type="submit" 
                  class="btn btn-primary rounded-0" 
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ isSubmitting ? 'Sending...' : 'Send Reset Link' }}
                </button>
              </div>
            </form>
          </div>
          <div v-else class="text-center py-4">
            <i class="bi bi-check-circle-fill text-success fs-1 mb-3"></i>
            <h4>Email Sent!</h4>
            <p>We've sent a password reset link to <strong>{{ emailInput }}</strong></p>
            <p class="text-muted">Please check your inbox and follow the instructions to reset your password.</p>
            <button class="btn btn-outline-primary rounded-0 mt-3" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal {
  z-index: 1050;
}

.modal-content {
  border-radius: 0;
}
</style>