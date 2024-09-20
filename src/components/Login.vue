<script>
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      isOpen: false,
      currentTab: 'login',
      loginName: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: '',
      registerConfirmPassword: '',
      formErrorMessage: '', 
      authErrorMessage: '', 
      registerErrorMessage: '' 
    };
  },
  watch: {
    loginName() {
      if (this.formErrorMessage) {
        this.formErrorMessage = '';
      }
    },
    loginPassword() {
      if (this.formErrorMessage) {
        this.formErrorMessage = '';
      }
    }
  },
  methods: {
    openPopup() {
      this.isOpen = true;
    },
    closePopup() {
      this.isOpen = false;
    },
    setTab(tab) {
      this.currentTab = tab;
      this.formErrorMessage = ''; 
      this.authErrorMessage = '';
      this.registerErrorMessage = ''; 
    },
    isActiveTab(tab) {
      return this.currentTab === tab;
    },
    async submitLogin() {
      if (!this.loginName || !this.loginPassword) {
        this.formErrorMessage = 'Por favor, rellena todos los campos para continuar.';
        return;
      }

      const authStore = useAuthStore(); 

      try {
        const response = await authStore.login(this.loginName, this.loginPassword);
        
        if (response && response.roles) {
          const userRole = response.roles;  

          if (userRole === 'ROLE_ADMIN') {
            this.$router.push('/adminview');  
          } else if (userRole === 'ROLE_USER') {
            this.$router.push('/userview');  
          } else {
            this.authErrorMessage = 'Rol no reconocido.';
          }
          this.closePopup();
        } else {
          this.authErrorMessage = 'Error en la autenticación. Por favor, verifica tus credenciales.';
        }
      } catch (error) {
        this.authErrorMessage = 'Error en la autenticación. Inténtalo de nuevo más tarde.';
      }
    },
    submitRegister() {
      if (!this.registerUsername || !this.registerPassword || !this.registerConfirmPassword) {
        this.registerErrorMessage = 'Por favor, rellena todos los campos para continuar.';
        return;
      }

      if (this.registerPassword !== this.registerConfirmPassword) {
        this.registerErrorMessage = 'Las contraseñas no coinciden.';
        return;
      }

      // Aquí iría la lógica de registro, por ejemplo:
      // const authStore = useAuthStore();
      // authStore.register(this.registerUsername, this.registerPassword);

      console.log('Registro con:', this.registerUsername, this.registerPassword);
      this.closePopup();
    }
  }
};
</script>

<template>
  <div v-if="isOpen" class="popup-overlay">
    <div v-if="isOpen" class="popup-overlay" @click.self="closePopup">
    <div class="login-container">
      <div class="login-box">
        <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link" :class="{ active: isActiveTab('login') }" @click="setTab('login')"
               id="tab-login" href="#pills-login" role="tab"
               aria-controls="pills-login" :aria-selected="isActiveTab('login')">Acceder</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" :class="{ active: isActiveTab('register') }" @click="setTab('register')"
               id="tab-register" href="#pills-register" role="tab"
               aria-controls="pills-register" :aria-selected="isActiveTab('register')">Registro</a>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane fade" :class="{ 'show active': isActiveTab('login') }" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form @submit.prevent="submitLogin">
              <div v-if="formErrorMessage" class="error-message">{{ formErrorMessage }}</div>
              <div v-if="authErrorMessage" class="error-message">{{ authErrorMessage }}</div>

              <div class="form-outline mb-4">
                <label class="form-label" for="loginName">Usuario</label>
                <input type="user" v-model="loginName" id="loginName" class="form-control" />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="loginPassword">Contraseña</label>
                <input type="password" v-model="loginPassword" id="loginPassword" class="form-control" />
              </div>

              <div class="button-container">
                <button type="submit" id="botonAcceder" class="btn btn-block mb-4">Acceder</button>
              </div>
            </form>
          </div>

          <div class="tab-pane fade" :class="{ 'show active': isActiveTab('register') }" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            <form @submit.prevent="submitRegister">
              <div v-if="registerErrorMessage" class="error-message">{{ registerErrorMessage }}</div>

              <div class="form-outline mb-4">
                <label class="form-label" for="registerUsername">Usuario</label>
                <input type="text" v-model="registerUsername" id="registerUsername" class="form-control" />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="registerPassword">Contraseña</label>
                <input type="password" v-model="registerPassword" id="registerPassword" class="form-control" />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="registerConfirmPassword">Confirmar Contraseña</label>
                <input type="password" v-model="registerConfirmPassword" id="registerConfirmPassword" class="form-control" />
              </div>

              <div class="button-container">
                <button type="submit" id="botonRegistrar" class="btn btn-block mb-4">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    
    </div>    </div>
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
}

.login-container {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px; /* Aumentado el ancho */
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
  width: 450px; /* Ancho ajustado */
}

.login-box {
  background-color: #D9D9D9;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 20px;
  max-width: 500px; /* Aumentado el ancho */
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Jomolhari", serif;
  color: #650000;
}

.form-control {
  width: 100%; /* Ajuste para que los inputs ocupen todo el ancho */
  padding: 10px; /* Mejora la separación interna */
  border: solid 1px;
  border-color: #650000;
  border-radius: 5px; /* Añadimos bordes redondeados para mejor estética */
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
  width: 50%; /* Ajustamos el tamaño del botón */
  padding: 10px; /* Añadimos más relleno a los botones */
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
</style>
