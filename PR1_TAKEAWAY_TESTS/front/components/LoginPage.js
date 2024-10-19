import { defineComponent, defineAsyncComponent } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const LoginPage = defineAsyncComponent(() =>
    Promise.all([
        fetch('./templates/authenticate/loginPage.html').then(response => response.text()),
        Promise.resolve(defineComponent({
            name: 'LoginPage',
            props: {
                page: {
                    type: String,
                    default: "login"
                }
            },
            emits: ['updatePage'],
            setup(props, { emit }) {
                const goToRegister = () => {
                    emit('updatePage', 'register');
                };

                return {
                    goToRegister
                };
            }
        }))
    ]).then(([template, component]) => {
        component.template = template
        return component
    })
)