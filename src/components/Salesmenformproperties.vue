<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { defineEmits } from 'vue';

const emit = defineEmits(['close', 'property-added']);

const isVisible = ref(true);
const formData = ref({
  type: '',
  price: '',
  room: null,
  bathroom: null,
  hasElevator: null,
  floors: null,
  zone: '', 
  area: null,
  address: '',
  description: '',
  action: '',
  userId: null  
});

const errorMessage = ref('');

const closePopup = () => {
  isVisible.value = false;
};

const submitForm = async () => {
  if (!formData.value.type || !formData.value.price || !formData.value.zone || !formData.value.area || !formData.value.address || !formData.value.description || !formData.value.action || !formData.value.userId) {
    errorMessage.value = 'Por favor, complete todos los campos requeridos.';
    return;
  }
  console.log("Datos enviados al backend:", formData.value);
  try {
    const response = await axios.post('http://localhost:8080/api/v1/property', { ...formData.value }, { withCredentials: true });
    emit('property-added', { ...formData.value });
    closePopup();
  } catch (error) {
    console.error('Error al añadir el inmueble:', error);
    errorMessage.value = 'Hubo un error al añadir el inmueble.';
  }
};

const getUserInfo = async () => {
  try {
    const userResponse = await axios.get('http://localhost:8080/api/v1/login', { withCredentials: true });
    const currentUsername = userResponse.data.username;
    formData.value.userId = userResponse.data.id; 
    
    const salesmenResponse = await axios.get('http://localhost:8080/api/v1/salesmen', { withCredentials: true });
    const currentSalesman = salesmenResponse.data.find(salesman => salesman.username === currentUsername);
    
    if (currentSalesman && currentSalesman.zone) {
      formData.value.zone = currentSalesman.zone.name; 
    } else {
      errorMessage.value = 'No se encontró la zona para el vendedor actual.';
    }
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    errorMessage.value = 'Hubo un error al obtener la información del usuario.';
  }
};

onMounted(() => {
  getUserInfo();
});
</script>



<template>
  <div v-if="isVisible" class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <button class="close-button" @click="closePopup">×</button>
      <h3 class="popup-title">Añadir Inmueble</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="type">Tipo:</label>
          <select id="type" v-model="formData.type">
            <option value="" disabled>Seleccionar</option>
            <option value="flat">Apartamento</option>
            <option value="house">Casa</option>
            <option value="garage">Garaje</option>
            <option value="storageroom">Trastero</option>
          </select>
        </div>

        <div class="form-group">
          <label for="price">Precio:</label>
          <select id="price" v-model="formData.price">
            <option value="" disabled>Seleccionar</option>
            <option value="100000">20,000€</option>
            <option value="100000">50,000€</option>
            <option value="100000">100,000€</option>
            <option value="200000">200,000€</option>
            <option value="300000">300,000€</option>
          </select>
        </div>

        <div class="form-group" v-if="formData.type === 'flat' || formData.type === 'house'">
          <label for="room">Nº Habitaciones:</label>
          <select id="room" v-model="formData.room">
            <option value="" disabled>Seleccionar</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div class="form-group" v-if="formData.type === 'flat' || formData.type === 'house'">
          <label for="bathroom">Nº Baños:</label>
          <select id="bathroom" v-model="formData.bathroom">
            <option value="" disabled>Seleccionar</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div class="form-group" v-if="formData.type === 'flat'">
          <label for="hasElevator">Ascensor:</label>
          <select id="hasElevator" v-model="formData.hasElevator">
            <option value="" disabled>Seleccionar</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div class="form-group" v-if="formData.type === 'flat' || formData.type === 'house'">
          <label for="floors">Planta:</label>
          <select id="floors" v-model="formData.floors">
            <option value="" disabled>Seleccionar</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div class="form-group">
         <label for="zone">Zona:</label>
            <select id="zone" v-model="formData.zone" disabled>
              <option :value="formData.zone">{{ formData.zone }}</option>
            </select>
        </div>


        <div class="form-group">
          <label for="area">Superficie (m2):</label>
          <select id="area" v-model="formData.area">
            <option value="" disabled>Seleccionar</option>
            <option value="50">50 m²</option>
            <option value="75">75 m²</option>
            <option value="100">100 m²</option>
          </select>
        </div>

        <div class="form-group">
          <label for="address">Dirección:</label>
          <input type="text" id="address" v-model="formData.address" />
        </div>

        <div class="form-group">
          <label for="description">Descripción:</label>
          <textarea id="description" v-model="formData.description"></textarea>
        </div>

        <div class="form-group">
          <label for="action">Acción:</label>
          <select id="action" v-model="formData.action">
            <option value="" disabled>Seleccionar</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div class="form-buttons">
          <button type="submit">Añadir</button>
        </div>
      </form>
    </div>
  </div>
</template>



<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.popup-content {
  background: #ffffff;
  padding: 8px;
  border-radius: 8px;
  width: 350px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #800020;
  position: relative;
}

.popup-title {
  margin-bottom: 6px;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: #4e1e1e;
}

.close-button {
  position: absolute;
  top: -5px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #800020;
  cursor: pointer;
}

.close-button:hover {
  color: #c95874;
  background-color: #ffffff;
}

.form-group {
  margin-bottom: 6px;
}

.form-group label {
  display: block;
  margin-bottom: 3px;
  font-size: 0.85rem;
  color: #333333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #3e141e;
  font-size: 0.85rem;
  background-color: #ffffff;
  color: #333333;
  box-sizing: border-box;
}

.form-group textarea {
  resize: none;
  height: 50px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-color: #5a0017;
  outline: none;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.half-width {
  width: 48%;
}

.small-width {
  width: 30%;
}

.error-message {
  color: #44131f;
  margin-top: 6px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: bold;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

button {
  padding: 4px 10px;
  background-color: #800020;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  color: white;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #5a0017;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>