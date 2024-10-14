<!-- 
<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import LoginPopup from '../Login.vue'; 

const loginPopupRef = ref(null);
const router = useRouter();
const isAuthenticated = ref(false); 


watch(router.currentRoute, (newRoute) => {
  const isUserView = newRoute.path.includes('/userview');
  const isAdminView = newRoute.path.includes('/adminview');
  
 
  isAuthenticated.value = isUserView || isAdminView;
});


const openLoginPopup = () => {
  if (loginPopupRef.value) {
    loginPopupRef.value.openPopup();
  }
};


const logout = () => {
  isAuthenticated.value = false; 
  router.push('/'); 
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
</style> -->


<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import LoginPopup from '../Login.vue'; 

const loginPopupRef = ref(null);
const router = useRouter();
const isAuthenticated = ref(false);
const currentView = ref('user');  // Podría ser 'user', 'admin', 'salesmen' o 'public'

// Verificar la ruta actual para determinar si el usuario está logueado y qué tipo de vista debe tener
watch(router.currentRoute, (newRoute) => {
  const isUserView = newRoute.path.includes('/userview');
  const isAdminView = newRoute.path.includes('/adminview');
  const isSalesmenView = newRoute.path.includes('/salesmendashboardview');

  // Actualizar el estado de autenticación y la vista actual
  if (isUserView) {
    currentView.value = 'user';
  } else if (isAdminView) {
    currentView.value = 'admin';
  } else if (isSalesmenView) {
    currentView.value = 'salesmen';
  } else {
    currentView.value = 'public';  // Vista pública si no está logueado
  }

  isAuthenticated.value = isUserView || isAdminView || isSalesmenView;
});

// Función para abrir el popup de login
const openLoginPopup = () => {
  if (loginPopupRef.value) {
    loginPopupRef.value.openPopup();
  }
};

// Función de logout
const logout = () => {
  isAuthenticated.value = false;
  currentView.value = 'public';  // Volver a vista pública al hacer logout
  router.push('/');  // Redirigir a la vista pública
};

// Redirigir a la vista pública sin cerrar sesión
const goToPublicView = () => {
  router.push('/');  // Redirigir a la vista pública sin modificar isAuthenticated
};
</script>

<template>
  <header class="container-fluid bg-granate py-4 d-flex justify-content-between">
    <div class="d-flex align-items-center">
      <!-- Redirigir a la vista pública sin perder autenticación -->
      <a @click.prevent="goToPublicView" class="text-white text-decoration-none d-flex align-items-center" href="#">
        <img src="/src/assets/images/logo.png" alt="Teléfono Mi Casa" class="img-fluid logo me-2" />
        <h1 class="mb-0 ms-2">Teléfono Mi Casa</h1>
      </a>
    </div>

    <!-- Mostrar el botón de login o logout dependiendo del estado de autenticación -->
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


