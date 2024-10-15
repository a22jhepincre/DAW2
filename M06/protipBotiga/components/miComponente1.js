import { defineComponent, defineAsyncComponent, ref, reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import * as com from '../communicationManager/communicationManager.js';

export const MyComponent = defineAsyncComponent(() =>
    Promise.all([
        fetch('./templates/MyComponent.html').then(response => response.text()),
        Promise.resolve(defineComponent({
            name: 'MyComponent',
            setup() {
                const message = ref('Componente desde archivo separado')
                let dataCom = reactive({data:null})

                com.getUser()
                    .then(data => {
                        dataCom.data = data
                    })
                    .catch(error => {
                    })

                return { message, dataCom }
            }
        }))
    ]).then(([template, component]) => {
        component.template = template
        return component
    })
)