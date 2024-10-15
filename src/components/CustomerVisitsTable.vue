<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Propiedad para recibir el ID del usuario
const props = defineProps({
  userId: {
    type: Number,
    required: true
  }
});

// Variable para almacenar las citas
const appointments = ref([]);

// Función para obtener citas del usuario
const fetchAppointments = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/appointments/user/${props.userId}`, {
      withCredentials: true // Incluir credenciales en la solicitud
    });
    appointments.value = response.data; // Guardar las citas en la variable
  } catch (error) {
    console.error("Error al obtener las citas de cliente:", error);
  }
};

// Cargar las citas al montar el componente
onMounted(() => {
  fetchAppointments();
});
</script>

<template>
  <div>
    <h3>Historial de Citas de Clientes</h3>
    <table class="table">
      <thead>
        <tr>
          <th>ID Cita</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Propiedad</th>
          <th>Franja Horaria</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appointment in appointments" :key="appointment.id">
          <td>{{ appointment.id }}</td>
          <td>{{ appointment.name }}</td>
          <td>{{ appointment.phone }}</td>
          <td>{{ appointment.property.address }}</td> 
          <td>{{ appointment.timeSlot }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table, .table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #800020;
  color: white;
  text-align: left;
}

.table tr:hover {
  background-color: #f1f1f1;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
