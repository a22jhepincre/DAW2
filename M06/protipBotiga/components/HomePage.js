import { defineComponent, defineAsyncComponent, ref, reactive, onBeforeMount } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import {CartComponent} from './CartComponent.js'
export const HomePage = defineAsyncComponent(() =>
    Promise.all([
        fetch('./templates/homePage.html').then(response => response.text()),
        Promise.resolve(defineComponent({
            name: 'HomePage',
            components: {
                CartComponent
            },
            setup() {
                const products = reactive({ data: null, loading: true, error: null });
                let cart = reactive({products:[]});
                onBeforeMount(async () => {
                    try {
                        const response = await fetch('https://fakestoreapi.com/products/category/electronics');
                        products.data = await response.json();
                    } catch (error) {
                        products.error = error;
                    } finally {
                        products.loading = false;
                    }
                });

                let addToCart = (product) => {
                    cart.products.push(product)
                };

                return {
                    products,
                    cart,
                    addToCart
                };
            }
        }))
    ]).then(([template, component]) => {
        component.template = template
        return component
    })
)