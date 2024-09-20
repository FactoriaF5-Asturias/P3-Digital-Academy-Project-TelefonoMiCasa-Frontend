<script setup>

import SearchBuy from '@/components/SearchBuy.vue';

</script>

<template>
      <div class="text">
            <h1>¡No necesitas de una bici voladora para encontrar tu hogar!</h1>
            <h1>Descubre tu casa ideal en Asturias.</h1>
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
      color: #650000;
      text-shadow:
            1px 1px 2px rgba(0, 0, 0, 0.5),
            -1px 1px 2px rgba(0, 0, 0, 0.5),
            1px -1px 2px rgba(0, 0, 0, 0.5),
            -1px -1px 2px rgba(0, 0, 0, 0.5);
      text-align: center;
}



</style>
