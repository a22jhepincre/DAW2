import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Importa el CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Importa los iconos de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
// Importa el JavaScript de Bootstrap (opcional, si necesitas componentes JavaScript)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
