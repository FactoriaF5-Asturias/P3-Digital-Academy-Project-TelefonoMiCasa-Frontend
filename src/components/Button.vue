<script setup>
import { ref, computed } from 'vue';
import Popup from './Popup.vue';

const isPopupOpen = ref(false);

const openPopup = () => {
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
};

const buttonClasses = computed(() => "flex items-center bg-zinc-200 text-black border border-zinc-400 rounded-full px-4 py-2 hover:bg-zinc-300");
</script>



<template>
  <div class="flex items-center">
    <button @click="openPopup" :class="buttonClasses">
      <span class="mr-2">Añadir comercial</span>
      <span class="icon"> <img src="../assets/icons/+.svg " > </span>
    </button>
    <Popup v-if="isPopupOpen" @close="closePopup" />
  </div>
</template>