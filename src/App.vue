<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/common//Header.vue'
import Footer from './components/common/Footer.vue';


</script>

<template>
  <div id="app">
    
      <Header />
        <main class="content">
          <router-view /> 
      
        </main>
    <Footer/>
  
  </div>
</template>

<style scoped>


</style>