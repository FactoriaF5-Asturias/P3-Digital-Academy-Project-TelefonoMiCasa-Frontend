<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchStore } from '../stores/searchStore.js';

const query = ref('');
const address = ref(''); 
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
    await searchStore.searchProperties(propertyType.value, action, address.value); 
    router.push({ path: '/public', query: { action, type: propertyType.value, address: address.value } }); 
};


</script>

<template>
    <div class="container-fluid">
        <div class="search-bar d-flex justify-content-between align-items-center p-4 m-5">
            <div class="top-section d-flex justify-content-start gap-2">
                <button class="btn btn-secondary" 
                        :class="{ selected: isVentaSelected }" 
                        @click="selectVenta">Comprar</button>
                <button class="btn btn-secondary select" 
                        :class="{ selected: isAlquilerSelected }" 
                        @click="selectAlquiler">Alquilar</button>
                <select v-model="propertyType" class="form-select select-custom">
                    <option value="house">Casa</option>
                    <option value="flat">Apartamento</option>
                    <option value="garage">Garaje</option>
                    <option value="storageroom">Trastero</option>
                </select>
            </div>

            <input v-model="address" class="form-control mx-1" placeholder="Dirección..." /> 

            <button class="btn btn-secondary search-btn" @click="searchProperties">Buscar</button>
        </div>
    </div>
</template>

<style>
.search-bar {
    background-color: rgba(217, 217, 217, 0.69);
    gap: 20px;
}

input {
    height: 60px;
    font-size: 18px;
    color: #D9D9D9;
    border: 1px solid #650000;
    box-shadow: 0 2px 4px rgba(1, 1, 1, 0.1);
    flex: 1;
    min-width: 150px;
}

.select-custom {
    padding: 0px 25px;
    font-size: 12px;
    background-color: #D9D9D9;
    color: black;
    border: 1px solid #D9D9D9;
    box-shadow: 0 2px 4px rgba(1, 1, 1, 0.1);
    height: 60px;
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
    padding: 10px 25px;
    font-size: 18px;
    box-shadow: 0 2px 4px rgba(1, 1, 1, 0.1);
}

.btn.selected {
    background-color: #650000;
    border-color: #fff;
    color: white;
}

.form-control {
    border: 1px solid #D9D9D9;
    font-size: 18px;
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

@media (max-width: 927px) and (min-width: 783px) {
    .search-bar {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .top-section {
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    input {
        width: 100%;
        margin-bottom: 10px;
    }

    

    .select{
        font-size: 15px;
    }

    .search-btn {
        width: 100%;
        align-self: center;
    }
}

@media (max-width: 780px) {
    .search-bar {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .top-section {
        flex-direction: column;
        align-items: center;
        width: 100%;
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
    
    ::placeholder {
        padding: 5px 10px;
        font-size: 0.8rem;
    }

    input {
        height: 40px;
        font-size: 1rem;
    }
}
</style>
