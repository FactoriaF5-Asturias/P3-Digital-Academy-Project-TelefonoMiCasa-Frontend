<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  appointments: Array, 
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
