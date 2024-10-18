import { createRouter, createWebHashHistory } from 'https://unpkg.com/vue-router@4/dist/vue-router.esm-browser.js';
import { MyComponent } from '../components/miComponente1.js';

// Definir las rutas
const routes = [
    { path: '/', component: MyComponent }
];

// Crear el router
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;