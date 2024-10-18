// components/MyComponent.js
import { defineAsyncComponent } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export const MyComponent2 = defineAsyncComponent(() => {
    return fetch('./templates/MyComponent2.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar el template: ${response.statusText}`);
            }
            return response.text();
        })
        .then(template => {
            return {
                template,
                setup() {
                    // Lógica del componente aquí
                    return {};
                }
            };
        });
});
