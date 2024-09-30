<script setup>
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
              <a class="nav-link text-white" href="#/inmuebles">Inmuebles</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#/mas-visitados">Más Visitados</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#/visitas-cliente">Visitas Cliente</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>

.bg-granate {
  background-color: #5e0000; 
}


.salesmen-dashboard {
  background-color: #ffffff; 
  min-height: 100vh;
}
</style>
