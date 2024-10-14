<!-- 
<script setup>
import { ref } from 'vue';
import popupvist from '@/components/PopupVist.vue'; 
const mostrarModal = ref(false);



function abrirPopup() {
  mostrarModal.value = true; 
}

function cerrarPopup() {
  mostrarModal.value = false; 
}

function procesarVisita(datos) {
  console.log('Datos de la visita:', datos);
  cerrarPopup();
}
</script>



<template>
  <div>
    <button @click="abrirPopup" class="schedule-visit">Agendar Visita</button>
    <popupvist v-if="mostrarModal" @close="cerrarPopup" @submit="procesarVisita" />
  </div>
</template>



<style scoped>
.schedule-visit {
  background-color: #D6B666;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  
}

.schedule-visit:hover {
  background-color: #822c2c;
}
</style> -->

<script setup>
import { ref } from 'vue';
import popupvist from '@/components/PopupVist.vue'; 
const mostrarModal = ref(false);
const propertyId = ref(null);

function openPopup(id) {
  propertyId.value = id;  
  mostrarModal.value = true; 
}
function closePopup() {
  mostrarModal.value = false; 
}

function procesarVisita(datos) {

  const datosConId = { ...datos, propertyId: propertyId.value };
  console.log('Datos de la visita:', datosConId);
  closePopup();
}
</script>

<template>
  <div>
   
    <button @click="openPopup(propertyid)" class="schedule-visit">Agendar Visita</button>
    <popupvist v-if="mostrarModal" @close="cerrarPopup" @submit="procesarVisita" />
  </div>
</template>

<style scoped>
.schedule-visit {
  background-color: #D6B666;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

.schedule-visit:hover {
  background-color: #822c2c;
}
</style>

