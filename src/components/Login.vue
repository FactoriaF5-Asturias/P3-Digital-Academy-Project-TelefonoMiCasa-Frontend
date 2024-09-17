<script>
export default {
  data() {
    return {
      currentTab: 'login',
      loginEmail: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: '',
      registerConfirmPassword: ''
    };
  },
  methods: {
    setTab(tab) {
      this.currentTab = tab;
    },
    isActiveTab(tab) {
      return this.currentTab === tab;
    },
    submitLogin() {
      console.log('Login with:', this.loginUser, this.loginPassword);
      this.$router.push('adminview');
    },
    submitRegister() {
      console.log('Register with:', this.registerUsername, this.registerPassword, this.registerConfirmPassword);
    }
  }
};

</script>

<template>
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
  </div>
</template>

<style scoped>
/* Variables CSS globales */
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
  width: 350px;
}

.login-box {
  background-color: #D9D9D9;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Jomolhari", serif;
  color: #650000;
}

#botonAcceder, #botonRegistrar {
  background-color: #650000;
  color: white;
  font-weight: bold;
  width: 40%;
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

.form-control {
  border: solid 1px;
  border-color: #650000;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
.login-box label{
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.50);
}
</style>