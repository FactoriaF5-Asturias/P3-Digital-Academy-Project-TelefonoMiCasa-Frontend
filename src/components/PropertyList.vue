<template>
  <div class="property-list">
    <table class="property-table" v-if="properties.length">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Precio (€)</th>
          <th>Habitaciones</th>
          <th>Baños</th>
          <th>Planta</th>
          <th>Zona</th>
          <th>Superficie (m²)</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(property, index) in properties" :key="property.id">
          <td>{{ property.tipo }}</td>
          <td>{{ property.precio }}</td>
          <td>{{ property.habitaciones }}</td>
          <td>{{ property.banos }}</td>
          <td>{{ property.planta }}</td>
          <td>{{ property.zona }}</td>
          <td>{{ property.m2 }}</td>
          <td>{{ property.descripcion }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No hay inmuebles añadidos todavía.</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  properties: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.property-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.property-table th,
.property-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.property-table th {
  background-color: #800000;
  color: white;
}

.property-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.property-table tbody tr:hover {
  background-color: #ddd;
}
</style>
