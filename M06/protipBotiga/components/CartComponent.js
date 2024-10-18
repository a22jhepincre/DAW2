import { defineComponent, defineAsyncComponent, ref, reactive, onBeforeMount } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const CartComponent = defineAsyncComponent(() =>
    Promise.all([
        fetch('./templates/cardPage.html').then(response => response.text()),
        Promise.resolve(defineComponent({
            name: 'CartComponent',
            props: {
                products: {
                    type: Array,
                    default: () => [] // Valor predeterminado vacío
                }
            },
            components: {
            },
            setup(props) {
                console.log('Products in CartComponent:', props.products);

                onBeforeMount(async () => {

                });

                //devolver datos para el template
                return {

                }
            }
        }))
    ]).then(([template, component]) => {
        component.template = template
        return component
    })
)