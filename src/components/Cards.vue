<script>
import { useSearchStore } from '../stores/searchStore'; 
export default {
  data() {
    return {
      properties: [
        {
          house: '', 
          price: '', 
          description: '',
          address: '',
          bedrooms: '',
          elevator: '',
          floor: '',
          bathrooms: '',
          area: '',
        },
        
      ],
      bedroomIcon: '/src/assets/icons/cama.svg',
      elevatorIcon: '/src/assets/icons/asscensor.svg',
      floorIcon: '/src/assets/icons/Building.svg',
      bathroomIcon: '/src/assets/icons/Bathtub.svg',
      areaIcon: '/src/assets/icons/planos.svg',
      maps: '/src/assets/icons/maps.svg',
      house: '/src/assets/images/house.jpg',
    };
  },
  computed: {
    properties() {
      const store = useSearchStore(); 
      return store.properties;
    },
  },
  mounted() {
    const store = useSearchStore();
    store.searchProperties('venta'); 
  },
};
</script>

<template>

  <div class="properties-list">

      <div v-if="!loading && properties.length === 0" class="no-results"> No hay propiedades disponibles para la
        búsqueda seleccionada. </div>

      <div v-for="(property, index) in properties" :key="index" class="card">
        <div class="image-container">
     <img :src="property.house || 'https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796_1280.jpg'" alt="Property Image" class="property-image" />
        </div>
        <div class="content">
          <h2 class="price">{{ property.price }}</h2>
          <p class="description">{{ property.description }}</p>
          <div class="address">
            <img :src="maps" alt="Maps Icon" class="icon" />
            <span>{{ property.address }}</span>
          </div>
          <div class="features">
            <div class="feature">
              <img :src="bedroomIcon" alt="Bedrooms Icon" class="icon" />
              <span>{{ property.bedrooms || 'N/A' }} habs.</span>
            </div>
            <div class="feature">
              <img :src="elevatorIcon" alt="Elevator Icon" class="icon" />
              <span>{{ property.elevator || 'No' }}</span>
            </div>
            <div class="feature">
              <img :src="floorIcon" alt="Floor Icon" class="icon" />
              <span>{{ property.floor || 'N/A' }}</span>
            </div>
            <div class="feature">
              <img :src="bathroomIcon" alt="Bathroom Icon" class="icon" />
              <span>{{ property.bathrooms || 'N/A' }} baño</span>
            </div>
            <div class="feature">
              <img :src="areaIcon" alt="Area Icon" class="icon" />
              <span>{{ property.area }} m²</span>
            </div>
          </div>
          <div class="actions">
            <button class="schedule-visit">Agendar visita</button>
            <button class="favorite">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="heart-icon">
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                </path>
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
margin-left: 20px;
  display: grid;
  grid-template-columns: repeat(2, 3fr);
  gap: 20px;
  justify-content: center;
}

.card {
  display: flex;
  background-color: #fffbbb;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 300px;
  flex-direction: row;
}

.image-container {
  flex: 1;
  max-width: 50%;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 20px;
}

.content {
  
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.description {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.address {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
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
  display: none;
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

@media (max-width: 768px) {
  .properties-list {
    grid-template-columns: 1fr;
  }

  .card {
    width: 100%;
    flex-direction: column;
    height: auto;
  }

  .property-image {
    padding: 20px;
   width: 350px;
  }

  .content {
    padding: 10px;
  }

  .price {
    font-size: 20px;
  }

  .description {
    font-size: 12px;
  }

  .features {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
  }

  .icon {
    width: 30px;
    height: 30px;
  }

  .schedule-visit {
    padding: 8px 16px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .features {
    grid-template-columns: 1fr;
  }

  .icon {
    width: 25px;
    height: 25px;
  }

  .schedule-visit {
    width: 100%;
    text-align: center;
  }

  .favorite {
    display: block;
    margin-top: 10px;
  }
}
.no-results {
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 20px;
}
</style>
