<script setup>
const developers = [
  {
    name: 'Felipe',
    githubLink: 'https://github.com/piperiver97',
    avatar: '/src/assets/images/github/felipe.jpg'
  },
  {
    name: 'Pablo',
    githubLink: 'https://github.com/pablosja',
    avatar: '/src/assets/images/github/pablo.jpg'
  },
  {
    name: 'Hugo',
    githubLink: 'https://github.com/hugoperez11',
    avatar: '/src/assets/images/github/hugo.jpg'
  },
  {
    name: 'Antonella',
    githubLink: 'https://github.com/AntonellaEL',
    avatar: '/src/assets/images/github/antonella.png'
  },
  {
    name: 'Eyad',
    githubLink: 'https://github.com/eyadcode4',
    avatar: '/src/assets/images/github/eyad.png'
  },
  {
    name: 'Jorge',
    githubLink: 'https://github.com/Jorgecas71',
    avatar: '/src/assets/images/github/jorge.jpg'
  },
  {
    name: 'Julia',
    githubLink: 'https://github.com/JuliaParra',
    avatar: '/src/assets/images/github/julia.png'
  },
]
</script>

<template>
  <div class="container-fluid bg-granate py-2 d-flex justify-content-between align-items-center flex-wrap fixed-bottom">

    
    <div class="text-left text-md-left w-auto">
      <p class="text-white mb-0">© 2024 Teléfono Mi Casa. Todos los derechos reservados.</p>
    </div>

    
    
      <div class="d-flex justify-content-end flex-wrap">
        <a class="avatar-wrapper col-auto p-1" v-for="developer in developers" :key="developer.name" :href="developer.githubLink" target="_blank" rel="noopener noreferrer">
          <img :src="developer.avatar" :alt="developer.name" class="img-fluid developer-avatar" />
        </a>
      </div>
    

  </div>
</template>

<style scoped>
.bg-granate {
  background-color: #650000;
}

.text-left {
  font-size: 95%;
}

.developer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}


a:hover img {
  opacity: 0.8;
}
</style>



