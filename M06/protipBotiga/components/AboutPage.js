import { defineComponent, defineAsyncComponent, ref, reactive, onBeforeMount } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const AboutPage = defineAsyncComponent(() =>
    Promise.all([
        fetch('./templates/aboutPage.html').then(response => response.text()),
        Promise.resolve(defineComponent({
            name: 'AboutPage',
            setup() {

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