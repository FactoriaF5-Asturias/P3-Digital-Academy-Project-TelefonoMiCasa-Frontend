<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Salesmenformproperties from './Salesmenformproperties.vue';
import AddIPropertiesButton from './AddIPropertiesButton.vue';
import PropertyList from './PropertyList.vue'; 
import CustomerVisitsTable from './CustomerVisitsTable.vue'; 

const currentView = ref('');
const isPopupVisible = ref(false);
const properties = ref([]);
const appointments = ref([]);
const userId = ref(''); 

const changeView = async (view) => {
  currentView.value = view;

  if (view === 'visitas-cliente') {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/appointments', {
        withCredentials: true 
      });
      appointments.value = response.data;
    } catch (error) {
      console.error('Error al obtener las citas de cliente:', error);
    }
  }
};

const showPopup = () => {
  isPopupVisible.value = true;
};

const closePopup = () => {
  isPopupVisible.value = false;
};

const addPropertyToList = (newProperty) => {
  properties.value.push(newProperty); 
};

onMounted(async () => {
  try {
    const userResponse = await axios.get('http://localhost:8080/api/v1/login', {
      withCredentials: true
    });

    console.log('Respuesta de la API de inicio de sesión:', userResponse.data); 
    userId.value = userResponse.data.id; 

    if (userId.value) {
      const propertiesResponse = await axios.get(`http://localhost:8080/api/v1/user/${userId.value}`, { 
        withCredentials: true 
      });
      properties.value = propertiesResponse.data; 
    } else {
      console.error('El ID del usuario no está definido');
    }
  } catch (error) {
    console.error('Error al obtener las propiedades o el usuario:', error);
  }
});


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

      <div v-if="currentView === 'inmuebles'">
        <div class="title-button-container">
          <h3 class="sub-title">Alta y Baja de Inmuebles</h3>
          <AddIPropertiesButton @add="showPopup" @property-added="addPropertyToList" />
        </div>
       
        <PropertyList :userId="userId" :properties="properties" /> <!-- Pasar propiedades al componente hijo -->
      </div>

      <div v-if="currentView === 'mas-visitados'">
        <h3 class="sub-title">Listado de Inmuebles Más Visitados</h3>
      </div>

      <div v-if="currentView === 'visitas-cliente'">
        <CustomerVisitsTable :appointments="appointments" />
      </div>

      <Salesmenformproperties v-if="isPopupVisible" @close="closePopup" @property-added="addPropertyToList" />
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
