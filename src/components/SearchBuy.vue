<script setup>
import { ref } from 'vue';
import SearchService from '../core/SearchService.js';
import SearchServiceRepository from '../core/SearchRepository.js';

const query = ref('');
const filteredProperties = ref([]);

const repository = new SearchServiceRepository();
const searchService = new SearchService(repository);

const searchProperties = () => {
    filteredProperties.value = searchService.search(query.value);
};
</script>

<template>
    <div>
        <input v-model="query" @input="searchProperties" placeholder="Buscar propiedades..." />
        <ul>
            <li v-for="property in filteredProperties" :key="property.id">
                {{ property.name }} - {{ property.price }}
            </li>
        </ul>
    </div>
</template>

<style scoped>

</style>