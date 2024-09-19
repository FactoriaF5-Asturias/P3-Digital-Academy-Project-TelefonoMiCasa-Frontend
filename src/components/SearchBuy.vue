11:46
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchStore } from '../stores/searchStore.js';
const query = ref('');
const isVentaSelected = ref(false);
const searchStore = useSearchStore();
const router = useRouter();
const selectVenta = () => {
    isVentaSelected.value = true;
};

const searchProperties = async () => {
    if (isVentaSelected.value) {
        await searchStore.searchProperties('venta'); 
        router.push('/public'); 
    } else {
        alert('Por favor, seleccione "Venta" antes de buscar.');
    }
};
</script>
<template>
    <div class="container">
        <div class="search-bar d-flex justify-content-between align-items-center p-3">
            <button class="btn btn-primary" @click="selectVenta" :class="{ 'selected': isVentaSelected }">Comprar</button>
            <input v-model="query" class="form-control mx-3" placeholder="Buscar propiedades..." />
            <button class="btn btn-secondary" @click="searchProperties">Buscar</button>
        </div>
    </div>
</template>
<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #650000;
}

.search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140vh;
    height: 15vh;
    max-width: 1400px;
    padding: 20px;
    background-color: rgba(217, 217, 217, 0.69);
}

input {
    flex-grow: 1;
    height: 120px;
    font-size: 24px;
    color: #D9D9D9;
    border: 1px solid #650000;
    box-shadow: 0 2px 4px rgba(1, 1, 1, 0.1);
    margin-right: 10px;
}

.btn-primary,
.btn-secondary {
    background-color: #D9D9D9;
    color: black;
    padding: 42px 30px;
    font-size: 25px;
    box-shadow: 0 2px 4px rgba(1, 1, 1, 0.1);
}



.btn-primary.selected {
    background-color: #650000;
    border-color: #fff;
    color: white;
}

.form-control {
    flex-grow: 1;
    border: 1px solid #D9D9D9;
    padding: 10px;
    font-size: 28px;
}
</style>










