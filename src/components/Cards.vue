<script>
export default {
  data() {
    return {
      property: {
        image: 'https://placehold.co/600x400',
        price: '300€ / mes',
        description: 'REMAX VETUSTA presenta en exclusiva este espacioso piso de 90 m² construidos en Lugones, con plaza de garaje y trastero incluidos en el ...',
        address: 'Calle Arroyo Vaqueros, 8, Corredoría',
        bedrooms: 2,
        elevator: 'ascensor',
        floor: '3ª planta',
        bathrooms: 1,
        area: '87',
      },
      bedroomIcon: '/path/to/bedroom-icon.svg',
      elevatorIcon: '/path/to/elevator-icon.svg',
      floorIcon: '/path/to/floor-icon.svg',
      bathroomIcon: '/path/to/bathroom-icon.svg',
      areaIcon: '/path/to/area-icon.svg',
    };
  },
};
</script>

<template>
    <div class="max-w-sm mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
      <img class="w-full h-48 object-cover" :src="property.image" alt="Property Image" />
      <div class="p-4">
        <h2 class="text-2xl font-bold text-primary">{{ property.price }}</h2>
        <p class="text-muted-foreground">{{ property.description }}</p>
        <h3 class="mt-2 text-lg font-semibold">{{ property.address }}</h3>
        <div class="flex items-center mt-4">
          <div class="mx-4">
            <span><img :src="bedroomIcon" alt="Bedrooms Icon" class="w-6 h-6 inline" /></span>
            <span class="text-muted-foreground">{{ property.bedrooms }} habs.</span>
          </div>
          <div class="mx-4">
            <span><img :src="elevatorIcon" alt="Elevator Icon" class="w-6 h-6 inline" /></span>
            <span class="text-muted-foreground">{{ property.elevator }}</span>
          </div>
          <div class="mx-4">
            <span><img :src="floorIcon" alt="Floor Icon" class="w-6 h-6 inline" /></span>
            <span class="text-muted-foreground">{{ property.floor }}</span>
          </div>
          <div class="mx-4">
            <span><img :src="bathroomIcon" alt="Bathroom Icon" class="w-6 h-6 inline" /></span>
            <span class="text-muted-foreground">{{ property.bathrooms }} baño</span>
          </div>
          <div class="mx-4">
            <span><img :src="areaIcon" alt="Area Icon" class="w-6 h-6 inline" /></span>
            <span class="text-muted-foreground">{{ property.area }} m²</span>
          </div>
        </div>
        <button class="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2 px-4 rounded-lg">
          Agendar visita
        </button>
      </div>
    </div>
  </template>
  
 
  <style scoped>
  /* Add any specific styles for the component here if needed */
  </style>
  