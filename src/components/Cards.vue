

<script setup>
import { onMounted, ref } from 'vue';
import { useSearchStore } from '../stores/searchStore';
import { useRoute } from 'vue-router';
import visitbutton from '@/components/VisitButton.vue'; 

const route = useRoute();
const searchStore = useSearchStore();
const properties = ref([]);
const bedroomIcon = '/src/assets/icons/cama.svg';
const elevatorIcon = '/src/assets/icons/asscensor.svg';
const floorIcon = '/src/assets/icons/Building.svg';
const bathroomIcon = '/src/assets/icons/Bathtub.svg';
const areaIcon = '/src/assets/icons/planos.svg';
const maps = '/src/assets/icons/maps.svg';
const defaultImage = 'https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796_1280.jpg';

onMounted(() => {
  properties.value = searchStore.properties;
});
</script>

<template>
  <div class="properties-list">
    <div v-if="searchStore.loading" class="loading">Cargando propiedades...</div>
    <div v-if="!searchStore.loading && properties.length === 0" class="no-results">No hay propiedades disponibles para la búsqueda seleccionada.</div>
    
    <div v-for="(property, index) in properties" :key="index" class="card">
      <div class="image-container">
        <img :src="property.house || defaultImage" alt="Property Image" class="property-image" />
      </div>
      <div class="content">
        <h2 class="price">{{ property.price }}</h2>
        <p class="description">{{ property.description }}</p>
        <div class="address">
          <img :src="maps" alt="Maps Icon" class="icon" />
          <span>{{ property.address }}</span>
        </div>
        <div class="features">
         
        </div>
        <div class="actions">
         
          <visitbutton /> 

        
          <button class="favorite">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="heart-icon">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.properties-list {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  display: flex;
  background-color: #fffbbb;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 580px;
  height: 300px;
  flex-direction: row;
  overflow: hidden;
  max-width: 95%;
  flex-wrap: nowrap; 
}

.image-container {
  width: 45%; 
  background-color: #f5f5f5;
  flex-basis: 45%;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  flex-basis: 55%; 
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.description {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.address {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.feature {
  display: flex;
  align-items: center;
}

.icon {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.no-results {
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 20px;
}

.schedule-visit {
  background-color: #D6B666;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  
}

.favorite {
  background: none;
  border: none;
  cursor: pointer;
}

.heart-icon {
  width: 24px;
  height: 24px;
  stroke: #999;
}

@media (max-width: 1200px) and (max-width: 819px) {
  .card {
    width: 400px;
    height: 250px;
  }

  .image-container {
    flex-basis: 45%;
  }

  .content {
    flex-basis: 65%;
    padding: 5px;
  }

  .price {
    font-size: 20px;
  }

  .description {
    font-size: 14px;
  }

  .features {
    gap: 10px;
  }
}

.icon {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

@media (max-width: 768px) {
  .card {
    flex-direction: column;
    width: 100%;
    height: auto;
  }

  .image-container {
    width: 100%;
    height: 200px;
    flex-basis: auto;
  }

  .property-image {
    height: 100%;
  }

  .content {
    flex-basis: auto;
    padding: 15px;
  }

  .price {
    font-size: 20px;
  }

  .description {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .card {
    flex-direction: column;
    width: 100%;
    height: auto;
  }

  .features {
    flex-direction: row;
    gap: 10px;
  }
}

</style>

