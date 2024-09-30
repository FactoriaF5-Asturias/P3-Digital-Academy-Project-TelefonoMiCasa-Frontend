<script setup>
import axios from 'axios';
import { ref, onMounted, inject } from 'vue';
import SalesmenList from './SalesmenList.vue';
import { useSalesmenStore } from '../stores/salesmen.js';

const salesmenStore = useSalesmenStore();

const email = ref('');
const password = ref('');
const salesmen = ref([]);
const message = ref('');
const isSuccess = ref(false);
const isPopupVisible = ref(true);

const handleSubmit = async () => {
  if (email.value && password.value) {
    const encodedPassword = window.btoa(password.value);
   
    await createSalesman(email.value, encodedPassword);
   
    email.value = '';
    password.value = '';
  } else {
    message.value = 'Por favor completa ambos campos correctamente';
    isSuccess.value = false;
  }
};

async function createSalesman(username, password) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'username': username,
      'password': password
    };
   
    const baseUri = import.meta.env.VITE_API_ENDPOINT_TELEFONOMICASA;
    const uri = '/salesmen';

    const config = {
      withCredentials: true,
      headers: headers
    };

    const response = await axios.post(baseUri + uri, {}, config);

    if (response.status != 200) {
      throw new Error('Network response was not ok');
    }
   
    message.value = 'Vendedor creado exitosamente';
    isSuccess.value = true;
    salesmenStore.loadSalesmen();

  } catch (error) {
    message.value = 'Error creando el vendedor, inténtalo nuevamente';
    isSuccess.value = false;
    console.error('Error creating salesman:', error);
  }
}

const closePopup = () => {
  isPopupVisible.value = false;
  //fetchSalesmen()
};

// const salesmenlist = inject('SalesmenList')
// return{salesmenlist};

</script>

<template>
  <div v-if="isPopupVisible" class="fixed-top w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" style="z-index: 1050;">
    <div class="card shadow" style="width: 24rem; background-color: #650000;">
      <div class="d-flex justify-content-end p-3">
        <button @click="closePopup" class="btn-close btn-close-white" aria-label="Close"></button>
      </div>
      <div class="card-body text-start">
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="typeEmailX-2" class="form-label text-white">Email</label>
            <input v-model="email" type="email" id="typeEmailX-2" class="form-control" placeholder="Introduzca un email..." />
          </div>
          <div class="mb-4">
            <label for="typePasswordX-2" class="form-label text-white">Contraseña:</label>
            <input v-model="password" type="password" id="typePasswordX-2" class="form-control" placeholder="Introduzca una contraseña..." />
          </div>
          <button class="btn btn-light btn-lg d-block mx-auto" type="submit">Añadir</button>
        </form>
        <div v-if="message" :class="isSuccess ? 'text-success' : 'text-danger'" class="mt-3">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 1rem;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style>
