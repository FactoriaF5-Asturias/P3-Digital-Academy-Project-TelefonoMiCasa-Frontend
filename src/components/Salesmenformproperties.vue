
<script setup>
import { ref, computed, defineEmits } from 'vue';

const emit = defineEmits(['close']);
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
  descripcion: ''
});

const errorMessage = ref('');

const isCasaSelected = computed(() => formData.value.tipo === 'Casa');

const closePopup = () => {
  emit('close');
};

const submitForm = () => {
  if (!formData.value.tipo || !formData.value.precio || !formData.value.habitaciones || !formData.value.banos || !formData.value.planta || !formData.value.zona || !formData.value.m2 || !formData.value.descripcion) {
    errorMessage.value = 'Por favor, complete todos los campos requeridos.';
    return;
  }

  errorMessage.value = ''; 
  console.log('Formulario enviado:', formData.value);
  closePopup();
};
</script>


<template>
  <div v-if="isVisible" class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
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
            <select id="habitaciones" v-model="formData.habitaciones">
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
            <select id="banos" v-model="formData.banos">
              <option value="" disabled>Seleccionar</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div class="form-group half-width">
            <label for="ascensor">Ascensor:</label>
            <select id="ascensor" v-model="formData.ascensor" :disabled="isCasaSelected">
              <option value="" disabled>Seleccionar</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group half-width">
            <label for="planta">Planta:</label>
            <select id="planta" v-model="formData.planta">
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
              <option value="Occidental">Occidental</option>
              <option value="Oriental">Oriental</option>
              <option value="Central">Central</option>
            </select>
          </div>
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
  background: #f5f0e1;
  padding: 15px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}

.popup-title {
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 8px;
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

.form-group label {
  display: block;
  margin-bottom: 3px;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
}


.small-input {
  width: 100%;
  height: 50%;
  color: black;
}

textarea {
  resize: none;
  height: 40px;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

button {
  padding: 5px 10px;
  background-color: #d1d1d1;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

button:hover {
  background-color: #b0b0b0;
}
</style>
