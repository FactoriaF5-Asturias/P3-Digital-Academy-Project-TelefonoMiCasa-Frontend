

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps ({
  propertyId: Number
})
const name = ref('');
const phone = ref('');
const timeSlot = ref('');
const isPopupOpen = ref(true);


function closePopup() {
  isPopupOpen.value = false;
}


async function submitForm() {
  const formData = {
    name: name.value,
    phone: phone.value,
    timeSlot: timeSlot.value,
    propertyId: props.propertyId 
  };
 console.log("datos enviados",formData);
 
  try {
    console.log('Datos del formulario enviados:', formData);

    const response = await axios.post('http://localhost:8080/api/v1/appointments', formData, {
      withCredentials: true
    });

    console.log('Cita agendada con éxito:', response.data);
    closePopup();
  } catch (error) {
    console.error('Error agendando la cita:', error.response ? error.response.data : error.message);
  }
}


function openPopup() {
  isPopupOpen.value = true; 
}
</script>

<template>
  <div v-if="isPopupOpen" class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <h2>Agendar Cita</h2>
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
            <option value="9-12">9:00 a 12:00</option>
            <option value="12-14">12:00 a 14:00</option>
            <option value="16-18">16:00 a 18:00</option>
            <option value="18-20">18:00 a 20:00</option>
          </select>
        </div>

        <button type="submit">Confirmar</button>
        <button type="button" @click="closePopup">Cerrar</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(99, 21, 21, 0.1);
  width: 300px;
}

form {
  display: flex;
  flex-direction: column;
}

input, select {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
  height: 5vh;
  color: black;
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

