<script setup>

import SearchBuy from '@/components/SearchBuy.vue';

</script>

<template>
      <div class="text">
            <span>¡No necesitas de una bici voladora para encontrar tu hogar!</span>
            <br>
            <span>Descubre tu casa ideal en Asturias.</span>
      </div>
      <SearchBuy />

</template>

<style>

body {
      background-image: url('../assets/images/portada.jpg');
      background-size: cover;
      background-repeat: no-repeat;
}

.text {
      font-family: "Jomolhari", serif;
      font-size: calc(20px + 2vw);
      
      color: #650000;
      text-shadow:
            1px 1px 2px rgba(0, 0, 0, 0.5),
            -1px 1px 2px rgba(0, 0, 0, 0.5),
            1px -1px 2px rgba(0, 0, 0, 0.5),
            -1px -1px 2px rgba(0, 0, 0, 0.5);
      text-align: center;
      padding-top: 60px;
      margin: 40px;
     

      
}
</style>
