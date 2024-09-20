<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';


const email = ref('');
const password = ref('');
const salesmen = ref([]);


const handleSubmit = async () => {
  if (email.value && password.value) {

    const encodedPassword = window.btoa(password.value);
    
   
    await createSalesman(email.value, encodedPassword);
    
   
    email.value = '';
    password.value = '';
    
    
    // await fetchSalesmen();
  } else {
    alert('Por favor completa ambos campos correctamente');
  }
};


async function createSalesman(username, password) {

  try { 
    
    const headers = {
      'Content-Type': 'application/json',
      'username': username,
      'password': password
    }
    
    const baseUri = import.meta.env.VITE_API_ENDPOINT_TELEFONOMICASA
    const uri = '/salesmen'

    const config = {
      withCredentials: true,
      headers: headers
    }

    const response = await axios.post(baseUri + uri, {}, config)
    console.log(response.status);
  

    if (response.status != 200) {
      throw new Error('Network response was not ok');
    }
    
    console.log(response.data);

    
    
  } catch (error) {
    console.error('Error creating salesman:', error);
  }
}


async function fetchSalesmen() {
  try {
    const response = await fetch('http://localhost:8080/api/v1/salesmen');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    salesmen.value = await response.json();
    console.log('Salesmen:', salesmen.value);
  } catch (error) {
    console.error('Error fetching salesmen:', error);
  }
}


onMounted(() => {
  // fetchSalesmen();
});
</script>


<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <section class="vh-100 login-section">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong login-card">
              <div class="card-body p-6 text-right">

                <form @submit.prevent="handleSubmit">
                  <div class="form-outline mb-4">
                    <p>Nombre:</p>
                    <input v-model="email" type="email" id="typeEmailX-2" class="form-control form-control-lg" />
                    <label class="form-label" for="typeEmailX-2"></label>
                  </div>

                  <div class="form-outline mb-4">
                    <p>Contraseña:</p>
                    <input v-model="password" type="password" id="typePasswordX-2" class="form-control form-control-lg" />
                    <label class="form-label" for="typePasswordX-2"></label>
                  </div>

                  <button class="btn btn-primary btn-lg centered-btn" type="submit">Añadir</button>
                </form>

                <div class="mt-4">
                  <h3>Vendedores Existentes:</h3>
                  <ul id="salesmen-list">
                    <li v-for="salesman in salesmen" :key="salesman.username">{{ salesman.username }}</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>
 
  .login-section {
    background-color: white;
  }
 
  .login-card {
    border-radius: 1rem;
    background-color: #650000;
    font-family: "Jomolhari", serif;
  }
 
  .form-outline p {
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: larger;
    color: white;
  }
 
  input.form-control {
   
    padding: 10px;
    font-size: 1rem;
    border: 2px solid #ccc;
    border-radius: 1.0rem;
  }
 
  input.form-control:focus {
    border-color: #0056b3;
    box-shadow: 0 0 5px rgba(0, 86, 179, 0.5);
  }
 
  button.btn-primary {
    background-color: white;
    color:black;
    border: none;
    transition: background-color 0.3s ease;
  }
 
  .centered-btn {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

  button.btn-primary:hover {
    background-color: #f59fae;
  }

  </style>
