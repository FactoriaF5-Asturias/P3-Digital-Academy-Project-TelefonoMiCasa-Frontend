import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PublicView from '@/views/PublicView.vue'
import Login from '@/components/Login.vue'

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
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/salesmanview',
      name: 'salesmanview',
      component: () => import('../views/SalesmanView.vue')
    },
     {
      path: '/public',
      name: 'Public',
      component: PublicView
    }
  ]
})

export default router
