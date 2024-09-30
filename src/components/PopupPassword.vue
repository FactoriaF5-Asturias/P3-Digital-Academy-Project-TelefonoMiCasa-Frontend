<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const nuevaContrasena = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);
const emit = defineEmits(); // Definimos los eventos a emitir

const isPasswordValid = computed(() => {
  const password = nuevaContrasena.value;
  return (
    password.length >= 5 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
});

const canSubmit = computed(() => isPasswordValid.value && !isLoading.value);

const cambiarContrasena = async () => {
  if (!canSubmit.value) {
    console.error('No se puede cambiar la contraseña: contraseña inválida');
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const encodedPassword = btoa(nuevaContrasena.value);
    const baseUri = import.meta.env.VITE_API_ENDPOINT_TELEFONOMICASA;
    const uri = `/salesmen/update-password`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'encryptedPassword': encodedPassword,
    };

    const response = await axios.put(
      `${baseUri}${uri}`,
      {},
      { headers, withCredentials: true }
    );

    if (response.status === 200) {
      successMessage.value = 'Contraseña cambiada con éxito.';
      nuevaContrasena.value = '';
      emit('password-changed'); // Emitir evento cuando la contraseña cambie
    } else {
      throw new Error('La respuesta del servidor no fue exitosa');
    }
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error.response ? error.response.data : error.message);
    errorMessage.value = error.response ? error.response.data.error : 'Error al cambiar la contraseña. Intente nuevamente.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main>
    <div class="modal">
      <div class="modal-content">
        <h2>Cambio de contraseña</h2>
        <div class="form">
          <form @submit.prevent="cambiarContrasena">
            <div class="form-group">
              <label for="nuevaContrasena">Nueva Contraseña:</label>
              <input 
                type="password" 
                id="nuevaContrasena" 
                v-model="nuevaContrasena" 
                required
                autocomplete="new-password"
              />
            </div>
            
            <div v-if="!isPasswordValid && nuevaContrasena" class="error-message">
              La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos
            </div>
            <div class="button-container">
              <button type="submit" :disabled="!canSubmit">
                {{ isLoading ? 'Cambiando...' : 'Cambiar contraseña' }}
              </button>
            </div>
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="success-message">
              {{ successMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Estilo permanece igual */
main {
  display: flex;
  justify-content: center;
  font-family: "Jomolhari", serif;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #D9D9D9;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.form {
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 30px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

button {
  width: 30%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

button:disabled {
  background-color: #650000;
  cursor: not-allowed;
}

.error-message {
  color: #ff0000;
  margin-top: 5px;
  font-size: 0.9em;
}
</style>
