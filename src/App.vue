<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/common//Header.vue'


</script>

<template>
  <div id="app">
    
      <Header />
        <main class="content">
          <router-view /> 
      
        </main>
    
  
  </div>
</template>

<style scoped>


</style>