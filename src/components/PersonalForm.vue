<script setup>
import { reactive, ref, watch } from 'vue';
import { submitPersonalForm } from '../stores/personalFormStore';

const formData = reactive({
  nombre: '',
  apellidos: '',
  telefono: '',
  email: '',
  municipio: '',
  otroMunicipio: ''
});

const isVisible = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const showOtroMunicipio = ref(false);

const openPopup = () => {
  isVisible.value = true;
  setTimeout(() => {
    document.body.classList.add('modal-open');
  }, 0);
};

const closePopup = () => {
  isVisible.value = false;
  document.body.classList.remove('modal-open');
};

const submitForm = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    const dataToSubmit = { ...formData };
    if (dataToSubmit.municipio === 'otro') {
      dataToSubmit.municipio = dataToSubmit.otroMunicipio;
    }
    delete dataToSubmit.otroMunicipio;

    const result = await submitPersonalForm(dataToSubmit);
    if (result.success) {
      console.log('Datos enviados exitosamente:', result.data);
      closePopup();
    } else {
      errorMessage.value = 'Error al enviar el formulario. Por favor, inténtelo de nuevo.';
    }
  } catch (error) {
    errorMessage.value = 'Error al enviar el formulario. Por favor, inténtelo de nuevo.';
    console.error('Error:', error);
  } finally {
    isLoading.value = false;
  }
};

watch(() => formData.municipio, (newValue) => {
  showOtroMunicipio.value = newValue === 'otro';
  if (newValue !== 'otro') {
    formData.otroMunicipio = '';
  }
});
</script>

<template>
  <div class="button-container">
    <button class="btn-mis-datos" @click="openPopup">Mis datos</button>

    <div class="modal fade" :class="{ show: isVisible }" tabindex="-1" role="dialog" v-if="isVisible">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Datos Personales</h5>
            <button type="button" class="close" aria-label="Close" @click="closePopup">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" class="form-control" id="nombre" v-model="formData.nombre" required />
              </div>

              <div class="form-group">
                <label for="apellidos">Apellidos:</label>
                <input type="text" class="form-control" id="apellidos" v-model="formData.apellidos" required />
              </div>

              <div class="form-group">
                <label for="telefono">Teléfono:</label>
                <input type="tel" class="form-control" id="telefono" v-model="formData.telefono" required />
              </div>

              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" v-model="formData.email" required />
              </div>

              <div class="form-group">
                <label for="municipio">Municipio:</label>
                <select class="form-control" id="municipio" v-model="formData.municipio" required>
                  <option value="">Seleccione un municipio</option>
                  <option value="gijon">Gijón</option>
                  <option value="aviles">Avilés</option>
                  <option value="oviedo">Oviedo</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div v-if="showOtroMunicipio" class="form-group">
                <label for="otroMunicipio">Especifique el municipio:</label>
                <input type="text" class="form-control" id="otroMunicipio" v-model="formData.otroMunicipio" required />
              </div>

              <div v-if="errorMessage" class="alert alert-danger mt-3">
                {{ errorMessage }}
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closePopup" :disabled="isLoading">Cerrar</button>
                <button type="submit" class="btn-1" :disabled="isLoading">
                  {{ isLoading ? 'Enviando...' : 'Enviar' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.button-container {
  position: fixed;
  top: 35px;
  right: 220px; /* Adjusted 200px more to the right */
  z-index: 1000;
}

.btn-mis-datos {
  background-color: #ff4500;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.btn-mis-datos:hover {
  background-color: #8a0000;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.modal.fade {
  display: none;
  background: rgba(0, 0, 0, 0.5);
}

.modal.fade.show {
  display: block;
}

.modal-open {
  overflow: hidden;
}

.modal-dialog {
  max-width: 500px;
  margin: 1.75rem auto;
}

@media (max-width: 576px) {
  .modal-dialog {
    max-width: 90%;
    margin: 1rem auto;
  }
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #e9ecef;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-1 {
  background-color: #8a0000 !important;
  border-radius: 10px;
  color: white;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border: none;
  cursor: pointer;
}

.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  cursor: pointer;
}

.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

@media (max-width: 768px) {
  .button-container {
    right: 20px; 
    top:150px;
  }

  .btn-mis-datos {
    font-size: 14px;
    padding: 8px 16px;
  }
}
</style>