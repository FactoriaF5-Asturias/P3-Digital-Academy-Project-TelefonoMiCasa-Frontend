import { ref } from "vue";
import { defineStore } from "pinia";
import axios from 'axios';

export const useSalesmenStore = defineStore('salesmen', () => {
    
    const salesmen = ref([]);  
    const isLoading = ref(false); 
    const error = ref(null);  

    async function loadSalesmen() {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await axios.get('http://localhost:8080/api/v1/salesmen', {
                withCredentials: true
            });
            salesmen.value = response.data;
        } catch (err) {
            error.value = "Failed to load salesmen.";
        } finally {
            isLoading.value = false;
        }
    }

    async function submitSalesmanData(salesmanData) {
        isLoading.value = true;
        error.value = null;

        try {
            
            await axios.post('http://localhost:8080/api/v1/salesmen', salesmanData, {
                withCredentials: true
            });

            
            await loadSalesmen();

        } catch (err) {
            error.value = "Failed to submit salesman data.";
        } finally {
            isLoading.value = false;
        }
    }
    
    return {
        salesmen,
        isLoading,
        error,
        loadSalesmen,
        submitSalesmanData  
    };
});