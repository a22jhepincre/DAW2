import { defineComponent, defineAsyncComponent, ref, reactive, onBeforeMount } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export const MyComponent2 = defineAsyncComponent(() =>
    Promise.all([
        fetch('./templates/MyComponent2.html').then(response => response.text()),
        Promise.resolve(defineComponent({
            name: 'MyComponent',
            setup() {

                // Hook para obtener datos antes de montar el componente
                onBeforeMount(async () => {

                });

                return { message };
            }
        }))
    ]).then(([template, component]) => {
        component.template = template;
        return component;
    })
);
