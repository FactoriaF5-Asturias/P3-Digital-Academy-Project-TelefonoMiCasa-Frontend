<script setup>
import { ref, watch, computed, defineExpose } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const isOpen = ref(false);
const currentTab = ref('login');
const loginName = ref('');
const loginPassword = ref('');
const registerUsername = ref('');
const registerPassword = ref('');
const registerConfirmPassword = ref('');
const formErrorMessage = ref('');
const authErrorMessage = ref('');
const registerErrorMessage = ref('');

watch([loginName, loginPassword], () => {
  if (formErrorMessage.value) {
    formErrorMessage.value = '';
  }
});

const openPopup = () => {
  isOpen.value = true;
};

const closePopup = () => {
  isOpen.value = false;
  clearForm();
};

const setTab = (tab) => {
  currentTab.value = tab;
  clearForm();
};

const clearForm = () => {
  loginName.value = '';
  loginPassword.value = '';
  registerUsername.value = '';
  registerPassword.value = '';
  registerConfirmPassword.value = '';
  formErrorMessage.value = '';
  authErrorMessage.value = '';
  registerErrorMessage.value = '';
  console.clear();
};

const isActiveTab = computed(() => {
  return (tab) => currentTab.value === tab;
});

const getUserInfo = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/login', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(`${loginName.value}:${loginPassword.value}`)}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('No se pudo obtener la información del usuario.');
    }
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
  }
};

const submitLogin = async () => {
  if (!loginName.value || !loginPassword.value) {
    formErrorMessage.value = 'Por favor, rellena todos los campos para continuar.';
    return;
  }

  try {
    const loginResponse = await authStore.login(loginName.value, loginPassword.value);

    if (loginResponse) {
      const userInfo = await getUserInfo();

      if (userInfo && userInfo.roles) {
        const userRoles = userInfo.roles;

        if (userRoles.includes('ROLE_ADMIN')) {
          router.push('/adminview');
        } else if (userRoles.includes('ROLE_USER')) {
          router.push('/userview');
        } else if (userRoles.includes('ROLE_SALESMAN')) {
          router.push('/salesmendashboardview');
        } else {
          authErrorMessage.value = 'Rol no reconocido.';
        }

        closePopup();
      } else {
        authErrorMessage.value = 'Error en la autenticación. Por favor, verifica tus credenciales.';
      }
    }
  } catch (error) {
    authErrorMessage.value = 'Error en la autenticación. Inténtalo de nuevo más tarde.';
  }
};

const validarCorreo = (correo) => {
  const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return patron.test(correo);
};

const submitRegister = async () => {
  if (!registerUsername.value || !registerPassword.value || !registerConfirmPassword.value) {
    registerErrorMessage.value = 'Por favor, rellena todos los campos para continuar.';
    return;
  }

  if (!validarCorreo(registerUsername.value)) {
    registerErrorMessage.value = 'Correo electrónico inválido. Por favor, verifica el formato.';
    return;
  }

  if (registerPassword.value !== registerConfirmPassword.value) {
    registerErrorMessage.value = 'Las contraseñas no coinciden.';
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/api/v1/client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: registerUsername.value,
        encryptedPassword: registerPassword.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Cliente creado exitosamente:', data);
      closePopup();
      alert('Registro exitoso!');
    } else {
      const errorData = await response.json();
      registerErrorMessage.value = errorData.error || 'Error al registrar el cliente.';
    }
  } catch (error) {
    registerErrorMessage.value = 'Error en el servidor. Inténtalo de nuevo más tarde.';
  }
};

defineExpose({ openPopup });
</script>

<template>
  <div v-if="isOpen" class="popup-overlay" @click.self="closePopup">
    <div class="login-container">
      <div class="login-box">
        <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link" :class="{ active: isActiveTab('login') }" @click="setTab('login')" id="tab-login"
              href="#pills-login" role="tab" aria-controls="pills-login"
              :aria-selected="isActiveTab('login')">Acceder</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" :class="{ active: isActiveTab('register') }" @click="setTab('register')"
              id="tab-register" href="#pills-register" role="tab" aria-controls="pills-register"
              :aria-selected="isActiveTab('register')">Registro</a>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane fade" :class="{ 'show active': isActiveTab('login') }" id="pills-login" role="tabpanel"
            aria-labelledby="tab-login">
            <form @submit.prevent="submitLogin">
              <div v-if="formErrorMessage" class="error-message">{{ formErrorMessage }}</div>
              <div v-if="authErrorMessage" class="error-message">{{ authErrorMessage }}</div>

              <div class="form-outline mb-4">
                <label class="form-label" for="loginName">Usuario</label>
                <input type="text" v-model="loginName" id="loginName" class="form-control"
                  placeholder="Introduzca su Email..." />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="loginPassword">Contraseña</label>
                <input type="password" v-model="loginPassword" id="loginPassword" class="form-control"
                  placeholder="Introduzca su contraseña..." />
              </div>

              <div class="button-container">
                <button type="submit" id="botonAcceder" class="btn btn-block mb-4">Acceder</button>
              </div>
            </form>
          </div>

          <div class="tab-pane fade" :class="{ 'show active': isActiveTab('register') }" id="pills-register"
            role="tabpanel" aria-labelledby="tab-register">
            <form @submit.prevent="submitRegister">
              <div v-if="registerErrorMessage" class="error-message">{{ registerErrorMessage }}</div>

              <div class="form-outline mb-4">
                <label class="form-label" for="registerUsername">Usuario</label>
                <input type="text" v-model="registerUsername" id="registerUsername" class="form-control"
                  placeholder="Introduzca su Email..." />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="registerPassword">Contraseña</label>
                <input type="password" v-model="registerPassword" id="registerPassword" class="form-control"
                  placeholder="Contraseña..." />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="registerConfirmPassword">Confirmar Contraseña</label>
                <input type="password" v-model="registerConfirmPassword" id="registerConfirmPassword"
                  class="form-control" placeholder="Confirme su contraseña..." />
              </div>

              <div class="button-container">
                <button type="submit" id="botonRegistrar" class="btn btn-block mb-4">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
input{
  max-height: 50px;
}
.popup-overlay {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  left: 0px;
}

.login-container {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  position: relative;
}

:root {
  --main-bg-color: #f9f9f9;
  --border-color: #ccc;
  --button-color: #650000;
  --button-text-color: white;
  --active-tab-bg: #650000;
  --active-tab-color: white;
  --inactive-tab-bg: #e0e0e0;
  --inactive-tab-color: black;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--main-bg-color);
  width: 450px;
}

.login-box {
  background-color: #D9D9D9;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Jomolhari", serif;
  color: #650000;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: solid 1px;
  border-color: #650000;
  border-radius: 5px;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
}

#botonAcceder, #botonRegistrar {
  background-color: #650000;
  color: white;
  font-weight: bold;
  width: 50%;
  padding: 10px;
}

.nav-link {
  background-color: #c25e5e;
  color: #3d0101;
  font-weight: bold;
  margin-bottom: 40px;
}

.nav-link.active {
  background-color: #650000;
  color: white;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.login-box label {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.50);
}

::placeholder{
  font-size: 1.5rem;
}

@media (max-width: 780px) {
 ::placeholder{
  font-size: 1rem;
 } 
}

@media (max-width: 480px) {
 ::placeholder{
  font-size: 0.8rem;
 }
}
</style>