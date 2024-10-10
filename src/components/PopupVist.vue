<script setup>
import { ref } from 'vue';
import axios from 'axios';

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
    timeSlot: timeSlot.value
  };

  try {
    const response = await axios.post('http://localhost:8080/api/appointments', formData);
    console.log('Appointment successfully scheduled:', response.data);
    closePopup(); 
  } catch (error) {
    console.error('Error scheduling the appointment:', error);
  }
}
</script>

<template>
  <div v-if="isPopupOpen" class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <h2>Schedule Appointment</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />
        </div>

        <div>
          <label for="phone">Phone:</label>
          <input type="tel" id="phone" v-model="phone" required />
        </div>

        <div>
          <label for="timeSlot">FranjaHoraria:</label>
          <select id="timeSlot" v-model="timeSlot" required>
            <option value="9-12">9 a 12</option>
            <option value="12-14">12 a 14</option>
            <option value="16-18">16 a 18</option>
            <option value="18-20">18 a 20</option>
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
