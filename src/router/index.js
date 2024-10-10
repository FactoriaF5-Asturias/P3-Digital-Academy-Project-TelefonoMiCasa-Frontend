import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PublicView from '@/views/PublicView.vue'
import Login from '@/components/Login.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
   
    {
      path: '/adminview',
      name: 'adminview',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true }
    },

  

     {
      path: '/public',
      name: 'Public',
      component: PublicView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();  
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
 
    next({ name: 'home' });
  } else {
    next();  
  }
})

export default router
