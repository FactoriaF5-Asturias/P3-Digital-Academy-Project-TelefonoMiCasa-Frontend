

 <script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchStore } from '../stores/searchStore.js';
const query = ref('');
const isVentaSelected = ref(false); 
const isAlquilerSelected = ref(false);
const propertyType = ref('house'); 
const searchStore = useSearchStore();
const router = useRouter();
const selectVenta = () => {
    isVentaSelected.value = true;
    isAlquilerSelected.value = false;
};
const selectAlquiler = () => {
    isVentaSelected.value = false;
    isAlquilerSelected.value = true;
};
const searchProperties = async () => {
    const action = isVentaSelected.value ? 'venta' : 'alquiler';
    
    await searchStore.searchProperties(propertyType.value, action);
    
    router.push({ path: '/public', query: { action, type: propertyType.value } });
};
</script>
<template>
    <div class="container-fluid">
        <div class="search-bar d-flex justify-content-between align-items-center p-4 m-5">
           
            <button class="btn btn-secondary" 
                    :class="{ selected: isVentaSelected }" 
                    @click="selectVenta">Comprar</button>
            <button class="btn btn-secondary" 
                    :class="{ selected: isAlquilerSelected }" 
                    @click="selectAlquiler">Alquilar</button>

            
           <select v-model="propertyType" class="form-select mx-1" style="width: 180px; height: 60px;">
                <option value="house">Casa</option>
                <option value="flat">Apartamento</option>
            </select>

            <input v-model="query" class="form-control mx-1" placeholder="Buscar propiedades..." />
            <button class="btn btn-secondary" @click="searchProperties">Buscar</button>
        </div>
    </div>
</template>

<style>
.search-bar {
    background-color: rgba(217, 217, 217, 0.69);
    gap: 20px;
}

input {
    height: 90px;
    font-size: 24px;
    color: #D9D9D9;
    border: 1px solid #650000;
    box-shadow: 0 2px 4px rgba(1, 1, 1, 0.1);
}


.select-custom {
    padding: 32px 25px;
    font-size: 25px;
    background-color: #D9D9D9;
    color: black;
    border: 1px solid #D9D9D9;
    box-shadow: 0 2px 4px rgba(1, 1, 1, 0.1);
    height: 97px; 

    
    
}


.select-custom {
    padding: 32px 25px;
    font-size: 25px;
    background-color: #D9D9D9;
    color: black;
    border: 1px solid #D9D9D9;
    box-shadow: 0 2px 4px rgba(1, 1, 1, 0.1);
    height: 90px;
    width: 180px;
}

.select-custom:focus {
  
    border: 1px solid #650000;
}

.select-custom option:hover {
    background-color: #800000;
    color: white; 
}

.btn-secondary {
    background-color: #D9D9D9;
    color: black;
    padding: 32px 25px;
    font-size: 25px;
    box-shadow: 0 2px 4px rgba(1, 1, 1, 0.1);
}

.btn.selected {
    background-color: #650000;
    border-color: #fff;
    color: white;
}

.form-control {
    border: 1px solid #D9D9D9;
    font-size: 28px;
}

.text {
    font-size: calc(1.5rem + 2vw);
}

input {
    font-size: 1.5rem;
}

.btn-secondary {
    font-size: 1.25rem;
}

@media (max-width: 780px) {
    .search-bar {
        flex-direction: column;
        align-items: center;
    }

    .btn-secondary {
        width: 100%;
        margin-bottom: 10px;
    }

    input {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .search-bar {
        padding: 2px;
        margin: 10px;
    }

    .btn-secondary {
        padding: 10px 20px;
        font-size: 1rem;
    }

    input {
        height: 40px;
        font-size: 1rem;
    }
}
</style>




