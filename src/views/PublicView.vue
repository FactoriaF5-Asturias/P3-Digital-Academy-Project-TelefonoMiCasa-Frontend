<script setup>
import { onMounted } from 'vue';
import { useSearchStore } from '../stores/searchStore.js';
const searchStore = useSearchStore();

onMounted(() => {
    console.log('Properties at onMounted:', searchStore.properties);
    if (searchStore.properties.length === 0) {
    
    }
});
</script>
<template>
    <div class="properties-list">
        <div v-if="searchStore.loading">Cargando propiedades...</div>
        <div v-if="searchStore.error">{{ searchStore.error }}</div>
        <div v-if="!searchStore.loading && !searchStore.error && searchStore.properties.length > 0">
            <div v-for="property in searchStore.properties" :key="property.id" class="property-card">
                <h3>{{ property.description }}</h3>
                <p>Precio: {{ property.price }}</p>
                <p>Dirección: {{ property.address }}</p>
                <p>Área: {{ property.area }} m²</p>
            </div>
        </div>
    </div>
</template>
<style>
.properties-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.property-card {
    border: 1px solid #ddd;
    padding: 16px;
    width: 200px;
}
</style>
