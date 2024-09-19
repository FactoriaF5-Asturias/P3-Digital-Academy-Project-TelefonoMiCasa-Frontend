<script setup>

</script>

<template>
  <header class="bg-granate py-3 w-100">
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        
        <router-link to="/" class="text-white text-decoration-none d-flex align-items-center">
          <img src="/src/assets/images/logo.png" alt="Teléfono Mi Casa" class="img-fluid logo me-2" />
          
          <h1 class="mb-0 ms-2 company-name">Teléfono Mi Casa</h1>
        </router-link>
      </div>

      
      <router-link to="/login" class="btn btn-danger d-flex align-items-center btn-responsive">
        <i class="fas fa-user me-2"></i>
        <span>Acceder</span>
      </router-link>
    </div>
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
  white-space: nowrap; 
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
  width: 100vw;
}

header {
  width: 100%;
  margin: 0;
  padding: 0;
}

.container-fluid {
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (min-width: 768px) {
  .container-fluid {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
