import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/personform';

axios.defaults.baseURL = 'http://localhost:8080';

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response);
    return Promise.reject(error);
  }
);

export const submitPersonalForm = async (formData) => {
  try {
    const response = await axios.post('/api/v1/personform', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    let errorMessage = 'Error al enviar el formulario';
    
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = 'No autorizado. Por favor, inicie sesión.';
          break;
        case 400:
          errorMessage = 'Datos del formulario inválidos';
          break;
        case 500:
          errorMessage = 'Error del servidor';
          break;
        default:
          errorMessage = `Error: ${error.response.status}`;
      }
    } else if (error.request) {
      errorMessage = 'No se pudo conectar al servidor';
    }

    return { 
      success: false, 
      error: errorMessage,
      details: error.response?.data || error.message 
    };
  }
};