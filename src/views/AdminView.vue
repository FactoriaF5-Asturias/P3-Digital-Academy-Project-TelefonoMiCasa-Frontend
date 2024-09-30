<script setup>
import Button from '@/components/Button.vue';
import Cards from '@/components/Cards.vue';
import { onMounted } from 'vue';
import { useSalesmenStore } from '../stores/salesmen.js';

const salesmenStore = useSalesmenStore();

onMounted(() => {
  salesmenStore.loadSalesmen(); 
});

</script>

<template>
  <main>
    <h1>Lista de comerciales</h1>
    <Button/>

    <section>
      <h2>Lista de comerciales</h2>
      <div v-if="salesmenStore.isLoading">Cargando comerciales...</div>
      <div v-if="salesmenStore.error" class="error-message">{{ salesmenStore.error }}</div>
      
      <ul>
        <li v-for="salesman in salesmenStore.salesmen" :key="salesman.id" class="salesmanList">
          <strong>Email:</strong> {{ salesman.username }}
        </li>
      </ul>
    </section>

  </main>
</template>

<style scoped>
.salesmanList{
  width: 100%;
  max-width: 250px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: bolder;
  font-size: larger;
}
</style>
