<template>
    <div>
      <SalesmenDashboard />
      <PopupPassword v-if="showPopupPassword" @close-modal="closePopup" :isVisible="showPopupPassword" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import PopupPassword from '@/components/PopupPassword.vue';
  import SalesmenDashboard from '@/components/SalesmenDashboard.vue';
  
  const showPopupPassword = ref(false); // Inicialmente false
  
  // Función para verificar si se debe mostrar el popup
  const checkIfPopupShouldShow = () => {
    // Aquí puedes colocar la lógica para determinar si el popup debe mostrarse.
    // Esto puede incluir una verificación si la contraseña ha sido cambiada o no.
    
    // Por ejemplo, si estás usando un flag en el almacenamiento local:
    const passwordChanged = localStorage.getItem('passwordChanged') === 'true';
    
    showPopupPassword.value = !passwordChanged; // Muestra el popup si no ha sido cambiado
  };
  
  // Llama a la función al iniciar el componente
  checkIfPopupShouldShow();
  
  const closePopup = () => {
    console.log('Popup cerrado'); // Mensaje de depuración
    showPopupPassword.value = false; // Cierra el popup
    localStorage.setItem('passwordChanged', 'true'); // Marca la contraseña como cambiada
  };
  </script>
  
  <style scoped>
  /* Agrega estilos si es necesario */
  </style>
  