<script setup>
import { onMounted, ref } from 'vue';
import { useSearchStore } from '../stores/searchStore';
import { useRoute } from 'vue-router';
const route = useRoute();
const searchStore = useSearchStore();
const properties = ref([]);
onMounted(async () => {
  const action = route.query.action || 'venta' || 'alquiler';
  await searchStore.searchProperties(action);
  properties.value = searchStore.properties;
});
</script>
<template>
  <div class="properties-list">
    <div v-if="!loading && properties.length === 0" class="no-results">
      No hay propiedades disponibles para la búsqueda seleccionada.
    </div>
    <div v-for="(property, index) in properties" :key="index" class="card">
      <div class="image-container">
        <img :src="property.house" alt="Property Image" class="property-image" />
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  display: flex;
  background-color: #FFFBBB;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
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
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
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
  width: 20px;
  height: 20px;
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

@media (max-width: 768px) {
  .card {
    flex-direction: column;
  }

  .image-container {
    max-width: 100%;
  }

  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

.no-results {
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 20px;
}
</style>












