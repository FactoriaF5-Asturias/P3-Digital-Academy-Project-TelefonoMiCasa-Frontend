<script setup>
import { ref, computed } from 'vue';
import Popup from './Popup.vue';
const isPopupOpen = ref(false);
const togglePopup = () => {
  isPopupOpen.value = !isPopupOpen.value;
};
</script>
<template>
  <div class="flex items-center">
    <button @click="togglePopup" :class="buttonClasses">
      <span class="mr-2">Añadir comercial</span>
      <span class="icon"> <img src="../assets/icons/+.svg " > </span>
    </button>
    <Popup v-if="isPopupOpen" @close="togglePopup" />
  </div>
</template>
<style>
button{
  border-radius: 20px;
}</style>