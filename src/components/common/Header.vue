<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LoginPopup from '../Login.vue';

const loginPopupRef = ref(null);
const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.user.isAuthenticated);

const openLoginPopup = () => {
  if (loginPopupRef.value) {
    loginPopupRef.value.openPopup();
  }
};

const logout = async () => {
  try {
    await authStore.logout();
    router.push('/');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
</script>

<template>
  <header class="container-fluid bg-granate py-4 d-flex justify-content-between">
    <div class="d-flex align-items-center">
      <router-link to="/" class="text-white text-decoration-none d-flex align-items-center">
        <img src="/src/assets/images/logo.png" alt="Teléfono Mi Casa" class="img-fluid logo me-2" />
        <h1 class="mb-0 ms-2">Teléfono Mi Casa</h1>
      </router-link>
    </div>

    <a v-if="!isAuthenticated" @click.prevent="openLoginPopup" class="btn btn-danger d-flex align-items-center btn-responsive" href="#">
      <i class="fas fa-user me-2"></i>
      <span>Acceder</span>
    </a>

    <a v-else @click.prevent="logout" class="btn btn-danger d-flex align-items-center btn-responsive" href="#">
      <i class="fas fa-sign-out-alt me-2"></i>
      <span>Cerrar sesión</span>
    </a>

    <LoginPopup ref="loginPopupRef" />
  </header>
</template>


<style scoped>

.logo {
  width: 70px;
  height: auto;
  border-radius: 50%;
}

h1 {
  font-size: 1rem;
}

@media (min-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }
}

@media (min-width: 992px) {
  h1 {
    font-size: 2rem;
  }
}

.btn-responsive {
  font-size: 0.9rem;
  padding: 6px 12px;
}

@media (min-width: 768px) {
  .btn-responsive {
    font-size: 1.1rem;
    padding: 10px 20px;
  }
}

.btn-danger {
  background-color: #ff4500;
  border: none;
}

.btn-danger:hover {
  background-color: #ff6347;
}

.bg-granate {
  background-color: #650000;
}
</style>
