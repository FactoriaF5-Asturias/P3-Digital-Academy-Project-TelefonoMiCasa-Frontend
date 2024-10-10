<!-- VisitButton.vue -->
<template>
  <div>
    <button @click="abrirPopup" class="schedule-visit">Agendar Visita</button>
    <popupvist v-if="mostrarModal" @close="cerrarPopup" @submit="procesarVisita" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import popupvist from '@/components/PopupVist.vue'; // Verifica que esta ruta sea correcta

const mostrarModal = ref(false);

function abrirPopup() {
  mostrarModal.value = true; // Abre el popup
}

function cerrarPopup() {
  mostrarModal.value = false; // Cierra el popup
}

function procesarVisita(datos) {
  console.log('Datos de la visita:', datos);
  cerrarPopup();
}
</script>

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
  background-color: #b58c42;
}
</style>
