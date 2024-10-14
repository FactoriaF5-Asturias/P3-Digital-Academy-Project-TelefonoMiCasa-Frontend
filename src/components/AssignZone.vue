<script>
import axios from 'axios';

export default {
    props: {
        salesman: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            zones: [],        
            selectedZone: ''  
        };
    },
    created() {
        this.fetchZones();
    },
    methods: {
        async fetchZones() {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/zone', { withCredentials: true });
                this.zones = response.data;

                if (this.salesman.zone) {
                    this.selectedZone = this.salesman.zone.id;
                }
            } catch (error) {
                console.error("Error al obtener las zonas:", error);
            }
        },
        async assignZone() {
            if (!this.selectedZone) {
                alert('Por favor, selecciona una zona.');
                return;
            }

            try {
                const response = await axios.put(`http://localhost:8080/api/v1/zone/${this.selectedZone}`, {
                    userId: this.salesman.id 
                }, { withCredentials: true });

                alert('Zona asignada correctamente.');

                this.salesman.zone = this.zones.find(zone => zone.id === this.selectedZone);
            } catch (error) {
                console.error("Error al asignar la zona:", error);
                alert('Error al asignar la zona.');
            }
        }
    }
};
</script>

<template>
    <div class="assign-zone">
        <select v-model="selectedZone" class="zone-select" @change="assignZone">
            <option disabled value="">Asignar zona</option>
            <option 
                v-for="zone in zones" 
                :key="zone.id" 
                :value="zone.id"
            >
                {{ zone.name }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.assign-zone {
    display: flex;           
    justify-content: center;   
    margin: 10px 0;           
}

.zone-select {
    color: black;
    padding: 10px;
    border: 1px solid #650000;
    border-radius: 8px;
    background-color: #f9f9f9;
    font-size: 0.8rem;
    width: 100%;               
    max-width: 200px;          
    cursor: pointer;
    transition: border-color 0.3s; 
}

.zone-select:focus {
    outline: none;
    border-color: #7b0000;     
}

@media (max-width: 600px) {
    .zone-select {
        max-width: 100%;        
    }
}
</style>
