<script setup>
import { ref } from 'vue';
import AddInmuebleButton from './AddInmuebleButton.vue';

const currentView = ref('');

const changeView = (view) => {
  currentView.value = view;
};
</script>

<template>
  <div class="salesmen-dashboard">
    <nav class="navbar navbar-expand-lg bg-granate">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link text-white" href="#" @click.prevent="changeView('inmuebles')">Inmuebles</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#" @click.prevent="changeView('mas-visitados')">Más Visitados</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#" @click.prevent="changeView('visitas-cliente')">Visitas Cliente</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <h2 class="main-title">Panel de Control Comercial</h2>

      <!-- Contenido dinámico según la vista seleccionada -->
      <div v-if="currentView === 'inmuebles'">
        <!-- Contenedor para el título y el botón -->
        <div class="title-button-container">
          <h3 class="sub-title">Alta y Baja de Inmuebles</h3>
          <AddInmuebleButton />
        </div>
      </div>

      <div v-if="currentView === 'mas-visitados'">
        <h3 class="sub-title">Listado de Inmuebles Más Visitados</h3>
      </div>

      <div v-if="currentView === 'visitas-cliente'">
        <h3 class="sub-title">Historial de Visitas Cliente</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>

.bg-granate {
  background-color: #800020;
}


.salesmen-dashboard {
  background-color: #ffffff;
  min-height: 100vh;
}


.main-title {
  font-size: 1.5rem;
  color: #800606;
}


.sub-title {
  font-size: 1.2rem;
  color: #555;
}

.title-button-container {
  display: flex;
  align-items: center; 
  gap: 80px; 
}

.container {
  margin-top: 20px;
}
</style>
