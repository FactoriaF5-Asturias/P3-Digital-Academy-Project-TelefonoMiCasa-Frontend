<script setup>
import { defineProps } from 'vue';


const props = defineProps({
  salesmen: {
    type: Array,
    required: true
  }
});
</script>


<template>
  <div>
    <h2>Lista de Vendedores</h2>
    <ul>
      <li v-for="salesman in salesmen" :key="salesman.id">
        {{ salesman.email }}
      </li>
    </ul>
  </div>
</template>


<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}


li {
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
</style>
