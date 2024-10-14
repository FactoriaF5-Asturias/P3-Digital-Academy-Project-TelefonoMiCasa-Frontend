<script setup>
import Button from '@/components/Button.vue';
import { onMounted } from 'vue';
import { useSalesmenStore } from '../stores/salesmen.js';
import AssignZone from '@/components/AssignZone.vue';

const salesmenStore = useSalesmenStore();

onMounted(() => {
  salesmenStore.loadSalesmen();
});

const handleZoneAssigned = (zoneId) => {
  console.log(`Zona asignada: ${zoneId}`);
  salesmenStore.loadSalesmen(); 
};

const getAssignedZones = (salesmanId) => {
  const assignedZones = [];
  salesmenStore.salesmen.forEach((salesman) => {
    if (salesman.id !== salesmanId && salesman.assignedZones) {
      assignedZones.push(...salesman.assignedZones);
    }
  });
  return assignedZones;
};
</script>

<template>
  <main>
    <h1>Lista de comerciales</h1>
    <Button />

    <section>
      <div v-if="salesmenStore.isLoading">Cargando comerciales...</div>
      <div v-if="salesmenStore.error" class="error-message">{{ salesmenStore.error }}</div>
      
      <ul>
        <li v-for="salesman in salesmenStore.salesmen" :key="salesman.id" class="salesman-list">
          <div class="salesman-container">
            <input type="text" :value="salesman.username" readonly class="salesman-name" />
            <AssignZone 
              :salesman="salesman" 
              :assigned-zones="getAssignedZones(salesman.id)" 
              :all-salesmen-zones="salesmenStore.salesmen.flatMap(s => s.assignedZones || [])" 
              @zone-assigned="handleZoneAssigned"
              class="assign-zone"
            />
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
section{
  margin-top: 2vh;
}
.salesman-list {
  display: flex;
  margin-left: 2vh;
  margin-bottom: 10px;
}

.salesman-container {
  display: flex;
  width: 100%;
  max-width: 800px;
  gap: 10px;
}

.salesman-name {
  color: black;
  flex: 1;
  padding: 10px;
  border: 1px solid #650000;
  border-radius: 20px;
  background-color: #f9f9f9;
  font-size: 1.5rem;
}

.assign-zone {
  flex: 0 0 150px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #650000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #7b0000;
}
</style>
