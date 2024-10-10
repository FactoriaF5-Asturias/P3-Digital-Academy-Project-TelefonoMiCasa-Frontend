<template>
    <div class="assign-zone">
      <select v-model="selectedZone" class="zone-select">
        <option disabled value="">Asignar zona</option>
        <option v-for="zone in zones" :key="zone.id" :value="zone.id">{{ zone.name }}</option>
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
          const response = await axios.get('http://localhost:8080/api/v1/zone');
          this.zones = response.data;
        } catch (error) {
          console.error("Error fetching zones:", error);
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
  