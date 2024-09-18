<script setup>

</script>

<template>
  <header class="bg-granate py-4 w-100">
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <router-link to="/" class="text-white text-decoration-none d-flex align-items-center">
          <img src="/src/assets/images/logo.png" alt="Teléfono Mi Casa" class="img-fluid logo me-3" />
          <h1 class="mb-0">Teléfono Mi Casa</h1>
        </router-link>
      </div>

      <router-link to="/login" class="btn btn-danger btn-lg d-flex align-items-center">
        <i class="fas fa-user me-2"></i> Acceder
      </router-link>
    </div>
  </header>
</template>

<style scoped>
.logo {
  width: 80px;
  height: auto;
  border-radius: 50%;
}

h1 {
  font-size: 2rem;
}

.btn-danger {
  background-color: #ff4500;
  border: none;
  font-size: 1.2rem; 
  padding: 10px 20px; 
}

.btn-danger:hover {
  background-color: #ff6347;
}

.bg-granate {
  background-color: #650000;
  width: 100vw;
  position: relative;
  left: 0;
  right: 0;
}

header {
  width: 100%;
  margin: 0;
  padding: 0;
}

.container-fluid {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
