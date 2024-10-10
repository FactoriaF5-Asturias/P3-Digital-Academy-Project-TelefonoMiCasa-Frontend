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

<script>
import axios from 'axios';

export default {
    props: {
        salesman: {
            type: Object,
            required: true
        },
        assignedZones: {
            type: Array,
            default: () => [] // Valor por defecto para evitar el error
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

                // Establecer el valor de selectedZone si ya hay una zona asignada
                const assignedZone = this.assignedZones[0]; // Asumiendo que solo se puede asignar una zona por vendedor
                if (assignedZone) {
                    this.selectedZone = assignedZone; // O puedes buscar el id de la zona desde salesman si existe
                }
            } catch (error) {
                console.error("Error fetching zones:", error);
            }
        },
        async assignZone() {
            if (!this.selectedZone) {
                alert('Por favor, selecciona una zona.');
                return;
            }

            try {
                const response = await axios.put(`http://localhost:8080/api/v1/zone/${this.selectedZone}`, {
                    userId: this.salesman.id // Suponiendo que salesman tiene una propiedad id
                }, { withCredentials: true });

                alert(response.data); // Muestra el mensaje de éxito o error

                // Emitir el evento al padre
                this.$emit('zone-assigned', this.selectedZone);
            } catch (error) {
                console.error("Error assigning zone:", error);
                alert('Error al asignar la zona.'); // Manejo de errores
            }
        }
    }
};
</script>

<style scoped>
.zone-select {
    color: rgb(0, 0, 0);
    padding: 10px;
    border: 1px solid #650000;
    border-radius: 8px;
    background-color: #f9f9f9;
    font-size: 1rem;
    width: 100%;
    max-width: 150px;
    cursor: pointer;
}

.zone-select:focus {
    outline: none;
    border-color: #7b0000;
}
</style>
