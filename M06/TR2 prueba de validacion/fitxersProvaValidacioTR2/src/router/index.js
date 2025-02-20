import { createRouter, createWebHistory } from 'vue-router'

import cercador from '../components/CercadorBegudes.vue'
import favorites from '../components/BegudesFavorites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'cercador',
      component: cercador
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: favorites
    },
  ]
})

export default router
