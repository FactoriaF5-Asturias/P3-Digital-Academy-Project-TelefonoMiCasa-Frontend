<script setup>
import { ref, computed, defineEmits } from 'vue';

const emit = defineEmits(['close', 'property-added']);
const isVisible = ref(true);
const formData = ref({
  tipo: '',
  precio: '',
  habitaciones: '',
  banos: '',
  ascensor: '',
  planta: '',
  zona: '',
  m2: '',
  direccion: '',  
  descripcion: ''
});

const errorMessage = ref('');


const isCasaSelected = computed(() => formData.value.tipo === 'Casa');
const isTrasteroSelected = computed(() => formData.value.tipo === 'Trastero');


const closePopup = () => {
  emit('close');
};


const submitForm = () => {
  if (
    !formData.value.tipo ||
    !formData.value.precio ||
    !formData.value.zona ||
    !formData.value.m2 ||
    !formData.value.direccion ||
    !formData.value.descripcion ||
    (!isTrasteroSelected.value && !formData.value.habitaciones) ||
    (!isTrasteroSelected.value && !formData.value.banos) ||
    (!isTrasteroSelected.value && !formData.value.planta)
  ) {
    errorMessage.value = 'Por favor, complete todos los campos requeridos.';
    return;
  }

  errorMessage.value = ''; 
  
  emit('property-added', { ...formData.value });
  closePopup();
};
</script>

<template>
  <div v-if="isVisible" class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">

      <button class="close-button" @click="closePopup">×</button>

      <h3 class="popup-title">Añadir Inmueble</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="tipo">Tipo:</label>
          <select id="tipo" v-model="formData.tipo">
            <option value="" disabled>Seleccionar</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
            <option value="Trastero">Trastero</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group half-width">
            <label for="precio">Precio:</label>
            <select id="precio" v-model="formData.precio">
              <option value="" disabled>Seleccionar</option>
              <option value="100000">100,000€</option>
              <option value="200000">200,000€</option>
              <option value="300000">300,000€</option>
            </select>
          </div>

          <div class="form-group half-width">
            <label for="habitaciones">Nº hab.:</label>
            <select id="habitaciones" v-model="formData.habitaciones" :disabled="isTrasteroSelected">
              <option value="" disabled>Seleccionar</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group half-width">
            <label for="banos">Nº baños:</label>
            <select id="banos" v-model="formData.banos" :disabled="isTrasteroSelected">
              <option value="" disabled>Seleccionar</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div class="form-group half-width">
            <label for="ascensor">Ascensor:</label>
            <select id="ascensor" v-model="formData.ascensor" :disabled="isCasaSelected || isTrasteroSelected">
              <option value="" disabled>Seleccionar</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group half-width">
            <label for="planta">Planta:</label>
            <select id="planta" v-model="formData.planta" :disabled="isTrasteroSelected">
              <option value="" disabled>Seleccionar</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div class="form-group half-width">
            <label for="zona">Zona:</label>
            <select id="zona" v-model="formData.zona">
              <option value="" disabled>Seleccionar</option>
              <option value="Área de Avilés">Área de Avilés</option>
              <option value="Área de Gijón">Área de Gijón</option>
              <option value="Área de Oviedo">Área de Oviedo</option>
              <option value="Caudal">Caudal</option>
              <option value="Eo-Navia">Eo-Navia</option>
              <option value="Nalón">Nalón</option>
              <option value="Narcea">Narcea</option>
              <option value="Oriente">Oriente</option>
            </select>
          </div>
        </div>

        
        <div class="form-group">
          <label for="direccion">Dirección:</label>
          <input type="text" id="direccion" v-model="formData.direccion" />
        </div>

        <div class="form-row">
          <div class="form-group small-width">
            <label for="m2">m2:</label>
            <input type="number" id="m2" v-model="formData.m2" class="small-input" />
          </div>
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción:</label>
          <textarea id="descripcion" v-model="formData.descripcion"></textarea>
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
