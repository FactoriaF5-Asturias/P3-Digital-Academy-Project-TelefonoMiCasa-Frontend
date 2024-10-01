
<script setup>
import { defineEmits } from 'vue';


const emit = defineEmits(['add']);


const handleClick = () => {
  emit('add');
};
</script>

<template>
    <button class="add-inmueble-btn" @click="handleClick">
      Añadir inmueble
      <span class="plus-icon">+</span>
    </button>
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
  