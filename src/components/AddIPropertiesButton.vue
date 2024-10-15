<script setup>
import { ref, defineEmits } from 'vue';
import Salesmenformproperties from './Salesmenformproperties.vue';

const emit = defineEmits(); 
const isPopupOpen = ref(false);
const togglePopup = () => {
  isPopupOpen.value = !isPopupOpen.value;
};

const handlePropertyAdded = (newProperty) => {
  emit('property-added', newProperty);
  togglePopup();
};
</script>

<template>
  <div class="flex items-center">
    <button @click="togglePopup" class="add-inmueble-btn">
      <span class="mr-2">Añadir inmueble</span>
      <span class="plus-icon">+</span>
    </button>
    <Salesmenformproperties v-if="isPopupOpen" @close="togglePopup" @property-added="handlePropertyAdded" />
  </div>
</template>

<style scoped>
.add-inmueble-btn {
  display: inline-flex;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid #333;
  border-radius: 30px;
  padding: 5px 5px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
}
.plus-icon {
  display: inline-block;
  background-color: #000;
  color: #fff;
  border-radius: 60%;
  width: 20px;
  height: 20px;
  text-align: center;
  margin-left: 10px;
}
.add-inmueble-btn:hover {
  background-color: #31080862;
}
</style>
