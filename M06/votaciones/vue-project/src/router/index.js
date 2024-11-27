import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticatorView from "@/views/AuthenticatorView.vue";
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, // Indica que requiere autenticación
    },
    {
      path: '/auth',
      name: 'authenticator',
      component: AuthenticatorView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Obtén el estado de autenticación

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirige a /auth si intenta acceder a una ruta protegida
    next({ name: 'authenticator' });
  } else {
    next(); // Permite la navegación
  }
});

export default router
