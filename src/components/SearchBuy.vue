<script setup>
import { ref } from 'vue';
import SearchService from '../core/SearchService.js';
import SearchServiceRepository from '../core/SearchRepository.js';
const query = ref('');
const filteredProperties = ref([]);
const isCompraSelected = ref(false);
const repository = new SearchServiceRepository();
const searchService = new SearchService(repository);
const searchProperties = () => {
    filteredProperties.value = searchService.search(query.value);
};
const selectCompra = () => {
    isCompraSelected.value = true;
};
</script>
<template>
    <div class="container">
        <div class="search-bar d-flex justify-content-between align-items-center p-3 ">
            <button class="btn btn-primary" @click="selectCompra"
                :class="{ 'selected': isCompraSelected }">Compra</button>
            <input v-model="query" @input="searchProperties" class="form-control mx-3"
                placeholder="Buscar propiedades..." />
            <button class="btn btn-secondary">Buscar</button>
        </div>
    </div>
</template>
<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 500px;
}

.search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140vh;
    height: 10vh;
    background-color: transparent;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: absolute;
    opacity: 1;

}

input {
    width: 120vh;
    height: 90px;
    font-size: 18px;
    background-color: #D9D9D9;
    border: 1px solid #650000;
    box-shadow: 0 2px 4px rgba(1, 1, 1, 0.1);
}

.btn-primary {
    background-color: #D9D9D9;
    border-color: #D9D9D9;
    padding: 32px 20px;
    font-size: 18px;
    box-shadow: 0 2px 4px rgba(1, 1, 1, 0.1);
}

.btn-primary:hover {
    background-color: #FFFFFF;
    border-color: #650000;   

}

.btn-primary.selected {
    background-color: #650000;
    border-color: #fff;
    color: white;
}

.btn-secondary {
    background-color: #D9D9D9;
    border-color: #D9D9D9;
    padding: 32px 20px;
    font-size: 18px;
    box-shadow: 0 2px 4px rgba(1, 1, 1, 0.1);
}

.btn-secondary:hover {
    background-color: #FFFFFF;
    border-color: #650000;
    color: #650000;

}

.form-control {
    flex-grow: 1;
    border: 1px solid #D9D9D9;
    padding: 20px;
    padding-right: 550px;
}

.list-group-item {
    border: 1px solid #D9D9D9;

    margin-bottom: 5px;
}
</style>










