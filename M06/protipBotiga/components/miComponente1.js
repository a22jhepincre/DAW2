import { defineComponent, defineAsyncComponent, ref, reactive, onBeforeMount } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import * as com from '../communicationManager/communicationManager.js';
import { MyComponent2 } from '../components/miComponente2.js'

export const MyComponent = defineAsyncComponent(() =>
    Promise.all([
        fetch('./templates/MyComponent.html').then(response => response.text()),
        Promise.resolve(defineComponent({
            name: 'MyComponent',

            components: {
                MyComponent2
            },

            setup() {
                const message = ref('Componente desde archivo separado');

                const dataCom = reactive({ data: null, loading: true, error: null });

                // Hook para obtener datos antes de montar el componente
                onBeforeMount(async () => {
                    try {
                        const data = await com.getUser(); // Obtener datos de la API
                        dataCom.data = data; // Asignar los datos a la variable reactiva
                    } catch (error) {
                        dataCom.error = 'Error al obtener los datos'; // Manejar el error
                        console.error('Error al obtener los datos:', error);
                    } finally {
                        dataCom.loading = false; // Cambiar el estado de carga
                    }
                });

                return { message, dataCom };
            }
        }))
    ]).then(([template, component]) => {
        component.template = template;
        return component;
    })
);
