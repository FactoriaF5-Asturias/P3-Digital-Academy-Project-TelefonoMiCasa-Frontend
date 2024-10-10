<!-- PopupVist.vue -->
<template>
    <div class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <h2>Agendar Visita</h2>
        <form @submit.prevent="submitForm">
          <div>
            <label for="name">Nombre:</label>
            <input type="text" id="name" v-model="name" required />
          </div>
  
          <div>
            <label for="phone">Teléfono:</label>
            <input type="tel" id="phone" v-model="phone" required />
          </div>
  
          <div>
            <label for="timeSlot">Franja Horaria:</label>
            <select id="timeSlot" v-model="timeSlot" required>
              <option value="9-12">De 9 a 12</option>
              <option value="12-14">De 12 a 14</option>
              <option value="16-18">De 16 a 18</option>
              <option value="18-20">De 18 a 20</option>
            </select>
          </div>
  
          <button type="submit">Agendar</button>
          <button type="button" @click="closePopup">Cerrar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup(props, { emit }) {
      const name = ref('');
      const phone = ref('');
      const timeSlot = ref('');
  
      function closePopup() {
        emit('close');
      }
  
      function submitForm() {
        const formData = {
          name: name.value,
          phone: phone.value,
          timeSlot: timeSlot.value,
        };
        emit('submit', formData); // Emitir los datos al componente padre
        closePopup(); // Cerrar el popup después de enviar los datos
      }
  
      return {
        name,
        phone,
        timeSlot,
        closePopup,
        submitForm,
      };
    }
  };
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3); /* Fondo semitransparente ligero */
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 300px; /* Ajusta el tamaño del popup */
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 10px;
  }
  
  input, select {
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
    font-size: 14px; 
    width: 100%; 
    height: 5vh;
  }
  
  button {
    background-color: #632627;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 14px;
  }
  
  button:hover {
    background-color: #b58c42;
  }
  </style>
  