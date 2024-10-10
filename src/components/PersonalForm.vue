<script setup>
import { reactive, ref } from 'vue';

const formData = reactive({
  nombre: '',
  apellidos: '',
  telefono: '',
  email: '',
  municipio: ''
});

const isVisible = ref(false); 

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

const submitForm = () => {
  console.log('Datos enviados:', formData);
  closePopup(); 
};
</script>

<template>
  <div>
    <button class="btn btn-secondary m-left:" @click="openPopup">Abrir Formulario</button>

    <div class="modal fade" :class="{ show: isVisible }" style="display: block;" tabindex="-1" role="dialog" v-if="isVisible">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Datos Personales</h5>
            <button type="button" class="close" aria-label="Close" @click="closePopup" style="border: none; background: none;">
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
                <input type="text" class="form-control" id="municipio" v-model="formData.municipio" required />
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary bg" @click="closePopup">Cerrar</button>
                <button type="submit" class="btn-1 btn-secondary">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.modal.fade {
  display: none;
  background: rgba(0, 0, 0, 0.5);
}

.modal-open {
  overflow: hidden;
}
.btn-1{
  background-color: #650000 !important;
  border-radius: 10px;
  color: white;
}

.close {
  margin-left: auto; 
}
</style>
