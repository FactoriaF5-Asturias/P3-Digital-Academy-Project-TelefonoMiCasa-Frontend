<script setup>
import { onMounted, ref } from 'vue';
import { useSearchStore } from '../stores/searchStore';
import { useRoute } from 'vue-router';
import Card from './Card.vue';

const route = useRoute();
const searchStore = useSearchStore();
const properties = ref([]);

onMounted(() => {
  properties.value = searchStore.properties;
});

</script>

<template>
  <div class="properties-list">
    <div v-if="searchStore.loading" class="loading">Cargando propiedades...</div>
    <div v-if="!searchStore.loading && properties.length === 0" class="no-results">No hay propiedades disponibles para
      la búsqueda seleccionada.</div>
    <div v-for="(property, index) in properties" :key="index" class="card">

      <Card :property="property"/>

    </div>
  </div>
</template>

<style scoped>

.properties-list {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  display: flex;
  background-color: #fffbbb;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 580px;
  height: 300px;
  flex-direction: row;
  overflow: hidden;
  max-width: 95%;
  flex-wrap: nowrap;
}

/* media query 2 */
@media (max-width: 768px) {
  .card {
    flex-direction: column;
    width: 100%;
    height: auto;
  }
}

@media (max-width: 480px) {
  .card {
    flex-direction: column;
    width: 100%;
    height: auto;
  }

}

</style>
