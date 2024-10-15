import { defineComponent, defineAsyncComponent, ref, reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const NavBar = defineAsyncComponent(() =>
    Promise.all([
        fetch('./templates/navBar.html').then(response => response.text()),
        Promise.resolve(defineComponent({
            name: 'NavBar',
            setup() {
                return {

                }
            }
        }))
    ]).then(([template, component]) => {
        component.template = template
        return component
    })
)