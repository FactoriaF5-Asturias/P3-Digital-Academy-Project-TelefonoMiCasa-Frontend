<template>
    <div>
      <!-- Botón para abrir el popup -->
      <button @click="openPopup">Abrir Formulario</button>
  
      <!-- Popup que contiene el formulario -->
      <div v-if="isVisible" class="overlay">
        <div class="popup">
          <h2>Datos Personales</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" v-model="formData.nombre" required />
            </div>
  
            <div class="form-group">
              <label for="apellidos">Apellidos:</label>
              <input type="text" id="apellidos" v-model="formData.apellidos" required />
            </div>
  
            <div class="form-group">
              <label for="telefono">Teléfono:</label>
              <input type="tel" id="telefono" v-model="formData.telefono" required />
            </div>
  
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="formData.email" required />
            </div>
  
            <div class="form-group">
              <label for="municipio">Municipio:</label>
              <input type="text" id="municipio" v-model="formData.municipio" required />
            </div>
  
            <div class="form-actions">
              <button type="button" @click="closePopup">Cerrar</button>
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  
  // Estado reactivo para los datos del formulario
  const formData = reactive({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    municipio: ''
  });
  
  // Control de visibilidad del popup
  const isVisible = ref(false); // Inicialmente oculto
  
  // Función para abrir el popup
  const openPopup = () => {
    isVisible.value = true;
  };
  
  // Función para cerrar el popup
  const closePopup = () => {
    isVisible.value = false;
  };
  
  // Función para manejar el envío del formulario
  const submitForm = () => {
    console.log('Datos enviados:', formData);
    closePopup(); // Cierra el popup después de enviar
  };
  </script>
  
  <style scoped>
  /* Estilos para el popup */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button[type="submit"] {
    background-color: #4CAF50;
    color: white;
  }
  
  button[type="button"] {
    background-color: #f44336;
    color: white;
  }
  
  button {
    background-color: #650000;
    color: white;
    margin-bottom: 20px;
  }
  </style>
  