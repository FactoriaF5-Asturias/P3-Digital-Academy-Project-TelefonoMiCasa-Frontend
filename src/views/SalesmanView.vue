<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PopupPassword from '@/components/PopupPassword.vue';

const router = useRouter();
const isPasswordChanged = ref(false); // Estado para controlar si la contraseña fue cambiada

// Función para manejar el cambio de estado de isPasswordChanged
const handlePasswordChange = () => {
  isPasswordChanged.value = true; // Marca que la contraseña fue cambiada
  localStorage.removeItem('token'); // Eliminar el token
  router.push({ path: '/' }); // Redirigir a la página principal
};

</script>

<template>
  <div>
    <!-- Renderiza el popup solo si la contraseña no ha sido cambiada -->
    <PopupPassword v-if="!isPasswordChanged" @password-changed="handlePasswordChange" />
  </div>
</template>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
