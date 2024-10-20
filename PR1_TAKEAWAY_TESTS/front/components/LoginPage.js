import { defineComponent, defineAsyncComponent, reactive, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import * as comm from "../communicationManager/communicationManager.js";

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

                const formData = reactive({
                    email: '',
                    password: '',
                });

                const errors = reactive({
                    email: '',
                    password: '',
                });

                const validateEmail = () => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    errors.email = !emailRegex.test(formData.email) ? 'Please enter a valid email address' : '';
                };

                const validatePassword = () => {
                    errors.password = formData.password.length < 0 ? 'Password must be at least 4 characters long' : '';
                };

                const isFormValid = computed(() => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
                        formData.password.length >= 1 ;
                })

                const login = async () => {
                    validateEmail();
                    validatePassword();

                    if (isFormValid.value) {
                        console.log('Form Data:', formData);
                        console.log('correcto');
                        let result = await comm.authenticate(formData);
                        console.log(result);
                        if(result.status === 'success'){
                            localStorage.setItem('user', JSON.stringify(result.user));
                            localStorage.setItem('token', result.token);

                            emit('updatePage', 'home')
                        }
                        // Aquí puedes añadir la lógica para enviar los datos al servidor
                    } else {
                        console.log('Please correct the errors in the form');
                    }
                };

                return {
                    formData,
                    errors,
                    goToRegister,
                    login,
                    validateEmail,
                    validatePassword,
                    isFormValid
                };
            }
        }))
    ]).then(([template, component]) => {
        component.template = template
        return component
    })
)