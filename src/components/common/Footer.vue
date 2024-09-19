<template>
  <div class="developer-footer bg-granate py-4 w-100 mt-auto">
    <div class="container-fluid d-flex justify-content-between align-items-center flex-wrap">
      <div class="text-left">
        <p class="text-white mb-0">© 2024 Teléfono Mi Casa. Todos los derechos reservados.</p>
      </div>
      <div class="d-flex justify-content-end flex-wrap">
        <div v-for="developer in developers" :key="developer.name" class="mx-2">
          <a :href="developer.githubLink" target="_blank" rel="noopener noreferrer">
            <img :src="developer.avatar" :alt="developer.name" class="img-fluid developer-avatar" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

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

<style scoped>
.bg-granate {
  background-color: #650000;
}

#app {
  display: flex;
  flex-direction: column;
}

.router-view {
  flex-grow: 1;
}

.developer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  flex-wrap: wrap;
}

.text-left {
  flex: 1;
  text-align: left;
}

.developer-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

a {
  text-decoration: none;
}

a:hover img {
  opacity: 0.8;
}

.container-fluid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .developer-footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px;
  }

  .text-left {
    text-align: center;
    margin-bottom: 15px;
  }

  .developer-avatar {
    width: 28px;
    height: 40px;
  }
}
</style>
