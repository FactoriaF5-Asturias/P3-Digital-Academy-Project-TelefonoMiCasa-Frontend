<script>
export default {
  data() {
    return {
      property: {
        house: '/src/assets/icons/dddaaa.jpg',
        price: '300€ / mes',
        description: 'REMAX VETUSTA presenta en exclusiva este espacioso piso de 90 m² construidos en Lugones, con plaza de garaje y trastero incluidos en el ...',
        address: 'Calle Arroyo Vaqueros, 8, Corredoría',
        bedrooms: 2,
        elevator: 'ascensor',
        floor: '3ª planta',
        bathrooms: 1,
        area: '87',
      },
      bedroomIcon: '/src/assets/icons/cama.svg',
      elevatorIcon: '/src/assets/icons/asscensor.svg',
      floorIcon: '/src/assets/icons/Building.svg',
      bathroomIcon: '/src/assets/icons/bañera.svg',
      areaIcon: '/src/assets/icons/planos.svg',
    };
  },
};
</script>

<template>
  <div class="Card">
    <div class="Imagen">
      <div class="max-w-sm mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
        <img class="img" :src="property.house" alt="Property Image" />
      </div>
    </div>
    <div class="Text">
      <div class="p-4">
        <h2 class="text-2xl font-bold text-primary">{{ property.price }}</h2>
        <p class="text-muted-foreground">{{ property.description }}</p>
        <h3 class="mt-2 text-lg font-semibold">{{ property.address }}</h3>
        <div class="flex items-center mt-4">
          <div class="mx-4">
            <span>
              <img :src="bedroomIcon" alt="Bedrooms Icon" class="w-6 h-6 inline" />
            </span>
            <span class="text-muted-foreground">{{ property.bedrooms }} habs.</span>
          </div>
          <div class="mx-4">
            <span>
              <img :src="elevatorIcon" alt="Elevator Icon" class="w-6 h-6 inline" />
            </span>
            <span class="text-muted-foreground">{{ property.elevator }}</span>
          </div>
          <div class="mx-4">
            <span>
              <img :src="floorIcon" alt="Floor Icon" class="w-6 h-6 inline" />
            </span>
            <span class="text-muted-foreground">{{ property.floor }}</span>
          </div>
          <div class="mx-4">
            <span>
              <img :src="bathroomIcon" alt="Bathroom Icon" class="w-6 h-6 inline" />
            </span>
            <span class="text-muted-foreground">{{ property.bathrooms }} baño</span>
          </div>
          <div class="mx-4">
            <span>
              <img :src="areaIcon" alt="Area Icon" class="w-6 h-6 inline" />
            </span>
            <span class="text-muted-foreground">{{ property.area }} m²</span>
          </div>
        </div>
      </div>
      <button id="Button">Agendar visita</button>
    </div>
  </div>
</template>

<style scoped>
.Card {
  background-color: #fffbbb;
  display: flex;
}

.Imagen {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
}

.img {
  display: flex;
  
  height: 200px;
 
}

.Text {
  padding: 20px;
}

#Button {
  border-radius: 50px;
  height: 30px;
  width: 150px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.p-4 {
  padding: 1rem;
}

.text-2xl {
  font-size: 1.5rem;
  font-weight: 700;
}

.font-bold {
  font-weight: 700;
}

.text-primary {
  color: #007bff;
}

.text-muted-foreground {
  color: #6c757d;
}

.mt-2 {
  margin-top: 0.5rem;
}

.text-lg {
  font-size: 1.125rem;
}

.font-semibold {
  font-weight: 600;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.mt-4 {
  margin-top: 1rem;
}

.mx-4 {
  margin-left: 1rem;
  margin-right: 1rem;
}

.w-6 {
  width: 1.5rem;
}

.h-6 {
  height: 1.5rem;
}

.inline {
  display: inline-block;
}

.bg-card {
  background-color: #fff;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.overflow-hidden {
  overflow: hidden;
}

.max-w-sm {
  max-width: 24rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
