import { createRouter, createWebHistory } from 'vue-router'
import FilmView from "@/views/FilmView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'film',
      component: FilmView,
    },
  ],
})

export default router
